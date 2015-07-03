var act = {};

/**
 * 填充活动下拉框
 * target：绑定的目标对象
 * value: 默认值，无则不填
 */
act.fillSelect = function(target, value){
	$.ajax({
		dataType:"json",
		url:"actinfo.do?method=ajaxGetActList&prv=query",
		success:function(response){
			var optionHtml = '';
			for(var i in response){
				var data = response[i];
				optionHtml += '<option value="' + data.ACTID + '">' + data.ACTNAME + '</option>'
			}
			
			$(target).append(optionHtml);
			$(target).val(value);
		}
	});
}