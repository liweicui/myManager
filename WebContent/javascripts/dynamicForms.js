/**
 * 初始化表单数
 */
function initNum() {
	document.getElementById("numOfItems").value = 1;
};

/**
 * 增加一套小游戏表单域，id和name均递增
 */
function addMgItems() {
	var numEl = document.getElementById("numOfItems");
	var num = parseInt(numEl.value);
	if(num>=4){
		alert('请先提交数据，再继续新增！');
		return;
	}
	num = num + 1;

	var div = document.getElementById("dTable");
	var table = document.createElement("table");
	table.className = "table_style dt";
	table.cellPadding = "3";
	table.cellSpacing = "1";
	table.align = "center";
	div.appendChild(table);

	// var row = document.createElement("tr");
	var row = table.insertRow(-1);
	var cell = createCellWithText(row, "名字");
	cell.className = "left_title_1";
	var input = createInput("name" + num, "text");
	//input.onblur = function() {
		// validateUnique验证实现只使用name
		// 临时改变name
		//this.name = "name";
		//validateMiniUnique(this);
		//this.name = "name" + num;
	//};
	cell = createCell(row);
	cell.appendChild(input);
	cell = createCellWithDiv(row, "name" + num + "Tip");
	cell.className = "text_tip";
	// table.appendChild(row);

	// var row = document.createElement("tr");
	var row = table.insertRow(-1);
	var cell = createCellWithText(row, "排序");
	cell.className = "left_title_2";
	var input = createInput("orderNum" + num, "text");
	cell = createCell(row);
	cell.appendChild(input);
	cell = createCellWithDiv(row, "orderNum" + num + "Tip");
	// table.appendChild(row);

	// var row = document.createElement("tr");
	var row = table.insertRow(-1);
	var cell = createCellWithText(row, "小游戏类别");
	cell.className = "left_title_1";
	cell = document.createElement("td");
	var sel = document.getElementById("class");
	var pSel = sel.cloneNode(true);
	pSel.id = "class" + num;
	pSel.name = "classId" + num;
	cell.appendChild(pSel);
	row.appendChild(cell);
	cell = createCellWithDiv(row, "class" + num + "Tip");
	// table.appendChild(row);

	// var row = document.createElement("tr");
	var row = table.insertRow(-1);
	var cell = createCellWithText(row, "最新推荐");
	cell.className = "left_title_2";
	cell = document.createElement("td");
	var sel = document.getElementById("isNewest");
	var pSel = sel.cloneNode(true);
	pSel.id = "isNewest" + num;
	pSel.name = "isNewest" + num;
	cell.appendChild(pSel);
	row.appendChild(cell);
	cell = createCellWithDiv(row, "isNewest" + num + "Tip");
	// table.appendChild(row);

	// var row = document.createElement("tr");
	var row = table.insertRow(-1);
	var cell = createCellWithText(row, "精品");
	cell.className = "left_title_1";
	cell = document.createElement("td");
	var sel = document.getElementById("isSuper");
	var pSel = sel.cloneNode(true);
	pSel.id = "isSuper" + num;
	pSel.name = "isSuper" + num;
	cell.appendChild(pSel);
	row.appendChild(cell);
	cell = createCellWithDiv(row, "isSuper" + num + "Tip");
	
	
	var row = table.insertRow(-1);
	var cell = createCellWithText(row, "原创");
	cell.className = "left_title_1";
	cell = document.createElement("td");
	var sel = document.getElementById("isOriginal");
	var pSel = sel.cloneNode(true);
	pSel.id = "isOriginal" + num;
	pSel.name = "isOriginal" + num;
	cell.appendChild(pSel);
	row.appendChild(cell);
	cell = createCellWithDiv(row, "isOriginal" + num + "Tip");
	
	
	var row = table.insertRow(-1);
	var cell = createCellWithText(row, "中文");
	cell.className = "left_title_1";
	cell = document.createElement("td");
	var sel = document.getElementById("isChinese");
	var pSel = sel.cloneNode(true);
	pSel.id = "isChinese" + num;
	pSel.name = "isChinese" + num;
	cell.appendChild(pSel);
	row.appendChild(cell);
	cell = createCellWithDiv(row, "isChinese" + num + "Tip");
	
	
	var row = table.insertRow(-1);
	var cell = createCellWithText(row, "最热");
	cell.className = "left_title_1";
	cell = document.createElement("td");
	var sel = document.getElementById("isHottest");
	var pSel = sel.cloneNode(true);
	pSel.id = "isHottest" + num;
	pSel.name = "isHottest" + num;
	cell.appendChild(pSel);
	row.appendChild(cell);
	cell = createCellWithDiv(row, "isHottest" + num + "Tip");
	
	// table.appendChild(row);

	// var row = document.createElement("tr");
	var row = table.insertRow(-1);
	var cell = createCellWithText(row, "游戏文件");
	cell.className = "left_title_2";
	var input = createInput("gameFile" + num, "file");
	cell = createCell(row);
	cell.appendChild(input);
	cell = createCellWithDiv(row, "gameFile" + num + "Tip");
	// table.appendChild(row);

	// var row = document.createElement("tr");
	var row = table.insertRow(-1);
	var cell = createCellWithText(row, "小图标");
	cell.className = "left_title_1";
	var input = createInput("smallIconFile" + num, "file");
	cell = createCell(row);
	cell.appendChild(input);
	cell = createCellWithDiv(row, "smallIconFile" + num + "Tip");
	// table.appendChild(row);
	
	// var row = document.createElement("tr");
	var row = table.insertRow(-1);
	var cell = createCellWithText(row, "大图标");
	cell.className = "left_title_2";
	var input = createInput("iconFile" + num, "file");
	cell = createCell(row);
	cell.appendChild(input);
	cell = createCellWithDiv(row, "iconFile" + num + "Tip");
	// table.appendChild(row);

	// var row = document.createElement("tr");
	var row = table.insertRow(-1);
	var cell = createCellWithText(row, "内嵌广告图片");
	cell.className = "left_title_1";
	var input = createInput("adImgFile" + num, "file");
	cell = createCell(row);
	cell.appendChild(input);
	cell = createCellWithDiv(row, "adImgFile" + num + "Tip");
	// table.appendChild(row);

	// var row = document.createElement("tr");
	var row = table.insertRow(-1);
	var cell = createCellWithText(row, "内嵌广告链接");
	cell.className = "left_title_2";
	var input = createInput("adHref" + num, "text");
	cell = createCell(row);
	cell.appendChild(input);
	cell = createCellWithDiv(row, "adHref" + num + "Tip");
	// table.appendChild(row);

	// var row = document.createElement("tr");
	var row = table.insertRow(-1);
	var cell = createCellWithText(row, "内嵌广告标题");
	cell.className = "left_title_1";
	var input = createInput("adTitle" + num, "text");
	cell = createCell(row);
	cell.appendChild(input);
	cell = createCellWithDiv(row, "adTitle" + num + "Tip");
	// table.appendChild(row);

//	var row = table.insertRow(-1);
//	var cell = createCellWithText(row, "广告区域");
//	cell.className = "left_title_2";
//	cell = document.createElement("td");
//	var sel = document.getElementById("area");
//	var pSel = sel.cloneNode(true);
//	pSel.id = "area" + num;
//	pSel.name = "adAreaId" + num;
//	cell.appendChild(pSel);
//	row.appendChild(cell);
//	cell = createCellWithDiv(row, "area" + num + "Tip");
//
//	var row = table.insertRow(-1);
//	var cell = createCellWithText(row, "PPT图片文件");
//	cell.className = "left_title_1";
//	var input = createInput("pptImgFile" + num, "file");
//	cell = createCell(row);
//	cell.appendChild(input);
//	cell = createCellWithDiv(row, "pptImgFile" + num + "Tip");
//
//	var row = table.insertRow(-1);
//	var cell = createCellWithText(row, "PPT链接地址");
//	cell.className = "left_title_2";
//	var input = createInput("pptHref" + num, "text");
//	cell = createCell(row);
//	cell.appendChild(input);
//	cell = createCellWithDiv(row, "pptHref" + num + "Tip");
//
//	var row = table.insertRow(-1);
//	var cell = createCellWithText(row, "PPT标题");
//	cell.className = "left_title_1";
//	var input = createInput("pptTitle" + num, "text");
//	cell = createCell(row);
//	cell.appendChild(input);
//	cell = createCellWithDiv(row, "pptTitle" + num + "Tip");
	
	// var row = document.createElement("tr");
	var row = table.insertRow(-1);
	var cell = createCellWithText(row, "描述");
	cell.className = "left_title_2";
	var input = createInput("description" + num, "text");
	cell = createCell(row);
	cell.appendChild(input);
	cell = createCellWithDiv(row, "description" + num + "Tip");
	// table.appendChild(row);

	numEl.value = num;
	miniGameDynamicFormValidate();
};

/**
 * 创建一列
 * 
 * @return td
 */
function createCell(row) {
	var cell = document.createElement("td");
	row.appendChild(cell);

	return cell;
};

/**
 * 创建一文本列
 * 
 * @param text
 * @return td
 */
function createCellWithText(row, text) {
	var cell = document.createElement("td");
	var textNode = document.createTextNode(text);
	cell.appendChild(textNode);
	row.appendChild(cell);

	return cell;
};

/**
 * 创建一div列
 * 
 * @param text
 * @return td
 */
function createCellWithDiv(row, id) {
	var cell = document.createElement("td");
	var div = document.createElement("div");
	div.id = id;
	cell.appendChild(div);
	row.appendChild(cell);

	return cell;
};

/**
 * 创建一个input域
 * 
 * @param id
 * @param type
 * @return input
 */
function createInput(id, type) {
	var cell = document.createElement("input");
	cell.type = type;
	cell.id = id;
	cell.name = id;

	return cell;
};