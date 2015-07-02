define(['jsPlugin/app.ui.base'], function(UIBase){

    //
    var TPL = {

        header :function() {/*!
            <tr>
                <# for (var i = 0, l = headers.length; i < l; i ++) { #>
                    <th class="header-cell"><span><#=headers[i].text#></span></th>
                <#}#>
            </tr>
        */},

        rows: function(){/*!
            <# for (var i = 0; i < datas.length; i ++) {
                  var row = datas[i];                 #>
                <tr>
                    <#for(var j =0; j< headers.length; j++ ){#>
                        <td><#=row[headers[j].name]#></td>
                    <#}#>
                </tr>
            <#}#>
        */}
    };


    var BasicGrid = $.inherits(UIBase,{

        cls: 'table',

        isStand: true,

        isBorder: true,

        isfixWidth: false,

        type:'tablegrid',

        defaultCellRender : function(col){ return col;},

        onInitialize: function(){
           this.render = this.render || {};
           this.cellRender = this.cellRender || {};
           this.headerRender = $.linesTpl(TPL.header);
           this.rowsRender = $.linesTpl(TPL.rows);

           for(var i in this.header){
                var key = this.header[i].name;
                if(!this.cellRender[key]) this.cellRender[key] =  this.defaultCellRender;
           }
        },

        onRender: function(){
           var self = this,
               tableEl = this.el,
               headerHtml, rowsHtml,tbodyEl;
           //basic style
           if(this.isBorder)tableEl.addClass('table-bordered');
           if(this.isStand)tableEl.addClass('head-bg');
           if(this.isfixWidth)tableEl.addClass('table-fixed');

           this.el.hide(); //默认不显示

           //add header
           headerHtml = this.headerRender({headers: this.header});

           //add body
           rowsHtml = this.rowsRender({datas:this.getRenderData(), headers: this.header });

           tbodyEl = $([headerHtml, rowsHtml].join(''));

           //append To Dom
           tableEl.append(tbodyEl);

           //addtoolTip
           setTimeout(function(){
               var headerCells = tbodyEl.find(".header-cell span");
               for(var i=0; i < headerCells.size(); i++){
                 var header = $(headerCells[i]), column = self.header[i];
                 if(column.toolTip){
                    header.attr({'title':column.toolTip, 'data-html':'true','data-toggle':'tooltip','data-placement':'top','data-container':'body'});
                    header.tooltip();
                 }
               }
           },0);

        },

        getRenderData: function(){
            var renderData,
                self = this;
            if($.isEmptyObject(this.cellRender)){
                return this.data;
            }
            renderData = [];
            $.each(this.data, function(index, val){
                var row = $.extend({},val);
                $.each(self.cellRender, function(key, fn){
                    row[key] = fn.apply(self, [row[key], row]);
                });
                renderData.push(row);
            });
            return renderData;
        },

        beforeDestory:function(){
           this.el.removeClass('table-bordered head-bg table-fixed');
        }


    });

    /**
     * 单行高亮表格
     */
    var SingeRowGrid = $.inherits(BasicGrid,{

        defaultCellRender : function(col){
            return '<h2>'+col+'</h2>';
        },

        onRender:function(){
            SingeRowGrid.superclass.onRender.call(this);
            this.el.addClass('single-row-table');
        }

    });


    $.fn.basicGrid = function (options) {
        this.each(function () {
            var el = $(this);
            if (!el.data(BasicGrid.prototype.type))
                el.data(BasicGrid.prototype.type, new BasicGrid(el, options));
        });
        return this;
    };

    $.fn.singeRowGrid = function(options){
        this.each(function () {
            var el = $(this);
            if (!el.data(SingeRowGrid.prototype.type))
                el.data(SingeRowGrid.prototype.type, new SingeRowGrid(el, options));
        });
        return this;
    };

    $.App =  $.App || {};

    $.App.getTableGird = function(el){
        return $(el).data(BasicGrid.prototype.type);
    };

    return {
        SingeRowGrid:SingeRowGrid,
        BasicGrid:BasicGrid
    };
});