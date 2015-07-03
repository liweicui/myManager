/**
 * 游戏道具JS对象 caojian
 */
var GameProduct = {
	
	//验证方法
	validate : function()
	{

		var productName = $('#productName').val();
		var productCode = $('#productCode').val();
		var productText = $('#productText').val();
		var productLimit = $('#productLimit').val();
		var productTypeId = $('#productTypeId').val();
	
		//道具名字
		if($.trim(productName) == '')
		{
			alert('道具名字不能为空');
			$('#productName').focus();
			return false;
		}
		if(GameProduct.checkLength(productName) > 30)
		{
			alert('道具名字不能大于30个字节');
			$('#productName').select();
			return false;
		}
		//道具代码
		if($.trim(productCode) == '')
		{
			alert('道具代码不能为空');
			$('#productCode').focus();
			return false;
		}
		
		//道具数量
		if($.trim(productLimit) == '')
		{
			alert('道具数量不能为空');
			$('#productLimit').focus();
			return false;
		}
		if(isNaN(productLimit) || productLimit <= 0)
		{
			alert('道具数量必须是大于0的数字');
			$('#productLimit').focus();
			return false;
		}
		
		//道具描述
		if($.trim(productText) == '')
		{
			alert('道具描述不能为空');
			$('#productText').focus();
			return false;
		}
		//商品说明
		if(GameProduct.checkLength(productText) > 200)
		{
			alert('道具描述长度不能大于200个字符');
			$('#productText').focus();
			return false;
		}
		
		//所属类别
		if($.trim(productTypeId) == '')
		{
			alert('请选择所属类型');
			$('#productTypeId').focus();
			return false;
		}
		$('#productLimit').val(parseInt($('#productLimit').val()));
		$('#productName').val(GameProduct.rep(productName));
		
		return true;
	},
	//递归替换逗号
	rep : function(s){
		
		s = s.replace(",","");
		if(s.indexOf(',') == -1){
			return s;
		}
		return GameProduct.rep(s);
	},
	//检测菜单长度
	checkLength : function (s)
	{
		var k=0;
		for(var i=0; i<s.length; i++)
		{
			k += (s.charCodeAt(i) > 255) ? 2 : 1;
		}
		return k;
	},

	//删除
	del : function(id,root)
	{
		if(window.confirm('确认删除吗？'))
		{
			window.location.href = root+"/game/product.do?method=delGameProduct&prv=delete&productId="+id;
		}
	},
	//修改
	update : function(id,root)
	{
		window.location.href = root+"/game/product.do?method=goUpdate&prv=update&productId="+id;
	},
	//重置
	reset : function()
	{
		$('#productTypeId').val('');
		$('#productName').val('');
		$('#productCode').val('');
		$('#productLimit').val('');
		$('#productText').val('');
	},
	//检测道具ID是否存在
	checkCode : function(root,o,id){
		
		if(o.value.replace(/ /g,'') == '')return;
		
		//如果ID不是数字就要重新输入
		if(isNaN(o.value)){o.value='';return;};
		
		$('#productCode_div').load(root+'/game/product.do?method=checkCode&prv=query',{productCode : o.value, productId : id},function(msg){
				
				if(msg != 'true'){
					
					$(this).html("<span style='color:red'>道具代码已经存在</span>");
					o.select();
					o.focus();
				}
				else{
					$(this).html('');
				}
		});
	}
};