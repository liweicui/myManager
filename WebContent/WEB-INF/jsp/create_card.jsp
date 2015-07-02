<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>实卡生成</title>
<link type="text/css" rel="stylesheet" href="http://static.mttang.com/css/validator.css"></link>
<link type="text/css" href="http://static.mttang.com/css/jquery.datepick.css" rel="stylesheet" />
<link rel="stylesheet" href="css/common.css" type="text/css" />
<link href="http://static.mttang.com/css/Public.css" rel="stylesheet" type="text/css" />
<link href="http://static.mttang.com/css/recharge.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="http://static.mttang.com/js/jquery-1.4.2.min.js"></script>
		<script src="http://static.mttang.com/js/formValidator.js" type="text/javascript" charset="UTF-8"></script>
		<script src="http://static.mttang.com/js/formValidatorRegex.js" type="text/javascript" charset="UTF-8"></script>
		<script type="text/javascript" src="http://static.mttang.com/js/jquery.datepick.min.js"></script>
		<script type="text/javascript" src="http://static.mttang.com/js/jquery.datepick-zh-CN.js"></script>

<script language="javascript">
$(document).ready(function() {  

	$.formValidator.initConfig({formid:"form1",onerror:function(msg){alert(msg)},onsuccess:function(){doajax();return false;}});
	$('#numberId').formValidator({onshow:"请输入数量",tipid:"numberTip",empty:false,onempty:"数量不能为空",onfocus:"请输入内容"})
	.inputValidator({min:1,max:99999,type:"value",onerror:"数值必须在1-99999之间"})
	.regexValidator({regexp:"intege",datatype:"enum",onerror:"数量只能是整数"});

	
	$('#disuseTimeId').formValidator({empty:false,onshow:"请选择时间",tipid:"disuseTip",oncorrect:"时间正确"})
	.regexValidator({regexp:"date",datatype:"enum",onerror:"格式不正确"});


	$("#disuseTimeId").datepick();
	$('#load').hide();

	
	
	$('input').focus(function(){
		$('#load').hide();
	});
	
   });  


	function doajax() {
		var number = $('#numberId').val();
		var disuseTime = $('#disuseTimeId').val();
		var typeid = $('#typeId').val();
		var now = new Date();
		var snow = now.getFullYear() + "-" + (now.getMonth() + 1) + "-"
				+ now.getDate();
		var days = daysElapsed(snow, disuseTime);
		if (days > 0) {
			alert('时间不能早于当前时间');
		} else {
			$.post('createCardAction.do', {
				prv :"create",
				action :"createCard",
				typeId :typeid,
				number :number,
				disuseTime :disuseTime
			}, function(data) {
				document.getElementById('load').innerHTML = "<p>" + data
						+ "</P>";
			});
			$('#load').show();
		}

	}

	function daysElapsed(date1, date2) {
		var d1 = date1.split("-");
		var d2 = date2.split("-");
		var difference = new Date(d1[0], d1[1] - 1, d1[2])
				- new Date(d2[0], d2[1] - 1, d2[2]);
		return parseInt(difference) / 1000 / 60 / 60 / 24;
	}
</script>
	



</head>
<body >
<div id="man_zone">
<center><c:out value="${errorMsg.error}" /></center>  
<form id="form1" action="createCardAction.do" method="get">

	<table class="table_style" border="0" align="center"  cellpadding="3" cellspacing="1">
       <tr>
         <td class="left_title_1"> 卡类型：</td>
         <td>
         <select id="typeId" name="typeId">
					 <c:forEach items="${view}" var="cardType"> 
						<option value="<c:out value="${cardType.typeId}" escapeXml="false"/>"><c:out value="${cardType.typeName}" escapeXml="false"/> </option>
 					 </c:forEach>
		 		</select>
         
         </td>
         <td class="text_tip"><div id="typeTip"></div></td>
       </tr>
       <tr>
         <td class="left_title_2">生成数量：</td>
         <td><input type="text" id="numberId" name="number" size="5" maxlength="5" /></td>
         <td><div id="numberTip"></div></td>
       </tr>
       <tr>
         <td class="left_title_1">废弃时间：</td>
         <td><input type="text" id="disuseTimeId" name="disuseTime"  readonly="readonly" /></td>
         <td><div id="disuseTip"></div></td>
       </tr>
       
       <tr>
			<td colspan="3" align="center"><input type="submit"  value="确  定"  /></td>
		</tr>
       
       
   </table>
   <input type="hidden"  name="prv"  value="create"  />
  <br /><br />
<div id="load"  class="ui-state-highlight ui-corner-all" align="center"><p>正在处理，请稍候：<img src="../images/onLoad.gif" /></p></div>
</form>
</div>
</body>
</html>