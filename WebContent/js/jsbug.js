$(document).ready(function(){
       	$("input:text[name=BEGIN_DATE], input:text[name=END_DATE]").click(function(){
		WdatePicker();
	});
});
function exportData(){
 	  var form = document.getElementById("queryForm") ;
 	  form.action = "../js/jsbug.do?method=exportDate" ;
 	  form.method = "post" ;
 	  form.submit();
 	  form.action = "../js/jsbug.do?method=query" ;
}
function sortData(){
 	  var form = document.getElementById("queryForm") ;
 	  form.action = "../js/jsbug.do?method=sortData" ;
 	  form.method = "post" ;
 	  form.submit();
}
function exportSortData(){
 	  var form = document.getElementById("queryForm") ;
 	  form.action = "../js/jsbug.do?method=exportSortData" ;
 	  form.method = "post" ;
 	  form.submit();
 	  form.action = "../js/jsbug.do?method=sortData" ;
}
function queryJsBugView(){
 	  var form = document.getElementById("queryForm") ;
 	  form.action = "../js/jsbug.do?method=query" ;
 	  form.method = "post" ;
 	  form.submit();
}
function checkBugInfo(status){
	var score = document.getElementById("SCORE").value ;
	if(validate(score)){
		var form = document.getElementById("updateForm") ;
		var id = document.getElementById("ID").value;
		var SCORE = document.getElementById("SCORE").value;
		if(SCORE==null||SCORE==''){
			SCORE = 0  ;
		}
		var url = "../js/jsbug.do?method=checkJsBugInfo&STATUS="+status+"&ID="+id+"&SCORE="+SCORE+"&prv=update" ;
		form.action = url;
		form.method = "post" ;
		form.submit() ;
	}else{
		alert("积分为不超过两位数字的正整数");
	}
}
function validate(score){
	if(score.length>2){
		return false ;
	}else{
		return isPlusInteger(score) ;
	}			
}
function isPlusInteger(score){var patrn=/^([+]?)(\d+)$/;return patrn.test(score);}
function showList(){
	$("#BEGIN_DATE").val("");
	$("#END_DATE").val("");
	var form = document.getElementById("queryForm") ;
 	form.action = "../js/jsbug.do?method=query" ;
 	form.method = "post" ;
 	form.submit();
}