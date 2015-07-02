function m_over(tr){  
  tr.className=tr.className + " " + "trmo";  
}  
function m_out(tr){  
   var cn = tr.className.replace(/\s+trmo/,'');  
    tr.className = cn;  
} 
//图表的宽度和高度
var width = "800";
var height = "400";
/**=============通用js============**/
//删除左右两端的空格
function trim(str){ 
	return str.replace(/(^\s*)|(\s*$)/g,"");
}
function backUrl(url){
		window.location.href=url;
}
//判断是否是url
function checkURL(URL){
	var str=URL;
	//下面的代码中应用了转义字符"\"输出一个字符"/"
	var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/; 
	var objExp=new RegExp(Expression);
	if(objExp.test(str)==true){
	   return true;
	}else{
	   return false;
	}
}