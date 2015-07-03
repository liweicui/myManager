	function toggleDiv(e,left,top){
		var t=e.offsetTop;   
	    var l=e.offsetLeft;   
	    var height=e.offsetHeight;   
	    while(e=e.offsetParent){   
	        t+=e.offsetTop;   
	        l+=e.offsetLeft;   
	    }   
	    $("#des").toggle();
	    $("#des").css("left",l+left);
	    $("#des").css("top",t+top);
	}