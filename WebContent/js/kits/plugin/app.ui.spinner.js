define(['jsPlugin/app.ui.base'], function(UIBase){
//
//    var TPL = {
//
//        lock :function() {/*!
//            <div class="mask">
//               <span class="loading"></span>
//            </div>
//        */}
//    }

    var SpinnerMask = $.inherits(UIBase, {

        type: 'spinnermask',

        /**
         * 构造函数
         */
        constructor: function(el, options){
            $.extend(this, options || {});
            this.el = $(el);
            this.el.data(this.getType(), this);
            this.init();
        },

        onRender: function(){
            this.maskEl = $('<div class="mask" style="display:none;" ><span class="loading-icon"></span></div>').appendTo(document.body);
        },

        selfShow: function(){
            this.maskEl.css($.extend({ width: this.el.width(), height:  this.el.height(), zIndex:9999,
                position:'absolute',opacity: 0.5, 'background-color':'#FFFFFF','text-align':'center'},
                this.el.offset()));
            if(this.el[0] == document.body){
                this.maskEl.css({width:'100%',height:'100%'});
                $(this.el[0]).css('overflow','hidden');
                this.maskEl.find('.loading-icon').css('margin', (($(window).height() - 46) / 2) + 'px 0');
            }else{
                this.maskEl.find('.loading-icon').css('margin', ((this.el.height() - 46) / 2) + 'px 0');
            }

            this.maskEl.show();
        },

        selfHide: function(){
            this.maskEl.hide();
        },

        destroy : function(){
            if(this.destroyed) return false;
            if (this.rendered) {
                this.beforeDestory();
                this.el.removeData(this.getType(), this);
                this.el.removeClass(this.cls);
                if(this.el[0] == document.body){
                    $(this.el[0]).css('overflow','auto');
                }
                this.maskEl.remove();
                this.maskEl = null;
            }
            this.destroyed = true;
        }

    });

    $.fn.spinnerMask = function(options){
        this.each(function () {
            var el = $(this);
            if (!el.data(SpinnerMask.prototype.type))
                el.data(SpinnerMask.prototype.type, new SpinnerMask(el, options));
        });
        return this;
   };

   $.App = $.App || {};

   $.App.getSpinnerMask = function(el){
       return $(el).data(SpinnerMask.prototype.type);
   }

   return SpinnerMask;
});