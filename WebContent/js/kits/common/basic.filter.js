define(['jsPlugin/app.panel', 'jsPlugin/date.range','jsPlugin/app.ui.wrap' ,'link!cssKits/common/basic.filter.css'],function(Panel, DateRange){

    var TPL = {

        body: function(){/*!
            <div class="form-inline" >
                <div class="form-group">
                   <label class="control-label" for="gameFilter">游戏</label>
                   <input type="hidden" class="search-filter game-filter" />
                </div>
                <div class="form-group">
                   <label class="control-label" for="vesionFilter">版本</label>
                   <input type="hidden" class="search-filter game-version-filter"/>
                </div>
                <div class="form-group">
                   <label class="control-label" for="channelFilter">渠道</label>
                   <input type="hidden" class="search-filter channel-filter"/>
                </div>
                <div class="form-group">
                   <div class="daterange-picker">
                      <i class="glyphicon glyphicon-calendar icon-calendar icon-large"></i>
                      <span></span> <b class="caret"></b>
                   </div>
                </div>
                <button type="button" class="btn btn-default btn-primary btn-sm" disabled>筛选</button>
            </div>
        */}
    }

    var BasicFilterBar = $.inherits(Panel, {

        title:'高级筛选',

        onInitialize:function(){
            var self = this;
            BasicFilterBar.superclass.onInitialize.call(this);
            this.bodyRender = $.linesTpl(TPL.body);

            this.cacheGameData = [];
            this.cacheGameVersionData = [];
            this.cacheChannelData = [];

            this.dateFormat = this.dateFormat || "YYYY-MM-DD";
            this.startDate =  this.startDate ?  moment(this.startDate, this.dateFormat ) : moment().subtract('days', 1);
            this.endDate = this.endDate ? moment(this.endDate, this.dateFormat ) : moment().subtract('days', 1);
            this.minDate = this.minDate || '2007-01-01';
            this.maxDate = this.maxDate || moment();
            
            this.dateRangeCfg = $.extend(DateRange.defaultConfig, {
                startDate: this.startDate,
                endDate: this.endDate,
                minDate: this.minDate,
                maxDate: this.maxDate
            });
            
            if(this.ranges){
            	this.dateRangeCfg.ranges = this.ranges;
            }

            this.callback = this.callback || function(){};

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
            return this.bodyRender({});
        },

        onRender : function(){
            BasicFilterBar.superclass.onRender.call(this);
            this.loadUserGame();
            this.bindGameVersion();
            this.loadUserChannels();
            this.setDateRange();

            //加载游戏版本
            this.loadGameVersion();

            this.bindAction();
        },

        addDefautOption : function(data, idKey, textKey){
            var defaut = {};
            defaut[idKey] = -1;
            defaut[textKey] = "全部";
            data.splice(0, 0, defaut);
        },

        getSelectItem: function(rows, key, val){
           var selected;
           for( var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if(row[key] == val){
                    selected  = row;
                    break;
                }
            }
           return selected;
        },

        loadUserGame: function(){
            var self = this,
                gameFilter = this.el.find(".game-filter");

             gameFilter.ajaxSelect({
                 ajax: function(){
                     return $.ajax({
                         url: 'sessionValue',
                         type: "POST",
                         data:{ key: 'userGameList' }
                     });
                 },
                 adapter: function(msg){
                     var ds = [{id:-1,text:"全部"}];
                     for(var id in msg.value){
                         var row = msg.value[id];
                         ds.push({ id: row.gameId, text:row.gameName});
                     }
                     return ds;
                 },
                 isClientPage:true,
                 selected: self.queryGameId || -1
            }).done(function(){
                self.isDataReady.games  = true;
            });


            //游戏版本级联
            gameFilter.on('change', function(e){
                var gameId = e.val;
                if(gameId == -1){
                    self.refreshGameVerion();
                }else{
                    self.getGameVersion(gameId);
                }
            });
        },

        bindGameVersion:function(){
            var self = this,
                gameVersionFilter = this.el.find(".game-version-filter");
            //游戏版本无id,只有字符串
            self.addDefautOption(self.cacheGameVersionData, 'id' , 'text' );

            gameVersionFilter.select2({
                allowClear: true,
                data: self.cacheGameVersionData
            });
        },

        loadGameVersion: function(){
            var self = this,
                gameVersionFilter = this.el.find(".game-version-filter");
            if(self.queryGameId && self.queryGameId != "-1" ){
                self.getGameVersion(self.queryGameId, self.queryGameVersionId);
            }else{
                gameVersionFilter.select2('val', -1);
            }
        },

        getGameVersion: function(gameId , gameVersion){
            var self = this;
            gameId = parseInt(gameId, 10); //转换为Number
            if(gameId == -1){
                self.refreshGameVerion();
            }else{
                $.ajax({
                    url: 'gameVersionDatasNoLimt',
                    type: "POST",
                    data:{ 'queryGameId': gameId ,'queryGameVersionName':'' }
                }).done(function(msg){
                     var versions = msg.gameVersionList;
                     for (var i = 0; i < versions.length; i++) {
                        versions[i].id = versions[i].gameVersion; //fake id
                        versions[i].text= versions[i].gameVersion;
                     }
                     self.refreshGameVerion(versions, gameVersion);
                });
            }
        },

        refreshGameVerion: function(versions ,selected){
            var gameVersionFilter = this.el.find(".game-version-filter");
            versions = versions || [];
            this.addDefautOption(versions, 'id' , 'text' );
            this.cacheGameVersionData = versions;
            gameVersionFilter.removeClass('select2-offscreen').select2({data: versions}).trigger('change'); //Hack change event
            gameVersionFilter.select2('val', selected || -1);
        },

        loadUserChannels: function(){
            var self = this,
                channelFilter = this.el.find(".channel-filter");
            channelFilter.ajaxSelect({
                 ajax: function(){
                     return $.ajax({
                         url: 'sessionValue',
                         type: "POST",
                         data:{ key: 'userChannelList' }
                     });
                 },
                 adapter: function(msg){
                     var ds = [{id:"-1",text:"全部"}];
                     for(var id in msg.value){
                         var row = msg.value[id];
                         ds.push({ id: row.channelId, text:row.channeName});
                     }
                     return ds;
                 },
                 isClientPage:true,
                 selected: self.channelId || -1
            }).done(function(){
                self.isDataReady.channels  = true;
            });
        },

        setDateRange: function(){
            var self = this;
            this.dateRangeEl = this.el.find(".daterange-picker");
            this.dateRangeEl.daterangepicker(self.dateRangeCfg, $.proxy(this.updateDateRange, self));
            this.updateDateRange(this.startDate, this.endDate);
        },

        updateDateRange:function(start, end){
            this.dateRangeEl.find('span').html(start.format('YYYY/MM/DD') + ' ~ ' + end.format('YYYY/MM/DD'));
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
            var datepicker = this.dateRangeEl.data("daterangepicker");
            return {
                "startDate": datepicker.startDate.format(this.dateFormat),
                "endDate": datepicker.endDate.format(this.dateFormat),
                "channelId":this.el.find(".channel-filter").select2('val'),
                "queryGameId": this.el.find(".game-filter").select2('val'),
                "queryGameVersionId":this.el.find(".game-version-filter").select2('val') //gameversionName
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

    $.fn.basicFilterPanel = function (options) {
        this.each(function () {
            var el = $(this);
            if (!el.data('bfpanel'))
                el.data('bfpanel', new BasicFilterBar(el, options));
        });
        return this;
    };

    $.App = $.App || {};

    $.extend($.App,{
        getFilter : function(el){
            return $(el).data('bfpanel');
        }
    });


    return BasicFilterBar;
});