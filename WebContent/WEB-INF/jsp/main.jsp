<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><c:out value="${user.username}"/> - 个人信息</title>
<link rel="stylesheet" href="./css/common.css" type="text/css" />
<script type="text/javascript" src="http://static.mttang.com/js/jquery-1.4.2.min.js"></script>
</head>
<body>
  <div id="man_zone">
	<center><c:out value="${user.username}"/> - 个人信息</center>
	<table class="table_style" border="0" align="center" cellpadding="3" cellspacing="1">
	  <tr>
		<td width="200" class="left_title_1">用户姓名:</td>
		<td width="200"><c:out value='${user.username}'/></td>
	  </tr>
	  <tr>
	 	<td class="left_title_2">用户工号:</td>
		<td><c:out value='${user.empno}'/></td>
	  </tr>
	  <tr>
		<td class="left_title_1">用户电话:</td>
		<td><c:out value='${user.phone}'/></td>
	  </tr>
	  <tr>
		<td class="left_title_2">用户邮箱:</td>
		<td><c:out value='${user.email}'/></td>
	  </tr>		
	  <tr>   	
		<td class="left_title_1">部门:</td>
		<td><c:out value='${user.depName}'/></td>
      </tr>
      <tr>   	
          <td class="left_title_2">角色:</td>
		  <td><c:out value='${user.roleName}'/></td>
      </tr>
	</table>
  </div>
</body>
</html>