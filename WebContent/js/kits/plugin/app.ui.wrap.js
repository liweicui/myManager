define(['jsPlugin/date.range'],function(DR){

    /**
     * 查找列表中某行匹配
     */
    function getSelectItems(rows, key, vals){
       var selected = [];
       for(var i = 0; i < vals.length; i++){
            var val = vals[i];
            for( var j = 0; j < rows.length; j++) {
                var row = rows[j];
                if(row[key] == val){
                  selected.push(row);
                  break;
               }
           }
       }

       return selected;
    }

    function getIdFromItems(rows){
        var tmp = [];
        for(var i = 0 ; i < rows.length; i++) {
            tmp.push(rows[i].id);
        }
        return tmp;
    }


    /**
     * 创建客户端分页匹配函数
     */
    function createClientQuery(fn){
        return function(q){
            var pageSize = 50, results = [];
            for(var i = 0; i< this.data.length;i++ ){
                fn(results, q.term, this.data[i]);
            }
            q.callback({results:results.slice((q.page-1)*pageSize, q.page*pageSize),
                          more:results.length >= q.page*pageSize });
        };
    }

    /**
     * 日期范围格式显示
     */
    function showDateRange(start, end){
        $(this.element).find('span').html(start.format('YYYY/MM/DD') + ' ~ ' + end.format('YYYY/MM/DD'));
    }

    $.fn.dateRange = function(options){
        options = options || {};
        options.dateFormat = options.dateFormat || "YYYY-MM-DD";
        options.startDate =  options.startDate ?  moment(options.startDate, options.dateFormat ) : moment().subtract('days', 1);
        options.endDate = options.endDate ? moment(options.endDate, options.dateFormat ) : moment().subtract('days', 1);
        options.minDate = options.minDate || '2007-01-01';
        options.maxDate = options.maxDate || moment();
        options = $.extend({}, DR.defaultConfig, options);
        this.each(function () {
            var el = $(this);
            el.daterangepicker(options, showDateRange);
            showDateRange.call(el.data('daterangepicker'), options.startDate,  options.endDate);
        });
        return this;
    }

    $.fn.ajaxSelect = function (options) {
        var def = $.Deferred();
        //缺省参数
        options = $.extend({
           isClientPage: false,
           adapter: function(msg){ return msg;},
           defalutSplit: ','
        },options);

        this.each(function () {
            var el = $(this);
                jqXhr = options.ajax();
            jqXhr.done(function(msg){
                var ds = options.adapter(msg), selectedItems, selectOptions,

                //Need Pop
                selectOptions = $.extend({ data : ds},options);

                //需要存在初始选中值
                if(options.selected != undefined || options.selectedIndex != undefined){
                    //select Index优先,仅支持single select
                    if(options.selectedIndex != undefined){
                        selectOptions.initSelection = function(element, callback) {
                           callback(ds[options.selectedIndex]);
                           el.val(ds[options.selectedIndex].id);//Default value
                        }
                    //selected Id
                    }else if(options.selected != undefined){
                        //find default selected items
                        selectedItems = options.multiple ? options.selected.split(options.defalutSplit) : [options.selected];
                        selectedItems = getSelectItems(ds, 'id' , selectedItems /*select Array*/);
                        selectOptions.initSelection = function(element, callback) {
                           if(options.multiple){
                               callback(selectedItems);
                               el.val(getIdFromItems(selectedItems).join(options.defalutSplit));
                           }else{
                               callback(selectedItems[0]);
                               el.val(selectedItems[0].id); //Default value
                           }
                        }
                    }
                }

                if(options.isClientPage){
                    selectOptions.query = createClientQuery(function(results, term , item){
                        if(term === ""){
                           results.push(item);
                        }else if(item.text.toUpperCase().indexOf(term.toUpperCase()) != -1){
                           results.push(item);
                        }
                    });
                }

                delete selectOptions.ajax; //var select2 冲突
                el.select2(selectOptions);

                setTimeout(function(){def.resolve(); }, 0);
            });
        });

        return def;
    };
});