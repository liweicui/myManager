define(['jsPlugin/app.ui.base', 'link!cssKits/common/notify.new.css?20131223'], function(UIBase){

    var TPL = {

        body :function() {/*!
           <div class="panel panel-primary notify">
                <div class="panel-heading clearfix">
                    <h3 class="panel-title pull-left"><#=this.title#></h3>
                    <button type="button" class="close pull-right" >&times;</button>
                </div>
                <ul class="list-group">
                     <#for(var i =0 ; i< this.reminders.length; i++){#>
                        <#if(this.reminders[i].type == 0 ){#>
                             <li data-id="<#=this.reminders[i].id#>" class="list-group-item clearfix">
                                 <span class="glyphicon glyphicon-envelope"></span>
                                 <span class="title"><#=this.reminders[i].title#></span>
                                 <button type="button" class="btn btn-link pull-right detail-btn">详情</button>
                             </li>
                        <#}else if(this.reminders[i].type == 1 ){#>
                             <li data-id="<#=this.reminders[i].id#>" data-bid="<#=this.reminders[i].businessId#>" class="list-group-item clearfix">
                                   <span class="glyphicon glyphicon-stats"></span>
                                 <#if(this.reminders[i].hasFunction == 0){#>
                                    <span class="title"><#=this.reminders[i].title#></span>
                                    <button type="button" class="btn btn-primary pull-right apply-btn">申请</button>
                                 <#}else{#>
                                    <span class="title"><#=this.reminders[i].title#></span>
                                    <button type="button" class="btn btn-success pull-right go-btn">查看</button>
                                 <#}#>
                             </li>
                        <#}#>
                     <#}#>
                </ul>
            </div>
        */},

        submit : function(){/*!
            <div class="modal fade apply-report-right" data-bid="<#=bid#>" data-id="<#=id#>" style="display: none;">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">申请报表权限-<#=actionName#></h4>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-4">
                    <h4>上级领导邮箱</h4>
                  </div>
                  <div class="col-md-8">
                    <p><input class="form-control" type="text" name="email" ></p>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" data-dismiss="modal" class="btn btn-default">取消</button>
                <button type="button" class="btn btn-primary submit">确认</button>
              </div>
            </div>
        */}

    };

    /*
       <li data-id="1" class="list-group-item clearfix"><a href="#">社交SDK广告数据报表</a><button type="button" class="btn btn-success pull-right view-btn">查看</button></li>
       <li data-id="2" class="list-group-item clearfix"><a href="#">实时分析报表</a><button type="button" class="btn btn-warning pull-right progress-btn">审批中</button></li>
       <li data-id="3" class="list-group-item clearfix"><a href="#">水果忍者</a><button type="button" class="btn btn-primary pull-right apply-btn">申请</button></li>
       <li data-id="4" class="list-group-item clearfix"><a href="#">最新新报表4</a><button type="button" class="btn btn-primary pull-right apply-btn">申请</button></li>
       <li data-id="5" class="list-group-item clearfix"><a href="#">最新新报表4</a><button type="button" class="btn btn-primary pull-right apply-btn">申请</button></li>
       <li data-id="6" class="list-group-item clearfix"><a href="#">最新新报表4</a><button type="button" class="btn btn-primary pull-right apply-btn">申请</button></li>
     *
     */

    var NewReportNotify = $.inherits(UIBase, {

        cls : 'notify',

        showed: false,

        onInitialize : function(){
            NewReportNotify.superclass.onInitialize.call(this);
            this.bodyRender = $.linesTpl(TPL.body);
            this.submitRender = $.linesTpl(TPL.submit);
            this.defaultWidth =  300 || this.defaultWidth;
            this.resetPostionFn  = null;
            this.title =  this.title || '最新消息';
            this.emailRegx = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/;
            this.cacheRecords = {};
        },

        onRender: function(){
            var self = this;
            var renderHtml = this.bodyRender({ title:this.title, reminders: this.reminders});
            //cache key->record
            for (var i = 0; i < this.reminders.length; i++) {
                var reminder = this.reminders[i];
                this.cacheRecords[reminder.id] = reminder;
            }

            this.el = $(renderHtml);
            this.el.css({
                position: 'absolute',
                width: this.defaultWidth,
                top: $(window).height() + $(window).scrollTop() + this.el.height() ,
                right: 0
            });

            $(document.body).append(this.el);

            this.el.find(".close").on('click', function(){
                $('.notify .list-group .list-group-item').each(function(index, item){
                   var id =   $(item).attr("data-id");
                   self.submitViewed(id);
                });
                self.destroy(true);
            });

            //点击文字
            this.el.find(".title").on('click', function(e){
                 var target =  $(this),
                     id = target.closest("li").attr("data-id");
                 self.showDetail(self.cacheRecords[id]); // 显示详情
                 self.submitViewed(id); //记录查看
            });



            //点击导航按钮
            this.el.find("button").on('click',function(e){
                var target =  $(this),
                    id = target.closest("li").attr("data-id"),
                    bid = target.closest("li").attr("data-bid"),
                    record = self.cacheRecords[id];

                self.submitViewed(id); //记录查看

                if(target.hasClass('apply-btn')){
                    self.showSubmitModal(id , bid, record.actionName);
                }else if(target.hasClass('go-btn')){
                    window.goFunction(record.action, record.forder); //查看新报表
                }else if(target.hasClass('detail-btn')){
                    self.showDetail(record); // 显示详情
                }
            });

            this.scrollListenerFn = $.proxy(this.scrollListener, this);
            $(window).on('scroll', this.scrollListenerFn);

            //dialog
            $(document.body).on("click", ".apply-report-right .submit", $.proxy(this.submitForm, this) );
        },

        showDetail : function(record){
            $.dialog({
                title: record.title ,
                message: record.description,
                buttons:{
                    main:{
                        label: "关闭",
                        className: "btn-primary"
                    }
                }
            });
        },

        showSubmitModal: function(id, bid, actionName){
            var applyTpl = this.submitRender({ id: id, bid: bid, actionName:actionName});
            $(applyTpl).modal();
        },

        submitForm : function(e){
            var modal = $(e.target).closest(".apply-report-right"),
                bid = modal.attr("data-bid"),
                id = modal.attr('data-id'),
                emailVal = modal.find('input[name="email"]').val(),
                record = this.cacheRecords[id],
                self = this;

            //判断是否为email
            if($.isEmpty(emailVal) || !self.emailRegx.test(emailVal)){
                $.error("请输入合法的邮箱地址");
                return;
            }

            //禁用按钮
            $(e.target).attr("disabled","disabled");

            //提交请求
            $.ajax({
                url: "submitApplyAction",
                type: "POST",
                data: {
                   reportId: bid,
                   email: emailVal,
                   reportName: record.actionName
               }
            }).done(function(msg){
                $(".apply-report-right").data("modal").hide();
//                var items = $('.notify .list-group .list-group-item');
//                if(items.size() == 1 ){
//                    self.destroy(true);
//                }else{
//                    items.filter('li[data-bid="'+ bid +'"]').remove();
//                }
                $.notify("成功提交报表申请请求");
            });
        },

        submitViewed: function(id){
             $.ajax({
                url: "submitViewed",
                type: "POST",
                data: {msgId: id}
            });
        },

        scrollListener : function(){
            var self = this;
            if(!self.showed)return;

            if(self.resetPostionFn){
                clearTimeout(self.resetPostionFn);
                self.resetPostionFn = null;
            }

            self.resetPostionFn  = setTimeout(function(){
                self.el.css({
                    top: $(window).scrollTop() + $(window).height() -  self.el.height() - 20
                });
            },80);
        },

        selfShow : function(){
            var self = this;
            self.el.animate({
                top: "-="+(self.el.height() + 20)
            },500,function(){
                self.showed = true;
            });
        },

        beforeDestory:function(){
            this.cacheRecords = null;
            $(window).unbind('scroll', this.scrollListenerFn);
        }
    });

    $.App = $.App || {};

    $.extend($.App, {
        reportNotify : function(options){
            if(options && options.reminders && options.reminders.length > 0){
                new NewReportNotify(null, options);
            }
        }
    });

    return NewReportNotify;
});