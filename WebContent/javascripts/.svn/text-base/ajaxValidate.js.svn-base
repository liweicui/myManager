/**
 * 
 * @param flag
 *            0 表示异步请求 1 表示同步请求
 * @return
 */
function validateUnique(flag) {
	var synch = true;
	if (flag == 1) {
		synch = false;
	}
	var param = $('#param').val();
	var name = $('#name').val();
	var url = $('#url').val();
	var id = $('#id').val();
	url = convertURL(url);
	var b = true;
	$.ajax( {
		async :synch,
		url :url,
		type :'POST',
		data :'prv=query&method=ajaxUnique&param=' + param + '&name=' + name
				+ '&id=' + id,
		dataType :'text',
		success : function(datas) {
			if (datas.length > 0) {
				alert(datas);
				b = false;
			}
		}
	});
	try{
		var count = document.getElementById("count").value;
		if(count<0){
			b=false;
		}else{
			b=true;
		}
	}catch(exceptin){}
	return b;
	
};

/**
 * 
 * @param flag
 *            0 表示异步请求 1 表示同步请求
 * @return
 */
function validateVoteOptionUnique(flag) {
	var synch = true;
	if (flag == 1) {
		synch = false;
	}
	var param = $('#param').val();
	var name = $('#name').val();
	var url = $('#url').val();
	var id = $('#id').val();
	var voteId = $('#vote').val();
	url = convertURL(url);
	var b = true;
	$.ajax( {
		async :synch,
		url :url,
		type :'POST',
		data :'prv=query&method=ajaxUnique&param=' + param + '&name=' + name
				+ '&id=' + id + '&voteId=' + voteId,
		dataType :'text',
		success : function(datas) {
			if (datas.length > 0) {
				alert(datas);
				b = false;
			}
		}
	});
	return b;
};

/**
 * 验证新闻类别区域唯一
 * 
 * @param flag
 * @return
 */
function validateNewsUnique(mark) {
	var param = $('#param').val();
	var name = $('#name').val();
	var url = $('#url').val();
	var id = $('#id').val();
	var b = true;
	$.ajax( {
		async :false,
		url :url,
		type :'get',
		data :'prv=query&method=ajaxUnique&param=' + param + '&name=' + name
				+ '&id=' + id + "&mark=" + mark,
		dataType :'text',
		success : function(datas) {
			if (datas.length > 0) {
				alert(datas);
				b = false;
			}
		}
	});
	return b;
};
/**
 * ajax 判断区域输入的唯一性
 * 
 * @return
 */
function validateMiniUnique(el) {
	var param = $('#param').val();
	var url = $('#url').val();
	var id = $('#id').val();

	var i = el.id;
	var v = el.value;
	var n = el.name;
	url = convertURL(url);
	$.ajax( {
		async :synch,
		url :url,
		type :'POST',
		data :'prv=query&method=ajaxUnique&param=' + param + '&' + n + '=' + v
				+ '&id=' + id,
		dataType :'text',
		success : function(data) {
			if (data.length > 0) {
				alert(data);
			}
		}
	});
};

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
};