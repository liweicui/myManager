var js = {}

/**
 * 读取游戏区
 * 参数: jquery对象
 */
js.fillArea = function(area){
	$.ajax({
		dataType:"json",
		url:"queryRealTimeData.do?method=ajaxGetAreaList&prv=query",
		success:function(response){
			var optionHtml = "";
			for(var i=0; i<response.length; i++){
				var a = response[i];
				optionHtml += "<option value='" + a.AreaID + "'>" + a.AreaName + "</option>";
			}
			
			$(area).find("option:gt(0)").remove();
			$(area).append(optionHtml);
		}
	});
}

/**
 * 根据选中游戏区读取游戏服
 * 参数: jquery对象
 */
js.changeArea = function(area, server){
	$(area).change(function(){
		if(this.selectedIndex > 0){
			var areaId = $(this).val();
			$.ajax({
				dataType:"json",
				url:"queryRealTimeData.do?method=ajaxGetServerList&prv=query&areaId=" + areaId,
				success:function(response){
					var optionHtml = "";
					for(var i=0; i<response.length; i++){
						var s = response[i];
						optionHtml += "<option value='" + s.ServerKey + "'>" + s.ServerName + "</option>";
					}
					
					$(server).find("option:gt(0)").remove();
					$(server).append(optionHtml);
				}
			});
		}else{
			$(server).find("option:gt(0)").remove();
		}
	});
}