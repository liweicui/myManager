function m_over(tr){  
  tr.className=tr.className + " " + "trmo";  
}  
function m_out(tr){  
   var cn = tr.className.replace(/\s+trmo/,'');  
    tr.className = cn;  
} 
//ͼ��Ŀ�Ⱥ͸߶�
var width = "800";
var height = "400";
/**=============ͨ��js============**/
//ɾ���������˵Ŀո�
function trim(str){ 
	return str.replace(/(^\s*)|(\s*$)/g,"");
}
function backUrl(url){
		window.location.href=url;
}
//�ж��Ƿ���url
function checkURL(URL){
	var str=URL;
	//����Ĵ�����Ӧ����ת���ַ�"\"���һ���ַ�"/"
	var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/; 
	var objExp=new RegExp(Expression);
	if(objExp.test(str)==true){
	   return true;
	}else{
	   return false;
	}
}