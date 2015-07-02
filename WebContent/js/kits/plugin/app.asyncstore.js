define(function(){
    function AsyncStore(options){
        $.extend(this,options);
        this.statusListener = {
            onBeforeReqest: $.noop,
            onSuccess: $.noop,
            onFail : $.noop
        };

        this.dataListeners = [];
    }

    AsyncStore.prototype = {

        idProperty: 'id',

        currentPage:1,

        pageSize: 20,

        totalRecords:0,

        getTotalPages:function(){
            return Math.floor(this.totalRecords % this.pageSize ==0 ? this.totalRecords / this.pageSize :  this.totalRecords / this.pageSize +1);
        },

        setListeners : function(listeners){
            $.extend(this.statusListener,  listeners);
        },

        addDataChange : function(fn , scope){
            this.dataListeners.push({
                fn: fn,
                scope : scope || this
            });
        },

        fireDataChange: function(){
            for(var fn in this.dataListeners){
                var ref = this.dataListeners[fn];
                ref.fn.apply(ref.scope, [ this.records ,  this.currentPage, this.pageSize,  this.getTotalPages() , this.totalRecords ]);
            }
        },

        createXhr:  function(){
            return $.ajax({
                url:  $.format( this.url,  this.currentPage ,  this.pageSize ),
                method: "GET",
                dataType:"json"
            });
        },

        dataProcess : function(data){
            return data;
        },

        getOffset: function(pageNo, pageSize){
            return (pageNo -1 ) * pageSize;
        },

        getData : function(pageNo , pageSize){
            var self = this,
                pN = pageNo  || this.currentPage,
                pS = pageSize || this.pageSize,
                sl = this.statusListener,
                jqXhr;

            sl.onBeforeReqest();
            jqXhr = this.createXhr(pN, pS , this.getOffset(pN,pS))
                        .done(function(msg){
                             var data = self.dataProcess(msg);
                             self.currentPage = pN;
                             self.pageSize = pS;
                             self.totalRecords = data.totalRecords;
                             self.records = data.records;
                             self.fireDataChange();
                             sl.onSuccess();
                         })
                        .fail(function(){
                            sl.onFail();
                        });
            return jqXhr;
        }
    };

    return AsyncStore;
});