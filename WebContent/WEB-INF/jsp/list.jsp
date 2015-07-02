<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>一个小小的测试-列表</title>
	</head>
	<body>
		<div>
		Test List:<br />
		
		<c:forEach items="${allTest}" var="test" varStatus="status">
			<div style="border: 1px solid gray"><span>username: <c:out value="${test.username}"></c:out></span><span>email: <c:out value="${test.email}"></c:out></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="<c:url value='/test/testAction.do'/>?testId=<c:out value='${test.id}' />">detail</a></div>
		</c:forEach>
		</div>
	</body>
</html>