define(['jsPlugin/app.ui.base'], function(UIBase){

    var PopBase = $.inherits(UIBase, {

        autoShow : false,

        type: 'popbase',

        parentNode: 'body',

        html: "" ,

        bound : false,

        postion: 'bottom',

        offset: 5,
        
        trigger: 'click',

        onInitialize:function(){
            this.parentEl = $(this.parentNode);
        },

        afterRender: function(){
            this.container.addClass(this.cls);
        },

        onRender:function(){
            this.container = $('<div class="popover"><div class="arrow"></div><div class="popover-content"></div>');
            this.body = this.container.find(".popover-content");
            this.container.addClass(this.postion);

            this.parentEl.append(this.container);
            this.renderBody();
            
            if(this.trigger){
            	this.el.on(this.trigger, $.proxy(this.selfShow, this));
            	
            }
            
            
            this.proxyBodyListener = $.proxy(this.pickerBodyListener, this);
        },

        renderBody: function(){
            this.body.html(this.html || "");
        },

        pickerBodyListener: function(e){
            var picker = $(e.target).closest('.popover');
            if(picker.size() == 0) {this.selfHide();}
        },

        selfShow: function(){
            var self = this;
            this.container.show();
            this.container.css(this.getPopPostion());
            if(this.bound){
                setTimeout(function(){
                    $(document.body).on('click', self.proxyBodyListener);
                },10);
            }
        },

        getPopPostion : function(){
            var pos = this.el.offset();
            if(this.postion == 'top'){
                pos.top -= (this.container.height() + this.offset );
            }else if(this.postion == 'right'){
                pos.left += (this.el.outerWidth() + this.offset);
            }else if(this.postion == 'bottom'){
                pos.top += (this.el.outerHeight() + this.offset);
            }else if(this.postion == 'left'){
                pos.left -= (this.container.width() + this.offset);
            }

            return pos;
        },

        selfHide: function(){
            if(this.bound){
                $(document.body).unbind('click', this.proxyBodyListener);
            }
            this.container.hide();
        },

        destroy : function(){
            if(this.destroyed) return false;
            if (this.rendered) {
                this.beforeDestory();
                this.container.remove();
                this.container = null;
                this.el.removeData(this.getType(), this);
                this.el.removeData('ui.kit', this);
                this.el = null;
            }
            this.destroyed = true;
        }
    });

    $.fn.popbase = function (options) {
        this.each(function () {
            var el = $(this);
            if (!el.data(PopBase.prototype.type))
                el.data(PopBase.prototype.type, new PopBase(el, options));
        });
        return this;
    };

    $.App = $.App || {};

    $.extend($.App,{
        getPopBase : function(el){
            return $(el).data(PopBase.prototype.type);
        }
    });

    return PopBase;
});