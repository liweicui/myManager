//FCKConfig.AutoDetectLanguage	= false ;

FCKConfig.ToolbarSets["mtt"] = [
	['Source','DocProps','NewPage','Preview','-','Templates','Find','RemoveFormat'],
	['Bold','Italic','Underline','StrikeThrough','-','Subscript','Superscript'],
	['OrderedList','UnorderedList','-','Outdent','Indent','Blockquote','CreateDiv'],
	['JustifyLeft','JustifyCenter','JustifyRight','JustifyFull'],
	['Link','Unlink','Anchor'],
	'/',
	['Image','Flash','Table','Rule','SpecialChar','PageBreak'],
	'/',
	['Style','FontFormat','FontName','FontSize'],
	['TextColor','BGColor'],
	['FitWindow','ShowBlocks','-']		// No comma for the last row.
] ;


FCKConfig.FontNames = '宋体;新宋体;方正舒体;方正姚体;华文彩云;华文仿宋;行楷;华文细黑;楷体_GB2312;华文中宋;黑体;幼圆;隶书;Comic Sans MS;Times New Roman;Arial';
FCKConfig.DefaultLanguage		= 'zh-cn'; 
FCKConfig.FontSizes = '9px;10px;12px;14px;16px;18px;20px;22px;24px;36px;48px;';
FCKConfig.EnterMode = 'br' ;			// p | div | br
FCKConfig.ShiftEnterMode = 'p' ;

FCKConfig.LinkUpload = false ;  // 是否允许上传设置超链接
//FCKConfig.FlashUpload = false ; // 是否允许上传flash

FCKConfig.LinkBrowser = false ;  // 超链接是否允许浏览服务器资源
FCKConfig.FlashBrowser = false ; // flash是否允许浏览服务器资源
FCKConfig.ImageBrowser = false ; // 图片是否允许浏览服务器资源
 
FCKConfig.ImageUploadAllowedExtensions	= ".(jpg|gif|jpeg|png|bmp)$" ;		// 允许上传的图片文件


	