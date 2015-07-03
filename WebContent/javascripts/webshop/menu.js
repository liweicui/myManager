/**
 * 菜单JS对象 caojian
 */
var Menu = {
	
	//验证方法
	validate : function()
	{
		var level = $('#menuLevel').val();
		var parentId = $('#parentId').val();
		var menuName = $('#menuName').val();
		if(level == -1)
		{
			alert('请选择菜单级别');
			$('#menuLevel').focus();
			return false;
		}
		if(parentId == '0')
		{
			alert('请选择上级菜单');
			$('#parentId').focus();
			return false;
		}
		if($.trim(menuName) == '')
		{
			alert('菜单名字不能为空');
			$('#menuName').focus();
			return false;
		}
		if(Menu.checkLength(menuName) > 20)
		{
			alert('菜单名字不能大于20个字节');
			$('#menuName').select();
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

	//菜单级别选择后事件
	levelChange : function(o)
	{
		var level =$(o).val();
		if(level == '1')$('#parentId').val("1");
		else $('#parentId').val("0");
	},
	//上级菜单选择
	parentMenuChange : function(o){
		
		if($(o).val() == '1'){	
			if($('#menuLevel').val() != '1')$(o).val("0");
		}else{
			if($('#menuLevel').val() != '2')$(o).val("0");
		}
	},
	//删除
	del : function(id,root)
	{
		if(window.confirm('确认删除吗？'))
		{
			window.location.href = root+"/game/menu.do?method=delMenu&prv=delete&menuId="+id;
		}
	},
	//修改
	update : function(id,root)
	{
		window.location.href = root+"/game/menu.do?method=goUpdate&prv=delete&menuId="+id;
	},
	//重置
	reset : function()
	{
		$('#menuName').val('');
		$('#menuStatus').val('');
		$('#parentId').val('');
	}

};