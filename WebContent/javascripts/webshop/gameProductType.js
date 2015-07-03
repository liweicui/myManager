/**
 * 游戏道具类型JS对象 caojian
 */
var Type = {
	
	//验证方法
	validate : function()
	{
		var productTypeName = $('#productTypeName').val();
		
		if($.trim(productTypeName) == '')
		{
			alert('类型名字不能为空');
			$('#productTypeName').focus();
			return false;
		}
		if(Type.checkLength(productTypeName) > 30)
		{
			alert('类型名字不能大于20个字节');
			$('#productTypeName').select();
			return false;
		}
		
		return true;
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
			window.location.href = root+"/game/type.do?method=delType&prv=delete&typeId="+id;
		}
	},
	//修改
	update : function(id,productTypeName,root)
	{
		window.location.href = root+"/game/type.do?method=goUpdate&prv=query&typeId="+id+"&productTypeName="+encodeURI(encodeURI(productTypeName));
	}
};