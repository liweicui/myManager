	$(document).ready(function(){
		          	$("input:text[name=BEGIN_DATE]").click(function(){
		          		var beginDate = document.getElementById("BEGIN_DATE").value ;
		          		if($.trim(beginDate)==''){
							WdatePicker();
						}
					});
					$("input:text[name=END_DATE]").click(function(){
		          		var endDate = document.getElementById("END_DATE").value ;
		          		if($.trim(endDate)==''){
							WdatePicker();
						}
					});
			  });
			  function getAjaxActGames(obj){
			     if(obj.value!=''){
			     	if(obj.value==3){
			     		$("#GAMEID").html("");
			     		$("#gamehide").css("display","none");
			     	}else{
					  	$.ajax({
							type:'post',
							url:'../act/actinfo.do',
							data:'method=getAjaxActGames&GAMETYPE=' + obj.value+'&prv=query',
							success:function(data){		
								var str = combinStr(data);
								$("#GAMEID").html(str);
								$("#gamehide").css("display","");
							}
						});
					}
				  }else{
				  	  var str1 = "<option value=''>请选择游戏</option>" ;
				  	  $("#GAMEID").html(str1);
				  	  $("#gamehide").css("display","");
				  }
			  }
			  function combinStr(data){
			  	var jsonObj = eval("("+data+")") ;
			  	var str = "" ;
				for(var i = 0;i<jsonObj.length;i++){
					str = str + "<option value='"+jsonObj[i].GAMEID+"'>"+jsonObj[i].GAMENAME+"</option>" ;
				}
				return str ;
			}
      var flag = true ;
	  //ajax验证活动相关信息
	  function validateAdd(str,actname){
	  		if('add'==str){ //如果是新增才需要检测编号
		  		 var ACTID = document.getElementById("ACTID").value ;
		  		 var ACTNAME = document.getElementById("ACTNAME").value ; 
		  		 var ACT_GAME = document.getElementById("GAMEID").value ; 
		  		 var CLASSID = document.getElementById("CLASSID").value ; 
		  		 if($.trim(ACTID)!=''&&ACTID.search("^-?\\d+$")!=0){
		  		 	 alert("请输入一个整数!"); 
		  		 	 return false ;
		  		 }else if($.trim(CLASSID)==''){
		  		 	 alert("活动分类不能为空!");
		  		 	 return false ;
		  		 }else if($.trim(ACT_GAME)==''&&CLASSID!=3){
		  		 	 alert("所属游戏不能为空!");
		  		 	 return false ;
		  		 }else{ 
					  	  if($.trim(ACTNAME)==''){
					  	 	  alert("活动名称不能为空!");
					  		  return false ;
					  	  }else{
					  	  	  $.ajax({   
									type:'post',
									url:'../act/actinfo.do',
									data:'method=ajaxValidateActName&ACTNAME=' + ACTNAME+'&prv=query',
									async:false,
									success:function(data){		
										if(data==1){
											alert("名称已存在!") ;
											document.getElementById("ACTNAME").value = "" ;
											flag = false ;
											return false ;
										}else{
											flag = true ;
										} 
									}
								});
							 if(flag){
							 	 if(!CheckUpload()){
								  	 return false ;								  	 	
								 }	
							 	 var ACTDETAIL = document.getElementById("ACT_DETAIL").value ; 
							  	 if($.trim(ACTDETAIL)==''){
							  	 	 alert("活动详情不能为空!") ;
							  	 	 return false ;
							  	 } 
							  	 var ACTAWARD = document.getElementById("ACT_AWARD").value ; 
							  	 if($.trim(ACTAWARD)==''){
							  	 	 alert("活动奖励不能为空!") ;
							  	 	 return false ;
							  	 } 
							  	 var ACTURL = document.getElementById("ACT_URL").value ; 
							  	 if($.trim(ACTURL)==''){
							  	 	 alert("活动链接不能为空!") ;
							  	 	 return false ;
							  	 }
							  	 var beginTime = document.getElementById("BEGIN_DATE").value ; 
							  	 var avail = isDateFormat(beginTime) ;
							  	 if(avail){
							  	 	var endTime = document.getElementById("END_DATE").value ;
							  	 	if(beginTime>endTime){
							  	 		alert("开始时间不能大于结束时间!") ;
							  	 		return false ;
							  	 	}
							  	 	return isDateFormat(endTime) ;
							  	 }
							  	 return avail ;
							 }else{
							 	return flag ;
							 }
						 }
			  }
		  }else if('update'==str){  //如果是修改需要检测相关的信息
				  var ACTNAME = document.getElementById("ACTNAME").value ; 
			  	  if($.trim(ACTNAME)==''){
			  	 	  alert("活动名称不能为空!");
			  		  return false ;
			  	  }else{
			  	  	  if(ACTNAME!=actname){//如果不是原来新增时的名字则需要验证	
				  	  	  $.ajax({   
								type:'post',
								url:'../act/actinfo.do',
								data:'method=ajaxValidateActName&ACTNAME=' + ACTNAME+'&prv=query',
								async:false,
								success:function(data){		
									if(data==1){
										alert("名称已存在!") ;
										document.getElementById("ACTNAME").value = "" ;
										flag = false ;
										return false ;
									}else{
										flag = true ;
									} 
								}
							});
					 }
					 if(flag){
					 	 if(!CheckUpload()){
					 	 	return false ;	
					 	 }	
					 	 var ACTDETAIL = document.getElementById("ACT_DETAIL").value ; 
					  	 if($.trim(ACTDETAIL)==''){
					  	 	 alert("活动详情不能为空!") ;
					  	 	 return false ;
					  	 } 
					  	 var ACTAWARD = document.getElementById("ACT_AWARD").value ; 
					  	 if($.trim(ACTAWARD)==''){
					  	 	 alert("活动奖励不能为空!") ;
					  	 	 return false ;
					  	 } 
					  	 var ACTURL = document.getElementById("ACT_URL").value ; 
					  	 if($.trim(ACTURL)==''){
					  	 	 alert("活动链接不能为空!") ;
					  	 	 return false ;
					  	 }
					  	 var beginTime = document.getElementById("BEGIN_DATE").value ; 
					  	 var avail = isDateFormat(beginTime) ;
					  	 if(avail){
						  	 var endTime = document.getElementById("END_DATE").value ;
						  	 if(beginTime>endTime){
					  	 		 alert("开始时间不能大于结束时间!") ;
					  	 		 return false ;
					  	 	 }
						  	 return isDateFormat(endTime) ;
					  	 }
					  	 return avail ;
					 }else{
					 	return flag ;
					 }
				 }
		  }
	  }
	  
	//验证日期格式，及合法性
	function isDateFormat(txt){ //是否为合法的日期格式:YYYY-MM-DD  正则中"g"表示全局匹配
		var reg=new RegExp(" ","g"); 
		t1=txt.replace(reg,"-");
		var reg=new RegExp(":","g");  
		t2=t1.replace(reg,"-");
		if(t2==null || t2 == "")
		{
			alert("日期不能为空");
			return false;
		}else{
			if(t2.length>10){
				var regex = /[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}/;   
			}else{
				var regex = /[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}/;   
			}
		    if( regex.test(t2) ){
			    var noArr = t2.split("-");
			    var year = eval(noArr[0]);
			    var month = eval(noArr[1]);
			    var day = eval(noArr[2]);
				var h = eval(noArr[3]);
				var m = eval(noArr[4]);
				var s = eval(noArr[5]);
			    if ( year < 1 || month < 1 || month > 12 || day < 1 || day > 31||h>23||m>59||s>59) {alert("日期不合法");return false;}
			    if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30){alert("日期不合法");return false;}
				if (month == 2){
			       if ((year % 4 != 0) && day >= 29) {alert("日期不合法"); return false;}
			       if (year % 4 == 0){
			       		if(year % 100 == 0 && year % 400 != 0 && day >= 29){alert("日期不合法");return false;}else if(day>29){alert("日期不合法");return false;}
				   }
			    }else{
			    	return true ;
			    }
		   }else{alert("日期不合法");return false;}
		}
	}
	//验证图片信息的合法性
	function CheckUpload(){
		var flag = true ;
		var AllowSize=30000;//设置可上传图片的大小30K
		var evt = document.getElementById('ACT_IMAGE');
		if(evt.value!=''){
			var photoEx = evt.value.substring(evt.value.lastIndexOf("."));
			if(photoEx != ".jpg" && photoEx != ".JPG" && photoEx != ".gif" && photoEx != ".GIF"){
				alert("只能上传 jpg gif 格式的图");
				flag = false ;
				return flag ;
			}else{
				flag = true ;
				return flag ;
			} 
		}else{
			return flag ;
		}
		
	}