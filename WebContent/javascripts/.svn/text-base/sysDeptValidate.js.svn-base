/**
 * ajax 游戏名称是否已经存在
 * 
 * @return
 */
function deptUnique() {
	var deptName = $('#DEPTNAME').val();
	if(deptName.length>0 && deptName.indexOf("%") < 0){
	$.ajax( {
		url :'dept.do',
		type :'POST',
		data :'method=uniqueForAjaxField&prv=query&DEPTNAME=' + deptName,
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
function deptFormValidate() {
	$.formValidator.initConfig( {
		formid :"deptfrm",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#DEPTNAME').formValidator( {
		onshow :"请输入部门名称",
		oncorrect :"选择正确",
		onfocus :"请输入部门名称",
		tipid :"DEPTNAMETip"
	}).inputValidator( {
		max :"32",
		min :"1",
		empty :false,
		onerror :"部门名称不能为空"
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
function deptUpdateUnique() {
	var deptName = $('#DEPTNAME').val();
	var oDeptName = $('#ODEPTNAME').val();
	
	if(deptName.length>0 && deptName != oDeptName && deptName.indexOf("%") < 0){
		$.ajax( {
			url :'dept.do',
			type :'POST',
			data :'method=uniqueForAjaxField&prv=query&DEPTNAME=' + deptName+"&ODEPTNAME=" + oDeptName,
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
function deptFormUpdateValidate() {
	$.formValidator.initConfig( {
		formid :"deptUpdatefrm",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#DEPTNAME').formValidator( {
		onshow :"请输入部门名称",
		oncorrect :"选择正确",
		onfocus :"请输入部门名称",
		tipid :"DEPTNAMETip"
	}).inputValidator( {
		max :"32",
		min :"1",
		empty :false,
		onerror :"部门名称不能为空"
	}).regexValidator( {
		regexp :"notpercent",//
		datatype :"enum",
		onerror :"无效字符"
	});
	
};