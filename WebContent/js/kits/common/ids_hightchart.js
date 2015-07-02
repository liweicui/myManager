define(function(){
	
    return {
    	
    	initPieHighChart: function(data,chartTitle,chartName,chartType,chartNumFormat,hasDataLabels,showInLegend){
           	if(!chartNumFormat){
           		chartNumFormat=2;
           	}
           	if(!hasDataLabels){
        		hasDataLabels=false;
        	}
        	if(!showInLegend){
        		showInLegend=false;
        	}
           	$("#"+chartName).html("");
           	console.log(hasDataLabels);
           	 var chartOptions = {
                       chart: {
                           renderTo: chartName,
                           type: chartType, 
                           plotBorderWidth: 0
           	 				
                       },
                     //图表的主标题
                       title: {
                           text: chartTitle
                       },
                       
                       tooltip: {
                       	 pointFormat:  '{series.name}: <b>{point.percentage:.'+chartNumFormat+'f}%</b>',
                            percentageDecimals: 1
                           
                       },
                       
                       series: data,
                       legend: {
                    	   align: 'right',
                    	   verticalAlign: 'middle',
                    	   layout: 'vertical',
                           x: -10,
                           y: 10,
                           borderWidth: 0
                           
                       }
                       , //每种图表类型属性设置
                       plotOptions: {
                          //饼状图
                          pie:  {
                              allowPointSelect: true,
                              cursor: 'pointer',
                              dataLabels: {
                                  enabled: hasDataLabels,
                                  color: '#000000',
                                  connectorColor: '#000000',
                                  formatter: function() {
                                      //Highcharts.numberFormat(this.percentage,2)格式化数字，保留2位精度
                                      return '<b>'+this.point.name+"</b>:"+Highcharts.numberFormat(this.percentage,chartNumFormat) +'%';
                                  }
                              },
                              showInLegend: showInLegend
                          }
           	         
                       }
                   };
                   //var o = $.extend({},chartOptions);
                   chart = new Highcharts.Chart(chartOptions);
           },
           
    
    initHighChart: function(data,titles,chartName,chartTitle,chartType,chartNumFormat,hasDegend,hasDataLabels,yLabelUnit,step,prompt){
    	if(!chartNumFormat){
    		chartNumFormat=0;
    	}
    	if(!step){
    		step=1;
    	}
    	if(!hasDegend){
    		hasDegend=false;
    	}
    	if(!hasDataLabels){
    		hasDataLabels=false;
    	}
    	if(!yLabelUnit){
    		yLabelUnit="";
    	}
    	if(!prompt){
    		prompt=0;
    	}
    	 var chartOptions = {
                chart: {
                    renderTo: chartName,
                    type: chartType, 
                    plotBorderWidth: 0
                },
              //图表的主标题
                title: {
                    text: chartTitle
                },
                
                tooltip: {
                    formatter: function() {
	                	if(prompt>0){
                     		 return '<span>'+this.x+'</span><br/>'+'<span>'+Highcharts.numberFormat(this.y,chartNumFormat)+yLabelUnit+'</span><br/>('+Highcharts.numberFormat(this.y/prompt*100,2)+"%"+')';
                     	}else{
                     		return '<span>'+ this.x+'</span><br/>'+'<span>'+Highcharts.numberFormat(this.y,chartNumFormat) +'</span>'+yLabelUnit;
                     	}
                    }
                },
                
                xAxis :{
                	        categories : titles,
                	        labels:{
                    	        step:step //step就是x轴显示的间隔
                    	    }
                	    }, 
                	   
                yAxis: {
                	labels: {
                        format: '{value} '+yLabelUnit
                        /*style: {
                            color: '#89A54E'
                        }*/
                    },
                    title: {
                        text: ''
                    },
                	min:0
                },
                series: data,
                legend: {
                	 align: 'right',
              	   verticalAlign: 'middle',
              	   layout: 'vertical',
                    x: -10,
                    y: 10,
                    borderWidth: 0,
                    enabled:hasDegend
                }
                , //每种图表类型属性设置
                plotOptions: {
                    //横向条形图
                   spline: {  
                	   colorByPoint:false, //每个柱子不同颜色
    		                pointPadding: 0.2,  
    		                borderWidth: 0,
    		                allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: hasDataLabels,
                            color: '#000000',
                            connectorColor: '#000000',
                            formatter: function() {
                                //Highcharts.numberFormat(this.percentage,2)格式化数字，保留2位精度
                            	if(prompt>0){
                            		 return '<span>'+Highcharts.numberFormat(this.y,chartNumFormat)+yLabelUnit+'</span><br/>('+Highcharts.numberFormat(this.y/prompt*100,2)+"%"+')';
                            	}else{
                            		 return '<span>'+Highcharts.numberFormat(this.y,chartNumFormat)+yLabelUnit+'</span>';
                            	}
                               
                            }
                        }
                    },
                    //竖向条形图
                    column: {  
    	             	   colorByPoint:false, //每个柱子不同颜色
    		                pointPadding: 0.2,  
    		                borderWidth: 0,
    		                allowPointSelect: true,
    	               cursor: 'pointer',
    	                 dataLabels: {
    	                   enabled: hasDataLabels,
    	                   color: '#000000',
    	                   connectorColor: '#000000',
    	                   formatter: function() {
    	                       //Highcharts.numberFormat(this.percentage,2)格式化数字，保留2位精度
    	                	if(prompt>0){
                          		 return '<span>'+Highcharts.numberFormat(this.y,chartNumFormat)+yLabelUnit+'</span><br/>('+Highcharts.numberFormat(this.y/prompt*100,2)+"%"+')';
                          	}else{
                          		 return '<span>'+Highcharts.numberFormat(this.y,chartNumFormat)+yLabelUnit+'</span>';
                          	}
    	                   }
    	               }
    	           }, 
    	         
    	          line: {  
    	            	   colorByPoint:false, //每个柱子不同颜色
    		                pointPadding: 0.2,  
    		                borderWidth: 0,
    		                allowPointSelect: true,
    	             cursor: 'pointer',
    	              dataLabels: {
    	                 enabled: hasDataLabels,
    	                 color: '#000000',
    	                 connectorColor: '#000000',
    	                 formatter: function() {
    	                     //Highcharts.numberFormat(this.percentage,2)格式化数字，保留2位精度
    	                	 if(prompt>0){
                        		 return '<span>'+Highcharts.numberFormat(this.y,chartNumFormat)+yLabelUnit+'</span><br/>('+Highcharts.numberFormat(this.y/prompt*100,2)+"%"+')';
                        	}else{
                        		 return '<span>'+Highcharts.numberFormat(this.y,chartNumFormat)+yLabelUnit+'</span>';
                        	}
    	                 }
    	             }
    	         }, 
    	         area: {  
	            	   colorByPoint:false, //每个柱子不同颜色
		                pointPadding: 0.2,  
		                borderWidth: 0,
		                allowPointSelect: true,
	             cursor: 'pointer',
	              dataLabels: {
	                 enabled: hasDataLabels,
	                 color: '#000000',
	                 connectorColor: '#000000',
	                 formatter: function() {
	                     //Highcharts.numberFormat(this.percentage,2)格式化数字，保留2位精度
	                	 if(prompt>0){
                    		 return '<span>'+Highcharts.numberFormat(this.y,chartNumFormat)+yLabelUnit+'</span><br/>('+Highcharts.numberFormat(this.y/prompt*100,2)+"%"+')';
                    	}else{
                    		 return '<span>'+Highcharts.numberFormat(this.y,chartNumFormat)+yLabelUnit+'</span>';
                    	}
	                 }
	             }
	         }, 
    	         bar: {  
              	   colorByPoint:false, //每个柱子不同颜色
                   pointPadding: 0.2,  
                   borderWidth: 0,
                   allowPointSelect: true,
                   cursor: 'pointer',
                     dataLabels: {
                       enabled: hasDataLabels,
                       color: '#000000',
                       connectorColor: '#000000',
                       formatter: function() {
                           //Highcharts.numberFormat(this.percentage,2)格式化数字，保留2位精度
                    	   if(prompt>0){
                      		 return '<span>'+Highcharts.numberFormat(this.y,chartNumFormat)+yLabelUnit+'</span><br/>('+Highcharts.numberFormat(this.y/prompt*100,2)+"%"+')';
                      	}else{
                      		 return '<span>'+Highcharts.numberFormat(this.y,chartNumFormat)+yLabelUnit+'</span>';
                      	}
                       }
                   }
               }
                }
            };
            chart1 = new Highcharts.Chart(chartOptions);
    	}
    };

});
 