/**
 * 商品JS对象 caojian
 */
var Goods = {
		
	//游戏道具对象集合	
	goodsProducts : [],
	//验证方法
	validate : function(isUpdate)
	{
		
		var goodsName = $('#goodsName').val();		
		var goodsText = $('#goodsText').val();
		var goodsOriginPrice = $('#goodsOriginPrice').val();
		var goodsCurrentPrice = $('#goodsCurrentPrice').val();
		var goodsRebate = $('#goodsRebate').val();
		var goodsState = $('#goodsState').val();
		var goodsStock = $('#goodsStock').val();
		

		//商品名字
		if($.trim(goodsName) == '')
		{
			alert('商品名字不能为空');
			$('#goodsName').focus();
			return false;
		}
		if(Goods.checkLength(goodsName) > 30)
		{
			alert('商品名字不能大于30个字节');
			$('#goodsName').select();
			return false;
		}
		//商品现价
		if($.trim(goodsOriginPrice) == '')
		{
			alert('商品原价不能为空');
			$('#goodsOriginPrice').focus();
			return false;
		}
		if(isNaN(goodsOriginPrice) || goodsOriginPrice <= 0)
		{
			alert('商品原价必须是大于0的数字');
			$('#goodsOriginPrice').select();
			return false;
		}
	
		//商品现价
		if($.trim(goodsCurrentPrice) == '')
		{
			alert('商品现价不能为空');
			$('#goodsCurrentPrice').focus();
			return false;
		}
		if(isNaN(goodsCurrentPrice) || goodsCurrentPrice <= 0)
		{
			alert('商品现价必须是大于0的数字');
			$('#goodsCurrentPrice').select();
			return false;
		}
		
		//商品折扣
		if($.trim(goodsRebate) == '')
		{
			alert('商品折扣不能为空');
			$('#goodsRebate').focus();
			return false;
		}
		
		var packageNo = $('#packageNo').val();
		if(isNaN(packageNo) || packageNo <=0 )
		{
			alert('包编号必须是大于0的数字');
			$('#packageNo').select();
			return false;
		}
		
		var sortNumber = $('#sortNumber').val();
		if(isNaN(sortNumber) || sortNumber < 0 )
		{
			alert('排序值必须是大于等于0的数字');
			$('#sortNumber').select();
			return false;
		}
		
		var buyLimit = $('#buyLimit').val();
		if(isNaN(buyLimit) || buyLimit < 0 )
		{
			alert('购买上限必须是大于等于0的数字');
			$('#buyLimit').select();
			return false;
		}
		
		//商品库存
		if($.trim(goodsStock) == '')
		{
			alert('商品库存不能为空');
			$('#goodsStock').focus();
			return false;
		}
		if(isNaN(goodsStock))
		{
			alert('商品库存必须是数字');
			$('#goodsStock').select();
			return false;
		}
		
		if(isNaN(goodsStock))
		{
			alert('商品库存必须是数字');
			$('#goodsStock').select();
			return false;
		}

	
		//所属菜单判断
		var menuIdArr = [];
		$("input[name=goods_menus]").each(function(o){
			if($(this).attr('checked'))menuIdArr.push($(this).val());
		});
		if(menuIdArr.length == 0){alert("请选择产品所属菜单");return false;}
		$('#goodsMenus').val(menuIdArr.join(','));
		
		
		//游戏道具
		if($.trim($('#goodsProducts').val()) == ''){
			alert("请配置游戏道具");
			return false;
		}
		
		
		//商品说明
		if($.trim(goodsText) == '')
		{
			alert('请输入商品描述');
			$('#goodsText').focus();
			return false;
		}
		
		//商品说明
		if(Goods.checkLength(goodsText) > 200)
		{
			alert('商品描述长度不能大于200个字符。');
			$('#goodsText').focus();
			return false;
		}
		
		
		//如果不是修改要提示选择图片
		if(!isUpdate)
		{
			if($.trim($('#goodsImage').val()) == ''){
				alert('请选择商品图片');
				return false;
			}
		}
		
		$('#goodsOriginPrice').val(parseInt($('#goodsOriginPrice').val()));
		$('#goodsCurrentPrice').val(parseInt($('#goodsCurrentPrice').val()));
		$('#goodsRebate').val(parseInt($('#goodsRebate').val()));
		$('#goodsStock').val(parseInt($('#goodsStock').val()));
	
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
	//检查商品描述的长度
    checkGoodsTextLength : function(o){
    	var v = o.value;
    	if(Goods.checkLength(v) > 200){
    		$(o).val(v.substring(0,200));
    	}
    },
	//删除
	del : function(id,root)
	{
		if(window.confirm('确认删除吗？'))
		{
			window.location.href = root+"/game/goods.do?method=delGoods&prv=delete&goodsId="+id;
		}
	},
	//克隆
	clone : function(id,root,state)
	{

		if(window.confirm('确定克隆该商品吗？'))
		{
			window.location.href = root+"/game/goods.do?method=goClone&prv=query&goodsId="+id;
		}
			
	},
	
	//修改
	update : function(id,root,state)
	{
		if(state == '1')
		{
			alert('已经上架的商品不能进行修改，请点击下架后再进行修改。');
			return;
		}
		
		window.location.href = root+"/game/goods.do?method=goUpdate&prv=query&goodsId="+id;
	},
	
	//预览
	preview : function(id,root)
	{	
		window.location.href = root+"/game/goods.do?method=preview&prv=query&goodsId="+id;
	},
	//按道具类型查询道具
	queryGameProductByType : function(root,typeId)
	{
		 $("#productGameDiv").html("数据加载中...").load(root+'/game/product.do?method=queryGameProductByType&prv=query',{typeId : typeId},
				 function()
				 {
					var len = Goods.goodsProducts.length;
					for(var i=0; i<len; i++)
					{
						var product = $('#product_'+Goods.goodsProducts[i].id);
						if(product)
			 			{
							product.attr('checked',true) ;
			 			}
					}
				 }
		 );
	},
	//设置道具
	setGameProduct : function(o,name)
	{
		//构造一个游戏道具对象
		var product = new Product(o.value,name);
		
		var index = -1;
		var len = Goods.goodsProducts.length;
		for(var i=0; i<len; i++)
		{
			if(Goods.goodsProducts[i].id == product.id){
				index = i;
				break;
			}
		}
		
		//如果是选择的状态就要累加
		if(o.checked)
		{	
			//如果是-1就是没有包含
			if(index == -1)
			{
				Goods.goodsProducts.push(product);	
			}
		}
		else
		{
			//不勾选就要清除掉选择的道具名字 和 ID
			if(index > -1)
			{
				Goods.goodsProducts = Goods.goodsProducts.del(index);
			}			
		}
		
		//显示选择的道具
		Goods.showProducts();
	},
	//显示选择的道具
	showProducts : function(){
		
		var productIds = [];
		var productNames = [];
		var len = Goods.goodsProducts.length;
		for(var i=0; i<len; i++)
		{
			productIds.push(Goods.goodsProducts[i].id);
			productNames.push(Goods.goodsProducts[i].name);
		}
		$('#gameProductNames').html(productNames.join(','));
		$('#goodsProducts').val(productIds.join(','));
		
	},
	//切换商品状态
	changeState : function(root,goodsId,goodsSate,goodsName,stateName)
	{
		var sjts = "切换成‘上架’后web商城前台玩家就可以购买该商品，所以请检测商品信息是否达到了上架的条件。";
		var xjts = "切换成‘下架’后web商城前台玩家就不能购买该商品了。";
		
		if(window.confirm('确定将商品【'+goodsName+'】切换状态为【'+stateName+'】吗？\n注：'+(goodsSate == '1' ? sjts : xjts))){
		
			window.location.href = root+"/game/goods.do?method=changeState&prv=query&goodsId="+goodsId+"&goodsState="+goodsSate;
		}
			
	},
	//重置
	reset : function()
	{
		$('#menuId').val('');
		$('#goodsName').val('');
		$('#goodsState').val('');
		$('#goodsCurrentPrice').val('');
		$('#goodsOriginPrice').val('');
		$('#goodsRebate').val('');
	},
	
	//检测商品名称是否存在
	checkName : function(root,o,goodsId)
	{
		if($.trim(o.value) == '')return;
		
		$('#goodsName_div').load(root+'/game/goods.do?method=queryGoodsByName&prv=query',{goodsName : $.trim(o.value),goodsId : goodsId},function(msg){

				if(msg != '0'){
					
					$(this).html("<span style='color:red'>商品名字已经存在</span>");
					o.value='';
					o.focus();
				}
				else{
					$(this).html('');
				}
		});
	}
	//修改之前检测商品状态，和是否有消费记录
//	checkGoods : function(root,goodsId,b){
//		$.get(root+'/game/goods.do?method=queryGoodsById&prv=query',{goodsId : goodsId},
//			function(goodDto)
//			{
//				if(goodDto)
//				{
//					goodDto = eval('('+goodDto+')');				
//					if(goodDto.state == 1){
//						alert("当前修改的商品状态为"+goodDto.goodsState_view+"不能进行本次修改，请刷新页面后重新修改");
//						return;
//					}
//					if(goodDto.consumeCounts > 0){
//						alert("当前修改的商品已经产生了消费记录不能进行本次修改，请刷新页面后重新修改");
//						return;
//					}
//					if(Goods.validate(b))
//					{
//						$('#goodsForm').submit();
//					}
//				}else{
//					alert('系统出现异常，请联系管理员');
//				}
//		});
//	}
};


//数组的删除方法
Array.prototype.del = function(n){   //n表示第几项，从0开始算起。
	
	//prototype为对象原型，注意这里为对象增加自定义方法的方法。
	  if(n<0){ //如果n<0，则不进行任何操作。
		  return this;
	  } 
	  else{
		  /**//*
	       concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
	       　　　　　　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
	      　　　　　　组成的新数组，这中间，刚好少了第n项。
	       slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
	    */
		  var arr1 = this.slice(0,n);
		  var arr2 = this.slice(n+1,this.length);
		  return arr1.concat(arr2);
	  }
	  
	    
}



//游戏道具对象
function Product(id,name){
	this.id = id;
	this.name = name;
	this.tostring = function(){
		return this.name;
	}
}








