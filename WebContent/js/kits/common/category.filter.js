define(['jsPlugin/app.panel','jsPlugin/date.range' ,'link!cssKits/common/basic.filter.css'],function(Panel, DateRange){

    var TPL = {

        body: function(){/*!
            <div class="form-inline" >
                <div class="form-group">
                   <label class="control-label" for="gameFilter">应用分类</label>
                   <input type="hidden" class="search-filter app-category-filter" value="-1"/>
                </div>
                <div class="form-group">
                   <div class="daterange-picker">
                      <i class="glyphicon glyphicon-calendar icon-calendar icon-large"></i>
                      <span></span> <b class="caret"></b>
                   </div>
                </div>
                <button type="button" class="btn btn-default btn-primary btn-sm">筛选</button>
            </div>
        */}
    }

    var AppCollectFilterBar = $.inherits(Panel, {

        title:'高级筛选',

        onInitialize:function(){
            AppCollectFilterBar.superclass.onInitialize.call(this);
            this.bodyRender = $.linesTpl(TPL.body);

            this.cacheCategories = [];

            this.dateFormat = this.dateFormat || "YYYY-MM-DD";
            this.startDate =  this.startDate ?  moment(this.startDate, this.dateFormat ) : moment();
            this.endDate = this.endDate ? moment(this.endDate, this.dateFormat ) : moment();
            this.minDate = this.minDate || '2007-01-01';
            this.maxDate = this.maxDate || moment();

            this.dateRangeCfg = $.extend(DateRange.defaultConfig, {
                startDate: this.startDate,
                endDate: this.endDate,
                minDate: this.minDate,
                maxDate: this.maxDate
            });

            this.callback = this.callback || function(){};
        },

        getBodyContent:function(){
            return this.bodyRender({});
        },

        onRender:function(){
            AppCollectFilterBar.superclass.onRender.call(this);
            this.loadCategories();
            this.setDateRange();
            this.bindAction();
        },

        addDefautOption:function(data, idKey, textKey){
            var defaut = {};
            defaut[idKey] = -1;
            defaut[textKey] = "全部";
            data.splice(0, 0, defaut);
        },

        loadCategories: function(){
            var self = this,
                categoryFilter = this.el.find(".app-category-filter");
            $.ajax({
                url: 'appCategroy',
                type: "POST"
            }).done(function(result){
                var categories = result.appCategories;
                for(var id in categories){
                    self.cacheCategories.push({id:id,text:categories[id]});
                }
                categoryFilter.select2({
                    data: self.cacheCategories,
                    initSelection: function(element, callback) {
                       callback(self.cacheCategories[0]);
                    }
                });
            });
        },

        setDateRange: function(){
            var self = this;
            this.dateRangeEl = this.el.find(".daterange-picker");
            this.dateRangeEl.daterangepicker(self.dateRangeCfg, $.proxy(this.updateDateRange, self));
            this.updateDateRange(moment(), moment());
        },

        updateDateRange:function(start, end){
            this.dateRangeEl.find('span').html(start.format('YYYY/MM/DD') + ' ~ ' + end.format('YYYY/MM/DD'));
        },

        bindAction:function(){
            var button = this.el.find("button"),
                self = this;
            button.on("click",function(){
                self.callback(self.getBarValues());
            });
        },

        getBarValues: function(){
            var datepicker = this.dateRangeEl.data("daterangepicker");
            return {
                "startDate": datepicker.startDate.format(this.dateFormat),
                "endDate": datepicker.endDate.format(this.dateFormat),
                "categoryId":this.el.find(".app-category-filter").select2('val')
            }
        }
    });

    $.fn.collectFilterPanel = function (options) {
        this.each(function () {
            var el = $(this);
            if (!el.data('collectfilterpanel'))
                el.data('collectfilterpanel', new AppCollectFilterBar(el, options));
        });
        return this;
    };

    $.App = $.App || {};

    $.extend($.App,{
        getCollectFilter : function(el){
            return $(el).data('collectfilterpanel');
        }
    });

    return AppCollectFilterBar;

});