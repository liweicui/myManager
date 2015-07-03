/**
 * 执行，与状态相关的通用方法
 * 
 * @return
 */
function execute(url,defaultURL) {
	url = convertURL(url);
	$.ajax( {
		url : url,
		type : 'POST',
		dataType : 'text',
		success : function(data) {
			if (data.length > 0) {
				alert(data);
			}
			else {
				var pageSize = document.getElementById("__hidden_pagesize_").value;
				var pageNo = document.getElementById("__hidden_pageno_").value;
				//document.location.href = defaultURL+'&pageNo='+pageNo+'&pageSize='+pageSize;
				document.forms[0].submit();
			}
		}
	});
}

function executeDelete(url,defaultURL) {
	if (confirm('确认删除吗?')) {
		url = convertURL(url);
		$.ajax( {
			url : url,
			type : 'POST',
			dataType : 'text',
			success : function(data) {
				if (data.length > 0) {
					alert(data);
				}
				else {
					//document.location.href = defaultURL;
					document.forms[0].submit();
				}
			}
		});
	}
}

function executePublish(url,defaultURL) {
	url = convertURL(url);
	$.ajax( {
		url : url,
		type : 'POST',
		dataType : 'text',
		success : function(data) {
			if (data.length > 0) {
				alert(data);
			} else {
				alert("发布成功！");
			}
			//document.location.href = defaultURL;
			document.forms[0].submit();
		}
	});
}

function executePreview(url,defaultURL) {
	url = convertURL(url);
	url = url + "&format=json&jsoncallback=?";
	jQuery.getJSON(url, {name : "test"}, function(datas) {
		if(datas.success==1){
			window.open(datas.url,'_blank','');
		}
		else{
			alert(datas.message);
		}
	});
}

function executeAudit(url,defaultURL) {
	url = convertURL(url);
	$.ajax( {
		url : url,
		type : 'POST',
		dataType : 'text',
		success : function(data) {
		if (data.length > 0) {
			alert(data);
		} else {
			alert("批量审核成功，请及时发布！");
		}
		//document.location.href = defaultURL;
		document.forms[0].submit();
	}
	});
}

function stateControl(id) {
	var url = $('#url').val();
	$.ajax( {
		url :url,
		type :'POST',
		data :'prv=query&method=ajaxControl&id=' + id,
		dataType :'text',
		success : function(data) {
			if (data.length > 0) {
				alert(data);
			} else {
				document.location.href = url + "?prv=query&method=queryInfo&id=" + id;
			}
		}
	});
}

/**
 * 给ajax请求加上时间戳
 * 
 * @param url
 * @return
 */
function convertURL(url) {
	var timestamp = (new Date()).valueOf();
	if (url.indexOf("?") >= 0) {
		url = url + "&t=" + timestamp;
	} else {
		url = url + "?t=" + timestamp;
	}
	return url;
}