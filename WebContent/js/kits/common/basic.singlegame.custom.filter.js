define(['jsPlugin/app.panel', 'jsPlugin/app.ui.wrap' ,'link!cssKits/common/basic.filter.css?20140307'],function(Panel){

    var TPL = {

        body: function(){/*!
            <div class="form-horizontal" >
                <div class="form-group">
                   <label class="search-label control-label" for="gameFilter">游戏</label>
                   <input type="hidden" class="search-filter game-filter s-game-filter" value="<#=this.queryGameId#>" />
                </div>
                <div class="form-group">
                   <label class="search-label control-label" for="channelFilter">渠道</label>
                   <input type="hidden" class="search-filter channel-filter" value="<#=this.channelId#>"/>
                </div>
                <div class="form-group">
                   <label class="search-label control-label" for="channelFilter">时间范围</label>
                   <div class="daterange-picker">
                      <i class="glyphicon glyphicon-calendar icon-calendar icon-large"></i>
                      <span></span> <b class="caret"></b>
                   </div>
                   <button type="button" class="btn btn-default btn-primary btn-sm filter-btn" disabled>筛选</button>
                </div>
            </div>
        */}
    }

    var SingleGameCustomFilter = $.inherits(Panel, {

        title:'高级筛选',

        onInitialize:function(){
            var self = this;
            SingleGameCustomFilter.superclass.onInitialize.call(this);
            this.bodyRender = $.linesTpl(TPL.body);
            this.cacheGameData = [];
            this.cacheGameVersionData = [];
            this.cacheChannelData = [];
            this.dateFormat = "YYYY-MM-DD";
            this.dateRangeCfg = $.extend({opens:'right', dateFormat: this.dateFormat}, this.dateRangeCfg || {});
            this.splitSign =  this.splitSign || ",";
            this.callback = this.callback || function(){};
            
            //如果为全部初始值，则移除
            if(this.channelId == "-1") delete this.channelId;
            if(this.queryGameId == "-1") delete this.queryGameId;
            
            this.isDataReady = {
                games : false,
                channels : false
            }

            //检查异步数据
            this.readyCheckFn = setInterval(function(){
                  if(self.readyCheck()){
                      self.el.find("button").removeAttr("disabled");
                      clearInterval(self.readyCheckFn);
                      self.readyCheckFn = null;
                  };
            },200);

        },

        getBodyContent : function(){
            return this.bodyRender({ 
            	channelId: this.channelId ,
				queryGameId :  this.queryGameId
			});
        },

        onRender : function(){
        	SingleGameCustomFilter.superclass.onRender.call(this);
            this.el.addClass('multi-filter');
            this.loadUserGame();
            this.loadUserChannels();
            this.setDateRange();

            this.bindAction();
        },
        
        loadUserGame: function(){
            var self = this,
                gameFilter = this.el.find(".game-filter");

             gameFilter.ajaxSelect({
            	 placeholder: "请选择游戏",
            	 ajax: function(){
                     return $.ajax({
                         url: 'sessionValue',
                         type: "POST",
                         data:{ key: 'userGameList' }
                     });
                 },
                 adapter: function(msg){
                     var ds = [];
                     for(var id in msg.value){
                         var row = msg.value[id];
                         ds.push({ id: row.gameId, text:row.gameName});
                     }
                     return ds;
                 },
                 isClientPage:true,
                 selected: self.queryGameId 
            }).done(function(){
                self.isDataReady.games  = true;
            });


        },

        loadUserChannels: function(){
            var self = this,
                channelFilter = this.el.find(".channel-filter");
            channelFilter.ajaxSelect({
                 multiple:true,
                 placeholder:"全部渠道",
                 ajax: function(){
                     return $.ajax({
                         url: 'sessionValue',
                         type: "POST",
                         data:{ key: 'userChannelList' }
                     });
                 },
                 adapter: function(msg){
                     var ds = [];
                     for(var id in msg.value){
                         var row = msg.value[id];
                         ds.push({ id: row.channelId, text:row.channeName});
                     }
                     return ds;
                 },
                 isClientPage: true,
                 selected: self.channelId
            }).done(function(){
                self.isDataReady.channels  = true;
            });
        },

        setDateRange: function(){
             this.el.find(".daterange-picker").dateRange(this.dateRangeCfg);
        },

        readyCheck : function(){
            var flag = true,
                self = this;

            //源检查
            for(var ds in self.isDataReady){
                if(!self.isDataReady[ds]){
                   flag = false;
                   break;
                }
            }

            return flag;
        },

        bindAction:function(){
            var button = this.el.find("button"),
                self = this;
            
            button.on("click",function(){
            	
                if(self.readyCheck()){
            	   if(self.el.find(".game-filter").select2('val')==''){
            		 $.alert("请至少选择一款游戏!");
            		 return false;
            	   }
                   self.callback(self.getBarValues());
                }
            });
        },

        getBarValues: function(){
            var datepicker = this.el.find(".daterange-picker").data("daterangepicker"),
                cVals = this.el.find(".channel-filter").select2('val'),
                gVals = this.el.find(".game-filter").select2('val');

            return {
                "startDate": datepicker.startDate.format(this.dateFormat),
                "endDate": datepicker.endDate.format(this.dateFormat),
                "channelId": cVals.length  == 0 ? -1 : cVals.join(this.splitSign),
                "queryGameId": gVals
            }
        },

        getDefVals:function(){
            return {
                "startDate": this.startDate.format(this.dateFormat),
                "endDate": this.endDate.format(this.dateFormat),
                "channelId": -1,
                "queryGameId":-1
            }
        }
    });

    $.fn.singleGameCustomFilter = function (options) {
        this.each(function () {
            var el = $(this);
            if (!el.data('singlegamecustom'))
                el.data('singlegamecustom', new SingleGameCustomFilter(el, options));
        });
        return this;
    };

    $.App = $.App || {};

    $.extend($.App,{
        getFilter : function(el){
            return $(el).data('singlegamecustom');
        }
    });


    return SingleGameCustomFilter;
});