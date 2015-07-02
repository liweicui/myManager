define(['js!jsKits/datepicker.pikaday.js','link!cssKits/datepicker.pikaday.css'],function(){

    var datePickerConfig = {
        minDate: moment("2007-01-01", "YYYY-MM-DD").toDate(),
        maxDate:  moment().toDate(),
        minYear: 2007,
        maxYear: 2099,
        showMonthAfterYear: true,
        i18n:{
            months        : moment.months(),
            weekdays      : moment.weekdaysShort(),
            weekdaysShort : moment.weekdaysMin()
        }
    }

    $.datepicker = function(wrapEl, options ){
        var picker, el = $(wrapEl);
        options = $.extend({}, datePickerConfig , options || {} );
        picker = new Pikaday(options);
        el.append(picker.el);
        return picker;
    }

    $.fn.datepicker = function(){
        var args = arguments;

        if (!args || !args.length) {
            args = [{ }];
        }

        return this.each(function(){
            var self   = $(this),
                plugin = self.data('pikaday');

            if (!(plugin instanceof Pikaday)) {
                if (typeof args[0] === 'object') {
                    var options = $.extend({}, args[0]);
                    options.field = self[0];

                    //$.extend(options, datePickerConfig);
                    options = $.extend({}, datePickerConfig , options || {} );

                    self.data('pikaday', new Pikaday(options));
                }
            } else {
                if (typeof args[0] === 'string' && typeof plugin[args[0]] === 'function') {
                    plugin[args[0]].apply(plugin, Array.prototype.slice.call(args,1));
                }
            }
        });
    };
});