//验证网上银行表单


function netBankFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#NAME').formValidator( {
		onshow :"请输入银行名称",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"银行名称不能为空",
		tipid :"nameTip"
	}).inputValidator( {
		max :"50",
		min :"1",
		empty :false,
		onerror :"数据长度错误,最初50位"
	});
	$('#IP').formValidator( {
		onshow :"请输入限制IP",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"限制IP不能为空",
		tipid :"ipTip"
	}).inputValidator( {
		max :"20",
		min :"1",
		empty :false,
		onerror :"数据长度错误,最长20位"
	}).regexValidator( {
		regexp :"ip4",
		datatype :"enum",
		onerror :"请输入合法的IP地址"
	});
	$('#key').formValidator( {
		onshow :"请输入key",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"key不能为空",
		tipid :"keyTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"数据长度错误,最长64位"
	});
	$('#URL').formValidator( {
		onshow :"请输入跳转地址URL",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"跳转地址URL不能为空",
		tipid :"urlTip"
	}).inputValidator( {
		max :"100",
		min :"1",
		empty :false,
		onerror :"数据长度错误,最长100位"
	}).regexValidator( {
		regexp :"url",
		datatype :"enum",
		onerror :"请输入合法的url格式"
	});
	$('#VALIDATEURL').formValidator( {
		onshow :"请输入验证地址URL",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"验证地址URL不能为空",
		tipid :"validateurlTip"
	}).inputValidator( {
		max :"100",
		min :"1",
		empty :false,
		onerror :"数据长度错误,最长100位"
	}).regexValidator( {
		regexp :"url",
		datatype :"enum",
		onerror :"请输入合法的url格式"
	});
	$('#DISCOUNTRATIO').formValidator( {
		onshow :"请输入折扣比率",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"折扣比率不能为空",
		tipid :"discountratioTip"
	}).inputValidator( {
		max :"5",
		min :"1",
		empty :false,
		onerror :"数据长度错误,长度最多为5位"
	}).functionValidator( {
		fun : function(val) {
			if(reg(val)){
				return true
			}else{
				return "请输入合法数字，最多2位小数";
			}
			
		}
	});
	$('#RMBLIMIT').formValidator( {
		onshow :"请输入代理商限额",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"代理商限额不能为空",
		tipid :"rmblimitTip"
	}).inputValidator( {
		max :"10",
		min :"2",
		empty :false,
		onerror :"数据长度错误,长度最多为10位"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"请输入合法的数字"
	});
	$('#RMBAMOUNT').formValidator( {
		onshow :"请输入钱包结余款",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"钱包结余款不能为空",
		tipid :"rmbamountTip"
	}).inputValidator( {
		max :"10",
		min :"1",
		empty :false,
		onerror :"数据长度错误"
	}).functionValidator( {
		fun : function(val) {
			if(reg(val)){
				return true
			}else{
				return "请输入合法数字，最多2位小数";
			}
		}
	});
	$('#ORDERVAL').formValidator( {
		onshow :"请输入排序值",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"排序值不能为空",
		tipid :"ordervalTip"
	}).inputValidator( {
		max :"2",
		min :"1",
		empty :false,
		onerror :"数据长度错误，长度最多为2位"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"请输入合法数字"
	});
	$('#IMGPATH').formValidator( {
		onshow :"请输入排序值",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"排序值不能为空",
		tipid :"imgpathTip"
	}).inputValidator( {
		max :"100",
		min :"1",
		empty :false,
		onerror :"图片路径不能为空"
	});
}

//验证数字和小数点后2位
function reg(val){
	var reg = new RegExp(/^\d+(\.\d{1,2})?$/g);
	if(reg.test(val)){
		return true;
	}
	return false;
}




//验证银行编码是否唯一
function codeUnique() {
	var code = $('#CODE').val();
	var url = convertURL('netbank.do');
	if(code.length>0 && code.indexOf("%") < 0){
	$.ajax( {
		url : url,
		type :'POST',
		data :'method=ajaxCodeUnique&prv=query&code=' + code,
		dataType :'text',
		success : function(data) {
			if (data.length > 0) {
				alert(data);
				return false;
			}
		}
	});
	return true;
	}
};

//验证银行名称是否唯一
function nameUnique() {
	var name = $('#NAME').val();
	var url = convertURL('netbank.do');
	if(name.length>0 && name.indexOf("%") < 0){
	$.ajax( {
		url : url,
		type :'POST',
		data :'method=ajaxNameUnique&prv=query&name=' + name,
		dataType :'text',
		success : function(data) {
			if (data.length > 0) {
				alert(data);
				return false;
			}
		}
	});
	return true;
	}
};

function addWaynameUnique() {
	var name = $('#wayName').val();

	var url = convertURL('addway.do');
	
	if(name.length>0 && name.indexOf("%") < 0){
	$.ajax( {
		url : url,
		type :'POST',
		data :'method=ajaxNameUnique&prv=query&name=' + name,
		dataType :'text',
		success : function(data) {
			if (data.length > 0) {
				document.getElementById('wayNameTip').innerText ="充值方式名称已经存在，请更换名称";
				document.getElementById("flag").value = 1;
				return false;
			}else{
				document.getElementById("flag").value = 0;
				document.getElementById('wayNameTip').innerText ="";
			}
		}
	});
	return true;
	}
};

function mcardAgencyUnique() {
	var name = $('#agencyName').val();

	var url = convertURL('mcardagency.do');
	
	if(name.length>0 && name.indexOf("%") < 0){
	$.ajax( {
		url : url,
		type :'POST',
		data :'method=ajaxNameUnique&prv=query&name=' + name,
		dataType :'text',
		success : function(data) {
			if (data.length > 0) {
				document.getElementById('agencyNameTip').innerText ="代理商名称已经存在，请更换名称";
				document.getElementById("flag").value = 1;
				return false;
			}else{
				document.getElementById("flag").value = 0;
				document.getElementById('agencyNameTip').innerText ="";
			}
		}
	});
	return true;
	}
};

function cardTypeUnique() {
	var name = $('#typeName').val();

	var url = convertURL('cardtype.do');
	
	if(name.length>0 && name.indexOf("%") < 0){
	$.ajax( {
		url : url,
		type :'POST',
		data :'method=ajaxNameUnique&prv=query&name=' + name,
		dataType :'text',
		success : function(data) {
			if (data.length > 0) {
				document.getElementById('typeNameTip').innerText ="卡类型名称已经存在，请更换名称";
				document.getElementById("flag").value = 1;
				return false;
			}else{
				document.getElementById("flag").value = 0;
				document.getElementById('typeNameTip').innerText ="";
			}
		}
	});
	return true;
	}
};

//验证服务器ID是否唯一
function serverIDUnique() {
	var serverID = $('#serverid').val();

	var url = convertURL('gameServer.do');
	
	if(serverID.length>0 && serverID.indexOf("%") < 0){
	$.ajax( {
		url : url,
		type :'POST',
		data :'method=serverIDUnique&prv=query&serverID=' + serverID,
		dataType :'text',
		success : function(data) {
			if (data.length > 0) {
				alert(data);
				return false;
			}
		}
	});
	return true;
	}
};





function convertURL(url) {
	var timestamp = (new Date()).valueOf();
	if (url.indexOf("?") >= 0) {
		url = url + "&t=" + timestamp;
	} else {
		url = url + "?t=" + timestamp;
	}
	return url;
};
