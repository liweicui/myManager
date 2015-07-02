define(['jsPlugin/app.panel', 'js!jsKits/highcharts.js'], function(Panel){

     var TPL = {

        IDENTITY : 0 ,

        nav :function() {/*!
            <div class="btn-group btn-group-sm" data-toggle="buttons">
                <#for(var i=0; i<nav.length;i++){#>
                    <label class="btn btn-default" <#if(nav[i].uiKit){#> data-ui-id="<#=nav[i].uiKit#>" <#}#> >
                        <input type="radio" name="options_nav_<#=identity#>" value="<#=i#>" ><#=nav[i].tabName#>
                    </label>
                <#}#>
            </div>
        */},

        content: function(){/*!
            <div class="chart-wrap">
                <#for(var i=0; i<nav.length;i++){#>
                    <div data-cindex="<#=i#>" class="spline-chart chart-hide"></div>
                <#}#>
            </div>
        */}
    };

    var TabChart = $.inherits(Panel, {

        cls:'tab-spline',

        index : 0 , //默认显示第一个

        type: 'tabchart',

        onInitialize:function(){
            TabChart.superclass.onInitialize.call(this);
            this.navRender = $.linesTpl(TPL.nav);
            this.contentRender = $.linesTpl(TPL.content);
            this.charts = [];
            this.identity = TPL.IDENTITY++;
            this.changeEvent = this.changeEvent || function(){};
            this.chartDefaultHeight = this.chartDefaultHeight || 400; //HighCharts默认高度400
        },

        getBodyContent:function(){
            var navHtml = this.navRender({nav:this.data, identity : this.identity });
            var contentHtml = this.contentRender({nav:this.data, identity: this.identity });
            return navHtml + contentHtml;
        },

        onRender:function(){
            var self = this;
            TabChart.superclass.onRender.call(this);
            this.navEls = $(this.el).find('.btn-group .btn');
            this.chartEls = $(this.el).find('.spline-chart');
            this.chartWrapEl = $(this.el).find('.chart-wrap');
            this.createCharts();
            if(this.data.length == 1){
                this.el.find(".btn-group").addClass('hidden');
            }else{
                //register switch
                $(this.el).find('input[type="radio"]').change(function(){
                    var index = $(this).val();
                    self.changeEvent(index, self.data[index]);
                    self.showChart(index);
                });
            }

            this.showChart(this.index);
        },

        afterShow:function(){
            for (var i = 0; i < this.charts.length; i++) {
                this.charts[i].setSize(this.el.find('.chart-wrap').width() - 30 /*hack panel-body padding 15px*/, this.chartDefaultHeight);
            }
        },

        createCharts: function(){
            var chartData, self = this;
            for(var i = 0; i< this.data.length;i++){
                chartData = this.data[i];
                chartData.highchart.chart = chartData.highchart.chart || {}; //默认值
                $.extend(chartData.highchart.chart,{
                    renderTo:this.chartEls.get(i),
                    width: this.chartWrapEl.width(),
                    reflow:false
                });
                this.charts.push(new Highcharts.Chart(chartData.highchart));
            }

            //proxyResize
            this.proxyResizeChart = $.proxy(this.resizeChart, this);
            //resize lisenter
            $(window).resize(this.proxyResizeChart);
        },

        resizeChart: function(){
             var wrapEl = this.chartWrapEl;
             if(this.el.is(":visible")){ //显示状态下才进行Resize
                for(var i in this.charts){
                    this.charts[i].setSize(wrapEl.width(), this.chartDefaultHeight);
                 }
             }
        },

        showChart:function(target){
            var self = this;
            //display default chart
            $(this.navEls.get(target)).addClass('active');
            $(this.chartEls.get(this.index)).addClass('chart-hide');
            setTimeout(function(){
                 $(self.chartEls.get(target)).removeClass('chart-hide');
            },0);
            this.index = target;
        },

        beforeDestory:function(){
           for(var i in this.charts){
             this.charts[i].destroy();
           }
           this.charts = null;
           this.el.removeClass('tab-spline');
           $(window).unbind('resize',this.proxyResizeChart);
           this.proxyResizeChart = null;
           TabChart.superclass.beforeDestory.call(this);
        }

    });


    $.fn.panelChart = function(options){
        options.data = [{tabName:"", highchart: options.data}];
        this.each(function () {
            var el = $(this);
            if (!el.data(TabChart.prototype.type))
                el.data(TabChart.prototype.type, new TabChart(el, options));
        });
    };

    $.fn.tabChart = function(options){
        this.each(function () {
            var el = $(this);
            if (!el.data(TabChart.prototype.type))
                el.data(TabChart.prototype.type, new TabChart(el, options));
        });
        return this;
    };

    $.App = $.App || {};

    $.extend($.App,{
        getPanelChart : function(el){
            return $(el).data(TabChart.prototype.type);
        },

        getTabChart : function(el){
            return $(el).data(TabChart.prototype.type);
        }
    });


    return TabChart;
});