<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="css/common.css" type="text/css" />
<title>管理导航区域</title>
<style type="text/css">
	#nav {position:relative;padding-left:35px;width:800px;}
	#btnPrev, #btnNext {position:absolute;cursor:pointer;top:5px;}
	#btnPrev {left:10px;}
	#btnNext {right:0;}
	#container {}
</style>
</head>
<body>
<div id="nav">
  <img id="btnPrev" class="btnPrev" src="<%=request.getContextPath()%>/images/btnPrev.png" alt="查看更多"/>
  <div id="container">
    <ul>
      <li value="0" class="bg_image_onclick">管理首页</li>
      <c:forEach items="${bean.list}" var="item" varStatus="status">
        <li value="<c:out value="${item.menuId}"/>" class="bg_image"><c:out  value="${item.menuName }"/></li>
      </c:forEach>
    </ul>
  </div>
  <img id="btnNext" class="btnNext" src="<%=request.getContextPath()%>/images/btnNext.png" alt="查看更多"/>  
</div>
<div id="sub_info">
  <span style="margin: 0pt 10px 0pt 10pt;">
	您当前的站点是:
  	<select id="keySite" onchange="changeSiteKey();">
  	  <c:forEach items="${stageMap}" var="stage">
  	  	<option value='<c:out value="${stage.key}"/>' <c:if test="${siteId == stage.key}">selected="true"</c:if>><c:out value="${stage.value}"/></option>
  	  </c:forEach>
	</select>
  </span>
  <img src="images/hi.gif" />&nbsp;<span id="show_text">欢迎使用后台管理系统!</span>
</div>

<script type="text/javascript" src="http://static.mttang.com/js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="http://static.mttang.com/global/js/p/jcarousel.min.js"></script> 
<script type="text/javascript"> 
    if($("#nav ul li").length > 9){
	  $("#container").jCarouselLite({btnNext: "#btnNext", btnPrev: "#btnPrev",speed:200, easing: null, visible: 9, start: 0, scroll: 1 }); 
    }

	$(function(){
		$("#nav ul li").click(function(){
			$(this).siblings().removeClass("bg_image_onclick").addClass("bg_image");
			$(this).removeClass("bg_image").addClass("bg_image_onclick");
			var menuId = $(this).attr("value");
			window.top.frames['leftFrame'].outlookbar.getbytitle(menuId);
			window.top.frames['leftFrame'].outlookbar.getdefaultnav(menuId);
		});
	});

	//获取对象属性兼容方法
	function getObject(objectId) {
	    if(document.getElementById && document.getElementById(objectId)) {
			// W3C DOM
			return document.getElementById(objectId);
	    } else if (document.all && document.all(objectId)) {
			// MSIE 4 DOM
			return document.all(objectId);
	    } else if (document.layers && document.layers[objectId]) {
			// NN 4 DOM.. note: this won't find nested layers
			return document.layers[objectId];
	    } else {
			return false;
	    }
	}
	 
 	function changeSiteKey(){
		var siteid = $("#keySite").val();
		$.ajax({
		  	url: "<%=request.getContextPath()%>/login/login.do?method=loginChangeKey",
		  	cache: false,
		  	type:"post",
		  	dataType:"text",
		  	error:function(XMLHttpRequest,textStatus,errorThrown){
			  	alert("请求的地址错误");
		  	},
		  	data:"&siteId="+siteid,
		  	success: function(retext){
				if(retext){return !!alert(retext);}
				
			  	var reloadUrl = window.top.frames["manFrame"].location.href;
			  	if(reloadUrl.indexOf("prv=query")<0){
				  	if(reloadUrl.indexOf("?")<0){
				  		reloadUrl+="?prv=query";
				  	}else{
				  		reloadUrl+="&prv=query";
				  	}
			  	}
			  	window.top.frames["manFrame"].location.href=reloadUrl;
		  	}
		});
	}
</script>
</body>
</html>