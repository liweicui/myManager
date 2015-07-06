<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="/css/common.css" type="text/css" />
<title>左侧导航栏</title>
<script type="text/javascript">
			var m = "";
			function menu(num){
				sub = eval("sub_"+num+".style");
				if(m != sub){
					if(m != ""){
						m.display = "none";
					}
					sub.display='block';
					m = sub;
				}else{
					sub.display = "none";
					m = "";
				}
			}
		</script>
		<link rel="stylesheet" type="text/css" href="/css/styles.css">
	    <style type="text/css">
<!--
.m1 {
	font-size: 12px;
	font-weight: bold;
	margin-left: 60px;
	text-align: center;
	vertical-align: sub;
}
.sub1 {
	margin-left: 40px;
}
-->
        </style>
</head>
<body onload="initinav('0')">

  <div id="left_content">
	<div id="user_info">
		欢迎您，<strong><c:out value='${user.username}'/></strong> <br/>
		[<!--<a href="#"><c:out value='${user.roleName}'/></a>， --><a href="javascript:changeframe('个人信息详情', '系统管理', '<%=request.getContextPath()%>/index.do?method=mainFrame')">个人信息</a>, <a href="index.do?method=loginOut">退出</a>]
	</div>
	<div id="main_nav">
		<div id="left_main_nav">	
		</div>
		<div id="right_main_nav">
		    
		    <table border="0" width="200" height="100%" align="right" cellSpacing="0" cellPadding="0" bgcolor="#FFFFFF">
    	<!-- 药品管理 -->
   <tr>
			<td onClick="menu(0)" height="33"     bgcolor="#FFFFFF">
				<font class="m1">
					订单管理
				</font>
			</td>
		</tr>
		<tr bgcolor="#FFFFFF">
			<td id="sub_0" style="display: none">
				<table width="80%" align="center">
					<tr>
						<td height="22" onmouseover="this.style.backgroundColor='#ffffff'" onmouseout="this.style.backgroundColor=''">
						<a href="baseData/med.do?command=paging" target="main" class="sub1">药品管理555</a>
							
						</td>
					</tr>
					<tr>
						<td height="22" onmouseover="this.style.backgroundColor='#ffffff'" onmouseout="this.style.backgroundColor=''">
							<a href="baseData/med.do?command=paging" target="main" class="sub1">药品管理3</a>
							
						</td>
					</tr>
					<tr>
						<td height="22" onmouseover="this.style.backgroundColor='#ffffff'" onmouseout="this.style.backgroundColor=''">
							<a href="baseData/category.do?command=findCategoryAndCound" target="main" class="sub1">
								订单管理3
							</a>
						</td>
					</tr>
				</table>
			</td>
		</tr>
    	<!-- 类别管理 -->
    	<tr>
			<td onClick="menu(1)" height="33" background="/images/m1.jpg">
				<font class="m1" bgcolor="#FFFFFF">
					订单管理
				</font>
			</td>
		</tr>
		<tr bgcolor="#FFFFFF">
			<td id="sub_1" style="display: none">
				<table width="80%" align="center">
					<tr>
						<td height="22" onmouseover="this.style.backgroundColor='#ffffff'" onmouseout="this.style.backgroundColor=''">
						<a href="baseData/med.do?command=paging" target="main" class="sub1">药品管理3</a>
							
						</td>
					</tr>
					<tr>
						<td height="22" onmouseover="this.style.backgroundColor='#ffffff'" onmouseout="this.style.backgroundColor=''">
							<a href="baseData/med.do?command=paging" target="main" class="sub1">药品管理3</a>
							
						</td>
					</tr>
					<tr>
						<td height="22" onmouseover="this.style.backgroundColor='#ffffff'" onmouseout="this.style.backgroundColor=''">
							<a href="baseData/category.do?command=findCategoryAndCound" target="main" class="sub1">
								订单管理3
							</a>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		  
		<tr>
			<td height="100%"></td>
		</tr>
	   
	</table>
		
		</div>
	</div>
  </div>
</body>
</html>