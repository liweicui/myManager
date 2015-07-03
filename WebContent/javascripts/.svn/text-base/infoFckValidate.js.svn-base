/**
 * fck内容验证器
 * 
 * @returns
 */
function fckValidate() {

	var oEditor = FCKeditorAPI.GetInstance('content');
	var msg = oEditor.GetXHTML(true);
	if (msg.length >= 100000) {
		alert('内容太多了，输入框中不能超过十万个文字，请精简一些内容!');
		return false;
	} else if (!validateUnique(1)) {
		return false;
	} else if (!isTimeExists()) {
		alert('请输入正确的新闻时间');
		return false;
	} else {
		// 继续验证唯一性
		return validateUnique(1);
	}
}

/**
 * 验证是否输入正确的新闻时间
 * @returns {Boolean}
 */
function isTimeExists() {
	var str = $('#newsTime').val();
	if (str.length > 0) {
		$('#newsTimeTip').html('时间输入正确');
		return true;
	} else {
		// $('#newsTimeTip').html('时间不能为空哦');
		return false;
	}
};