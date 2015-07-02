define(function(){

   /**
    * UI组件基类
    */
   var UIBase =  $.inherits(Object,{

        el:undefined,

        //inner tpl
        tpl: undefined,

        rendered: false,

        destroyed: false,

        autoShow: true,

        //sub class override
        onInitialize:$.noop,

        onRender:$.noop,

        beforeDestory:$.noop,

        afterShow: $.noop,

        cls:'',

        type:'',

        /**
         * 构造函数
         */
        constructor: function(el, options){
            this.opts = options || {};
            $.extend(this, this.opts );
            this.el = $(el);
            this.el.data('ui.kit', this);
            this.el.data(this.getType(), this);
            this.init();
        },

        getType: function(){
            return this.type;
        },

        init: function(){
            this.onInitialize();
            this.render();
            this.afterRender();
        },

        render: function(){
            if(!this.rendered && !this.destroyed){
                this.onRender();
                this.rendered = true;
                if(this.autoShow){
                    this.show();
                }
            }
        },

        afterRender: function(){
            this.el.addClass(this.cls);
        },

        show : function(){
            if(this.destroyed){
                return false;
            }

            if(this.rendered ){
                this.selfShow();
            }

            this.afterShow();
        },

        selfShow: function(){
            this.el.show();
        },

        hide : function(){
            if(this.rendered){
                this.selfHide();
            }
        },

        selfHide: function(){
            this.el.hide();
        },

        destroy : function(isRemove){
            if(this.destroyed) return false;
            if (this.rendered) {
                this.beforeDestory();
                this.el.removeData(this.getType(), this);
                this.el.removeData('ui.kit', this);
                this.el.removeClass(this.cls);
                this.el[isRemove ? 'remove' : 'empty']();
                this.el = null;
            }
            this.destroyed = true;
        }
    });

    return UIBase;
});