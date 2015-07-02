L.ready( 
			['jsPlugin/app.asyncstore.js','appPlugin/basic.filter','jsPlugin/app.grid.js?20140325','appPlugin/basic.multi.filter',
             'jsPlugin/app.ui.wrap.js','js!jsKits/slickgrid/slick.editors.js','jsPlugin/app.date.picker.js?20140424'],
			function(AS){
        var Page = {

                identifier : 1,

                eventCacheData: [],

                init : function(){
                    $("#submitAddFilter").on('submit', this.submitForm);
                    $('#dateSelect').datepicker({
                        firstDay: 1,
                        minDate: moment().toDate(),
                        maxDate:  moment().add('y', 99).toDate()
                    });
                    var s1=2;
                    $("#peteggLevel").ajaxSelect({
                        ajax: function(){
                            return $.ajax({
                                url: 'queryPetEggSelect',
                                type: "POST",
                            });
                        },
                        
                        adapter: function(msg){
                        	var defaultpetid = $("#peteggLevel").val();
                            var petCacheData = [{id:'',text:"请选择宠物蛋"}];
                            for(var i = 0 ; i < msg.stuffList.length;i++){
                                var  e = msg.stuffList[i];
                                petCacheData.push({ id: e.stuffId, text: e.stuffName });
                                if(e.stuffId==defaultpetid){
                                	s1=i+1;
                                }
                            }
                            return petCacheData;
                        },
                        isClientPage:true,
                        selectedIndex:s1,
                      });
                },
                		

                submitForm: function(e){
                    var filterNameEl = $("#loginkey");
                    var loginvalue=$('#loginvalue').val();
                  
                    if($.isEmpty(filterNameEl.val())){
                        $.error("key 不能为空");
                        return false;
                    }
                    if($.isEmpty(loginvalue)){
                        $.error("value 不能为空");
                        return false;
                    }
                }
            }

            Page.init();
	});