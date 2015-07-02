define(['jsPlugin/app.panel',
        'jsPlugin/app.ui.spinner',
        'js!jsKits/highcharts.js'], function(Panel){

     var TPL = {

        IDENTITY : 0 ,

        nav :function() {/*!
            <div class="btn-group btn-group-sm" data-toggle="buttons">
                <#for(var i=0; i<nav.length;i++){#>
                    <label class="btn btn-default" <#if(nav[i].uiKit){#> data-ui-id="<#=nav[i].uiKit#>" <#}#> >
                        <input type="radio" name="options_nav_<#=identity#>" value="<#=i#>" ><#=nav[i].name#>
                    </label>
                <#}#>
            </div>
        */},

        content: function(){/*!
            <div class="chart-wrap">
                <#for(var i=0; i<nav.length;i++){#>
                    <div data-cindex="<#=i#>" class="chart-tab-wrap chart-hide"></div>
                <#}#>
            </div>
        */}
    };

    var AjaxTab = $.inherits(Panel, {

        cls:'tab-chart',

        index : 0 , //默认显示第一个

        type: 'ajaxtab',

        timeout: 500,

        onInitialize:function(){
            AjaxTab.superclass.onInitialize.call(this);
            this.navRender = $.linesTpl(TPL.nav);
            this.contentRender = $.linesTpl(TPL.content);
            this.identity = TPL.IDENTITY++;
            this.tabs = this.tabs || [];
            this.change =  this.change || function(){};
        },

        getBodyContent: function(){
            var navHtml = this.navRender({nav: this.tabs, identity : this.identity });
            var contentHtml = this.contentRender({nav: this.tabs, identity: this.identity });
            return navHtml + contentHtml;
        },

        onRender:function(){
            var self = this;
            AjaxTab.superclass.onRender.call(this);
            this.navEls = $(this.el).find('.btn-group .btn');
            this.chartEls = $(this.el).find('.chart-tab-wrap');
            this.chartWrapEl = $(this.el).find('.chart-wrap');

            //register switch
            $(this.el).find('input[type="radio"]').change(function(){
                self.showTab($(this).val());
            });

            //默认加载
            setTimeout(function(){  self.showTab(self.index);},200);
        },

        showTab:function(target){
            var self = this;

            //内容切换Tab
            $(this.navEls.get(target)).addClass('active');
            $(this.chartEls.get(this.index)).addClass('chart-hide');
            setTimeout(function(){
                 $(self.chartEls.get(target)).removeClass('chart-hide');
            },0);

             //第一次加载则请求
            if(!self.tabs[target].loaded){
                //LoadingMask
                if(self.el.is(":visible")){ //当前元素显示才显示
                    self.el.spinnerMask();
                }
                //调用Ajax，回调
                var reqs = this.tabs[target].ajax();
                reqs = $.isArray(reqs) ? reqs  : [reqs] ;
                $.when.apply($, reqs).done(function(){
                    var args = Array.prototype.slice.call(arguments),
                        rs = [];
                    args = reqs.length > 1 ? args : [args];
                    for (var i = 0; i < args.length; i++) {
                        rs.push(args[i][0]);
                    }
                    var tabContentEl = self.chartWrapEl.find(".chart-tab-wrap")[target];
                    self.tabs[target].render.apply(self, [ self.index , self.tabs[target], tabContentEl ].concat(rs) );
                    self.tabs[target].loaded = true;

                    //数据加载完成解锁
                    setTimeout(function(){
                        var spinnerMask =  $.App.getSpinnerMask(self.el);
                        if(spinnerMask)spinnerMask.destroy();
                    },self.timeout);
                });
            }

            //异步事件
            setTimeout(function(){
                self.change.call(self , self.index, target, self.tabs[target]);
            },0);

            this.index = target;
        },

        beforeDestory:function(){
           this.el.removeClass(this.cls);
           AjaxTab.superclass.beforeDestory.call(this);
        }

    });


    $.fn.ajaxTab = function(options){
        this.each(function () {
            var el = $(this);
            if (!el.data(AjaxTab.prototype.type))
                el.data(AjaxTab.prototype.type, new AjaxTab(el, options));
        });
        return this;
    };

    $.App = $.App || {};

    $.extend($.App,{
        getAjaxTab : function(el){
            return $(el).data(AjaxTab.prototype.type);
        }
    });


    return AjaxTab;
});