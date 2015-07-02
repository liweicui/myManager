define(['js!jsKits/daterangepicker.js', 'link!cssKits/daterangepicker-bs3.css'],function(){

    return {
        defaultConfig:{
            minDate: '2007-01-01',
            maxDate: '2099-12-31',
            dateLimit: { days: 60 },
            showDropdowns: true,
            showWeekNumbers: true,
            timePicker: false,
            ranges: {
               '今天': [moment(), moment()],
               '昨天': [moment().subtract('days', 1), moment().subtract('days', 1)],
               '最近7天': [moment().subtract('days', 6), moment()],
               '最近30天': [moment().subtract('days', 29), moment()],
               '本月': [moment().startOf('month'), moment().endOf('month')]
            },
            opens: 'left',
            buttonClasses: ['btn btn-default'],
            applyClass: 'btn-small btn-primary',
            cancelClass: 'btn-small',
            format: 'YYYY-MM-DD',
            separator: ' to ',
            locale: {
                applyLabel: '确定',
                cancelLabel: '取消',
                weekLabel:'周',
                fromLabel: '从',
                toLabel: '至',
                customRangeLabel: '自定义范围',
                daysOfWeek: ['日', '一', '二', '三', '四', '五','六'],
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                firstDay: 0
            }
        }

    };
});