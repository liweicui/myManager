function displayDiv(divID) {
	channelsDiv = document.getElementById(divID);
	if (channelsDiv.style.display == "none") {
		channelsDiv.style.display = "";
		document.getElementById('fade').style.display='block';
	} else {
		channelsDiv.style.display = "none";
		document.getElementById('fade').style.display='none';
	}
}
function hideDiv() {
	channelsDiv = document.getElementById("Channels_Div");
	if (channelsDiv.style.display != "none") {
		channelsDiv.style.display = "none";
	}
	games_Div = document.getElementById("Games_Div");
	if (games_Div.style.display != "none") {
		games_Div.style.display = "none";
	}

}
function selectall(mulSelectOjb) {
	$(mulSelectOjb).children().each(function() {
		$(this).attr("selected", "selected");
	});
}
function getClassIds(Cws,clsIdOjb) {
	var nodes = Cws.TreeCombo.getCheckedNodes(true);
	var ids = new Array();
	if (nodes) {
		for ( var i = 0; i < nodes.length; i++) {
			ids[ids.length] = nodes[i].id;

		}
	}
	var Values = ids;
	$(clsIdOjb).attr("value", Values.toString());

}
function loadTheGamesByClassIds(Cws,clsIdObj) {
	var Values = $(clsIdObj).attr("value");
	if (Values != null && Values != "") {
		$.ajax({
			type : "get",
			async : false,
			url : Cws.DataSourceConfig.CategoryDataUrl,
			data : {
				classIds : Values
			},
			dataType : "jsonp",
			jsonp : "callbackparam",// 服务端用于接收callback调用的function名的参数
			jsonpCallback : "success_jsonpCallback",// callback的function名称
			success : function(data) {
				if (data && data != null && data.length > 0) {
					Cws.WriteDataToCombo(data);
				} else {
					Cws.ClearComboData();
				}
			},
			error : function() {
				alert('fail');
			}
		});
	}
}
function loadTheGamesByClassId(Cws,clsId) {
		$.ajax({
			type : "get",
			async : false,
			url : Cws.DataSourceConfig.CategoryDataUrl,
			data : {
				classIds : clsId
			},
			dataType : "jsonp",
			jsonp : "callbackparam",// 服务端用于接收callback调用的function名的参数
			jsonpCallback : "success_jsonpCallback",// callback的function名称
			success : function(data) {
				if (data && data != null && data.length > 0) {
					Cws.WriteDataToCombo(data);
				} else {
					Cws.ClearComboData();
				}
			},
			error : function() {
				alert('fail');
			}
		});
	
}
function checkNodesByClassIds(Cws,clsIdObj) {

	if ($(clsIdObj).attr("value") != null
			&& $(clsIdObj).attr("value") != "") {
		var classIdArr = $(clsIdObj).attr("value").split(",");
		for ( var i = 0; i < classIdArr.length; i++) {
			Cws.TreeCombo.checkNode(Cws.TreeCombo.getNodeByParam("id",
					classIdArr[i]), true, true, true);
		}
	}
}
/**
 * check all nodes
 * @param Cws
 * @param checked
 */
function checkAllTreeNodes(Cws,checked){
	Cws.TreeCombo.checkAllNodes(checked);
	var nodes = Cws.TreeCombo.getCheckedNodes(true);
	var ids = new Array();
	if (nodes) {
		for ( var i = 0; i < nodes.length; i++) {
			ids[ids.length] = nodes[i].id;

		}
	}
	loadTheGamesByClassId(Cws,ids.toString());
}

