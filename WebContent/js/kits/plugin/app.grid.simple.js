define(['jsPlugin/app.panel',
        'js!jsKits/bootstrap-slickgrid.js',
        'link!cssKits/bootstrap.slickgrid.css?20140325'], function(Panel){

    var TPL = {

        body :function() {/*!
            <div class="row">
                <div class="bootstrap-slickgrid grid"></div>
            </div>
        */}
    }

    var SimpleDataGrid = $.inherits(Panel, {

        cls : 'page-detail',

        type: 'simpledatagrid',

        onInitialize: function(){
            SimpleDataGrid.superclass.onInitialize.call(this);
            this.bodyRender = $.linesTpl(TPL.body);
            this.defaultSlickGridOptions = {
                  enableCellNavigation: false,
                  forceFitColumns: true,
                  autoHeight:true,
                  rowHeight: 35,
                  explicitInitialization:true,
                  jQueryUiStyles: false,
                  enableTextSelectionOnCells:true
            };
            this.beforeGridInit =  this.beforeGridInit || function(){};
            this.grid.slickGridOptions = $.extend(this.defaultSlickGridOptions, this.grid.slickGridOptions || {})
        },

        getBodyContent:function(){
            return this.bodyRender({});
        },

        onRender:function(){
            var self = this;
            SimpleDataGrid.superclass.onRender.call(this);
            //Slick Grid
            this.gridEl = this.el.find(".bootstrap-slickgrid");
            this.gridEl.slickgrid($.extend(this.grid,{data:this.data || []}));
            //延迟渲染 for chrome css rule delay
            setTimeout(function(){
                var sg = self.getSlickGrid();
                sg.onSort.subscribe(function (e, args) {
                     var sortVal = args.sortCol.sortVal,
                         sortDirt = args.sortAsc,
                         sortParams = [args.sortCol.field, sortDirt];
                     if(sortVal){ sortParams.push(sortVal);} //
                     sg.getData().sort($.sortBy.apply($, sortParams));
                     sg.invalidate();
                     sg.render();
                });
                sg.onHeaderCellRendered.subscribe(function(e, args){
                    var header = $(args.node),
                        column = args.column;
                    if(column.toolTip){
                        header.attr({'data-html':'true','data-toggle':'tooltip','data-placement':'top','data-container':'body'});
                        header.tooltip();
                    }
                });

                sg.setSelectionModel(new Slick.CellSelectionModel());    //注册选择模型
                sg.registerPlugin(new Slick.CellExternalCopyManager({ignoreFormatting:[]}));  //注册Excel插件

                sg.init();

                //exsit data // check init data
                if(self.data && self.data.length == 0){
                    sg.invalidateAllRows();
                    self.gridEl.addClass('empty-grid');
                    self.gridEl.find(".grid-canvas").html('<div class="empty-text">当前查询无记录</div>');
                }
            }, 200);

            //支持ajax请求
            if(this.store){
                this.store.done($.proxy(this.updateGridData, this));
            }
        },

        afterShow:function(){
            this.getSlickGrid().resizeCanvas();
        },

        getSlickGrid : function(){
            return this.gridEl.data('slickgrid').grid; // SlickGrid Ref
        },

        updateGridData: function(data){
            var slickGrid = this.getSlickGrid();
            if(data.length > 0){
                this.gridEl.removeClass('empty-grid');
                slickGrid.setData(data, true);
                slickGrid.render();
            }else{
                this.getSlickGrid().invalidateAllRows();
                this.gridEl.addClass('empty-grid');
                this.gridEl.find(".grid-canvas").html('<div class="empty-text">当前查询无记录</div>');
                return;
            }
        },

        beforeDestory : function(){
            this.store = null;
            this.getSlickGrid().destroy();
            SimpleDataGrid.superclass.beforeDestory.call(this);
        }

    });

    $.fn.simpleDataGrid = function (options) {
        this.each(function () {
            var el = $(this);
            if (!el.data(SimpleDataGrid.prototype.type))
                el.data(SimpleDataGrid.prototype.type, new SimpleDataGrid(el, options));
        });
        return this;
    };


    $.App = $.App || {};

    $.extend($.App,{
        getSimpleDataGrid : function(el){
            return $(el).data(SimpleDataGrid.prototype.type);
        }
    });

    return SimpleDataGrid;
});