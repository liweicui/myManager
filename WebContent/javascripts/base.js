/* *********************************************************************** */
/*                                                                         */
/*                             框架所需的js函数                            */
/*                                                   			           */
/*                                                                         */
/*                                                                         */
/*                                                                         */
/* *********************************************************************** */



function $(id){ return (typeof(id) == "string") ? document.getElementById(id) : id;}
function $V(id){ return $(id).value.trim();}

function hidden(id){ var ctrobj = typeof(id)=="string" ? document.getElementById(id) : id; if(ctrobj) ctrobj.style.display='none'; }
function show(id){ var ctrobj = typeof(id)=="string" ? document.getElementById(id) : id; if(ctrobj) ctrobj.style.display=''; }

String.prototype.trim = function(){ return this.replace(/(^\s*)|(\s*$)/g, "");}

function selectedOption(sel, value) {
	for(var i=0; i < sel.options.length; i++) {
		var op =sel.options[i];
		if(value == op.value ) {
			op.selected =true;
			break;
		}
	}
}


//点击全选checkbox
function selectall(obj) {
    var table = findParentByTagName(obj,"table");
    for(var i=1; i < table.rows.length; i++) {
        selectitem(table, i, obj);
    }
}

function findParentByTagName(obj, tagName) {
    tagName =tagName.toUpperCase();
    var parent =obj;
    while((parent =parent.parentNode) != null) {
        if(parent.tagName.toUpperCase() == tagName) {
            return parent;
        }
    }
    return null;
}
function del(url){
	var array=getSelectedboxSeqIds();
	//获取做删除操作时已经选中的记录的id
    if(array && confirm("确认要删除当前选中的记录吗?")) {
    	document.forms[0].action=url;	   
		document.forms[0].submit();     
	}				
}
function selectoneitem(objbox) {
    var tr =objbox.parentNode.parentNode;
    var unselectedclass = tr.className;	
    if( unselectedclass.indexOf("selected") != -1){
       unselectedclass = unselectedclass.substring(0,unselectedclass.indexOf("selected"));
    }	
    tr.className = objbox.checked ? unselectedclass + "selected" : unselectedclass;      
}

//更改被选中的数据所在行的背景颜色
function selectitem(table, rowindex, headbox) {	
    var checked = headbox.checked;
	  var tr =table.rows[rowindex];
	  var box = tr.cells[0].firstChild;
		if(box == headbox) return;
		var bgcolor = checked ? "#F4F8FB" : "#FFFFFF";
		if(box && box.tagName && box.tagName.toUpperCase() == "INPUT" && box.type.toUpperCase() == "CHECKBOX") {	
			 box.checked =checked;
			 selectoneitem(box);
		}
}

//获取已经选中的记录的id
function getSelectedboxSeqIds() {
    var array =new Array();
    var boxes =document.getElementsByTagName('input');
    for(var i=0; i< boxes.length; i++) {
        if(boxes[i].type.toUpperCase() == "CHECKBOX" && boxes[i].checked) {
            var pos = boxes[i].name.indexOf("seqidbox");
            if(pos < 0) continue;
            array.push(boxes[i].value);
        }
    }
    if(array.length < 1) {
        alert("请选择要操作的数据");
        return null;
    }
    return array;
}



function getSelectedboxSeqIdsByTable(table) {
    var array =new Array();
    for(var i=1; i < table.rows.length; i++) {
        var tr =table.rows[i];
        var box = tr.cells[0].firstChild;
        if(box.name.indexOf("selectseqidbox") < 0 || !box.checked) continue;
        if(box.value == 'on') {box.click();box.click();}
        array.push(box.value);
    }
    if(array.length < 1) {
        alert("请选择要操作的数据");
        return null;
    }
    return array;
 }


Number.prototype.NaN0=function(){return isNaN(this)?0:this;}

function dels() {   	
    var array =getDelSelectedboxSeqIds();    
    if(array) {
		 if(document.getElementById("delbtn")){
			document.getElementById("delbtn").value = array.join(","); 
            document.getElementById("delbtn").click();
         }else{
		    document.getElementById("form:delbtn").value = array.join(","); 
            document.getElementById("form:delbtn").click();
         }
		
    }              
}

