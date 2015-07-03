/**
 * 验证广告表单字段
 * 
 * @return
 */
function adFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#name').formValidator( {
		onshow :"请输入广告名",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"广告名不能为空",
		tipid :"nameTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"广告名为空或长度不正确"
	});
	$('#title').formValidator( {
		onshow :"请输入标题",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"标题不能为空",
		tipid :"titleTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		empty :false,
		onerror :"标题为空或长度不正确"
	});
	$('#orderNum').formValidator( {
		onshow :"请输入1-999之间的数字",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"排序号不能为空",
		tipid :"orderNumTip"
	}).inputValidator( {
		max :"3",
		min :"1",
		empty :false,
		onerror :"排序号为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"你输入的必须是正整数"
	});
	$('#href').formValidator( {
		onshow :"请输入广告链接",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"广告链接不能为空",
		tipid :"hrefTip"
	}).inputValidator( {
		max :"255",
		min :"1",
		empty :false,
		onerror :"广告链接为空或长度不正确"
	});
	$('#tempFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"广告文件可以不修改",
		onempty :"你真的不想修改文件?",
		tipid :"tempFileTip"
	}).inputValidator( {
		max :"255",
		min :"1",
		empty :true,
		onerror :"长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#smallIconFile').formValidator( {
		empty :true,
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		onfocus :"你要是选择了, 必须输入正确",
		onempty :"你真的不想选择小图标文件?",
		tipid :"smallIconFileTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#description').formValidator( {
		empty :true,
		onshow :"请输入描述, 可以为空",
		oncorrect :"输入正确",
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"descriptionTip"
	}).inputValidator( {
		max :"500",
		min :"1",
		onerror :"长度不正确"
	});
	$('#welcomeWord').formValidator( {
		onshow :"请输入欢迎词, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"可为空",
		tipid :"welcomeTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
};

/**
 * 广告区域表单字段验证
 * 
 * @return
 */
function adAreaFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#name').formValidator( {
		onshow :"请输入广告区域名",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"广告区域名不能为空",
		tipid :"nameTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"广告区域名为空或长度不正确"
	});
	$('#page').formValidator( {
		onshow :"请输入页面",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"页面不能为空",
		tipid :"pageTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		empty :false,
		onerror :"页面为空或长度不正确"
	});
	$('#mark').formValidator( {
		onshow :"请输入区域标记",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"区域标记不能为空",
		tipid :"markTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"区域标记为空或长度不正确"
	}).regexValidator( {
		regexp :"numberandchar",
		datatype :"enum",
		onerror :"只能输入字母和数字，以字母开头"
	}).ajaxValidator( {
		type :"get",
		url :"adArea.do",
		data :"prv=query&method=ajaxUnique&param=validateInsert",
		datatype :"text",
		success : function(data) {
			if (data.length > 0) {
				return false;
			} else {
				return true;
			}
		},
		error : function() {
			alert("服务器没有返回数据，可能服务器忙，请重试");
		},
		onerror :"该区域标记不可用，请更换区域标记",
		onwait :"正在对区域标记进行合法性校验，请稍候..."
	});
	$('#type').formValidator( {
		onshow :"请选择广告类型",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"广告类型不能为空",
		tipid :"typeTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"广告类型为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#speed').formValidator( {
		empty :true,
		onshow :"请输入广告速度, 可以为空",
		oncorrect :"输入正确",
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"speedTip"
	}).inputValidator( {
		max :"5",
		min :"1",
		onerror :"长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"你输入的必须是正整数"
	});
	$('#height').formValidator( {
		empty :true,
		onshow :"请输入广告高度, 可以为空",
		oncorrect :"输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"heightTip"
	}).inputValidator( {
		max :"5",
		min :"1",
		onerror :"长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"你输入的必须是正整数"
	});
	$('#width').formValidator( {
		empty :true,
		onshow :"请输入广告宽度, 可以为空",
		oncorrect :"输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"widthTip"
	}).inputValidator( {
		max :"5",
		min :"1",
		onerror :"长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"你输入的必须是正整数"
	});
	$('#fileSize').formValidator( {
		empty :true,
		onshow :"请输入广告文件大小, 可以为空",
		oncorrect :"输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"fileSizeTip"
	}).inputValidator( {
		max :"5",
		min :"1",
		onerror :"长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"你输入的必须是正整数"
	});
	$('#adCount').formValidator( {
		onshow :"请输入广告数量",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"广告数量不能为空",
		tipid :"adCountTip"
	}).inputValidator( {
		max :"3",
		min :"1",
		empty :false,
		onerror :"广告数量为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#isPptAd').formValidator( {
		onshow :"请选择广告文件类型",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"广告文件类型不能为空",
		tipid :"isPptAdTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"广告文件类型为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});

};

/**
 * 游戏频道表单字段验证
 * 
 * @return
 */
function gameChannelFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#name').formValidator( {
		onshow :"请输入游戏频道名",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"游戏频道名不能为空",
		tipid :"nameTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"游戏频道名为空或长度不正确"
	});
	$('#orderNum').formValidator( {
		onshow :"请输入1-999之间的数字",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"排序号不能为空",
		tipid :"orderNumTip"
	}).inputValidator( {
		max :"3",
		min :"1",
		empty :false,
		onerror :"排序号为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"你输入的必须是正整数"
	});
	$('#class').formValidator( {
		onshow :"请选择频道类别",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"频道类别不能为空",
		tipid :"classTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"频道类别为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#game').formValidator( {
		onshow :"请选择游戏名",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"游戏名不能为空",
		tipid :"gameTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"游戏名为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#title').formValidator( {
		empty :false,
		onshow :"请输入标题",
		oncorrect :"输入正确",
		onfocus :"标题不能为空",
		tipid :"titleTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"标题为空或长度不正确"
	});
	$('#mainIconFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"主页图标文件不能为空",
		tipid :"mainIconFileTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		empty :false,
		onerror :"图标文件为空或长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#mainIconHref').formValidator( {
		onshow :"请输入主页链接地址",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"主页链接不能为空",
		tipid :"mainIconHrefTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		empty :false,
		onerror :"主页链接为空或长度不正确"
	});
	$('#activateIconFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件，可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"activateIconFileTip"
	}).inputValidator( {
		max :"128",
		onerror :"长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#bigIconFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"大图标可以为空",
		onempty :"你不想输入图标文件了?",
		tipid :"bigIconFileTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		onerror :"长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";
				
			}
		}
	});
	$('#forumIconFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"forumIconFileTip"
	}).inputValidator( {
		max :"64",
		onerror :"长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#forumHref').formValidator( {
		empty :true,
		onshow :"请输入论坛链接地址, 可以为空",
		oncorrect :"输入正确",
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"forumHrefTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		onerror :"长度不正确"
	});
	$('#downloadHref').formValidator( {
		onshow :"请输入下载链接，可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"downloadHrefTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		onerror :"长度不正确"
	});
	$('#docHref').formValidator( {
		onshow :"请输入资料链接，可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"docHrefTip"
	}).inputValidator( {
		max :"300",
		min :"1",
		onerror :"长度不正确"
	});
	$('#guideHref').formValidator( {
		onshow :"请输入指南链接，可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"guideHrefTip"
	}).inputValidator( {
		max :"300",
		min :"1",
		onerror :"长度不正确"
	});
	$('#hdOneTitle').formValidator( {
		onshow :"请输入活动标题，可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"hdOneTitleTip"
	}).inputValidator( {
		max :"300",
		min :"1",
		onerror :"长度不正确"
	});
	$('#hdOneHref').formValidator( {
		onshow :"请输入活动链接，可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"hdOneHrefTip"
	}).inputValidator( {
		max :"300",
		min :"1",
		onerror :"长度不正确"
	});
	$('#hdTwoTitle').formValidator( {
		onshow :"请输入活动标题，可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"hdTwoTitleTip"
	}).inputValidator( {
		max :"300",
		min :"1",
		onerror :"长度不正确"
	});
	$('#hdTwoHref').formValidator( {
		onshow :"请输入活动链接，可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"hdTwoHrefTip"
	}).inputValidator( {
		max :"300",
		min :"1",
		onerror :"长度不正确"
	});
	$('#hdMoreHref').formValidator( {
		onshow :"请输入更多活动链接，可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"hdMoreHrefTip"
	}).inputValidator( {
		max :"300",
		min :"1",
		onerror :"长度不正确"
	});
	$('#other1').formValidator( {
		onshow :"请输入内容，可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"other1Tip"
	}).inputValidator( {
		max :"500",
		min :"1",
		onerror :"长度不正确"
	});
	$('#other2').formValidator( {
		onshow :"请输入内容，可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"other2Tip"
	}).inputValidator( {
		max :"500",
		min :"1",
		onerror :"长度不正确"
	});
	$('#remark').formValidator( {
		empty :true,
		onshow :"请输入备注, 可以为空",
		oncorrect :"输入正确",
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"remarkTip"
	}).inputValidator( {
		max :"500",
		min :"1",
		onerror :"长度不正确"
	});
};

/**
 * 游戏频道类别表单字段验证
 * 
 * @return
 */
function gameChannelClsFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#name').formValidator( {
		onshow :"请输入频道类别名",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"频道类别名不能为空",
		tipid :"nameTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"频道类别名为空或长度不正确"
	});
	$('#orderNum').formValidator( {
		onshow :"请输入1-999之间的数字",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"排序号不能为空",
		tipid :"orderNumTip"
	}).inputValidator( {
		max :"3",
		min :"1",
		empty :false,
		onerror :"排序号为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"你输入的必须是正整数"
	});
	$('#description').formValidator( {
		onshow :"请输入频道类别描述",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"descriptionTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		onerror :"长度不正确"
	});
	$('#iconFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"分类图标可以为空",
		onempty :"你不想输入图标了?",
		tipid :"iconFileTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		onerror :"长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";
			}
		}
	});
};

/**
 * 游戏广告表单字段验证
 * 
 * @return
 */
function gameAdFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#name').formValidator( {
		onshow :"请输入游戏广告名",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"游戏广告名不能为空",
		tipid :"nameTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"游戏广告名为空或长度不正确"
	});
	$('#orderNum').formValidator( {
		onshow :"请输入1-999之间的数字",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"排序号不能为空",
		tipid :"orderNumTip"
	}).inputValidator( {
		max :"3",
		min :"1",
		empty :false,
		onerror :"排序号为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"你输入的必须是正整数"
	});
	$('#href').formValidator( {
		onshow :"请输入广告链接",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"广告链接不能为空",
		tipid :"hrefTip"
	}).inputValidator( {
		max :"512",
		min :"1",
		empty :false,
		onerror :"广告链接为空或长度不正确"
	});
	$('#title').formValidator( {
		onshow :"请输入广告标题",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"广告标题不能为空",
		tipid :"titleTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"广告标题为空或长度不正确"
	});
	$('#description').formValidator( {
		onshow :"请输入频道类别描述",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"descriptionTip"
	}).inputValidator( {
		max :"128",
		onerror :"长度不正确"
	});
	$('#iconFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"图标文件不能为空",
		tipid :"iconFileTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"图标文件为空或长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#remark').formValidator( {
		onshow :"请输入备注",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"remarkTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		onerror :"长度不正确"
	});
};

/**
 * 小游戏表单字段验证
 * 
 * @return
 */
function miniGameFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#name').formValidator( {
		onshow :"请输入小游戏名",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"小游戏名不能为空",
		tipid :"nameTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"小游戏名为空或长度不正确"
	}).ajaxValidator( {
		type :"post",
		url :"miniGame.do?prv=query&method=ajaxUnique&param=validateInsert",
		datatype :"text",
		success : function(data) {
			if (data.length > 0) {
				return false;
			} else {
				return true;
			}
		},
		error : function() {
			alert("服务器没有返回数据，可能服务器忙，请重试");
		},
		onerror :"该游戏名不可用，请更换",
		onwait :"正在对小游戏名进行合法性校验，请稍候..."
	});
	$('#orderNum').formValidator( {
		onshow :"请输入1-999之间的数字",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"排序号不能为空",
		tipid :"orderNumTip"
	}).inputValidator( {
		max :"3",
		min :"1",
		empty :false,
		onerror :"排序号为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"你输入的必须是正整数"
	});
	$('#class').formValidator( {
		onshow :"请选择小游戏类别",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"小游戏类别不能为空",
		tipid :"classTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"小游戏类别为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#gameFile').formValidator( {
		onshow :"请选择 swf 类型的小游戏文件",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"小游戏文件不能为空",
		tipid :"gameFileTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		empty :false,
		onerror :"小游戏文件为空或长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 2)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#smallIconFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"小图标不能为空",
		tipid :"smallIconFileTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"小图标为空或长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#iconFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"大图标不能为空",
		tipid :"iconFileTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"大图标为空或长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#pptImgFile').formValidator( {
		empty :true,
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		onfocus :"你要是选择了, 必须输入正确",
		onempty :"你真的不想选择PPT图片文件?",
		tipid :"pptImgFileTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#pptHref').formValidator( {
		empty :true,
		onshow :"请输入PPT链接",
		oncorrect :"输入正确",
		onfocus :"你要是选择了, 必须输入正确",
		onempty :"你真的不想输入PPT链接地址?",
		tipid :"pptHrefTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
	$('#pptTitle').formValidator( {
		onshow :"请输入PPT标题, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入PPT标题?",
		tipid :"pptTitleTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
	$('#adImgFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的广告文件, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想选择小游戏广告文件?",
		tipid :"adImgFileTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#adHref').formValidator( {
		onshow :"请输入小游戏广告链接, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入小游戏广告链接?",
		tipid :"adHrefTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
	$('#adTitle').formValidator( {
		onshow :"请输入小游戏广告标题, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入小游戏广告标题?",
		tipid :"adTitleTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
	$('#area').formValidator( {
		onshow :"请选择广告区域, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想选择广告区域?",
		tipid :"areaTip"
	}).inputValidator( {
		min :"1",
		onerror :"长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#description').formValidator( {
		onshow :"请输入小游戏描述",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"descriptionTip"
	}).inputValidator( {
		max :"500",
		onerror :"长度不正确"
	});
};
/**
 * 挑战游戏表单字段验证
 * 
 * @return
 */
function challengeGameFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
		alert(msg)
	},
	onsuccess : function() {
		return true;
	}
	});
	$('#name').formValidator( {
		onshow :"请输入挑战游戏名",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"挑战游戏名不能为空",
		tipid :"nameTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"挑战游戏名为空或长度不正确"
	}).ajaxValidator( {
		type :"post",
		url :"challengeGame.do?prv=query&method=ajaxUnique&param=validateInsert",
		datatype :"text",
		success : function(data) {
		if (data.length > 0) {
			return false;
		} else {
			return true;
		}
	},
	error : function() {
		alert("服务器没有返回数据，可能服务器忙，请重试");
	},
	onerror :"该游戏名不可用，请更换",
	onwait :"正在对挑战游戏名进行合法性校验，请稍候..."
	});
	$('#orderNum').formValidator( {
		onshow :"请输入1-999之间的数字",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"排序号不能为空",
		tipid :"orderNumTip"
	}).inputValidator( {
		max :"3",
		min :"1",
		empty :false,
		onerror :"排序号为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"你输入的必须是正整数"
	});
	$('#clickCount').formValidator( {
		onshow :"点击量决定了在游戏排行的位置",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"点击量决定了在游戏排行的位置",
		tipid :"clickCountTip"
	}).inputValidator( {
		max :"20",
		min :"0",
		empty :true,
		onerror :"点击量为空或长度不正确"
	}).regexValidator( {
		regexp :"num1",
		datatype :"enum",
		onerror :"你输入的必须是0或正整数"
	});
	$('#isRecommend').formValidator( {
		onshow :"请选择是否推荐游戏",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"是否推荐游戏不能为空",
		tipid :"isRecommendTip"
	}).inputValidator( {
		min :"0",
		empty :false,
		onerror :"为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#class').formValidator( {
		onshow :"请选择挑战游戏类别",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"挑战游戏类别不能为空",
		tipid :"classTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"挑战游戏类别为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#gameFile').formValidator( {
		onshow :"请选择 swf 类型的挑战游戏文件",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"挑战游戏文件不能为空",
		tipid :"gameFileTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		empty :false,
		onerror :"挑战游戏文件为空或长度不正确"
	}).functionValidator( {
		fun : function(val) {
		if (FileCheck(val, 2)) {
			return true;
		} else {
			return "文件类型不正确,请重新选择文件";
			
		}
	}
	});
	$('#smallIconFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"小图标不能为空",
		tipid :"smallIconFileTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"小图标为空或长度不正确"
	}).functionValidator( {
		fun : function(val) {
		if (FileCheck(val, 1)) {
			return true;
		} else {
			return "文件类型不正确,请重新选择文件";
			
		}
	}
	});
	$('#iconFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"大图标不能为空",
		tipid :"iconFileTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"大图标为空或长度不正确"
	}).functionValidator( {
		fun : function(val) {
		if (FileCheck(val, 1)) {
			return true;
		} else {
			return "文件类型不正确,请重新选择文件";
			
		}
	}
	});
	$('#bgImageFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"背景图片不能为空",
		tipid :"bgImageFileTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"背景图片为空或长度不正确"
	}).functionValidator( {
		fun : function(val) {
		if (FileCheck(val, 1)) {
			return true;
		} else {
			return "文件类型不正确,请重新选择文件";
			
		}
	}
	});
	$('#logoImageFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"Logo图片不能为空",
		tipid :"logoImageFileTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"Logo图片为空或长度不正确"
	}).functionValidator( {
		fun : function(val) {
		if (FileCheck(val, 1)) {
			return true;
		} else {
			return "文件类型不正确,请重新选择文件";
			
		}
	}
	});
	$('#adImgFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的广告文件, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想选择挑战游戏广告文件?",
		tipid :"adImgFileTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	}).functionValidator( {
		fun : function(val) {
		if (FileCheck(val, 1)) {
			return true;
		} else {
			return "文件类型不正确,请重新选择文件";
			
		}
	}
	});
	$('#adHref').formValidator( {
		onshow :"请输入挑战游戏广告链接, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入挑战游戏广告链接?",
		tipid :"adHrefTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
	$('#adTitle').formValidator( {
		onshow :"请输入挑战游戏广告标题, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入挑战游戏广告标题?",
		tipid :"adTitleTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
	$('#description').formValidator( {
		onshow :"请输入挑战游戏描述",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容?",
		tipid :"descriptionTip"
	}).inputValidator( {
		max :"500",
		onerror :"长度不正确"
	});
};

/**
 * 小游戏表单字段验证
 * 
 * @return
 */
function miniGameDynamicFormValidate() {
	var numEl = document.getElementById("numOfItems");
	var num = parseInt(numEl.value);
	$('#name' + num).formValidator( {
		onshow :"请输入小游戏名",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"小游戏名不能为空",
		tipid :"name" + num + "Tip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"小游戏名为空或长度不正确"
	}).ajaxValidator( {
		type :"post",
		url :"miniGame.do?prv=query&method=ajaxUnique&param=validateInsert",
		data :"num=" + num,
		datatype :"text",
		success : function(data) {
			if (data.length > 0) {
				return false;
			} else {
				return true;
			}
		},
		error : function() {
			alert("服务器没有返回数据，可能服务器忙，请重试");
		},
		onerror :"该游戏名不可用，请更换",
		onwait :"正在对小游戏名进行合法性校验，请稍候..."
	});
	$('#orderNum' + num).formValidator( {
		onshow :"请输入1-999之间的数字",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"排序号不能为空",
		tipid :"orderNum" + num + "Tip"
	}).inputValidator( {
		max :"3",
		min :"1",
		empty :false,
		onerror :"排序号为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"你输入的必须是正整数"
	});
	$('#class' + num).formValidator( {
		onshow :"请选择小游戏类别",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"小游戏类别不能为空",
		tipid :"class" + num + "Tip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"小游戏类别为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#gameFile' + num).formValidator( {
		onshow :"请选择 swf 类型的小游戏文件",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"小游戏文件不能为空",
		tipid :"gameFile" + num + "Tip"
	}).inputValidator( {
		max :"128",
		min :"1",
		empty :false,
		onerror :"小游戏文件为空或长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 2)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#smallIconFile' + num).formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"小图标不能为空",
		tipid :"smallIconFile" + num + "Tip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"小图标为空或长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#iconFile' + num).formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"大图标不能为空",
		tipid :"iconFile" + num + "Tip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"大图标为空或长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#pptImgFile' + num).formValidator( {
		empty :true,
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		onfocus :"你要是选择了, 必须输入正确",
		onempty :"你真的不想选择PPT图片文件?",
		tipid :"pptImgFile" + num + "Tip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#pptHref' + num).formValidator( {
		empty :true,
		onshow :"请输入PPT链接",
		oncorrect :"输入正确",
		onfocus :"你要是选择了, 必须输入正确",
		onempty :"你真的不想输入PPT链接地址?",
		tipid :"pptHref" + num + "Tip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
	$('#pptTitle' + num).formValidator( {
		onshow :"请输入PPT标题, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入PPT标题?",
		tipid :"pptTitle" + num + "Tip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
	$('#adImgFile' + num).formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的广告文件, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想选择小游戏广告文件?",
		tipid :"adImgFile" + num + "Tip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#adHref' + num).formValidator( {
		onshow :"请输入小游戏广告链接, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入小游戏广告链接?",
		tipid :"adHref" + num + "Tip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
	$('#adTitle' + num).formValidator( {
		onshow :"请输入小游戏广告标题, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入小游戏广告标题?",
		tipid :"adTitle" + num + "Tip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
	$('#area' + num).formValidator( {
		onshow :"请选择广告区域, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想选择广告区域?",
		tipid :"area" + num + "Tip"
	}).inputValidator( {
		min :"1",
		onerror :"长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#description' + num).formValidator( {
		onshow :"请输入小游戏描述",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了，必须输入正确",
		onempty :"你真的不想输入内容？",
		tipid :"description" + num + "Tip"
	}).inputValidator( {
		max :"500",
		onerror :"长度不正确"
	});
};

/**
 * 小游戏类别表单字段验证
 * 
 * @return
 */
function miniGameClsFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#name').formValidator( {
		onshow :"请输入小游戏类别名",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"小游戏类别名不能为空",
		tipid :"nameTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"小游戏类别名为空或长度不正确"
	});
	$('#orderNum').formValidator( {
		onshow :"请输入1-999之间的数字",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"排序号不能为空",
		tipid :"orderNumTip"
	}).inputValidator( {
		max :"3",
		min :"1",
		empty :false,
		onerror :"排序号为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"你输入的必须是正整数"
	});
	$('#parent').formValidator( {
		onshow :"请选择小游戏父类别, 第一级类别可以不选",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是选择了, 必须选择正确",
		onempty :"你真的不想选择父类别",
		tipid :"parentTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"小游戏父类别为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#iconFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"图标文件不能为空",
		tipid :"iconFileTip"
	}).inputValidator( {
		max :"256",
		min :"1",
		empty :false,
		onerror :"图标文件文件为空或长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#remark').formValidator( {
		onshow :"请输入备注",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		tipid :"remarkTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		empty :false,
		onerror :"图标文件为空或长度不正确"
	});
	$('#pageFile').formValidator( {
		onshow :"请输入分页文件名",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"分页文件名不能为空",
		tipid :"pageFileTip"
	}).inputValidator( {
		max :"16",
		min :"1",
		empty :false,
		onerror :"分页文件名为空或长度不正确"
	});
	$('#listTmp').formValidator( {
		empty :false,
		onshow :"请选择列表模板",
		oncorrect :"输入正确",
		onfocus :"列表模板不能为空",
		tipid :"listTmpTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"列表模板为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#template').formValidator( {
		onshow :"请选择内容模板",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"模板内容不能为空",
		tipid :"templateTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"模板内容为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
};

/**
 * 新闻类别表单字段验证
 * 
 * @return
 */
function newsClsFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#name').formValidator( {
		onshow :"请输入新闻类别名",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"新闻类别名不能为空",
		tipid :"nameTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"新闻类别名为空或长度不正确"
	});
	$('#iconFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"分类图标可以为空",
		onempty :"你不想输入图标了?",
		tipid :"iconFileTip"
	}).inputValidator( {
		max :"256",
		min :"1",
		onerror :"长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";
			}
		}
	});
	$('#pageFile').formValidator( {
		onshow :"请输入分页文件名",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"分页文件名不能为空",
		tipid :"pageFileTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"分页文件名为空或长度不正确"
	});
	$('#mark').formValidator( {
		onshow :"请选择区域标记",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"区域标记不能为空",
		tipid :"markTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"区域标记为空或长度不正确"
	}).regexValidator( {
		regexp :"numberandchar",
		datatype :"enum",
		onerror :"只能输入字母和数字，以字母开头"
	}).ajaxValidator( {
		type :"get",
		url :"newsClass.do",
		data :"prv=query&method=ajaxUnique&param=validateInsert",
		datatype :"text",
		success : function(data) {
			if (data.length > 0) {
				return false;
			} else {
				return true;
			}
		},
		error : function() {
			alert("服务器没有返回数据，可能服务器忙，请重试");
		},
		onerror :"该区域标记不可用，请更换区域标记",
		onwait :"正在对区域标记进行合法性校验，请稍候..."
	});
	$('#listTmp').formValidator( {
		empty :false,
		onshow :"请选择列表模板",
		oncorrect :"输入正确",
		onfocus :"列表模板不能为空",
		tipid :"listTmpTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"列表模板为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#template').formValidator( {
		onshow :"请选择内容模板",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"模板内容不能为空",
		tipid :"templateTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"模板内容为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#mapValue').formValidator( {
		onshow :"请输入分类标识, 多个以'|'隔开",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入映射分类标识?",
		tipid :"mapValueTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		onerror :"长度不正确"
	});
};

/**
 * 新闻表单字段验证
 * 
 * @return
 */
function newsFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#name').formValidator( {
		onshow :"请输入新闻标题",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"新闻标题名不能为空",
		tipid :"nameTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"新闻标题名为空或长度不正确"
	});
	$('#longTitle').formValidator( {
		onshow :"请输入新闻长标题",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"新闻长标题不能为空",
		tipid :"longTitleTip"
	}).inputValidator( {
		max :"200",
		min :"1",
		empty :false,
		onerror :"新闻长标题为空或长度不正确"
	});
	$('#keyword').formValidator( {
		onshow :"请输入新闻关键字",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"关键字可以不输入",
		onempty :"你不想输入关键字了?",
		tipid :"keywordTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
	$('#seoDesc').formValidator( {
		onshow :"请输入seo描述",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"seo描述可以不输入",
		onempty :"你不想输入描述了?",
		tipid :"seoDescTip"
	}).inputValidator( {
		max :"500",
		min :"1",
		onerror :"长度不正确"
	});
	$('#orderNum').formValidator( {
		onshow :"请输入1-999之间的数字",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"排序号不能为空",
		tipid :"orderNumTip"
	}).inputValidator( {
		max :"3",
		min :"1",
		empty :false,
		onerror :"排序号为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"你输入的必须是正整数"
	});
	$("#newsTime").formValidator( {
		onshow :"请输入新闻编辑时间",
		oncorrect :"你输入的日期合法",
		empty :false,
		onfocus :"请输入新闻编辑时间，不能全部是0哦",
		tipid :"newsTimeTip"
	});
	$('#class').formValidator( {
		onshow :"请选择新闻分类",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"新闻分类不能为空",
		tipid :"classTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"新闻分类为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#isHot').formValidator( {
		onshow :"请选择是否置顶",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"不能为空",
		tipid :"isHotTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"置顶不能为空"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#source').formValidator( {
		onshow :"请输入新闻来源",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"新闻来源不能为空",
		tipid :"sourceTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"新闻来源为空或长度不正确"
	});
	$('#isNewsUrl').formValidator( {
		onshow :"请选择是否使用链接",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"不能为空",
		tipid :"isNewsUrlTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"不能为空"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#editor').formValidator( {
		onshow :"请输入编辑人",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"编辑人可以不输入",
		onempty :"你不想输入编辑人了?",
		tipid :"editorTip"
	}).inputValidator( {
		max :"16",
		min :"1",
		onerror :"长度不正确"
	});
	$('#iconFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"新闻图标可以为空",
		onempty :"你不想输入图标文件了?",
		tipid :"iconFileTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		onerror :"长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#iconFile2').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"新闻图标可以为空",
		onempty :"你不想输入图标文件了?",
		tipid :"iconFile2Tip"
	}).inputValidator( {
		max :"128",
		min :"1",
		onerror :"长度不正确"
	}).functionValidator( {
		fun : function(val) {
		if (FileCheck(val, 1)) {
			return true;
		} else {
			return "文件类型不正确,请重新选择文件";
			
		}
	}
	});
	$('#iconFile3').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"新闻图标可以为空",
		onempty :"你不想输入图标文件了?",
		tipid :"iconFile3Tip"
	}).inputValidator( {
		max :"128",
		min :"1",
		onerror :"长度不正确"
	}).functionValidator( {
		fun : function(val) {
		if (FileCheck(val, 1)) {
			return true;
		} else {
			return "文件类型不正确,请重新选择文件";
			
		}
	}
	});
	$('#iconFile4').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"新闻图标可以为空",
		onempty :"你不想输入图标文件了?",
		tipid :"iconFile4Tip"
	}).inputValidator( {
		max :"128",
		min :"1",
		onerror :"长度不正确"
	}).functionValidator( {
		fun : function(val) {
		if (FileCheck(val, 1)) {
			return true;
		} else {
			return "文件类型不正确,请重新选择文件";
			
		}
	}
	});
	$('#bigIconFile').formValidator( {
		onshow :"请选择 jpg|jpeg|png|bmp|gif 类型的文件",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"新闻图标可以为空",
		onempty :"你不想输入图标文件了?",
		tipid :"bigIconFileTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		onerror :"长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 1)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";
				
			}
		}
	});
	$('#iconTitle').formValidator( {
		onshow :"请输入图标标题",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"图标标题可以不输入",
		onempty :"你不想输入图标标题了?",
		tipid :"iconTitleTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
	$('#shortContent').formValidator( {
		onshow :"请输入内容简介",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"内容简介不能为空",
		tipid :"shortContentTip"
	}).inputValidator( {
		max :"300",
		min :"1",
		empty :false,
		onerror :"内容简介为空或长度不正确"
	});
};

/**
 * 验证新闻链接
 * 
 * @return
 */
function isNewsUrlValidate() {
	$('#newsUrl').formValidator( {
		onshow :"请输入新闻链接",
		oncorrect :"输入正确",
		tipid :"newsUrlTip"
	}).functionValidator( {
		fun : function() {
			param = $('#isNewsUrl').val();
			if (param == '1') {
				$('#newsUrl').formValidator( {
					onshow :"请输入新闻链接",
					oncorrect :"输入正确",
					empty :false,
					onfocus :"新闻链接不可以为空",
					tipid :"newsUrlTip"
				}).inputValidator( {
					max :"128",
					min :"1",
					empty :false,
					onerror :"新闻链接为空或长度不正确"
				});
			} else {
				$('#newsUrl').formValidator( {
					onshow :"请输入新闻链接",
					oncorrect :"输入正确",
					empty :true,
					onfocus :"新闻链接可以为空",
					onempty :"你选择了不使用链接",
					tipid :"newsUrlTip"
				}).inputValidator( {
					max :"128",
					min :"1",
					onerror :"新闻链接长度不正确"
				});
			}
		}
	});
};

/**
 * 模板表单字段验证
 * 
 * @return
 */
function tmpFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
			alert(msg)
		},
		onsuccess : function() {
			return true;
		}
	});
	$('#name').formValidator( {
		onshow :"请输入模板名",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"模板名不能为空",
		tipid :"nameTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"模板名为空或长度不正确"
	});
	$('#tmpFile').formValidator( {
		onshow :"请选择 ftl|zip 类型的文件",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"模板文件不能为空",
		tipid :"tmpFileTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"模板文件为空或长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 3)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
	$('#type').formValidator( {
		onshow :"请选择类型",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"类型不能为空",
		tipid :"typeTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"类型不能为空"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#isPaging').formValidator( {
		onshow :"请选择是否分页",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"不能为空",
		tipid :"isPagingTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"不能为空"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#maxRows').formValidator( {
		onshow :"请输入最大行数",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"行数不能为空",
		tipid :"maxRowsTip"
	}).inputValidator( {
		max :"2",
		min :"1",
		empty :false,
		onerror :"最大行数为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"你输入的必须是正整数"
	});
	$('#listValue').formValidator( {
		onshow :"请输入分类标识, 多个以'|'隔开",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入综合分类标识?",
		tipid :"listValueTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		onerror :"长度不正确"
	});
	$('#remark').formValidator( {
		onshow :"请输入备注, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入备注?",
		tipid :"remarkTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		onerror :"长度不正确"
	});
};

/**
 * 投票问卷表单字段验证
 * 
 * @return
 */
function voteFormFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
		alert(msg)
	},
	onsuccess : function() {
		return true;
	}
	});
	$('#name').formValidator( {
		onshow :"请输入主题",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"主题不能为空",
		tipid :"nameTip"
	}).inputValidator( {
		max :"200",
		min :"1",
		empty :false,
		onerror :"主题为空或长度不正确"
	});
	$('#mark').formValidator( {
		onshow :"请选择区域标记",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"区域标记不能为空",
		tipid :"areaTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"区域标记为空或长度不正确"
	});
};

/**
 * 投票表单字段验证
 * 
 * @return
 */
function voteFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
		alert(msg)
	},
	onsuccess : function() {
		return true;
	}
	});
	$('#name').formValidator( {
		onshow :"请输入主题",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"主题不能为空",
		tipid :"nameTip"
	}).inputValidator( {
		max :"200",
		min :"1",
		empty :false,
		onerror :"主题为空或长度不正确"
	});
	$('#mark').formValidator( {
		onshow :"请选择区域标记",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"区域标记不能为空",
		tipid :"markTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"区域标记为空或长度不正确"
	});
	$('#orderNum').formValidator( {
		onshow :"请输入1-999之间的数字",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"排序号不能为空",
		tipid :"orderNumTip"
	}).inputValidator( {
		max :"3",
		min :"1",
		empty :false,
		onerror :"排序号为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"你输入的必须是正整数"
	});
};

/**
 * 投票表单字段验证
 * 
 * @return
 */
function voteOptionFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
		alert(msg)
	},
	onsuccess : function() {
		return true;
	}
	});
	$('#name').formValidator( {
		onshow :"请输入选项",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"选项不能为空",
		tipid :"nameTip"
	}).inputValidator( {
		max :"100",
		min :"1",
		empty :false,
		onerror :"主题为空或长度不正确"
	});
	$('#orderNum').formValidator( {
		onshow :"请输入1-999之间的数字",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"排序号不能为空",
		tipid :"orderNumTip"
	}).inputValidator( {
		max :"3",
		min :"1",
		empty :false,
		onerror :"排序号为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"你输入的必须是正整数"
	});
	$('#vote').formValidator( {
		onshow :"请选择投票主题",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"投票主题不能为空",
		tipid :"voteTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"投票主题为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
};

/**
 * 站点表单字段验证
 * 
 * @return
 */
function siteFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
		alert(msg)
	},
	onsuccess : function() {
		return true;
	}
	});
	$('#name').formValidator( {
		onshow :"请输入选项",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"名称不能为空",
		tipid :"nameTip"
	}).inputValidator( {
		max :"32",
		min :"1",
		empty :false,
		onerror :"名称为空或长度不正确"
	});
	$('#value').formValidator( {
		onshow :"请输入参数标识, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入参数标识?",
		tipid :"valueTip"
	}).inputValidator( {
		max :"10",
		min :"1",
		onerror :"长度不正确"
	});
	$('#fileDir').formValidator( {
		onshow :"请输入文件目录, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入文件目录?",
		tipid :"fileDirTip"
	}).inputValidator( {
		max :"16",
		min :"1",
		onerror :"长度不正确"
	});
	$('#indexFileName').formValidator( {
		onshow :"请输入文件名称",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"文件名不能为空",
		tipid :"indexFileNameTip"
	}).inputValidator( {
		max :"12",
		min :"1",
		empty :false,
		onerror :"文件名为空或长度不正确"
	});
	$('#indexTmpFile').formValidator( {
		onshow :"请选择 ftl 类型的文件",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"模板文件不能为空",
		tipid :"indexTmpFileTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		empty :false,
		onerror :"模板文件为空或长度不正确"
	}).functionValidator( {
		fun : function(val) {
			if (FileCheck(val, 3)) {
				return true;
			} else {
				return "文件类型不正确,请重新选择文件";

			}
		}
	});
};

/**
 * 排行表单字段验证
 * 
 * @return
 */
function rankingFormValidate() {
	$.formValidator.initConfig( {
		formid :"form1",
		onerror : function(msg) {
		alert(msg)
	},
	onsuccess : function() {
		return true;
	}
	});
	$('#rankType').formValidator( {
		onshow :"请选择类型",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"类型不能为空",
		tipid :"rankTypeTip"
	}).inputValidator( {
		min :"1",
		empty :false,
		onerror :"类型为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"无效字符"
	});
	$('#serverNum').formValidator( {
		onshow :"请输入1-999之间的数字",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"服务器不能为空",
		tipid :"serverNumTip"
	}).inputValidator( {
		max :"3",
		min :"1",
		empty :false,
		onerror :"服务器为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"你输入的必须是正整数"
	});
	$('#orderNum').formValidator( {
		onshow :"请输入1-999之间的数字",
		oncorrect :"输入正确",
		empty :false,
		onfocus :"排名不能为空",
		tipid :"orderNumTip"
	}).inputValidator( {
		max :"3",
		min :"1",
		empty :false,
		onerror :"排名为空或长度不正确"
	}).regexValidator( {
		regexp :"intege1",
		datatype :"enum",
		onerror :"你输入的必须是正整数"
	});
	$('#role').formValidator( {
		onshow :"请输入角色, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入角色?",
		tipid :"roleTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
	$('#sect').formValidator( {
		onshow :"请输入派系, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入派系?",
		tipid :"sectTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
	$('#post').formValidator( {
		onshow :"请输入职位, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入职位?",
		tipid :"postTip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
	$('#rankValue').formValidator( {
		onshow :"请输入排行值, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入排行值?",
		tipid :"rankValueTip"
	}).inputValidator( {
		max :"128",
		min :"1",
		onerror :"长度不正确"
	});
	$('#other1').formValidator( {
		onshow :"请输入值, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入值?",
		tipid :"other1Tip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
	$('#other2').formValidator( {
		onshow :"请输入值, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入值?",
		tipid :"other2Tip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
	$('#other3').formValidator( {
		onshow :"请输入值, 可以为空",
		oncorrect :"输入正确",
		empty :true,
		onfocus :"你要是输入了, 必须输入正确",
		onempty :"你真的不想输入值?",
		tipid :"other3Tip"
	}).inputValidator( {
		max :"64",
		min :"1",
		onerror :"长度不正确"
	});
};

/**
 * typeMode 1 表示验证图片,2 表示验证Flash,3表示验证模板文件
 * 
 * @param fileName
 * @param typeMode
 * @return
 */
function FileCheck(fileName, typeMode) {
	var enumAllowImage = "jpg,jpeg,png,bmp,gif";
	var enumAllowFlash = "swf";
	var enumAllowTmp = "ftl,zip";
	var strExt = fileName.substr(fileName.lastIndexOf(".") + 1).toLowerCase();
	if (typeMode == 1) {
		// 白名单模式
		var arrExt = enumAllowImage.split(",");
		var intErr = 1;
		for ( var i = 0; i < arrExt.length; i++) {
			if (strExt == arrExt[i]) {
				intErr = 0;
			}
		}
		if (intErr == 1) {
			return false
		}
		return true;
	}
	if (typeMode == 2) {
		// 白名单模式
		var arrExt = enumAllowFlash.split(",");
		var intErr = 1;
		for ( var i = 0; i < arrExt.length; i++) {
			if (strExt == arrExt[i]) {
				intErr = 0;
			}
		}
		if (intErr == 1) {
			return false
		}
		return true;
	}
	if (typeMode == 3) {
		// 白名单模式
		var arrExt = enumAllowTmp.split(",");
		var intErr = 1;
		for ( var i = 0; i < arrExt.length; i++) {
			if (strExt == arrExt[i]) {
				intErr = 0;
			}
		}
		if (intErr == 1) {
			return false
		}
		return true;
	}
}
