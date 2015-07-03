/**
 * ajax 游戏名称是否已经存在
 * 
 * @return
 */
function gameNameUnique() {
	var gameName = $('#GAMENAME').val();
	if(gameName.length>0 && gameName.indexOf("%") < 0){
	$.ajax( {
		url :'game.do',
		type :'POST',
		data :'method=uniqueForAjaxField&prv=query&GAMENAME=' + gameName,
		dataType :'text',
		success : function(data) {
			if (data.length > 0) {
				alert(data);
				//$('#GAMENAMETip').val(data);
				return false;
			}
		}
	});
	return true;
	}
};

function gameIDUnique() {
	var gameID = $('#GAMEID').val();
	if(!isInteger(gameID)){
		document.getElementById("GAMEIDTip").innerText = "请输入3位数字";
		return ;
	}
	if(gameID.length>0 && gameID.indexOf("%") < 0){
	$.ajax( {
		url :'game.do',
		type :'POST',
		data :'method=uniqueForGameID&prv=query&gameid=' + gameID,
		dataType :'text',
		success : function(data) {
			if (data.length > 0) {
				alert(data);
				//$('#GAMENAMETip').val(data);
				return false;
			}
		}
	});
	return true;
	}
};

/**
 * ajax 游戏编号是否已经存在
 * 
 * @return
 */
function gameNoUnique() {
	var gameNo = $('#GAMENO').val();
	if(gameNo.length>0 && gameNo.indexOf("%") < 0){
	$.ajax( {
		url :'game.do',
		type :'POST',
		data :'method=uniqueForAjaxField&prv=query&GAMENO=' + gameNo,
		dataType :'text',
		success : function(data) {
			if (data.length > 0) {
				//alert(data);
				alert(data);
				return false;
			}
		}
	});
	return true;
	}
};

/**
 * 验证用户表单字段
 * 
 * @return
 */
function gameFormValidate() {
	$.formValidator.initConfig( {
		formid :"gamefrm",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#GAMEID').formValidator( {
		onshow :"请输入游戏id,3位数字",
		oncorrect :"输入正确",
		onfocus :"请输入游戏id,3位数字",
		tipid :"GAMEIDTip"
	}).inputValidator( {
		max :"3",
		min :"3",
		empty :false,
		onerror :"游戏id不能为空"
	}).regexValidator( {
		regexp :"intege1",//
		datatype :"enum",
		onerror :"请输入3位数字"
	});
	$('#GAMENAME').formValidator( {
		onshow :"请输入游戏名称",
		oncorrect :"输入正确",
		onfocus :"请输入游戏名称",
		tipid :"GAMENAMETip"
	}).inputValidator( {
		max :"32",
		min :"1",
		empty :false,
		onerror :"游戏名称不能为空"
	}).regexValidator( {
		regexp :"notpercent",//
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#GAMENO').formValidator( {
		onshow :"请输入游戏编号",
		oncorrect :"输入正确",
		onfocus :"请输入游戏编号",
		tipid :"GAMENOTip"
	}).inputValidator( {
		max :"8",
		min :"1",
		empty :false,
		onerror :"游戏编号不能为空"
	}).regexValidator( {
		regexp :"letter",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#GAMENICKNAME').formValidator( {
		onshow :"请输入游戏昵称",
		oncorrect :"输入正确",
		onfocus :"请输入游戏昵称",
		tipid :"GAMENICKNAMETip"
	}).inputValidator( {
		max :"8",
		min :"1",
		empty :false,
		onerror :"游戏昵称不能为空"
	}).regexValidator( {
		regexp :"letter",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#GAMEDOMAIN').formValidator( {
		onshow :"请输入游戏域名",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"请输入游戏域名",
		//onempty :"你真的不想输入游戏域名？",
		tipid :"GAMEDOMAINTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	}).regexValidator( {
		regexp :"letteranddot",//
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#GAMETYPE').formValidator( {
		onshow :"请输入游戏类型",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"请输入游戏类型",
		tipid :"GAMETYPETip"
	}).inputValidator( {
		max :"8",
		min :"1",
		onerror :"请输入游戏类型"
	}).regexValidator( {
		regexp :"letter",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#GAMERATION').formValidator( {
		onshow :"请选择游戏比率",
		oncorrect :"输入正确",
		onfocus :"请选择游戏比率",
		tipid :"GAMERATIONTip"
	}).inputValidator( {
		max :"6",
		min :"1",
		empty :false,
		onerror :"游戏比率不能为空"
	}).regexValidator( {
		regexp :"decmal1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#GAMESTATE').formValidator( {
		onshow :"请输入游戏状态",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"请输入游戏状态",
		tipid :"GAMESTATETip"
	}).inputValidator( {
		max :"8",
		min :"1",
		onerror :"请选择游戏状态"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	
};


/**
 * ajax 游戏名称是否已经存在
 * 
 * @return
 */
function gameNameUpdateUnique() {
	var gameName = $('#GAMENAME').val();
	var oGameName = $('#OGAMENAME').val();
	if(gameName.length>0 && gameName != oGameName && gameName.indexOf("%") < 0){
	$.ajax( {
		url :'game.do',
		type :'POST',
		data :'method=uniqueForAjaxField&prv=query&GAMENAME=' + gameName+"&OGAMENAME="+oGameName,
		dataType :'text',
		success : function(data) {
			if (data.length > 0) {
				alert(data);
				//$('#GAMENAMETip').val(data);
				return false;
			}
		}
	});
	return true;
	}
};
/**
 * ajax 游戏编号是否已经存在
 * 
 * @return
 */
function gameNoUpdateUnique() {
	var gameNo = $('#GAMENO').val();
	var oGameNo = $('#OGAMENO').val();
	if(gameNo.length>0 && gameNo != oGameNo && gameNo.indexOf("%") < 0){
	$.ajax( {
		url :'game.do',
		type :'POST',
		data :'method=uniqueForAjaxField&prv=query&GAMENO=' + gameNo+"&OGAMENO="+oGameNo,
		dataType :'text',
		success : function(data) {
			if (data.length > 0) {
				//alert(data);
				alert(data);
				return false;
			}
		}
	});
	return true;
	}
};

function gameFormValidateForUpdate() {
	$.formValidator.initConfig( {
		formid :"gameUpdatefrm",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#GAMENAME').formValidator( {
		onshow :"请输入游戏名称",
		oncorrect :"输入正确",
		onfocus :"请输入游戏名称",
		tipid :"GAMENAMETip"
	}).inputValidator( {
		max :"32",
		min :"1",
		empty :false,
		onerror :"游戏名称不能为空"
	}).regexValidator( {
		regexp :"notpercent",//
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#GAMENO').formValidator( {
		onshow :"请输入游戏编号",
		oncorrect :"输入正确",
		onfocus :"请输入游戏编号",
		tipid :"GAMENOTip"
	}).inputValidator( {
		max :"8",
		min :"1",
		empty :false,
		onerror :"游戏编号不能为空"
	}).regexValidator( {
		regexp :"letter",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#GAMENICKNAME').formValidator( {
		onshow :"请输入游戏昵称",
		oncorrect :"输入正确",
		onfocus :"请输入游戏昵称",
		tipid :"GAMENICKNAMETip"
	}).inputValidator( {
		max :"8",
		min :"1",
		empty :false,
		onerror :"游戏昵称不能为空"
	}).regexValidator( {
		regexp :"letter",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#GAMEDOMAIN').formValidator( {
		onshow :"请输入游戏域名",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"请输入游戏域名",
		//onempty :"你真的不想输入游戏域名？",
		tipid :"GAMEDOMAINTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	}).regexValidator( {
		regexp :"letteranddot",//intege1
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#GAMETYPE').formValidator( {
		onshow :"请输入游戏类型",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"请输入游戏类型",
		tipid :"GAMETYPETip"
	}).inputValidator( {
		max :"8",
		min :"1",
		onerror :"长度不正确"
	}).regexValidator( {
		regexp :"letter",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#GAMERATION').formValidator( {
		onshow :"请选择游戏比率",
		oncorrect :"输入正确",
		onfocus :"请选择游戏比率",
		tipid :"GAMERATIONTip"
	}).inputValidator( {
		max :"6",
		min :"1",
		empty :false,
		onerror :"游戏比率不能为空"
	}).regexValidator( {
		regexp :"num1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#GAMESTATE').formValidator( {
		onshow :"请输入游戏状态",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"请输入游戏状态",
		tipid :"GAMESTATETip"
	}).inputValidator( {
		max :"8",
		min :"1",
		onerror :"长度不正确"
	}).regexValidator( {
		regexp :"num1",
		datatype :"enum",
		onerror :"无效字符带"
	});
	
};