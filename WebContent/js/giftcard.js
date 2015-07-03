/**
 * 获取上下文路径
 */
getContextPath = function(){
	var pathName=window.document.location.pathname;
	return pathName.substring(0,pathName.substr(1).indexOf('/')+1);
}

/**
 * 填充游戏下拉框
 */
fillGameList = function(selectedGameId){
	$.ajax({
		dataType:"json",
		async: false,
		url: getContextPath() + "/giftcard/act.do?method=ajaxGetGameList&prv=query",
		success:function(response){
			var optionHtml = "";
			for(var i=0; i<response.length; i++){
				var game = response[i];
				var gameId = game.GAMEID;
				var gameName = game.GAMENAME;
				optionHtml += "<option value='" + gameId + "'>" + gameName + "</option>";
			}
			
			$("select[name=gameId]").append(optionHtml);
			$("select[name=gameId]").val(selectedGameId);
		}
	});
}

/**
 * 填充活动下拉框
 */
fillActList = function(selectedActId){
	var gameId = $("select[name=gameId]").val();
	if(!gameId){return;}
	
	$.ajax({
		dataType:"json",
		async: false,
		url: getContextPath() + "/giftcard/act.do?method=ajaxGetActList&prv=query&gameId=" + gameId,
		success:function(response){
			var optionHtml = "";
			for(var i=0; i<response.length; i++){
				var act = response[i];
				var actId = act.id;
				var actName = act.name;
				optionHtml += "<option value='" + actId + "'>" + actName + "</option>";
			}
			
			$("select[name=actId]").find("option:gt(0)").remove();
			$("select[name=actId]").append(optionHtml);
			$("select[name=actId]").val(selectedActId);
		}
	});
}

fillTypeList = function(selectedTypeCode){
	var gameId = $("select[name=gameId]").val();
	if(!gameId){return;}
	
	$.ajax({
		dataType:"json",
		async: false,
		url: getContextPath() + "/giftcard/act.do?method=ajaxGetTypeList&prv=query&gameId=" + gameId,
		success:function(response){
			var optionHtml = "";
			for(var i=0; i<response.length; i++){
				var type = response[i];
				var typeCode = type.typeCode;
				var typeName = type.typeName;
				optionHtml += "<option value='" + typeCode + "'>" + typeName + "</option>";
			}
			
			$("select[name=typeCode]").find("option:gt(0)").remove();
			$("select[name=typeCode]").append(optionHtml);
			$("select[name=typeCode]").val(selectedTypeCode);
		}
	});
}

fillTypeListByGoods = function(selectedTypeCode){
	var gameId = $("select[name=gameId]").val();
	var actId = $("select[name=actId]").val();
	if(!gameId && !actId){return;}
	
	$.ajax({
		dataType:"json",
		async: false,
		url: getContextPath() + "/giftcard/act.do?method=ajaxGetTypeListByGoods&prv=query&gameId=" + gameId +"&actId=" + actId,
		success:function(response){
			var optionHtml = "";
			for(var i=0; i<response.length; i++){
				var type = response[i];
				var typeCode = type.typeCode;
				var typeName = type.typeName;
				optionHtml += "<option value='" + typeCode + "'>" + typeName + "</option>";
			}
			
			$("select[name=typeCode]").find("option:gt(0)").remove();
			$("select[name=typeCode]").append(optionHtml);
			$("select[name=typeCode]").val(selectedTypeCode);
		}
	});
}