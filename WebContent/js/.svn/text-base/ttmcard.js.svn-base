			function validate(){
			    var GOODS_AMOUNT = document.getElementById("GOODS_AMOUNT").value ;
			    var PLAYERLEVEL = document.getElementById("PLAYERLEVEL").value ;
			    var GOODS_CODE = document.getElementById("GOODS_CODE").value ;
			    if(GOODS_CODE==null||GOODS_CODE==''){
			    	alert("请选择道具");
			    	return false ;
			    }
			    var patrn= /^([+]?)(\d+)$/;
			    if(GOODS_AMOUNT==null||GOODS_AMOUNT==''){
			    	alert("请输入发放数量");
			    	return false ;
			    }else {
 				if(!patrn.test(GOODS_AMOUNT)){
 				   alert("请输入正确的数量");
 				   return false;	
 				}
				}
				if(PLAYERLEVEL==null||PLAYERLEVEL==''){
					alert("请输入等级");
			    	return false ;
				}else{
					if(!patrn.test(PLAYERLEVEL)){
 				   alert("请输入正确的等级");
 				   return false;	
 				}
				}
				return true ;
			}
			function getGoodsName(){
				var obj = document.getElementById("GOODS_CODE");
				var strsel = obj.options[obj.selectedIndex].text;
				document.getElementById("GOODS_NAME").value = strsel ;
			}  			