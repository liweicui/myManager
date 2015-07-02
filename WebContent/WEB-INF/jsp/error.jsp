<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户管理</title>
<link rel="stylesheet" href="../css/common.css" type="text/css" />
<link href="http://static.mttang.com/css/Public.css" rel="stylesheet" type="text/css" />
<link href="http://static.mttang.com/css/recharge.css" rel="stylesheet" type="text/css" />
<link type="text/css" rel="stylesheet" href="http://static.mttang.com/css/validator.css"></link>
<script type="text/javascript" src="http://static.mttang.com/js/jquery-1.4.2.min.js"></script>
<script src="http://static.mttang.com/js/formValidator.js" type="text/javascript" charset="UTF-8"></script>
<script src="http://static.mttang.com/js/formValidatorRegex.js" type="text/javascript" charset="UTF-8"></script>
		    <script src="../javascripts/sysValidate.js"></script>
	</head>
	<body>
		<div id="man_zone">
                    <center><c:out value="${bean}" /></center>
		</div>
	</body>
</html>