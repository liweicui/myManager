define(['jsPlugin/app.ui.base'], function(UIBase){

    var Panel = $.inherits(UIBase, {

        title:"",

        html:"",

        enableNav:false,

        type:'panel',

        onRender:function(){
            var pEl = this.el;
            pEl.addClass('panel panel-default');
            this.el.hide(); //默认不显示
            this.renderHeader();
            this.renderBody();
        },

        renderHeader: function(){
            $('<div class="panel-heading clearfix"></div>').appendTo(this.el);
            this.renderTitle();
            this.renderNav();
        },
        
        setTitle : function(title){
        	this.el.find('.panel-heading .panel-title').html(title);
        },

        renderTitle: function(){
           this.el.find('.panel-heading').append('<span class="panel-title pull-left">'+ this.title +'</span>');
        },

        renderNav : $.noop,

        renderBody:function(){
            var bodyEl =$('<div class="panel-body"></div>');
            bodyEl.html(this.getBodyContent());
            this.el.append(bodyEl);
        },

        getBodyContent:function(){
            return this.html;
        },

        beforeDestory:function(){
            this.el.removeClass('panel panel-default');
        }
    });


    return Panel;
});