/**
 * ajax 请求获得小游戏广告区域
 * 
 * @return
 */
function getAdArea(id) {
	var url = 'adArea.do?prv=query&method=ajaxGetAdArea';
	url = convertURL(url);
	$.ajax( {
		url :url,
		type :'POST',
		data :'id=' + id,
		dataType :'text',
		success : function(data) {
			$('#adArea').html(data);
		}
	});
};

/**
 * ajax 请求获得小游戏广告区域
 * 
 * @return
 */
function getMiniAdArea() {
	var url = 'miniGame.do?prv=query&method=ajaxGetAdArea';
	url = url = convertURL(url);
	$.ajax( {
		url :url,
		type :'POST',
		dataType :'text',
		success : function(data) {
			$('#area').html(data);
		}
	});
};

/**
 * ajax 请求获得小游戏状态
 * 
 * @return
 */
function getMiniGameState(id) {
	var url = 'miniGame.do?prv=query&method=ajaxGetMiniGameState';
	$.ajax( {
		url :url,
		type :'POST',
		data :'id=' + id,
		dataType :'text',
		success : function(data) {
			$('#state').html(data);
		}
	});
};

/**
 * ajax 请求获得广告状态
 * 
 * @return
 */
function getAdState(id) {
	var url = 'ad.do?prv=query&method=ajaxGetAdState&prv=query&id=' + id;
	$.ajax( {
		url :url,
		type :'POST',
		dataType :'text',
		success : function(data) {
			$('#state').html(data);
		}
	});
};

/**
 * ajax 请求获得游戏广告状态
 * 
 * @return
 */
function getGameAdState(id) {
	var url = 'gameAd.do?prv=query&method=ajaxGetGameAdState';
	$.ajax( {
		url :url,
		type :'POST',
		data :'id=' + id,
		dataType :'text',
		success : function(data) {
			$('#state').html(data);
		}
	});
};

/**
 * ajax 请求获得小游戏和挑战游戏的所有父级分类，分类列表和新增页面
 * 
 * @return
 */
function getAllGameParent(id) {
	var url = 'miniGameClass.do?prv=query&method=ajaxGetGameClassParent&indexNum=1';
	url = url = convertURL(url);
	$.ajax( {
		url :url,
		type :'POST',
		data :'id=' + id,
		dataType :'text',
		success : function(data) {
		$('#parent').html(data);
	}
	});
};
/**
 * ajax 请求获得小游戏父级分类
 * 
 * @return
 */
function getMiniGameParent(id) {
	var url = 'miniGameClass.do?prv=query&method=ajaxGetGameClassParent&indexNum=1&classType=0';
	url = url = convertURL(url);
	$.ajax( {
		url :url,
		type :'POST',
		data :'id=' + id,
		dataType :'text',
		success : function(data) {
			$('#parent').html(data);
		}
	});
};
/**
 * ajax 请求获得挑战游戏父级分类
 * 
 * @return
 */
function getChallengeGameParent(id) {
	var url = 'miniGameClass.do?prv=query&method=ajaxGetGameClassParent&indexNum=1&classType=1';
	url = url = convertURL(url);
	$.ajax( {
		url :url,
		type :'POST',
		data :'id=' + id,
		dataType :'text',
		success : function(data) {
		$('#parent').html(data);
	}
	});
};

/**
 * ajax 请求获得小游戏二级父级分类
 * 
 * @param id
 *            查询的父类id
 * @return
 */
function getMiniGameSecondParent(id) {
	var id = id;
	var url = 'miniGameClass.do?prv=query&method=ajaxGetGameClassParent&indexNum=2&classType=0&id=' + id;
	url = convertURL(url);
	$.ajax( {
		url :url,
		type :'POST',
		dataType :'text',
		success : function(data) {
			$('#class').html(data);
		}
	});
};
/**
 * ajax 请求获得挑战游戏二级父级分类
 * 
 * @param id
 *            查询的父类id
 * @return
 */
function getChallengeGameSecondParent(id) {
	var id = id;
	var url = 'miniGameClass.do?prv=query&method=ajaxGetGameClassParent&indexNum=2&classType=1&id=' + id;
	url = convertURL(url);
	$.ajax( {
		url :url,
		type :'POST',
		dataType :'text',
		success : function(data) {
		$('#class').html(data);
	}
	});
};

/**
 * ajax 请求获得模板名
 * 
 * @return
 */
function getMTemplate(templateId) {
	var url = 'miniGameClass.do?list=0&prv=query&method=ajaxGetTemplate&templateId=' + templateId;
	url = convertURL(url);
	$.ajax( {
		url :url,
		type :'POST',
		dataType :'text',
		success : function(data) {
			$('#template').html(data);
		}
	});
};

/**
 * ajax 请求获得模板名
 * 
 * @return
 */
function getMTemplateList(templateId) {
	var url = 'miniGameClass.do?list=1&prv=query&method=ajaxGetTemplate&templateId=' + templateId;
	url = convertURL(url);
	$.ajax( {
		url :url,
		type :'POST',
		dataType :'text',
		success : function(data) {
			$('#listTmp').html(data);
		}
	});
};

/**
 * ajax 请求获得频道类别
 * 
 * @return
 */
function getGChannelClass(id) {
	var url = 'gameChannelClass.do?prv=query&method=ajaxGetClass';
	url = convertURL(url);
	$.ajax( {
		url :url,
		type :'POST',
		dataType :'text',
		data :'id=' + id,
		success : function(data) {
			$('#class').html(data);
		}
	});
};

/**
 * ajax 请求获得频道状态
 * 
 * @return
 */
function getGChannelState(id) {
	var url = 'gameChannel.do?prv=query&method=ajaxGetState';
	$.ajax( {
		url :url,
		type :'POST',
		data :'id=' + id,
		dataType :'text',
		success : function(data) {
			$('#state').html(data);
		}
	});
};

/**
 * ajax 请求获得模板名
 * 
 * @return
 */
function getNTemplate(templateId) {
	var url = 'newsClass.do?list=0&prv=query&method=ajaxGetTemplate&templateId=' + templateId;
	url = convertURL(url);
	$.ajax( {
		url :url,
		type :'POST',
		dataType :'text',
		success : function(data) {
			$('#template').html(data);
		}
	});
};

/**
 * ajax 请求获得模板名
 * 
 * @return
 */
function getNTemplateList(listTmpId) {
	var url = 'newsClass.do?list=1&prv=query&method=ajaxGetTemplate&templateId=' + listTmpId;
	url = convertURL(url);
	$.ajax( {
		url :url,
		type :'POST',
		dataType :'text',
		success : function(data) {
			$('#listTmp').html(data);
		}
	});
};

/**
 * ajax 请求获得模板类型
 * 
 * @return
 */
function getType() {
	var url = 'template.do?prv=query&method=ajaxGetType';
	url = convertURL(url);
	$.ajax( {
		url :url,
		type :'POST',
		dataType :'text',
		success : function(data) {
			$('#type').html(data);
		}
	});
};

/**
 * ajax 请求获得新闻类别
 * 
 * @return
 */
function getNewsClass(id) {
	var url = 'newsClass.do?prv=query&method=ajaxGetClass';
	url = convertURL(url);
	$.ajax( {
		url :url,
		type :'POST',
		data :'id=' + id,
		dataType :'text',
		success : function(data) {
			$('#class').html(data);
		}
	});
};

/**
 * ajax 请求获得所有新闻类别
 * 
 * @return
 */
function getAllSiteClass(id) {
	var newsType = $('#newsType').val();
	var url = 'newsClass.do?prv=query&method=ajaxGetAllSiteClass';
	url = convertURL(url);
	$.ajax({
		type:"get",
		dataType:"jsonp",
		jsonp:"callBack",
		url :url,
		data :'id=' + id+'&newsType='+newsType,
		success:function(data){
			var dtos = data.info;
			var str = '<table width="680px" cellspacing="1" border="0" align="center" class="table_style"><tbody><tr>';
			for(var i=0;i<dtos.length;i++){
				if(i>0&&i%3==0){
					str = str + '</tr><tr>';
				}
				var dto = dtos[i];
				var checked = '';
				if(dto.selected=='1'){
					checked = 'checked';
				}
				str = str + '<td><input type="checkbox" id="'+dto.siteId+'_'+dto.id+'" name="siteClass'+dto.id+'" value="'+dto.siteId+'_'+dto.id+'" '+checked+'/>['+dto.siteName+']'+dto.name;
				str = str + '<select name="icon'+dto.id+'"><option selected="selected" value="1">图标1</option><option value="2">图标2</option><option value="3">图标3</option><option value="4">图标4</option></select></td>';
			}
			str = str + '</tr></tbody></table>';
			document.getElementById('crossClass').innerHTML = str;
		}
    });
};

/**
 * ajax 请求获得新闻状态
 * 
 * @return
 */
function getNewsState(id) {
	var url = 'news.do?prv=query&method=ajaxGetState';
	$.ajax( {
		url :url,
		type :'POST',
		data :'id=' + id,
		dataType :'text',
		success : function(data) {
			$('#state').html(data);
		}
	});
};

/**
 * ajax 请求获得投票状态
 * 
 * @return
 */
function getVoteForms() {
	var url = 'voteForm.do?prv=query&method=ajaxGetForms';
	$.ajax( {
		url :url,
		type :'POST',
		data :'',
		dataType :'text',
		success : function(data) {
		$('#formId').html(data);
	}
	});
};

/**
 * ajax 请求获得问卷状态
 * 
 * @return
 */
function getVoteState(id) {
	var url = 'voteForm.do?prv=query&method=ajaxGetState';
	$.ajax( {
		url :url,
		type :'POST',
		data :'id=' + id,
		dataType :'text',
		success : function(data) {
		$('#state').html(data);
	}
	});
};

/**
 * ajax 请求获得投票主题
 * 
 * @return
 */
function getWebVote(id) {
	var url = 'vote.do?prv=query&method=ajaxGetVote';
	url = convertURL(url);
	$.ajax( {
		url :url,
		type :'POST',
		data :'id=' + id,
		dataType :'text',
		success : function(data) {
			$('#vote').html(data);
		}
	});
};



/**
 * ajax 请求获得游戏名
 * 
 * @return
 */
function getGame() {
	var url = 'gameChannel.do?prv=query&method=ajaxGetGame';
	url = convertURL(url);
	$.ajax( {
		url :url,
		type :'POST',
		dataType :'text',
		success : function(data) {
			$('#game').html(data);
		}
	});
};
/**
 * ajax 根据小游戏类别获取玩法
 * 
 * @param classId
 */
function getPlayType(){
	var classId = $("#class").val();
	var url = 'miniGamePlay.do?method=getPlayType&prv=query&classId='+classId;
	$.ajax( {
		url :url,
		type :'POST',
		dataType :'text',
		success : function(data) {
			$('#playId').html(data);
		}
	});
}
/**
 * 给ajax请求加上时间戳
 * 
 * @param url
 * @return
 */
function convertURL(url) {
	var timestamp = (new Date()).valueOf();
	if (url.indexOf("?") >= 0) {
		url = url + "&t=" + timestamp;
	} else {
		url = url + "?t=" + timestamp;
	}
	return url;
};