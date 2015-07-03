/**
 * ajax 游戏名称是否已经存在
 * 
 * @return
 */
function gmAreaNameUnique() {
	var gmAreaName = $('#GMAREANAME').val();
	var gameId=$('#GAMEID').val();
	if(gmAreaName.length>0 && gmAreaName.indexOf("%") < 0){
	$.ajax( {
		url :'gmarea.do',
		type :'POST',
		data :'method=uniqueForAjaxField&prv=query&GMAREANAME=' + gmAreaName+'&GAMEID='+gameId,
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
 * 验证用户表单字段
 * 
 * @return
 */
function gmAreaFormValidate() {
	$.formValidator.initConfig( {
		formid :"gmareaAddFrm",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#GAMEID').formValidator( {
		onshow :"请选择所属游戏",
		oncorrect :"选择正确",
		onfocus :"请选择所属游戏",
		tipid :"GAMEIDTip"
	}).inputValidator( {
		//max :"32",
		min :"1",
		empty :false,
		onerror :"请选择所属游戏"
	});
	
	$('#GMAREANAME').formValidator( {
		onshow :"请输入游戏分区名称",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"请输入游戏分区名称",
		tipid :"GMAREANAMETip"
	}).inputValidator( {
		max :"16",
		min :"1",
		empty :false,
		onerror :"请输入游戏分区名称"
	}).regexValidator( {
		regexp :"notpercent",//
		datatype :"enum",
		onerror :"无效字符"
	});
};


/**
 * ajax 游戏名称是否已经存在
 * 
 * @return
 */
function gmAreaNameUpdateUnique() {
	var gmAreaName = $('#GMAREANAME').val();
	var oGmAreaName = $('#OGMAREANAME').val();
	
	if(gmAreaName.length>0 && gmAreaName != oGmAreaName && gmAreaName.indexOf("%") < 0){
	$.ajax( {
		url :'gmarea.do',
		type :'POST',
		data :'method=uniqueForAjaxField&prv=query&GMAREANAME=' + gmAreaName+"&OGMAREANAME=" + oGmAreaName,
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
 * 验证用户表单字段
 * 
 * @return
 */
function gmAreaFormUpdateValidate() {
	$.formValidator.initConfig( {
		formid :"gmareaUpdateFrm",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#GAMEID').formValidator( {
		onshow :"请选择所属游戏",
		oncorrect :"选择正确",
		onfocus :"请选择所属游戏",
		tipid :"GAMEIDTip"
	}).inputValidator( {
		//max :"32",
		min :"1",
		empty :false,
		onerror :"请选择所属游戏"
	});
	
	$('#GMAREANAME').formValidator( {
		onshow :"请输入游戏分区名称",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"请输入游戏分区名称",
		tipid :"GMAREANAMETip"
	}).inputValidator( {
		max :"16",
		min :"1",
		empty :false,
		onerror :"请输入游戏分区名称"
	}).regexValidator( {
		regexp :"notpercent",//
		datatype :"enum",
		onerror :"无效字符"
	});
};