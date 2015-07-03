//是否含有空格或换行符
function isBlank(s){for(var i=0;i<s.length;i++){var c=s.charAt(i);if((c==' ')||(c=='\n'))return true;}return false;}
//是否只含有数字,字母,下划线,可用于验证用户名
function isSsnStr(ssn,min,max){var re=/^[\w-]*$/i;if(re.test(ssn)){if(min && max){return re.length>=min && re.length<=max;}else if(min){return re.length>=min;}else if(max){return re.length<=max;}return true;}else{return false;}}
//--身份证号码验证-支持新的带x身份证
function isIdCardNo(num) {
	var controlIdCard = document.getElementById(num);
	var intStrLen = controlIdCard.value.length;
	var idNumber = controlIdCard.value;
	if ((intStrLen != 0) && (intStrLen != 15) && (intStrLen != 18)) {
		return false;
	}
	if (isNaN(controlIdCard.value.substring(0, intStrLen - 1))) {
		return false;
	}
	return true;
}
//字符串长度范围在min与max中
function isRang(str,min,max) {if(!str||""==str||str.length<min||str.length>max)return false;return true;}
function isRang(str,min) {if(null==str||""==str||str.length<min)return false;return true;}
//是否全是数字
function isDigit(str){var patrn=/^\d+$/;return patrn.test(str);}
//是否是整数
function isInteger(str){var patrn=/^([+-]?)(\d+)$/;return patrn.test(str);}
//是否为正整数
function isPlusInteger(str){var patrn=/^([+]?)(\d+)$/;return patrn.test(str);}
//是否为负整数
function isMinusInteger(str) {var patrn=/^-(\d+)$/;return patrn.test(str);}
//是否为浮点数
function isFloat(str){var patrn=/^([+-]?)\d*([\.]?)\d+$/;return patrn.test(str);}
//是否为正浮点数
function isPlusFloat(str){var patrn=/^([+]?)\d*([\.]?)\d+$/;return patrn.test(str);}
//是否为负浮点数
function isMinusFloat(str){var patrn=/^-\d*([\.]?)\d+$/;return patrn.test(str);}
//是否仅中文
function isChinese(str){var patrn=/^[\u4E00-\u9FA5\uF900-\uFA2D]+$/;return patrn.test(str);}
//是否仅ACSII字符
function isAcsii(str){var patrn=/^[\x00-\xFF]+$/;return patrn.test(str);}
//手机号码
function isMobile(str){var patrn=/^0?1[0-9]{10}$/;return patrn.test(str);};
//电话号码
function isPhone(str){var patrn=/^(0[\d]{2,3}-)?\d{6,8}(-\d{3,4})?$/;return patrn.test(str);}
//URL地址
function isUrl(str){var patrn=/^http[s]?:\/\/[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)+([\w-\.\/?%&=]*)?$/;return patrn.test(str);}
//是否是域名
function isDomain(str){var patrn=/^[a-zA-Z0-9-]+(\.[\a-zA-Z0-9-]+)+$/;return patrn.test(str);}
//电邮地址
function isEmail(str){var patrn=/^[\w-\.]+@[\w-]+(\.[\w-]+)+$/;return patrn.test(str);}
//邮编
function isZipCode(str){var patrn=/^\d{6}$/;return patrn.test(str);}
//合法时间
function isDate(str){if(!/\d{4}(\.|\/|\-)\d{2}(\.|\/|\-)\d{2}/.test(str)){return false;}var r=str.match(/\d{1,4}/g);if(r==null){return false;};var d= new Date(r[0], r[1]-1, r[2]);return (d.getFullYear()==r[0]&&(d.getMonth()+1)==r[1]&&d.getDate()==r[2]);}
//是中文，字母，横线，数字，下划线
function isAllname(str){var patrn=/^[\u4E00-\u9FA5\uF900-\uFA2D\w-]+$/;return patrn.test(str);}
//校验编号, 只能是数字,字母, 下划线, 减号
function validateSerialNo(objid, minlen, maxlen){
    var fieldvalue = document.getElementById(objid).value;
    if(fieldvalue.length < minlen){if(!checked){ checked = true;  document.getElementById(objid).focus(); return false; }}
    if(fieldvalue.length > maxlen){if(!checked){ checked = true;  document.getElementById(objid).focus(); return false; }}
    for(var i=0; i < fieldvalue.length; i++) {
        var one = fieldvalue.charAt(i);
        if(one >= 'a' && one <= 'z') continue;
        if(one >= 'A' && one <= 'Z') continue;
        if(one >= '0' && one <= '9') continue;
        if(one == '_' || one == '-') continue;
		if(!checked){ checked = true;  document.getElementById(objid).focus(); }		
        return false;
    }
    return true;
}