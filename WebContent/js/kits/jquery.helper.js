(function($){
    //extend number format
    Number.prototype.format = function(n, x) {
        var re = '(\\d)(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
        return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$1,');
    };

    //javascript 模板
    var template = (function (cache, $) {
        return function (str, data) {
            var fn = !/\s/.test(str)
                ? cache[str] = cache[str]
                || template(document.getElementById(str).innerHTML)
                : function (data) {
                var i, variable = [$], value = [[]];
                for (i in data) {
                    variable.push(i);
                    value.push(data[i]);
                };
                return (new Function(variable, fn.$))
                    .apply(data, value).join("");
            };

            fn.$ = fn.$ || $ + ".push('"
                + str.replace(/\\/g, "\\\\")
                .replace(/[\r\t\n]/g, " ")
                .split("<#").join("\t")
                .replace(/((^|#>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)#>/g, "',$1,'")
                .split("\t").join("');")
                .split("#>").join($ + ".push('")
                .split("\r").join("\\'")
                + "');return " + $;

            return data ? fn(data) : fn;
    }})({}, '$' + (+ new Date));

    /**
     * 数组字段排序方法
     */
    var sort_by = function(field, reverse, primer){
       var key = primer ?
           function(x) {return primer(x[field])} :
           function(x) {return x[field]};

       reverse = [-1, 1][+!!reverse];

       return function (a, b) {
           return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
       }
    }

    /*Helper Util*/
    var UtilHelper = {

        alert : function(msg, fn){
            bootbox.alert.apply(bootbox, [msg, fn|| $.noop ]);
        },

        prompt : function(msg, fn){
            bootbox.prompt.apply(bootbox, [msg, fn || $.noop ]);
        },

        confirm : function(msg, fn){
            bootbox.confirm.apply(bootbox,  [msg, (function(){
                return function(flag){
                    setTimeout(function(){
                        fn.call(null, flag);
                    },600);
                };
            })() || $.noop ]);
        },

        dialog: function(options){
            bootbox.dialog.call(bootbox, options|| {});
        },

        notify : function(text){
            $('.top-right').notify({
                message: { html:text  }
            }).show();
        },

        error : function(text){
            $('.top-right').notify({
                type:'danger',
                message: { html:text  }
            }).show();
        },

        /**
         * 字符串占位替换，支持{数字}格式替换
         * @param {String} str 待替换的字符串
         * @param {Array||String...} params 被占位替换的参数
         * 支持format('template','param1','param2'....)或format('template',['param1','param2',....])两种格式
         */
        format : function(){
            var args = Array.prototype.slice.call(arguments),
                str = args[0] /*wait format string*/,
                params;
            //无参数或参数为0
            if(args.length < 2 || ($.isArray(args[1]) && args[1].length == 0)){
                return str;
            }

            params = $.isArray(args[1]) ? args[1] :args.slice(1);

            //支持“{数字}”格式占位替换,数字范围为0-999
            var regx = /\{\d{1,3}\}/g;
            var signs = str.match(regx);
            do{
                var sign = signs.pop(), //获得占位符
                    index =  parseInt(sign.match(/\d{1,3}/)[0],10); //获得数组索引
                str = str.replace(sign, params[index]);
            }while(signs.length);

            return str;
        },

        /**
         * javascript template
         */
        tmpl: template,

        /**
         *  MutiLine template String Hack
         */
        linesTpl: function(f) {
            var linesStr = f.toString().replace(/^[^\/]+\/\*!?/, '').replace(/\*\/[^\/]+$/, '');
            return $.tmpl(linesStr);
        },

        /**
         * 类继承实现
         * 子类 = inherits(父类 , 实例成员，静态成员);
         */
        inherits : function(parent, protoProps, staticProps) {
            var child, emptyClass = $.noop;
            if (protoProps && protoProps.hasOwnProperty('constructor')) {
              child = protoProps.constructor;
            } else {
              child = function(){ return parent.apply(this, arguments); };
            }
            $.extend(true, child, parent);
            emptyClass.prototype = parent.prototype;
            child.prototype = new emptyClass();
            if (protoProps) $.extend(true, child.prototype, protoProps);
            if (staticProps) $.extend(true, child, staticProps);
            child.prototype.constructor = child;
            child.superclass = parent.prototype;
            return child;
        },

        /**
         * 动态创建表单POST提交
         * url地址,params参数,isNew是否打开新页面
         */
        submitValues :function (url, params , isNew) {
            var form = [ '<form method="POST" action="', url, '">' ],
                formEl;
            // target="_blank"
            for(var key in params){
            	if($.isArray(params[key])){
            		var p = params[key];
            		for(var index in p){
            			form.push('<input type="hidden" name="', key, '" value="', p[index], '"/>');
            		}
            	}else{
            		form.push('<input type="hidden" name="', key, '" value="', params[key], '"/>');
            	}
            }
                
            	
            
            form.push('</form>');
            formEl = jQuery(form.join(''));
            if(isNew) formEl.attr("target","_blank");
            formEl.appendTo('body')[0].submit();
        },

        htmlEscape : function(str) {
            return $('<div/>').text(str.toString()).html();
        },

        /**
         * 判断字符串是否为空
         */
        isEmpty :function(value, allowBlank){
            var isNull = value == null,
                blankAllowed = !allowBlank ? value === '' : false;
            return isNull || blankAllowed;
        },

        /**
         * 界面无法查询到的无效值
         */
        isUnknow:function(val){
            return val == -1;
        },

        /**
         * 数据Group By
         */
        groupBy : function(array, predicate) {
            var grouped = {};
            for(var i = 0; i < array.length; i++) {
                var groupKey = predicate(array[i]);
                if (typeof(grouped[groupKey]) === "undefined")
                    grouped[groupKey] = [];
                grouped[groupKey].push(array[i]);
            }
            return grouped;
        },

        /**
         * 数组排序方法
         */
        sortBy: sort_by
    }

    $.extend(UtilHelper);
})(jQuery);
