define(['jsPlugin/app.pop.base', 'jsPlugin/app.tag.select'], function(PopBase, TagSelect){

    var TagSelectPicker = $.inherits(PopBase, {

        autoShow : false,

        bound: true,

        type: 'tagselectpicker',

        onInitialize:function(){
            TagSelectPicker.superclass.onInitialize.call(this);
        },

        onRender: function(){
            TagSelectPicker.superclass.onRender.call(this);
            //reset input
            this.valEl = $('<input type="hidden" name="'+ (this.el.attr('name') || 'tagSelectValue')  +'">');
            this.el.attr('name','tagSelectText');
            this.el.after(this.valEl);
            this.el.on('click', $.proxy(this.selfShow, this));
        },

        renderBody: function(){
            this.body.css({'padding':'0px',"border":"none"});
            this.tagSelect = new TagSelect(this.body, $.extend(this.opts, { onSelect : $.proxy(this.renderText , this) }));
        },

        renderText: function(nav, selected){
            if(selected.inputDisplay){
                this.el.val(selected.inputDisplay);
            }else{
                this.el.val(nav.text + "~" + selected.text);
            }
            this.hide();
        },

        beforeDestory: function(){
            this.tagSelect.destroy();
            this.tagSelect = null;
            this.el.attr('name', this.valEl.attr('name'));
            this.valEl.remove();
            this.valEl = null;
        }
    });

    $.fn.tagselectpicker = function (options) {
        this.each(function () {
            var el = $(this);
            if (!el.data(TagSelectPicker.prototype.type))
                el.data(TagSelectPicker.prototype.type, new TagSelectPicker(el, options));
        });
        return this;
    };

    $.App = $.App || {};

    $.extend($.App,{
        getTagSelectPicker : function(el){
            return $(el).data(TagSelectPicker.prototype.type);
        }
    });

    return TagSelectPicker;
});