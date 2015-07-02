define(['jsPlugin/app.pop.base', 'jsPlugin/app.tag.select.js?20140110' , 'jsPlugin/date.picker.js' , 'link!cssKits/date.point.picker.css'], function(PopBase, TagSelect){

    var TPL = {

        nav: function(){/*!
             <ul class="nav nav-pills nav-stacked quick-menu"></ul>
        */}
    }

    var SelectModel = $.inherits(Object, {

        type: 'custom',

        label : undefined, //用于显示

        value : undefined,

        callback : function(){},

        constructor: function(options){
            $.extend(this, options || {});
        },

        getText: function(){
            return this.label;
        },

        render: function(target){},

        show: function(){
            this.callback(this.type, this.value , this);
        },

        hide: function(){}
    });

    var MonthSelectModel = $.inherits(SelectModel,{

        type: 'month',

        label : "选择月份",

        render: function(target){
            var self = this,
                picker = $('<div class="month-picker" style="display:none" ><div>').appendTo(target),
                ds = this.createDataSource();

            this.tagSelect = new TagSelect(picker, {
                data: ds,
                index: ds.length -1,
                onSelect:function(nav, selected){
                    self.callback(self.type, selected.id, self);
                }
            });
        },

        createDataSource: function(){
            var ym = moment.monthsShort(), navData = [], sign = "-",
                        numberOfYears = 10;
            for ( var i = 0; i < numberOfYears; i++) {
                var y = moment().subtract('y',i);
                var data = { id: y.year() ,text: y.year() + '年', items:[]};
                for(var m =  moment().isSame(y,'year') ? moment().month() : ym.length -1 ; m >= 0; m--){
                    data.items.push({id: y.year()+ sign + (m+1) , text: ym[m]});
                }
                navData.push(data);
            }

            navData.reverse();

            return navData;
        },

        getText: function(){
            var selected = this.tagSelect.getSelectedData(), renderText;
            if(selected.inputDisplay){
                renderText = selected.inputDisplay;
            }else{
                renderText = this.tagSelect.getNav().text +  selected.text;
            }
            return renderText;
        },

        setValue: function(value){
            this.tagSelect.selectValue(value);
        },

        show: function(){
            this.tagSelect.show();
        },

        hide: function(){
            this.tagSelect.hide();
        }

    });

    var DaySelectModel = $.inherits(SelectModel,{

        type: 'day',

        label : "选择日期",

        render: function(target){
           var self = this;
           this.picker = $.datepicker(target,{
                onSelect: function() {
                    self.callback(self.type, this.getMoment().format('YYYY-MM-DD'), self);
                }
           });
           this.hide();
        },

        setValue:function(value){
            this.picker.setMoment(moment(value,'YYYY-MM-DD'));
        },

        getText: function(){
            return this.picker.getMoment().format('YYYY-MM-DD');
        },

        show: function(){
            this.picker.show();
        },

        hide: function(){
            this.picker.hide();
        }
    });

    var WeekSelectModel = $.inherits(SelectModel,{

        type: 'week',

        label : "选择周",

        render: function(target){
            var self = this,
                picker = $('<div class="week-picker" style="display:none" ><div>').appendTo(target);
            this.tagSelect = new TagSelect(picker, {
                data: this.createDataSource(),
                onSelect:function(nav, selected){
                    self.callback(self.type, selected.id, self);
                }
            });
        },

        createDataSource: function(){
            var yw = 52, navData = [], sign = "-",
                        numberOfYears = 10;
            for ( var i = 0; i < numberOfYears; i++) {
                var y = moment().subtract('y',i);
                var data = { id: y.year() ,text: y.year() + '年', items:[]};
                for(var w =  moment().isSame(y,'year') ? moment().week() : 52 ; w >= 1; w--){
                    data.items.push({id: y.year()+ sign + w , text: w});
                }
                navData.push(data);
            }

            return navData;
        },

        getText: function(){
            var selected = this.tagSelect.getSelectedData(), renderText;
            if(selected.inputDisplay){
                renderText = selected.inputDisplay;
            }else{
                renderText = this.tagSelect.getNav().text +  selected.text +'周';
            }
            return renderText;
        },

        setValue: function(value){
            this.tagSelect.selectValue(value);
        },

        show: function(){
            this.tagSelect.show();
        },

        hide: function(){
            this.tagSelect.hide();
        }

    });
    var DatePointPicker = $.inherits(PopBase, {

        type: 'datepointpicker',

        cls: 'date-point-picker',

        month: true,

        week: false,

        day: true,

        splitSign: "|",

        opens: 'left', //TODO 配置左右显示

        navIndex : undefined,

        defaultValue: undefined,

        ranges:[
            {label:'本周', value: '2013-07-01/2013-07-08'},
            {label:'上周', value: '2013-06-01/2013-07-08'},
            {label:'本月', value: '2013-06-01/2013-06-31'}
        ],

        onInitialize:function(){
            DatePointPicker.superclass.onInitialize.call(this);
            this.proxySelected = $.proxy(this.onSelectedChange, this);
            this.navRender = $.linesTpl(TPL.nav);

            //配置选项卡
            this.models = [];
            if(this.ranges && this.ranges.length > 0){
                for(var i = 0; i< this.ranges.length ; i++){
                     this.models.push(new SelectModel($.extend({callback:  this.proxySelected} , this.ranges[i])));
                }
            }
            if(this.month){
               this.models.push(new MonthSelectModel({callback:  this.proxySelected}));
            }
            if(this.week){
                this.models.push(new WeekSelectModel({callback:  this.proxySelected}));
             }
            if(this.day){
                this.models.push(new DaySelectModel({callback:  this.proxySelected}));
            }

        },

        onRender: function(){
            //reset input
            this.valEl = $('<input type="hidden" name="'+ (this.el.attr('name') )+'">'); //实际值
            this.typeEl= $('<input type="hidden" name="dateSelectedType"/>'); //类型值
            this.singeValEl = $('<input type="hidden" name="dateSelectedVal"/>'); //选中值
            this.el.attr('name', 'datepointpicker_' + this.el.attr('name') );
            this.el.after(this.typeEl).after(this.singeValEl).after(this.valEl);
            DatePointPicker.superclass.onRender.call(this);

            //默认选中初始值
            //{type:"custom",value:"2013-08-1"} 或"custom|2013-08-1";
            if(!$.isEmpty(this.defaultValue) &&  !$.isEmptyObject(this.defaultValue)){
                if( typeof this.defaultValue == 'string'){
                    var tArray = this.defaultValue.split(this.splitSign);
                    this.changeSelect(tArray[0], tArray[1]);
                }else if(typeof this.defaultValue == 'object'){
                    this.changeSelect(this.defaultValue.type, this.defaultValue.value);
                }
            }
        },

        renderBody: function(){
            this.body.addClass('clearfix').addClass(this.opens); //display left or right
            this.body.html('<ul class="nav nav-pills nav-stacked quick-menu"></ul>');
            this.menuWrap = this.body.find('.quick-menu');
            //动态添加选项卡
            for(var i = 0 ; i < this.models.length; i++ ){
                 var model = this.models[i];
                 this.menuWrap.append($.format('<li><a href="#">{0}</a></li>', model.label));
                 //插件默认渲染到容器中
                 model.render(this.body);
            }
            this.menus = this.body.find('.quick-menu li');
            this.menus.on('click', $.proxy(this.changeNav,this));
        },

        changeSelect: function(type, value){
            var model;
            for(var i = 0; i < this.models.length; i++) {
                model = this.models[i];
                if(model.type == type){
                    if(type == SelectModel.prototype.type && value == model.value){
                        //高亮该项,自动设值
                        this.highlightNav(i);
                        break;
                    }else{
                        //高亮该项，并手动设值
                        this.highlightNav(i);
                        model.setValue(value);
                        break;
                    }
                }
            }
        },

        changeNav : function(e){
            var el = $(e.target).closest('li'),
                changeIndex = this.menus.index(el);
            this.highlightNav(changeIndex);
        },

        highlightNav: function(index){
            var el = $(this.menus.get(index));
            el.siblings().removeClass('active');
            el.addClass('active');
            this.onNavSelect(index);
        },

        onNavSelect: function(index){
            //组件
            if(this.navIndex){
                this.models[this.navIndex].hide();
            }
            this.models[index].show();
            this.navIndex= index;
        },

        onSelectedChange: function(type, value, model){
            this.updateValue(type, value, model.getText());
            this.hide();
        },

        updateValue: function(type, value, text){
            this.typeEl.val(type);
            this.singeValEl.val(value);
            this.valEl.val([ type, value].join(this.splitSign));
            this.el.val(text);
        },

        getValue: function(isRaw){
            return isRaw ? {type: this.typeEl.val(), value: this.singeValEl.val()}: this.valEl.val();
        }
    });

     $.fn.datepointpicker = function (options) {
        this.each(function () {
            var el = $(this);
            if (!el.data(DatePointPicker.prototype.type))
                el.data(DatePointPicker.prototype.type, new DatePointPicker(el, options));
        });
        return this;
    };

    $.App = $.App || {};

    $.extend($.App,{
        getDatePointPicker : function(el){
            return $(el).data(DatePointPicker.prototype.type);
        }
    });

    return DatePointPicker;
});