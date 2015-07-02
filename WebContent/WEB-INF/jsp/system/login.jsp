<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%String str=(request.getRequestURL().toString()).split("info-pub-web")[0]; %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>管理系统</title>
		    <link rel="stylesheet" href="css/common.css" type="text/css" />
            <script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-1.7.2.min.js"></script>
		<script>
		   function 	(){
              var name=document.getElementById("empno").value;
              if(name.length<1){
               alert('请输入工号！！');
               return false;
                  }
              window.location.href='login.do?method=pass&empno='+name;
		   }
		   function changeimg(){
				var clsDate = new Date();
				document.getElementById('imgcode').src='../image.do?time='+clsDate.getTime();
			}
		   $(document).ready(function(){
				$.formValidator.initConfig({formid:"form1",onerror:function(msg){alert(msg)},onsuccess:function(){return true;}});
				$('#empno').formValidator({onshow:"请输入工号",oncorrect:"输入正确",empty:false,onfocus:"工号不能为空",tipid:"empnoTip"})
				.inputValidator({type:"size",min:"1",max:"20",onerror:"工号长度不正确"});
				$('#passWord').formValidator({onshow:"请输入密码",oncorrect:"输入正确",empty:false,onfocus:"密码不能为空",tipid:"passWordTip"})
				.inputValidator({type:"size",min:"1",max:"20",onerror:"密码长度不正确"});
				$('#code').formValidator({onshow:"请输入验证码",empty:false,onfocus:"验证码不能为空",tipid:"codeTip"})
				.inputValidator({max:"4",min:"4",empty:false,onerror:"长度不正确"}).regexValidator({regexp:"numberandchar",datatype:"enum",onerror:"无效字符"});
			});		   
		 </script>
	</head>
	<body bgcolor="#F3F8F7" >
		<div id="man_zone">
		<p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
             <center>   </center>
		<form action="/system/login.do" id="form1" method="post">
		  <table  bgcolor="#F3F8F7" class="table_style" border="0" align="center"  cellpadding="3" cellspacing="1">
		   	<tr>
		   	<td class="left_title_1">工号:</td>
            <td><input type="text"  id="empno"  name="empno" value=""/>  </td>
            <td class="text_tip" width="150" ><div id="empnoTip"><font color="red" size="1">  <c:out value='${errorInfo.empno}'/>  </font></div></td>
		   	<tr>
		   	<td class="left_title_1">密码:</td>
            <td><input type="password" id="passWord" name="passWord" value=""/> </td>
            <td class="text_tip"><div id="passWordTip"><font color="red" size="1"><c:out value='${errorInfo.passWord}'/></font></div></td>
		   	</tr>		   	
		   	<tr>
		   	<td class="left_title_1">验证码:</td>
            <td><input id="code" name="code" type="text" size="6" />&nbsp;<img id="imgcode"  src="../image.do"  onclick="javascript:changeimg()" /> </td>
            <td class="text_tip"><div id="codeTip">  <font color="red" size="1"> <c:out value='${errorInfo.code}'/>  </font> </div>  </td>
            </tr>
		   	<tr>
		   	<td   align="center"  colspan="3" >
		   	</td>
		   	</tr>
		  </table>
		  
	 <table   bgcolor="#F3F8F7" class="table_style" border="0" align="center"  cellpadding="3" cellspacing="1">
       <tr>
         <td>
          <input type="submit" value="登入" />
          <span class="sub_sp">&nbsp;</span>
          <input type="reset" value="重填" />
          &nbsp;&nbsp;&nbsp;&nbsp;<input  type="button" onclick="return  pass();"  value="忘记密码" />
         </td>
       </tr>
	</table>
		</form>
		</div>
	</body>
</html>