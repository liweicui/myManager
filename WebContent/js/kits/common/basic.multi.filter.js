define(['jsPlugin/app.panel', 'jsPlugin/app.ui.wrap' ,'link!cssKits/common/basic.filter.css'],function(Panel){

    var TPL = {

        body: function(){/*!
            <div class="form-horizontal" >
                <div class="form-group">
                   <label class="search-label control-label" for="gameFilter">游戏</label>
                   <input type="hidden" class="search-filter game-filter" value="<#=this.queryGameId#>" />
                </div>
                <div class="form-group">
                   <label class="search-label control-label" for="vesionFilter">版本</label>
                   <input type="hidden" class="search-filter game-version-filter" value="<#=this.queryGameVersionId#>"/>
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

    var BasicMultiFilterBar = $.inherits(Panel, {

        title:'高级筛选',

        onInitialize:function(){
            var self = this;
            BasicMultiFilterBar.superclass.onInitialize.call(this);
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
            if(this.queryGameVersionId == "-1") delete this.queryGameVersionId;
            
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
				queryGameId :  this.queryGameId , 
				queryGameVersionId: this.queryGameVersionId
			});
        },

        onRender : function(){
            BasicMultiFilterBar.superclass.onRender.call(this);
            this.el.addClass('multi-filter');
            this.loadUserGame();
            this.bindGameVersion();
            this.loadUserChannels();
            this.setDateRange();

            //加载游戏版本
            this.loadGameVersion();

            this.bindAction();
        },

        loadUserGame: function(){
            var self = this,
                gameFilter = this.el.find(".game-filter");
             var gameXHr = gameFilter.ajaxSelect({
                 multiple:true,
                 placeholder: "全部游戏",
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
            });

            gameXHr.done(function(){
                self.isDataReady.games  =  true;
            });

            //游戏版本级联
            gameFilter.on('change', function(e){
                var gameVals = e.val;
                if(gameVals.length == 0 || gameVals.length > 1){
                    self.clearGameVersion();
                }else if(gameVals.length == 1){
                    self.getGameVersion(gameVals[0]);
                }
            });
        },

        bindGameVersion:function(){
            var self = this,
                gameVersionFilter = this.el.find(".game-version-filter");
            //游戏版本无id,只有字符串
            gameVersionFilter.select2({
                allowClear: true,
                multiple:true,
                placeholder: "全部版本",
                data: self.cacheGameVersionData
            });
        },

        loadGameVersion: function(){
            var self = this,
                gameVersionFilter = this.el.find(".game-version-filter"),
                selectedGames = self.queryGameId ? self.queryGameId.split(',') : [] ;
                selectedVersions = self.queryGameVersionId ? self.queryGameVersionId.split(',') : [];

            //默认选中一个游戏时，显示
            if(self.queryGameId && selectedGames.length == 1  ){
                self.getGameVersion(selectedGames[0], selectedVersions);
            }else{
                this.clearGameVersion();
            }
        },

        getGameVersion: function(gameId , defautVesions){
            var self = this;
            $.ajax({
                url: 'gameVersionDatasNoLimt',
                type: "POST",
                data:{ 'queryGameId': gameId ,'queryGameVersionName': '' }
            }).done(function(msg){
                 var versions = msg.gameVersionList;
                 for (var i = 0; i < versions.length; i++) {
                    versions[i].id = versions[i].gameVersion; //fake id
                    versions[i].text= versions[i].gameVersion;
                 }
                 self.refreshGameVerion(versions, defautVesions);
            });
        },

        refreshGameVerion: function(versions , selected){
            var gameVersionFilter = this.el.find(".game-version-filter");
            this.cacheGameVersionData = versions || [];
            gameVersionFilter.removeClass('select2-offscreen').select2({data: versions,multiple:true, placeholder: "全部版本", allowClear: true}).trigger('change'); //Hack change event
            //支持多选
            if(selected && selected.length > 0){
               gameVersionFilter.select2('val', selected);
            }else{
               gameVersionFilter.select2('val', '');
            }
            gameVersionFilter.select2("enable", true);
        },

        clearGameVersion: function(){
            var gameVersionFilter = this.el.find(".game-version-filter");
            this.cacheGameVersionData = [];
            gameVersionFilter.select2("val", "");
            gameVersionFilter.select2("enable", false);
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
                   self.callback(self.getBarValues());
                }
            });
        },

        getBarValues: function(){
            var datepicker = this.el.find(".daterange-picker").data("daterangepicker"),
                cVals = this.el.find(".channel-filter").select2('val'),
                gVals = this.el.find(".game-filter").select2('val'),
                gvVals = this.el.find(".game-version-filter").select2('val');

            return {
                "startDate": datepicker.startDate.format(this.dateFormat),
                "endDate": datepicker.endDate.format(this.dateFormat),
                "channelId": cVals.length  == 0 ? -1 : cVals.join(this.splitSign),
                "queryGameId": gVals.length == 0 ? -1 : gVals.join(this.splitSign),
                "queryGameVersionId": gvVals.length == 0 ? -1 : gvVals.join(this.splitSign)//gameversionName
            }
        },

        getDefVals:function(){
            return {
                "startDate": this.startDate.format(this.dateFormat),
                "endDate": this.endDate.format(this.dateFormat),
                "channelId": -1,
                "queryGameId":-1,
                "queryGameVersionId":-1
            }
        }
    });

    $.fn.basicMultiFilter = function (options) {
        this.each(function () {
            var el = $(this);
            if (!el.data('bfmutipanel'))
                el.data('bfmutipanel', new BasicMultiFilterBar(el, options));
        });
        return this;
    };

    $.App = $.App || {};

    $.extend($.App,{
        getFilter : function(el){
            return $(el).data('bfmutipanel');
        }
    });


    return BasicMultiFilterBar;
});