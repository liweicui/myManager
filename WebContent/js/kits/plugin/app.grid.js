define(['jsPlugin/app.panel.js?20140113',
        'jsPlugin/app.ui.spinner',
        'js!jsKits/bootstrap-paginator.min.js',
        'link!cssKits/bootstrap.slickgrid.css?20140325'], function(Panel, SpinnerMask){

    var TPL = {

        body :function() {/*!
            <div class="row">
                <div class="bootstrap-slickgrid grid"></div>
            </div>
            <div class="row page-bar">
                <div class="col-md-4">
                    <form class="form-inline page-size-wrap" role="form">
                       <div class="form-group">
                           <label class="control-label per-size">每页条数</label>
                           <select  class="selectpicker page-size">
                              <#for(var i=0; i<pageSizes.length;i++){#>
                                  <option value="<#=pageSizes[i]#>"><#=pageSizes[i]#></option>
                              <#}#>
                           </select>
                       </div>
                    </form>
                </div>
                <div class="col-md-8 text-right">
                    <div class="form-inline">
                        <div class="form-group">
                            <ul class="paginator">
                            </ul>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control input-sm" name="pageNo" placeholder="页号">
                        </div>
                        <div class="form-group">
                            <button type="button" class="btn btn-default btn-sm jump-page" >
                              <span class="glyphicon glyphicon-share-alt"></span>跳转
                            </button>
                        </div>
                        <div class="form-group">
                          <label class="control-label total-records"></label>
                       </div>
                    </div>
                </div>
            </div>
        */}
    }

    var DataGrid = $.inherits(Panel, {

        cls : 'page-detail',

        type: 'datagrid',

        showExport: {
        	enable:false,
       	    label:"导出"
         },

        useDataView: false,

        onInitialize: function(){
            DataGrid.superclass.onInitialize.call(this);
            this.bodyRender = $.linesTpl(TPL.body);
            this.pageSizeOpt = this.pageSizes || [ 10, 20, 30, 50, 100] /*Defaults Record*/;
            this.defaultSlickGridOptions = {
                  enableCellNavigation: true,
                  forceFitColumns: true,
                  autoHeight:true,
                  rowHeight: 35,
                  multiColumnSort: false,
                  explicitInitialization:true,
                  jQueryUiStyles: false,
                  enableTextSelectionOnCells:true
            };
            this.grid.slickGridOptions = $.extend(this.defaultSlickGridOptions, this.grid.slickGridOptions || {});
            this.beforeGridInit =  this.beforeGridInit || function(){};
            this.beforeDataChange = this.beforeDataChange || function(){};
            this.onExportClick = this.onExportClick || function(){};
        },

        renderNav:function(){
            if(this.showExport.enable){
                var exportBtn= $($.format('<button type="button" class="btn btn-default btn-sm pull-right"><span class="glyphicon glyphicon-export"></span>&nbsp;{0}</button>', this.showExport.label));
                this.el.find('.panel-heading').append(exportBtn);
                exportBtn.on('click', this.onExportClick);
            }
        },

        getBodyContent:function(){
            return this.bodyRender({ pageSizes: this.pageSizeOpt});
        },

        onRender:function(){
            var self = this;
            DataGrid.superclass.onRender.call(this);
            //Slick Grid
            this.gridEl = this.el.find(".bootstrap-slickgrid");

            if(this.useDataView){
                this.dataView = new Slick.Data.DataView({ inlineFilters: true });
                this.slickGrid = new Slick.Grid(this.gridEl[0], this.dataView, this.grid.columns, this.grid.slickGridOptions);
                this.dataView.onRowCountChanged.subscribe(function (e, args) {
                    self.slickGrid.updateRowCount();
                    self.slickGrid.render();
                });
                this.dataView.onRowsChanged.subscribe(function (e, args) {
                    self.slickGrid.invalidateRows(args.rows);
                    self.slickGrid.render();
                });
            }else{
                this.slickGrid = new Slick.Grid(this.gridEl[0], [], this.grid.columns, this.grid.slickGridOptions);
            }

            //延迟渲染 for chrome css rule delay
            setTimeout(function(){
                var sg = self.getSlickGrid();
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

                self.beforeGridInit(self.slickGrid, self.dataView, self.gridEl);
                sg.init();
            }, 200);

            this.proxyResizeGrid = $.proxy(this.resizeGrid, this);
            //监听
            $(window).on('resize',this.proxyResizeGrid);

            //select page size 页数始终引用self.store
            this.pageSizeEl = this.el.find("select");
            this.pageSizeEl.select2();
            this.pageSizeEl.on('change',function(){
                var newSize =  parseInt(self.pageSizeEl.select2('val'),10);
                //重置记录和分页
                self.store.getData(1, newSize);
            });

            //总记录数
            this.totalEl = this.el.find('.total-records');

            //跳转按钮
            this.el.find('.jump-page').on('click',function(e){
                var inputEl = self.el.find('input[name="pageNo"]'),
                    newPage =  parseInt(inputEl.val() , 10) ,
                    pagetor = self.getPaginator();
                //check store or pagetor is ready
                if(self.store == null || pagetor == null ) return;
                if(newPage != pagetor.currentPage  && newPage > 0 && newPage <= pagetor.totalPages ){
                    pagetor.show(newPage);
                    inputEl.val('');
                }
                e.preventDefault();
            });

            //分页组件
            this.paginatorEl = this.el.find(".paginator");

            if(this.store){
                this.loadStore();
            }
        },

        afterShow : function(){
            this.resizeGrid();
        },

        resizeGrid : function(){
            this.getSlickGrid().resizeCanvas();
        },

        createPagetor : function(currentPage, totalPages ){
            var self = this;
            self.paginatorEl.bootstrapPaginator({
                currentPage: currentPage,
                totalPages: totalPages || 1,
                bootstrapMajorVersion:3,
                size:'small',
                onPageChanged: function(e, oldPage, newPage){
                    self.store.getData(newPage);
                    //console.log(newPage);
                }
            });
        },

        getSlickGrid : function(){
            return this.slickGrid;
        },

        getPaginator : function(){
            return this.paginatorEl.data('bootstrapPaginator');
        },

        gridDataChange: function(data, currentPage , pageSize ,totalPages ,totalRecords){
            var pagetor = this.getPaginator(),
                slickGrid = this.getSlickGrid();

            this.beforeDataChange(data, slickGrid);

            if(pagetor == null){
                this.createPagetor(currentPage, totalPages);
            }else if(totalPages != pagetor.totalPages){
                pagetor.destroy();
                this.createPagetor(currentPage,totalPages);
            }else{
                pagetor.show(currentPage);
            }

            this.totalEl.html($.format("共{0}条", totalRecords ));

            this.pageSizeEl.select2("val", pageSize); //update PageSize
            if(data.length > 0){
                this.gridEl.removeClass('empty-grid');
                if(!this.grid.slickGridOptions.forceFitColumns){
                	this.gridEl.removeClass('scroll-grid');
                }
                this.gridEl.find('.empty-text').remove();
                if(this.useDataView){
                    this.dataView.beginUpdate();
                    this.dataView.setItems(data, this.store.idProperty);
                    this.dataView.endUpdate();
                }else{
                	slickGrid.invalidateAllRows();
                    slickGrid.setData(data,true);
                    slickGrid.render();
                }
                slickGrid.resizeCanvas();
            }else{
                this.getSlickGrid().invalidateAllRows();
                this.getSlickGrid().setData([],true);
                this.gridEl.addClass('empty-grid');
                if(!this.grid.slickGridOptions.forceFitColumns){
                	this.gridEl.addClass('scroll-grid');
                }
                this.gridEl.find(".grid-canvas").html('<div class="empty-text">当前查询无记录</div>');
                return;
            }
        },

        loadStore: function(store){
            var self = this,
                pagetor = self.getPaginator();
            //check old store, reset paginator
            if(pagetor && (store != this.store)){
               self.getPaginator().destroy();
            }

            this.store = store || this.store;

            //load new store
            this.store.addDataChange(self.gridDataChange, self);

            //监听状态
            this.store.setListeners({
                onBeforeReqest: function(){
                    if(self.el.is(":visible")){ //当前元素显示才显示
                        self.el.spinnerMask();
                    }
                },
                onSuccess: function(){
                    var spinnerMask =  $.App.getSpinnerMask(self.el);
                    if(spinnerMask)spinnerMask.destroy();
                },
                onFail: function(){
                    var spinnerMask =  $.App.getSpinnerMask(self.el);
                    if(spinnerMask)spinnerMask.destroy();
                }
            });

            //开始加载数据
            this.store.getData();
        },

        beforeDestory:function(){
            this.store = null;
            this.getSlickGrid().destroy();
            if(this.getPaginator()) this.getPaginator().destroy();
            $(window).unbind('resize',this.proxyResizeGrid);
            this.proxyResizeGrid = null;
            DataGrid.superclass.beforeDestory.call(this);
        }

    });

    $.fn.dataGrid = function (options) {
        this.each(function () {
            var el = $(this);
            if (!el.data(DataGrid.prototype.type))
                el.data(DataGrid.prototype.type, new DataGrid(el, options));
        });
        return this;
    };


    $.App = $.App || {};

    $.extend($.App,{
        getDataGrid : function(el){
            return $(el).data(DataGrid.prototype.type);
        }
    });

    return DataGrid;
});