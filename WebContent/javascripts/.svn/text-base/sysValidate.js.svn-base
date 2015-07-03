/**
 * ajax 工号是否存在
 * 
 * @return
 */
function empnoUnique() {
	var empno = $('#empno').val();
	var empno1 = $('#empno1').val();
	var prv=$('#prv').val();
	if(empno==empno1){
		return true;
	}
	b=false;
	if(empno.length>0){
	$.ajax( {
		url :'user.do',
		type :'POST',
		async:false,
		data :'method=empno&empno=' + empno+'&prv='+prv,
		dataType :'text',
		success : function(data) {
			if (data.length > 0) {
				alert(data);
				return false;
			}else{
				b=true
				return true;
			}
		}
	});
	return b;
	}
}
/**
 * ajax 角色名称是否存在
 * 
 * @return
 */
function roleUnique() {
	var roleName = $('#roleName').val();
	var roleName1 = $('#roleName1').val();
	var prv=$('#prv').val();
	if(roleName==roleName1){
	     return true;
	}
	var b=false;
	if(roleName.length>0){
	$.ajax( {
		url :'role.do',
		type :'POST',
		async:false,
		data :'method=roleNanme&roleName=' + roleName+'&prv='+prv,
		dataType :'text',
		success : function(data) {
			if (data.length > 0) {
				alert(data);
				return false;
			}else{
				b=true;
				return true;
			}
		}
	});
		return b;
	}
}

/**
 * 2次密码
 * 
 * @return
 */
function  pass(){
	var pass1=$("#passWord1").val();
	var pass2=$("#passWord2").val();
	alert("pass2="+pass1);
	alert("pass2="+pass2);
	if(pass1==pass2){
         return true;		
	}else{
		alert("两次密码输入不一致！！")
		 return false;
	}
	
}





/**
 * 验证用户表单字段
 * 
 * @return
 */
function userFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#name').formValidator( {
		onshow :"请输入用户名",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"用户名不能为空",
		tipid :"nameTip"
	}).inputValidator( {
		max :"20",
		min :"1",
		empty :false,
		onerror :"用户名长度不正确1-20"
	});
	$('#empno').formValidator( {
		onshow :"请输入工号",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"工号不能为空",
		tipid :"empnoTip"
	}).inputValidator( {
		max :"20",
		min :"1",
		empty :false,
		onerror :"工号长度不正确1-20"
	}).regexValidator( {
		regexp :"numberandchar",
		datatype:"enum",
		onerror :"请输入正确的工号"
	});
	$('#phone').formValidator( {
		onshow :"请输入电话",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"电话不能为空",
		tipid :"phoneTip"
	}).inputValidator( {
		max :"20",
		min :"1",
		onerror :"长度不正确"
	}).regexValidator( {
		regexp :"num5",
		datatype:"enum",
		onerror :"请输入正确的电话"
	});
	$('#email').formValidator( {
		onshow :"请输入邮箱",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"邮箱不能为空",
		tipid :"emailTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	}).regexValidator( {
		regexp :"email",
		datatype:"enum",
		onerror :"请输入正确的邮箱"
	});
	$('#depId').formValidator( {
		onshow :"请选择部门",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"部门不能为空",
		tipid :"depIdTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"部门不能为空"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#roleId').formValidator( {
		onshow :"请选择角色",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"角色不能为空",
		tipid :"roleIdTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"角色不能为空"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
}


function infoFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#phone').formValidator( {
		onshow :"请输入电话",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"电话不能为空",
		tipid :"phoneTip"
	}).inputValidator( {
		max :"20",
		min :"1",
		onerror :"长度不正确"
	}).regexValidator( {
		regexp :"num5",
		datatype:"enum",
		onerror :"请输入正确的电话"
	});
	$('#email').formValidator( {
		onshow :"请输入邮箱",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"邮箱不能为空",
		tipid :"emailTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	}).regexValidator( {
		regexp :"email",
		datatype:"enum",
		onerror :"请输入正确的邮箱"
	});

}


function passFormValidate(){
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#passWord').formValidator( {
		onshow :"请输入旧密码",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"旧密码不能为空",
		tipid :"passWordTip"
	}).inputValidator( {
		max :"20",
		min :"1",
		empty :false,
		onerror :"旧密码不能为空最长20位"
	});
	$('#passWord1').formValidator( {
		onshow :"请输入密码",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"密码不能为空",
		tipid :"passWord1Tip"
	}).inputValidator( {
		max :"20",
		min :"1",
		empty :false,
		onerror :"密码不能为空最长20位"
	});
	$("#passWord2").formValidator({
		onshow:"请输入重复密码",
		onfocus:"两次密码必须一致哦",
		oncorrect:"密码一致"
	}).inputValidator({
		min:1,
		empty:{leftempty:false,rightempty:false,emptyerror:"重复密码两边不能有空符号"},
		onerror:"重复密码不能为空,请确认"
		}).compareValidator({desid:"passWord1",operateor:"=",onerror:"两次密码不一致,请确认"});
}
