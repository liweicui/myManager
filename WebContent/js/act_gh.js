var obj = (function (){
	function validate(sign){
		var GH_NAME = $("#GH_NAME").val();
		var GH_CHAIRMAN = $("#GH_CHAIRMAN").val();
		var VOICE_CHANNEL = $("#VOICE_CHANNEL").val();
		var GH_INTEGRAL = $("#GH_INTEGRAL").val();
		if(GH_NAME==''){
			alert("请输入公会名称");
			return ;
		}else if(GH_CHAIRMAN==''){
			alert("请输入公会会长");
			return ;
		}else if(VOICE_CHANNEL==''){
			alert("请输入语音频道");
			return ;
		}else if(GH_INTEGRAL==''){
			alert("请输入公会积分");
			return ;
		}else if(!isDigit(GH_INTEGRAL)){
			alert("公会积分请输入数字");
			return ;
		}
		if(sign == "insert"){
			updateValidate();
		}else{
			var currentName = $("#currentName").val();
			if(currentName == GH_NAME){
				$("#form1").submit();
			}else{
				updateValidate();
			}
		}
	}
	
	function updateValidate(){
		var flag = true ;
		$.ajax({   
			type:'post',
			url:'../act/actgh.do',
			data:'method=ajaxValidateGhname&prv=query&ghName='+document.getElementById("GH_NAME").value,
			async:false,
			success:function(data){
				if(data=='fail'){
					alert("该公会已存在,请确认");
					flag = false ;		
				}
			}
		});
		if(flag){
			$("#form1").submit();
		}
	}
	
	function isDigit(str){var patrn=/^\d+$/;return patrn.test(str);}
	return {
	    validate : validate 
	}
})() ;