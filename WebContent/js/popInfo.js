function getServer() {
	var gameId = document.getElementById("gameId").value;
	$.ajax({   
		type:'get',
		callback : 'callback',
		dataType:'jsonp',
		url:'../popInfo/popInfo.do',
		data:'method=serverQuery&prv=query&gameId='+gameId,
		success:function(data){
		   var str = "<option value=''>请选择</option>" ;
		   for(var i=0 ; i<data.datas.length;i++){
			   str = str + "<option value='"+data.datas[i].SERVERID+"'>"+data.datas[i].SERVERNAME+"</option>"
		   }
		   $("#server").html(str);
		}
	});
}
function validate(method) {
	var gameId = document.getElementById("gameId").value;
	var server = document.getElementById("server").value;
	var title = document.getElementById("title").value;
	var content = document.getElementById("content").value;
	var url = document.getElementById("url").value;
	var empNo = document.getElementById("empNo").value;
	var modifyTime = document.getElementById("modifyTime").value;
	var status = document.getElementById("status").value;
	if (gameId == null || gameId == "") {
		alert("请选择游戏");
		return ;
	}else if (server == null || server == "") {
		alert("请选择服务器");
		return ;
	}else if (title == null || title == "") {
		alert("请输入广告标题");
		return ;
	}else if (content == null || content == "") {
		alert("请输入广告内容");
		return ;
	}else if (url == null || url == "") {
		alert("请输入广告链接");
		return ;
	}else if (empNo == null || empNo == "") {
		alert("请输入发布人工号");
		return ; 
	}else if (modifyTime == null || modifyTime == "") {
		alert("请输入发布时间");
		return ;
	}else if (status == null || status == "") {
		alert("请选择状态");
		return ;
	}
	
	if (method == "insert") {
		$("#insertform").submit();
	}
	else if (method == "update") {
		$("#updateform").submit();
	}
}

