/*
* 获取游戏区服
*/
  var arr=new Array();
	$(document).ready(function(){
		//获取游戏服务器数据
	    <c:forEach items='${data}' var='obj' varStatus='st'>
		    arr[<c:out value='${st.index}'/>]="<c:out value='${obj.Table.AreaID}'/>|<c:out value='${obj.Table.AreaName}'/>|<c:out value='${obj.Table.ServerKey}'/>|<c:out value='${obj.Table.ServerName}'/>";
	    </c:forEach>
	    //初始化 游戏区 选择项
		var areaArr=new Array();
		var index=0;
		for(var i=0;i<arr.length;i++){
	          isExist = false;
	          var tempArr=arr[i].split("|");
		      for(var j=0;j<areaArr.length;j++){
			      if(areaArr[j]==tempArr[0])
			      {
				    isExist = true;
			      }
		      }
		      if(!isExist){
			      areaArr[index]=tempArr[0];   
			      index++;
			      $("#gameArea").append("<option value='"+tempArr[0]+"'>"+tempArr[1]+"</option>"); 
		      }
		}
		
		init();
	});

	function changeGameServer(value){
		$("#gameServer").find("option").remove();
		$("#gameServer").append("<option value=''>---请选择游戏服---</option>");

		if(!value)return;

		for(var i=0;i<arr.length;i++){
	          var tempArr=arr[i].split("|");
		      if(value==tempArr[0])
		      {
			    $("#gameServer").append("<option value='"+tempArr[2]+"'>"+tempArr[3]+"</option>"); 
		      }
		}
	}
	function init(){
		var gameArea = '<%=gameArea%>';
		var gameServer = '<%=gameServer%>';
		if(gameArea!='null'&&gameArea!=''){
			$("#gameArea").val(gameArea);
		}
		if(gameServer!='null'&&gameServer!=''){
			changeGameServer(gameArea);
		    $("#gameServer").val(gameServer);
		}
		
	}