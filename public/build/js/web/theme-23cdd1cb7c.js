$(function() {

    $('#side-menu').metisMenu();

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
});

// call this from the developer console and you can control both instances
var calendars = {};

$(document).ready( function() {

  // assuming you've got the appropriate language files,
  // clndr will respect whatever moment's language is set to.
  // moment.lang('ru');

  // here's some magic to make sure the dates are happening this month.
  var thisMonth = moment().format('YYYY-MM');

  var eventArray = [
    { startDate: thisMonth + '-10', endDate: thisMonth + '-14', title: 'Multi-Day Event' },
    { startDate: thisMonth + '-21', endDate: thisMonth + '-23', title: 'Another Multi-Day Event' }
  ];

  // the order of the click handlers is predictable.
  // direct click action callbacks come first: click, nextMonth, previousMonth, nextYear, previousYear, or today.
  // then onMonthChange (if the month changed).
  // finally onYearChange (if the year changed).

  calendars.clndr1 = $('.cal1').clndr({
    events: eventArray,
    // constraints: {
    //   startDate: '2013-11-01',
    //   endDate: '2013-11-15'
    // },
    clickEvents: {
      click: function(target) {
        console.log(target);
        if($(target.element).hasClass('inactive')) {
          console.log('not a valid datepicker date.');
        } else {
          console.log('VALID datepicker date.');
        }
      },
      nextMonth: function() {
        console.log('next month.');
      },
      previousMonth: function() {
        console.log('previous month.');
      },
      onMonthChange: function() {
        console.log('month changed.');
      },
      nextYear: function() {
        console.log('next year.');
      },
      previousYear: function() {
        console.log('previous year.');
      },
      onYearChange: function() {
        console.log('year changed.');
      }
    },
    multiDayEvents: {
      startDate: 'startDate',
      endDate: 'endDate'
    },
    showAdjacentMonths: true,
    adjacentDaysChangeMonth: false
  });

  // calendars.clndr2 = $('.cal2').clndr({
  //   template: $('#template-calendar').html(),
  //   events: eventArray,
  //   startWithMonth: moment().add('month', 1),
  //   clickEvents: {
  //     click: function(target) {
  //       console.log(target);
  //     }
  //   }
  // });

  // bind both clndrs to the left and right arrow keys
  $(document).keydown( function(e) {
    if(e.keyCode == 37) {
      // left arrow
      calendars.clndr1.back();
      calendars.clndr2.back();
    }
    if(e.keyCode == 39) {
      // right arrow
      calendars.clndr1.forward();
      calendars.clndr2.forward();
    }
  });

});
/*!
 * Chart.js
 * http://chartjs.org/
 *
 * Copyright 2013 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */

//Define the global Chart Variable as a class.
window.Chart = function(context){

	var chart = this;
	
	
	//Easing functions adapted from Robert Penner's easing equations
	//http://www.robertpenner.com/easing/
	
	var animationOptions = {
		linear : function (t){
			return t;
		},
		easeInQuad: function (t) {
			return t*t;
		},
		easeOutQuad: function (t) {
			return -1 *t*(t-2);
		},
		easeInOutQuad: function (t) {
			if ((t/=1/2) < 1) return 1/2*t*t;
			return -1/2 * ((--t)*(t-2) - 1);
		},
		easeInCubic: function (t) {
			return t*t*t;
		},
		easeOutCubic: function (t) {
			return 1*((t=t/1-1)*t*t + 1);
		},
		easeInOutCubic: function (t) {
			if ((t/=1/2) < 1) return 1/2*t*t*t;
			return 1/2*((t-=2)*t*t + 2);
		},
		easeInQuart: function (t) {
			return t*t*t*t;
		},
		easeOutQuart: function (t) {
			return -1 * ((t=t/1-1)*t*t*t - 1);
		},
		easeInOutQuart: function (t) {
			if ((t/=1/2) < 1) return 1/2*t*t*t*t;
			return -1/2 * ((t-=2)*t*t*t - 2);
		},
		easeInQuint: function (t) {
			return 1*(t/=1)*t*t*t*t;
		},
		easeOutQuint: function (t) {
			return 1*((t=t/1-1)*t*t*t*t + 1);
		},
		easeInOutQuint: function (t) {
			if ((t/=1/2) < 1) return 1/2*t*t*t*t*t;
			return 1/2*((t-=2)*t*t*t*t + 2);
		},
		easeInSine: function (t) {
			return -1 * Math.cos(t/1 * (Math.PI/2)) + 1;
		},
		easeOutSine: function (t) {
			return 1 * Math.sin(t/1 * (Math.PI/2));
		},
		easeInOutSine: function (t) {
			return -1/2 * (Math.cos(Math.PI*t/1) - 1);
		},
		easeInExpo: function (t) {
			return (t==0) ? 1 : 1 * Math.pow(2, 10 * (t/1 - 1));
		},
		easeOutExpo: function (t) {
			return (t==1) ? 1 : 1 * (-Math.pow(2, -10 * t/1) + 1);
		},
		easeInOutExpo: function (t) {
			if (t==0) return 0;
			if (t==1) return 1;
			if ((t/=1/2) < 1) return 1/2 * Math.pow(2, 10 * (t - 1));
			return 1/2 * (-Math.pow(2, -10 * --t) + 2);
			},
		easeInCirc: function (t) {
			if (t>=1) return t;
			return -1 * (Math.sqrt(1 - (t/=1)*t) - 1);
		},
		easeOutCirc: function (t) {
			return 1 * Math.sqrt(1 - (t=t/1-1)*t);
		},
		easeInOutCirc: function (t) {
			if ((t/=1/2) < 1) return -1/2 * (Math.sqrt(1 - t*t) - 1);
			return 1/2 * (Math.sqrt(1 - (t-=2)*t) + 1);
		},
		easeInElastic: function (t) {
			var s=1.70158;var p=0;var a=1;
			if (t==0) return 0;  if ((t/=1)==1) return 1;  if (!p) p=1*.3;
			if (a < Math.abs(1)) { a=1; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (1/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p ));
		},
		easeOutElastic: function (t) {
			var s=1.70158;var p=0;var a=1;
			if (t==0) return 0;  if ((t/=1)==1) return 1;  if (!p) p=1*.3;
			if (a < Math.abs(1)) { a=1; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (1/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*1-s)*(2*Math.PI)/p ) + 1;
		},
		easeInOutElastic: function (t) {
			var s=1.70158;var p=0;var a=1;
			if (t==0) return 0;  if ((t/=1/2)==2) return 1;  if (!p) p=1*(.3*1.5);
			if (a < Math.abs(1)) { a=1; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (1/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p ));
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p )*.5 + 1;
		},
		easeInBack: function (t) {
			var s = 1.70158;
			return 1*(t/=1)*t*((s+1)*t - s);
		},
		easeOutBack: function (t) {
			var s = 1.70158;
			return 1*((t=t/1-1)*t*((s+1)*t + s) + 1);
		},
		easeInOutBack: function (t) {
			var s = 1.70158; 
			if ((t/=1/2) < 1) return 1/2*(t*t*(((s*=(1.525))+1)*t - s));
			return 1/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2);
		},
		easeInBounce: function (t) {
			return 1 - animationOptions.easeOutBounce (1-t);
		},
		easeOutBounce: function (t) {
			if ((t/=1) < (1/2.75)) {
				return 1*(7.5625*t*t);
			} else if (t < (2/2.75)) {
				return 1*(7.5625*(t-=(1.5/2.75))*t + .75);
			} else if (t < (2.5/2.75)) {
				return 1*(7.5625*(t-=(2.25/2.75))*t + .9375);
			} else {
				return 1*(7.5625*(t-=(2.625/2.75))*t + .984375);
			}
		},
		easeInOutBounce: function (t) {
			if (t < 1/2) return animationOptions.easeInBounce (t*2) * .5;
			return animationOptions.easeOutBounce (t*2-1) * .5 + 1*.5;
		}
	};

	//Variables global to the chart
	var width = context.canvas.width;
	var height = context.canvas.height;


	//High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
	if (window.devicePixelRatio) {
		context.canvas.style.width = width + "px";
		context.canvas.style.height = height + "px";
		context.canvas.height = height * window.devicePixelRatio;
		context.canvas.width = width * window.devicePixelRatio;
		context.scale(window.devicePixelRatio, window.devicePixelRatio);
	}

	this.PolarArea = function(data,options){
	
		chart.PolarArea.defaults = {
			scaleOverlay : true,
			scaleOverride : false,
			scaleSteps : null,
			scaleStepWidth : null,
			scaleStartValue : null,
			scaleShowLine : true,
			scaleLineColor : "rgba(0,0,0,.1)",
			scaleLineWidth : 1,
			scaleShowLabels : true,
			scaleLabel : "<%=value%>",
			scaleFontFamily : "'Arial'",
			scaleFontSize : 12,
			scaleFontStyle : "normal",
			scaleFontColor : "#666",
			scaleShowLabelBackdrop : true,
			scaleBackdropColor : "rgba(255,255,255,0.75)",
			scaleBackdropPaddingY : 2,
			scaleBackdropPaddingX : 2,
			segmentShowStroke : true,
			segmentStrokeColor : "#fff",
			segmentStrokeWidth : 2,
			animation : true,
			animationSteps : 100,
			animationEasing : "easeOutBounce",
			animateRotate : true,
			animateScale : false,
			onAnimationComplete : null
		};
		
		var config = (options)? mergeChartConfig(chart.PolarArea.defaults,options) : chart.PolarArea.defaults;
		
		return new PolarArea(data,config,context);
	};

	this.Radar = function(data,options){
	
		chart.Radar.defaults = {
			scaleOverlay : false,
			scaleOverride : false,
			scaleSteps : null,
			scaleStepWidth : null,
			scaleStartValue : null,
			scaleShowLine : true,
			scaleLineColor : "rgba(0,0,0,.1)",
			scaleLineWidth : 1,
			scaleShowLabels : false,
			scaleLabel : "<%=value%>",
			scaleFontFamily : "'Arial'",
			scaleFontSize : 12,
			scaleFontStyle : "normal",
			scaleFontColor : "#666",
			scaleShowLabelBackdrop : true,
			scaleBackdropColor : "rgba(255,255,255,0.75)",
			scaleBackdropPaddingY : 2,
			scaleBackdropPaddingX : 2,
			angleShowLineOut : true,
			angleLineColor : "rgba(0,0,0,.1)",
			angleLineWidth : 1,			
			pointLabelFontFamily : "'Arial'",
			pointLabelFontStyle : "normal",
			pointLabelFontSize : 12,
			pointLabelFontColor : "#666",
			pointDot : true,
			pointDotRadius : 3,
			pointDotStrokeWidth : 1,
			datasetStroke : true,
			datasetStrokeWidth : 2,
			datasetFill : true,
			animation : true,
			animationSteps : 60,
			animationEasing : "easeOutQuart",
			onAnimationComplete : null
		};
		
		var config = (options)? mergeChartConfig(chart.Radar.defaults,options) : chart.Radar.defaults;

		return new Radar(data,config,context);
	};
	
	this.Pie = function(data,options){
		chart.Pie.defaults = {
			segmentShowStroke : true,
			segmentStrokeColor : "#fff",
			segmentStrokeWidth : 2,
			animation : true,
			animationSteps : 100,
			animationEasing : "easeOutBounce",
			animateRotate : true,
			animateScale : false,
			onAnimationComplete : null
		};		

		var config = (options)? mergeChartConfig(chart.Pie.defaults,options) : chart.Pie.defaults;
		
		return new Pie(data,config,context);				
	};
	
	this.Doughnut = function(data,options){
	
		chart.Doughnut.defaults = {
			segmentShowStroke : true,
			segmentStrokeColor : "#fff",
			segmentStrokeWidth : 2,
			percentageInnerCutout : 50,
			animation : true,
			animationSteps : 100,
			animationEasing : "easeOutBounce",
			animateRotate : true,
			animateScale : false,
			onAnimationComplete : null
		};		

		var config = (options)? mergeChartConfig(chart.Doughnut.defaults,options) : chart.Doughnut.defaults;
		
		return new Doughnut(data,config,context);			
		
	};

	this.Line = function(data,options){
	
		chart.Line.defaults = {
			scaleOverlay : false,
			scaleOverride : false,
			scaleSteps : null,
			scaleStepWidth : null,
			scaleStartValue : null,
			scaleLineColor : "rgba(0,0,0,.1)",
			scaleLineWidth : 1,
			scaleShowLabels : true,
			scaleLabel : "<%=value%>",
			scaleFontFamily : "'Arial'",
			scaleFontSize : 12,
			scaleFontStyle : "normal",
			scaleFontColor : "#666",
			scaleShowGridLines : true,
			scaleGridLineColor : "rgba(0,0,0,.05)",
			scaleGridLineWidth : 1,
			bezierCurve : true,
			pointDot : true,
			pointDotRadius : 4,
			pointDotStrokeWidth : 2,
			datasetStroke : true,
			datasetStrokeWidth : 2,
			datasetFill : true,
			animation : true,
			animationSteps : 60,
			animationEasing : "easeOutQuart",
			onAnimationComplete : null
		};		
		var config = (options) ? mergeChartConfig(chart.Line.defaults,options) : chart.Line.defaults;
		
		return new Line(data,config,context);
	}
	
	this.Bar = function(data,options){
		chart.Bar.defaults = {
			scaleOverlay : false,
			scaleOverride : false,
			scaleSteps : null,
			scaleStepWidth : null,
			scaleStartValue : null,
			scaleLineColor : "rgba(0,0,0,.1)",
			scaleLineWidth : 1,
			scaleShowLabels : true,
			scaleLabel : "<%=value%>",
			scaleFontFamily : "'Arial'",
			scaleFontSize : 12,
			scaleFontStyle : "normal",
			scaleFontColor : "#666",
			scaleShowGridLines : true,
			scaleGridLineColor : "rgba(0,0,0,.05)",
			scaleGridLineWidth : 1,
			barShowStroke : true,
			barStrokeWidth : 2,
			barValueSpacing : 5,
			barDatasetSpacing : 1,
			animation : true,
			animationSteps : 60,
			animationEasing : "easeOutQuart",
			onAnimationComplete : null
		};		
		var config = (options) ? mergeChartConfig(chart.Bar.defaults,options) : chart.Bar.defaults;
		
		return new Bar(data,config,context);		
	}
	
	var clear = function(c){
		c.clearRect(0, 0, width, height);
	};

	var PolarArea = function(data,config,ctx){
		var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString;		
		
		
		calculateDrawingSizes();
		
		valueBounds = getValueBounds();

		labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : null;

		//Check and set the scale
		if (!config.scaleOverride){
			
			calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
		}
		else {
			calculatedScale = {
				steps : config.scaleSteps,
				stepValue : config.scaleStepWidth,
				graphMin : config.scaleStartValue,
				labels : []
			}
			populateLabels(labelTemplateString, calculatedScale.labels,calculatedScale.steps,config.scaleStartValue,config.scaleStepWidth);
		}
		
		scaleHop = maxSize/(calculatedScale.steps);

		//Wrap in an animation loop wrapper
		animationLoop(config,drawScale,drawAllSegments,ctx);

		function calculateDrawingSizes(){
			maxSize = (Min([width,height])/2);
			//Remove whatever is larger - the font size or line width.
			
			maxSize -= Max([config.scaleFontSize*0.5,config.scaleLineWidth*0.5]);
			
			labelHeight = config.scaleFontSize*2;
			//If we're drawing the backdrop - add the Y padding to the label height and remove from drawing region.
			if (config.scaleShowLabelBackdrop){
				labelHeight += (2 * config.scaleBackdropPaddingY);
				maxSize -= config.scaleBackdropPaddingY*1.5;
			}
			
			scaleHeight = maxSize;
			//If the label height is less than 5, set it to 5 so we don't have lines on top of each other.
			labelHeight = Default(labelHeight,5);
		}
		function drawScale(){
			for (var i=0; i<calculatedScale.steps; i++){
				//If the line object is there
				if (config.scaleShowLine){
					ctx.beginPath();
					ctx.arc(width/2, height/2, scaleHop * (i + 1), 0, (Math.PI * 2), true);
					ctx.strokeStyle = config.scaleLineColor;
					ctx.lineWidth = config.scaleLineWidth;
					ctx.stroke();
				}

				if (config.scaleShowLabels){
					ctx.textAlign = "center";
					ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
 					var label =  calculatedScale.labels[i];
					//If the backdrop object is within the font object
					if (config.scaleShowLabelBackdrop){
						var textWidth = ctx.measureText(label).width;
						ctx.fillStyle = config.scaleBackdropColor;
						ctx.beginPath();
						ctx.rect(
							Math.round(width/2 - textWidth/2 - config.scaleBackdropPaddingX),     //X
							Math.round(height/2 - (scaleHop * (i + 1)) - config.scaleFontSize*0.5 - config.scaleBackdropPaddingY),//Y
							Math.round(textWidth + (config.scaleBackdropPaddingX*2)), //Width
							Math.round(config.scaleFontSize + (config.scaleBackdropPaddingY*2)) //Height
						);
						ctx.fill();
					}
					ctx.textBaseline = "middle";
					ctx.fillStyle = config.scaleFontColor;
					ctx.fillText(label,width/2,height/2 - (scaleHop * (i + 1)));
				}
			}
		}
		function drawAllSegments(animationDecimal){
			var startAngle = -Math.PI/2,
			angleStep = (Math.PI*2)/data.length,
			scaleAnimation = 1,
			rotateAnimation = 1;
			if (config.animation) {
				if (config.animateScale) {
					scaleAnimation = animationDecimal;
				}
				if (config.animateRotate){
					rotateAnimation = animationDecimal;
				}
			}

			for (var i=0; i<data.length; i++){

				ctx.beginPath();
				ctx.arc(width/2,height/2,scaleAnimation * calculateOffset(data[i].value,calculatedScale,scaleHop),startAngle, startAngle + rotateAnimation*angleStep, false);
				ctx.lineTo(width/2,height/2);
				ctx.closePath();
				ctx.fillStyle = data[i].color;
				ctx.fill();

				if(config.segmentShowStroke){
					ctx.strokeStyle = config.segmentStrokeColor;
					ctx.lineWidth = config.segmentStrokeWidth;
					ctx.stroke();
				}
				startAngle += rotateAnimation*angleStep;
			}
		}
		function getValueBounds() {
			var upperValue = Number.MIN_VALUE;
			var lowerValue = Number.MAX_VALUE;
			for (var i=0; i<data.length; i++){
				if (data[i].value > upperValue) {upperValue = data[i].value;}
				if (data[i].value < lowerValue) {lowerValue = data[i].value;}
			};

			var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
			var minSteps = Math.floor((scaleHeight / labelHeight*0.5));
			
			return {
				maxValue : upperValue,
				minValue : lowerValue,
				maxSteps : maxSteps,
				minSteps : minSteps
			};
			

		}
	}

	var Radar = function (data,config,ctx) {
		var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString;	
			
		//If no labels are defined set to an empty array, so referencing length for looping doesn't blow up.
		if (!data.labels) data.labels = [];
		
		calculateDrawingSizes();

		var valueBounds = getValueBounds();

		labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : null;

		//Check and set the scale
		if (!config.scaleOverride){
			
			calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
		}
		else {
			calculatedScale = {
				steps : config.scaleSteps,
				stepValue : config.scaleStepWidth,
				graphMin : config.scaleStartValue,
				labels : []
			}
			populateLabels(labelTemplateString, calculatedScale.labels,calculatedScale.steps,config.scaleStartValue,config.scaleStepWidth);
		}
		
		scaleHop = maxSize/(calculatedScale.steps);
		
		animationLoop(config,drawScale,drawAllDataPoints,ctx);
		
		//Radar specific functions.
		function drawAllDataPoints(animationDecimal){
			var rotationDegree = (2*Math.PI)/data.datasets[0].data.length;

			ctx.save();
			//translate to the centre of the canvas.
			ctx.translate(width/2,height/2);
			
			//We accept multiple data sets for radar charts, so show loop through each set
			for (var i=0; i<data.datasets.length; i++){
				ctx.beginPath();

				ctx.moveTo(0,animationDecimal*(-1*calculateOffset(data.datasets[i].data[0],calculatedScale,scaleHop)));
				for (var j=1; j<data.datasets[i].data.length; j++){
					ctx.rotate(rotationDegree);	
					ctx.lineTo(0,animationDecimal*(-1*calculateOffset(data.datasets[i].data[j],calculatedScale,scaleHop)));
			
				}
				ctx.closePath();
				
				
				ctx.fillStyle = data.datasets[i].fillColor;
				ctx.strokeStyle = data.datasets[i].strokeColor;
				ctx.lineWidth = config.datasetStrokeWidth;
				ctx.fill();
				ctx.stroke();
				
								
				if (config.pointDot){
					ctx.fillStyle = data.datasets[i].pointColor;
					ctx.strokeStyle = data.datasets[i].pointStrokeColor;
					ctx.lineWidth = config.pointDotStrokeWidth;
					for (var k=0; k<data.datasets[i].data.length; k++){
						ctx.rotate(rotationDegree);
						ctx.beginPath();
						ctx.arc(0,animationDecimal*(-1*calculateOffset(data.datasets[i].data[k],calculatedScale,scaleHop)),config.pointDotRadius,2*Math.PI,false);
						ctx.fill();
						ctx.stroke();
					}					
					
				}
				ctx.rotate(rotationDegree);
				
			}
			ctx.restore();
			
			
		}
		function drawScale(){
			var rotationDegree = (2*Math.PI)/data.datasets[0].data.length;
			ctx.save();
		    ctx.translate(width / 2, height / 2);	
			
			if (config.angleShowLineOut){
				ctx.strokeStyle = config.angleLineColor;		    	    
				ctx.lineWidth = config.angleLineWidth;
				for (var h=0; h<data.datasets[0].data.length; h++){
					
				    ctx.rotate(rotationDegree);
					ctx.beginPath();
					ctx.moveTo(0,0);
					ctx.lineTo(0,-maxSize);
					ctx.stroke();
				}
			}

			for (var i=0; i<calculatedScale.steps; i++){
				ctx.beginPath();
				
				if(config.scaleShowLine){
					ctx.strokeStyle = config.scaleLineColor;
					ctx.lineWidth = config.scaleLineWidth;
					ctx.moveTo(0,-scaleHop * (i+1));					
					for (var j=0; j<data.datasets[0].data.length; j++){
					    ctx.rotate(rotationDegree);
						ctx.lineTo(0,-scaleHop * (i+1));
					}
					ctx.closePath();
					ctx.stroke();			
							
				}
				
				if (config.scaleShowLabels){				
					ctx.textAlign = 'center';
					ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily; 
					ctx.textBaseline = "middle";
					
					if (config.scaleShowLabelBackdrop){
						var textWidth = ctx.measureText(calculatedScale.labels[i]).width;
						ctx.fillStyle = config.scaleBackdropColor;
						ctx.beginPath();
						ctx.rect(
							Math.round(- textWidth/2 - config.scaleBackdropPaddingX),     //X
							Math.round((-scaleHop * (i + 1)) - config.scaleFontSize*0.5 - config.scaleBackdropPaddingY),//Y
							Math.round(textWidth + (config.scaleBackdropPaddingX*2)), //Width
							Math.round(config.scaleFontSize + (config.scaleBackdropPaddingY*2)) //Height
						);
						ctx.fill();
					}						
					ctx.fillStyle = config.scaleFontColor;
					ctx.fillText(calculatedScale.labels[i],0,-scaleHop*(i+1));
				}

			}
			for (var k=0; k<data.labels.length; k++){				
			ctx.font = config.pointLabelFontStyle + " " + config.pointLabelFontSize+"px " + config.pointLabelFontFamily;
			ctx.fillStyle = config.pointLabelFontColor;
				var opposite = Math.sin(rotationDegree*k) * (maxSize + config.pointLabelFontSize);
				var adjacent = Math.cos(rotationDegree*k) * (maxSize + config.pointLabelFontSize);
				
				if(rotationDegree*k == Math.PI || rotationDegree*k == 0){
					ctx.textAlign = "center";
				}
				else if(rotationDegree*k > Math.PI){
					ctx.textAlign = "right";
				}
				else{
					ctx.textAlign = "left";
				}
				
				ctx.textBaseline = "middle";
				
				ctx.fillText(data.labels[k],opposite,-adjacent);
				
			}
			ctx.restore();
		};
		function calculateDrawingSizes(){
			maxSize = (Min([width,height])/2);

			labelHeight = config.scaleFontSize*2;
			
			var labelLength = 0;
			for (var i=0; i<data.labels.length; i++){
				ctx.font = config.pointLabelFontStyle + " " + config.pointLabelFontSize+"px " + config.pointLabelFontFamily;
				var textMeasurement = ctx.measureText(data.labels[i]).width;
				if(textMeasurement>labelLength) labelLength = textMeasurement;
			}
			
			//Figure out whats the largest - the height of the text or the width of what's there, and minus it from the maximum usable size.
			maxSize -= Max([labelLength,((config.pointLabelFontSize/2)*1.5)]);				
			
			maxSize -= config.pointLabelFontSize;
			maxSize = CapValue(maxSize, null, 0);
			scaleHeight = maxSize;
			//If the label height is less than 5, set it to 5 so we don't have lines on top of each other.
			labelHeight = Default(labelHeight,5);
		};
		function getValueBounds() {
			var upperValue = Number.MIN_VALUE;
			var lowerValue = Number.MAX_VALUE;
			
			for (var i=0; i<data.datasets.length; i++){
				for (var j=0; j<data.datasets[i].data.length; j++){
					if (data.datasets[i].data[j] > upperValue){upperValue = data.datasets[i].data[j]}
					if (data.datasets[i].data[j] < lowerValue){lowerValue = data.datasets[i].data[j]}
				}
			}

			var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
			var minSteps = Math.floor((scaleHeight / labelHeight*0.5));
			
			return {
				maxValue : upperValue,
				minValue : lowerValue,
				maxSteps : maxSteps,
				minSteps : minSteps
			};
			

		}
	}

	var Pie = function(data,config,ctx){
		var segmentTotal = 0;
		
		//In case we have a canvas that is not a square. Minus 5 pixels as padding round the edge.
		var pieRadius = Min([height/2,width/2]) - 5;
		
		for (var i=0; i<data.length; i++){
			segmentTotal += data[i].value;
		}
		
		
		animationLoop(config,null,drawPieSegments,ctx);
				
		function drawPieSegments (animationDecimal){
			var cumulativeAngle = -Math.PI/2,
			scaleAnimation = 1,
			rotateAnimation = 1;
			if (config.animation) {
				if (config.animateScale) {
					scaleAnimation = animationDecimal;
				}
				if (config.animateRotate){
					rotateAnimation = animationDecimal;
				}
			}
			for (var i=0; i<data.length; i++){
				var segmentAngle = rotateAnimation * ((data[i].value/segmentTotal) * (Math.PI*2));
				ctx.beginPath();
				ctx.arc(width/2,height/2,scaleAnimation * pieRadius,cumulativeAngle,cumulativeAngle + segmentAngle);
				ctx.lineTo(width/2,height/2);
				ctx.closePath();
				ctx.fillStyle = data[i].color;
				ctx.fill();
				
				if(config.segmentShowStroke){
					ctx.lineWidth = config.segmentStrokeWidth;
					ctx.strokeStyle = config.segmentStrokeColor;
					ctx.stroke();
				}
				cumulativeAngle += segmentAngle;
			}			
		}		
	}

	var Doughnut = function(data,config,ctx){
		var segmentTotal = 0;
		
		//In case we have a canvas that is not a square. Minus 5 pixels as padding round the edge.
		var doughnutRadius = Min([height/2,width/2]) - 5;
		
		var cutoutRadius = doughnutRadius * (config.percentageInnerCutout/100);
		
		for (var i=0; i<data.length; i++){
			segmentTotal += data[i].value;
		}
		
		
		animationLoop(config,null,drawPieSegments,ctx);
		
		
		function drawPieSegments (animationDecimal){
			var cumulativeAngle = -Math.PI/2,
			scaleAnimation = 1,
			rotateAnimation = 1;
			if (config.animation) {
				if (config.animateScale) {
					scaleAnimation = animationDecimal;
				}
				if (config.animateRotate){
					rotateAnimation = animationDecimal;
				}
			}
			for (var i=0; i<data.length; i++){
				var segmentAngle = rotateAnimation * ((data[i].value/segmentTotal) * (Math.PI*2));
				ctx.beginPath();
				ctx.arc(width/2,height/2,scaleAnimation * doughnutRadius,cumulativeAngle,cumulativeAngle + segmentAngle,false);
				ctx.arc(width/2,height/2,scaleAnimation * cutoutRadius,cumulativeAngle + segmentAngle,cumulativeAngle,true);
				ctx.closePath();
				ctx.fillStyle = data[i].color;
				ctx.fill();
				
				if(config.segmentShowStroke){
					ctx.lineWidth = config.segmentStrokeWidth;
					ctx.strokeStyle = config.segmentStrokeColor;
					ctx.stroke();
				}
				cumulativeAngle += segmentAngle;
			}			
		}			
		
		
		
	}

	var Line = function(data,config,ctx){
		var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop,widestXLabel, xAxisLength,yAxisPosX,xAxisPosY, rotateLabels = 0;
			
		calculateDrawingSizes();
		
		valueBounds = getValueBounds();
		//Check and set the scale
		labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : "";
		if (!config.scaleOverride){
			
			calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
		}
		else {
			calculatedScale = {
				steps : config.scaleSteps,
				stepValue : config.scaleStepWidth,
				graphMin : config.scaleStartValue,
				labels : []
			}
			populateLabels(labelTemplateString, calculatedScale.labels,calculatedScale.steps,config.scaleStartValue,config.scaleStepWidth);
		}
		
		scaleHop = Math.floor(scaleHeight/calculatedScale.steps);
		calculateXAxisSize();
		animationLoop(config,drawScale,drawLines,ctx);		
		
		function drawLines(animPc){
			for (var i=0; i<data.datasets.length; i++){
				ctx.strokeStyle = data.datasets[i].strokeColor;
				ctx.lineWidth = config.datasetStrokeWidth;
				ctx.beginPath();
				ctx.moveTo(yAxisPosX, xAxisPosY - animPc*(calculateOffset(data.datasets[i].data[0],calculatedScale,scaleHop)))

				for (var j=1; j<data.datasets[i].data.length; j++){
					if (config.bezierCurve){
						ctx.bezierCurveTo(xPos(j-0.5),yPos(i,j-1),xPos(j-0.5),yPos(i,j),xPos(j),yPos(i,j));
					}
					else{
						ctx.lineTo(xPos(j),yPos(i,j));
					}
				}
				ctx.stroke();
				if (config.datasetFill){
					ctx.lineTo(yAxisPosX + (valueHop*(data.datasets[i].data.length-1)),xAxisPosY);
					ctx.lineTo(yAxisPosX,xAxisPosY);
					ctx.closePath();
					ctx.fillStyle = data.datasets[i].fillColor;
					ctx.fill();
				}
				else{
					ctx.closePath();
				}
				if(config.pointDot){
					ctx.fillStyle = data.datasets[i].pointColor;
					ctx.strokeStyle = data.datasets[i].pointStrokeColor;
					ctx.lineWidth = config.pointDotStrokeWidth;
					for (var k=0; k<data.datasets[i].data.length; k++){
						ctx.beginPath();
						ctx.arc(yAxisPosX + (valueHop *k),xAxisPosY - animPc*(calculateOffset(data.datasets[i].data[k],calculatedScale,scaleHop)),config.pointDotRadius,0,Math.PI*2,true);
						ctx.fill();
						ctx.stroke();
					}
				}
			}
			
			function yPos(dataSet,iteration){
				return xAxisPosY - animPc*(calculateOffset(data.datasets[dataSet].data[iteration],calculatedScale,scaleHop));			
			}
			function xPos(iteration){
				return yAxisPosX + (valueHop * iteration);
			}
		}
		function drawScale(){
			//X axis line
			ctx.lineWidth = config.scaleLineWidth;
			ctx.strokeStyle = config.scaleLineColor;
			ctx.beginPath();
			ctx.moveTo(width-widestXLabel/2+5,xAxisPosY);
			ctx.lineTo(width-(widestXLabel/2)-xAxisLength-5,xAxisPosY);
			ctx.stroke();
			
			
			if (rotateLabels > 0){
				ctx.save();
				ctx.textAlign = "right";
			}
			else{
				ctx.textAlign = "center";
			}
			ctx.fillStyle = config.scaleFontColor;
			for (var i=0; i<data.labels.length; i++){
				ctx.save();
				if (rotateLabels > 0){
					ctx.translate(yAxisPosX + i*valueHop,xAxisPosY + config.scaleFontSize);
					ctx.rotate(-(rotateLabels * (Math.PI/180)));
					ctx.fillText(data.labels[i], 0,0);
					ctx.restore();
				}
				
				else{
					ctx.fillText(data.labels[i], yAxisPosX + i*valueHop,xAxisPosY + config.scaleFontSize+3);					
				}

				ctx.beginPath();
				ctx.moveTo(yAxisPosX + i * valueHop, xAxisPosY+3);
				
				//Check i isnt 0, so we dont go over the Y axis twice.
				if(config.scaleShowGridLines && i>0){
					ctx.lineWidth = config.scaleGridLineWidth;
					ctx.strokeStyle = config.scaleGridLineColor;					
					ctx.lineTo(yAxisPosX + i * valueHop, 5);
				}
				else{
					ctx.lineTo(yAxisPosX + i * valueHop, xAxisPosY+3);				
				}
				ctx.stroke();
			}
			
			//Y axis
			ctx.lineWidth = config.scaleLineWidth;
			ctx.strokeStyle = config.scaleLineColor;
			ctx.beginPath();
			ctx.moveTo(yAxisPosX,xAxisPosY+5);
			ctx.lineTo(yAxisPosX,5);
			ctx.stroke();
			
			ctx.textAlign = "right";
			ctx.textBaseline = "middle";
			for (var j=0; j<calculatedScale.steps; j++){
				ctx.beginPath();
				ctx.moveTo(yAxisPosX-3,xAxisPosY - ((j+1) * scaleHop));
				if (config.scaleShowGridLines){
					ctx.lineWidth = config.scaleGridLineWidth;
					ctx.strokeStyle = config.scaleGridLineColor;
					ctx.lineTo(yAxisPosX + xAxisLength + 5,xAxisPosY - ((j+1) * scaleHop));					
				}
				else{
					ctx.lineTo(yAxisPosX-0.5,xAxisPosY - ((j+1) * scaleHop));
				}
				
				ctx.stroke();
				
				if (config.scaleShowLabels){
					ctx.fillText(calculatedScale.labels[j],yAxisPosX-8,xAxisPosY - ((j+1) * scaleHop));
				}
			}
			
			
		}
		function calculateXAxisSize(){
			var longestText = 1;
			//if we are showing the labels
			if (config.scaleShowLabels){
				ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
				for (var i=0; i<calculatedScale.labels.length; i++){
					var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
					longestText = (measuredText > longestText)? measuredText : longestText;
				}
				//Add a little extra padding from the y axis
				longestText +=10;
			}
			xAxisLength = width - longestText - widestXLabel;
			valueHop = Math.floor(xAxisLength/(data.labels.length-1));	
				
			yAxisPosX = width-widestXLabel/2-xAxisLength;
			xAxisPosY = scaleHeight + config.scaleFontSize/2;				
		}		
		function calculateDrawingSizes(){
			maxSize = height;

			//Need to check the X axis first - measure the length of each text metric, and figure out if we need to rotate by 45 degrees.
			ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
			widestXLabel = 1;
			for (var i=0; i<data.labels.length; i++){
				var textLength = ctx.measureText(data.labels[i]).width;
				//If the text length is longer - make that equal to longest text!
				widestXLabel = (textLength > widestXLabel)? textLength : widestXLabel;
			}
			if (width/data.labels.length < widestXLabel){
				rotateLabels = 45;
				if (width/data.labels.length < Math.cos(rotateLabels) * widestXLabel){
					rotateLabels = 90;
					maxSize -= widestXLabel; 
				}
				else{
					maxSize -= Math.sin(rotateLabels) * widestXLabel;
				}
			}
			else{
				maxSize -= config.scaleFontSize;
			}
			
			//Add a little padding between the x line and the text
			maxSize -= 5;
			
			
			labelHeight = config.scaleFontSize;
			
			maxSize -= labelHeight;
			//Set 5 pixels greater than the font size to allow for a little padding from the X axis.
			
			scaleHeight = maxSize;
			
			//Then get the area above we can safely draw on.
			
		}		
		function getValueBounds() {
			var upperValue = Number.MIN_VALUE;
			var lowerValue = Number.MAX_VALUE;
			for (var i=0; i<data.datasets.length; i++){
				for (var j=0; j<data.datasets[i].data.length; j++){
					if ( data.datasets[i].data[j] > upperValue) { upperValue = data.datasets[i].data[j] };
					if ( data.datasets[i].data[j] < lowerValue) { lowerValue = data.datasets[i].data[j] };
				}
			};
	
			var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
			var minSteps = Math.floor((scaleHeight / labelHeight*0.5));
			
			return {
				maxValue : upperValue,
				minValue : lowerValue,
				maxSteps : maxSteps,
				minSteps : minSteps
			};
			
	
		}

		
	}
	
	var Bar = function(data,config,ctx){
		var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop,widestXLabel, xAxisLength,yAxisPosX,xAxisPosY,barWidth, rotateLabels = 0;
			
		calculateDrawingSizes();
		
		valueBounds = getValueBounds();
		//Check and set the scale
		labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : "";
		if (!config.scaleOverride){
			
			calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
		}
		else {
			calculatedScale = {
				steps : config.scaleSteps,
				stepValue : config.scaleStepWidth,
				graphMin : config.scaleStartValue,
				labels : []
			}
			populateLabels(labelTemplateString, calculatedScale.labels,calculatedScale.steps,config.scaleStartValue,config.scaleStepWidth);
		}
		
		scaleHop = Math.floor(scaleHeight/calculatedScale.steps);
		calculateXAxisSize();
		animationLoop(config,drawScale,drawBars,ctx);		
		
		function drawBars(animPc){
			ctx.lineWidth = config.barStrokeWidth;
			for (var i=0; i<data.datasets.length; i++){
					ctx.fillStyle = data.datasets[i].fillColor;
					ctx.strokeStyle = data.datasets[i].strokeColor;
				for (var j=0; j<data.datasets[i].data.length; j++){
					var barOffset = yAxisPosX + config.barValueSpacing + valueHop*j + barWidth*i + config.barDatasetSpacing*i + config.barStrokeWidth*i;
					
					ctx.beginPath();
					ctx.moveTo(barOffset, xAxisPosY);
					ctx.lineTo(barOffset, xAxisPosY - animPc*calculateOffset(data.datasets[i].data[j],calculatedScale,scaleHop)+(config.barStrokeWidth/2));
					ctx.lineTo(barOffset + barWidth, xAxisPosY - animPc*calculateOffset(data.datasets[i].data[j],calculatedScale,scaleHop)+(config.barStrokeWidth/2));
					ctx.lineTo(barOffset + barWidth, xAxisPosY);
					if(config.barShowStroke){
						ctx.stroke();
					}
					ctx.closePath();
					ctx.fill();
				}
			}
			
		}
		function drawScale(){
			//X axis line
			ctx.lineWidth = config.scaleLineWidth;
			ctx.strokeStyle = config.scaleLineColor;
			ctx.beginPath();
			ctx.moveTo(width-widestXLabel/2+5,xAxisPosY);
			ctx.lineTo(width-(widestXLabel/2)-xAxisLength-5,xAxisPosY);
			ctx.stroke();
			
			
			if (rotateLabels > 0){
				ctx.save();
				ctx.textAlign = "right";
			}
			else{
				ctx.textAlign = "center";
			}
			ctx.fillStyle = config.scaleFontColor;
			for (var i=0; i<data.labels.length; i++){
				ctx.save();
				if (rotateLabels > 0){
					ctx.translate(yAxisPosX + i*valueHop,xAxisPosY + config.scaleFontSize);
					ctx.rotate(-(rotateLabels * (Math.PI/180)));
					ctx.fillText(data.labels[i], 0,0);
					ctx.restore();
				}
				
				else{
					ctx.fillText(data.labels[i], yAxisPosX + i*valueHop + valueHop/2,xAxisPosY + config.scaleFontSize+3);					
				}

				ctx.beginPath();
				ctx.moveTo(yAxisPosX + (i+1) * valueHop, xAxisPosY+3);
				
				//Check i isnt 0, so we dont go over the Y axis twice.
					ctx.lineWidth = config.scaleGridLineWidth;
					ctx.strokeStyle = config.scaleGridLineColor;					
					ctx.lineTo(yAxisPosX + (i+1) * valueHop, 5);
				ctx.stroke();
			}
			
			//Y axis
			ctx.lineWidth = config.scaleLineWidth;
			ctx.strokeStyle = config.scaleLineColor;
			ctx.beginPath();
			ctx.moveTo(yAxisPosX,xAxisPosY+5);
			ctx.lineTo(yAxisPosX,5);
			ctx.stroke();
			
			ctx.textAlign = "right";
			ctx.textBaseline = "middle";
			for (var j=0; j<calculatedScale.steps; j++){
				ctx.beginPath();
				ctx.moveTo(yAxisPosX-3,xAxisPosY - ((j+1) * scaleHop));
				if (config.scaleShowGridLines){
					ctx.lineWidth = config.scaleGridLineWidth;
					ctx.strokeStyle = config.scaleGridLineColor;
					ctx.lineTo(yAxisPosX + xAxisLength + 5,xAxisPosY - ((j+1) * scaleHop));					
				}
				else{
					ctx.lineTo(yAxisPosX-0.5,xAxisPosY - ((j+1) * scaleHop));
				}
				
				ctx.stroke();
				if (config.scaleShowLabels){
					ctx.fillText(calculatedScale.labels[j],yAxisPosX-8,xAxisPosY - ((j+1) * scaleHop));
				}
			}
			
			
		}
		function calculateXAxisSize(){
			var longestText = 1;
			//if we are showing the labels
			if (config.scaleShowLabels){
				ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
				for (var i=0; i<calculatedScale.labels.length; i++){
					var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
					longestText = (measuredText > longestText)? measuredText : longestText;
				}
				//Add a little extra padding from the y axis
				longestText +=10;
			}
			xAxisLength = width - longestText - widestXLabel;
			valueHop = Math.floor(xAxisLength/(data.labels.length));	
			
			barWidth = (valueHop - config.scaleGridLineWidth*2 - (config.barValueSpacing*2) - (config.barDatasetSpacing*data.datasets.length-1) - ((config.barStrokeWidth/2)*data.datasets.length-1))/data.datasets.length;
			
			yAxisPosX = width-widestXLabel/2-xAxisLength;
			xAxisPosY = scaleHeight + config.scaleFontSize/2;				
		}		
		function calculateDrawingSizes(){
			maxSize = height;

			//Need to check the X axis first - measure the length of each text metric, and figure out if we need to rotate by 45 degrees.
			ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
			widestXLabel = 1;
			for (var i=0; i<data.labels.length; i++){
				var textLength = ctx.measureText(data.labels[i]).width;
				//If the text length is longer - make that equal to longest text!
				widestXLabel = (textLength > widestXLabel)? textLength : widestXLabel;
			}
			if (width/data.labels.length < widestXLabel){
				rotateLabels = 45;
				if (width/data.labels.length < Math.cos(rotateLabels) * widestXLabel){
					rotateLabels = 90;
					maxSize -= widestXLabel; 
				}
				else{
					maxSize -= Math.sin(rotateLabels) * widestXLabel;
				}
			}
			else{
				maxSize -= config.scaleFontSize;
			}
			
			//Add a little padding between the x line and the text
			maxSize -= 5;
			
			
			labelHeight = config.scaleFontSize;
			
			maxSize -= labelHeight;
			//Set 5 pixels greater than the font size to allow for a little padding from the X axis.
			
			scaleHeight = maxSize;
			
			//Then get the area above we can safely draw on.
			
		}		
		function getValueBounds() {
			var upperValue = Number.MIN_VALUE;
			var lowerValue = Number.MAX_VALUE;
			for (var i=0; i<data.datasets.length; i++){
				for (var j=0; j<data.datasets[i].data.length; j++){
					if ( data.datasets[i].data[j] > upperValue) { upperValue = data.datasets[i].data[j] };
					if ( data.datasets[i].data[j] < lowerValue) { lowerValue = data.datasets[i].data[j] };
				}
			};
	
			var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
			var minSteps = Math.floor((scaleHeight / labelHeight*0.5));
			
			return {
				maxValue : upperValue,
				minValue : lowerValue,
				maxSteps : maxSteps,
				minSteps : minSteps
			};
			
	
		}
	}
	
	function calculateOffset(val,calculatedScale,scaleHop){
		var outerValue = calculatedScale.steps * calculatedScale.stepValue;
		var adjustedValue = val - calculatedScale.graphMin;
		var scalingFactor = CapValue(adjustedValue/outerValue,1,0);
		return (scaleHop*calculatedScale.steps) * scalingFactor;
	}
	
	function animationLoop(config,drawScale,drawData,ctx){
		var animFrameAmount = (config.animation)? 1/CapValue(config.animationSteps,Number.MAX_VALUE,1) : 1,
			easingFunction = animationOptions[config.animationEasing],
			percentAnimComplete =(config.animation)? 0 : 1;
		
	
		
		if (typeof drawScale !== "function") drawScale = function(){};
		
		requestAnimFrame(animLoop);
		
		function animateFrame(){
			var easeAdjustedAnimationPercent =(config.animation)? CapValue(easingFunction(percentAnimComplete),null,0) : 1;
			clear(ctx);
			if(config.scaleOverlay){
				drawData(easeAdjustedAnimationPercent);
				drawScale();
			} else {
				drawScale();
				drawData(easeAdjustedAnimationPercent);
			}				
		}
		function animLoop(){
			//We need to check if the animation is incomplete (less than 1), or complete (1).
				percentAnimComplete += animFrameAmount;
				animateFrame();	
				//Stop the loop continuing forever
				if (percentAnimComplete <= 1){
					requestAnimFrame(animLoop);
				}
				else{
					if (typeof config.onAnimationComplete == "function") config.onAnimationComplete();
				}
			
		}		
		
	}

	//Declare global functions to be called within this namespace here.
	
	
	// shim layer with setTimeout fallback
	var requestAnimFrame = (function(){
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	function calculateScale(drawingHeight,maxSteps,minSteps,maxValue,minValue,labelTemplateString){
			var graphMin,graphMax,graphRange,stepValue,numberOfSteps,valueRange,rangeOrderOfMagnitude,decimalNum;
			
			valueRange = maxValue - minValue;
			
			rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);

        	graphMin = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
            
            graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
            
            graphRange = graphMax - graphMin;
            
            stepValue = Math.pow(10, rangeOrderOfMagnitude);
            
	        numberOfSteps = Math.round(graphRange / stepValue);
	        
	        //Compare number of steps to the max and min for that size graph, and add in half steps if need be.	        
	        while(numberOfSteps < minSteps || numberOfSteps > maxSteps) {
	        	if (numberOfSteps < minSteps){
			        stepValue /= 2;
			        numberOfSteps = Math.round(graphRange/stepValue);
		        }
		        else{
			        stepValue *=2;
			        numberOfSteps = Math.round(graphRange/stepValue);
		        }
	        };

	        var labels = [];
	        populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue);
		
	        return {
		        steps : numberOfSteps,
				stepValue : stepValue,
				graphMin : graphMin,
				labels : labels		        
		        
	        }
		
			function calculateOrderOfMagnitude(val){
			  return Math.floor(Math.log(val) / Math.LN10);
			}		


	}

    //Populate an array of all the labels by interpolating the string.
    function populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue) {
        if (labelTemplateString) {
            //Fix floating point errors by setting to fixed the on the same decimal as the stepValue.
            for (var i = 1; i < numberOfSteps + 1; i++) {
                labels.push(tmpl(labelTemplateString, {value: (graphMin + (stepValue * i)).toFixed(getDecimalPlaces(stepValue))}));
            }
        }
    }
	
	//Max value from array
	function Max( array ){
		return Math.max.apply( Math, array );
	};
	//Min value from array
	function Min( array ){
		return Math.min.apply( Math, array );
	};
	//Default if undefined
	function Default(userDeclared,valueIfFalse){
		if(!userDeclared){
			return valueIfFalse;
		} else {
			return userDeclared;
		}
	};
	//Is a number function
	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	//Apply cap a value at a high or low number
	function CapValue(valueToCap, maxValue, minValue){
		if(isNumber(maxValue)) {
			if( valueToCap > maxValue ) {
				return maxValue;
			}
		}
		if(isNumber(minValue)){
			if ( valueToCap < minValue ){
				return minValue;
			}
		}
		return valueToCap;
	}
	function getDecimalPlaces (num){
		var numberOfDecimalPlaces;
		if (num%1!=0){
			return num.toString().split(".")[1].length
		}
		else{
			return 0;
		}
		
	} 
	
	function mergeChartConfig(defaults,userDefined){
		var returnObj = {};
	    for (var attrname in defaults) { returnObj[attrname] = defaults[attrname]; }
	    for (var attrname in userDefined) { returnObj[attrname] = userDefined[attrname]; }
	    return returnObj;
	}
	
	//Javascript micro templating by John Resig - source at http://ejohn.org/blog/javascript-micro-templating/
	  var cache = {};
	 
	  function tmpl(str, data){
	    // Figure out if we're getting a template, or if we need to
	    // load the template - and be sure to cache the result.
	    var fn = !/\W/.test(str) ?
	      cache[str] = cache[str] ||
	        tmpl(document.getElementById(str).innerHTML) :
	     
	      // Generate a reusable function that will serve as a template
	      // generator (and which will be cached).
	      new Function("obj",
	        "var p=[],print=function(){p.push.apply(p,arguments);};" +
	       
	        // Introduce the data as local variables using with(){}
	        "with(obj){p.push('" +
	       
	        // Convert the template into pure JavaScript
	        str
	          .replace(/[\r\t\n]/g, " ")
	          .split("<%").join("\t")
	          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
	          .replace(/\t=(.*?)%>/g, "',$1,'")
	          .split("\t").join("');")
	          .split("%>").join("p.push('")
	          .split("\r").join("\\'")
	      + "');}return p.join('');");
	   
	    // Provide some basic currying to the user
	    return data ? fn( data ) : fn;
	  };
}



/*
 *               ~ CLNDR v1.1.0 ~
 * ==============================================
 *       https://github.com/kylestetz/CLNDR
 * ==============================================
 *  created by kyle stetz (github.com/kylestetz)
 *        &available under the MIT license
 * http://opensource.org/licenses/mit-license.php
 * ==============================================
 *
 * This is the fully-commented development version of CLNDR.
 * For the production version, check out clndr.min.js
 * at https://github.com/kylestetz/CLNDR
 *
 * This work is based on the
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {

  // This is the default calendar template. This can be overridden.
  var clndrTemplate = "<div class='clndr-controls'>" +
    "<div class='clndr-control-button'><p class='clndr-previous-button'>previous</p></div><div class='month'><%= month %> <%= year %></div><div class='clndr-control-button rightalign'><p class='clndr-next-button'>next</p></div>" +
    "</div>" +
  "<table class='clndr-table' border='0' cellspacing='0' cellpadding='0'>" +
    "<thead>" +
    "<tr class='header-days'>" +
    "<% for(var i = 0; i < daysOfTheWeek.length; i++) { %>" +
      "<td class='header-day'><%= daysOfTheWeek[i] %></td>" +
    "<% } %>" +
    "</tr>" +
    "</thead>" +
    "<tbody>" +
    "<% for(var i = 0; i < numberOfRows; i++){ %>" +
      "<tr>" +
      "<% for(var j = 0; j < 7; j++){ %>" +
      "<% var d = j + i * 7; %>" +
      "<td class='<%= days[d].classes %>'><div class='day-contents'><%= days[d].day %>" +
      "</div></td>" +
      "<% } %>" +
      "</tr>" +
    "<% } %>" +
    "</tbody>" +
  "</table>";

  var pluginName = 'clndr';

  var defaults = {
    template: clndrTemplate,
    weekOffset: 0,
    startWithMonth: null,
    clickEvents: {
      click: null,
      nextMonth: null,
      previousMonth: null,
      nextYear: null,
      previousYear: null,
      today: null,
      onMonthChange: null,
      onYearChange: null
    },
    targets: {
      nextButton: 'clndr-next-button',
      previousButton: 'clndr-previous-button',
      nextYearButton: 'clndr-next-year-button',
      previousYearButton: 'clndr-previous-year-button',
      todayButton: 'clndr-today-button',
      day: 'day',
      empty: 'empty'
    },
    events: [],
    extras: null,
    dateParameter: 'date',
    multiDayEvents: null,
    doneRendering: null,
    render: null,
    daysOfTheWeek: null,
    showAdjacentMonths: true,
    adjacentDaysChangeMonth: false,
    ready: null,
    constraints: null
  };

  // The actual plugin constructor
  function Clndr( element, options ) {
    this.element = element;

    // merge the default options with user-provided options
    this.options = $.extend(true, {}, defaults, options);

    // if there are events, we should run them through our addMomentObjectToEvents function
    // which will add a date object that we can use to make life easier. This is only necessary
    // when events are provided on instantiation, since our setEvents function uses addMomentObjectToEvents.
    if(this.options.events.length) {
      if(this.options.multiDayEvents) {
        this.options.events = this.addMultiDayMomentObjectsToEvents(this.options.events);
      } else {
        this.options.events = this.addMomentObjectToEvents(this.options.events);
      }
    }

    // this object will store a reference to the current month.
    // it's a moment object, which allows us to poke at it a little if we need to.
    // this will serve as the basis for switching between months & is the go-to
    // internally if we want to know which month we're currently at.
    if(this.options.startWithMonth) {
      this.month = moment(this.options.startWithMonth).startOf('month');
    } else {
      this.month = moment().startOf('month');
    }

    // if we've got constraints set, make sure the month is within them.
    if(this.options.constraints) {
      // first check if the start date exists & is later than now.
      if(this.options.constraints.startDate) {
        var startMoment = moment(this.options.constraints.startDate);
        if(this.month.isBefore(startMoment, 'month')) {
          this.month.set('month', startMoment.month());
          this.month.set('year', startMoment.year());
        }
      }
      // make sure the month (whether modified or not) is before the endDate
      if(this.options.constraints.endDate) {
        var endMoment = moment(this.options.constraints.endDate);
        if(this.month.isAfter(endMoment, 'month')) {
          this.month.set('month', endMoment.month()).set('year', endMoment.year());
        }
      }
    }

    this._defaults = defaults;
    this._name = pluginName;

    // Some first-time initialization -> day of the week offset,
    // template compiling, making and storing some elements we'll need later,
    // & event handling for the controller.
    this.init();
  }

  Clndr.prototype.init = function () {
    // create the days of the week using moment's current language setting
    this.daysOfTheWeek = this.options.daysOfTheWeek || [];
    if(!this.options.daysOfTheWeek) {
      this.daysOfTheWeek = [];
      for(var i = 0; i < 7; i++) {
        this.daysOfTheWeek.push( moment().weekday(i).format('dd').charAt(0) );
      }
    }
    // shuffle the week if there's an offset
    if(this.options.weekOffset) {
      this.daysOfTheWeek = this.shiftWeekdayLabels(this.options.weekOffset);
    }

    // quick & dirty test to make sure rendering is possible.
    if( !$.isFunction(this.options.render) ) {
      this.options.render = null;
      if (typeof _ === 'undefined') {
        throw new Error("Underscore was not found. Please include underscore.js OR provide a custom render function.");
      }
      else {
        // we're just going ahead and using underscore here if no render method has been supplied.
        this.compiledClndrTemplate = _.template(this.options.template);
      }
    }

    // create the parent element that will hold the plugin & save it for later
    $(this.element).html("<div class='clndr'></div>");
    this.calendarContainer = $('.clndr', this.element);

    // attach event handlers for clicks on buttons/cells
    this.bindEvents();

    // do a normal render of the calendar template
    this.render();

    // if a ready callback has been provided, call it.
    if(this.options.ready) {
      this.options.ready.apply(this, []);
    }
  };

  Clndr.prototype.shiftWeekdayLabels = function(offset) {
    var days = this.daysOfTheWeek;
    for(var i = 0; i < offset; i++) {
      days.push( days.shift() );
    }
    return days;
  };

  // This is where the magic happens. Given a moment object representing the current month,
  // an array of calendarDay objects is constructed that contains appropriate events and
  // classes depending on the circumstance.
  Clndr.prototype.createDaysObject = function(currentMonth) {
    // this array will hold numbers for the entire grid (even the blank spaces)
    daysArray = [];
    var date = currentMonth.startOf('month');

    // filter the events list (if it exists) to events that are happening last month, this month and next month (within the current grid view)
    this.eventsLastMonth = [];
    this.eventsThisMonth = [];
    this.eventsNextMonth = [];

    if(this.options.events.length) {

      // MULTI-DAY EVENT PARSING
      // if we're using multi-day events, the start or end must be in the current month
      if(this.options.multiDayEvents) {
        this.eventsThisMonth = $(this.options.events).filter( function() {
          return this._clndrStartDateObject.format("YYYY-MM") == currentMonth.format("YYYY-MM")
          || this._clndrEndDateObject.format("YYYY-MM") == currentMonth.format("YYYY-MM");
        }).toArray();

        if(this.options.showAdjacentMonths) {
          var lastMonth = currentMonth.clone().subtract('months', 1);
          var nextMonth = currentMonth.clone().add('months', 1);
          this.eventsLastMonth = $(this.options.events).filter( function() {
            return this._clndrStartDateObject.format("YYYY-MM") == lastMonth.format("YYYY-MM")
          || this._clndrEndDateObject.format("YYYY-MM") == lastMonth.format("YYYY-MM");
          }).toArray();

          this.eventsNextMonth = $(this.options.events).filter( function() {
            return this._clndrStartDateObject.format("YYYY-MM") == nextMonth.format("YYYY-MM")
          || this._clndrEndDateObject.format("YYYY-MM") == nextMonth.format("YYYY-MM");
          }).toArray();
        }
      }

      // SINGLE-DAY EVENT PARSING
      // if we're using single-day events, use _clndrDateObject
      else {
        this.eventsThisMonth = $(this.options.events).filter( function() {
          return this._clndrDateObject.format("YYYY-MM") == currentMonth.format("YYYY-MM");
        }).toArray();

        // filter the adjacent months as well, if the option is true
        if(this.options.showAdjacentMonths) {
          var lastMonth = currentMonth.clone().subtract('months', 1);
          var nextMonth = currentMonth.clone().add('months', 1);
          this.eventsLastMonth = $(this.options.events).filter( function() {
            return this._clndrDateObject.format("YYYY-MM") == lastMonth.format("YYYY-MM");
          }).toArray();

          this.eventsNextMonth = $(this.options.events).filter( function() {
            return this._clndrDateObject.format("YYYY-MM") == nextMonth.format("YYYY-MM");
          }).toArray();
        }
      }
    }

    // if diff is greater than 0, we'll have to fill in last days of the previous month
    // to account for the empty boxes in the grid.
    // we also need to take into account the weekOffset parameter
    var diff = date.weekday() - this.options.weekOffset;
    if(diff < 0) diff += 7;

    if(this.options.showAdjacentMonths) {
      for(var i = 0; i < diff; i++) {
        var day = moment([currentMonth.year(), currentMonth.month(), i - diff + 1]);
        daysArray.push( this.createDayObject(day, this.eventsLastMonth) );
      }
    } else {
      for(var i = 0; i < diff; i++) {
        daysArray.push( this.calendarDay({ classes: this.options.targets.empty + " last-month" }) );
      }
    }

    // now we push all of the days in a month
    var numOfDays = date.daysInMonth();
    for(var i = 1; i <= numOfDays; i++) {
      var day = moment([currentMonth.year(), currentMonth.month(), i]);
      daysArray.push(this.createDayObject(day, this.eventsThisMonth) )
    }

    // ...and if there are any trailing blank boxes, fill those in
    // with the next month first days
    if(this.options.showAdjacentMonths) {
      i = 1;
      while(daysArray.length % 7 !== 0) {
        var day = moment([currentMonth.year(), currentMonth.month(), numOfDays + i]);
        daysArray.push( this.createDayObject(day, this.eventsNextMonth) );
        i++;
      }
    } else {
      i = 1;
      while(daysArray.length % 7 !== 0) {
        daysArray.push( this.calendarDay({ classes: this.options.targets.empty + " next-month" }) );
        i++;
      }
    }

    return daysArray;
  };

  Clndr.prototype.createDayObject = function(day, monthEvents) {
    var eventsToday = [];
    var now = moment();
    var self = this;

    var j = 0, l = monthEvents.length;
    for(j; j < l; j++) {
      // keep in mind that the events here already passed the month/year test.
      // now all we have to compare is the moment.date(), which returns the day of the month.
      if(self.options.multiDayEvents) {
        var start = monthEvents[j]._clndrStartDateObject;
        var end = monthEvents[j]._clndrEndDateObject;
        // if today is the same day as start or is after the start, and
        // if today is the same day as the end or before the end ...
        // woohoo semantics!
        if( ( day.isSame(start, 'day') || day.isAfter(start, 'day') ) &&
          ( day.isSame(end, 'day') || day.isBefore(end, 'day') ) ) {
          eventsToday.push( monthEvents[j] );
        }
      } else {
        if( monthEvents[j]._clndrDateObject.date() == day.date() ) {
          eventsToday.push( monthEvents[j] );
        }
      }
    }

    var extraClasses = "";

    if(now.format("YYYY-MM-DD") == day.format("YYYY-MM-DD")) {
       extraClasses += " today";
    }
    if(day.isBefore(now, 'day')) {
      extraClasses += " past";
    }
    if(eventsToday.length) {
       extraClasses += " event";
    }
    if(this.month.month() > day.month()) {
       extraClasses += " adjacent-month";

       this.month.year() === day.year()
           ? extraClasses += " last-month"
           : extraClasses += " next-month";

    } else if(this.month.month() < day.month()) {
       extraClasses += " adjacent-month";

       this.month.year() === day.year()
           ? extraClasses += " next-month"
           : extraClasses += " last-month";
    }

    // if there are constraints, we need to add the inactive class to the days outside of them
    if(this.options.constraints) {
      if(this.options.constraints.startDate && day.isBefore(moment( this.options.constraints.startDate ))) {
        extraClasses += " inactive";
      }
      if(this.options.constraints.endDate && day.isAfter(moment( this.options.constraints.endDate ))) {
        extraClasses += " inactive";
      }
    }

    // validate moment date
    if (!day.isValid() && day.hasOwnProperty('_d') && day._d != undefined) {
        day = moment(day._d);
    }

    // we're moving away from using IDs in favor of classes, since when
    // using multiple calendars on a page we are technically violating the
    // uniqueness of IDs.
    extraClasses += " calendar-day-" + day.format("YYYY-MM-DD");

    return this.calendarDay({
      day: day.date(),
      classes: this.options.targets.day + extraClasses,
      events: eventsToday,
      date: day
    });
  };

  Clndr.prototype.render = function() {
    // get rid of the previous set of calendar parts.
    // TODO: figure out if this is the right way to ensure proper garbage collection?
    this.calendarContainer.children().remove();
    // get an array of days and blank spaces
    var days = this.createDaysObject(this.month);
    // this is to prevent a scope/naming issue between this.month and data.month
    var currentMonth = this.month;

    var data = {
      daysOfTheWeek: this.daysOfTheWeek,
      numberOfRows: Math.ceil(days.length / 7),
      days: days,
      month: this.month.format('MMMM'),
      year: this.month.year(),
      eventsThisMonth: this.eventsThisMonth,
      eventsLastMonth: this.eventsLastMonth,
      eventsNextMonth: this.eventsNextMonth,
      extras: this.options.extras
    };

    // render the calendar with the data above & bind events to its elements
    if(!this.options.render) {
      this.calendarContainer.html(this.compiledClndrTemplate(data));
    } else {
      this.calendarContainer.html(this.options.render.apply(this, [data]));
    }

    // if there are constraints, we need to add the 'inactive' class to the controls
    if(this.options.constraints) {
      // in the interest of clarity we're just going to remove all inactive classes and re-apply them each render.
      for(target in this.options.targets) {
        if(target != this.options.targets.day) {
          this.element.find('.' + this.options.targets[target]).toggleClass('inactive', false);
        }
      }

      var start = null;
      var end = null;

      if(this.options.constraints.startDate) {
        start = moment(this.options.constraints.startDate);
      }
      if(this.options.constraints.endDate) {
        end = moment(this.options.constraints.endDate);
      }
      // deal with the month controls first.
      // are we at the start month?
      if(start && this.month.isSame( start, 'month' )) {
        this.element.find('.' + this.options.targets.previousButton).toggleClass('inactive', true);
      }
      // are we at the end month?
      if(end && this.month.isSame( end, 'month' )) {
        this.element.find('.' + this.options.targets.nextButton).toggleClass('inactive', true);
      }
      // what's last year looking like?
      if(start && moment(start).subtract('years', 1).isBefore(moment(this.month).subtract('years', 1)) ) {
        this.element.find('.' + this.options.targets.previousYearButton).toggleClass('inactive', true);
      }
      // how about next year?
      if(end && moment(end).add('years', 1).isAfter(moment(this.month).add('years', 1)) ) {
        this.element.find('.' + this.options.targets.nextYearButton).toggleClass('inactive', true);
      }
      // today? we could put this in init(), but we want to support the user changing the constraints on a living instance.
      if(( start && start.isAfter( moment(), 'month' ) ) || ( end && end.isBefore( moment(), 'month' ) )) {
        this.element.find('.' + this.options.targets.today).toggleClass('inactive', true);
      }
    }


    if(this.options.doneRendering) {
      this.options.doneRendering.apply(this, []);
    }
  };

  Clndr.prototype.bindEvents = function() {
    var $container = $(this.element);
    var self = this;

    // target the day elements and give them click events
    $container.on('click', '.'+this.options.targets.day, function(event) {
      if(self.options.clickEvents.click) {
        var target = self.buildTargetObject(event.currentTarget, true);
        self.options.clickEvents.click.apply(self, [target]);
      }
      // if adjacentDaysChangeMonth is on, we need to change the month here.
      if(self.options.adjacentDaysChangeMonth) {
        if($(event.currentTarget).is(".last-month")) {
          self.backActionWithContext(self);
        } else if($(event.currentTarget).is(".next-month")) {
          self.forwardActionWithContext(self);
        }
      }
    });
    // target the empty calendar boxes as well
    $container.on('click', '.'+this.options.targets.empty, function(event) {
      if(self.options.clickEvents.click) {
        var target = self.buildTargetObject(event.currentTarget, false);
        self.options.clickEvents.click.apply(self, [target]);
      }
      if(self.options.adjacentDaysChangeMonth) {
        if($(event.currentTarget).is(".last-month")) {
          self.backActionWithContext(self);
        } else if($(event.currentTarget).is(".next-month")) {
          self.forwardActionWithContext(self);
        }
      }
    });

    // bind the previous, next and today buttons
    $container
      .on('click', '.'+this.options.targets.previousButton, { context: this }, this.backAction)
      .on('click', '.'+this.options.targets.nextButton, { context: this }, this.forwardAction)
      .on('click', '.'+this.options.targets.todayButton, { context: this }, this.todayAction)
      .on('click', '.'+this.options.targets.nextYearButton, { context: this }, this.nextYearAction)
      .on('click', '.'+this.options.targets.previousYearButton, { context: this }, this.previousYearAction);
  }

  // If the user provided a click callback we'd like to give them something nice to work with.
  // buildTargetObject takes the DOM element that was clicked and returns an object with
  // the DOM element, events, and the date (if the latter two exist). Currently it is based on the id,
  // however it'd be nice to use a data- attribute in the future.
  Clndr.prototype.buildTargetObject = function(currentTarget, targetWasDay) {
    // This is our default target object, assuming we hit an empty day with no events.
    var target = {
      element: currentTarget,
      events: [],
      date: null
    };
    // did we click on a day or just an empty box?
    if(targetWasDay) {
      var dateString;

      // Our identifier is in the list of classNames. Find it!
      var classNameIndex = currentTarget.className.indexOf('calendar-day-');
      if(classNameIndex !== 0) {
        // our unique identifier is always 23 characters long.
        // If this feels a little wonky, that's probably because it is.
        // Open to suggestions on how to improve this guy.
        dateString = currentTarget.className.substring(classNameIndex + 13, classNameIndex + 23);
        target.date = moment(dateString);
      } else {
        target.date = null;
      }

      // do we have events?
      if(this.options.events) {
        // are any of the events happening today?
        if(this.options.multiDayEvents) {
          target.events = $.makeArray( $(this.options.events).filter( function() {
            // filter the dates down to the ones that match.
            return ( ( target.date.isSame(this._clndrStartDateObject, 'day') || target.date.isAfter(this._clndrStartDateObject, 'day') ) &&
              ( target.date.isSame(this._clndrEndDateObject, 'day') || target.date.isBefore(this._clndrEndDateObject, 'day') ) );
          }) );
        } else {
          target.events = $.makeArray( $(this.options.events).filter( function() {
            // filter the dates down to the ones that match.
            return this._clndrDateObject.format('YYYY-MM-DD') == dateString;
          }) );
        }
      }
    }

    return target;
  }

  // the click handlers in bindEvents need a context, so these are wrappers
  // to the actual functions. Todo: better way to handle this?
  Clndr.prototype.forwardAction = function(event) {
    var self = event.data.context;
    self.forwardActionWithContext(self);
  };

  Clndr.prototype.backAction = function(event) {
    var self = event.data.context;
    self.backActionWithContext(self);
  };

  // These are called directly, except for in the bindEvent click handlers,
  // where forwardAction and backAction proxy to these guys.
  Clndr.prototype.backActionWithContext = function(self) {
    // before we do anything, check if there is an inactive class on the month control.
    // if it does, we want to return and take no action.
    if(self.element.find('.' + self.options.targets.previousButton).hasClass('inactive')) {
      return;
    }

    // is subtracting one month going to switch the year?
    var yearChanged = !self.month.isSame( moment(self.month).subtract('months', 1), 'year');
    self.month.subtract('months', 1);

    self.render();

    if(self.options.clickEvents.previousMonth) {
      self.options.clickEvents.previousMonth.apply( self, [moment(self.month)] );
    }
    if(self.options.clickEvents.onMonthChange) {
      self.options.clickEvents.onMonthChange.apply( self, [moment(self.month)] );
    }
    if(yearChanged) {
      if(self.options.clickEvents.onYearChange) {
        self.options.clickEvents.onYearChange.apply( self, [moment(self.month)] );
      }
    }
  };

  Clndr.prototype.forwardActionWithContext = function(self) {
    // before we do anything, check if there is an inactive class on the month control.
    // if it does, we want to return and take no action.
    if(self.element.find('.' + self.options.targets.nextButton).hasClass('inactive')) {
      return;
    }

    // is adding one month going to switch the year?
    var yearChanged = !self.month.isSame( moment(self.month).add('months', 1), 'year');
    self.month.add('months', 1);

    self.render();

    if(self.options.clickEvents.nextMonth) {
      self.options.clickEvents.nextMonth.apply(self, [moment(self.month)]);
    }
    if(self.options.clickEvents.onMonthChange) {
      self.options.clickEvents.onMonthChange.apply(self, [moment(self.month)]);
    }
    if(yearChanged) {
      if(self.options.clickEvents.onYearChange) {
        self.options.clickEvents.onYearChange.apply( self, [moment(self.month)] );
      }
    }
  };

  Clndr.prototype.todayAction = function(event) {
    var self = event.data.context;

    // did we switch months when the today button was hit?
    var monthChanged = !self.month.isSame(moment(), 'month');
    var yearChanged = !self.month.isSame(moment(), 'year');

    self.month = moment().startOf('month');

    // fire the today event handler regardless of whether the month changed.
    if(self.options.clickEvents.today) {
      self.options.clickEvents.today.apply( self, [moment(self.month)] );
    }

    if(monthChanged) {
      // no need to re-render if we didn't change months.
      self.render();

      self.month = moment();
      // fire the onMonthChange callback
      if(self.options.clickEvents.onMonthChange) {
        self.options.clickEvents.onMonthChange.apply( self, [moment(self.month)] );
      }
      // maybe fire the onYearChange callback?
      if(yearChanged) {
        if(self.options.clickEvents.onYearChange) {
          self.options.clickEvents.onYearChange.apply( self, [moment(self.month)] );
        }
      }
    }
  };

  Clndr.prototype.nextYearAction = function(event) {
    var self = event.data.context;
    // before we do anything, check if there is an inactive class on the month control.
    // if it does, we want to return and take no action.
    if(self.element.find('.' + self.options.targets.nextYearButton).hasClass('inactive')) {
      return;
    }

    self.month.add('years', 1);
    self.render();

    if(self.options.clickEvents.nextYear) {
      self.options.clickEvents.nextYear.apply( self, [moment(self.month)] );
    }
    if(self.options.clickEvents.onMonthChange) {
      self.options.clickEvents.onMonthChange.apply( self, [moment(self.month)] );
    }
    if(self.options.clickEvents.onYearChange) {
      self.options.clickEvents.onYearChange.apply( self, [moment(self.month)] );
    }
  };

  Clndr.prototype.previousYearAction = function(event) {
    var self = event.data.context;
    // before we do anything, check if there is an inactive class on the month control.
    // if it does, we want to return and take no action.
    if(self.element.find('.' + self.options.targets.previousYear).hasClass('inactive')) {
      return;
    }

    self.month.subtract('years', 1);
    self.render();

    if(self.options.clickEvents.previousYear) {
      self.options.clickEvents.previousYear.apply( self, [moment(self.month)] );
    }
    if(self.options.clickEvents.onMonthChange) {
      self.options.clickEvents.onMonthChange.apply( self, [moment(self.month)] );
    }
    if(self.options.clickEvents.onYearChange) {
      self.options.clickEvents.onYearChange.apply( self, [moment(self.month)] );
    }
  };

  Clndr.prototype.forward = function(options) {
    this.month.add('months', 1);
    this.render();
    if(options && options.withCallbacks) {
      if(this.options.clickEvents.onMonthChange) {
        this.options.clickEvents.onMonthChange.apply( this, [moment(this.month)] );
      }

      // We entered a new year
      if (this.month.month() === 0 && this.options.clickEvents.onYearChange) {
        this.options.clickEvents.onYearChange.apply( this, [moment(this.month)] );
      }
    }

    return this;
  }

  Clndr.prototype.back = function(options) {
    this.month.subtract('months', 1);
    this.render();
    if(options && options.withCallbacks) {
      if(this.options.clickEvents.onMonthChange) {
        this.options.clickEvents.onMonthChange.apply( this, [moment(this.month)] );
      }

      // We went all the way back to previous year
      if (this.month.month() === 11 && this.options.clickEvents.onYearChange) {
        this.options.clickEvents.onYearChange.apply( this, [moment(this.month)] );
      }
    }

    return this;
  }

  // alternate names for convenience
  Clndr.prototype.next = function(options) {
    this.forward(options);
    return this;
  }

  Clndr.prototype.previous = function(options) {
    this.back(options);
    return this;
  }

  Clndr.prototype.setMonth = function(newMonth, options) {
    // accepts 0 - 11 or a full/partial month name e.g. "Jan", "February", "Mar"
    this.month.month(newMonth);
    this.render();
    if(options && options.withCallbacks) {
      if(this.options.clickEvents.onMonthChange) {
        this.options.clickEvents.onMonthChange.apply( this, [moment(this.month)] );
      }
    }
    return this;
  }

  Clndr.prototype.nextYear = function(options) {
    this.month.add('year', 1);
    this.render();
    if(options && options.withCallbacks) {
      if(this.options.clickEvents.onYearChange) {
        this.options.clickEvents.onYearChange.apply( this, [moment(this.month)] );
      }
    }
    return this;
  }

  Clndr.prototype.previousYear = function(options) {
    this.month.subtract('year', 1);
    this.render();
    if(options && options.withCallbacks) {
      if(this.options.clickEvents.onYearChange) {
        this.options.clickEvents.onYearChange.apply( this, [moment(this.month)] );
      }
    }
    return this;
  }

  Clndr.prototype.setYear = function(newYear, options) {
    this.month.year(newYear);
    this.render();
    if(options && options.withCallbacks) {
      if(this.options.clickEvents.onYearChange) {
        this.options.clickEvents.onYearChange.apply( this, [moment(this.month)] );
      }
    }
    return this;
  }

  Clndr.prototype.setEvents = function(events) {
    // go through each event and add a moment object
    if(this.options.multiDayEvents) {
      this.options.events = this.addMultiDayMomentObjectsToEvents(events);
    } else {
      this.options.events = this.addMomentObjectToEvents(events);
    }

    this.render();
    return this;
  };

  Clndr.prototype.addEvents = function(events) {
    // go through each event and add a moment object
    if(this.options.multiDayEvents) {
      this.options.events = $.merge(this.options.events, this.addMultiDayMomentObjectsToEvents(events));
    } else {
      this.options.events = $.merge(this.options.events, this.addMomentObjectToEvents(events));
    }

    this.render();
    return this;
  };

  Clndr.prototype.addMomentObjectToEvents = function(events) {
    var self = this;
    var i = 0, l = events.length;
    for(i; i < l; i++) {
      // stuff a _clndrDateObject in each event, which really, REALLY should not be
      // overriding any existing object... Man that would be weird.
      events[i]._clndrDateObject = moment( events[i][self.options.dateParameter] );
    }
    return events;
  }

  Clndr.prototype.addMultiDayMomentObjectsToEvents = function(events) {
    var self = this;
    var i = 0, l = events.length;
    for(i; i < l; i++) {
      events[i]._clndrStartDateObject = moment( events[i][self.options.multiDayEvents.startDate] );
      events[i]._clndrEndDateObject = moment( events[i][self.options.multiDayEvents.endDate] );
    }
    return events;
  }

  Clndr.prototype.calendarDay = function(options) {
    var defaults = { day: "", classes: this.options.targets.empty, events: [], date: null };
    return $.extend({}, defaults, options);
  }

  $.fn.clndr = function(options) {
    if( !$.data( this, 'plugin_clndr') ) {
      var clndr_instance = new Clndr(this, options);
      $.data(this, 'plugin_clndr', clndr_instance);
      return clndr_instance;
    }
  }

})( jQuery, window, document );

d3=function(){function n(n){return null!=n&&!isNaN(n)}function t(n){return n.length}function e(n){for(var t=1;n*t%1;)t*=10;return t}function r(n,t){try{for(var e in t)Object.defineProperty(n.prototype,e,{value:t[e],enumerable:!1})}catch(r){n.prototype=t}}function u(){}function i(){}function o(n,t,e){return function(){var r=e.apply(t,arguments);return r===t?n:r}}function a(n,t){if(t in n)return t;t=t.charAt(0).toUpperCase()+t.substring(1);for(var e=0,r=Do.length;r>e;++e){var u=Do[e]+t;if(u in n)return u}}function c(){}function l(){}function s(n){function t(){for(var t,r=e,u=-1,i=r.length;++u<i;)(t=r[u].on)&&t.apply(this,arguments);return n}var e=[],r=new u;return t.on=function(t,u){var i,o=r.get(t);return arguments.length<2?o&&o.on:(o&&(o.on=null,e=e.slice(0,i=e.indexOf(o)).concat(e.slice(i+1)),r.remove(t)),u&&e.push(r.set(t,{on:u})),n)},t}function f(){mo.event.preventDefault()}function h(){for(var n,t=mo.event;n=t.sourceEvent;)t=n;return t}function g(n){for(var t=new l,e=0,r=arguments.length;++e<r;)t[arguments[e]]=s(t);return t.of=function(e,r){return function(u){try{var i=u.sourceEvent=mo.event;u.target=n,mo.event=u,t[u.type].apply(e,r)}finally{mo.event=i}}},t}function p(n){return Lo(n,Ro),n}function d(n){return"function"==typeof n?n:function(){return Ho(n,this)}}function v(n){return"function"==typeof n?n:function(){return Fo(n,this)}}function m(n,t){function e(){this.removeAttribute(n)}function r(){this.removeAttributeNS(n.space,n.local)}function u(){this.setAttribute(n,t)}function i(){this.setAttributeNS(n.space,n.local,t)}function o(){var e=t.apply(this,arguments);null==e?this.removeAttribute(n):this.setAttribute(n,e)}function a(){var e=t.apply(this,arguments);null==e?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}return n=mo.ns.qualify(n),null==t?n.local?r:e:"function"==typeof t?n.local?a:o:n.local?i:u}function y(n){return n.trim().replace(/\s+/g," ")}function M(n){return new RegExp("(?:^|\\s+)"+mo.requote(n)+"(?:\\s+|$)","g")}function x(n,t){function e(){for(var e=-1;++e<u;)n[e](this,t)}function r(){for(var e=-1,r=t.apply(this,arguments);++e<u;)n[e](this,r)}n=n.trim().split(/\s+/).map(b);var u=n.length;return"function"==typeof t?r:e}function b(n){var t=M(n);return function(e,r){if(u=e.classList)return r?u.add(n):u.remove(n);var u=e.getAttribute("class")||"";r?(t.lastIndex=0,t.test(u)||e.setAttribute("class",y(u+" "+n))):e.setAttribute("class",y(u.replace(t," ")))}}function _(n,t,e){function r(){this.style.removeProperty(n)}function u(){this.style.setProperty(n,t,e)}function i(){var r=t.apply(this,arguments);null==r?this.style.removeProperty(n):this.style.setProperty(n,r,e)}return null==t?r:"function"==typeof t?i:u}function w(n,t){function e(){delete this[n]}function r(){this[n]=t}function u(){var e=t.apply(this,arguments);null==e?delete this[n]:this[n]=e}return null==t?e:"function"==typeof t?u:r}function S(n){return"function"==typeof n?n:(n=mo.ns.qualify(n)).local?function(){return xo.createElementNS(n.space,n.local)}:function(){return xo.createElementNS(this.namespaceURI,n)}}function E(n){return{__data__:n}}function k(n){return function(){return Oo(this,n)}}function A(n){return arguments.length||(n=mo.ascending),function(t,e){return t&&e?n(t.__data__,e.__data__):!t-!e}}function N(n,t){for(var e=0,r=n.length;r>e;e++)for(var u,i=n[e],o=0,a=i.length;a>o;o++)(u=i[o])&&t(u,o,e);return n}function T(n){return Lo(n,Io),n}function q(n){var t,e;return function(r,u,i){var o,a=n[i].update,c=a.length;for(i!=e&&(e=i,t=0),u>=t&&(t=u+1);!(o=a[t])&&++t<c;);return o}}function z(){var n=this.__transition__;n&&++n.active}function C(n,t,e){function r(){var t=this[o];t&&(this.removeEventListener(n,t,t.$),delete this[o])}function u(){var u=l(t,Mo(arguments));r.call(this),this.addEventListener(n,this[o]=u,u.$=e),u._=t}function i(){var t,e=new RegExp("^__on([^.]+)"+mo.requote(n)+"$");for(var r in this)if(t=r.match(e)){var u=this[r];this.removeEventListener(t[1],u,u.$),delete this[r]}}var o="__on"+n,a=n.indexOf("."),l=D;a>0&&(n=n.substring(0,a));var s=Zo.get(n);return s&&(n=s,l=j),a?t?u:r:t?c:i}function D(n,t){return function(e){var r=mo.event;mo.event=e,t[0]=this.__data__;try{n.apply(this,t)}finally{mo.event=r}}}function j(n,t){var e=D(n,t);return function(n){var t=this,r=n.relatedTarget;r&&(r===t||8&r.compareDocumentPosition(t))||e.call(t,n)}}function L(){var n=".dragsuppress-"+ ++Xo,t="touchmove"+n,e="selectstart"+n,r="dragstart"+n,u="click"+n,i=mo.select(_o).on(t,f).on(e,f).on(r,f),o=bo.style,a=o[Vo];return o[Vo]="none",function(t){function e(){i.on(u,null)}i.on(n,null),o[Vo]=a,t&&(i.on(u,function(){f(),e()},!0),setTimeout(e,0))}}function H(n,t){t.changedTouches&&(t=t.changedTouches[0]);var e=n.ownerSVGElement||n;if(e.createSVGPoint){var r=e.createSVGPoint();if(0>$o&&(_o.scrollX||_o.scrollY)){e=mo.select("body").append("svg").style({position:"absolute",top:0,left:0,margin:0,padding:0,border:"none"},"important");var u=e[0][0].getScreenCTM();$o=!(u.f||u.e),e.remove()}return $o?(r.x=t.pageX,r.y=t.pageY):(r.x=t.clientX,r.y=t.clientY),r=r.matrixTransform(n.getScreenCTM().inverse()),[r.x,r.y]}var i=n.getBoundingClientRect();return[t.clientX-i.left-n.clientLeft,t.clientY-i.top-n.clientTop]}function F(n){return n>0?1:0>n?-1:0}function P(n){return n>1?0:-1>n?Bo:Math.acos(n)}function O(n){return n>1?Jo:-1>n?-Jo:Math.asin(n)}function R(n){return((n=Math.exp(n))-1/n)/2}function Y(n){return((n=Math.exp(n))+1/n)/2}function I(n){return((n=Math.exp(2*n))-1)/(n+1)}function U(n){return(n=Math.sin(n/2))*n}function Z(){}function V(n,t,e){return new X(n,t,e)}function X(n,t,e){this.h=n,this.s=t,this.l=e}function $(n,t,e){function r(n){return n>360?n-=360:0>n&&(n+=360),60>n?i+(o-i)*n/60:180>n?o:240>n?i+(o-i)*(240-n)/60:i}function u(n){return Math.round(255*r(n))}var i,o;return n=isNaN(n)?0:(n%=360)<0?n+360:n,t=isNaN(t)?0:0>t?0:t>1?1:t,e=0>e?0:e>1?1:e,o=.5>=e?e*(1+t):e+t-e*t,i=2*e-o,ot(u(n+120),u(n),u(n-120))}function B(n,t,e){return new W(n,t,e)}function W(n,t,e){this.h=n,this.c=t,this.l=e}function J(n,t,e){return isNaN(n)&&(n=0),isNaN(t)&&(t=0),G(e,Math.cos(n*=Qo)*t,Math.sin(n)*t)}function G(n,t,e){return new K(n,t,e)}function K(n,t,e){this.l=n,this.a=t,this.b=e}function Q(n,t,e){var r=(n+16)/116,u=r+t/500,i=r-e/200;return u=tt(u)*sa,r=tt(r)*fa,i=tt(i)*ha,ot(rt(3.2404542*u-1.5371385*r-.4985314*i),rt(-.969266*u+1.8760108*r+.041556*i),rt(.0556434*u-.2040259*r+1.0572252*i))}function nt(n,t,e){return n>0?B(Math.atan2(e,t)*na,Math.sqrt(t*t+e*e),n):B(0/0,0/0,n)}function tt(n){return n>.206893034?n*n*n:(n-4/29)/7.787037}function et(n){return n>.008856?Math.pow(n,1/3):7.787037*n+4/29}function rt(n){return Math.round(255*(.00304>=n?12.92*n:1.055*Math.pow(n,1/2.4)-.055))}function ut(n){return ot(n>>16,255&n>>8,255&n)}function it(n){return ut(n)+""}function ot(n,t,e){return new at(n,t,e)}function at(n,t,e){this.r=n,this.g=t,this.b=e}function ct(n){return 16>n?"0"+Math.max(0,n).toString(16):Math.min(255,n).toString(16)}function lt(n,t,e){var r,u,i,o=0,a=0,c=0;if(r=/([a-z]+)\((.*)\)/i.exec(n))switch(u=r[2].split(","),r[1]){case"hsl":return e(parseFloat(u[0]),parseFloat(u[1])/100,parseFloat(u[2])/100);case"rgb":return t(gt(u[0]),gt(u[1]),gt(u[2]))}return(i=da.get(n))?t(i.r,i.g,i.b):(null!=n&&"#"===n.charAt(0)&&(4===n.length?(o=n.charAt(1),o+=o,a=n.charAt(2),a+=a,c=n.charAt(3),c+=c):7===n.length&&(o=n.substring(1,3),a=n.substring(3,5),c=n.substring(5,7)),o=parseInt(o,16),a=parseInt(a,16),c=parseInt(c,16)),t(o,a,c))}function st(n,t,e){var r,u,i=Math.min(n/=255,t/=255,e/=255),o=Math.max(n,t,e),a=o-i,c=(o+i)/2;return a?(u=.5>c?a/(o+i):a/(2-o-i),r=n==o?(t-e)/a+(e>t?6:0):t==o?(e-n)/a+2:(n-t)/a+4,r*=60):(r=0/0,u=c>0&&1>c?0:r),V(r,u,c)}function ft(n,t,e){n=ht(n),t=ht(t),e=ht(e);var r=et((.4124564*n+.3575761*t+.1804375*e)/sa),u=et((.2126729*n+.7151522*t+.072175*e)/fa),i=et((.0193339*n+.119192*t+.9503041*e)/ha);return G(116*u-16,500*(r-u),200*(u-i))}function ht(n){return(n/=255)<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)}function gt(n){var t=parseFloat(n);return"%"===n.charAt(n.length-1)?Math.round(2.55*t):t}function pt(n){return"function"==typeof n?n:function(){return n}}function dt(n){return n}function vt(n){return function(t,e,r){return 2===arguments.length&&"function"==typeof e&&(r=e,e=null),mt(t,e,n,r)}}function mt(n,t,e,r){function u(){var n,t=c.status;if(!t&&c.responseText||t>=200&&300>t||304===t){try{n=e.call(i,c)}catch(r){return o.error.call(i,r),void 0}o.load.call(i,n)}else o.error.call(i,c)}var i={},o=mo.dispatch("beforesend","progress","load","error"),a={},c=new XMLHttpRequest,l=null;return!_o.XDomainRequest||"withCredentials"in c||!/^(http(s)?:)?\/\//.test(n)||(c=new XDomainRequest),"onload"in c?c.onload=c.onerror=u:c.onreadystatechange=function(){c.readyState>3&&u()},c.onprogress=function(n){var t=mo.event;mo.event=n;try{o.progress.call(i,c)}finally{mo.event=t}},i.header=function(n,t){return n=(n+"").toLowerCase(),arguments.length<2?a[n]:(null==t?delete a[n]:a[n]=t+"",i)},i.mimeType=function(n){return arguments.length?(t=null==n?null:n+"",i):t},i.responseType=function(n){return arguments.length?(l=n,i):l},i.response=function(n){return e=n,i},["get","post"].forEach(function(n){i[n]=function(){return i.send.apply(i,[n].concat(Mo(arguments)))}}),i.send=function(e,r,u){if(2===arguments.length&&"function"==typeof r&&(u=r,r=null),c.open(e,n,!0),null==t||"accept"in a||(a.accept=t+",*/*"),c.setRequestHeader)for(var s in a)c.setRequestHeader(s,a[s]);return null!=t&&c.overrideMimeType&&c.overrideMimeType(t),null!=l&&(c.responseType=l),null!=u&&i.on("error",u).on("load",function(n){u(null,n)}),o.beforesend.call(i,c),c.send(null==r?null:r),i},i.abort=function(){return c.abort(),i},mo.rebind(i,o,"on"),null==r?i:i.get(yt(r))}function yt(n){return 1===n.length?function(t,e){n(null==t?e:null)}:n}function Mt(){var n=bt(),t=_t()-n;t>24?(isFinite(t)&&(clearTimeout(Ma),Ma=setTimeout(Mt,t)),ya=0):(ya=1,ba(Mt))}function xt(n,t,e){var r=arguments.length;2>r&&(t=0),3>r&&(e=Date.now()),xa.callback=n,xa.time=e+t}function bt(){var n=Date.now();for(xa=va;xa;)n>=xa.time&&(xa.flush=xa.callback(n-xa.time)),xa=xa.next;return n}function _t(){for(var n,t=va,e=1/0;t;)t.flush?t=n?n.next=t.next:va=t.next:(t.time<e&&(e=t.time),t=(n=t).next);return ma=n,e}function wt(n,t){var e=Math.pow(10,3*Math.abs(8-t));return{scale:t>8?function(n){return n/e}:function(n){return n*e},symbol:n}}function St(n,t){return t-(n?Math.ceil(Math.log(n)/Math.LN10):1)}function Et(n){return n+""}function kt(){}function At(n,t,e){var r=e.s=n+t,u=r-n,i=r-u;e.t=n-i+(t-u)}function Nt(n,t){n&&Da.hasOwnProperty(n.type)&&Da[n.type](n,t)}function Tt(n,t,e){var r,u=-1,i=n.length-e;for(t.lineStart();++u<i;)r=n[u],t.point(r[0],r[1],r[2]);t.lineEnd()}function qt(n,t){var e=-1,r=n.length;for(t.polygonStart();++e<r;)Tt(n[e],t,1);t.polygonEnd()}function zt(){function n(n,t){n*=Qo,t=t*Qo/2+Bo/4;var e=n-r,o=Math.cos(t),a=Math.sin(t),c=i*a,l=u*o+c*Math.cos(e),s=c*Math.sin(e);La.add(Math.atan2(s,l)),r=n,u=o,i=a}var t,e,r,u,i;Ha.point=function(o,a){Ha.point=n,r=(t=o)*Qo,u=Math.cos(a=(e=a)*Qo/2+Bo/4),i=Math.sin(a)},Ha.lineEnd=function(){n(t,e)}}function Ct(n){var t=n[0],e=n[1],r=Math.cos(e);return[r*Math.cos(t),r*Math.sin(t),Math.sin(e)]}function Dt(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function jt(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function Lt(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function Ht(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function Ft(n){var t=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}function Pt(n){return[Math.atan2(n[1],n[0]),O(n[2])]}function Ot(n,t){return Math.abs(n[0]-t[0])<Go&&Math.abs(n[1]-t[1])<Go}function Rt(n,t){n*=Qo;var e=Math.cos(t*=Qo);Yt(e*Math.cos(n),e*Math.sin(n),Math.sin(t))}function Yt(n,t,e){++Fa,Oa+=(n-Oa)/Fa,Ra+=(t-Ra)/Fa,Ya+=(e-Ya)/Fa}function It(){function n(n,u){n*=Qo;var i=Math.cos(u*=Qo),o=i*Math.cos(n),a=i*Math.sin(n),c=Math.sin(u),l=Math.atan2(Math.sqrt((l=e*c-r*a)*l+(l=r*o-t*c)*l+(l=t*a-e*o)*l),t*o+e*a+r*c);Pa+=l,Ia+=l*(t+(t=o)),Ua+=l*(e+(e=a)),Za+=l*(r+(r=c)),Yt(t,e,r)}var t,e,r;Ba.point=function(u,i){u*=Qo;var o=Math.cos(i*=Qo);t=o*Math.cos(u),e=o*Math.sin(u),r=Math.sin(i),Ba.point=n,Yt(t,e,r)}}function Ut(){Ba.point=Rt}function Zt(){function n(n,t){n*=Qo;var e=Math.cos(t*=Qo),o=e*Math.cos(n),a=e*Math.sin(n),c=Math.sin(t),l=u*c-i*a,s=i*o-r*c,f=r*a-u*o,h=Math.sqrt(l*l+s*s+f*f),g=r*o+u*a+i*c,p=h&&-P(g)/h,d=Math.atan2(h,g);Va+=p*l,Xa+=p*s,$a+=p*f,Pa+=d,Ia+=d*(r+(r=o)),Ua+=d*(u+(u=a)),Za+=d*(i+(i=c)),Yt(r,u,i)}var t,e,r,u,i;Ba.point=function(o,a){t=o,e=a,Ba.point=n,o*=Qo;var c=Math.cos(a*=Qo);r=c*Math.cos(o),u=c*Math.sin(o),i=Math.sin(a),Yt(r,u,i)},Ba.lineEnd=function(){n(t,e),Ba.lineEnd=Ut,Ba.point=Rt}}function Vt(){return!0}function Xt(n,t,e,r,u){var i=[],o=[];if(n.forEach(function(n){if(!((t=n.length-1)<=0)){var t,e=n[0],r=n[t];if(Ot(e,r)){u.lineStart();for(var a=0;t>a;++a)u.point((e=n[a])[0],e[1]);return u.lineEnd(),void 0}var c={point:e,points:n,other:null,visited:!1,entry:!0,subject:!0},l={point:e,points:[e],other:c,visited:!1,entry:!1,subject:!1};c.other=l,i.push(c),o.push(l),c={point:r,points:[r],other:null,visited:!1,entry:!1,subject:!0},l={point:r,points:[r],other:c,visited:!1,entry:!0,subject:!1},c.other=l,i.push(c),o.push(l)}}),o.sort(t),$t(i),$t(o),i.length){for(var a=0,c=e,l=o.length;l>a;++a)o[a].entry=c=!c;for(var s,f,h,g=i[0];;){for(s=g;s.visited;)if((s=s.next)===g)return;f=s.points,u.lineStart();do{if(s.visited=s.other.visited=!0,s.entry){if(s.subject)for(var a=0;a<f.length;a++)u.point((h=f[a])[0],h[1]);else r(s.point,s.next.point,1,u);s=s.next}else{if(s.subject){f=s.prev.points;for(var a=f.length;--a>=0;)u.point((h=f[a])[0],h[1])}else r(s.point,s.prev.point,-1,u);s=s.prev}s=s.other,f=s.points}while(!s.visited);u.lineEnd()}}}function $t(n){if(t=n.length){for(var t,e,r=0,u=n[0];++r<t;)u.next=e=n[r],e.prev=u,u=e;u.next=e=n[0],e.prev=u}}function Bt(n,t,e,r){return function(u,i){function o(t,e){var r=u(t,e);n(t=r[0],e=r[1])&&i.point(t,e)}function a(n,t){var e=u(n,t);v.point(e[0],e[1])}function c(){y.point=a,v.lineStart()}function l(){y.point=o,v.lineEnd()}function s(n,t){d.push([n,t]);var e=u(n,t);x.point(e[0],e[1])}function f(){x.lineStart(),d=[]}function h(){s(d[0][0],d[0][1]),x.lineEnd();var n,t=x.clean(),e=M.buffer(),r=e.length;if(d.pop(),p.push(d),d=null,r){if(1&t){n=e[0];var u,r=n.length-1,o=-1;for(i.lineStart();++o<r;)i.point((u=n[o])[0],u[1]);return i.lineEnd(),void 0}r>1&&2&t&&e.push(e.pop().concat(e.shift())),g.push(e.filter(Wt))}}var g,p,d,v=t(i),m=u.invert(r[0],r[1]),y={point:o,lineStart:c,lineEnd:l,polygonStart:function(){y.point=s,y.lineStart=f,y.lineEnd=h,g=[],p=[],i.polygonStart()},polygonEnd:function(){y.point=o,y.lineStart=c,y.lineEnd=l,g=mo.merge(g);var n=Kt(m,p);g.length?Xt(g,Gt,n,e,i):n&&(i.lineStart(),e(null,null,1,i),i.lineEnd()),i.polygonEnd(),g=p=null},sphere:function(){i.polygonStart(),i.lineStart(),e(null,null,1,i),i.lineEnd(),i.polygonEnd()}},M=Jt(),x=t(M);return y}}function Wt(n){return n.length>1}function Jt(){var n,t=[];return{lineStart:function(){t.push(n=[])},point:function(t,e){n.push([t,e])},lineEnd:c,buffer:function(){var e=t;return t=[],n=null,e},rejoin:function(){t.length>1&&t.push(t.pop().concat(t.shift()))}}}function Gt(n,t){return((n=n.point)[0]<0?n[1]-Jo-Go:Jo-n[1])-((t=t.point)[0]<0?t[1]-Jo-Go:Jo-t[1])}function Kt(n,t){var e=n[0],r=n[1],u=[Math.sin(e),-Math.cos(e),0],i=0,o=0;La.reset();for(var a=0,c=t.length;c>a;++a){var l=t[a],s=l.length;if(s)for(var f=l[0],h=f[0],g=f[1]/2+Bo/4,p=Math.sin(g),d=Math.cos(g),v=1;;){v===s&&(v=0),n=l[v];var m=n[0],y=n[1]/2+Bo/4,M=Math.sin(y),x=Math.cos(y),b=m-h,_=Math.abs(b)>Bo,w=p*M;if(La.add(Math.atan2(w*Math.sin(b),d*x+w*Math.cos(b))),i+=_?b+(b>=0?2:-2)*Bo:b,_^h>=e^m>=e){var S=jt(Ct(f),Ct(n));Ft(S);var E=jt(u,S);Ft(E);var k=(_^b>=0?-1:1)*O(E[2]);(r>k||r===k&&(S[0]||S[1]))&&(o+=_^b>=0?1:-1)}if(!v++)break;h=m,p=M,d=x,f=n}}return(-Go>i||Go>i&&0>La)^1&o}function Qt(n){var t,e=0/0,r=0/0,u=0/0;return{lineStart:function(){n.lineStart(),t=1},point:function(i,o){var a=i>0?Bo:-Bo,c=Math.abs(i-e);Math.abs(c-Bo)<Go?(n.point(e,r=(r+o)/2>0?Jo:-Jo),n.point(u,r),n.lineEnd(),n.lineStart(),n.point(a,r),n.point(i,r),t=0):u!==a&&c>=Bo&&(Math.abs(e-u)<Go&&(e-=u*Go),Math.abs(i-a)<Go&&(i-=a*Go),r=ne(e,r,i,o),n.point(u,r),n.lineEnd(),n.lineStart(),n.point(a,r),t=0),n.point(e=i,r=o),u=a},lineEnd:function(){n.lineEnd(),e=r=0/0},clean:function(){return 2-t}}}function ne(n,t,e,r){var u,i,o=Math.sin(n-e);return Math.abs(o)>Go?Math.atan((Math.sin(t)*(i=Math.cos(r))*Math.sin(e)-Math.sin(r)*(u=Math.cos(t))*Math.sin(n))/(u*i*o)):(t+r)/2}function te(n,t,e,r){var u;if(null==n)u=e*Jo,r.point(-Bo,u),r.point(0,u),r.point(Bo,u),r.point(Bo,0),r.point(Bo,-u),r.point(0,-u),r.point(-Bo,-u),r.point(-Bo,0),r.point(-Bo,u);else if(Math.abs(n[0]-t[0])>Go){var i=(n[0]<t[0]?1:-1)*Bo;u=e*i/2,r.point(-i,u),r.point(0,u),r.point(i,u)}else r.point(t[0],t[1])}function ee(n){function t(n,t){return Math.cos(n)*Math.cos(t)>i}function e(n){var e,i,c,l,s;return{lineStart:function(){l=c=!1,s=1},point:function(f,h){var g,p=[f,h],d=t(f,h),v=o?d?0:u(f,h):d?u(f+(0>f?Bo:-Bo),h):0;if(!e&&(l=c=d)&&n.lineStart(),d!==c&&(g=r(e,p),(Ot(e,g)||Ot(p,g))&&(p[0]+=Go,p[1]+=Go,d=t(p[0],p[1]))),d!==c)s=0,d?(n.lineStart(),g=r(p,e),n.point(g[0],g[1])):(g=r(e,p),n.point(g[0],g[1]),n.lineEnd()),e=g;else if(a&&e&&o^d){var m;v&i||!(m=r(p,e,!0))||(s=0,o?(n.lineStart(),n.point(m[0][0],m[0][1]),n.point(m[1][0],m[1][1]),n.lineEnd()):(n.point(m[1][0],m[1][1]),n.lineEnd(),n.lineStart(),n.point(m[0][0],m[0][1])))}!d||e&&Ot(e,p)||n.point(p[0],p[1]),e=p,c=d,i=v},lineEnd:function(){c&&n.lineEnd(),e=null},clean:function(){return s|(l&&c)<<1}}}function r(n,t,e){var r=Ct(n),u=Ct(t),o=[1,0,0],a=jt(r,u),c=Dt(a,a),l=a[0],s=c-l*l;if(!s)return!e&&n;var f=i*c/s,h=-i*l/s,g=jt(o,a),p=Ht(o,f),d=Ht(a,h);Lt(p,d);var v=g,m=Dt(p,v),y=Dt(v,v),M=m*m-y*(Dt(p,p)-1);if(!(0>M)){var x=Math.sqrt(M),b=Ht(v,(-m-x)/y);if(Lt(b,p),b=Pt(b),!e)return b;var _,w=n[0],S=t[0],E=n[1],k=t[1];w>S&&(_=w,w=S,S=_);var A=S-w,N=Math.abs(A-Bo)<Go,T=N||Go>A;if(!N&&E>k&&(_=E,E=k,k=_),T?N?E+k>0^b[1]<(Math.abs(b[0]-w)<Go?E:k):E<=b[1]&&b[1]<=k:A>Bo^(w<=b[0]&&b[0]<=S)){var q=Ht(v,(-m+x)/y);return Lt(q,p),[b,Pt(q)]}}}function u(t,e){var r=o?n:Bo-n,u=0;return-r>t?u|=1:t>r&&(u|=2),-r>e?u|=4:e>r&&(u|=8),u}var i=Math.cos(n),o=i>0,a=Math.abs(i)>Go,c=Te(n,6*Qo);return Bt(t,e,c,o?[0,-n]:[-Bo,n-Bo])}function re(n,t,e,r){function u(r,u){return Math.abs(r[0]-n)<Go?u>0?0:3:Math.abs(r[0]-e)<Go?u>0?2:1:Math.abs(r[1]-t)<Go?u>0?1:0:u>0?3:2}function i(n,t){return o(n.point,t.point)}function o(n,t){var e=u(n,1),r=u(t,1);return e!==r?e-r:0===e?t[1]-n[1]:1===e?n[0]-t[0]:2===e?n[1]-t[1]:t[0]-n[0]}function a(u,i){var o=i[0]-u[0],a=i[1]-u[1],c=[0,1];return Math.abs(o)<Go&&Math.abs(a)<Go?n<=u[0]&&u[0]<=e&&t<=u[1]&&u[1]<=r:ue(n-u[0],o,c)&&ue(u[0]-e,-o,c)&&ue(t-u[1],a,c)&&ue(u[1]-r,-a,c)?(c[1]<1&&(i[0]=u[0]+c[1]*o,i[1]=u[1]+c[1]*a),c[0]>0&&(u[0]+=c[0]*o,u[1]+=c[0]*a),!0):!1}return function(c){function l(n){for(var t=0,e=y.length,r=n[1],u=0;e>u;++u)for(var i,o=1,a=y[u],c=a.length,l=a[0];c>o;++o)i=a[o],l[1]<=r?i[1]>r&&s(l,i,n)>0&&++t:i[1]<=r&&s(l,i,n)<0&&--t,l=i;return 0!==t}function s(n,t,e){return(t[0]-n[0])*(e[1]-n[1])-(e[0]-n[0])*(t[1]-n[1])}function f(i,a,c,l){var s=0,f=0;if(null==i||(s=u(i,c))!==(f=u(a,c))||o(i,a)<0^c>0){do l.point(0===s||3===s?n:e,s>1?r:t);while((s=(s+c+4)%4)!==f)}else l.point(a[0],a[1])}function h(u,i){return u>=n&&e>=u&&i>=t&&r>=i}function g(n,t){h(n,t)&&c.point(n,t)}function p(){q.point=v,y&&y.push(M=[]),k=!0,E=!1,w=S=0/0}function d(){m&&(v(x,b),_&&E&&T.rejoin(),m.push(T.buffer())),q.point=g,E&&c.lineEnd()}function v(n,t){n=Math.max(-Ja,Math.min(Ja,n)),t=Math.max(-Ja,Math.min(Ja,t));var e=h(n,t);if(y&&M.push([n,t]),k)x=n,b=t,_=e,k=!1,e&&(c.lineStart(),c.point(n,t));else if(e&&E)c.point(n,t);else{var r=[w,S],u=[n,t];a(r,u)?(E||(c.lineStart(),c.point(r[0],r[1])),c.point(u[0],u[1]),e||c.lineEnd(),A=!1):e&&(c.lineStart(),c.point(n,t),A=!1)}w=n,S=t,E=e}var m,y,M,x,b,_,w,S,E,k,A,N=c,T=Jt(),q={point:g,lineStart:p,lineEnd:d,polygonStart:function(){c=T,m=[],y=[],A=!0},polygonEnd:function(){c=N,m=mo.merge(m);var t=l([n,r]),e=A&&t,u=m.length;(e||u)&&(c.polygonStart(),e&&(c.lineStart(),f(null,null,1,c),c.lineEnd()),u&&Xt(m,i,t,f,c),c.polygonEnd()),m=y=M=null}};return q}}function ue(n,t,e){if(Math.abs(t)<Go)return 0>=n;var r=n/t;if(t>0){if(r>e[1])return!1;r>e[0]&&(e[0]=r)}else{if(r<e[0])return!1;r<e[1]&&(e[1]=r)}return!0}function ie(n,t){function e(e,r){return e=n(e,r),t(e[0],e[1])}return n.invert&&t.invert&&(e.invert=function(e,r){return e=t.invert(e,r),e&&n.invert(e[0],e[1])}),e}function oe(n){var t=0,e=Bo/3,r=be(n),u=r(t,e);return u.parallels=function(n){return arguments.length?r(t=n[0]*Bo/180,e=n[1]*Bo/180):[180*(t/Bo),180*(e/Bo)]},u}function ae(n,t){function e(n,t){var e=Math.sqrt(i-2*u*Math.sin(t))/u;return[e*Math.sin(n*=u),o-e*Math.cos(n)]}var r=Math.sin(n),u=(r+Math.sin(t))/2,i=1+r*(2*u-r),o=Math.sqrt(i)/u;return e.invert=function(n,t){var e=o-t;return[Math.atan2(n,e)/u,O((i-(n*n+e*e)*u*u)/(2*u))]},e}function ce(){function n(n,t){Ka+=u*n-r*t,r=n,u=t}var t,e,r,u;rc.point=function(i,o){rc.point=n,t=r=i,e=u=o},rc.lineEnd=function(){n(t,e)}}function le(n,t){Qa>n&&(Qa=n),n>tc&&(tc=n),nc>t&&(nc=t),t>ec&&(ec=t)}function se(){function n(n,t){o.push("M",n,",",t,i)}function t(n,t){o.push("M",n,",",t),a.point=e}function e(n,t){o.push("L",n,",",t)}function r(){a.point=n}function u(){o.push("Z")}var i=fe(4.5),o=[],a={point:n,lineStart:function(){a.point=t},lineEnd:r,polygonStart:function(){a.lineEnd=u},polygonEnd:function(){a.lineEnd=r,a.point=n},pointRadius:function(n){return i=fe(n),a},result:function(){if(o.length){var n=o.join("");return o=[],n}}};return a}function fe(n){return"m0,"+n+"a"+n+","+n+" 0 1,1 0,"+-2*n+"a"+n+","+n+" 0 1,1 0,"+2*n+"z"}function he(n,t){Oa+=n,Ra+=t,++Ya}function ge(){function n(n,r){var u=n-t,i=r-e,o=Math.sqrt(u*u+i*i);Ia+=o*(t+n)/2,Ua+=o*(e+r)/2,Za+=o,he(t=n,e=r)}var t,e;ic.point=function(r,u){ic.point=n,he(t=r,e=u)}}function pe(){ic.point=he}function de(){function n(n,t){var e=n-r,i=t-u,o=Math.sqrt(e*e+i*i);Ia+=o*(r+n)/2,Ua+=o*(u+t)/2,Za+=o,o=u*n-r*t,Va+=o*(r+n),Xa+=o*(u+t),$a+=3*o,he(r=n,u=t)}var t,e,r,u;ic.point=function(i,o){ic.point=n,he(t=r=i,e=u=o)},ic.lineEnd=function(){n(t,e)}}function ve(n){function t(t,e){n.moveTo(t,e),n.arc(t,e,o,0,Wo)}function e(t,e){n.moveTo(t,e),a.point=r}function r(t,e){n.lineTo(t,e)}function u(){a.point=t}function i(){n.closePath()}var o=4.5,a={point:t,lineStart:function(){a.point=e},lineEnd:u,polygonStart:function(){a.lineEnd=i},polygonEnd:function(){a.lineEnd=u,a.point=t},pointRadius:function(n){return o=n,a},result:c};return a}function me(n){function t(t){function r(e,r){e=n(e,r),t.point(e[0],e[1])}function u(){M=0/0,S.point=o,t.lineStart()}function o(r,u){var o=Ct([r,u]),a=n(r,u);e(M,x,y,b,_,w,M=a[0],x=a[1],y=r,b=o[0],_=o[1],w=o[2],i,t),t.point(M,x)}function a(){S.point=r,t.lineEnd()}function c(){u(),S.point=l,S.lineEnd=s}function l(n,t){o(f=n,h=t),g=M,p=x,d=b,v=_,m=w,S.point=o}function s(){e(M,x,y,b,_,w,g,p,f,d,v,m,i,t),S.lineEnd=a,a()}var f,h,g,p,d,v,m,y,M,x,b,_,w,S={point:r,lineStart:u,lineEnd:a,polygonStart:function(){t.polygonStart(),S.lineStart=c},polygonEnd:function(){t.polygonEnd(),S.lineStart=u}};return S}function e(t,i,o,a,c,l,s,f,h,g,p,d,v,m){var y=s-t,M=f-i,x=y*y+M*M;if(x>4*r&&v--){var b=a+g,_=c+p,w=l+d,S=Math.sqrt(b*b+_*_+w*w),E=Math.asin(w/=S),k=Math.abs(Math.abs(w)-1)<Go?(o+h)/2:Math.atan2(_,b),A=n(k,E),N=A[0],T=A[1],q=N-t,z=T-i,C=M*q-y*z;(C*C/x>r||Math.abs((y*q+M*z)/x-.5)>.3||u>a*g+c*p+l*d)&&(e(t,i,o,a,c,l,N,T,k,b/=S,_/=S,w,v,m),m.point(N,T),e(N,T,k,b,_,w,s,f,h,g,p,d,v,m))}}var r=.5,u=Math.cos(30*Qo),i=16;return t.precision=function(n){return arguments.length?(i=(r=n*n)>0&&16,t):Math.sqrt(r)},t}function ye(n){this.stream=n}function Me(n){var t=me(function(t,e){return n([t*na,e*na])});return function(n){var e=new ye(n=t(n));return e.point=function(t,e){n.point(t*Qo,e*Qo)},e}}function xe(n){return be(function(){return n})()}function be(n){function t(n){return n=a(n[0]*Qo,n[1]*Qo),[n[0]*h+c,l-n[1]*h]}function e(n){return n=a.invert((n[0]-c)/h,(l-n[1])/h),n&&[n[0]*na,n[1]*na]}function r(){a=ie(o=Ee(m,y,M),i);var n=i(d,v);return c=g-n[0]*h,l=p+n[1]*h,u()}function u(){return s&&(s.valid=!1,s=null),t}var i,o,a,c,l,s,f=me(function(n,t){return n=i(n,t),[n[0]*h+c,l-n[1]*h]}),h=150,g=480,p=250,d=0,v=0,m=0,y=0,M=0,x=Wa,b=dt,_=null,w=null;return t.stream=function(n){return s&&(s.valid=!1),s=_e(x(o,f(b(n)))),s.valid=!0,s},t.clipAngle=function(n){return arguments.length?(x=null==n?(_=n,Wa):ee((_=+n)*Qo),u()):_},t.clipExtent=function(n){return arguments.length?(w=n,b=n?re(n[0][0],n[0][1],n[1][0],n[1][1]):dt,u()):w},t.scale=function(n){return arguments.length?(h=+n,r()):h},t.translate=function(n){return arguments.length?(g=+n[0],p=+n[1],r()):[g,p]},t.center=function(n){return arguments.length?(d=n[0]%360*Qo,v=n[1]%360*Qo,r()):[d*na,v*na]},t.rotate=function(n){return arguments.length?(m=n[0]%360*Qo,y=n[1]%360*Qo,M=n.length>2?n[2]%360*Qo:0,r()):[m*na,y*na,M*na]},mo.rebind(t,f,"precision"),function(){return i=n.apply(this,arguments),t.invert=i.invert&&e,r()}}function _e(n){var t=new ye(n);return t.point=function(t,e){n.point(t*Qo,e*Qo)},t}function we(n,t){return[n,t]}function Se(n,t){return[n>Bo?n-Wo:-Bo>n?n+Wo:n,t]}function Ee(n,t,e){return n?t||e?ie(Ae(n),Ne(t,e)):Ae(n):t||e?Ne(t,e):Se}function ke(n){return function(t,e){return t+=n,[t>Bo?t-Wo:-Bo>t?t+Wo:t,e]}}function Ae(n){var t=ke(n);return t.invert=ke(-n),t}function Ne(n,t){function e(n,t){var e=Math.cos(t),a=Math.cos(n)*e,c=Math.sin(n)*e,l=Math.sin(t),s=l*r+a*u;return[Math.atan2(c*i-s*o,a*r-l*u),O(s*i+c*o)]}var r=Math.cos(n),u=Math.sin(n),i=Math.cos(t),o=Math.sin(t);return e.invert=function(n,t){var e=Math.cos(t),a=Math.cos(n)*e,c=Math.sin(n)*e,l=Math.sin(t),s=l*i-c*o;return[Math.atan2(c*i+l*o,a*r+s*u),O(s*r-a*u)]},e}function Te(n,t){var e=Math.cos(n),r=Math.sin(n);return function(u,i,o,a){var c=o*t;null!=u?(u=qe(e,u),i=qe(e,i),(o>0?i>u:u>i)&&(u+=o*Wo)):(u=n+o*Wo,i=n-.5*c);for(var l,s=u;o>0?s>i:i>s;s-=c)a.point((l=Pt([e,-r*Math.cos(s),-r*Math.sin(s)]))[0],l[1])}}function qe(n,t){var e=Ct(t);e[0]-=n,Ft(e);var r=P(-e[1]);return((-e[2]<0?-r:r)+2*Math.PI-Go)%(2*Math.PI)}function ze(n,t,e){var r=mo.range(n,t-Go,e).concat(t);return function(n){return r.map(function(t){return[n,t]})}}function Ce(n,t,e){var r=mo.range(n,t-Go,e).concat(t);return function(n){return r.map(function(t){return[t,n]})}}function De(n){return n.source}function je(n){return n.target}function Le(n,t,e,r){var u=Math.cos(t),i=Math.sin(t),o=Math.cos(r),a=Math.sin(r),c=u*Math.cos(n),l=u*Math.sin(n),s=o*Math.cos(e),f=o*Math.sin(e),h=2*Math.asin(Math.sqrt(U(r-t)+u*o*U(e-n))),g=1/Math.sin(h),p=h?function(n){var t=Math.sin(n*=h)*g,e=Math.sin(h-n)*g,r=e*c+t*s,u=e*l+t*f,o=e*i+t*a;return[Math.atan2(u,r)*na,Math.atan2(o,Math.sqrt(r*r+u*u))*na]}:function(){return[n*na,t*na]};return p.distance=h,p}function He(){function n(n,u){var i=Math.sin(u*=Qo),o=Math.cos(u),a=Math.abs((n*=Qo)-t),c=Math.cos(a);oc+=Math.atan2(Math.sqrt((a=o*Math.sin(a))*a+(a=r*i-e*o*c)*a),e*i+r*o*c),t=n,e=i,r=o}var t,e,r;ac.point=function(u,i){t=u*Qo,e=Math.sin(i*=Qo),r=Math.cos(i),ac.point=n},ac.lineEnd=function(){ac.point=ac.lineEnd=c}}function Fe(n,t){function e(t,e){var r=Math.cos(t),u=Math.cos(e),i=n(r*u);return[i*u*Math.sin(t),i*Math.sin(e)]}return e.invert=function(n,e){var r=Math.sqrt(n*n+e*e),u=t(r),i=Math.sin(u),o=Math.cos(u);return[Math.atan2(n*i,r*o),Math.asin(r&&e*i/r)]},e}function Pe(n,t){function e(n,t){var e=Math.abs(Math.abs(t)-Jo)<Go?0:o/Math.pow(u(t),i);return[e*Math.sin(i*n),o-e*Math.cos(i*n)]}var r=Math.cos(n),u=function(n){return Math.tan(Bo/4+n/2)},i=n===t?Math.sin(n):Math.log(r/Math.cos(t))/Math.log(u(t)/u(n)),o=r*Math.pow(u(n),i)/i;return i?(e.invert=function(n,t){var e=o-t,r=F(i)*Math.sqrt(n*n+e*e);return[Math.atan2(n,e)/i,2*Math.atan(Math.pow(o/r,1/i))-Jo]},e):Re}function Oe(n,t){function e(n,t){var e=i-t;return[e*Math.sin(u*n),i-e*Math.cos(u*n)]}var r=Math.cos(n),u=n===t?Math.sin(n):(r-Math.cos(t))/(t-n),i=r/u+n;return Math.abs(u)<Go?we:(e.invert=function(n,t){var e=i-t;return[Math.atan2(n,e)/u,i-F(u)*Math.sqrt(n*n+e*e)]},e)}function Re(n,t){return[n,Math.log(Math.tan(Bo/4+t/2))]}function Ye(n){var t,e=xe(n),r=e.scale,u=e.translate,i=e.clipExtent;return e.scale=function(){var n=r.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.translate=function(){var n=u.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.clipExtent=function(n){var o=i.apply(e,arguments);if(o===e){if(t=null==n){var a=Bo*r(),c=u();i([[c[0]-a,c[1]-a],[c[0]+a,c[1]+a]])}}else t&&(o=null);return o},e.clipExtent(null)}function Ie(n,t){var e=Math.cos(t)*Math.sin(n);return[Math.log((1+e)/(1-e))/2,Math.atan2(Math.tan(t),Math.cos(n))]}function Ue(n){function t(t){function o(){l.push("M",i(n(s),a))}for(var c,l=[],s=[],f=-1,h=t.length,g=pt(e),p=pt(r);++f<h;)u.call(this,c=t[f],f)?s.push([+g.call(this,c,f),+p.call(this,c,f)]):s.length&&(o(),s=[]);return s.length&&o(),l.length?l.join(""):null}var e=Ze,r=Ve,u=Vt,i=Xe,o=i.key,a=.7;return t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t.defined=function(n){return arguments.length?(u=n,t):u},t.interpolate=function(n){return arguments.length?(o="function"==typeof n?i=n:(i=gc.get(n)||Xe).key,t):o},t.tension=function(n){return arguments.length?(a=n,t):a},t}function Ze(n){return n[0]}function Ve(n){return n[1]}function Xe(n){return n.join("L")}function $e(n){return Xe(n)+"Z"}function Be(n){for(var t=0,e=n.length,r=n[0],u=[r[0],",",r[1]];++t<e;)u.push("H",(r[0]+(r=n[t])[0])/2,"V",r[1]);return e>1&&u.push("H",r[0]),u.join("")}function We(n){for(var t=0,e=n.length,r=n[0],u=[r[0],",",r[1]];++t<e;)u.push("V",(r=n[t])[1],"H",r[0]);return u.join("")}function Je(n){for(var t=0,e=n.length,r=n[0],u=[r[0],",",r[1]];++t<e;)u.push("H",(r=n[t])[0],"V",r[1]);return u.join("")}function Ge(n,t){return n.length<4?Xe(n):n[1]+nr(n.slice(1,n.length-1),tr(n,t))}function Ke(n,t){return n.length<3?Xe(n):n[0]+nr((n.push(n[0]),n),tr([n[n.length-2]].concat(n,[n[1]]),t))}function Qe(n,t){return n.length<3?Xe(n):n[0]+nr(n,tr(n,t))}function nr(n,t){if(t.length<1||n.length!=t.length&&n.length!=t.length+2)return Xe(n);var e=n.length!=t.length,r="",u=n[0],i=n[1],o=t[0],a=o,c=1;if(e&&(r+="Q"+(i[0]-2*o[0]/3)+","+(i[1]-2*o[1]/3)+","+i[0]+","+i[1],u=n[1],c=2),t.length>1){a=t[1],i=n[c],c++,r+="C"+(u[0]+o[0])+","+(u[1]+o[1])+","+(i[0]-a[0])+","+(i[1]-a[1])+","+i[0]+","+i[1];for(var l=2;l<t.length;l++,c++)i=n[c],a=t[l],r+="S"+(i[0]-a[0])+","+(i[1]-a[1])+","+i[0]+","+i[1]}if(e){var s=n[c];r+="Q"+(i[0]+2*a[0]/3)+","+(i[1]+2*a[1]/3)+","+s[0]+","+s[1]}return r}function tr(n,t){for(var e,r=[],u=(1-t)/2,i=n[0],o=n[1],a=1,c=n.length;++a<c;)e=i,i=o,o=n[a],r.push([u*(o[0]-e[0]),u*(o[1]-e[1])]);return r}function er(n){if(n.length<3)return Xe(n);var t=1,e=n.length,r=n[0],u=r[0],i=r[1],o=[u,u,u,(r=n[1])[0]],a=[i,i,i,r[1]],c=[u,",",i,"L",or(vc,o),",",or(vc,a)];for(n.push(n[e-1]);++t<=e;)r=n[t],o.shift(),o.push(r[0]),a.shift(),a.push(r[1]),ar(c,o,a);return n.pop(),c.push("L",r),c.join("")}function rr(n){if(n.length<4)return Xe(n);for(var t,e=[],r=-1,u=n.length,i=[0],o=[0];++r<3;)t=n[r],i.push(t[0]),o.push(t[1]);for(e.push(or(vc,i)+","+or(vc,o)),--r;++r<u;)t=n[r],i.shift(),i.push(t[0]),o.shift(),o.push(t[1]),ar(e,i,o);return e.join("")}function ur(n){for(var t,e,r=-1,u=n.length,i=u+4,o=[],a=[];++r<4;)e=n[r%u],o.push(e[0]),a.push(e[1]);for(t=[or(vc,o),",",or(vc,a)],--r;++r<i;)e=n[r%u],o.shift(),o.push(e[0]),a.shift(),a.push(e[1]),ar(t,o,a);return t.join("")}function ir(n,t){var e=n.length-1;if(e)for(var r,u,i=n[0][0],o=n[0][1],a=n[e][0]-i,c=n[e][1]-o,l=-1;++l<=e;)r=n[l],u=l/e,r[0]=t*r[0]+(1-t)*(i+u*a),r[1]=t*r[1]+(1-t)*(o+u*c);return er(n)}function or(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]+n[3]*t[3]}function ar(n,t,e){n.push("C",or(pc,t),",",or(pc,e),",",or(dc,t),",",or(dc,e),",",or(vc,t),",",or(vc,e))}function cr(n,t){return(t[1]-n[1])/(t[0]-n[0])}function lr(n){for(var t=0,e=n.length-1,r=[],u=n[0],i=n[1],o=r[0]=cr(u,i);++t<e;)r[t]=(o+(o=cr(u=i,i=n[t+1])))/2;return r[t]=o,r
}function sr(n){for(var t,e,r,u,i=[],o=lr(n),a=-1,c=n.length-1;++a<c;)t=cr(n[a],n[a+1]),Math.abs(t)<Go?o[a]=o[a+1]=0:(e=o[a]/t,r=o[a+1]/t,u=e*e+r*r,u>9&&(u=3*t/Math.sqrt(u),o[a]=u*e,o[a+1]=u*r));for(a=-1;++a<=c;)u=(n[Math.min(c,a+1)][0]-n[Math.max(0,a-1)][0])/(6*(1+o[a]*o[a])),i.push([u||0,o[a]*u||0]);return i}function fr(n){return n.length<3?Xe(n):n[0]+nr(n,sr(n))}function hr(n,t,e,r){var u,i,o,a,c,l,s;return u=r[n],i=u[0],o=u[1],u=r[t],a=u[0],c=u[1],u=r[e],l=u[0],s=u[1],(s-o)*(a-i)-(c-o)*(l-i)>0}function gr(n,t,e){return(e[0]-t[0])*(n[1]-t[1])<(e[1]-t[1])*(n[0]-t[0])}function pr(n,t,e,r){var u=n[0],i=e[0],o=t[0]-u,a=r[0]-i,c=n[1],l=e[1],s=t[1]-c,f=r[1]-l,h=(a*(c-l)-f*(u-i))/(f*o-a*s);return[u+h*o,c+h*s]}function dr(n){var t=n[0],e=n[n.length-1];return!(t[0]-e[0]||t[1]-e[1])}function vr(n,t){var e={list:n.map(function(n,t){return{index:t,x:n[0],y:n[1]}}).sort(function(n,t){return n.y<t.y?-1:n.y>t.y?1:n.x<t.x?-1:n.x>t.x?1:0}),bottomSite:null},r={list:[],leftEnd:null,rightEnd:null,init:function(){r.leftEnd=r.createHalfEdge(null,"l"),r.rightEnd=r.createHalfEdge(null,"l"),r.leftEnd.r=r.rightEnd,r.rightEnd.l=r.leftEnd,r.list.unshift(r.leftEnd,r.rightEnd)},createHalfEdge:function(n,t){return{edge:n,side:t,vertex:null,l:null,r:null}},insert:function(n,t){t.l=n,t.r=n.r,n.r.l=t,n.r=t},leftBound:function(n){var t=r.leftEnd;do t=t.r;while(t!=r.rightEnd&&u.rightOf(t,n));return t=t.l},del:function(n){n.l.r=n.r,n.r.l=n.l,n.edge=null},right:function(n){return n.r},left:function(n){return n.l},leftRegion:function(n){return null==n.edge?e.bottomSite:n.edge.region[n.side]},rightRegion:function(n){return null==n.edge?e.bottomSite:n.edge.region[yc[n.side]]}},u={bisect:function(n,t){var e={region:{l:n,r:t},ep:{l:null,r:null}},r=t.x-n.x,u=t.y-n.y,i=r>0?r:-r,o=u>0?u:-u;return e.c=n.x*r+n.y*u+.5*(r*r+u*u),i>o?(e.a=1,e.b=u/r,e.c/=r):(e.b=1,e.a=r/u,e.c/=u),e},intersect:function(n,t){var e=n.edge,r=t.edge;if(!e||!r||e.region.r==r.region.r)return null;var u=e.a*r.b-e.b*r.a;if(Math.abs(u)<1e-10)return null;var i,o,a=(e.c*r.b-r.c*e.b)/u,c=(r.c*e.a-e.c*r.a)/u,l=e.region.r,s=r.region.r;l.y<s.y||l.y==s.y&&l.x<s.x?(i=n,o=e):(i=t,o=r);var f=a>=o.region.r.x;return f&&"l"===i.side||!f&&"r"===i.side?null:{x:a,y:c}},rightOf:function(n,t){var e=n.edge,r=e.region.r,u=t.x>r.x;if(u&&"l"===n.side)return 1;if(!u&&"r"===n.side)return 0;if(1===e.a){var i=t.y-r.y,o=t.x-r.x,a=0,c=0;if(!u&&e.b<0||u&&e.b>=0?c=a=i>=e.b*o:(c=t.x+t.y*e.b>e.c,e.b<0&&(c=!c),c||(a=1)),!a){var l=r.x-e.region.l.x;c=e.b*(o*o-i*i)<l*i*(1+2*o/l+e.b*e.b),e.b<0&&(c=!c)}}else{var s=e.c-e.a*t.x,f=t.y-s,h=t.x-r.x,g=s-r.y;c=f*f>h*h+g*g}return"l"===n.side?c:!c},endPoint:function(n,e,r){n.ep[e]=r,n.ep[yc[e]]&&t(n)},distance:function(n,t){var e=n.x-t.x,r=n.y-t.y;return Math.sqrt(e*e+r*r)}},i={list:[],insert:function(n,t,e){n.vertex=t,n.ystar=t.y+e;for(var r=0,u=i.list,o=u.length;o>r;r++){var a=u[r];if(!(n.ystar>a.ystar||n.ystar==a.ystar&&t.x>a.vertex.x))break}u.splice(r,0,n)},del:function(n){for(var t=0,e=i.list,r=e.length;r>t&&e[t]!=n;++t);e.splice(t,1)},empty:function(){return 0===i.list.length},nextEvent:function(n){for(var t=0,e=i.list,r=e.length;r>t;++t)if(e[t]==n)return e[t+1];return null},min:function(){var n=i.list[0];return{x:n.vertex.x,y:n.ystar}},extractMin:function(){return i.list.shift()}};r.init(),e.bottomSite=e.list.shift();for(var o,a,c,l,s,f,h,g,p,d,v,m,y,M=e.list.shift();;)if(i.empty()||(o=i.min()),M&&(i.empty()||M.y<o.y||M.y==o.y&&M.x<o.x))a=r.leftBound(M),c=r.right(a),h=r.rightRegion(a),m=u.bisect(h,M),f=r.createHalfEdge(m,"l"),r.insert(a,f),d=u.intersect(a,f),d&&(i.del(a),i.insert(a,d,u.distance(d,M))),a=f,f=r.createHalfEdge(m,"r"),r.insert(a,f),d=u.intersect(f,c),d&&i.insert(f,d,u.distance(d,M)),M=e.list.shift();else{if(i.empty())break;a=i.extractMin(),l=r.left(a),c=r.right(a),s=r.right(c),h=r.leftRegion(a),g=r.rightRegion(c),v=a.vertex,u.endPoint(a.edge,a.side,v),u.endPoint(c.edge,c.side,v),r.del(a),i.del(c),r.del(c),y="l",h.y>g.y&&(p=h,h=g,g=p,y="r"),m=u.bisect(h,g),f=r.createHalfEdge(m,y),r.insert(l,f),u.endPoint(m,yc[y],v),d=u.intersect(l,f),d&&(i.del(l),i.insert(l,d,u.distance(d,h))),d=u.intersect(f,s),d&&i.insert(f,d,u.distance(d,h))}for(a=r.right(r.leftEnd);a!=r.rightEnd;a=r.right(a))t(a.edge)}function mr(n){return n.x}function yr(n){return n.y}function Mr(){return{leaf:!0,nodes:[],point:null,x:null,y:null}}function xr(n,t,e,r,u,i){if(!n(t,e,r,u,i)){var o=.5*(e+u),a=.5*(r+i),c=t.nodes;c[0]&&xr(n,c[0],e,r,o,a),c[1]&&xr(n,c[1],o,r,u,a),c[2]&&xr(n,c[2],e,a,o,i),c[3]&&xr(n,c[3],o,a,u,i)}}function br(n,t){n=mo.rgb(n),t=mo.rgb(t);var e=n.r,r=n.g,u=n.b,i=t.r-e,o=t.g-r,a=t.b-u;return function(n){return"#"+ct(Math.round(e+i*n))+ct(Math.round(r+o*n))+ct(Math.round(u+a*n))}}function _r(n,t){var e,r={},u={};for(e in n)e in t?r[e]=Er(n[e],t[e]):u[e]=n[e];for(e in t)e in n||(u[e]=t[e]);return function(n){for(e in r)u[e]=r[e](n);return u}}function wr(n,t){return t-=n=+n,function(e){return n+t*e}}function Sr(n,t){var e,r,u,i,o,a=0,c=0,l=[],s=[];for(n+="",t+="",Mc.lastIndex=0,r=0;e=Mc.exec(t);++r)e.index&&l.push(t.substring(a,c=e.index)),s.push({i:l.length,x:e[0]}),l.push(null),a=Mc.lastIndex;for(a<t.length&&l.push(t.substring(a)),r=0,i=s.length;(e=Mc.exec(n))&&i>r;++r)if(o=s[r],o.x==e[0]){if(o.i)if(null==l[o.i+1])for(l[o.i-1]+=o.x,l.splice(o.i,1),u=r+1;i>u;++u)s[u].i--;else for(l[o.i-1]+=o.x+l[o.i+1],l.splice(o.i,2),u=r+1;i>u;++u)s[u].i-=2;else if(null==l[o.i+1])l[o.i]=o.x;else for(l[o.i]=o.x+l[o.i+1],l.splice(o.i+1,1),u=r+1;i>u;++u)s[u].i--;s.splice(r,1),i--,r--}else o.x=wr(parseFloat(e[0]),parseFloat(o.x));for(;i>r;)o=s.pop(),null==l[o.i+1]?l[o.i]=o.x:(l[o.i]=o.x+l[o.i+1],l.splice(o.i+1,1)),i--;return 1===l.length?null==l[0]?(o=s[0].x,function(n){return o(n)+""}):function(){return t}:function(n){for(r=0;i>r;++r)l[(o=s[r]).i]=o.x(n);return l.join("")}}function Er(n,t){for(var e,r=mo.interpolators.length;--r>=0&&!(e=mo.interpolators[r](n,t)););return e}function kr(n,t){var e,r=[],u=[],i=n.length,o=t.length,a=Math.min(n.length,t.length);for(e=0;a>e;++e)r.push(Er(n[e],t[e]));for(;i>e;++e)u[e]=n[e];for(;o>e;++e)u[e]=t[e];return function(n){for(e=0;a>e;++e)u[e]=r[e](n);return u}}function Ar(n){return function(t){return 0>=t?0:t>=1?1:n(t)}}function Nr(n){return function(t){return 1-n(1-t)}}function Tr(n){return function(t){return.5*(.5>t?n(2*t):2-n(2-2*t))}}function qr(n){return n*n}function zr(n){return n*n*n}function Cr(n){if(0>=n)return 0;if(n>=1)return 1;var t=n*n,e=t*n;return 4*(.5>n?e:3*(n-t)+e-.75)}function Dr(n){return function(t){return Math.pow(t,n)}}function jr(n){return 1-Math.cos(n*Jo)}function Lr(n){return Math.pow(2,10*(n-1))}function Hr(n){return 1-Math.sqrt(1-n*n)}function Fr(n,t){var e;return arguments.length<2&&(t=.45),arguments.length?e=t/Wo*Math.asin(1/n):(n=1,e=t/4),function(r){return 1+n*Math.pow(2,-10*r)*Math.sin((r-e)*Wo/t)}}function Pr(n){return n||(n=1.70158),function(t){return t*t*((n+1)*t-n)}}function Or(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375}function Rr(n,t){n=mo.hcl(n),t=mo.hcl(t);var e=n.h,r=n.c,u=n.l,i=t.h-e,o=t.c-r,a=t.l-u;return isNaN(o)&&(o=0,r=isNaN(r)?t.c:r),isNaN(i)?(i=0,e=isNaN(e)?t.h:e):i>180?i-=360:-180>i&&(i+=360),function(n){return J(e+i*n,r+o*n,u+a*n)+""}}function Yr(n,t){n=mo.hsl(n),t=mo.hsl(t);var e=n.h,r=n.s,u=n.l,i=t.h-e,o=t.s-r,a=t.l-u;return isNaN(o)&&(o=0,r=isNaN(r)?t.s:r),isNaN(i)?(i=0,e=isNaN(e)?t.h:e):i>180?i-=360:-180>i&&(i+=360),function(n){return $(e+i*n,r+o*n,u+a*n)+""}}function Ir(n,t){n=mo.lab(n),t=mo.lab(t);var e=n.l,r=n.a,u=n.b,i=t.l-e,o=t.a-r,a=t.b-u;return function(n){return Q(e+i*n,r+o*n,u+a*n)+""}}function Ur(n,t){return t-=n,function(e){return Math.round(n+t*e)}}function Zr(n){var t=[n.a,n.b],e=[n.c,n.d],r=Xr(t),u=Vr(t,e),i=Xr($r(e,t,-u))||0;t[0]*e[1]<e[0]*t[1]&&(t[0]*=-1,t[1]*=-1,r*=-1,u*=-1),this.rotate=(r?Math.atan2(t[1],t[0]):Math.atan2(-e[0],e[1]))*na,this.translate=[n.e,n.f],this.scale=[r,i],this.skew=i?Math.atan2(u,i)*na:0}function Vr(n,t){return n[0]*t[0]+n[1]*t[1]}function Xr(n){var t=Math.sqrt(Vr(n,n));return t&&(n[0]/=t,n[1]/=t),t}function $r(n,t,e){return n[0]+=e*t[0],n[1]+=e*t[1],n}function Br(n,t){var e,r=[],u=[],i=mo.transform(n),o=mo.transform(t),a=i.translate,c=o.translate,l=i.rotate,s=o.rotate,f=i.skew,h=o.skew,g=i.scale,p=o.scale;return a[0]!=c[0]||a[1]!=c[1]?(r.push("translate(",null,",",null,")"),u.push({i:1,x:wr(a[0],c[0])},{i:3,x:wr(a[1],c[1])})):c[0]||c[1]?r.push("translate("+c+")"):r.push(""),l!=s?(l-s>180?s+=360:s-l>180&&(l+=360),u.push({i:r.push(r.pop()+"rotate(",null,")")-2,x:wr(l,s)})):s&&r.push(r.pop()+"rotate("+s+")"),f!=h?u.push({i:r.push(r.pop()+"skewX(",null,")")-2,x:wr(f,h)}):h&&r.push(r.pop()+"skewX("+h+")"),g[0]!=p[0]||g[1]!=p[1]?(e=r.push(r.pop()+"scale(",null,",",null,")"),u.push({i:e-4,x:wr(g[0],p[0])},{i:e-2,x:wr(g[1],p[1])})):(1!=p[0]||1!=p[1])&&r.push(r.pop()+"scale("+p+")"),e=u.length,function(n){for(var t,i=-1;++i<e;)r[(t=u[i]).i]=t.x(n);return r.join("")}}function Wr(n,t){return t=t-(n=+n)?1/(t-n):0,function(e){return(e-n)*t}}function Jr(n,t){return t=t-(n=+n)?1/(t-n):0,function(e){return Math.max(0,Math.min(1,(e-n)*t))}}function Gr(n){for(var t=n.source,e=n.target,r=Qr(t,e),u=[t];t!==r;)t=t.parent,u.push(t);for(var i=u.length;e!==r;)u.splice(i,0,e),e=e.parent;return u}function Kr(n){for(var t=[],e=n.parent;null!=e;)t.push(n),n=e,e=e.parent;return t.push(n),t}function Qr(n,t){if(n===t)return n;for(var e=Kr(n),r=Kr(t),u=e.pop(),i=r.pop(),o=null;u===i;)o=u,u=e.pop(),i=r.pop();return o}function nu(n){n.fixed|=2}function tu(n){n.fixed&=-7}function eu(n){n.fixed|=4,n.px=n.x,n.py=n.y}function ru(n){n.fixed&=-5}function uu(n,t,e){var r=0,u=0;if(n.charge=0,!n.leaf)for(var i,o=n.nodes,a=o.length,c=-1;++c<a;)i=o[c],null!=i&&(uu(i,t,e),n.charge+=i.charge,r+=i.charge*i.cx,u+=i.charge*i.cy);if(n.point){n.leaf||(n.point.x+=Math.random()-.5,n.point.y+=Math.random()-.5);var l=t*e[n.point.index];n.charge+=n.pointCharge=l,r+=l*n.point.x,u+=l*n.point.y}n.cx=r/n.charge,n.cy=u/n.charge}function iu(n,t){return mo.rebind(n,t,"sort","children","value"),n.nodes=n,n.links=lu,n}function ou(n){return n.children}function au(n){return n.value}function cu(n,t){return t.value-n.value}function lu(n){return mo.merge(n.map(function(n){return(n.children||[]).map(function(t){return{source:n,target:t}})}))}function su(n){return n.x}function fu(n){return n.y}function hu(n,t,e){n.y0=t,n.y=e}function gu(n){return mo.range(n.length)}function pu(n){for(var t=-1,e=n[0].length,r=[];++t<e;)r[t]=0;return r}function du(n){for(var t,e=1,r=0,u=n[0][1],i=n.length;i>e;++e)(t=n[e][1])>u&&(r=e,u=t);return r}function vu(n){return n.reduce(mu,0)}function mu(n,t){return n+t[1]}function yu(n,t){return Mu(n,Math.ceil(Math.log(t.length)/Math.LN2+1))}function Mu(n,t){for(var e=-1,r=+n[0],u=(n[1]-r)/t,i=[];++e<=t;)i[e]=u*e+r;return i}function xu(n){return[mo.min(n),mo.max(n)]}function bu(n,t){return n.parent==t.parent?1:2}function _u(n){var t=n.children;return t&&t.length?t[0]:n._tree.thread}function wu(n){var t,e=n.children;return e&&(t=e.length)?e[t-1]:n._tree.thread}function Su(n,t){var e=n.children;if(e&&(u=e.length))for(var r,u,i=-1;++i<u;)t(r=Su(e[i],t),n)>0&&(n=r);return n}function Eu(n,t){return n.x-t.x}function ku(n,t){return t.x-n.x}function Au(n,t){return n.depth-t.depth}function Nu(n,t){function e(n,r){var u=n.children;if(u&&(o=u.length))for(var i,o,a=null,c=-1;++c<o;)i=u[c],e(i,a),a=i;t(n,r)}e(n,null)}function Tu(n){for(var t,e=0,r=0,u=n.children,i=u.length;--i>=0;)t=u[i]._tree,t.prelim+=e,t.mod+=e,e+=t.shift+(r+=t.change)}function qu(n,t,e){n=n._tree,t=t._tree;var r=e/(t.number-n.number);n.change+=r,t.change-=r,t.shift+=e,t.prelim+=e,t.mod+=e}function zu(n,t,e){return n._tree.ancestor.parent==t.parent?n._tree.ancestor:e}function Cu(n,t){return n.value-t.value}function Du(n,t){var e=n._pack_next;n._pack_next=t,t._pack_prev=n,t._pack_next=e,e._pack_prev=t}function ju(n,t){n._pack_next=t,t._pack_prev=n}function Lu(n,t){var e=t.x-n.x,r=t.y-n.y,u=n.r+t.r;return.999*u*u>e*e+r*r}function Hu(n){function t(n){s=Math.min(n.x-n.r,s),f=Math.max(n.x+n.r,f),h=Math.min(n.y-n.r,h),g=Math.max(n.y+n.r,g)}if((e=n.children)&&(l=e.length)){var e,r,u,i,o,a,c,l,s=1/0,f=-1/0,h=1/0,g=-1/0;if(e.forEach(Fu),r=e[0],r.x=-r.r,r.y=0,t(r),l>1&&(u=e[1],u.x=u.r,u.y=0,t(u),l>2))for(i=e[2],Ru(r,u,i),t(i),Du(r,i),r._pack_prev=i,Du(i,u),u=r._pack_next,o=3;l>o;o++){Ru(r,u,i=e[o]);var p=0,d=1,v=1;for(a=u._pack_next;a!==u;a=a._pack_next,d++)if(Lu(a,i)){p=1;break}if(1==p)for(c=r._pack_prev;c!==a._pack_prev&&!Lu(c,i);c=c._pack_prev,v++);p?(v>d||d==v&&u.r<r.r?ju(r,u=a):ju(r=c,u),o--):(Du(r,i),u=i,t(i))}var m=(s+f)/2,y=(h+g)/2,M=0;for(o=0;l>o;o++)i=e[o],i.x-=m,i.y-=y,M=Math.max(M,i.r+Math.sqrt(i.x*i.x+i.y*i.y));n.r=M,e.forEach(Pu)}}function Fu(n){n._pack_next=n._pack_prev=n}function Pu(n){delete n._pack_next,delete n._pack_prev}function Ou(n,t,e,r){var u=n.children;if(n.x=t+=r*n.x,n.y=e+=r*n.y,n.r*=r,u)for(var i=-1,o=u.length;++i<o;)Ou(u[i],t,e,r)}function Ru(n,t,e){var r=n.r+e.r,u=t.x-n.x,i=t.y-n.y;if(r&&(u||i)){var o=t.r+e.r,a=u*u+i*i;o*=o,r*=r;var c=.5+(r-o)/(2*a),l=Math.sqrt(Math.max(0,2*o*(r+a)-(r-=a)*r-o*o))/(2*a);e.x=n.x+c*u+l*i,e.y=n.y+c*i-l*u}else e.x=n.x+r,e.y=n.y}function Yu(n){return 1+mo.max(n,function(n){return n.y})}function Iu(n){return n.reduce(function(n,t){return n+t.x},0)/n.length}function Uu(n){var t=n.children;return t&&t.length?Uu(t[0]):n}function Zu(n){var t,e=n.children;return e&&(t=e.length)?Zu(e[t-1]):n}function Vu(n){return{x:n.x,y:n.y,dx:n.dx,dy:n.dy}}function Xu(n,t){var e=n.x+t[3],r=n.y+t[0],u=n.dx-t[1]-t[3],i=n.dy-t[0]-t[2];return 0>u&&(e+=u/2,u=0),0>i&&(r+=i/2,i=0),{x:e,y:r,dx:u,dy:i}}function $u(n){var t=n[0],e=n[n.length-1];return e>t?[t,e]:[e,t]}function Bu(n){return n.rangeExtent?n.rangeExtent():$u(n.range())}function Wu(n,t,e,r){var u=e(n[0],n[1]),i=r(t[0],t[1]);return function(n){return i(u(n))}}function Ju(n,t){var e,r=0,u=n.length-1,i=n[r],o=n[u];return i>o&&(e=r,r=u,u=e,e=i,i=o,o=e),n[r]=t.floor(i),n[u]=t.ceil(o),n}function Gu(n){return n?{floor:function(t){return Math.floor(t/n)*n},ceil:function(t){return Math.ceil(t/n)*n}}:Tc}function Ku(n,t,e,r){var u=[],i=[],o=0,a=Math.min(n.length,t.length)-1;for(n[a]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++o<=a;)u.push(e(n[o-1],n[o])),i.push(r(t[o-1],t[o]));return function(t){var e=mo.bisect(n,t,1,a)-1;return i[e](u[e](t))}}function Qu(n,t,e,r){function u(){var u=Math.min(n.length,t.length)>2?Ku:Wu,c=r?Jr:Wr;return o=u(n,t,c,e),a=u(t,n,c,Er),i}function i(n){return o(n)}var o,a;return i.invert=function(n){return a(n)},i.domain=function(t){return arguments.length?(n=t.map(Number),u()):n},i.range=function(n){return arguments.length?(t=n,u()):t},i.rangeRound=function(n){return i.range(n).interpolate(Ur)},i.clamp=function(n){return arguments.length?(r=n,u()):r},i.interpolate=function(n){return arguments.length?(e=n,u()):e},i.ticks=function(t){return ri(n,t)},i.tickFormat=function(t,e){return ui(n,t,e)},i.nice=function(t){return ti(n,t),u()},i.copy=function(){return Qu(n,t,e,r)},u()}function ni(n,t){return mo.rebind(n,t,"range","rangeRound","interpolate","clamp")}function ti(n,t){return Ju(n,Gu(ei(n,t)[2]))}function ei(n,t){null==t&&(t=10);var e=$u(n),r=e[1]-e[0],u=Math.pow(10,Math.floor(Math.log(r/t)/Math.LN10)),i=t/r*u;return.15>=i?u*=10:.35>=i?u*=5:.75>=i&&(u*=2),e[0]=Math.ceil(e[0]/u)*u,e[1]=Math.floor(e[1]/u)*u+.5*u,e[2]=u,e}function ri(n,t){return mo.range.apply(mo,ei(n,t))}function ui(n,t,e){var r=-Math.floor(Math.log(ei(n,t)[2])/Math.LN10+.01);return mo.format(e?e.replace(Aa,function(n,t,e,u,i,o,a,c,l,s){return[t,e,u,i,o,a,c,l||"."+(r-2*("%"===s)),s].join("")}):",."+r+"f")}function ii(n,t,e,r){function u(n){return(e?Math.log(0>n?0:n):-Math.log(n>0?0:-n))/Math.log(t)}function i(n){return e?Math.pow(t,n):-Math.pow(t,-n)}function o(t){return n(u(t))}return o.invert=function(t){return i(n.invert(t))},o.domain=function(t){return arguments.length?(e=t[0]>=0,n.domain((r=t.map(Number)).map(u)),o):r},o.base=function(e){return arguments.length?(t=+e,n.domain(r.map(u)),o):t},o.nice=function(){var t=Ju(r.map(u),e?Math:zc);return n.domain(t),r=t.map(i),o},o.ticks=function(){var n=$u(r),o=[],a=n[0],c=n[1],l=Math.floor(u(a)),s=Math.ceil(u(c)),f=t%1?2:t;if(isFinite(s-l)){if(e){for(;s>l;l++)for(var h=1;f>h;h++)o.push(i(l)*h);o.push(i(l))}else for(o.push(i(l));l++<s;)for(var h=f-1;h>0;h--)o.push(i(l)*h);for(l=0;o[l]<a;l++);for(s=o.length;o[s-1]>c;s--);o=o.slice(l,s)}return o},o.tickFormat=function(n,t){if(!arguments.length)return qc;arguments.length<2?t=qc:"function"!=typeof t&&(t=mo.format(t));var r,a=Math.max(.1,n/o.ticks().length),c=e?(r=1e-12,Math.ceil):(r=-1e-12,Math.floor);return function(n){return n/i(c(u(n)+r))<=a?t(n):""}},o.copy=function(){return ii(n.copy(),t,e,r)},ni(o,n)}function oi(n,t,e){function r(t){return n(u(t))}var u=ai(t),i=ai(1/t);return r.invert=function(t){return i(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain((e=t.map(Number)).map(u)),r):e},r.ticks=function(n){return ri(e,n)},r.tickFormat=function(n,t){return ui(e,n,t)},r.nice=function(n){return r.domain(ti(e,n))},r.exponent=function(o){return arguments.length?(u=ai(t=o),i=ai(1/t),n.domain(e.map(u)),r):t},r.copy=function(){return oi(n.copy(),t,e)},ni(r,n)}function ai(n){return function(t){return 0>t?-Math.pow(-t,n):Math.pow(t,n)}}function ci(n,t){function e(e){return o[((i.get(e)||"range"===t.t&&i.set(e,n.push(e)))-1)%o.length]}function r(t,e){return mo.range(n.length).map(function(n){return t+e*n})}var i,o,a;return e.domain=function(r){if(!arguments.length)return n;n=[],i=new u;for(var o,a=-1,c=r.length;++a<c;)i.has(o=r[a])||i.set(o,n.push(o));return e[t.t].apply(e,t.a)},e.range=function(n){return arguments.length?(o=n,a=0,t={t:"range",a:arguments},e):o},e.rangePoints=function(u,i){arguments.length<2&&(i=0);var c=u[0],l=u[1],s=(l-c)/(Math.max(1,n.length-1)+i);return o=r(n.length<2?(c+l)/2:c+s*i/2,s),a=0,t={t:"rangePoints",a:arguments},e},e.rangeBands=function(u,i,c){arguments.length<2&&(i=0),arguments.length<3&&(c=i);var l=u[1]<u[0],s=u[l-0],f=u[1-l],h=(f-s)/(n.length-i+2*c);return o=r(s+h*c,h),l&&o.reverse(),a=h*(1-i),t={t:"rangeBands",a:arguments},e},e.rangeRoundBands=function(u,i,c){arguments.length<2&&(i=0),arguments.length<3&&(c=i);var l=u[1]<u[0],s=u[l-0],f=u[1-l],h=Math.floor((f-s)/(n.length-i+2*c)),g=f-s-(n.length-i)*h;return o=r(s+Math.round(g/2),h),l&&o.reverse(),a=Math.round(h*(1-i)),t={t:"rangeRoundBands",a:arguments},e},e.rangeBand=function(){return a},e.rangeExtent=function(){return $u(t.a[0])},e.copy=function(){return ci(n,t)},e.domain(n)}function li(n,t){function e(){var e=0,i=t.length;for(u=[];++e<i;)u[e-1]=mo.quantile(n,e/i);return r}function r(n){return isNaN(n=+n)?void 0:t[mo.bisect(u,n)]}var u;return r.domain=function(t){return arguments.length?(n=t.filter(function(n){return!isNaN(n)}).sort(mo.ascending),e()):n},r.range=function(n){return arguments.length?(t=n,e()):t},r.quantiles=function(){return u},r.invertExtent=function(e){return e=t.indexOf(e),0>e?[0/0,0/0]:[e>0?u[e-1]:n[0],e<u.length?u[e]:n[n.length-1]]},r.copy=function(){return li(n,t)},e()}function si(n,t,e){function r(t){return e[Math.max(0,Math.min(o,Math.floor(i*(t-n))))]}function u(){return i=e.length/(t-n),o=e.length-1,r}var i,o;return r.domain=function(e){return arguments.length?(n=+e[0],t=+e[e.length-1],u()):[n,t]},r.range=function(n){return arguments.length?(e=n,u()):e},r.invertExtent=function(t){return t=e.indexOf(t),t=0>t?0/0:t/i+n,[t,t+1/i]},r.copy=function(){return si(n,t,e)},u()}function fi(n,t){function e(e){return e>=e?t[mo.bisect(n,e)]:void 0}return e.domain=function(t){return arguments.length?(n=t,e):n},e.range=function(n){return arguments.length?(t=n,e):t},e.invertExtent=function(e){return e=t.indexOf(e),[n[e-1],n[e]]},e.copy=function(){return fi(n,t)},e}function hi(n){function t(n){return+n}return t.invert=t,t.domain=t.range=function(e){return arguments.length?(n=e.map(t),t):n},t.ticks=function(t){return ri(n,t)},t.tickFormat=function(t,e){return ui(n,t,e)},t.copy=function(){return hi(n)},t}function gi(n){return n.innerRadius}function pi(n){return n.outerRadius}function di(n){return n.startAngle}function vi(n){return n.endAngle}function mi(n){for(var t,e,r,u=-1,i=n.length;++u<i;)t=n[u],e=t[0],r=t[1]+Hc,t[0]=e*Math.cos(r),t[1]=e*Math.sin(r);return n}function yi(n){function t(t){function c(){d.push("M",a(n(m),f),s,l(n(v.reverse()),f),"Z")}for(var h,g,p,d=[],v=[],m=[],y=-1,M=t.length,x=pt(e),b=pt(u),_=e===r?function(){return g}:pt(r),w=u===i?function(){return p}:pt(i);++y<M;)o.call(this,h=t[y],y)?(v.push([g=+x.call(this,h,y),p=+b.call(this,h,y)]),m.push([+_.call(this,h,y),+w.call(this,h,y)])):v.length&&(c(),v=[],m=[]);return v.length&&c(),d.length?d.join(""):null}var e=Ze,r=Ze,u=0,i=Ve,o=Vt,a=Xe,c=a.key,l=a,s="L",f=.7;return t.x=function(n){return arguments.length?(e=r=n,t):r},t.x0=function(n){return arguments.length?(e=n,t):e},t.x1=function(n){return arguments.length?(r=n,t):r},t.y=function(n){return arguments.length?(u=i=n,t):i},t.y0=function(n){return arguments.length?(u=n,t):u},t.y1=function(n){return arguments.length?(i=n,t):i},t.defined=function(n){return arguments.length?(o=n,t):o},t.interpolate=function(n){return arguments.length?(c="function"==typeof n?a=n:(a=gc.get(n)||Xe).key,l=a.reverse||a,s=a.closed?"M":"L",t):c},t.tension=function(n){return arguments.length?(f=n,t):f},t}function Mi(n){return n.radius}function xi(n){return[n.x,n.y]}function bi(n){return function(){var t=n.apply(this,arguments),e=t[0],r=t[1]+Hc;return[e*Math.cos(r),e*Math.sin(r)]}}function _i(){return 64}function wi(){return"circle"}function Si(n){var t=Math.sqrt(n/Bo);return"M0,"+t+"A"+t+","+t+" 0 1,1 0,"+-t+"A"+t+","+t+" 0 1,1 0,"+t+"Z"}function Ei(n,t){return Lo(n,Uc),n.id=t,n}function ki(n,t,e,r){var u=n.id;return N(n,"function"==typeof e?function(n,i,o){n.__transition__[u].tween.set(t,r(e.call(n,n.__data__,i,o)))}:(e=r(e),function(n){n.__transition__[u].tween.set(t,e)}))}function Ai(n){return null==n&&(n=""),function(){this.textContent=n}}function Ni(n,t,e,r){var i=n.__transition__||(n.__transition__={active:0,count:0}),o=i[e];if(!o){var a=r.time;o=i[e]={tween:new u,time:a,ease:r.ease,delay:r.delay,duration:r.duration},++i.count,mo.timer(function(r){function u(r){return i.active>e?l():(i.active=e,o.event&&o.event.start.call(n,s,t),o.tween.forEach(function(e,r){(r=r.call(n,s,t))&&p.push(r)}),c(r||1)?1:(xt(c,h,a),void 0))}function c(r){if(i.active!==e)return l();for(var u=r/g,a=f(u),c=p.length;c>0;)p[--c].call(n,a);return u>=1?(o.event&&o.event.end.call(n,s,t),l()):void 0}function l(){return--i.count?delete i[e]:delete n.__transition__,1}var s=n.__data__,f=o.ease,h=o.delay,g=o.duration,p=[];return r>=h?u(r-h):(xt(u,h,a),void 0)},0,a)}}function Ti(n,t){n.attr("transform",function(n){return"translate("+t(n)+",0)"})}function qi(n,t){n.attr("transform",function(n){return"translate(0,"+t(n)+")"})}function zi(){this._=new Date(arguments.length>1?Date.UTC.apply(this,arguments):arguments[0])}function Ci(n,t,e){function r(t){var e=n(t),r=i(e,1);return r-t>t-e?e:r}function u(e){return t(e=n(new Jc(e-1)),1),e}function i(n,e){return t(n=new Jc(+n),e),n}function o(n,r,i){var o=u(n),a=[];if(i>1)for(;r>o;)e(o)%i||a.push(new Date(+o)),t(o,1);else for(;r>o;)a.push(new Date(+o)),t(o,1);return a}function a(n,t,e){try{Jc=zi;var r=new zi;return r._=n,o(r,t,e)}finally{Jc=Date}}n.floor=n,n.round=r,n.ceil=u,n.offset=i,n.range=o;var c=n.utc=Di(n);return c.floor=c,c.round=Di(r),c.ceil=Di(u),c.offset=Di(i),c.range=a,n}function Di(n){return function(t,e){try{Jc=zi;var r=new zi;return r._=t,n(r,e)._}finally{Jc=Date}}}function ji(n){function t(t){for(var r,u,i,o=[],a=-1,c=0;++a<e;)37===n.charCodeAt(a)&&(o.push(n.substring(c,a)),null!=(u=dl[r=n.charAt(++a)])&&(r=n.charAt(++a)),(i=vl[r])&&(r=i(t,null==u?"e"===r?" ":"0":u)),o.push(r),c=a+1);return o.push(n.substring(c,a)),o.join("")}var e=n.length;return t.parse=function(t){var e={y:1900,m:0,d:1,H:0,M:0,S:0,L:0,Z:null},r=Li(e,n,t,0);if(r!=t.length)return null;"p"in e&&(e.H=e.H%12+12*e.p);var u=null!=e.Z&&Jc!==zi,i=new(u?zi:Jc);return"j"in e?i.setFullYear(e.y,0,e.j):"w"in e&&("W"in e||"U"in e)?(i.setFullYear(e.y,0,1),i.setFullYear(e.y,0,"W"in e?(e.w+6)%7+7*e.W-(i.getDay()+5)%7:e.w+7*e.U-(i.getDay()+6)%7)):i.setFullYear(e.y,e.m,e.d),i.setHours(e.H+Math.floor(e.Z/100),e.M+e.Z%100,e.S,e.L),u?i._:i},t.toString=function(){return n},t}function Li(n,t,e,r){for(var u,i,o,a=0,c=t.length,l=e.length;c>a;){if(r>=l)return-1;if(u=t.charCodeAt(a++),37===u){if(o=t.charAt(a++),i=ml[o in dl?t.charAt(a++):o],!i||(r=i(n,e,r))<0)return-1}else if(u!=e.charCodeAt(r++))return-1}return r}function Hi(n){return new RegExp("^(?:"+n.map(mo.requote).join("|")+")","i")}function Fi(n){for(var t=new u,e=-1,r=n.length;++e<r;)t.set(n[e].toLowerCase(),e);return t}function Pi(n,t,e){var r=0>n?"-":"",u=(r?-n:n)+"",i=u.length;return r+(e>i?new Array(e-i+1).join(t)+u:u)}function Oi(n,t,e){cl.lastIndex=0;var r=cl.exec(t.substring(e));return r?(n.w=ll.get(r[0].toLowerCase()),e+r[0].length):-1}function Ri(n,t,e){ol.lastIndex=0;var r=ol.exec(t.substring(e));return r?(n.w=al.get(r[0].toLowerCase()),e+r[0].length):-1}function Yi(n,t,e){yl.lastIndex=0;var r=yl.exec(t.substring(e,e+1));return r?(n.w=+r[0],e+r[0].length):-1}function Ii(n,t,e){yl.lastIndex=0;var r=yl.exec(t.substring(e));return r?(n.U=+r[0],e+r[0].length):-1}function Ui(n,t,e){yl.lastIndex=0;var r=yl.exec(t.substring(e));return r?(n.W=+r[0],e+r[0].length):-1}function Zi(n,t,e){hl.lastIndex=0;var r=hl.exec(t.substring(e));return r?(n.m=gl.get(r[0].toLowerCase()),e+r[0].length):-1}function Vi(n,t,e){sl.lastIndex=0;var r=sl.exec(t.substring(e));return r?(n.m=fl.get(r[0].toLowerCase()),e+r[0].length):-1}function Xi(n,t,e){return Li(n,vl.c.toString(),t,e)}function $i(n,t,e){return Li(n,vl.x.toString(),t,e)}function Bi(n,t,e){return Li(n,vl.X.toString(),t,e)}function Wi(n,t,e){yl.lastIndex=0;var r=yl.exec(t.substring(e,e+4));return r?(n.y=+r[0],e+r[0].length):-1}function Ji(n,t,e){yl.lastIndex=0;var r=yl.exec(t.substring(e,e+2));return r?(n.y=Ki(+r[0]),e+r[0].length):-1}function Gi(n,t,e){return/^[+-]\d{4}$/.test(t=t.substring(e,e+5))?(n.Z=+t,e+5):-1}function Ki(n){return n+(n>68?1900:2e3)}function Qi(n,t,e){yl.lastIndex=0;var r=yl.exec(t.substring(e,e+2));return r?(n.m=r[0]-1,e+r[0].length):-1}function no(n,t,e){yl.lastIndex=0;var r=yl.exec(t.substring(e,e+2));return r?(n.d=+r[0],e+r[0].length):-1}function to(n,t,e){yl.lastIndex=0;var r=yl.exec(t.substring(e,e+3));return r?(n.j=+r[0],e+r[0].length):-1}function eo(n,t,e){yl.lastIndex=0;var r=yl.exec(t.substring(e,e+2));return r?(n.H=+r[0],e+r[0].length):-1}function ro(n,t,e){yl.lastIndex=0;var r=yl.exec(t.substring(e,e+2));return r?(n.M=+r[0],e+r[0].length):-1}function uo(n,t,e){yl.lastIndex=0;var r=yl.exec(t.substring(e,e+2));return r?(n.S=+r[0],e+r[0].length):-1}function io(n,t,e){yl.lastIndex=0;var r=yl.exec(t.substring(e,e+3));return r?(n.L=+r[0],e+r[0].length):-1}function oo(n,t,e){var r=Ml.get(t.substring(e,e+=2).toLowerCase());return null==r?-1:(n.p=r,e)}function ao(n){var t=n.getTimezoneOffset(),e=t>0?"-":"+",r=~~(Math.abs(t)/60),u=Math.abs(t)%60;return e+Pi(r,"0",2)+Pi(u,"0",2)}function co(n,t,e){pl.lastIndex=0;var r=pl.exec(t.substring(e,e+1));return r?e+r[0].length:-1}function lo(n){function t(n){try{Jc=zi;var t=new Jc;return t._=n,e(t)}finally{Jc=Date}}var e=ji(n);return t.parse=function(n){try{Jc=zi;var t=e.parse(n);return t&&t._}finally{Jc=Date}},t.toString=e.toString,t}function so(n){return n.toISOString()}function fo(n,t,e){function r(t){return n(t)}function u(n,e){var r=n[1]-n[0],u=r/e,i=mo.bisect(bl,u);return i==bl.length?[t.year,ei(n.map(function(n){return n/31536e6}),e)[2]]:i?t[u/bl[i-1]<bl[i]/u?i-1:i]:[El,ei(n,e)[2]]}return r.invert=function(t){return ho(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain(t),r):n.domain().map(ho)},r.nice=function(n,t){function e(e){return!isNaN(e)&&!n.range(e,ho(+e+1),t).length}var i=r.domain(),o=$u(i),a=null==n?u(o,10):"number"==typeof n&&u(o,n);return a&&(n=a[0],t=a[1]),r.domain(Ju(i,t>1?{floor:function(t){for(;e(t=n.floor(t));)t=ho(t-1);return t},ceil:function(t){for(;e(t=n.ceil(t));)t=ho(+t+1);return t}}:n))},r.ticks=function(n,t){var e=$u(r.domain()),i=null==n?u(e,10):"number"==typeof n?u(e,n):!n.range&&[{range:n},t];return i&&(n=i[0],t=i[1]),n.range(e[0],ho(+e[1]+1),1>t?1:t)},r.tickFormat=function(){return e},r.copy=function(){return fo(n.copy(),t,e)},ni(r,n)}function ho(n){return new Date(n)}function go(n){return function(t){for(var e=n.length-1,r=n[e];!r[1](t);)r=n[--e];return r[0](t)}}function po(n){return JSON.parse(n.responseText)}function vo(n){var t=xo.createRange();return t.selectNode(xo.body),t.createContextualFragment(n.responseText)}var mo={version:"3.3.6"};Date.now||(Date.now=function(){return+new Date});var yo=[].slice,Mo=function(n){return yo.call(n)},xo=document,bo=xo.documentElement,_o=window;try{Mo(bo.childNodes)[0].nodeType}catch(wo){Mo=function(n){for(var t=n.length,e=new Array(t);t--;)e[t]=n[t];return e}}try{xo.createElement("div").style.setProperty("opacity",0,"")}catch(So){var Eo=_o.Element.prototype,ko=Eo.setAttribute,Ao=Eo.setAttributeNS,No=_o.CSSStyleDeclaration.prototype,To=No.setProperty;Eo.setAttribute=function(n,t){ko.call(this,n,t+"")},Eo.setAttributeNS=function(n,t,e){Ao.call(this,n,t,e+"")},No.setProperty=function(n,t,e){To.call(this,n,t+"",e)}}mo.ascending=function(n,t){return t>n?-1:n>t?1:n>=t?0:0/0},mo.descending=function(n,t){return n>t?-1:t>n?1:t>=n?0:0/0},mo.min=function(n,t){var e,r,u=-1,i=n.length;if(1===arguments.length){for(;++u<i&&!(null!=(e=n[u])&&e>=e);)e=void 0;for(;++u<i;)null!=(r=n[u])&&e>r&&(e=r)}else{for(;++u<i&&!(null!=(e=t.call(n,n[u],u))&&e>=e);)e=void 0;for(;++u<i;)null!=(r=t.call(n,n[u],u))&&e>r&&(e=r)}return e},mo.max=function(n,t){var e,r,u=-1,i=n.length;if(1===arguments.length){for(;++u<i&&!(null!=(e=n[u])&&e>=e);)e=void 0;for(;++u<i;)null!=(r=n[u])&&r>e&&(e=r)}else{for(;++u<i&&!(null!=(e=t.call(n,n[u],u))&&e>=e);)e=void 0;for(;++u<i;)null!=(r=t.call(n,n[u],u))&&r>e&&(e=r)}return e},mo.extent=function(n,t){var e,r,u,i=-1,o=n.length;if(1===arguments.length){for(;++i<o&&!(null!=(e=u=n[i])&&e>=e);)e=u=void 0;for(;++i<o;)null!=(r=n[i])&&(e>r&&(e=r),r>u&&(u=r))}else{for(;++i<o&&!(null!=(e=u=t.call(n,n[i],i))&&e>=e);)e=void 0;for(;++i<o;)null!=(r=t.call(n,n[i],i))&&(e>r&&(e=r),r>u&&(u=r))}return[e,u]},mo.sum=function(n,t){var e,r=0,u=n.length,i=-1;if(1===arguments.length)for(;++i<u;)isNaN(e=+n[i])||(r+=e);else for(;++i<u;)isNaN(e=+t.call(n,n[i],i))||(r+=e);return r},mo.mean=function(t,e){var r,u=t.length,i=0,o=-1,a=0;if(1===arguments.length)for(;++o<u;)n(r=t[o])&&(i+=(r-i)/++a);else for(;++o<u;)n(r=e.call(t,t[o],o))&&(i+=(r-i)/++a);return a?i:void 0},mo.quantile=function(n,t){var e=(n.length-1)*t+1,r=Math.floor(e),u=+n[r-1],i=e-r;return i?u+i*(n[r]-u):u},mo.median=function(t,e){return arguments.length>1&&(t=t.map(e)),t=t.filter(n),t.length?mo.quantile(t.sort(mo.ascending),.5):void 0},mo.bisector=function(n){return{left:function(t,e,r,u){for(arguments.length<3&&(r=0),arguments.length<4&&(u=t.length);u>r;){var i=r+u>>>1;n.call(t,t[i],i)<e?r=i+1:u=i}return r},right:function(t,e,r,u){for(arguments.length<3&&(r=0),arguments.length<4&&(u=t.length);u>r;){var i=r+u>>>1;e<n.call(t,t[i],i)?u=i:r=i+1}return r}}};var qo=mo.bisector(function(n){return n});mo.bisectLeft=qo.left,mo.bisect=mo.bisectRight=qo.right,mo.shuffle=function(n){for(var t,e,r=n.length;r;)e=0|Math.random()*r--,t=n[r],n[r]=n[e],n[e]=t;return n},mo.permute=function(n,t){for(var e=t.length,r=new Array(e);e--;)r[e]=n[t[e]];return r},mo.pairs=function(n){for(var t,e=0,r=n.length-1,u=n[0],i=new Array(0>r?0:r);r>e;)i[e]=[t=u,u=n[++e]];return i},mo.zip=function(){if(!(u=arguments.length))return[];for(var n=-1,e=mo.min(arguments,t),r=new Array(e);++n<e;)for(var u,i=-1,o=r[n]=new Array(u);++i<u;)o[i]=arguments[i][n];return r},mo.transpose=function(n){return mo.zip.apply(mo,n)},mo.keys=function(n){var t=[];for(var e in n)t.push(e);return t},mo.values=function(n){var t=[];for(var e in n)t.push(n[e]);return t},mo.entries=function(n){var t=[];
for(var e in n)t.push({key:e,value:n[e]});return t},mo.merge=function(n){return Array.prototype.concat.apply([],n)},mo.range=function(n,t,r){if(arguments.length<3&&(r=1,arguments.length<2&&(t=n,n=0)),1/0===(t-n)/r)throw new Error("infinite range");var u,i=[],o=e(Math.abs(r)),a=-1;if(n*=o,t*=o,r*=o,0>r)for(;(u=n+r*++a)>t;)i.push(u/o);else for(;(u=n+r*++a)<t;)i.push(u/o);return i},mo.map=function(n){var t=new u;if(n instanceof u)n.forEach(function(n,e){t.set(n,e)});else for(var e in n)t.set(e,n[e]);return t},r(u,{has:function(n){return zo+n in this},get:function(n){return this[zo+n]},set:function(n,t){return this[zo+n]=t},remove:function(n){return n=zo+n,n in this&&delete this[n]},keys:function(){var n=[];return this.forEach(function(t){n.push(t)}),n},values:function(){var n=[];return this.forEach(function(t,e){n.push(e)}),n},entries:function(){var n=[];return this.forEach(function(t,e){n.push({key:t,value:e})}),n},forEach:function(n){for(var t in this)t.charCodeAt(0)===Co&&n.call(this,t.substring(1),this[t])}});var zo="\x00",Co=zo.charCodeAt(0);mo.nest=function(){function n(t,a,c){if(c>=o.length)return r?r.call(i,a):e?a.sort(e):a;for(var l,s,f,h,g=-1,p=a.length,d=o[c++],v=new u;++g<p;)(h=v.get(l=d(s=a[g])))?h.push(s):v.set(l,[s]);return t?(s=t(),f=function(e,r){s.set(e,n(t,r,c))}):(s={},f=function(e,r){s[e]=n(t,r,c)}),v.forEach(f),s}function t(n,e){if(e>=o.length)return n;var r=[],u=a[e++];return n.forEach(function(n,u){r.push({key:n,values:t(u,e)})}),u?r.sort(function(n,t){return u(n.key,t.key)}):r}var e,r,i={},o=[],a=[];return i.map=function(t,e){return n(e,t,0)},i.entries=function(e){return t(n(mo.map,e,0),0)},i.key=function(n){return o.push(n),i},i.sortKeys=function(n){return a[o.length-1]=n,i},i.sortValues=function(n){return e=n,i},i.rollup=function(n){return r=n,i},i},mo.set=function(n){var t=new i;if(n)for(var e=0,r=n.length;r>e;++e)t.add(n[e]);return t},r(i,{has:function(n){return zo+n in this},add:function(n){return this[zo+n]=!0,n},remove:function(n){return n=zo+n,n in this&&delete this[n]},values:function(){var n=[];return this.forEach(function(t){n.push(t)}),n},forEach:function(n){for(var t in this)t.charCodeAt(0)===Co&&n.call(this,t.substring(1))}}),mo.behavior={},mo.rebind=function(n,t){for(var e,r=1,u=arguments.length;++r<u;)n[e=arguments[r]]=o(n,t,t[e]);return n};var Do=["webkit","ms","moz","Moz","o","O"];mo.dispatch=function(){for(var n=new l,t=-1,e=arguments.length;++t<e;)n[arguments[t]]=s(n);return n},l.prototype.on=function(n,t){var e=n.indexOf("."),r="";if(e>=0&&(r=n.substring(e+1),n=n.substring(0,e)),n)return arguments.length<2?this[n].on(r):this[n].on(r,t);if(2===arguments.length){if(null==t)for(n in this)this.hasOwnProperty(n)&&this[n].on(r,null);return this}},mo.event=null,mo.requote=function(n){return n.replace(jo,"\\$&")};var jo=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,Lo={}.__proto__?function(n,t){n.__proto__=t}:function(n,t){for(var e in t)n[e]=t[e]},Ho=function(n,t){return t.querySelector(n)},Fo=function(n,t){return t.querySelectorAll(n)},Po=bo[a(bo,"matchesSelector")],Oo=function(n,t){return Po.call(n,t)};"function"==typeof Sizzle&&(Ho=function(n,t){return Sizzle(n,t)[0]||null},Fo=function(n,t){return Sizzle.uniqueSort(Sizzle(n,t))},Oo=Sizzle.matchesSelector),mo.selection=function(){return Uo};var Ro=mo.selection.prototype=[];Ro.select=function(n){var t,e,r,u,i=[];n=d(n);for(var o=-1,a=this.length;++o<a;){i.push(t=[]),t.parentNode=(r=this[o]).parentNode;for(var c=-1,l=r.length;++c<l;)(u=r[c])?(t.push(e=n.call(u,u.__data__,c,o)),e&&"__data__"in u&&(e.__data__=u.__data__)):t.push(null)}return p(i)},Ro.selectAll=function(n){var t,e,r=[];n=v(n);for(var u=-1,i=this.length;++u<i;)for(var o=this[u],a=-1,c=o.length;++a<c;)(e=o[a])&&(r.push(t=Mo(n.call(e,e.__data__,a,u))),t.parentNode=e);return p(r)};var Yo={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};mo.ns={prefix:Yo,qualify:function(n){var t=n.indexOf(":"),e=n;return t>=0&&(e=n.substring(0,t),n=n.substring(t+1)),Yo.hasOwnProperty(e)?{space:Yo[e],local:n}:n}},Ro.attr=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node();return n=mo.ns.qualify(n),n.local?e.getAttributeNS(n.space,n.local):e.getAttribute(n)}for(t in n)this.each(m(t,n[t]));return this}return this.each(m(n,t))},Ro.classed=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node(),r=(n=n.trim().split(/^|\s+/g)).length,u=-1;if(t=e.classList){for(;++u<r;)if(!t.contains(n[u]))return!1}else for(t=e.getAttribute("class");++u<r;)if(!M(n[u]).test(t))return!1;return!0}for(t in n)this.each(x(t,n[t]));return this}return this.each(x(n,t))},Ro.style=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t="");for(e in n)this.each(_(e,n[e],t));return this}if(2>r)return _o.getComputedStyle(this.node(),null).getPropertyValue(n);e=""}return this.each(_(n,t,e))},Ro.property=function(n,t){if(arguments.length<2){if("string"==typeof n)return this.node()[n];for(t in n)this.each(w(t,n[t]));return this}return this.each(w(n,t))},Ro.text=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.textContent=null==t?"":t}:null==n?function(){this.textContent=""}:function(){this.textContent=n}):this.node().textContent},Ro.html=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.innerHTML=null==t?"":t}:null==n?function(){this.innerHTML=""}:function(){this.innerHTML=n}):this.node().innerHTML},Ro.append=function(n){return n=S(n),this.select(function(){return this.appendChild(n.apply(this,arguments))})},Ro.insert=function(n,t){return n=S(n),t=d(t),this.select(function(){return this.insertBefore(n.apply(this,arguments),t.apply(this,arguments))})},Ro.remove=function(){return this.each(function(){var n=this.parentNode;n&&n.removeChild(this)})},Ro.data=function(n,t){function e(n,e){var r,i,o,a=n.length,f=e.length,h=Math.min(a,f),g=new Array(f),p=new Array(f),d=new Array(a);if(t){var v,m=new u,y=new u,M=[];for(r=-1;++r<a;)v=t.call(i=n[r],i.__data__,r),m.has(v)?d[r]=i:m.set(v,i),M.push(v);for(r=-1;++r<f;)v=t.call(e,o=e[r],r),(i=m.get(v))?(g[r]=i,i.__data__=o):y.has(v)||(p[r]=E(o)),y.set(v,o),m.remove(v);for(r=-1;++r<a;)m.has(M[r])&&(d[r]=n[r])}else{for(r=-1;++r<h;)i=n[r],o=e[r],i?(i.__data__=o,g[r]=i):p[r]=E(o);for(;f>r;++r)p[r]=E(e[r]);for(;a>r;++r)d[r]=n[r]}p.update=g,p.parentNode=g.parentNode=d.parentNode=n.parentNode,c.push(p),l.push(g),s.push(d)}var r,i,o=-1,a=this.length;if(!arguments.length){for(n=new Array(a=(r=this[0]).length);++o<a;)(i=r[o])&&(n[o]=i.__data__);return n}var c=T([]),l=p([]),s=p([]);if("function"==typeof n)for(;++o<a;)e(r=this[o],n.call(r,r.parentNode.__data__,o));else for(;++o<a;)e(r=this[o],n);return l.enter=function(){return c},l.exit=function(){return s},l},Ro.datum=function(n){return arguments.length?this.property("__data__",n):this.property("__data__")},Ro.filter=function(n){var t,e,r,u=[];"function"!=typeof n&&(n=k(n));for(var i=0,o=this.length;o>i;i++){u.push(t=[]),t.parentNode=(e=this[i]).parentNode;for(var a=0,c=e.length;c>a;a++)(r=e[a])&&n.call(r,r.__data__,a)&&t.push(r)}return p(u)},Ro.order=function(){for(var n=-1,t=this.length;++n<t;)for(var e,r=this[n],u=r.length-1,i=r[u];--u>=0;)(e=r[u])&&(i&&i!==e.nextSibling&&i.parentNode.insertBefore(e,i),i=e);return this},Ro.sort=function(n){n=A.apply(this,arguments);for(var t=-1,e=this.length;++t<e;)this[t].sort(n);return this.order()},Ro.each=function(n){return N(this,function(t,e,r){n.call(t,t.__data__,e,r)})},Ro.call=function(n){var t=Mo(arguments);return n.apply(t[0]=this,t),this},Ro.empty=function(){return!this.node()},Ro.node=function(){for(var n=0,t=this.length;t>n;n++)for(var e=this[n],r=0,u=e.length;u>r;r++){var i=e[r];if(i)return i}return null},Ro.size=function(){var n=0;return this.each(function(){++n}),n};var Io=[];mo.selection.enter=T,mo.selection.enter.prototype=Io,Io.append=Ro.append,Io.empty=Ro.empty,Io.node=Ro.node,Io.call=Ro.call,Io.size=Ro.size,Io.select=function(n){for(var t,e,r,u,i,o=[],a=-1,c=this.length;++a<c;){r=(u=this[a]).update,o.push(t=[]),t.parentNode=u.parentNode;for(var l=-1,s=u.length;++l<s;)(i=u[l])?(t.push(r[l]=e=n.call(u.parentNode,i.__data__,l,a)),e.__data__=i.__data__):t.push(null)}return p(o)},Io.insert=function(n,t){return arguments.length<2&&(t=q(this)),Ro.insert.call(this,n,t)},Ro.transition=function(){for(var n,t,e=Oc||++Zc,r=[],u=Rc||{time:Date.now(),ease:Cr,delay:0,duration:250},i=-1,o=this.length;++i<o;){r.push(n=[]);for(var a=this[i],c=-1,l=a.length;++c<l;)(t=a[c])&&Ni(t,c,e,u),n.push(t)}return Ei(r,e)},Ro.interrupt=function(){return this.each(z)},mo.select=function(n){var t=["string"==typeof n?Ho(n,xo):n];return t.parentNode=bo,p([t])},mo.selectAll=function(n){var t=Mo("string"==typeof n?Fo(n,xo):n);return t.parentNode=bo,p([t])};var Uo=mo.select(bo);Ro.on=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t=!1);for(e in n)this.each(C(e,n[e],t));return this}if(2>r)return(r=this.node()["__on"+n])&&r._;e=!1}return this.each(C(n,t,e))};var Zo=mo.map({mouseenter:"mouseover",mouseleave:"mouseout"});Zo.forEach(function(n){"on"+n in xo&&Zo.remove(n)});var Vo=a(bo.style,"userSelect"),Xo=0;mo.mouse=function(n){return H(n,h())};var $o=/WebKit/.test(_o.navigator.userAgent)?-1:0;mo.touches=function(n,t){return arguments.length<2&&(t=h().touches),t?Mo(t).map(function(t){var e=H(n,t);return e.identifier=t.identifier,e}):[]},mo.behavior.drag=function(){function n(){this.on("mousedown.drag",o).on("touchstart.drag",a)}function t(){return mo.event.changedTouches[0].identifier}function e(n,t){return mo.touches(n).filter(function(n){return n.identifier===t})[0]}function r(n,t,e,r){return function(){function o(){var n=t(s,g),e=n[0]-d[0],r=n[1]-d[1];v|=e|r,d=n,f({type:"drag",x:n[0]+c[0],y:n[1]+c[1],dx:e,dy:r})}function a(){m.on(e+"."+p,null).on(r+"."+p,null),y(v&&mo.event.target===h),f({type:"dragend"})}var c,l=this,s=l.parentNode,f=u.of(l,arguments),h=mo.event.target,g=n(),p=null==g?"drag":"drag-"+g,d=t(s,g),v=0,m=mo.select(_o).on(e+"."+p,o).on(r+"."+p,a),y=L();i?(c=i.apply(l,arguments),c=[c.x-d[0],c.y-d[1]]):c=[0,0],f({type:"dragstart"})}}var u=g(n,"drag","dragstart","dragend"),i=null,o=r(c,mo.mouse,"mousemove","mouseup"),a=r(t,e,"touchmove","touchend");return n.origin=function(t){return arguments.length?(i=t,n):i},mo.rebind(n,u,"on")};var Bo=Math.PI,Wo=2*Bo,Jo=Bo/2,Go=1e-6,Ko=Go*Go,Qo=Bo/180,na=180/Bo,ta=Math.SQRT2,ea=2,ra=4;mo.interpolateZoom=function(n,t){function e(n){var t=n*y;if(m){var e=Y(d),o=i/(ea*h)*(e*I(ta*t+d)-R(d));return[r+o*l,u+o*s,i*e/Y(ta*t+d)]}return[r+n*l,u+n*s,i*Math.exp(ta*t)]}var r=n[0],u=n[1],i=n[2],o=t[0],a=t[1],c=t[2],l=o-r,s=a-u,f=l*l+s*s,h=Math.sqrt(f),g=(c*c-i*i+ra*f)/(2*i*ea*h),p=(c*c-i*i-ra*f)/(2*c*ea*h),d=Math.log(Math.sqrt(g*g+1)-g),v=Math.log(Math.sqrt(p*p+1)-p),m=v-d,y=(m||Math.log(c/i))/ta;return e.duration=1e3*y,e},mo.behavior.zoom=function(){function n(n){n.on(A,l).on(oa+".zoom",h).on(N,p).on("dblclick.zoom",d).on(q,s)}function t(n){return[(n[0]-S.x)/S.k,(n[1]-S.y)/S.k]}function e(n){return[n[0]*S.k+S.x,n[1]*S.k+S.y]}function r(n){S.k=Math.max(k[0],Math.min(k[1],n))}function u(n,t){t=e(t),S.x+=n[0]-t[0],S.y+=n[1]-t[1]}function i(){b&&b.domain(x.range().map(function(n){return(n-S.x)/S.k}).map(x.invert)),w&&w.domain(_.range().map(function(n){return(n-S.y)/S.k}).map(_.invert))}function o(n){n({type:"zoomstart"})}function a(n){i(),n({type:"zoom",scale:S.k,translate:[S.x,S.y]})}function c(n){n({type:"zoomend"})}function l(){function n(){s=1,u(mo.mouse(r),h),a(i)}function e(){f.on(N,_o===r?p:null).on(T,null),g(s&&mo.event.target===l),c(i)}var r=this,i=C.of(r,arguments),l=mo.event.target,s=0,f=mo.select(_o).on(N,n).on(T,e),h=t(mo.mouse(r)),g=L();z.call(r),o(i)}function s(){function n(){var n=mo.touches(p);return g=S.k,n.forEach(function(n){n.identifier in v&&(v[n.identifier]=t(n))}),n}function e(){for(var t=mo.event.changedTouches,e=0,i=t.length;i>e;++e)v[t[e].identifier]=null;var o=n(),c=Date.now();if(1===o.length){if(500>c-M){var l=o[0],s=v[l.identifier];r(2*S.k),u(l,s),f(),a(d)}M=c}else if(o.length>1){var l=o[0],h=o[1],g=l[0]-h[0],p=l[1]-h[1];m=g*g+p*p}}function i(){for(var n,t,e,i,o=mo.touches(p),c=0,l=o.length;l>c;++c,i=null)if(e=o[c],i=v[e.identifier]){if(t)break;n=e,t=i}if(i){var s=(s=e[0]-n[0])*s+(s=e[1]-n[1])*s,f=m&&Math.sqrt(s/m);n=[(n[0]+e[0])/2,(n[1]+e[1])/2],t=[(t[0]+i[0])/2,(t[1]+i[1])/2],r(f*g)}M=null,u(n,t),a(d)}function h(){if(mo.event.touches.length){for(var t=mo.event.changedTouches,e=0,r=t.length;r>e;++e)delete v[t[e].identifier];for(var u in v)return void n()}_.on(x,null).on(b,null),w.on(A,l).on(q,s),E(),c(d)}var g,p=this,d=C.of(p,arguments),v={},m=0,y=mo.event.changedTouches[0].identifier,x="touchmove.zoom-"+y,b="touchend.zoom-"+y,_=mo.select(_o).on(x,i).on(b,h),w=mo.select(p).on(A,null).on(q,e),E=L();z.call(p),e(),o(d)}function h(){var n=C.of(this,arguments);y?clearTimeout(y):(z.call(this),o(n)),y=setTimeout(function(){y=null,c(n)},50),f();var e=m||mo.mouse(this);v||(v=t(e)),r(Math.pow(2,.002*ua())*S.k),u(e,v),a(n)}function p(){v=null}function d(){var n=C.of(this,arguments),e=mo.mouse(this),i=t(e),l=Math.log(S.k)/Math.LN2;o(n),r(Math.pow(2,mo.event.shiftKey?Math.ceil(l)-1:Math.floor(l)+1)),u(e,i),a(n),c(n)}var v,m,y,M,x,b,_,w,S={x:0,y:0,k:1},E=[960,500],k=ia,A="mousedown.zoom",N="mousemove.zoom",T="mouseup.zoom",q="touchstart.zoom",C=g(n,"zoomstart","zoom","zoomend");return n.event=function(n){n.each(function(){var n=C.of(this,arguments),t=S;Oc?mo.select(this).transition().each("start.zoom",function(){S=this.__chart__||{x:0,y:0,k:1},o(n)}).tween("zoom:zoom",function(){var e=E[0],r=E[1],u=e/2,i=r/2,o=mo.interpolateZoom([(u-S.x)/S.k,(i-S.y)/S.k,e/S.k],[(u-t.x)/t.k,(i-t.y)/t.k,e/t.k]);return function(t){var r=o(t),c=e/r[2];this.__chart__=S={x:u-r[0]*c,y:i-r[1]*c,k:c},a(n)}}).each("end.zoom",function(){c(n)}):(this.__chart__=S,o(n),a(n),c(n))})},n.translate=function(t){return arguments.length?(S={x:+t[0],y:+t[1],k:S.k},i(),n):[S.x,S.y]},n.scale=function(t){return arguments.length?(S={x:S.x,y:S.y,k:+t},i(),n):S.k},n.scaleExtent=function(t){return arguments.length?(k=null==t?ia:[+t[0],+t[1]],n):k},n.center=function(t){return arguments.length?(m=t&&[+t[0],+t[1]],n):m},n.size=function(t){return arguments.length?(E=t&&[+t[0],+t[1]],n):E},n.x=function(t){return arguments.length?(b=t,x=t.copy(),S={x:0,y:0,k:1},n):b},n.y=function(t){return arguments.length?(w=t,_=t.copy(),S={x:0,y:0,k:1},n):w},mo.rebind(n,C,"on")};var ua,ia=[0,1/0],oa="onwheel"in xo?(ua=function(){return-mo.event.deltaY*(mo.event.deltaMode?120:1)},"wheel"):"onmousewheel"in xo?(ua=function(){return mo.event.wheelDelta},"mousewheel"):(ua=function(){return-mo.event.detail},"MozMousePixelScroll");Z.prototype.toString=function(){return this.rgb()+""},mo.hsl=function(n,t,e){return 1===arguments.length?n instanceof X?V(n.h,n.s,n.l):lt(""+n,st,V):V(+n,+t,+e)};var aa=X.prototype=new Z;aa.brighter=function(n){return n=Math.pow(.7,arguments.length?n:1),V(this.h,this.s,this.l/n)},aa.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),V(this.h,this.s,n*this.l)},aa.rgb=function(){return $(this.h,this.s,this.l)},mo.hcl=function(n,t,e){return 1===arguments.length?n instanceof W?B(n.h,n.c,n.l):n instanceof K?nt(n.l,n.a,n.b):nt((n=ft((n=mo.rgb(n)).r,n.g,n.b)).l,n.a,n.b):B(+n,+t,+e)};var ca=W.prototype=new Z;ca.brighter=function(n){return B(this.h,this.c,Math.min(100,this.l+la*(arguments.length?n:1)))},ca.darker=function(n){return B(this.h,this.c,Math.max(0,this.l-la*(arguments.length?n:1)))},ca.rgb=function(){return J(this.h,this.c,this.l).rgb()},mo.lab=function(n,t,e){return 1===arguments.length?n instanceof K?G(n.l,n.a,n.b):n instanceof W?J(n.l,n.c,n.h):ft((n=mo.rgb(n)).r,n.g,n.b):G(+n,+t,+e)};var la=18,sa=.95047,fa=1,ha=1.08883,ga=K.prototype=new Z;ga.brighter=function(n){return G(Math.min(100,this.l+la*(arguments.length?n:1)),this.a,this.b)},ga.darker=function(n){return G(Math.max(0,this.l-la*(arguments.length?n:1)),this.a,this.b)},ga.rgb=function(){return Q(this.l,this.a,this.b)},mo.rgb=function(n,t,e){return 1===arguments.length?n instanceof at?ot(n.r,n.g,n.b):lt(""+n,ot,$):ot(~~n,~~t,~~e)};var pa=at.prototype=new Z;pa.brighter=function(n){n=Math.pow(.7,arguments.length?n:1);var t=this.r,e=this.g,r=this.b,u=30;return t||e||r?(t&&u>t&&(t=u),e&&u>e&&(e=u),r&&u>r&&(r=u),ot(Math.min(255,~~(t/n)),Math.min(255,~~(e/n)),Math.min(255,~~(r/n)))):ot(u,u,u)},pa.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),ot(~~(n*this.r),~~(n*this.g),~~(n*this.b))},pa.hsl=function(){return st(this.r,this.g,this.b)},pa.toString=function(){return"#"+ct(this.r)+ct(this.g)+ct(this.b)};var da=mo.map({aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074});da.forEach(function(n,t){da.set(n,ut(t))}),mo.functor=pt,mo.xhr=vt(dt),mo.dsv=function(n,t){function e(n,e,i){arguments.length<3&&(i=e,e=null);var o=mo.xhr(n,t,i);return o.row=function(n){return arguments.length?o.response(null==(e=n)?r:u(n)):e},o.row(e)}function r(n){return e.parse(n.responseText)}function u(n){return function(t){return e.parse(t.responseText,n)}}function o(t){return t.map(a).join(n)}function a(n){return c.test(n)?'"'+n.replace(/\"/g,'""')+'"':n}var c=new RegExp('["'+n+"\n]"),l=n.charCodeAt(0);return e.parse=function(n,t){var r;return e.parseRows(n,function(n,e){if(r)return r(n,e-1);var u=new Function("d","return {"+n.map(function(n,t){return JSON.stringify(n)+": d["+t+"]"}).join(",")+"}");r=t?function(n,e){return t(u(n),e)}:u})},e.parseRows=function(n,t){function e(){if(s>=c)return o;if(u)return u=!1,i;var t=s;if(34===n.charCodeAt(t)){for(var e=t;e++<c;)if(34===n.charCodeAt(e)){if(34!==n.charCodeAt(e+1))break;++e}s=e+2;var r=n.charCodeAt(e+1);return 13===r?(u=!0,10===n.charCodeAt(e+2)&&++s):10===r&&(u=!0),n.substring(t+1,e).replace(/""/g,'"')}for(;c>s;){var r=n.charCodeAt(s++),a=1;if(10===r)u=!0;else if(13===r)u=!0,10===n.charCodeAt(s)&&(++s,++a);else if(r!==l)continue;return n.substring(t,s-a)}return n.substring(t)}for(var r,u,i={},o={},a=[],c=n.length,s=0,f=0;(r=e())!==o;){for(var h=[];r!==i&&r!==o;)h.push(r),r=e();(!t||(h=t(h,f++)))&&a.push(h)}return a},e.format=function(t){if(Array.isArray(t[0]))return e.formatRows(t);var r=new i,u=[];return t.forEach(function(n){for(var t in n)r.has(t)||u.push(r.add(t))}),[u.map(a).join(n)].concat(t.map(function(t){return u.map(function(n){return a(t[n])}).join(n)})).join("\n")},e.formatRows=function(n){return n.map(o).join("\n")},e},mo.csv=mo.dsv(",","text/csv"),mo.tsv=mo.dsv("	","text/tab-separated-values");var va,ma,ya,Ma,xa,ba=_o[a(_o,"requestAnimationFrame")]||function(n){setTimeout(n,17)};mo.timer=function(n,t,e){var r=arguments.length;2>r&&(t=0),3>r&&(e=Date.now());var u=e+t,i={callback:n,time:u,next:null};ma?ma.next=i:va=i,ma=i,ya||(Ma=clearTimeout(Ma),ya=1,ba(Mt))},mo.timer.flush=function(){bt(),_t()};var _a=".",wa=",",Sa=[3,3],Ea="$",ka=["y","z","a","f","p","n","\xb5","m","","k","M","G","T","P","E","Z","Y"].map(wt);mo.formatPrefix=function(n,t){var e=0;return n&&(0>n&&(n*=-1),t&&(n=mo.round(n,St(n,t))),e=1+Math.floor(1e-12+Math.log(n)/Math.LN10),e=Math.max(-24,Math.min(24,3*Math.floor((0>=e?e+1:e-1)/3)))),ka[8+e/3]},mo.round=function(n,t){return t?Math.round(n*(t=Math.pow(10,t)))/t:Math.round(n)},mo.format=function(n){var t=Aa.exec(n),e=t[1]||" ",r=t[2]||">",u=t[3]||"",i=t[4]||"",o=t[5],a=+t[6],c=t[7],l=t[8],s=t[9],f=1,h="",g=!1;switch(l&&(l=+l.substring(1)),(o||"0"===e&&"="===r)&&(o=e="0",r="=",c&&(a-=Math.floor((a-1)/4))),s){case"n":c=!0,s="g";break;case"%":f=100,h="%",s="f";break;case"p":f=100,h="%",s="r";break;case"b":case"o":case"x":case"X":"#"===i&&(i="0"+s.toLowerCase());case"c":case"d":g=!0,l=0;break;case"s":f=-1,s="r"}"#"===i?i="":"$"===i&&(i=Ea),"r"!=s||l||(s="g"),null!=l&&("g"==s?l=Math.max(1,Math.min(21,l)):("e"==s||"f"==s)&&(l=Math.max(0,Math.min(20,l)))),s=Na.get(s)||Et;var p=o&&c;return function(n){if(g&&n%1)return"";var t=0>n||0===n&&0>1/n?(n=-n,"-"):u;if(0>f){var d=mo.formatPrefix(n,l);n=d.scale(n),h=d.symbol}else n*=f;n=s(n,l);var v=n.lastIndexOf("."),m=0>v?n:n.substring(0,v),y=0>v?"":_a+n.substring(v+1);!o&&c&&(m=Ta(m));var M=i.length+m.length+y.length+(p?0:t.length),x=a>M?new Array(M=a-M+1).join(e):"";return p&&(m=Ta(x+m)),t+=i,n=m+y,("<"===r?t+n+x:">"===r?x+t+n:"^"===r?x.substring(0,M>>=1)+t+n+x.substring(M):t+(p?n:x+n))+h}};var Aa=/(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,Na=mo.map({b:function(n){return n.toString(2)},c:function(n){return String.fromCharCode(n)},o:function(n){return n.toString(8)},x:function(n){return n.toString(16)},X:function(n){return n.toString(16).toUpperCase()},g:function(n,t){return n.toPrecision(t)},e:function(n,t){return n.toExponential(t)},f:function(n,t){return n.toFixed(t)},r:function(n,t){return(n=mo.round(n,St(n,t))).toFixed(Math.max(0,Math.min(20,St(n*(1+1e-15),t))))}}),Ta=dt;if(Sa){var qa=Sa.length;Ta=function(n){for(var t=n.length,e=[],r=0,u=Sa[0];t>0&&u>0;)e.push(n.substring(t-=u,t+u)),u=Sa[r=(r+1)%qa];return e.reverse().join(wa)}}mo.geo={},kt.prototype={s:0,t:0,add:function(n){At(n,this.t,za),At(za.s,this.s,this),this.s?this.t+=za.t:this.s=za.t},reset:function(){this.s=this.t=0},valueOf:function(){return this.s}};var za=new kt;mo.geo.stream=function(n,t){n&&Ca.hasOwnProperty(n.type)?Ca[n.type](n,t):Nt(n,t)};var Ca={Feature:function(n,t){Nt(n.geometry,t)},FeatureCollection:function(n,t){for(var e=n.features,r=-1,u=e.length;++r<u;)Nt(e[r].geometry,t)}},Da={Sphere:function(n,t){t.sphere()},Point:function(n,t){n=n.coordinates,t.point(n[0],n[1],n[2])},MultiPoint:function(n,t){for(var e=n.coordinates,r=-1,u=e.length;++r<u;)n=e[r],t.point(n[0],n[1],n[2])},LineString:function(n,t){Tt(n.coordinates,t,0)},MultiLineString:function(n,t){for(var e=n.coordinates,r=-1,u=e.length;++r<u;)Tt(e[r],t,0)},Polygon:function(n,t){qt(n.coordinates,t)},MultiPolygon:function(n,t){for(var e=n.coordinates,r=-1,u=e.length;++r<u;)qt(e[r],t)},GeometryCollection:function(n,t){for(var e=n.geometries,r=-1,u=e.length;++r<u;)Nt(e[r],t)}};mo.geo.area=function(n){return ja=0,mo.geo.stream(n,Ha),ja};var ja,La=new kt,Ha={sphere:function(){ja+=4*Bo},point:c,lineStart:c,lineEnd:c,polygonStart:function(){La.reset(),Ha.lineStart=zt},polygonEnd:function(){var n=2*La;ja+=0>n?4*Bo+n:n,Ha.lineStart=Ha.lineEnd=Ha.point=c}};mo.geo.bounds=function(){function n(n,t){M.push(x=[s=n,h=n]),f>t&&(f=t),t>g&&(g=t)}function t(t,e){var r=Ct([t*Qo,e*Qo]);if(m){var u=jt(m,r),i=[u[1],-u[0],0],o=jt(i,u);Ft(o),o=Pt(o);var c=t-p,l=c>0?1:-1,d=o[0]*na*l,v=Math.abs(c)>180;if(v^(d>l*p&&l*t>d)){var y=o[1]*na;y>g&&(g=y)}else if(d=(d+360)%360-180,v^(d>l*p&&l*t>d)){var y=-o[1]*na;f>y&&(f=y)}else f>e&&(f=e),e>g&&(g=e);v?p>t?a(s,t)>a(s,h)&&(h=t):a(t,h)>a(s,h)&&(s=t):h>=s?(s>t&&(s=t),t>h&&(h=t)):t>p?a(s,t)>a(s,h)&&(h=t):a(t,h)>a(s,h)&&(s=t)}else n(t,e);m=r,p=t}function e(){b.point=t}function r(){x[0]=s,x[1]=h,b.point=n,m=null}function u(n,e){if(m){var r=n-p;y+=Math.abs(r)>180?r+(r>0?360:-360):r}else d=n,v=e;Ha.point(n,e),t(n,e)}function i(){Ha.lineStart()}function o(){u(d,v),Ha.lineEnd(),Math.abs(y)>Go&&(s=-(h=180)),x[0]=s,x[1]=h,m=null}function a(n,t){return(t-=n)<0?t+360:t}function c(n,t){return n[0]-t[0]}function l(n,t){return t[0]<=t[1]?t[0]<=n&&n<=t[1]:n<t[0]||t[1]<n}var s,f,h,g,p,d,v,m,y,M,x,b={point:n,lineStart:e,lineEnd:r,polygonStart:function(){b.point=u,b.lineStart=i,b.lineEnd=o,y=0,Ha.polygonStart()},polygonEnd:function(){Ha.polygonEnd(),b.point=n,b.lineStart=e,b.lineEnd=r,0>La?(s=-(h=180),f=-(g=90)):y>Go?g=90:-Go>y&&(f=-90),x[0]=s,x[1]=h}};return function(n){g=h=-(s=f=1/0),M=[],mo.geo.stream(n,b);var t=M.length;if(t){M.sort(c);for(var e,r=1,u=M[0],i=[u];t>r;++r)e=M[r],l(e[0],u)||l(e[1],u)?(a(u[0],e[1])>a(u[0],u[1])&&(u[1]=e[1]),a(e[0],u[1])>a(u[0],u[1])&&(u[0]=e[0])):i.push(u=e);for(var o,e,p=-1/0,t=i.length-1,r=0,u=i[t];t>=r;u=e,++r)e=i[r],(o=a(u[1],e[0]))>p&&(p=o,s=e[0],h=u[1])}return M=x=null,1/0===s||1/0===f?[[0/0,0/0],[0/0,0/0]]:[[s,f],[h,g]]}}(),mo.geo.centroid=function(n){Fa=Pa=Oa=Ra=Ya=Ia=Ua=Za=Va=Xa=$a=0,mo.geo.stream(n,Ba);var t=Va,e=Xa,r=$a,u=t*t+e*e+r*r;return Ko>u&&(t=Ia,e=Ua,r=Za,Go>Pa&&(t=Oa,e=Ra,r=Ya),u=t*t+e*e+r*r,Ko>u)?[0/0,0/0]:[Math.atan2(e,t)*na,O(r/Math.sqrt(u))*na]};var Fa,Pa,Oa,Ra,Ya,Ia,Ua,Za,Va,Xa,$a,Ba={sphere:c,point:Rt,lineStart:It,lineEnd:Ut,polygonStart:function(){Ba.lineStart=Zt},polygonEnd:function(){Ba.lineStart=It}},Wa=Bt(Vt,Qt,te,[-Bo,-Bo/2]),Ja=1e9;mo.geo.clipExtent=function(){var n,t,e,r,u,i,o={stream:function(n){return u&&(u.valid=!1),u=i(n),u.valid=!0,u},extent:function(a){return arguments.length?(i=re(n=+a[0][0],t=+a[0][1],e=+a[1][0],r=+a[1][1]),u&&(u.valid=!1,u=null),o):[[n,t],[e,r]]}};return o.extent([[0,0],[960,500]])},(mo.geo.conicEqualArea=function(){return oe(ae)}).raw=ae,mo.geo.albers=function(){return mo.geo.conicEqualArea().rotate([96,0]).center([-.6,38.7]).parallels([29.5,45.5]).scale(1070)},mo.geo.albersUsa=function(){function n(n){var i=n[0],o=n[1];return t=null,e(i,o),t||(r(i,o),t)||u(i,o),t}var t,e,r,u,i=mo.geo.albers(),o=mo.geo.conicEqualArea().rotate([154,0]).center([-2,58.5]).parallels([55,65]),a=mo.geo.conicEqualArea().rotate([157,0]).center([-3,19.9]).parallels([8,18]),c={point:function(n,e){t=[n,e]}};return n.invert=function(n){var t=i.scale(),e=i.translate(),r=(n[0]-e[0])/t,u=(n[1]-e[1])/t;return(u>=.12&&.234>u&&r>=-.425&&-.214>r?o:u>=.166&&.234>u&&r>=-.214&&-.115>r?a:i).invert(n)},n.stream=function(n){var t=i.stream(n),e=o.stream(n),r=a.stream(n);return{point:function(n,u){t.point(n,u),e.point(n,u),r.point(n,u)},sphere:function(){t.sphere(),e.sphere(),r.sphere()},lineStart:function(){t.lineStart(),e.lineStart(),r.lineStart()},lineEnd:function(){t.lineEnd(),e.lineEnd(),r.lineEnd()},polygonStart:function(){t.polygonStart(),e.polygonStart(),r.polygonStart()},polygonEnd:function(){t.polygonEnd(),e.polygonEnd(),r.polygonEnd()}}},n.precision=function(t){return arguments.length?(i.precision(t),o.precision(t),a.precision(t),n):i.precision()},n.scale=function(t){return arguments.length?(i.scale(t),o.scale(.35*t),a.scale(t),n.translate(i.translate())):i.scale()},n.translate=function(t){if(!arguments.length)return i.translate();var l=i.scale(),s=+t[0],f=+t[1];return e=i.translate(t).clipExtent([[s-.455*l,f-.238*l],[s+.455*l,f+.238*l]]).stream(c).point,r=o.translate([s-.307*l,f+.201*l]).clipExtent([[s-.425*l+Go,f+.12*l+Go],[s-.214*l-Go,f+.234*l-Go]]).stream(c).point,u=a.translate([s-.205*l,f+.212*l]).clipExtent([[s-.214*l+Go,f+.166*l+Go],[s-.115*l-Go,f+.234*l-Go]]).stream(c).point,n},n.scale(1070)};var Ga,Ka,Qa,nc,tc,ec,rc={point:c,lineStart:c,lineEnd:c,polygonStart:function(){Ka=0,rc.lineStart=ce},polygonEnd:function(){rc.lineStart=rc.lineEnd=rc.point=c,Ga+=Math.abs(Ka/2)}},uc={point:le,lineStart:c,lineEnd:c,polygonStart:c,polygonEnd:c},ic={point:he,lineStart:ge,lineEnd:pe,polygonStart:function(){ic.lineStart=de},polygonEnd:function(){ic.point=he,ic.lineStart=ge,ic.lineEnd=pe}};mo.geo.transform=function(n){return{stream:function(t){var e=new ye(t);for(var r in n)e[r]=n[r];return e}}},ye.prototype={point:function(n,t){this.stream.point(n,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}},mo.geo.path=function(){function n(n){return n&&("function"==typeof a&&i.pointRadius(+a.apply(this,arguments)),o&&o.valid||(o=u(i)),mo.geo.stream(n,o)),i.result()}function t(){return o=null,n}var e,r,u,i,o,a=4.5;return n.area=function(n){return Ga=0,mo.geo.stream(n,u(rc)),Ga},n.centroid=function(n){return Oa=Ra=Ya=Ia=Ua=Za=Va=Xa=$a=0,mo.geo.stream(n,u(ic)),$a?[Va/$a,Xa/$a]:Za?[Ia/Za,Ua/Za]:Ya?[Oa/Ya,Ra/Ya]:[0/0,0/0]},n.bounds=function(n){return tc=ec=-(Qa=nc=1/0),mo.geo.stream(n,u(uc)),[[Qa,nc],[tc,ec]]},n.projection=function(n){return arguments.length?(u=(e=n)?n.stream||Me(n):dt,t()):e},n.context=function(n){return arguments.length?(i=null==(r=n)?new se:new ve(n),"function"!=typeof a&&i.pointRadius(a),t()):r},n.pointRadius=function(t){return arguments.length?(a="function"==typeof t?t:(i.pointRadius(+t),+t),n):a},n.projection(mo.geo.albersUsa()).context(null)},mo.geo.projection=xe,mo.geo.projectionMutator=be,(mo.geo.equirectangular=function(){return xe(we)}).raw=we.invert=we,mo.geo.rotation=function(n){function t(t){return t=n(t[0]*Qo,t[1]*Qo),t[0]*=na,t[1]*=na,t}return n=Ee(n[0]%360*Qo,n[1]*Qo,n.length>2?n[2]*Qo:0),t.invert=function(t){return t=n.invert(t[0]*Qo,t[1]*Qo),t[0]*=na,t[1]*=na,t},t},Se.invert=we,mo.geo.circle=function(){function n(){var n="function"==typeof r?r.apply(this,arguments):r,t=Ee(-n[0]*Qo,-n[1]*Qo,0).invert,u=[];return e(null,null,1,{point:function(n,e){u.push(n=t(n,e)),n[0]*=na,n[1]*=na}}),{type:"Polygon",coordinates:[u]}}var t,e,r=[0,0],u=6;return n.origin=function(t){return arguments.length?(r=t,n):r},n.angle=function(r){return arguments.length?(e=Te((t=+r)*Qo,u*Qo),n):t},n.precision=function(r){return arguments.length?(e=Te(t*Qo,(u=+r)*Qo),n):u},n.angle(90)},mo.geo.distance=function(n,t){var e,r=(t[0]-n[0])*Qo,u=n[1]*Qo,i=t[1]*Qo,o=Math.sin(r),a=Math.cos(r),c=Math.sin(u),l=Math.cos(u),s=Math.sin(i),f=Math.cos(i);return Math.atan2(Math.sqrt((e=f*o)*e+(e=l*s-c*f*a)*e),c*s+l*f*a)},mo.geo.graticule=function(){function n(){return{type:"MultiLineString",coordinates:t()}}function t(){return mo.range(Math.ceil(i/v)*v,u,v).map(h).concat(mo.range(Math.ceil(l/m)*m,c,m).map(g)).concat(mo.range(Math.ceil(r/p)*p,e,p).filter(function(n){return Math.abs(n%v)>Go
}).map(s)).concat(mo.range(Math.ceil(a/d)*d,o,d).filter(function(n){return Math.abs(n%m)>Go}).map(f))}var e,r,u,i,o,a,c,l,s,f,h,g,p=10,d=p,v=90,m=360,y=2.5;return n.lines=function(){return t().map(function(n){return{type:"LineString",coordinates:n}})},n.outline=function(){return{type:"Polygon",coordinates:[h(i).concat(g(c).slice(1),h(u).reverse().slice(1),g(l).reverse().slice(1))]}},n.extent=function(t){return arguments.length?n.majorExtent(t).minorExtent(t):n.minorExtent()},n.majorExtent=function(t){return arguments.length?(i=+t[0][0],u=+t[1][0],l=+t[0][1],c=+t[1][1],i>u&&(t=i,i=u,u=t),l>c&&(t=l,l=c,c=t),n.precision(y)):[[i,l],[u,c]]},n.minorExtent=function(t){return arguments.length?(r=+t[0][0],e=+t[1][0],a=+t[0][1],o=+t[1][1],r>e&&(t=r,r=e,e=t),a>o&&(t=a,a=o,o=t),n.precision(y)):[[r,a],[e,o]]},n.step=function(t){return arguments.length?n.majorStep(t).minorStep(t):n.minorStep()},n.majorStep=function(t){return arguments.length?(v=+t[0],m=+t[1],n):[v,m]},n.minorStep=function(t){return arguments.length?(p=+t[0],d=+t[1],n):[p,d]},n.precision=function(t){return arguments.length?(y=+t,s=ze(a,o,90),f=Ce(r,e,y),h=ze(l,c,90),g=Ce(i,u,y),n):y},n.majorExtent([[-180,-90+Go],[180,90-Go]]).minorExtent([[-180,-80-Go],[180,80+Go]])},mo.geo.greatArc=function(){function n(){return{type:"LineString",coordinates:[t||r.apply(this,arguments),e||u.apply(this,arguments)]}}var t,e,r=De,u=je;return n.distance=function(){return mo.geo.distance(t||r.apply(this,arguments),e||u.apply(this,arguments))},n.source=function(e){return arguments.length?(r=e,t="function"==typeof e?null:e,n):r},n.target=function(t){return arguments.length?(u=t,e="function"==typeof t?null:t,n):u},n.precision=function(){return arguments.length?n:0},n},mo.geo.interpolate=function(n,t){return Le(n[0]*Qo,n[1]*Qo,t[0]*Qo,t[1]*Qo)},mo.geo.length=function(n){return oc=0,mo.geo.stream(n,ac),oc};var oc,ac={sphere:c,point:c,lineStart:He,lineEnd:c,polygonStart:c,polygonEnd:c},cc=Fe(function(n){return Math.sqrt(2/(1+n))},function(n){return 2*Math.asin(n/2)});(mo.geo.azimuthalEqualArea=function(){return xe(cc)}).raw=cc;var lc=Fe(function(n){var t=Math.acos(n);return t&&t/Math.sin(t)},dt);(mo.geo.azimuthalEquidistant=function(){return xe(lc)}).raw=lc,(mo.geo.conicConformal=function(){return oe(Pe)}).raw=Pe,(mo.geo.conicEquidistant=function(){return oe(Oe)}).raw=Oe;var sc=Fe(function(n){return 1/n},Math.atan);(mo.geo.gnomonic=function(){return xe(sc)}).raw=sc,Re.invert=function(n,t){return[n,2*Math.atan(Math.exp(t))-Jo]},(mo.geo.mercator=function(){return Ye(Re)}).raw=Re;var fc=Fe(function(){return 1},Math.asin);(mo.geo.orthographic=function(){return xe(fc)}).raw=fc;var hc=Fe(function(n){return 1/(1+n)},function(n){return 2*Math.atan(n)});(mo.geo.stereographic=function(){return xe(hc)}).raw=hc,Ie.invert=function(n,t){return[Math.atan2(R(n),Math.cos(t)),O(Math.sin(t)/Y(n))]},(mo.geo.transverseMercator=function(){return Ye(Ie)}).raw=Ie,mo.geom={},mo.svg={},mo.svg.line=function(){return Ue(dt)};var gc=mo.map({linear:Xe,"linear-closed":$e,step:Be,"step-before":We,"step-after":Je,basis:er,"basis-open":rr,"basis-closed":ur,bundle:ir,cardinal:Qe,"cardinal-open":Ge,"cardinal-closed":Ke,monotone:fr});gc.forEach(function(n,t){t.key=n,t.closed=/-closed$/.test(n)});var pc=[0,2/3,1/3,0],dc=[0,1/3,2/3,0],vc=[0,1/6,2/3,1/6];mo.geom.hull=function(n){function t(n){if(n.length<3)return[];var t,u,i,o,a,c,l,s,f,h,g,p,d=pt(e),v=pt(r),m=n.length,y=m-1,M=[],x=[],b=0;if(d===Ze&&r===Ve)t=n;else for(i=0,t=[];m>i;++i)t.push([+d.call(this,u=n[i],i),+v.call(this,u,i)]);for(i=1;m>i;++i)(t[i][1]<t[b][1]||t[i][1]==t[b][1]&&t[i][0]<t[b][0])&&(b=i);for(i=0;m>i;++i)i!==b&&(c=t[i][1]-t[b][1],a=t[i][0]-t[b][0],M.push({angle:Math.atan2(c,a),index:i}));for(M.sort(function(n,t){return n.angle-t.angle}),g=M[0].angle,h=M[0].index,f=0,i=1;y>i;++i){if(o=M[i].index,g==M[i].angle){if(a=t[h][0]-t[b][0],c=t[h][1]-t[b][1],l=t[o][0]-t[b][0],s=t[o][1]-t[b][1],a*a+c*c>=l*l+s*s){M[i].index=-1;continue}M[f].index=-1}g=M[i].angle,f=i,h=o}for(x.push(b),i=0,o=0;2>i;++o)M[o].index>-1&&(x.push(M[o].index),i++);for(p=x.length;y>o;++o)if(!(M[o].index<0)){for(;!hr(x[p-2],x[p-1],M[o].index,t);)--p;x[p++]=M[o].index}var _=[];for(i=p-1;i>=0;--i)_.push(n[x[i]]);return _}var e=Ze,r=Ve;return arguments.length?t(n):(t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t)},mo.geom.polygon=function(n){return Lo(n,mc),n};var mc=mo.geom.polygon.prototype=[];mc.area=function(){for(var n,t=-1,e=this.length,r=this[e-1],u=0;++t<e;)n=r,r=this[t],u+=n[1]*r[0]-n[0]*r[1];return.5*u},mc.centroid=function(n){var t,e,r=-1,u=this.length,i=0,o=0,a=this[u-1];for(arguments.length||(n=-1/(6*this.area()));++r<u;)t=a,a=this[r],e=t[0]*a[1]-a[0]*t[1],i+=(t[0]+a[0])*e,o+=(t[1]+a[1])*e;return[i*n,o*n]},mc.clip=function(n){for(var t,e,r,u,i,o,a=dr(n),c=-1,l=this.length-dr(this),s=this[l-1];++c<l;){for(t=n.slice(),n.length=0,u=this[c],i=t[(r=t.length-a)-1],e=-1;++e<r;)o=t[e],gr(o,s,u)?(gr(i,s,u)||n.push(pr(i,o,s,u)),n.push(o)):gr(i,s,u)&&n.push(pr(i,o,s,u)),i=o;a&&n.push(n[0]),s=u}return n},mo.geom.delaunay=function(n){var t=n.map(function(){return[]}),e=[];return vr(n,function(e){t[e.region.l.index].push(n[e.region.r.index])}),t.forEach(function(t,r){var u=n[r],i=u[0],o=u[1];t.forEach(function(n){n.angle=Math.atan2(n[0]-i,n[1]-o)}),t.sort(function(n,t){return n.angle-t.angle});for(var a=0,c=t.length-1;c>a;a++)e.push([u,t[a],t[a+1]])}),e},mo.geom.voronoi=function(n){function t(n){var t,i,o,a=n.map(function(){return[]}),c=pt(e),l=pt(r),s=n.length,f=1e6;if(c===Ze&&l===Ve)t=n;else for(t=new Array(s),o=0;s>o;++o)t[o]=[+c.call(this,i=n[o],o),+l.call(this,i,o)];if(vr(t,function(n){var t,e,r,u,i,o;1===n.a&&n.b>=0?(t=n.ep.r,e=n.ep.l):(t=n.ep.l,e=n.ep.r),1===n.a?(i=t?t.y:-f,r=n.c-n.b*i,o=e?e.y:f,u=n.c-n.b*o):(r=t?t.x:-f,i=n.c-n.a*r,u=e?e.x:f,o=n.c-n.a*u);var c=[r,i],l=[u,o];a[n.region.l.index].push(c,l),a[n.region.r.index].push(c,l)}),a=a.map(function(n,e){var r=t[e][0],u=t[e][1],i=n.map(function(n){return Math.atan2(n[0]-r,n[1]-u)}),o=mo.range(n.length).sort(function(n,t){return i[n]-i[t]});return o.filter(function(n,t){return!t||i[n]-i[o[t-1]]>Go}).map(function(t){return n[t]})}),a.forEach(function(n,e){var r=n.length;if(!r)return n.push([-f,-f],[-f,f],[f,f],[f,-f]);if(!(r>2)){var u=t[e],i=n[0],o=n[1],a=u[0],c=u[1],l=i[0],s=i[1],h=o[0],g=o[1],p=Math.abs(h-l),d=g-s;if(Math.abs(d)<Go){var v=s>c?-f:f;n.push([-f,v],[f,v])}else if(Go>p){var m=l>a?-f:f;n.push([m,-f],[m,f])}else{var v=(l-a)*(g-s)>(h-l)*(s-c)?f:-f,y=Math.abs(d)-p;Math.abs(y)<Go?n.push([0>d?v:-v,v]):(y>0&&(v*=-1),n.push([-f,v],[f,v]))}}}),u)for(o=0;s>o;++o)u.clip(a[o]);for(o=0;s>o;++o)a[o].point=n[o];return a}var e=Ze,r=Ve,u=null;return arguments.length?t(n):(t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t.clipExtent=function(n){if(!arguments.length)return u&&[u[0],u[2]];if(null==n)u=null;else{var e=+n[0][0],r=+n[0][1],i=+n[1][0],o=+n[1][1];u=mo.geom.polygon([[e,r],[e,o],[i,o],[i,r]])}return t},t.size=function(n){return arguments.length?t.clipExtent(n&&[[0,0],n]):u&&u[2]},t.links=function(n){var t,u,i,o=n.map(function(){return[]}),a=[],c=pt(e),l=pt(r),s=n.length;if(c===Ze&&l===Ve)t=n;else for(t=new Array(s),i=0;s>i;++i)t[i]=[+c.call(this,u=n[i],i),+l.call(this,u,i)];return vr(t,function(t){var e=t.region.l.index,r=t.region.r.index;o[e][r]||(o[e][r]=o[r][e]=!0,a.push({source:n[e],target:n[r]}))}),a},t.triangles=function(n){if(e===Ze&&r===Ve)return mo.geom.delaunay(n);for(var t,u=new Array(c),i=pt(e),o=pt(r),a=-1,c=n.length;++a<c;)(u[a]=[+i.call(this,t=n[a],a),+o.call(this,t,a)]).data=t;return mo.geom.delaunay(u).map(function(n){return n.map(function(n){return n.data})})},t)};var yc={l:"r",r:"l"};mo.geom.quadtree=function(n,t,e,r,u){function i(n){function i(n,t,e,r,u,i,o,a){if(!isNaN(e)&&!isNaN(r))if(n.leaf){var c=n.x,s=n.y;if(null!=c)if(Math.abs(c-e)+Math.abs(s-r)<.01)l(n,t,e,r,u,i,o,a);else{var f=n.point;n.x=n.y=n.point=null,l(n,f,c,s,u,i,o,a),l(n,t,e,r,u,i,o,a)}else n.x=e,n.y=r,n.point=t}else l(n,t,e,r,u,i,o,a)}function l(n,t,e,r,u,o,a,c){var l=.5*(u+a),s=.5*(o+c),f=e>=l,h=r>=s,g=(h<<1)+f;n.leaf=!1,n=n.nodes[g]||(n.nodes[g]=Mr()),f?u=l:a=l,h?o=s:c=s,i(n,t,e,r,u,o,a,c)}var s,f,h,g,p,d,v,m,y,M=pt(a),x=pt(c);if(null!=t)d=t,v=e,m=r,y=u;else if(m=y=-(d=v=1/0),f=[],h=[],p=n.length,o)for(g=0;p>g;++g)s=n[g],s.x<d&&(d=s.x),s.y<v&&(v=s.y),s.x>m&&(m=s.x),s.y>y&&(y=s.y),f.push(s.x),h.push(s.y);else for(g=0;p>g;++g){var b=+M(s=n[g],g),_=+x(s,g);d>b&&(d=b),v>_&&(v=_),b>m&&(m=b),_>y&&(y=_),f.push(b),h.push(_)}var w=m-d,S=y-v;w>S?y=v+w:m=d+S;var E=Mr();if(E.add=function(n){i(E,n,+M(n,++g),+x(n,g),d,v,m,y)},E.visit=function(n){xr(n,E,d,v,m,y)},g=-1,null==t){for(;++g<p;)i(E,n[g],f[g],h[g],d,v,m,y);--g}else n.forEach(E.add);return f=h=n=s=null,E}var o,a=Ze,c=Ve;return(o=arguments.length)?(a=mr,c=yr,3===o&&(u=e,r=t,e=t=0),i(n)):(i.x=function(n){return arguments.length?(a=n,i):a},i.y=function(n){return arguments.length?(c=n,i):c},i.extent=function(n){return arguments.length?(null==n?t=e=r=u=null:(t=+n[0][0],e=+n[0][1],r=+n[1][0],u=+n[1][1]),i):null==t?null:[[t,e],[r,u]]},i.size=function(n){return arguments.length?(null==n?t=e=r=u=null:(t=e=0,r=+n[0],u=+n[1]),i):null==t?null:[r-t,u-e]},i)},mo.interpolateRgb=br,mo.interpolateObject=_r,mo.interpolateNumber=wr,mo.interpolateString=Sr;var Mc=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;mo.interpolate=Er,mo.interpolators=[function(n,t){var e=typeof t;return("string"===e?da.has(t)||/^(#|rgb\(|hsl\()/.test(t)?br:Sr:t instanceof Z?br:"object"===e?Array.isArray(t)?kr:_r:wr)(n,t)}],mo.interpolateArray=kr;var xc=function(){return dt},bc=mo.map({linear:xc,poly:Dr,quad:function(){return qr},cubic:function(){return zr},sin:function(){return jr},exp:function(){return Lr},circle:function(){return Hr},elastic:Fr,back:Pr,bounce:function(){return Or}}),_c=mo.map({"in":dt,out:Nr,"in-out":Tr,"out-in":function(n){return Tr(Nr(n))}});mo.ease=function(n){var t=n.indexOf("-"),e=t>=0?n.substring(0,t):n,r=t>=0?n.substring(t+1):"in";return e=bc.get(e)||xc,r=_c.get(r)||dt,Ar(r(e.apply(null,Array.prototype.slice.call(arguments,1))))},mo.interpolateHcl=Rr,mo.interpolateHsl=Yr,mo.interpolateLab=Ir,mo.interpolateRound=Ur,mo.transform=function(n){var t=xo.createElementNS(mo.ns.prefix.svg,"g");return(mo.transform=function(n){if(null!=n){t.setAttribute("transform",n);var e=t.transform.baseVal.consolidate()}return new Zr(e?e.matrix:wc)})(n)},Zr.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"};var wc={a:1,b:0,c:0,d:1,e:0,f:0};mo.interpolateTransform=Br,mo.layout={},mo.layout.bundle=function(){return function(n){for(var t=[],e=-1,r=n.length;++e<r;)t.push(Gr(n[e]));return t}},mo.layout.chord=function(){function n(){var n,l,f,h,g,p={},d=[],v=mo.range(i),m=[];for(e=[],r=[],n=0,h=-1;++h<i;){for(l=0,g=-1;++g<i;)l+=u[h][g];d.push(l),m.push(mo.range(i)),n+=l}for(o&&v.sort(function(n,t){return o(d[n],d[t])}),a&&m.forEach(function(n,t){n.sort(function(n,e){return a(u[t][n],u[t][e])})}),n=(Wo-s*i)/n,l=0,h=-1;++h<i;){for(f=l,g=-1;++g<i;){var y=v[h],M=m[y][g],x=u[y][M],b=l,_=l+=x*n;p[y+"-"+M]={index:y,subindex:M,startAngle:b,endAngle:_,value:x}}r[y]={index:y,startAngle:f,endAngle:l,value:(l-f)/n},l+=s}for(h=-1;++h<i;)for(g=h-1;++g<i;){var w=p[h+"-"+g],S=p[g+"-"+h];(w.value||S.value)&&e.push(w.value<S.value?{source:S,target:w}:{source:w,target:S})}c&&t()}function t(){e.sort(function(n,t){return c((n.source.value+n.target.value)/2,(t.source.value+t.target.value)/2)})}var e,r,u,i,o,a,c,l={},s=0;return l.matrix=function(n){return arguments.length?(i=(u=n)&&u.length,e=r=null,l):u},l.padding=function(n){return arguments.length?(s=n,e=r=null,l):s},l.sortGroups=function(n){return arguments.length?(o=n,e=r=null,l):o},l.sortSubgroups=function(n){return arguments.length?(a=n,e=null,l):a},l.sortChords=function(n){return arguments.length?(c=n,e&&t(),l):c},l.chords=function(){return e||n(),e},l.groups=function(){return r||n(),r},l},mo.layout.force=function(){function n(n){return function(t,e,r,u){if(t.point!==n){var i=t.cx-n.x,o=t.cy-n.y,a=1/Math.sqrt(i*i+o*o);if(d>(u-e)*a){var c=t.charge*a*a;return n.px-=i*c,n.py-=o*c,!0}if(t.point&&isFinite(a)){var c=t.pointCharge*a*a;n.px-=i*c,n.py-=o*c}}return!t.charge}}function t(n){n.px=mo.event.x,n.py=mo.event.y,a.resume()}var e,r,u,i,o,a={},c=mo.dispatch("start","tick","end"),l=[1,1],s=.9,f=Sc,h=Ec,g=-30,p=.1,d=.8,v=[],m=[];return a.tick=function(){if((r*=.99)<.005)return c.end({type:"end",alpha:r=0}),!0;var t,e,a,f,h,d,y,M,x,b=v.length,_=m.length;for(e=0;_>e;++e)a=m[e],f=a.source,h=a.target,M=h.x-f.x,x=h.y-f.y,(d=M*M+x*x)&&(d=r*i[e]*((d=Math.sqrt(d))-u[e])/d,M*=d,x*=d,h.x-=M*(y=f.weight/(h.weight+f.weight)),h.y-=x*y,f.x+=M*(y=1-y),f.y+=x*y);if((y=r*p)&&(M=l[0]/2,x=l[1]/2,e=-1,y))for(;++e<b;)a=v[e],a.x+=(M-a.x)*y,a.y+=(x-a.y)*y;if(g)for(uu(t=mo.geom.quadtree(v),r,o),e=-1;++e<b;)(a=v[e]).fixed||t.visit(n(a));for(e=-1;++e<b;)a=v[e],a.fixed?(a.x=a.px,a.y=a.py):(a.x-=(a.px-(a.px=a.x))*s,a.y-=(a.py-(a.py=a.y))*s);c.tick({type:"tick",alpha:r})},a.nodes=function(n){return arguments.length?(v=n,a):v},a.links=function(n){return arguments.length?(m=n,a):m},a.size=function(n){return arguments.length?(l=n,a):l},a.linkDistance=function(n){return arguments.length?(f="function"==typeof n?n:+n,a):f},a.distance=a.linkDistance,a.linkStrength=function(n){return arguments.length?(h="function"==typeof n?n:+n,a):h},a.friction=function(n){return arguments.length?(s=+n,a):s},a.charge=function(n){return arguments.length?(g="function"==typeof n?n:+n,a):g},a.gravity=function(n){return arguments.length?(p=+n,a):p},a.theta=function(n){return arguments.length?(d=+n,a):d},a.alpha=function(n){return arguments.length?(n=+n,r?r=n>0?n:0:n>0&&(c.start({type:"start",alpha:r=n}),mo.timer(a.tick)),a):r},a.start=function(){function n(n,r){for(var u,i=t(e),o=-1,a=i.length;++o<a;)if(!isNaN(u=i[o][n]))return u;return Math.random()*r}function t(){if(!c){for(c=[],r=0;p>r;++r)c[r]=[];for(r=0;d>r;++r){var n=m[r];c[n.source.index].push(n.target),c[n.target.index].push(n.source)}}return c[e]}var e,r,c,s,p=v.length,d=m.length,y=l[0],M=l[1];for(e=0;p>e;++e)(s=v[e]).index=e,s.weight=0;for(e=0;d>e;++e)s=m[e],"number"==typeof s.source&&(s.source=v[s.source]),"number"==typeof s.target&&(s.target=v[s.target]),++s.source.weight,++s.target.weight;for(e=0;p>e;++e)s=v[e],isNaN(s.x)&&(s.x=n("x",y)),isNaN(s.y)&&(s.y=n("y",M)),isNaN(s.px)&&(s.px=s.x),isNaN(s.py)&&(s.py=s.y);if(u=[],"function"==typeof f)for(e=0;d>e;++e)u[e]=+f.call(this,m[e],e);else for(e=0;d>e;++e)u[e]=f;if(i=[],"function"==typeof h)for(e=0;d>e;++e)i[e]=+h.call(this,m[e],e);else for(e=0;d>e;++e)i[e]=h;if(o=[],"function"==typeof g)for(e=0;p>e;++e)o[e]=+g.call(this,v[e],e);else for(e=0;p>e;++e)o[e]=g;return a.resume()},a.resume=function(){return a.alpha(.1)},a.stop=function(){return a.alpha(0)},a.drag=function(){return e||(e=mo.behavior.drag().origin(dt).on("dragstart.force",nu).on("drag.force",t).on("dragend.force",tu)),arguments.length?(this.on("mouseover.force",eu).on("mouseout.force",ru).call(e),void 0):e},mo.rebind(a,c,"on")};var Sc=20,Ec=1;mo.layout.hierarchy=function(){function n(t,o,a){var c=u.call(e,t,o);if(t.depth=o,a.push(t),c&&(l=c.length)){for(var l,s,f=-1,h=t.children=[],g=0,p=o+1;++f<l;)s=n(c[f],p,a),s.parent=t,h.push(s),g+=s.value;r&&h.sort(r),i&&(t.value=g)}else i&&(t.value=+i.call(e,t,o)||0);return t}function t(n,r){var u=n.children,o=0;if(u&&(a=u.length))for(var a,c=-1,l=r+1;++c<a;)o+=t(u[c],l);else i&&(o=+i.call(e,n,r)||0);return i&&(n.value=o),o}function e(t){var e=[];return n(t,0,e),e}var r=cu,u=ou,i=au;return e.sort=function(n){return arguments.length?(r=n,e):r},e.children=function(n){return arguments.length?(u=n,e):u},e.value=function(n){return arguments.length?(i=n,e):i},e.revalue=function(n){return t(n,0),n},e},mo.layout.partition=function(){function n(t,e,r,u){var i=t.children;if(t.x=e,t.y=t.depth*u,t.dx=r,t.dy=u,i&&(o=i.length)){var o,a,c,l=-1;for(r=t.value?r/t.value:0;++l<o;)n(a=i[l],e,c=a.value*r,u),e+=c}}function t(n){var e=n.children,r=0;if(e&&(u=e.length))for(var u,i=-1;++i<u;)r=Math.max(r,t(e[i]));return 1+r}function e(e,i){var o=r.call(this,e,i);return n(o[0],0,u[0],u[1]/t(o[0])),o}var r=mo.layout.hierarchy(),u=[1,1];return e.size=function(n){return arguments.length?(u=n,e):u},iu(e,r)},mo.layout.pie=function(){function n(i){var o=i.map(function(e,r){return+t.call(n,e,r)}),a=+("function"==typeof r?r.apply(this,arguments):r),c=(("function"==typeof u?u.apply(this,arguments):u)-a)/mo.sum(o),l=mo.range(i.length);null!=e&&l.sort(e===kc?function(n,t){return o[t]-o[n]}:function(n,t){return e(i[n],i[t])});var s=[];return l.forEach(function(n){var t;s[n]={data:i[n],value:t=o[n],startAngle:a,endAngle:a+=t*c}}),s}var t=Number,e=kc,r=0,u=Wo;return n.value=function(e){return arguments.length?(t=e,n):t},n.sort=function(t){return arguments.length?(e=t,n):e},n.startAngle=function(t){return arguments.length?(r=t,n):r},n.endAngle=function(t){return arguments.length?(u=t,n):u},n};var kc={};mo.layout.stack=function(){function n(a,c){var l=a.map(function(e,r){return t.call(n,e,r)}),s=l.map(function(t){return t.map(function(t,e){return[i.call(n,t,e),o.call(n,t,e)]})}),f=e.call(n,s,c);l=mo.permute(l,f),s=mo.permute(s,f);var h,g,p,d=r.call(n,s,c),v=l.length,m=l[0].length;for(g=0;m>g;++g)for(u.call(n,l[0][g],p=d[g],s[0][g][1]),h=1;v>h;++h)u.call(n,l[h][g],p+=s[h-1][g][1],s[h][g][1]);return a}var t=dt,e=gu,r=pu,u=hu,i=su,o=fu;return n.values=function(e){return arguments.length?(t=e,n):t},n.order=function(t){return arguments.length?(e="function"==typeof t?t:Ac.get(t)||gu,n):e},n.offset=function(t){return arguments.length?(r="function"==typeof t?t:Nc.get(t)||pu,n):r},n.x=function(t){return arguments.length?(i=t,n):i},n.y=function(t){return arguments.length?(o=t,n):o},n.out=function(t){return arguments.length?(u=t,n):u},n};var Ac=mo.map({"inside-out":function(n){var t,e,r=n.length,u=n.map(du),i=n.map(vu),o=mo.range(r).sort(function(n,t){return u[n]-u[t]}),a=0,c=0,l=[],s=[];for(t=0;r>t;++t)e=o[t],c>a?(a+=i[e],l.push(e)):(c+=i[e],s.push(e));return s.reverse().concat(l)},reverse:function(n){return mo.range(n.length).reverse()},"default":gu}),Nc=mo.map({silhouette:function(n){var t,e,r,u=n.length,i=n[0].length,o=[],a=0,c=[];for(e=0;i>e;++e){for(t=0,r=0;u>t;t++)r+=n[t][e][1];r>a&&(a=r),o.push(r)}for(e=0;i>e;++e)c[e]=(a-o[e])/2;return c},wiggle:function(n){var t,e,r,u,i,o,a,c,l,s=n.length,f=n[0],h=f.length,g=[];for(g[0]=c=l=0,e=1;h>e;++e){for(t=0,u=0;s>t;++t)u+=n[t][e][1];for(t=0,i=0,a=f[e][0]-f[e-1][0];s>t;++t){for(r=0,o=(n[t][e][1]-n[t][e-1][1])/(2*a);t>r;++r)o+=(n[r][e][1]-n[r][e-1][1])/a;i+=o*n[t][e][1]}g[e]=c-=u?i/u*a:0,l>c&&(l=c)}for(e=0;h>e;++e)g[e]-=l;return g},expand:function(n){var t,e,r,u=n.length,i=n[0].length,o=1/u,a=[];for(e=0;i>e;++e){for(t=0,r=0;u>t;t++)r+=n[t][e][1];if(r)for(t=0;u>t;t++)n[t][e][1]/=r;else for(t=0;u>t;t++)n[t][e][1]=o}for(e=0;i>e;++e)a[e]=0;return a},zero:pu});mo.layout.histogram=function(){function n(n,i){for(var o,a,c=[],l=n.map(e,this),s=r.call(this,l,i),f=u.call(this,s,l,i),i=-1,h=l.length,g=f.length-1,p=t?1:1/h;++i<g;)o=c[i]=[],o.dx=f[i+1]-(o.x=f[i]),o.y=0;if(g>0)for(i=-1;++i<h;)a=l[i],a>=s[0]&&a<=s[1]&&(o=c[mo.bisect(f,a,1,g)-1],o.y+=p,o.push(n[i]));return c}var t=!0,e=Number,r=xu,u=yu;return n.value=function(t){return arguments.length?(e=t,n):e},n.range=function(t){return arguments.length?(r=pt(t),n):r},n.bins=function(t){return arguments.length?(u="number"==typeof t?function(n){return Mu(n,t)}:pt(t),n):u},n.frequency=function(e){return arguments.length?(t=!!e,n):t},n},mo.layout.tree=function(){function n(n,i){function o(n,t){var r=n.children,u=n._tree;if(r&&(i=r.length)){for(var i,a,l,s=r[0],f=s,h=-1;++h<i;)l=r[h],o(l,a),f=c(l,a,f),a=l;Tu(n);var g=.5*(s._tree.prelim+l._tree.prelim);t?(u.prelim=t._tree.prelim+e(n,t),u.mod=u.prelim-g):u.prelim=g}else t&&(u.prelim=t._tree.prelim+e(n,t))}function a(n,t){n.x=n._tree.prelim+t;var e=n.children;if(e&&(r=e.length)){var r,u=-1;for(t+=n._tree.mod;++u<r;)a(e[u],t)}}function c(n,t,r){if(t){for(var u,i=n,o=n,a=t,c=n.parent.children[0],l=i._tree.mod,s=o._tree.mod,f=a._tree.mod,h=c._tree.mod;a=wu(a),i=_u(i),a&&i;)c=_u(c),o=wu(o),o._tree.ancestor=n,u=a._tree.prelim+f-i._tree.prelim-l+e(a,i),u>0&&(qu(zu(a,n,r),n,u),l+=u,s+=u),f+=a._tree.mod,l+=i._tree.mod,h+=c._tree.mod,s+=o._tree.mod;a&&!wu(o)&&(o._tree.thread=a,o._tree.mod+=f-s),i&&!_u(c)&&(c._tree.thread=i,c._tree.mod+=l-h,r=n)}return r}var l=t.call(this,n,i),s=l[0];Nu(s,function(n,t){n._tree={ancestor:n,prelim:0,mod:0,change:0,shift:0,number:t?t._tree.number+1:0}}),o(s),a(s,-s._tree.prelim);var f=Su(s,ku),h=Su(s,Eu),g=Su(s,Au),p=f.x-e(f,h)/2,d=h.x+e(h,f)/2,v=g.depth||1;return Nu(s,u?function(n){n.x*=r[0],n.y=n.depth*r[1],delete n._tree}:function(n){n.x=(n.x-p)/(d-p)*r[0],n.y=n.depth/v*r[1],delete n._tree}),l}var t=mo.layout.hierarchy().sort(null).value(null),e=bu,r=[1,1],u=!1;return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(u=null==(r=t),n):u?null:r},n.nodeSize=function(t){return arguments.length?(u=null!=(r=t),n):u?r:null},iu(n,t)},mo.layout.pack=function(){function n(n,i){var o=e.call(this,n,i),a=o[0],c=u[0],l=u[1],s=null==t?Math.sqrt:"function"==typeof t?t:function(){return t};if(a.x=a.y=0,Nu(a,function(n){n.r=+s(n.value)}),Nu(a,Hu),r){var f=r*(t?1:Math.max(2*a.r/c,2*a.r/l))/2;Nu(a,function(n){n.r+=f}),Nu(a,Hu),Nu(a,function(n){n.r-=f})}return Ou(a,c/2,l/2,t?1:1/Math.max(2*a.r/c,2*a.r/l)),o}var t,e=mo.layout.hierarchy().sort(Cu),r=0,u=[1,1];return n.size=function(t){return arguments.length?(u=t,n):u},n.radius=function(e){return arguments.length?(t=null==e||"function"==typeof e?e:+e,n):t},n.padding=function(t){return arguments.length?(r=+t,n):r},iu(n,e)},mo.layout.cluster=function(){function n(n,i){var o,a=t.call(this,n,i),c=a[0],l=0;Nu(c,function(n){var t=n.children;t&&t.length?(n.x=Iu(t),n.y=Yu(t)):(n.x=o?l+=e(n,o):0,n.y=0,o=n)});var s=Uu(c),f=Zu(c),h=s.x-e(s,f)/2,g=f.x+e(f,s)/2;return Nu(c,u?function(n){n.x=(n.x-c.x)*r[0],n.y=(c.y-n.y)*r[1]}:function(n){n.x=(n.x-h)/(g-h)*r[0],n.y=(1-(c.y?n.y/c.y:1))*r[1]}),a}var t=mo.layout.hierarchy().sort(null).value(null),e=bu,r=[1,1],u=!1;return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(u=null==(r=t),n):u?null:r},n.nodeSize=function(t){return arguments.length?(u=null!=(r=t),n):u?r:null},iu(n,t)},mo.layout.treemap=function(){function n(n,t){for(var e,r,u=-1,i=n.length;++u<i;)r=(e=n[u]).value*(0>t?0:t),e.area=isNaN(r)||0>=r?0:r}function t(e){var i=e.children;if(i&&i.length){var o,a,c,l=f(e),s=[],h=i.slice(),p=1/0,d="slice"===g?l.dx:"dice"===g?l.dy:"slice-dice"===g?1&e.depth?l.dy:l.dx:Math.min(l.dx,l.dy);for(n(h,l.dx*l.dy/e.value),s.area=0;(c=h.length)>0;)s.push(o=h[c-1]),s.area+=o.area,"squarify"!==g||(a=r(s,d))<=p?(h.pop(),p=a):(s.area-=s.pop().area,u(s,d,l,!1),d=Math.min(l.dx,l.dy),s.length=s.area=0,p=1/0);s.length&&(u(s,d,l,!0),s.length=s.area=0),i.forEach(t)}}function e(t){var r=t.children;if(r&&r.length){var i,o=f(t),a=r.slice(),c=[];for(n(a,o.dx*o.dy/t.value),c.area=0;i=a.pop();)c.push(i),c.area+=i.area,null!=i.z&&(u(c,i.z?o.dx:o.dy,o,!a.length),c.length=c.area=0);r.forEach(e)}}function r(n,t){for(var e,r=n.area,u=0,i=1/0,o=-1,a=n.length;++o<a;)(e=n[o].area)&&(i>e&&(i=e),e>u&&(u=e));return r*=r,t*=t,r?Math.max(t*u*p/r,r/(t*i*p)):1/0}function u(n,t,e,r){var u,i=-1,o=n.length,a=e.x,l=e.y,s=t?c(n.area/t):0;if(t==e.dx){for((r||s>e.dy)&&(s=e.dy);++i<o;)u=n[i],u.x=a,u.y=l,u.dy=s,a+=u.dx=Math.min(e.x+e.dx-a,s?c(u.area/s):0);u.z=!0,u.dx+=e.x+e.dx-a,e.y+=s,e.dy-=s}else{for((r||s>e.dx)&&(s=e.dx);++i<o;)u=n[i],u.x=a,u.y=l,u.dx=s,l+=u.dy=Math.min(e.y+e.dy-l,s?c(u.area/s):0);u.z=!1,u.dy+=e.y+e.dy-l,e.x+=s,e.dx-=s}}function i(r){var u=o||a(r),i=u[0];return i.x=0,i.y=0,i.dx=l[0],i.dy=l[1],o&&a.revalue(i),n([i],i.dx*i.dy/i.value),(o?e:t)(i),h&&(o=u),u}var o,a=mo.layout.hierarchy(),c=Math.round,l=[1,1],s=null,f=Vu,h=!1,g="squarify",p=.5*(1+Math.sqrt(5));return i.size=function(n){return arguments.length?(l=n,i):l},i.padding=function(n){function t(t){var e=n.call(i,t,t.depth);return null==e?Vu(t):Xu(t,"number"==typeof e?[e,e,e,e]:e)}function e(t){return Xu(t,n)}if(!arguments.length)return s;var r;return f=null==(s=n)?Vu:"function"==(r=typeof n)?t:"number"===r?(n=[n,n,n,n],e):e,i},i.round=function(n){return arguments.length?(c=n?Math.round:Number,i):c!=Number},i.sticky=function(n){return arguments.length?(h=n,o=null,i):h},i.ratio=function(n){return arguments.length?(p=n,i):p},i.mode=function(n){return arguments.length?(g=n+"",i):g},iu(i,a)},mo.random={normal:function(n,t){var e=arguments.length;return 2>e&&(t=1),1>e&&(n=0),function(){var e,r,u;do e=2*Math.random()-1,r=2*Math.random()-1,u=e*e+r*r;while(!u||u>1);return n+t*e*Math.sqrt(-2*Math.log(u)/u)}},logNormal:function(){var n=mo.random.normal.apply(mo,arguments);return function(){return Math.exp(n())}},irwinHall:function(n){return function(){for(var t=0,e=0;n>e;e++)t+=Math.random();return t/n}}},mo.scale={};var Tc={floor:dt,ceil:dt};mo.scale.linear=function(){return Qu([0,1],[0,1],Er,!1)},mo.scale.log=function(){return ii(mo.scale.linear().domain([0,1]),10,!0,[1,10])};var qc=mo.format(".0e"),zc={floor:function(n){return-Math.ceil(-n)},ceil:function(n){return-Math.floor(-n)}};mo.scale.pow=function(){return oi(mo.scale.linear(),1,[0,1])},mo.scale.sqrt=function(){return mo.scale.pow().exponent(.5)},mo.scale.ordinal=function(){return ci([],{t:"range",a:[[]]})},mo.scale.category10=function(){return mo.scale.ordinal().range(Cc)},mo.scale.category20=function(){return mo.scale.ordinal().range(Dc)},mo.scale.category20b=function(){return mo.scale.ordinal().range(jc)},mo.scale.category20c=function(){return mo.scale.ordinal().range(Lc)};var Cc=[2062260,16744206,2924588,14034728,9725885,9197131,14907330,8355711,12369186,1556175].map(it),Dc=[2062260,11454440,16744206,16759672,2924588,10018698,14034728,16750742,9725885,12955861,9197131,12885140,14907330,16234194,8355711,13092807,12369186,14408589,1556175,10410725].map(it),jc=[3750777,5395619,7040719,10264286,6519097,9216594,11915115,13556636,9202993,12426809,15186514,15190932,8666169,11356490,14049643,15177372,8077683,10834324,13528509,14589654].map(it),Lc=[3244733,7057110,10406625,13032431,15095053,16616764,16625259,16634018,3253076,7652470,10607003,13101504,7695281,10394312,12369372,14342891,6513507,9868950,12434877,14277081].map(it);mo.scale.quantile=function(){return li([],[])},mo.scale.quantize=function(){return si(0,1,[0,1])},mo.scale.threshold=function(){return fi([.5],[0,1])},mo.scale.identity=function(){return hi([0,1])},mo.svg.arc=function(){function n(){var n=t.apply(this,arguments),i=e.apply(this,arguments),o=r.apply(this,arguments)+Hc,a=u.apply(this,arguments)+Hc,c=(o>a&&(c=o,o=a,a=c),a-o),l=Bo>c?"0":"1",s=Math.cos(o),f=Math.sin(o),h=Math.cos(a),g=Math.sin(a);return c>=Fc?n?"M0,"+i+"A"+i+","+i+" 0 1,1 0,"+-i+"A"+i+","+i+" 0 1,1 0,"+i+"M0,"+n+"A"+n+","+n+" 0 1,0 0,"+-n+"A"+n+","+n+" 0 1,0 0,"+n+"Z":"M0,"+i+"A"+i+","+i+" 0 1,1 0,"+-i+"A"+i+","+i+" 0 1,1 0,"+i+"Z":n?"M"+i*s+","+i*f+"A"+i+","+i+" 0 "+l+",1 "+i*h+","+i*g+"L"+n*h+","+n*g+"A"+n+","+n+" 0 "+l+",0 "+n*s+","+n*f+"Z":"M"+i*s+","+i*f+"A"+i+","+i+" 0 "+l+",1 "+i*h+","+i*g+"L0,0"+"Z"}var t=gi,e=pi,r=di,u=vi;return n.innerRadius=function(e){return arguments.length?(t=pt(e),n):t},n.outerRadius=function(t){return arguments.length?(e=pt(t),n):e},n.startAngle=function(t){return arguments.length?(r=pt(t),n):r},n.endAngle=function(t){return arguments.length?(u=pt(t),n):u},n.centroid=function(){var n=(t.apply(this,arguments)+e.apply(this,arguments))/2,i=(r.apply(this,arguments)+u.apply(this,arguments))/2+Hc;return[Math.cos(i)*n,Math.sin(i)*n]},n};var Hc=-Jo,Fc=Wo-Go;mo.svg.line.radial=function(){var n=Ue(mi);return n.radius=n.x,delete n.x,n.angle=n.y,delete n.y,n},We.reverse=Je,Je.reverse=We,mo.svg.area=function(){return yi(dt)},mo.svg.area.radial=function(){var n=yi(mi);return n.radius=n.x,delete n.x,n.innerRadius=n.x0,delete n.x0,n.outerRadius=n.x1,delete n.x1,n.angle=n.y,delete n.y,n.startAngle=n.y0,delete n.y0,n.endAngle=n.y1,delete n.y1,n},mo.svg.chord=function(){function n(n,a){var c=t(this,i,n,a),l=t(this,o,n,a);return"M"+c.p0+r(c.r,c.p1,c.a1-c.a0)+(e(c,l)?u(c.r,c.p1,c.r,c.p0):u(c.r,c.p1,l.r,l.p0)+r(l.r,l.p1,l.a1-l.a0)+u(l.r,l.p1,c.r,c.p0))+"Z"}function t(n,t,e,r){var u=t.call(n,e,r),i=a.call(n,u,r),o=c.call(n,u,r)+Hc,s=l.call(n,u,r)+Hc;return{r:i,a0:o,a1:s,p0:[i*Math.cos(o),i*Math.sin(o)],p1:[i*Math.cos(s),i*Math.sin(s)]}}function e(n,t){return n.a0==t.a0&&n.a1==t.a1}function r(n,t,e){return"A"+n+","+n+" 0 "+ +(e>Bo)+",1 "+t}function u(n,t,e,r){return"Q 0,0 "+r}var i=De,o=je,a=Mi,c=di,l=vi;return n.radius=function(t){return arguments.length?(a=pt(t),n):a},n.source=function(t){return arguments.length?(i=pt(t),n):i},n.target=function(t){return arguments.length?(o=pt(t),n):o},n.startAngle=function(t){return arguments.length?(c=pt(t),n):c},n.endAngle=function(t){return arguments.length?(l=pt(t),n):l},n},mo.svg.diagonal=function(){function n(n,u){var i=t.call(this,n,u),o=e.call(this,n,u),a=(i.y+o.y)/2,c=[i,{x:i.x,y:a},{x:o.x,y:a},o];return c=c.map(r),"M"+c[0]+"C"+c[1]+" "+c[2]+" "+c[3]}var t=De,e=je,r=xi;return n.source=function(e){return arguments.length?(t=pt(e),n):t},n.target=function(t){return arguments.length?(e=pt(t),n):e},n.projection=function(t){return arguments.length?(r=t,n):r},n},mo.svg.diagonal.radial=function(){var n=mo.svg.diagonal(),t=xi,e=n.projection;return n.projection=function(n){return arguments.length?e(bi(t=n)):t},n},mo.svg.symbol=function(){function n(n,r){return(Pc.get(t.call(this,n,r))||Si)(e.call(this,n,r))}var t=wi,e=_i;return n.type=function(e){return arguments.length?(t=pt(e),n):t},n.size=function(t){return arguments.length?(e=pt(t),n):e},n};var Pc=mo.map({circle:Si,cross:function(n){var t=Math.sqrt(n/5)/2;return"M"+-3*t+","+-t+"H"+-t+"V"+-3*t+"H"+t+"V"+-t+"H"+3*t+"V"+t+"H"+t+"V"+3*t+"H"+-t+"V"+t+"H"+-3*t+"Z"},diamond:function(n){var t=Math.sqrt(n/(2*Ic)),e=t*Ic;return"M0,"+-t+"L"+e+",0"+" 0,"+t+" "+-e+",0"+"Z"},square:function(n){var t=Math.sqrt(n)/2;return"M"+-t+","+-t+"L"+t+","+-t+" "+t+","+t+" "+-t+","+t+"Z"},"triangle-down":function(n){var t=Math.sqrt(n/Yc),e=t*Yc/2;return"M0,"+e+"L"+t+","+-e+" "+-t+","+-e+"Z"},"triangle-up":function(n){var t=Math.sqrt(n/Yc),e=t*Yc/2;return"M0,"+-e+"L"+t+","+e+" "+-t+","+e+"Z"}});mo.svg.symbolTypes=Pc.keys();var Oc,Rc,Yc=Math.sqrt(3),Ic=Math.tan(30*Qo),Uc=[],Zc=0;Uc.call=Ro.call,Uc.empty=Ro.empty,Uc.node=Ro.node,Uc.size=Ro.size,mo.transition=function(n){return arguments.length?Oc?n.transition():n:Uo.transition()},mo.transition.prototype=Uc,Uc.select=function(n){var t,e,r,u=this.id,i=[];n=d(n);for(var o=-1,a=this.length;++o<a;){i.push(t=[]);for(var c=this[o],l=-1,s=c.length;++l<s;)(r=c[l])&&(e=n.call(r,r.__data__,l,o))?("__data__"in r&&(e.__data__=r.__data__),Ni(e,l,u,r.__transition__[u]),t.push(e)):t.push(null)}return Ei(i,u)},Uc.selectAll=function(n){var t,e,r,u,i,o=this.id,a=[];n=v(n);for(var c=-1,l=this.length;++c<l;)for(var s=this[c],f=-1,h=s.length;++f<h;)if(r=s[f]){i=r.__transition__[o],e=n.call(r,r.__data__,f,c),a.push(t=[]);for(var g=-1,p=e.length;++g<p;)(u=e[g])&&Ni(u,g,o,i),t.push(u)}return Ei(a,o)},Uc.filter=function(n){var t,e,r,u=[];"function"!=typeof n&&(n=k(n));for(var i=0,o=this.length;o>i;i++){u.push(t=[]);for(var e=this[i],a=0,c=e.length;c>a;a++)(r=e[a])&&n.call(r,r.__data__,a)&&t.push(r)}return Ei(u,this.id)},Uc.tween=function(n,t){var e=this.id;return arguments.length<2?this.node().__transition__[e].tween.get(n):N(this,null==t?function(t){t.__transition__[e].tween.remove(n)}:function(r){r.__transition__[e].tween.set(n,t)})},Uc.attr=function(n,t){function e(){this.removeAttribute(a)}function r(){this.removeAttributeNS(a.space,a.local)}function u(n){return null==n?e:(n+="",function(){var t,e=this.getAttribute(a);return e!==n&&(t=o(e,n),function(n){this.setAttribute(a,t(n))})})}function i(n){return null==n?r:(n+="",function(){var t,e=this.getAttributeNS(a.space,a.local);return e!==n&&(t=o(e,n),function(n){this.setAttributeNS(a.space,a.local,t(n))
})})}if(arguments.length<2){for(t in n)this.attr(t,n[t]);return this}var o="transform"==n?Br:Er,a=mo.ns.qualify(n);return ki(this,"attr."+n,t,a.local?i:u)},Uc.attrTween=function(n,t){function e(n,e){var r=t.call(this,n,e,this.getAttribute(u));return r&&function(n){this.setAttribute(u,r(n))}}function r(n,e){var r=t.call(this,n,e,this.getAttributeNS(u.space,u.local));return r&&function(n){this.setAttributeNS(u.space,u.local,r(n))}}var u=mo.ns.qualify(n);return this.tween("attr."+n,u.local?r:e)},Uc.style=function(n,t,e){function r(){this.style.removeProperty(n)}function u(t){return null==t?r:(t+="",function(){var r,u=_o.getComputedStyle(this,null).getPropertyValue(n);return u!==t&&(r=Er(u,t),function(t){this.style.setProperty(n,r(t),e)})})}var i=arguments.length;if(3>i){if("string"!=typeof n){2>i&&(t="");for(e in n)this.style(e,n[e],t);return this}e=""}return ki(this,"style."+n,t,u)},Uc.styleTween=function(n,t,e){function r(r,u){var i=t.call(this,r,u,_o.getComputedStyle(this,null).getPropertyValue(n));return i&&function(t){this.style.setProperty(n,i(t),e)}}return arguments.length<3&&(e=""),this.tween("style."+n,r)},Uc.text=function(n){return ki(this,"text",n,Ai)},Uc.remove=function(){return this.each("end.transition",function(){var n;this.__transition__.count<2&&(n=this.parentNode)&&n.removeChild(this)})},Uc.ease=function(n){var t=this.id;return arguments.length<1?this.node().__transition__[t].ease:("function"!=typeof n&&(n=mo.ease.apply(mo,arguments)),N(this,function(e){e.__transition__[t].ease=n}))},Uc.delay=function(n){var t=this.id;return N(this,"function"==typeof n?function(e,r,u){e.__transition__[t].delay=+n.call(e,e.__data__,r,u)}:(n=+n,function(e){e.__transition__[t].delay=n}))},Uc.duration=function(n){var t=this.id;return N(this,"function"==typeof n?function(e,r,u){e.__transition__[t].duration=Math.max(1,n.call(e,e.__data__,r,u))}:(n=Math.max(1,n),function(e){e.__transition__[t].duration=n}))},Uc.each=function(n,t){var e=this.id;if(arguments.length<2){var r=Rc,u=Oc;Oc=e,N(this,function(t,r,u){Rc=t.__transition__[e],n.call(t,t.__data__,r,u)}),Rc=r,Oc=u}else N(this,function(r){var u=r.__transition__[e];(u.event||(u.event=mo.dispatch("start","end"))).on(n,t)});return this},Uc.transition=function(){for(var n,t,e,r,u=this.id,i=++Zc,o=[],a=0,c=this.length;c>a;a++){o.push(n=[]);for(var t=this[a],l=0,s=t.length;s>l;l++)(e=t[l])&&(r=Object.create(e.__transition__[u]),r.delay+=r.duration,Ni(e,l,i,r)),n.push(e)}return Ei(o,i)},mo.svg.axis=function(){function n(n){n.each(function(){var n,l=mo.select(this),s=this.__chart__||e,f=this.__chart__=e.copy(),h=null==c?f.ticks?f.ticks.apply(f,a):f.domain():c,g=null==t?f.tickFormat?f.tickFormat.apply(f,a):dt:t,p=l.selectAll(".tick").data(h,f),d=p.enter().insert("g",".domain").attr("class","tick").style("opacity",Go),v=mo.transition(p.exit()).style("opacity",Go).remove(),m=mo.transition(p).style("opacity",1),y=Bu(f),M=l.selectAll(".domain").data([0]),x=(M.enter().append("path").attr("class","domain"),mo.transition(M));d.append("line"),d.append("text");var b=d.select("line"),_=m.select("line"),w=p.select("text").text(g),S=d.select("text"),E=m.select("text");switch(r){case"bottom":n=Ti,b.attr("y2",u),S.attr("y",Math.max(u,0)+o),_.attr("x2",0).attr("y2",u),E.attr("x",0).attr("y",Math.max(u,0)+o),w.attr("dy",".71em").style("text-anchor","middle"),x.attr("d","M"+y[0]+","+i+"V0H"+y[1]+"V"+i);break;case"top":n=Ti,b.attr("y2",-u),S.attr("y",-(Math.max(u,0)+o)),_.attr("x2",0).attr("y2",-u),E.attr("x",0).attr("y",-(Math.max(u,0)+o)),w.attr("dy","0em").style("text-anchor","middle"),x.attr("d","M"+y[0]+","+-i+"V0H"+y[1]+"V"+-i);break;case"left":n=qi,b.attr("x2",-u),S.attr("x",-(Math.max(u,0)+o)),_.attr("x2",-u).attr("y2",0),E.attr("x",-(Math.max(u,0)+o)).attr("y",0),w.attr("dy",".32em").style("text-anchor","end"),x.attr("d","M"+-i+","+y[0]+"H0V"+y[1]+"H"+-i);break;case"right":n=qi,b.attr("x2",u),S.attr("x",Math.max(u,0)+o),_.attr("x2",u).attr("y2",0),E.attr("x",Math.max(u,0)+o).attr("y",0),w.attr("dy",".32em").style("text-anchor","start"),x.attr("d","M"+i+","+y[0]+"H0V"+y[1]+"H"+i)}if(f.rangeBand){var k=f.rangeBand()/2,A=function(n){return f(n)+k};d.call(n,A),m.call(n,A)}else d.call(n,s),m.call(n,f),v.call(n,f)})}var t,e=mo.scale.linear(),r=Vc,u=6,i=6,o=3,a=[10],c=null;return n.scale=function(t){return arguments.length?(e=t,n):e},n.orient=function(t){return arguments.length?(r=t in Xc?t+"":Vc,n):r},n.ticks=function(){return arguments.length?(a=arguments,n):a},n.tickValues=function(t){return arguments.length?(c=t,n):c},n.tickFormat=function(e){return arguments.length?(t=e,n):t},n.tickSize=function(t){var e=arguments.length;return e?(u=+t,i=+arguments[e-1],n):u},n.innerTickSize=function(t){return arguments.length?(u=+t,n):u},n.outerTickSize=function(t){return arguments.length?(i=+t,n):i},n.tickPadding=function(t){return arguments.length?(o=+t,n):o},n.tickSubdivide=function(){return arguments.length&&n},n};var Vc="bottom",Xc={top:1,right:1,bottom:1,left:1};mo.svg.brush=function(){function n(i){i.each(function(){var i=mo.select(this).style("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush",u).on("touchstart.brush",u),o=i.selectAll(".background").data([0]);o.enter().append("rect").attr("class","background").style("visibility","hidden").style("cursor","crosshair"),i.selectAll(".extent").data([0]).enter().append("rect").attr("class","extent").style("cursor","move");var a=i.selectAll(".resize").data(v,dt);a.exit().remove(),a.enter().append("g").attr("class",function(n){return"resize "+n}).style("cursor",function(n){return $c[n]}).append("rect").attr("x",function(n){return/[ew]$/.test(n)?-3:null}).attr("y",function(n){return/^[ns]/.test(n)?-3:null}).attr("width",6).attr("height",6).style("visibility","hidden"),a.style("display",n.empty()?"none":null);var s,f=mo.transition(i),h=mo.transition(o);c&&(s=Bu(c),h.attr("x",s[0]).attr("width",s[1]-s[0]),e(f)),l&&(s=Bu(l),h.attr("y",s[0]).attr("height",s[1]-s[0]),r(f)),t(f)})}function t(n){n.selectAll(".resize").attr("transform",function(n){return"translate("+s[+/e$/.test(n)]+","+h[+/^s/.test(n)]+")"})}function e(n){n.select(".extent").attr("x",s[0]),n.selectAll(".extent,.n>rect,.s>rect").attr("width",s[1]-s[0])}function r(n){n.select(".extent").attr("y",h[0]),n.selectAll(".extent,.e>rect,.w>rect").attr("height",h[1]-h[0])}function u(){function u(){32==mo.event.keyCode&&(N||(M=null,q[0]-=s[1],q[1]-=h[1],N=2),f())}function g(){32==mo.event.keyCode&&2==N&&(q[0]+=s[1],q[1]+=h[1],N=0,f())}function v(){var n=mo.mouse(b),u=!1;x&&(n[0]+=x[0],n[1]+=x[1]),N||(mo.event.altKey?(M||(M=[(s[0]+s[1])/2,(h[0]+h[1])/2]),q[0]=s[+(n[0]<M[0])],q[1]=h[+(n[1]<M[1])]):M=null),k&&m(n,c,0)&&(e(S),u=!0),A&&m(n,l,1)&&(r(S),u=!0),u&&(t(S),w({type:"brush",mode:N?"move":"resize"}))}function m(n,t,e){var r,u,a=Bu(t),c=a[0],l=a[1],f=q[e],g=e?h:s,v=g[1]-g[0];return N&&(c-=f,l-=v+f),r=(e?d:p)?Math.max(c,Math.min(l,n[e])):n[e],N?u=(r+=f)+v:(M&&(f=Math.max(c,Math.min(l,2*M[e]-r))),r>f?(u=r,r=f):u=f),g[0]!=r||g[1]!=u?(e?o=null:i=null,g[0]=r,g[1]=u,!0):void 0}function y(){v(),S.style("pointer-events","all").selectAll(".resize").style("display",n.empty()?"none":null),mo.select("body").style("cursor",null),z.on("mousemove.brush",null).on("mouseup.brush",null).on("touchmove.brush",null).on("touchend.brush",null).on("keydown.brush",null).on("keyup.brush",null),T(),w({type:"brushend"})}var M,x,b=this,_=mo.select(mo.event.target),w=a.of(b,arguments),S=mo.select(b),E=_.datum(),k=!/^(n|s)$/.test(E)&&c,A=!/^(e|w)$/.test(E)&&l,N=_.classed("extent"),T=L(),q=mo.mouse(b),z=mo.select(_o).on("keydown.brush",u).on("keyup.brush",g);if(mo.event.changedTouches?z.on("touchmove.brush",v).on("touchend.brush",y):z.on("mousemove.brush",v).on("mouseup.brush",y),S.interrupt().selectAll("*").interrupt(),N)q[0]=s[0]-q[0],q[1]=h[0]-q[1];else if(E){var C=+/w$/.test(E),D=+/^n/.test(E);x=[s[1-C]-q[0],h[1-D]-q[1]],q[0]=s[C],q[1]=h[D]}else mo.event.altKey&&(M=q.slice());S.style("pointer-events","none").selectAll(".resize").style("display",null),mo.select("body").style("cursor",_.style("cursor")),w({type:"brushstart"}),v()}var i,o,a=g(n,"brushstart","brush","brushend"),c=null,l=null,s=[0,0],h=[0,0],p=!0,d=!0,v=Bc[0];return n.event=function(n){n.each(function(){var n=a.of(this,arguments),t={x:s,y:h,i:i,j:o},e=this.__chart__||t;this.__chart__=t,Oc?mo.select(this).transition().each("start.brush",function(){i=e.i,o=e.j,s=e.x,h=e.y,n({type:"brushstart"})}).tween("brush:brush",function(){var e=kr(s,t.x),r=kr(h,t.y);return i=o=null,function(u){s=t.x=e(u),h=t.y=r(u),n({type:"brush",mode:"resize"})}}).each("end.brush",function(){i=t.i,o=t.j,n({type:"brush",mode:"resize"}),n({type:"brushend"})}):(n({type:"brushstart"}),n({type:"brush",mode:"resize"}),n({type:"brushend"}))})},n.x=function(t){return arguments.length?(c=t,v=Bc[!c<<1|!l],n):c},n.y=function(t){return arguments.length?(l=t,v=Bc[!c<<1|!l],n):l},n.clamp=function(t){return arguments.length?(c&&l?(p=!!t[0],d=!!t[1]):c?p=!!t:l&&(d=!!t),n):c&&l?[p,d]:c?p:l?d:null},n.extent=function(t){var e,r,u,a,f;return arguments.length?(c&&(e=t[0],r=t[1],l&&(e=e[0],r=r[0]),i=[e,r],c.invert&&(e=c(e),r=c(r)),e>r&&(f=e,e=r,r=f),(e!=s[0]||r!=s[1])&&(s=[e,r])),l&&(u=t[0],a=t[1],c&&(u=u[1],a=a[1]),o=[u,a],l.invert&&(u=l(u),a=l(a)),u>a&&(f=u,u=a,a=f),(u!=h[0]||a!=h[1])&&(h=[u,a])),n):(c&&(i?(e=i[0],r=i[1]):(e=s[0],r=s[1],c.invert&&(e=c.invert(e),r=c.invert(r)),e>r&&(f=e,e=r,r=f))),l&&(o?(u=o[0],a=o[1]):(u=h[0],a=h[1],l.invert&&(u=l.invert(u),a=l.invert(a)),u>a&&(f=u,u=a,a=f))),c&&l?[[e,u],[r,a]]:c?[e,r]:l&&[u,a])},n.clear=function(){return n.empty()||(s=[0,0],h=[0,0],i=o=null),n},n.empty=function(){return!!c&&s[0]==s[1]||!!l&&h[0]==h[1]},mo.rebind(n,a,"on")};var $c={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},Bc=[["n","e","s","w","nw","ne","se","sw"],["e","w"],["n","s"],[]],Wc=mo.time={},Jc=Date,Gc=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];zi.prototype={getDate:function(){return this._.getUTCDate()},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear()},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds()},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth()},getSeconds:function(){return this._.getUTCSeconds()},getTime:function(){return this._.getTime()},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.valueOf()},setDate:function(){Kc.setUTCDate.apply(this._,arguments)},setDay:function(){Kc.setUTCDay.apply(this._,arguments)},setFullYear:function(){Kc.setUTCFullYear.apply(this._,arguments)},setHours:function(){Kc.setUTCHours.apply(this._,arguments)},setMilliseconds:function(){Kc.setUTCMilliseconds.apply(this._,arguments)},setMinutes:function(){Kc.setUTCMinutes.apply(this._,arguments)},setMonth:function(){Kc.setUTCMonth.apply(this._,arguments)},setSeconds:function(){Kc.setUTCSeconds.apply(this._,arguments)},setTime:function(){Kc.setTime.apply(this._,arguments)}};var Kc=Date.prototype,Qc="%a %b %e %X %Y",nl="%m/%d/%Y",tl="%H:%M:%S",el=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],rl=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],ul=["January","February","March","April","May","June","July","August","September","October","November","December"],il=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];Wc.year=Ci(function(n){return n=Wc.day(n),n.setMonth(0,1),n},function(n,t){n.setFullYear(n.getFullYear()+t)},function(n){return n.getFullYear()}),Wc.years=Wc.year.range,Wc.years.utc=Wc.year.utc.range,Wc.day=Ci(function(n){var t=new Jc(2e3,0);return t.setFullYear(n.getFullYear(),n.getMonth(),n.getDate()),t},function(n,t){n.setDate(n.getDate()+t)},function(n){return n.getDate()-1}),Wc.days=Wc.day.range,Wc.days.utc=Wc.day.utc.range,Wc.dayOfYear=function(n){var t=Wc.year(n);return Math.floor((n-t-6e4*(n.getTimezoneOffset()-t.getTimezoneOffset()))/864e5)},Gc.forEach(function(n,t){n=n.toLowerCase(),t=7-t;var e=Wc[n]=Ci(function(n){return(n=Wc.day(n)).setDate(n.getDate()-(n.getDay()+t)%7),n},function(n,t){n.setDate(n.getDate()+7*Math.floor(t))},function(n){var e=Wc.year(n).getDay();return Math.floor((Wc.dayOfYear(n)+(e+t)%7)/7)-(e!==t)});Wc[n+"s"]=e.range,Wc[n+"s"].utc=e.utc.range,Wc[n+"OfYear"]=function(n){var e=Wc.year(n).getDay();return Math.floor((Wc.dayOfYear(n)+(e+t)%7)/7)}}),Wc.week=Wc.sunday,Wc.weeks=Wc.sunday.range,Wc.weeks.utc=Wc.sunday.utc.range,Wc.weekOfYear=Wc.sundayOfYear,Wc.format=ji;var ol=Hi(el),al=Fi(el),cl=Hi(rl),ll=Fi(rl),sl=Hi(ul),fl=Fi(ul),hl=Hi(il),gl=Fi(il),pl=/^%/,dl={"-":"",_:" ",0:"0"},vl={a:function(n){return rl[n.getDay()]},A:function(n){return el[n.getDay()]},b:function(n){return il[n.getMonth()]},B:function(n){return ul[n.getMonth()]},c:ji(Qc),d:function(n,t){return Pi(n.getDate(),t,2)},e:function(n,t){return Pi(n.getDate(),t,2)},H:function(n,t){return Pi(n.getHours(),t,2)},I:function(n,t){return Pi(n.getHours()%12||12,t,2)},j:function(n,t){return Pi(1+Wc.dayOfYear(n),t,3)},L:function(n,t){return Pi(n.getMilliseconds(),t,3)},m:function(n,t){return Pi(n.getMonth()+1,t,2)},M:function(n,t){return Pi(n.getMinutes(),t,2)},p:function(n){return n.getHours()>=12?"PM":"AM"},S:function(n,t){return Pi(n.getSeconds(),t,2)},U:function(n,t){return Pi(Wc.sundayOfYear(n),t,2)},w:function(n){return n.getDay()},W:function(n,t){return Pi(Wc.mondayOfYear(n),t,2)},x:ji(nl),X:ji(tl),y:function(n,t){return Pi(n.getFullYear()%100,t,2)},Y:function(n,t){return Pi(n.getFullYear()%1e4,t,4)},Z:ao,"%":function(){return"%"}},ml={a:Oi,A:Ri,b:Zi,B:Vi,c:Xi,d:no,e:no,H:eo,I:eo,j:to,L:io,m:Qi,M:ro,p:oo,S:uo,U:Ii,w:Yi,W:Ui,x:$i,X:Bi,y:Ji,Y:Wi,Z:Gi,"%":co},yl=/^\s*\d+/,Ml=mo.map({am:0,pm:1});ji.utc=lo;var xl=lo("%Y-%m-%dT%H:%M:%S.%LZ");ji.iso=Date.prototype.toISOString&&+new Date("2000-01-01T00:00:00.000Z")?so:xl,so.parse=function(n){var t=new Date(n);return isNaN(t)?null:t},so.toString=xl.toString,Wc.second=Ci(function(n){return new Jc(1e3*Math.floor(n/1e3))},function(n,t){n.setTime(n.getTime()+1e3*Math.floor(t))},function(n){return n.getSeconds()}),Wc.seconds=Wc.second.range,Wc.seconds.utc=Wc.second.utc.range,Wc.minute=Ci(function(n){return new Jc(6e4*Math.floor(n/6e4))},function(n,t){n.setTime(n.getTime()+6e4*Math.floor(t))},function(n){return n.getMinutes()}),Wc.minutes=Wc.minute.range,Wc.minutes.utc=Wc.minute.utc.range,Wc.hour=Ci(function(n){var t=n.getTimezoneOffset()/60;return new Jc(36e5*(Math.floor(n/36e5-t)+t))},function(n,t){n.setTime(n.getTime()+36e5*Math.floor(t))},function(n){return n.getHours()}),Wc.hours=Wc.hour.range,Wc.hours.utc=Wc.hour.utc.range,Wc.month=Ci(function(n){return n=Wc.day(n),n.setDate(1),n},function(n,t){n.setMonth(n.getMonth()+t)},function(n){return n.getMonth()}),Wc.months=Wc.month.range,Wc.months.utc=Wc.month.utc.range;var bl=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,2592e6,7776e6,31536e6],_l=[[Wc.second,1],[Wc.second,5],[Wc.second,15],[Wc.second,30],[Wc.minute,1],[Wc.minute,5],[Wc.minute,15],[Wc.minute,30],[Wc.hour,1],[Wc.hour,3],[Wc.hour,6],[Wc.hour,12],[Wc.day,1],[Wc.day,2],[Wc.week,1],[Wc.month,1],[Wc.month,3],[Wc.year,1]],wl=[[ji("%Y"),Vt],[ji("%B"),function(n){return n.getMonth()}],[ji("%b %d"),function(n){return 1!=n.getDate()}],[ji("%a %d"),function(n){return n.getDay()&&1!=n.getDate()}],[ji("%I %p"),function(n){return n.getHours()}],[ji("%I:%M"),function(n){return n.getMinutes()}],[ji(":%S"),function(n){return n.getSeconds()}],[ji(".%L"),function(n){return n.getMilliseconds()}]],Sl=go(wl);_l.year=Wc.year,Wc.scale=function(){return fo(mo.scale.linear(),_l,Sl)};var El={range:function(n,t,e){return mo.range(+n,+t,e).map(ho)}},kl=_l.map(function(n){return[n[0].utc,n[1]]}),Al=[[lo("%Y"),Vt],[lo("%B"),function(n){return n.getUTCMonth()}],[lo("%b %d"),function(n){return 1!=n.getUTCDate()}],[lo("%a %d"),function(n){return n.getUTCDay()&&1!=n.getUTCDate()}],[lo("%I %p"),function(n){return n.getUTCHours()}],[lo("%I:%M"),function(n){return n.getUTCMinutes()}],[lo(":%S"),function(n){return n.getUTCSeconds()}],[lo(".%L"),function(n){return n.getUTCMilliseconds()}]],Nl=go(Al);return kl.year=Wc.year.utc,Wc.scale.utc=function(){return fo(mo.scale.linear(),kl,Nl)},mo.text=vt(function(n){return n.responseText}),mo.json=function(n,t){return mt(n,"application/json",po,t)},mo.html=function(n,t){return mt(n,"text/html",vo,t)},mo.xml=vt(function(n){return n.responseXML}),mo}();
/*
 * metismenu - v1.1.3
 * Easy menu jQuery plugin for Twitter Bootstrap 3
 * https://github.com/onokumus/metisMenu
 *
 * Made by Osman Nuri Okumus
 * Under MIT License
 */
!function(a,b,c){function d(b,c){this.element=a(b),this.settings=a.extend({},f,c),this._defaults=f,this._name=e,this.init()}var e="metisMenu",f={toggle:!0,doubleTapToGo:!1};d.prototype={init:function(){var b=this.element,d=this.settings.toggle,f=this;this.isIE()<=9?(b.find("li.active").has("ul").children("ul").collapse("show"),b.find("li").not(".active").has("ul").children("ul").collapse("hide")):(b.find("li.active").has("ul").children("ul").addClass("collapse in"),b.find("li").not(".active").has("ul").children("ul").addClass("collapse")),f.settings.doubleTapToGo&&b.find("li.active").has("ul").children("a").addClass("doubleTapToGo"),b.find("li").has("ul").children("a").on("click."+e,function(b){return b.preventDefault(),f.settings.doubleTapToGo&&f.doubleTapToGo(a(this))&&"#"!==a(this).attr("href")&&""!==a(this).attr("href")?(b.stopPropagation(),void(c.location=a(this).attr("href"))):(a(this).parent("li").toggleClass("active").children("ul").collapse("toggle"),void(d&&a(this).parent("li").siblings().removeClass("active").children("ul.in").collapse("hide")))})},isIE:function(){for(var a,b=3,d=c.createElement("div"),e=d.getElementsByTagName("i");d.innerHTML="<!--[if gt IE "+ ++b+"]><i></i><![endif]-->",e[0];)return b>4?b:a},doubleTapToGo:function(a){var b=this.element;return a.hasClass("doubleTapToGo")?(a.removeClass("doubleTapToGo"),!0):a.parent().children("ul").length?(b.find(".doubleTapToGo").removeClass("doubleTapToGo"),a.addClass("doubleTapToGo"),!1):void 0},remove:function(){this.element.off("."+e),this.element.removeData(e)}},a.fn[e]=function(b){return this.each(function(){var c=a(this);c.data(e)&&c.data(e).remove(),c.data(e,new d(this,b))}),this}}(jQuery,window,document);
//! moment.js
//! version : 2.2.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a){function b(a,b){return function(c){return i(a.call(this,c),b)}}function c(a,b){return function(c){return this.lang().ordinal(a.call(this,c),b)}}function d(){}function e(a){g(this,a)}function f(a){var b=a.years||a.year||a.y||0,c=a.months||a.month||a.M||0,d=a.weeks||a.week||a.w||0,e=a.days||a.day||a.d||0,f=a.hours||a.hour||a.h||0,g=a.minutes||a.minute||a.m||0,h=a.seconds||a.second||a.s||0,i=a.milliseconds||a.millisecond||a.ms||0;this._input=a,this._milliseconds=+i+1e3*h+6e4*g+36e5*f,this._days=+e+7*d,this._months=+c+12*b,this._data={},this._bubble()}function g(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function h(a){return 0>a?Math.ceil(a):Math.floor(a)}function i(a,b){for(var c=a+"";c.length<b;)c="0"+c;return c}function j(a,b,c,d){var e,f,g=b._milliseconds,h=b._days,i=b._months;g&&a._d.setTime(+a._d+g*c),(h||i)&&(e=a.minute(),f=a.hour()),h&&a.date(a.date()+h*c),i&&a.month(a.month()+i*c),g&&!d&&L.updateOffset(a),(h||i)&&(a.minute(e),a.hour(f))}function k(a){return"[object Array]"===Object.prototype.toString.call(a)}function l(a,b){var c,d=Math.min(a.length,b.length),e=Math.abs(a.length-b.length),f=0;for(c=0;d>c;c++)~~a[c]!==~~b[c]&&f++;return f+e}function m(a){return a?ib[a]||a.toLowerCase().replace(/(.)s$/,"$1"):a}function n(a,b){return b.abbr=a,P[a]||(P[a]=new d),P[a].set(b),P[a]}function o(a){delete P[a]}function p(a){if(!a)return L.fn._lang;if(!P[a]&&Q)try{require("./lang/"+a)}catch(b){return L.fn._lang}return P[a]||L.fn._lang}function q(a){return a.match(/\[.*\]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function r(a){var b,c,d=a.match(T);for(b=0,c=d.length;c>b;b++)d[b]=mb[d[b]]?mb[d[b]]:q(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function s(a,b){return b=t(b,a.lang()),jb[b]||(jb[b]=r(b)),jb[b](a)}function t(a,b){function c(a){return b.longDateFormat(a)||a}for(var d=5;d--&&(U.lastIndex=0,U.test(a));)a=a.replace(U,c);return a}function u(a,b){switch(a){case"DDDD":return X;case"YYYY":return Y;case"YYYYY":return Z;case"S":case"SS":case"SSS":case"DDD":return W;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return $;case"a":case"A":return p(b._l)._meridiemParse;case"X":return bb;case"Z":case"ZZ":return _;case"T":return ab;case"MM":case"DD":case"YY":case"HH":case"hh":case"mm":case"ss":case"M":case"D":case"d":case"H":case"h":case"m":case"s":return V;default:return new RegExp(a.replace("\\",""))}}function v(a){var b=(_.exec(a)||[])[0],c=(b+"").match(fb)||["-",0,0],d=+(60*c[1])+~~c[2];return"+"===c[0]?-d:d}function w(a,b,c){var d,e=c._a;switch(a){case"M":case"MM":null!=b&&(e[1]=~~b-1);break;case"MMM":case"MMMM":d=p(c._l).monthsParse(b),null!=d?e[1]=d:c._isValid=!1;break;case"D":case"DD":null!=b&&(e[2]=~~b);break;case"DDD":case"DDDD":null!=b&&(e[1]=0,e[2]=~~b);break;case"YY":e[0]=~~b+(~~b>68?1900:2e3);break;case"YYYY":case"YYYYY":e[0]=~~b;break;case"a":case"A":c._isPm=p(c._l).isPM(b);break;case"H":case"HH":case"h":case"hh":e[3]=~~b;break;case"m":case"mm":e[4]=~~b;break;case"s":case"ss":e[5]=~~b;break;case"S":case"SS":case"SSS":e[6]=~~(1e3*("0."+b));break;case"X":c._d=new Date(1e3*parseFloat(b));break;case"Z":case"ZZ":c._useUTC=!0,c._tzm=v(b)}null==b&&(c._isValid=!1)}function x(a){var b,c,d,e=[];if(!a._d){for(d=z(a),b=0;3>b&&null==a._a[b];++b)a._a[b]=e[b]=d[b];for(;7>b;b++)a._a[b]=e[b]=null==a._a[b]?2===b?1:0:a._a[b];e[3]+=~~((a._tzm||0)/60),e[4]+=~~((a._tzm||0)%60),c=new Date(0),a._useUTC?(c.setUTCFullYear(e[0],e[1],e[2]),c.setUTCHours(e[3],e[4],e[5],e[6])):(c.setFullYear(e[0],e[1],e[2]),c.setHours(e[3],e[4],e[5],e[6])),a._d=c}}function y(a){var b=a._i;a._d||(a._a=[b.years||b.year||b.y,b.months||b.month||b.M,b.days||b.day||b.d,b.hours||b.hour||b.h,b.minutes||b.minute||b.m,b.seconds||b.second||b.s,b.milliseconds||b.millisecond||b.ms],x(a))}function z(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function A(a){var b,c,d,e=p(a._l),f=""+a._i;for(d=t(a._f,e).match(T),a._a=[],b=0;b<d.length;b++)c=(u(d[b],a).exec(f)||[])[0],c&&(f=f.slice(f.indexOf(c)+c.length)),mb[d[b]]&&w(d[b],c,a);f&&(a._il=f),a._isPm&&a._a[3]<12&&(a._a[3]+=12),a._isPm===!1&&12===a._a[3]&&(a._a[3]=0),x(a)}function B(a){var b,c,d,f,h,i=99;for(f=0;f<a._f.length;f++)b=g({},a),b._f=a._f[f],A(b),c=new e(b),h=l(b._a,c.toArray()),c._il&&(h+=c._il.length),i>h&&(i=h,d=c);g(a,d)}function C(a){var b,c=a._i,d=cb.exec(c);if(d){for(a._f="YYYY-MM-DD"+(d[2]||" "),b=0;4>b;b++)if(eb[b][1].exec(c)){a._f+=eb[b][0];break}_.exec(c)&&(a._f+=" Z"),A(a)}else a._d=new Date(c)}function D(b){var c=b._i,d=R.exec(c);c===a?b._d=new Date:d?b._d=new Date(+d[1]):"string"==typeof c?C(b):k(c)?(b._a=c.slice(0),x(b)):c instanceof Date?b._d=new Date(+c):"object"==typeof c?y(b):b._d=new Date(c)}function E(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function F(a,b,c){var d=O(Math.abs(a)/1e3),e=O(d/60),f=O(e/60),g=O(f/24),h=O(g/365),i=45>d&&["s",d]||1===e&&["m"]||45>e&&["mm",e]||1===f&&["h"]||22>f&&["hh",f]||1===g&&["d"]||25>=g&&["dd",g]||45>=g&&["M"]||345>g&&["MM",O(g/30)]||1===h&&["y"]||["yy",h];return i[2]=b,i[3]=a>0,i[4]=c,E.apply({},i)}function G(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=L(a).add("d",f),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function H(a){var b=a._i,c=a._f;return null===b||""===b?null:("string"==typeof b&&(a._i=b=p().preparse(b)),L.isMoment(b)?(a=g({},b),a._d=new Date(+b._d)):c?k(c)?B(a):A(a):D(a),new e(a))}function I(a,b){L.fn[a]=L.fn[a+"s"]=function(a){var c=this._isUTC?"UTC":"";return null!=a?(this._d["set"+c+b](a),L.updateOffset(this),this):this._d["get"+c+b]()}}function J(a){L.duration.fn[a]=function(){return this._data[a]}}function K(a,b){L.duration.fn["as"+a]=function(){return+this/b}}for(var L,M,N="2.2.1",O=Math.round,P={},Q="undefined"!=typeof module&&module.exports,R=/^\/?Date\((\-?\d+)/i,S=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/,T=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,U=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,V=/\d\d?/,W=/\d{1,3}/,X=/\d{3}/,Y=/\d{1,4}/,Z=/[+\-]?\d{1,6}/,$=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,_=/Z|[\+\-]\d\d:?\d\d/i,ab=/T/i,bb=/[\+\-]?\d+(\.\d{1,3})?/,cb=/^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,db="YYYY-MM-DDTHH:mm:ssZ",eb=[["HH:mm:ss.S",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],fb=/([\+\-]|\d\d)/gi,gb="Date|Hours|Minutes|Seconds|Milliseconds".split("|"),hb={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6},ib={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",w:"week",W:"isoweek",M:"month",y:"year"},jb={},kb="DDD w W M D d".split(" "),lb="M D H h m s w W".split(" "),mb={M:function(){return this.month()+1},MMM:function(a){return this.lang().monthsShort(this,a)},MMMM:function(a){return this.lang().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(a){return this.lang().weekdaysMin(this,a)},ddd:function(a){return this.lang().weekdaysShort(this,a)},dddd:function(a){return this.lang().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return i(this.year()%100,2)},YYYY:function(){return i(this.year(),4)},YYYYY:function(){return i(this.year(),5)},gg:function(){return i(this.weekYear()%100,2)},gggg:function(){return this.weekYear()},ggggg:function(){return i(this.weekYear(),5)},GG:function(){return i(this.isoWeekYear()%100,2)},GGGG:function(){return this.isoWeekYear()},GGGGG:function(){return i(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return~~(this.milliseconds()/100)},SS:function(){return i(~~(this.milliseconds()/10),2)},SSS:function(){return i(this.milliseconds(),3)},Z:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+i(~~(a/60),2)+":"+i(~~a%60,2)},ZZ:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+i(~~(10*a/6),4)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()}};kb.length;)M=kb.pop(),mb[M+"o"]=c(mb[M],M);for(;lb.length;)M=lb.pop(),mb[M+M]=b(mb[M],2);for(mb.DDDD=b(mb.DDD,3),g(d.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(a){return this._months[a.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a){var b,c,d;for(this._monthsParse||(this._monthsParse=[]),b=0;12>b;b++)if(this._monthsParse[b]||(c=L.utc([2e3,b]),d="^"+this.months(c,"")+"|^"+this.monthsShort(c,""),this._monthsParse[b]=new RegExp(d.replace(".",""),"i")),this._monthsParse[b].test(a))return b},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=L([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b){var c=this._calendar[a];return"function"==typeof c?c.apply(b):c},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",preparse:function(a){return a},postformat:function(a){return a},week:function(a){return G(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6}}),L=function(a,b,c){return H({_i:a,_f:b,_l:c,_isUTC:!1})},L.utc=function(a,b,c){return H({_useUTC:!0,_isUTC:!0,_l:c,_i:a,_f:b}).utc()},L.unix=function(a){return L(1e3*a)},L.duration=function(a,b){var c,d,e=L.isDuration(a),g="number"==typeof a,h=e?a._input:g?{}:a,i=S.exec(a);return g?b?h[b]=a:h.milliseconds=a:i&&(c="-"===i[1]?-1:1,h={y:0,d:~~i[2]*c,h:~~i[3]*c,m:~~i[4]*c,s:~~i[5]*c,ms:~~i[6]*c}),d=new f(h),e&&a.hasOwnProperty("_lang")&&(d._lang=a._lang),d},L.version=N,L.defaultFormat=db,L.updateOffset=function(){},L.lang=function(a,b){return a?(a=a.toLowerCase(),a=a.replace("_","-"),b?n(a,b):null===b?(o(a),a="en"):P[a]||p(a),L.duration.fn._lang=L.fn._lang=p(a),void 0):L.fn._lang._abbr},L.langData=function(a){return a&&a._lang&&a._lang._abbr&&(a=a._lang._abbr),p(a)},L.isMoment=function(a){return a instanceof e},L.isDuration=function(a){return a instanceof f},g(L.fn=e.prototype,{clone:function(){return L(this)},valueOf:function(){return+this._d+6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){return s(L(this).utc(),"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds()]},isValid:function(){return null==this._isValid&&(this._isValid=this._a?!l(this._a,(this._isUTC?L.utc(this._a):L(this._a)).toArray()):!isNaN(this._d.getTime())),!!this._isValid},invalidAt:function(){var a,b=this._a,c=(this._isUTC?L.utc(this._a):L(this._a)).toArray();for(a=6;a>=0&&b[a]===c[a];--a);return a},utc:function(){return this.zone(0)},local:function(){return this.zone(0),this._isUTC=!1,this},format:function(a){var b=s(this,a||L.defaultFormat);return this.lang().postformat(b)},add:function(a,b){var c;return c="string"==typeof a?L.duration(+b,a):L.duration(a,b),j(this,c,1),this},subtract:function(a,b){var c;return c="string"==typeof a?L.duration(+b,a):L.duration(a,b),j(this,c,-1),this},diff:function(a,b,c){var d,e,f=this._isUTC?L(a).zone(this._offset||0):L(a).local(),g=6e4*(this.zone()-f.zone());return b=m(b),"year"===b||"month"===b?(d=432e5*(this.daysInMonth()+f.daysInMonth()),e=12*(this.year()-f.year())+(this.month()-f.month()),e+=(this-L(this).startOf("month")-(f-L(f).startOf("month")))/d,e-=6e4*(this.zone()-L(this).startOf("month").zone()-(f.zone()-L(f).startOf("month").zone()))/d,"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:h(e)},from:function(a,b){return L.duration(this.diff(a)).lang(this.lang()._abbr).humanize(!b)},fromNow:function(a){return this.from(L(),a)},calendar:function(){var a=this.diff(L().zone(this.zone()).startOf("day"),"days",!0),b=-6>a?"sameElse":-1>a?"lastWeek":0>a?"lastDay":1>a?"sameDay":2>a?"nextDay":7>a?"nextWeek":"sameElse";return this.format(this.lang().calendar(b,this))},isLeapYear:function(){var a=this.year();return 0===a%4&&0!==a%100||0===a%400},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?"string"==typeof a&&(a=this.lang().weekdaysParse(a),"number"!=typeof a)?this:this.add({d:a-b}):b},month:function(a){var b,c=this._isUTC?"UTC":"";return null!=a?"string"==typeof a&&(a=this.lang().monthsParse(a),"number"!=typeof a)?this:(b=this.date(),this.date(1),this._d["set"+c+"Month"](a),this.date(Math.min(b,this.daysInMonth())),L.updateOffset(this),this):this._d["get"+c+"Month"]()},startOf:function(a){switch(a=m(a)){case"year":this.month(0);case"month":this.date(1);case"week":case"isoweek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a?this.weekday(0):"isoweek"===a&&this.isoWeekday(1),this},endOf:function(a){return a=m(a),this.startOf(a).add("isoweek"===a?"week":a,1).subtract("ms",1)},isAfter:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)>+L(a).startOf(b)},isBefore:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)<+L(a).startOf(b)},isSame:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)===+L(a).startOf(b)},min:function(a){return a=L.apply(null,arguments),this>a?this:a},max:function(a){return a=L.apply(null,arguments),a>this?this:a},zone:function(a){var b=this._offset||0;return null==a?this._isUTC?b:this._d.getTimezoneOffset():("string"==typeof a&&(a=v(a)),Math.abs(a)<16&&(a=60*a),this._offset=a,this._isUTC=!0,b!==a&&j(this,L.duration(b-a,"m"),1,!0),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},hasAlignedHourOffset:function(a){return a=a?L(a).zone():0,0===(this.zone()-a)%60},daysInMonth:function(){return L.utc([this.year(),this.month()+1,0]).date()},dayOfYear:function(a){var b=O((L(this).startOf("day")-L(this).startOf("year"))/864e5)+1;return null==a?b:this.add("d",a-b)},weekYear:function(a){var b=G(this,this.lang()._week.dow,this.lang()._week.doy).year;return null==a?b:this.add("y",a-b)},isoWeekYear:function(a){var b=G(this,1,4).year;return null==a?b:this.add("y",a-b)},week:function(a){var b=this.lang().week(this);return null==a?b:this.add("d",7*(a-b))},isoWeek:function(a){var b=G(this,1,4).week;return null==a?b:this.add("d",7*(a-b))},weekday:function(a){var b=(this._d.getDay()+7-this.lang()._week.dow)%7;return null==a?b:this.add("d",a-b)},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},get:function(a){return a=m(a),this[a.toLowerCase()]()},set:function(a,b){a=m(a),this[a.toLowerCase()](b)},lang:function(b){return b===a?this._lang:(this._lang=p(b),this)}}),M=0;M<gb.length;M++)I(gb[M].toLowerCase().replace(/s$/,""),gb[M]);I("year","FullYear"),L.fn.days=L.fn.day,L.fn.months=L.fn.month,L.fn.weeks=L.fn.week,L.fn.isoWeeks=L.fn.isoWeek,L.fn.toJSON=L.fn.toISOString,g(L.duration.fn=f.prototype,{_bubble:function(){var a,b,c,d,e=this._milliseconds,f=this._days,g=this._months,i=this._data;i.milliseconds=e%1e3,a=h(e/1e3),i.seconds=a%60,b=h(a/60),i.minutes=b%60,c=h(b/60),i.hours=c%24,f+=h(c/24),i.days=f%30,g+=h(f/30),i.months=g%12,d=h(g/12),i.years=d},weeks:function(){return h(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+2592e6*(this._months%12)+31536e6*~~(this._months/12)},humanize:function(a){var b=+this,c=F(b,!a,this.lang());return a&&(c=this.lang().pastFuture(b,c)),this.lang().postformat(c)},add:function(a,b){var c=L.duration(a,b);return this._milliseconds+=c._milliseconds,this._days+=c._days,this._months+=c._months,this._bubble(),this},subtract:function(a,b){var c=L.duration(a,b);return this._milliseconds-=c._milliseconds,this._days-=c._days,this._months-=c._months,this._bubble(),this},get:function(a){return a=m(a),this[a.toLowerCase()+"s"]()},as:function(a){return a=m(a),this["as"+a.charAt(0).toUpperCase()+a.slice(1)+"s"]()},lang:L.fn.lang});for(M in hb)hb.hasOwnProperty(M)&&(K(M,hb[M]),J(M.toLowerCase()));K("Weeks",6048e5),L.duration.fn.asMonths=function(){return(+this-31536e6*this.years())/2592e6+12*this.years()},L.lang("en",{ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),function(a){a(L)}(function(a){a.lang("ar-ma",{months:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),monthsShort:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),weekdays:"الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:6,doy:12}})}),function(a){a(L)}(function(a){a.lang("ar",{months:"يناير/ كانون الثاني_فبراير/ شباط_مارس/ آذار_أبريل/ نيسان_مايو/ أيار_يونيو/ حزيران_يوليو/ تموز_أغسطس/ آب_سبتمبر/ أيلول_أكتوبر/ تشرين الأول_نوفمبر/ تشرين الثاني_ديسمبر/ كانون الأول".split("_"),monthsShort:"يناير/ كانون الثاني_فبراير/ شباط_مارس/ آذار_أبريل/ نيسان_مايو/ أيار_يونيو/ حزيران_يوليو/ تموز_أغسطس/ آب_سبتمبر/ أيلول_أكتوبر/ تشرين الأول_نوفمبر/ تشرين الثاني_ديسمبر/ كانون الأول".split("_"),weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:6,doy:12}})}),function(a){a(L)}(function(a){a.lang("bg",{months:"януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),monthsShort:"янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),weekdays:"неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),weekdaysShort:"нед_пон_вто_сря_чет_пет_съб".split("_"),weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"h:mm",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Днес в] LT",nextDay:"[Утре в] LT",nextWeek:"dddd [в] LT",lastDay:"[Вчера в] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[В изминалата] dddd [в] LT";case 1:case 2:case 4:case 5:return"[В изминалия] dddd [в] LT"}},sameElse:"L"},relativeTime:{future:"след %s",past:"преди %s",s:"няколко секунди",m:"минута",mm:"%d минути",h:"час",hh:"%d часа",d:"ден",dd:"%d дни",M:"месец",MM:"%d месеца",y:"година",yy:"%d години"},ordinal:function(a){var b=a%10,c=a%100;return 0===a?a+"-ев":0===c?a+"-ен":c>10&&20>c?a+"-ти":1===b?a+"-ви":2===b?a+"-ри":7===b||8===b?a+"-ми":a+"-ти"},week:{dow:1,doy:7}})}),function(a){a(L)}(function(b){function c(a,b,c){var d={mm:"munutenn",MM:"miz",dd:"devezh"};return a+" "+f(d[c],a)}function d(a){switch(e(a)){case 1:case 3:case 4:case 5:case 9:return a+" bloaz";default:return a+" vloaz"}}function e(a){return a>9?e(a%10):a}function f(a,b){return 2===b?g(a):a}function g(b){var c={m:"v",b:"v",d:"z"};return c[b.charAt(0)]===a?b:c[b.charAt(0)]+b.substring(1)}b.lang("br",{months:"Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),monthsShort:"Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),weekdays:"Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),weekdaysShort:"Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),weekdaysMin:"Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),longDateFormat:{LT:"h[e]mm A",L:"DD/MM/YYYY",LL:"D [a viz] MMMM YYYY",LLL:"D [a viz] MMMM YYYY LT",LLLL:"dddd, D [a viz] MMMM YYYY LT"},calendar:{sameDay:"[Hiziv da] LT",nextDay:"[Warc'hoazh da] LT",nextWeek:"dddd [da] LT",lastDay:"[Dec'h da] LT",lastWeek:"dddd [paset da] LT",sameElse:"L"},relativeTime:{future:"a-benn %s",past:"%s 'zo",s:"un nebeud segondennoù",m:"ur vunutenn",mm:c,h:"un eur",hh:"%d eur",d:"un devezh",dd:c,M:"ur miz",MM:c,y:"ur bloaz",yy:d},ordinal:function(a){var b=1===a?"añ":"vet";return a+b},week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){a.lang("ca",{months:"Gener_Febrer_Març_Abril_Maig_Juny_Juliol_Agost_Setembre_Octubre_Novembre_Desembre".split("_"),monthsShort:"Gen._Febr._Mar._Abr._Mai._Jun._Jul._Ag._Set._Oct._Nov._Des.".split("_"),weekdays:"Diumenge_Dilluns_Dimarts_Dimecres_Dijous_Divendres_Dissabte".split("_"),weekdaysShort:"Dg._Dl._Dt._Dc._Dj._Dv._Ds.".split("_"),weekdaysMin:"Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),longDateFormat:{LT:"H:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:function(){return"[avui a "+(1!==this.hours()?"les":"la")+"] LT"},nextDay:function(){return"[demà a "+(1!==this.hours()?"les":"la")+"] LT"},nextWeek:function(){return"dddd [a "+(1!==this.hours()?"les":"la")+"] LT"},lastDay:function(){return"[ahir a "+(1!==this.hours()?"les":"la")+"] LT"},lastWeek:function(){return"[el] dddd [passat a "+(1!==this.hours()?"les":"la")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"fa %s",s:"uns segons",m:"un minut",mm:"%d minuts",h:"una hora",hh:"%d hores",d:"un dia",dd:"%d dies",M:"un mes",MM:"%d mesos",y:"un any",yy:"%d anys"},ordinal:"%dº",week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){function b(a){return a>1&&5>a&&1!==~~(a/10)}function c(a,c,d,e){var f=a+" ";switch(d){case"s":return c||e?"pár vteřin":"pár vteřinami";case"m":return c?"minuta":e?"minutu":"minutou";case"mm":return c||e?f+(b(a)?"minuty":"minut"):f+"minutami";break;case"h":return c?"hodina":e?"hodinu":"hodinou";case"hh":return c||e?f+(b(a)?"hodiny":"hodin"):f+"hodinami";break;case"d":return c||e?"den":"dnem";case"dd":return c||e?f+(b(a)?"dny":"dní"):f+"dny";break;case"M":return c||e?"měsíc":"měsícem";case"MM":return c||e?f+(b(a)?"měsíce":"měsíců"):f+"měsíci";break;case"y":return c||e?"rok":"rokem";case"yy":return c||e?f+(b(a)?"roky":"let"):f+"lety"}}var d="leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"),e="led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_");a.lang("cs",{months:d,monthsShort:e,monthsParse:function(a,b){var c,d=[];for(c=0;12>c;c++)d[c]=new RegExp("^"+a[c]+"$|^"+b[c]+"$","i");return d}(d,e),weekdays:"neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),weekdaysShort:"ne_po_út_st_čt_pá_so".split("_"),weekdaysMin:"ne_po_út_st_čt_pá_so".split("_"),longDateFormat:{LT:"H:mm",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd D. MMMM YYYY LT"},calendar:{sameDay:"[dnes v] LT",nextDay:"[zítra v] LT",nextWeek:function(){switch(this.day()){case 0:return"[v neděli v] LT";case 1:case 2:return"[v] dddd [v] LT";case 3:return"[ve středu v] LT";case 4:return"[ve čtvrtek v] LT";case 5:return"[v pátek v] LT";case 6:return"[v sobotu v] LT"}},lastDay:"[včera v] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulou neděli v] LT";case 1:case 2:return"[minulé] dddd [v] LT";case 3:return"[minulou středu v] LT";case 4:case 5:return"[minulý] dddd [v] LT";case 6:return"[minulou sobotu v] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"před %s",s:c,m:c,mm:c,h:c,hh:c,d:c,dd:c,M:c,MM:c,y:c,yy:c},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){a.lang("cv",{months:"кăрлач_нарăс_пуш_ака_май_çĕртме_утă_çурла_авăн_юпа_чӳк_раштав".split("_"),monthsShort:"кăр_нар_пуш_ака_май_çĕр_утă_çур_ав_юпа_чӳк_раш".split("_"),weekdays:"вырсарникун_тунтикун_ытларикун_юнкун_кĕçнерникун_эрнекун_шăматкун".split("_"),weekdaysShort:"выр_тун_ытл_юн_кĕç_эрн_шăм".split("_"),weekdaysMin:"вр_тн_ыт_юн_кç_эр_шм".split("_"),longDateFormat:{LT:"HH:mm",L:"DD-MM-YYYY",LL:"YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ]",LLL:"YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ], LT",LLLL:"dddd, YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ], LT"},calendar:{sameDay:"[Паян] LT [сехетре]",nextDay:"[Ыран] LT [сехетре]",lastDay:"[Ĕнер] LT [сехетре]",nextWeek:"[Çитес] dddd LT [сехетре]",lastWeek:"[Иртнĕ] dddd LT [сехетре]",sameElse:"L"},relativeTime:{future:function(a){var b=/сехет$/i.exec(a)?"рен":/çул$/i.exec(a)?"тан":"ран";return a+b},past:"%s каялла",s:"пĕр-ик çеккунт",m:"пĕр минут",mm:"%d минут",h:"пĕр сехет",hh:"%d сехет",d:"пĕр кун",dd:"%d кун",M:"пĕр уйăх",MM:"%d уйăх",y:"пĕр çул",yy:"%d çул"},ordinal:"%d-мĕш",week:{dow:1,doy:7}})}),function(a){a(L)}(function(a){a.lang("da",{months:"januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"søn_man_tir_ons_tor_fre_lør".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D. MMMM, YYYY LT"},calendar:{sameDay:"[I dag kl.] LT",nextDay:"[I morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[I går kl.] LT",lastWeek:"[sidste] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s siden",s:"få sekunder",m:"et minut",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dage",M:"en måned",MM:"%d måneder",y:"et år",yy:"%d år"},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){function b(a,b,c){var d={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[a+" Tage",a+" Tagen"],M:["ein Monat","einem Monat"],MM:[a+" Monate",a+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[a+" Jahre",a+" Jahren"]};return b?d[c][0]:d[c][1]}a.lang("de",{months:"Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),longDateFormat:{LT:"H:mm [Uhr]",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[Heute um] LT",sameElse:"L",nextDay:"[Morgen um] LT",nextWeek:"dddd [um] LT",lastDay:"[Gestern um] LT",lastWeek:"[letzten] dddd [um] LT"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:b,mm:"%d Minuten",h:b,hh:"%d Stunden",d:b,dd:b,M:b,MM:b,y:b,yy:b},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){a.lang("el",{monthsNominativeEl:"Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),monthsGenitiveEl:"Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split("_"),months:function(a,b){return/D/.test(b.substring(0,b.indexOf("MMMM")))?this._monthsGenitiveEl[a.month()]:this._monthsNominativeEl[a.month()]},monthsShort:"Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),weekdays:"Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),weekdaysShort:"Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),weekdaysMin:"Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),meridiem:function(a,b,c){return a>11?c?"μμ":"ΜΜ":c?"πμ":"ΠΜ"},longDateFormat:{LT:"h:mm A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendarEl:{sameDay:"[Σήμερα {}] LT",nextDay:"[Αύριο {}] LT",nextWeek:"dddd [{}] LT",lastDay:"[Χθες {}] LT",lastWeek:"[την προηγούμενη] dddd [{}] LT",sameElse:"L"},calendar:function(a,b){var c=this._calendarEl[a],d=b&&b.hours();return c.replace("{}",1===d%12?"στη":"στις")},relativeTime:{future:"σε %s",past:"%s πριν",s:"δευτερόλεπτα",m:"ένα λεπτό",mm:"%d λεπτά",h:"μία ώρα",hh:"%d ώρες",d:"μία μέρα",dd:"%d μέρες",M:"ένας μήνας",MM:"%d μήνες",y:"ένας χρόνος",yy:"%d χρόνια"},ordinal:function(a){return a+"η"},week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){a.lang("en-ca",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",L:"YYYY-MM-DD",LL:"D MMMM, YYYY",LLL:"D MMMM, YYYY LT",LLLL:"dddd, D MMMM, YYYY LT"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}})}),function(a){a(L)}(function(a){a.lang("en-gb",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";
return a+c},week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){a.lang("eo",{months:"januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),weekdays:"Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato".split("_"),weekdaysShort:"Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Ĵa_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",L:"YYYY-MM-DD",LL:"D[-an de] MMMM, YYYY",LLL:"D[-an de] MMMM, YYYY LT",LLLL:"dddd, [la] D[-an de] MMMM, YYYY LT"},meridiem:function(a,b,c){return a>11?c?"p.t.m.":"P.T.M.":c?"a.t.m.":"A.T.M."},calendar:{sameDay:"[Hodiaŭ je] LT",nextDay:"[Morgaŭ je] LT",nextWeek:"dddd [je] LT",lastDay:"[Hieraŭ je] LT",lastWeek:"[pasinta] dddd [je] LT",sameElse:"L"},relativeTime:{future:"je %s",past:"antaŭ %s",s:"sekundoj",m:"minuto",mm:"%d minutoj",h:"horo",hh:"%d horoj",d:"tago",dd:"%d tagoj",M:"monato",MM:"%d monatoj",y:"jaro",yy:"%d jaroj"},ordinal:"%da",week:{dow:1,doy:7}})}),function(a){a(L)}(function(a){a.lang("es",{months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),monthsShort:"ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),weekdays:"domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),weekdaysShort:"dom._lun._mar._mié._jue._vie._sáb.".split("_"),weekdaysMin:"Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),longDateFormat:{LT:"H:mm",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY LT",LLLL:"dddd, D [de] MMMM [de] YYYY LT"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[mañana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un año",yy:"%d años"},ordinal:"%dº",week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){function b(a,b,c,d){return d||b?"paari sekundi":"paar sekundit"}a.lang("et",{months:"jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),monthsShort:"jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),weekdays:"pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),weekdaysShort:"P_E_T_K_N_R_L".split("_"),weekdaysMin:"P_E_T_K_N_R_L".split("_"),longDateFormat:{LT:"H:mm",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[Täna,] LT",nextDay:"[Homme,] LT",nextWeek:"[Järgmine] dddd LT",lastDay:"[Eile,] LT",lastWeek:"[Eelmine] dddd LT",sameElse:"L"},relativeTime:{future:"%s pärast",past:"%s tagasi",s:b,m:"minut",mm:"%d minutit",h:"tund",hh:"%d tundi",d:"päev",dd:"%d päeva",M:"kuu",MM:"%d kuud",y:"aasta",yy:"%d aastat"},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){a.lang("eu",{months:"urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),monthsShort:"urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),weekdays:"igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),weekdaysShort:"ig._al._ar._az._og._ol._lr.".split("_"),weekdaysMin:"ig_al_ar_az_og_ol_lr".split("_"),longDateFormat:{LT:"HH:mm",L:"YYYY-MM-DD",LL:"YYYY[ko] MMMM[ren] D[a]",LLL:"YYYY[ko] MMMM[ren] D[a] LT",LLLL:"dddd, YYYY[ko] MMMM[ren] D[a] LT",l:"YYYY-M-D",ll:"YYYY[ko] MMM D[a]",lll:"YYYY[ko] MMM D[a] LT",llll:"ddd, YYYY[ko] MMM D[a] LT"},calendar:{sameDay:"[gaur] LT[etan]",nextDay:"[bihar] LT[etan]",nextWeek:"dddd LT[etan]",lastDay:"[atzo] LT[etan]",lastWeek:"[aurreko] dddd LT[etan]",sameElse:"L"},relativeTime:{future:"%s barru",past:"duela %s",s:"segundo batzuk",m:"minutu bat",mm:"%d minutu",h:"ordu bat",hh:"%d ordu",d:"egun bat",dd:"%d egun",M:"hilabete bat",MM:"%d hilabete",y:"urte bat",yy:"%d urte"},ordinal:"%d.",week:{dow:1,doy:7}})}),function(a){a(L)}(function(a){var b={1:"۱",2:"۲",3:"۳",4:"۴",5:"۵",6:"۶",7:"۷",8:"۸",9:"۹",0:"۰"},c={"۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","۰":"0"};a.lang("fa",{months:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),monthsShort:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),weekdays:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),weekdaysShort:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),weekdaysMin:"ی_د_س_چ_پ_ج_ش".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},meridiem:function(a){return 12>a?"قبل از ظهر":"بعد از ظهر"},calendar:{sameDay:"[امروز ساعت] LT",nextDay:"[فردا ساعت] LT",nextWeek:"dddd [ساعت] LT",lastDay:"[دیروز ساعت] LT",lastWeek:"dddd [پیش] [ساعت] LT",sameElse:"L"},relativeTime:{future:"در %s",past:"%s پیش",s:"چندین ثانیه",m:"یک دقیقه",mm:"%d دقیقه",h:"یک ساعت",hh:"%d ساعت",d:"یک روز",dd:"%d روز",M:"یک ماه",MM:"%d ماه",y:"یک سال",yy:"%d سال"},preparse:function(a){return a.replace(/[۰-۹]/g,function(a){return c[a]}).replace(/،/g,",")},postformat:function(a){return a.replace(/\d/g,function(a){return b[a]}).replace(/,/g,"،")},ordinal:"%dم",week:{dow:6,doy:12}})}),function(a){a(L)}(function(a){function b(a,b,d,e){var f="";switch(d){case"s":return e?"muutaman sekunnin":"muutama sekunti";case"m":return e?"minuutin":"minuutti";case"mm":f=e?"minuutin":"minuuttia";break;case"h":return e?"tunnin":"tunti";case"hh":f=e?"tunnin":"tuntia";break;case"d":return e?"päivän":"päivä";case"dd":f=e?"päivän":"päivää";break;case"M":return e?"kuukauden":"kuukausi";case"MM":f=e?"kuukauden":"kuukautta";break;case"y":return e?"vuoden":"vuosi";case"yy":f=e?"vuoden":"vuotta"}return f=c(a,e)+" "+f}function c(a,b){return 10>a?b?e[a]:d[a]:a}var d="nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" "),e=["nolla","yhden","kahden","kolmen","neljän","viiden","kuuden",d[7],d[8],d[9]];a.lang("fi",{months:"tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),monthsShort:"tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),weekdays:"sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),weekdaysShort:"su_ma_ti_ke_to_pe_la".split("_"),weekdaysMin:"su_ma_ti_ke_to_pe_la".split("_"),longDateFormat:{LT:"HH.mm",L:"DD.MM.YYYY",LL:"Do MMMM[ta] YYYY",LLL:"Do MMMM[ta] YYYY, [klo] LT",LLLL:"dddd, Do MMMM[ta] YYYY, [klo] LT",l:"D.M.YYYY",ll:"Do MMM YYYY",lll:"Do MMM YYYY, [klo] LT",llll:"ddd, Do MMM YYYY, [klo] LT"},calendar:{sameDay:"[tänään] [klo] LT",nextDay:"[huomenna] [klo] LT",nextWeek:"dddd [klo] LT",lastDay:"[eilen] [klo] LT",lastWeek:"[viime] dddd[na] [klo] LT",sameElse:"L"},relativeTime:{future:"%s päästä",past:"%s sitten",s:b,m:b,mm:b,h:b,hh:b,d:b,dd:b,M:b,MM:b,y:b,yy:b},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){a.lang("fr-ca",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[Aujourd'hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinal:function(a){return a+(1===a?"er":"")}})}),function(a){a(L)}(function(a){a.lang("fr",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[Aujourd'hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinal:function(a){return a+(1===a?"er":"")},week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){a.lang("gl",{months:"Xaneiro_Febreiro_Marzo_Abril_Maio_Xuño_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro".split("_"),monthsShort:"Xan._Feb._Mar._Abr._Mai._Xuñ._Xul._Ago._Set._Out._Nov._Dec.".split("_"),weekdays:"Domingo_Luns_Martes_Mércores_Xoves_Venres_Sábado".split("_"),weekdaysShort:"Dom._Lun._Mar._Mér._Xov._Ven._Sáb.".split("_"),weekdaysMin:"Do_Lu_Ma_Mé_Xo_Ve_Sá".split("_"),longDateFormat:{LT:"H:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:function(){return"[hoxe "+(1!==this.hours()?"ás":"á")+"] LT"},nextDay:function(){return"[mañá "+(1!==this.hours()?"ás":"á")+"] LT"},nextWeek:function(){return"dddd ["+(1!==this.hours()?"ás":"a")+"] LT"},lastDay:function(){return"[onte "+(1!==this.hours()?"á":"a")+"] LT"},lastWeek:function(){return"[o] dddd [pasado "+(1!==this.hours()?"ás":"a")+"] LT"},sameElse:"L"},relativeTime:{future:function(a){return"uns segundos"===a?"nuns segundos":"en "+a},past:"hai %s",s:"uns segundos",m:"un minuto",mm:"%d minutos",h:"unha hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un ano",yy:"%d anos"},ordinal:"%dº",week:{dow:1,doy:7}})}),function(a){a(L)}(function(a){a.lang("he",{months:"ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),monthsShort:"ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"),weekdays:"ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),weekdaysShort:"א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),weekdaysMin:"א_ב_ג_ד_ה_ו_ש".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D [ב]MMMM YYYY",LLL:"D [ב]MMMM YYYY LT",LLLL:"dddd, D [ב]MMMM YYYY LT",l:"D/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY LT",llll:"ddd, D MMM YYYY LT"},calendar:{sameDay:"[היום ב־]LT",nextDay:"[מחר ב־]LT",nextWeek:"dddd [בשעה] LT",lastDay:"[אתמול ב־]LT",lastWeek:"[ביום] dddd [האחרון בשעה] LT",sameElse:"L"},relativeTime:{future:"בעוד %s",past:"לפני %s",s:"מספר שניות",m:"דקה",mm:"%d דקות",h:"שעה",hh:function(a){return 2===a?"שעתיים":a+" שעות"},d:"יום",dd:function(a){return 2===a?"יומיים":a+" ימים"},M:"חודש",MM:function(a){return 2===a?"חודשיים":a+" חודשים"},y:"שנה",yy:function(a){return 2===a?"שנתיים":a+" שנים"}}})}),function(a){a(L)}(function(a){var b={1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"},c={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"};a.lang("hi",{months:"जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"),monthsShort:"जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"),weekdays:"रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),weekdaysShort:"रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),longDateFormat:{LT:"A h:mm बजे",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, LT",LLLL:"dddd, D MMMM YYYY, LT"},calendar:{sameDay:"[आज] LT",nextDay:"[कल] LT",nextWeek:"dddd, LT",lastDay:"[कल] LT",lastWeek:"[पिछले] dddd, LT",sameElse:"L"},relativeTime:{future:"%s में",past:"%s पहले",s:"कुछ ही क्षण",m:"एक मिनट",mm:"%d मिनट",h:"एक घंटा",hh:"%d घंटे",d:"एक दिन",dd:"%d दिन",M:"एक महीने",MM:"%d महीने",y:"एक वर्ष",yy:"%d वर्ष"},preparse:function(a){return a.replace(/[१२३४५६७८९०]/g,function(a){return c[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return b[a]})},meridiem:function(a){return 4>a?"रात":10>a?"सुबह":17>a?"दोपहर":20>a?"शाम":"रात"},week:{dow:0,doy:6}})}),function(a){a(L)}(function(a){function b(a,b,c){var d=a+" ";switch(c){case"m":return b?"jedna minuta":"jedne minute";case"mm":return d+=1===a?"minuta":2===a||3===a||4===a?"minute":"minuta";case"h":return b?"jedan sat":"jednog sata";case"hh":return d+=1===a?"sat":2===a||3===a||4===a?"sata":"sati";case"dd":return d+=1===a?"dan":"dana";case"MM":return d+=1===a?"mjesec":2===a||3===a||4===a?"mjeseca":"mjeseci";case"yy":return d+=1===a?"godina":2===a||3===a||4===a?"godine":"godina"}}a.lang("hr",{months:"sječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_"),monthsShort:"sje._vel._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),longDateFormat:{LT:"H:mm",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[jučer u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[prošlu] dddd [u] LT";case 6:return"[prošle] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[prošli] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:b,mm:b,h:b,hh:b,d:"dan",dd:b,M:"mjesec",MM:b,y:"godinu",yy:b},ordinal:"%d.",week:{dow:1,doy:7}})}),function(a){a(L)}(function(a){function b(a,b,c,d){var e=a;switch(c){case"s":return d||b?"néhány másodperc":"néhány másodperce";case"m":return"egy"+(d||b?" perc":" perce");case"mm":return e+(d||b?" perc":" perce");case"h":return"egy"+(d||b?" óra":" órája");case"hh":return e+(d||b?" óra":" órája");case"d":return"egy"+(d||b?" nap":" napja");case"dd":return e+(d||b?" nap":" napja");case"M":return"egy"+(d||b?" hónap":" hónapja");case"MM":return e+(d||b?" hónap":" hónapja");case"y":return"egy"+(d||b?" év":" éve");case"yy":return e+(d||b?" év":" éve")}return""}function c(a){return(a?"":"[múlt] ")+"["+d[this.day()]+"] LT[-kor]"}var d="vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ");a.lang("hu",{months:"január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),monthsShort:"jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),weekdays:"vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),weekdaysShort:"v_h_k_sze_cs_p_szo".split("_"),longDateFormat:{LT:"H:mm",L:"YYYY.MM.DD.",LL:"YYYY. MMMM D.",LLL:"YYYY. MMMM D., LT",LLLL:"YYYY. MMMM D., dddd LT"},calendar:{sameDay:"[ma] LT[-kor]",nextDay:"[holnap] LT[-kor]",nextWeek:function(){return c.call(this,!0)},lastDay:"[tegnap] LT[-kor]",lastWeek:function(){return c.call(this,!1)},sameElse:"L"},relativeTime:{future:"%s múlva",past:"%s",s:b,m:b,mm:b,h:b,hh:b,d:b,dd:b,M:b,MM:b,y:b,yy:b},ordinal:"%d.",week:{dow:1,doy:7}})}),function(a){a(L)}(function(a){a.lang("id",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),weekdays:"Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),weekdaysShort:"Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] LT",LLLL:"dddd, D MMMM YYYY [pukul] LT"},meridiem:function(a){return 11>a?"pagi":15>a?"siang":19>a?"sore":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Besok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kemarin pukul] LT",lastWeek:"dddd [lalu pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lalu",s:"beberapa detik",m:"semenit",mm:"%d menit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}})}),function(a){a(L)}(function(a){function b(a){return 11===a%100?!0:1===a%10?!1:!0}function c(a,c,d,e){var f=a+" ";switch(d){case"s":return c||e?"nokkrar sekúndur":"nokkrum sekúndum";case"m":return c?"mínúta":"mínútu";case"mm":return b(a)?f+(c||e?"mínútur":"mínútum"):c?f+"mínúta":f+"mínútu";case"hh":return b(a)?f+(c||e?"klukkustundir":"klukkustundum"):f+"klukkustund";case"d":return c?"dagur":e?"dag":"degi";case"dd":return b(a)?c?f+"dagar":f+(e?"daga":"dögum"):c?f+"dagur":f+(e?"dag":"degi");case"M":return c?"mánuður":e?"mánuð":"mánuði";case"MM":return b(a)?c?f+"mánuðir":f+(e?"mánuði":"mánuðum"):c?f+"mánuður":f+(e?"mánuð":"mánuði");case"y":return c||e?"ár":"ári";case"yy":return b(a)?f+(c||e?"ár":"árum"):f+(c||e?"ár":"ári")}}a.lang("is",{months:"janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),monthsShort:"jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),weekdays:"sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),weekdaysShort:"sun_mán_þri_mið_fim_fös_lau".split("_"),weekdaysMin:"Su_Má_Þr_Mi_Fi_Fö_La".split("_"),longDateFormat:{LT:"H:mm",L:"DD/MM/YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] LT",LLLL:"dddd, D. MMMM YYYY [kl.] LT"},calendar:{sameDay:"[í dag kl.] LT",nextDay:"[á morgun kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[í gær kl.] LT",lastWeek:"[síðasta] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"eftir %s",past:"fyrir %s síðan",s:c,m:c,mm:c,h:"klukkustund",hh:c,d:c,dd:c,M:c,MM:c,y:c,yy:c},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){a.lang("it",{months:"Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settembre_Ottobre_Novembre_Dicembre".split("_"),monthsShort:"Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic".split("_"),weekdays:"Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split("_"),weekdaysShort:"Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),weekdaysMin:"D_L_Ma_Me_G_V_S".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Oggi alle] LT",nextDay:"[Domani alle] LT",nextWeek:"dddd [alle] LT",lastDay:"[Ieri alle] LT",lastWeek:"[lo scorso] dddd [alle] LT",sameElse:"L"},relativeTime:{future:function(a){return(/^[0-9].+$/.test(a)?"tra":"in")+" "+a},past:"%s fa",s:"secondi",m:"un minuto",mm:"%d minuti",h:"un'ora",hh:"%d ore",d:"un giorno",dd:"%d giorni",M:"un mese",MM:"%d mesi",y:"un anno",yy:"%d anni"},ordinal:"%dº",week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){a.lang("ja",{months:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),weekdaysShort:"日_月_火_水_木_金_土".split("_"),weekdaysMin:"日_月_火_水_木_金_土".split("_"),longDateFormat:{LT:"Ah時m分",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日LT",LLLL:"YYYY年M月D日LT dddd"},meridiem:function(a){return 12>a?"午前":"午後"},calendar:{sameDay:"[今日] LT",nextDay:"[明日] LT",nextWeek:"[来週]dddd LT",lastDay:"[昨日] LT",lastWeek:"[前週]dddd LT",sameElse:"L"},relativeTime:{future:"%s後",past:"%s前",s:"数秒",m:"1分",mm:"%d分",h:"1時間",hh:"%d時間",d:"1日",dd:"%d日",M:"1ヶ月",MM:"%dヶ月",y:"1年",yy:"%d年"}})}),function(a){a(L)}(function(a){function b(a,b){var c={nominative:"იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"),accusative:"იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს".split("_")},d=/D[oD] *MMMM?/.test(b)?"accusative":"nominative";return c[d][a.month()]}function c(a,b){var c={nominative:"კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),accusative:"კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split("_")},d=/(წინა|შემდეგ)/.test(b)?"accusative":"nominative";return c[d][a.day()]}a.lang("ka",{months:b,monthsShort:"იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),weekdays:c,weekdaysShort:"კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),weekdaysMin:"კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),longDateFormat:{LT:"h:mm A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[დღეს] LT[-ზე]",nextDay:"[ხვალ] LT[-ზე]",lastDay:"[გუშინ] LT[-ზე]",nextWeek:"[შემდეგ] dddd LT[-ზე]",lastWeek:"[წინა] dddd LT-ზე",sameElse:"L"},relativeTime:{future:function(a){return/(წამი|წუთი|საათი|წელი)/.test(a)?a.replace(/ი$/,"ში"):a+"ში"},past:function(a){return/(წამი|წუთი|საათი|დღე|თვე)/.test(a)?a.replace(/(ი|ე)$/,"ის წინ"):/წელი/.test(a)?a.replace(/წელი$/,"წლის წინ"):void 0},s:"რამდენიმე წამი",m:"წუთი",mm:"%d წუთი",h:"საათი",hh:"%d საათი",d:"დღე",dd:"%d დღე",M:"თვე",MM:"%d თვე",y:"წელი",yy:"%d წელი"},ordinal:function(a){return 0===a?a:1===a?a+"-ლი":20>a||100>=a&&0===a%20||0===a%100?"მე-"+a:a+"-ე"},week:{dow:1,doy:7}})}),function(a){a(L)}(function(a){a.lang("ko",{months:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),monthsShort:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),weekdays:"일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),weekdaysShort:"일_월_화_수_목_금_토".split("_"),weekdaysMin:"일_월_화_수_목_금_토".split("_"),longDateFormat:{LT:"A h시 mm분",L:"YYYY.MM.DD",LL:"YYYY년 MMMM D일",LLL:"YYYY년 MMMM D일 LT",LLLL:"YYYY년 MMMM D일 dddd LT"},meridiem:function(a){return 12>a?"오전":"오후"},calendar:{sameDay:"오늘 LT",nextDay:"내일 LT",nextWeek:"dddd LT",lastDay:"어제 LT",lastWeek:"지난주 dddd LT",sameElse:"L"},relativeTime:{future:"%s 후",past:"%s 전",s:"몇초",ss:"%d초",m:"일분",mm:"%d분",h:"한시간",hh:"%d시간",d:"하루",dd:"%d일",M:"한달",MM:"%d달",y:"일년",yy:"%d년"},ordinal:"%d일"})}),function(a){a(L)}(function(a){function b(a,b,c){var d=a.split("_");return c?1===b%10&&11!==b?d[2]:d[3]:1===b%10&&11!==b?d[0]:d[1]}function c(a,c,e){return a+" "+b(d[e],a,c)}var d={mm:"minūti_minūtes_minūte_minūtes",hh:"stundu_stundas_stunda_stundas",dd:"dienu_dienas_diena_dienas",MM:"mēnesi_mēnešus_mēnesis_mēneši",yy:"gadu_gadus_gads_gadi"};a.lang("lv",{months:"janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"),monthsShort:"jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),weekdays:"svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"),weekdaysShort:"Sv_P_O_T_C_Pk_S".split("_"),weekdaysMin:"Sv_P_O_T_C_Pk_S".split("_"),longDateFormat:{LT:"HH:mm",L:"DD.MM.YYYY",LL:"YYYY. [gada] D. MMMM",LLL:"YYYY. [gada] D. MMMM, LT",LLLL:"YYYY. [gada] D. MMMM, dddd, LT"},calendar:{sameDay:"[Šodien pulksten] LT",nextDay:"[Rīt pulksten] LT",nextWeek:"dddd [pulksten] LT",lastDay:"[Vakar pulksten] LT",lastWeek:"[Pagājušā] dddd [pulksten] LT",sameElse:"L"},relativeTime:{future:"%s vēlāk",past:"%s agrāk",s:"dažas sekundes",m:"minūti",mm:c,h:"stundu",hh:c,d:"dienu",dd:c,M:"mēnesi",MM:c,y:"gadu",yy:c},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){a.lang("ml",{months:"ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"),monthsShort:"ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"),weekdays:"ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"),weekdaysShort:"ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"),weekdaysMin:"ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"),longDateFormat:{LT:"A h:mm -നു",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, LT",LLLL:"dddd, D MMMM YYYY, LT"},calendar:{sameDay:"[ഇന്ന്] LT",nextDay:"[നാളെ] LT",nextWeek:"dddd, LT",lastDay:"[ഇന്നലെ] LT",lastWeek:"[കഴിഞ്ഞ] dddd, LT",sameElse:"L"},relativeTime:{future:"%s കഴിഞ്ഞ്",past:"%s മുൻപ്",s:"അൽപ നിമിഷങ്ങൾ",m:"ഒരു മിനിറ്റ്",mm:"%d മിനിറ്റ്",h:"ഒരു മണിക്കൂർ",hh:"%d മണിക്കൂർ",d:"ഒരു ദിവസം",dd:"%d ദിവസം",M:"ഒരു മാസം",MM:"%d മാസം",y:"ഒരു വർഷം",yy:"%d വർഷം"},meridiem:function(a){return 4>a?"രാത്രി":12>a?"രാവിലെ":17>a?"ഉച്ച കഴിഞ്ഞ്":20>a?"വൈകുന്നേരം":"രാത്രി"}})}),function(a){a(L)}(function(a){var b={1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"},c={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"};a.lang("mr",{months:"जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"),monthsShort:"जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"),weekdays:"रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),weekdaysShort:"रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"),weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),longDateFormat:{LT:"A h:mm वाजता",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, LT",LLLL:"dddd, D MMMM YYYY, LT"},calendar:{sameDay:"[आज] LT",nextDay:"[उद्या] LT",nextWeek:"dddd, LT",lastDay:"[काल] LT",lastWeek:"[मागील] dddd, LT",sameElse:"L"},relativeTime:{future:"%s नंतर",past:"%s पूर्वी",s:"सेकंद",m:"एक मिनिट",mm:"%d मिनिटे",h:"एक तास",hh:"%d तास",d:"एक दिवस",dd:"%d दिवस",M:"एक महिना",MM:"%d महिने",y:"एक वर्ष",yy:"%d वर्षे"},preparse:function(a){return a.replace(/[१२३४५६७८९०]/g,function(a){return c[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return b[a]})},meridiem:function(a){return 4>a?"रात्री":10>a?"सकाळी":17>a?"दुपारी":20>a?"सायंकाळी":"रात्री"},week:{dow:0,doy:6}})}),function(a){a(L)}(function(a){a.lang("ms-my",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] LT",LLLL:"dddd, D MMMM YYYY [pukul] LT"},meridiem:function(a){return 11>a?"pagi":15>a?"tengahari":19>a?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}})}),function(a){a(L)}(function(a){a.lang("nb",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"sø._ma._ti._on._to._fr._lø.".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),longDateFormat:{LT:"H.mm",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] LT",LLLL:"dddd D. MMMM YYYY [kl.] LT"},calendar:{sameDay:"[i dag kl.] LT",nextDay:"[i morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[i går kl.] LT",lastWeek:"[forrige] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"for %s siden",s:"noen sekunder",m:"ett minutt",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dager",M:"en måned",MM:"%d måneder",y:"ett år",yy:"%d år"},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){var b={1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"},c={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"};a.lang("ne",{months:"जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"),monthsShort:"जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"),weekdays:"आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"),weekdaysShort:"आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),weekdaysMin:"आइ._सो._मङ्_बु._बि._शु._श.".split("_"),longDateFormat:{LT:"Aको h:mm बजे",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, LT",LLLL:"dddd, D MMMM YYYY, LT"},preparse:function(a){return a.replace(/[१२३४५६७८९०]/g,function(a){return c[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return b[a]})},meridiem:function(a){return 3>a?"राती":10>a?"बिहान":15>a?"दिउँसो":18>a?"बेलुका":20>a?"साँझ":"राती"},calendar:{sameDay:"[आज] LT",nextDay:"[भोली] LT",nextWeek:"[आउँदो] dddd[,] LT",lastDay:"[हिजो] LT",lastWeek:"[गएको] dddd[,] LT",sameElse:"L"},relativeTime:{future:"%sमा",past:"%s अगाडी",s:"केही समय",m:"एक मिनेट",mm:"%d मिनेट",h:"एक घण्टा",hh:"%d घण्टा",d:"एक दिन",dd:"%d दिन",M:"एक महिना",MM:"%d महिना",y:"एक बर्ष",yy:"%d बर्ष"},week:{dow:1,doy:7}})}),function(a){a(L)}(function(a){var b="jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),c="jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_");a.lang("nl",{months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),monthsShort:function(a,d){return/-MMM-/.test(d)?c[a.month()]:b[a.month()]},weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"),weekdaysMin:"Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),longDateFormat:{LT:"HH:mm",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[Vandaag om] LT",nextDay:"[Morgen om] LT",nextWeek:"dddd [om] LT",lastDay:"[Gisteren om] LT",lastWeek:"[afgelopen] dddd [om] LT",sameElse:"L"},relativeTime:{future:"over %s",past:"%s geleden",s:"een paar seconden",m:"één minuut",mm:"%d minuten",h:"één uur",hh:"%d uur",d:"één dag",dd:"%d dagen",M:"één maand",MM:"%d maanden",y:"één jaar",yy:"%d jaar"},ordinal:function(a){return a+(1===a||8===a||a>=20?"ste":"de")},week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){a.lang("nn",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),weekdaysShort:"sun_mån_tys_ons_tor_fre_lau".split("_"),weekdaysMin:"su_må_ty_on_to_fr_lø".split("_"),longDateFormat:{LT:"HH:mm",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[I dag klokka] LT",nextDay:"[I morgon klokka] LT",nextWeek:"dddd [klokka] LT",lastDay:"[I går klokka] LT",lastWeek:"[Føregående] dddd [klokka] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"for %s siden",s:"noen sekund",m:"ett minutt",mm:"%d minutt",h:"en time",hh:"%d timar",d:"en dag",dd:"%d dagar",M:"en månad",MM:"%d månader",y:"ett år",yy:"%d år"},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){function b(a){return 5>a%10&&a%10>1&&1!==~~(a/10)}function c(a,c,d){var e=a+" ";switch(d){case"m":return c?"minuta":"minutę";case"mm":return e+(b(a)?"minuty":"minut");case"h":return c?"godzina":"godzinę";case"hh":return e+(b(a)?"godziny":"godzin");case"MM":return e+(b(a)?"miesiące":"miesięcy");case"yy":return e+(b(a)?"lata":"lat")}}var d="styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),e="stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_");a.lang("pl",{months:function(a,b){return/D MMMM/.test(b)?e[a.month()]:d[a.month()]},monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),weekdays:"niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),weekdaysShort:"nie_pon_wt_śr_czw_pt_sb".split("_"),weekdaysMin:"N_Pn_Wt_Śr_Cz_Pt_So".split("_"),longDateFormat:{LT:"HH:mm",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Dziś o] LT",nextDay:"[Jutro o] LT",nextWeek:"[W] dddd [o] LT",lastDay:"[Wczoraj o] LT",lastWeek:function(){switch(this.day()){case 0:return"[W zeszłą niedzielę o] LT";
case 3:return"[W zeszłą środę o] LT";case 6:return"[W zeszłą sobotę o] LT";default:return"[W zeszły] dddd [o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"%s temu",s:"kilka sekund",m:c,mm:c,h:c,hh:c,d:"1 dzień",dd:"%d dni",M:"miesiąc",MM:c,y:"rok",yy:c},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){a.lang("pt-br",{months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),weekdaysMin:"Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY LT",LLLL:"dddd, D [de] MMMM [de] YYYY LT"},calendar:{sameDay:"[Hoje às] LT",nextDay:"[Amanhã às] LT",nextWeek:"dddd [às] LT",lastDay:"[Ontem às] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[Último] dddd [às] LT":"[Última] dddd [às] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"%s atrás",s:"segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinal:"%dº"})}),function(a){a(L)}(function(a){a.lang("pt",{months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),weekdaysMin:"Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY LT",LLLL:"dddd, D [de] MMMM [de] YYYY LT"},calendar:{sameDay:"[Hoje às] LT",nextDay:"[Amanhã às] LT",nextWeek:"dddd [às] LT",lastDay:"[Ontem às] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[Último] dddd [às] LT":"[Última] dddd [às] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"%s atrás",s:"segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinal:"%dº",week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){a.lang("ro",{months:"Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie".split("_"),monthsShort:"Ian_Feb_Mar_Apr_Mai_Iun_Iul_Aug_Sep_Oct_Noi_Dec".split("_"),weekdays:"Duminică_Luni_Marţi_Miercuri_Joi_Vineri_Sâmbătă".split("_"),weekdaysShort:"Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),weekdaysMin:"Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),longDateFormat:{LT:"H:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[azi la] LT",nextDay:"[mâine la] LT",nextWeek:"dddd [la] LT",lastDay:"[ieri la] LT",lastWeek:"[fosta] dddd [la] LT",sameElse:"L"},relativeTime:{future:"peste %s",past:"%s în urmă",s:"câteva secunde",m:"un minut",mm:"%d minute",h:"o oră",hh:"%d ore",d:"o zi",dd:"%d zile",M:"o lună",MM:"%d luni",y:"un an",yy:"%d ani"},week:{dow:1,doy:7}})}),function(a){a(L)}(function(a){function b(a,b){var c=a.split("_");return 1===b%10&&11!==b%100?c[0]:b%10>=2&&4>=b%10&&(10>b%100||b%100>=20)?c[1]:c[2]}function c(a,c,d){var e={mm:"минута_минуты_минут",hh:"час_часа_часов",dd:"день_дня_дней",MM:"месяц_месяца_месяцев",yy:"год_года_лет"};return"m"===d?c?"минута":"минуту":a+" "+b(e[d],+a)}function d(a,b){var c={nominative:"январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),accusative:"января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_")},d=/D[oD]? *MMMM?/.test(b)?"accusative":"nominative";return c[d][a.month()]}function e(a,b){var c={nominative:"янв_фев_мар_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),accusative:"янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек".split("_")},d=/D[oD]? *MMMM?/.test(b)?"accusative":"nominative";return c[d][a.month()]}function f(a,b){var c={nominative:"воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),accusative:"воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_")},d=/\[ ?[Вв] ?(?:прошлую|следующую)? ?\] ?dddd/.test(b)?"accusative":"nominative";return c[d][a.day()]}a.lang("ru",{months:d,monthsShort:e,weekdays:f,weekdaysShort:"вск_пнд_втр_срд_чтв_птн_сбт".split("_"),weekdaysMin:"вс_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"HH:mm",L:"DD.MM.YYYY",LL:"D MMMM YYYY г.",LLL:"D MMMM YYYY г., LT",LLLL:"dddd, D MMMM YYYY г., LT"},calendar:{sameDay:"[Сегодня в] LT",nextDay:"[Завтра в] LT",lastDay:"[Вчера в] LT",nextWeek:function(){return 2===this.day()?"[Во] dddd [в] LT":"[В] dddd [в] LT"},lastWeek:function(){switch(this.day()){case 0:return"[В прошлое] dddd [в] LT";case 1:case 2:case 4:return"[В прошлый] dddd [в] LT";case 3:case 5:case 6:return"[В прошлую] dddd [в] LT"}},sameElse:"L"},relativeTime:{future:"через %s",past:"%s назад",s:"несколько секунд",m:c,mm:c,h:"час",hh:c,d:"день",dd:c,M:"месяц",MM:c,y:"год",yy:c},ordinal:function(a,b){switch(b){case"M":case"d":case"DDD":return a+"-й";case"D":return a+"-го";case"w":case"W":return a+"-я";default:return a}},week:{dow:1,doy:7}})}),function(a){a(L)}(function(a){function b(a){return a>1&&5>a}function c(a,c,d,e){var f=a+" ";switch(d){case"s":return c||e?"pár sekúnd":"pár sekundami";case"m":return c?"minúta":e?"minútu":"minútou";case"mm":return c||e?f+(b(a)?"minúty":"minút"):f+"minútami";break;case"h":return c?"hodina":e?"hodinu":"hodinou";case"hh":return c||e?f+(b(a)?"hodiny":"hodín"):f+"hodinami";break;case"d":return c||e?"deň":"dňom";case"dd":return c||e?f+(b(a)?"dni":"dní"):f+"dňami";break;case"M":return c||e?"mesiac":"mesiacom";case"MM":return c||e?f+(b(a)?"mesiace":"mesiacov"):f+"mesiacmi";break;case"y":return c||e?"rok":"rokom";case"yy":return c||e?f+(b(a)?"roky":"rokov"):f+"rokmi"}}var d="január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"),e="jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_");a.lang("sk",{months:d,monthsShort:e,monthsParse:function(a,b){var c,d=[];for(c=0;12>c;c++)d[c]=new RegExp("^"+a[c]+"$|^"+b[c]+"$","i");return d}(d,e),weekdays:"nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),weekdaysShort:"ne_po_ut_st_št_pi_so".split("_"),weekdaysMin:"ne_po_ut_st_št_pi_so".split("_"),longDateFormat:{LT:"H:mm",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd D. MMMM YYYY LT"},calendar:{sameDay:"[dnes o] LT",nextDay:"[zajtra o] LT",nextWeek:function(){switch(this.day()){case 0:return"[v nedeľu o] LT";case 1:case 2:return"[v] dddd [o] LT";case 3:return"[v stredu o] LT";case 4:return"[vo štvrtok o] LT";case 5:return"[v piatok o] LT";case 6:return"[v sobotu o] LT"}},lastDay:"[včera o] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulú nedeľu o] LT";case 1:case 2:return"[minulý] dddd [o] LT";case 3:return"[minulú stredu o] LT";case 4:case 5:return"[minulý] dddd [o] LT";case 6:return"[minulú sobotu o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"pred %s",s:c,m:c,mm:c,h:c,hh:c,d:c,dd:c,M:c,MM:c,y:c,yy:c},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){function b(a,b,c){var d=a+" ";switch(c){case"m":return b?"ena minuta":"eno minuto";case"mm":return d+=1===a?"minuta":2===a?"minuti":3===a||4===a?"minute":"minut";case"h":return b?"ena ura":"eno uro";case"hh":return d+=1===a?"ura":2===a?"uri":3===a||4===a?"ure":"ur";case"dd":return d+=1===a?"dan":"dni";case"MM":return d+=1===a?"mesec":2===a?"meseca":3===a||4===a?"mesece":"mesecev";case"yy":return d+=1===a?"leto":2===a?"leti":3===a||4===a?"leta":"let"}}a.lang("sl",{months:"januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),weekdays:"nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),weekdaysShort:"ned._pon._tor._sre._čet._pet._sob.".split("_"),weekdaysMin:"ne_po_to_sr_če_pe_so".split("_"),longDateFormat:{LT:"H:mm",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[danes ob] LT",nextDay:"[jutri ob] LT",nextWeek:function(){switch(this.day()){case 0:return"[v] [nedeljo] [ob] LT";case 3:return"[v] [sredo] [ob] LT";case 6:return"[v] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[v] dddd [ob] LT"}},lastDay:"[včeraj ob] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[prejšnja] dddd [ob] LT";case 1:case 2:case 4:case 5:return"[prejšnji] dddd [ob] LT"}},sameElse:"L"},relativeTime:{future:"čez %s",past:"%s nazaj",s:"nekaj sekund",m:b,mm:b,h:b,hh:b,d:"en dan",dd:b,M:"en mesec",MM:b,y:"eno leto",yy:b},ordinal:"%d.",week:{dow:1,doy:7}})}),function(a){a(L)}(function(a){a.lang("sq",{months:"Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),monthsShort:"Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),weekdays:"E Diel_E Hënë_E Marte_E Mërkure_E Enjte_E Premte_E Shtunë".split("_"),weekdaysShort:"Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),weekdaysMin:"D_H_Ma_Më_E_P_Sh".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Sot në] LT",nextDay:"[Neser në] LT",nextWeek:"dddd [në] LT",lastDay:"[Dje në] LT",lastWeek:"dddd [e kaluar në] LT",sameElse:"L"},relativeTime:{future:"në %s",past:"%s me parë",s:"disa seconda",m:"një minut",mm:"%d minutea",h:"një orë",hh:"%d orë",d:"një ditë",dd:"%d ditë",M:"një muaj",MM:"%d muaj",y:"një vit",yy:"%d vite"},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){a.lang("sv",{months:"januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),weekdaysShort:"sön_mån_tis_ons_tor_fre_lör".split("_"),weekdaysMin:"sö_må_ti_on_to_fr_lö".split("_"),longDateFormat:{LT:"HH:mm",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[Idag] LT",nextDay:"[Imorgon] LT",lastDay:"[Igår] LT",nextWeek:"dddd LT",lastWeek:"[Förra] dddd[en] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"för %s sedan",s:"några sekunder",m:"en minut",mm:"%d minuter",h:"en timme",hh:"%d timmar",d:"en dag",dd:"%d dagar",M:"en månad",MM:"%d månader",y:"ett år",yy:"%d år"},ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"e":1===b?"a":2===b?"a":3===b?"e":"e";return a+c},week:{dow:1,doy:4}})}),function(a){a(L)}(function(a){a.lang("th",{months:"มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),monthsShort:"มกรา_กุมภา_มีนา_เมษา_พฤษภา_มิถุนา_กรกฎา_สิงหา_กันยา_ตุลา_พฤศจิกา_ธันวา".split("_"),weekdays:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),weekdaysShort:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"),weekdaysMin:"อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),longDateFormat:{LT:"H นาฬิกา m นาที",L:"YYYY/MM/DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY เวลา LT",LLLL:"วันddddที่ D MMMM YYYY เวลา LT"},meridiem:function(a){return 12>a?"ก่อนเที่ยง":"หลังเที่ยง"},calendar:{sameDay:"[วันนี้ เวลา] LT",nextDay:"[พรุ่งนี้ เวลา] LT",nextWeek:"dddd[หน้า เวลา] LT",lastDay:"[เมื่อวานนี้ เวลา] LT",lastWeek:"[วัน]dddd[ที่แล้ว เวลา] LT",sameElse:"L"},relativeTime:{future:"อีก %s",past:"%sที่แล้ว",s:"ไม่กี่วินาที",m:"1 นาที",mm:"%d นาที",h:"1 ชั่วโมง",hh:"%d ชั่วโมง",d:"1 วัน",dd:"%d วัน",M:"1 เดือน",MM:"%d เดือน",y:"1 ปี",yy:"%d ปี"}})}),function(a){a(L)}(function(a){var b={1:"'inci",5:"'inci",8:"'inci",70:"'inci",80:"'inci",2:"'nci",7:"'nci",20:"'nci",50:"'nci",3:"'üncü",4:"'üncü",100:"'üncü",6:"'ncı",9:"'uncu",10:"'uncu",30:"'uncu",60:"'ıncı",90:"'ıncı"};a.lang("tr",{months:"Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),monthsShort:"Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),weekdays:"Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),weekdaysShort:"Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),weekdaysMin:"Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),longDateFormat:{LT:"HH:mm",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[bugün saat] LT",nextDay:"[yarın saat] LT",nextWeek:"[haftaya] dddd [saat] LT",lastDay:"[dün] LT",lastWeek:"[geçen hafta] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s önce",s:"birkaç saniye",m:"bir dakika",mm:"%d dakika",h:"bir saat",hh:"%d saat",d:"bir gün",dd:"%d gün",M:"bir ay",MM:"%d ay",y:"bir yıl",yy:"%d yıl"},ordinal:function(a){if(0===a)return a+"'ıncı";var c=a%10,d=a%100-c,e=a>=100?100:null;return a+(b[c]||b[d]||b[e])},week:{dow:1,doy:7}})}),function(a){a(L)}(function(a){a.lang("tzm-la",{months:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),monthsShort:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),weekdays:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),weekdaysShort:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),weekdaysMin:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[asdkh g] LT",nextDay:"[aska g] LT",nextWeek:"dddd [g] LT",lastDay:"[assant g] LT",lastWeek:"dddd [g] LT",sameElse:"L"},relativeTime:{future:"dadkh s yan %s",past:"yan %s",s:"imik",m:"minuḍ",mm:"%d minuḍ",h:"saɛa",hh:"%d tassaɛin",d:"ass",dd:"%d ossan",M:"ayowr",MM:"%d iyyirn",y:"asgas",yy:"%d isgasn"},week:{dow:6,doy:12}})}),function(a){a(L)}(function(a){a.lang("tzm",{months:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),monthsShort:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),weekdays:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),weekdaysShort:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),weekdaysMin:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[ⴰⵙⴷⵅ ⴴ] LT",nextDay:"[ⴰⵙⴽⴰ ⴴ] LT",nextWeek:"dddd [ⴴ] LT",lastDay:"[ⴰⵚⴰⵏⵜ ⴴ] LT",lastWeek:"dddd [ⴴ] LT",sameElse:"L"},relativeTime:{future:"ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",past:"ⵢⴰⵏ %s",s:"ⵉⵎⵉⴽ",m:"ⵎⵉⵏⵓⴺ",mm:"%d ⵎⵉⵏⵓⴺ",h:"ⵙⴰⵄⴰ",hh:"%d ⵜⴰⵙⵙⴰⵄⵉⵏ",d:"ⴰⵙⵙ",dd:"%d oⵙⵙⴰⵏ",M:"ⴰⵢoⵓⵔ",MM:"%d ⵉⵢⵢⵉⵔⵏ",y:"ⴰⵙⴳⴰⵙ",yy:"%d ⵉⵙⴳⴰⵙⵏ"},week:{dow:6,doy:12}})}),function(a){a(L)}(function(a){function b(a,b){var c=a.split("_");return 1===b%10&&11!==b%100?c[0]:b%10>=2&&4>=b%10&&(10>b%100||b%100>=20)?c[1]:c[2]}function c(a,c,d){var e={mm:"хвилина_хвилини_хвилин",hh:"година_години_годин",dd:"день_дні_днів",MM:"місяць_місяці_місяців",yy:"рік_роки_років"};return"m"===d?c?"хвилина":"хвилину":"h"===d?c?"година":"годину":a+" "+b(e[d],+a)}function d(a,b){var c={nominative:"січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_"),accusative:"січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_")},d=/D[oD]? *MMMM?/.test(b)?"accusative":"nominative";return c[d][a.month()]}function e(a,b){var c={nominative:"неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),accusative:"неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),genitive:"неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")},d=/(\[[ВвУу]\]) ?dddd/.test(b)?"accusative":/\[?(?:минулої|наступної)? ?\] ?dddd/.test(b)?"genitive":"nominative";return c[d][a.day()]}function f(a){return function(){return a+"о"+(11===this.hours()?"б":"")+"] LT"}}a.lang("uk",{months:d,monthsShort:"січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),weekdays:e,weekdaysShort:"нед_пон_вів_сер_чет_п’ят_суб".split("_"),weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"HH:mm",L:"DD.MM.YYYY",LL:"D MMMM YYYY р.",LLL:"D MMMM YYYY р., LT",LLLL:"dddd, D MMMM YYYY р., LT"},calendar:{sameDay:f("[Сьогодні "),nextDay:f("[Завтра "),lastDay:f("[Вчора "),nextWeek:f("[У] dddd ["),lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return f("[Минулої] dddd [").call(this);case 1:case 2:case 4:return f("[Минулого] dddd [").call(this)}},sameElse:"L"},relativeTime:{future:"за %s",past:"%s тому",s:"декілька секунд",m:c,mm:c,h:"годину",hh:c,d:"день",dd:c,M:"місяць",MM:c,y:"рік",yy:c},ordinal:function(a,b){switch(b){case"M":case"d":case"DDD":case"w":case"W":return a+"-й";case"D":return a+"-го";default:return a}},week:{dow:1,doy:7}})}),function(a){a(L)}(function(a){a.lang("zh-cn",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"Ah点mm",L:"YYYY年MMMD日",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日LT",LLLL:"YYYY年MMMD日ddddLT",l:"YYYY年MMMD日",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日LT",llll:"YYYY年MMMD日ddddLT"},meridiem:function(a,b){return 9>a?"早上":11>a&&30>b?"上午":13>a&&30>b?"中午":18>a?"下午":"晚上"},calendar:{sameDay:"[今天]LT",nextDay:"[明天]LT",nextWeek:"[下]ddddLT",lastDay:"[昨天]LT",lastWeek:"[上]ddddLT",sameElse:"L"},ordinal:function(a,b){switch(b){case"d":case"D":case"DDD":return a+"日";case"M":return a+"月";case"w":case"W":return a+"周";default:return a}},relativeTime:{future:"%s内",past:"%s前",s:"几秒",m:"1分钟",mm:"%d分钟",h:"1小时",hh:"%d小时",d:"1天",dd:"%d天",M:"1个月",MM:"%d个月",y:"1年",yy:"%d年"}})}),function(a){a(L)}(function(a){a.lang("zh-tw",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"Ah點mm",L:"YYYY年MMMD日",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日LT",LLLL:"YYYY年MMMD日ddddLT",l:"YYYY年MMMD日",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日LT",llll:"YYYY年MMMD日ddddLT"},meridiem:function(a,b){return 9>a?"早上":11>a&&30>b?"上午":13>a&&30>b?"中午":18>a?"下午":"晚上"},calendar:{sameDay:"[今天]LT",nextDay:"[明天]LT",nextWeek:"[下]ddddLT",lastDay:"[昨天]LT",lastWeek:"[上]ddddLT",sameElse:"L"},ordinal:function(a,b){switch(b){case"d":case"D":case"DDD":return a+"日";case"M":return a+"月";case"w":case"W":return a+"週";default:return a}},relativeTime:{future:"%s內",past:"%s前",s:"幾秒",m:"一分鐘",mm:"%d分鐘",h:"一小時",hh:"%d小時",d:"一天",dd:"%d天",M:"一個月",MM:"%d個月",y:"一年",yy:"%d年"}})}),L.lang("en"),Q&&(module.exports=L),"undefined"==typeof ender&&(this.moment=L),"function"==typeof define&&define.amd&&define("moment",[],function(){return L})}).call(this);
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['d3'], function (d3) {
            return (root.Rickshaw = factory(d3));
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(require('d3'));
    } else {
        root.Rickshaw = factory(d3);
    }
}(this, function (d3) {
/* jshint -W079 */ 

var Rickshaw = {

	namespace: function(namespace, obj) {

		var parts = namespace.split('.');

		var parent = Rickshaw;

		for(var i = 1, length = parts.length; i < length; i++) {
			var currentPart = parts[i];
			parent[currentPart] = parent[currentPart] || {};
			parent = parent[currentPart];
		}
		return parent;
	},

	keys: function(obj) {
		var keys = [];
		for (var key in obj) keys.push(key);
		return keys;
	},

	extend: function(destination, source) {

		for (var property in source) {
			destination[property] = source[property];
		}
		return destination;
	},

	clone: function(obj) {
		return JSON.parse(JSON.stringify(obj));
	}
};
/* Adapted from https://github.com/Jakobo/PTClass */

/*
Copyright (c) 2005-2010 Sam Stephenson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/* Based on Alex Arnell's inheritance implementation. */
/** section: Language
 * class Class
 *
 *  Manages Prototype's class-based OOP system.
 *
 *  Refer to Prototype's web site for a [tutorial on classes and
 *  inheritance](http://prototypejs.org/learn/class-inheritance).
**/
(function(globalContext) {
/* ------------------------------------ */
/* Import from object.js                */
/* ------------------------------------ */
var _toString = Object.prototype.toString,
    NULL_TYPE = 'Null',
    UNDEFINED_TYPE = 'Undefined',
    BOOLEAN_TYPE = 'Boolean',
    NUMBER_TYPE = 'Number',
    STRING_TYPE = 'String',
    OBJECT_TYPE = 'Object',
    FUNCTION_CLASS = '[object Function]';
function isFunction(object) {
  return _toString.call(object) === FUNCTION_CLASS;
}
function extend(destination, source) {
  for (var property in source) if (source.hasOwnProperty(property)) // modify protect primitive slaughter
    destination[property] = source[property];
  return destination;
}
function keys(object) {
  if (Type(object) !== OBJECT_TYPE) { throw new TypeError(); }
  var results = [];
  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      results.push(property);
    }
  }
  return results;
}
function Type(o) {
  switch(o) {
    case null: return NULL_TYPE;
    case (void 0): return UNDEFINED_TYPE;
  }
  var type = typeof o;
  switch(type) {
    case 'boolean': return BOOLEAN_TYPE;
    case 'number':  return NUMBER_TYPE;
    case 'string':  return STRING_TYPE;
  }
  return OBJECT_TYPE;
}
function isUndefined(object) {
  return typeof object === "undefined";
}
/* ------------------------------------ */
/* Import from Function.js              */
/* ------------------------------------ */
var slice = Array.prototype.slice;
function argumentNames(fn) {
  var names = fn.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
    .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
    .replace(/\s+/g, '').split(',');
  return names.length == 1 && !names[0] ? [] : names;
}
function wrap(fn, wrapper) {
  var __method = fn;
  return function() {
    var a = update([bind(__method, this)], arguments);
    return wrapper.apply(this, a);
  }
}
function update(array, args) {
  var arrayLength = array.length, length = args.length;
  while (length--) array[arrayLength + length] = args[length];
  return array;
}
function merge(array, args) {
  array = slice.call(array, 0);
  return update(array, args);
}
function bind(fn, context) {
  if (arguments.length < 2 && isUndefined(arguments[0])) return this;
  var __method = fn, args = slice.call(arguments, 2);
  return function() {
    var a = merge(args, arguments);
    return __method.apply(context, a);
  }
}

/* ------------------------------------ */
/* Import from Prototype.js             */
/* ------------------------------------ */
var emptyFunction = function(){};

var Class = (function() {
  
  // Some versions of JScript fail to enumerate over properties, names of which 
  // correspond to non-enumerable properties in the prototype chain
  var IS_DONTENUM_BUGGY = (function(){
    for (var p in { toString: 1 }) {
      // check actual property name, so that it works with augmented Object.prototype
      if (p === 'toString') return false;
    }
    return true;
  })();
  
  function subclass() {};
  function create() {
    var parent = null, properties = [].slice.apply(arguments);
    if (isFunction(properties[0]))
      parent = properties.shift();

    function klass() {
      this.initialize.apply(this, arguments);
    }

    extend(klass, Class.Methods);
    klass.superclass = parent;
    klass.subclasses = [];

    if (parent) {
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
      try { parent.subclasses.push(klass) } catch(e) {}
    }

    for (var i = 0, length = properties.length; i < length; i++)
      klass.addMethods(properties[i]);

    if (!klass.prototype.initialize)
      klass.prototype.initialize = emptyFunction;

    klass.prototype.constructor = klass;
    return klass;
  }

  function addMethods(source) {
    var ancestor   = this.superclass && this.superclass.prototype,
        properties = keys(source);

    // IE6 doesn't enumerate `toString` and `valueOf` (among other built-in `Object.prototype`) properties,
    // Force copy if they're not Object.prototype ones.
    // Do not copy other Object.prototype.* for performance reasons
    if (IS_DONTENUM_BUGGY) {
      if (source.toString != Object.prototype.toString)
        properties.push("toString");
      if (source.valueOf != Object.prototype.valueOf)
        properties.push("valueOf");
    }

    for (var i = 0, length = properties.length; i < length; i++) {
      var property = properties[i], value = source[property];
      if (ancestor && isFunction(value) &&
          argumentNames(value)[0] == "$super") {
        var method = value;
        value = wrap((function(m) {
          return function() { return ancestor[m].apply(this, arguments); };
        })(property), method);

        value.valueOf = bind(method.valueOf, method);
        value.toString = bind(method.toString, method);
      }
      this.prototype[property] = value;
    }

    return this;
  }

  return {
    create: create,
    Methods: {
      addMethods: addMethods
    }
  };
})();

if (globalContext.exports) {
  globalContext.exports.Class = Class;
}
else {
  globalContext.Class = Class;
}
})(Rickshaw);
Rickshaw.namespace('Rickshaw.Compat.ClassList');

Rickshaw.Compat.ClassList = function() {

	/* adapted from http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

	if (typeof document !== "undefined" && !("classList" in document.createElement("a"))) {

	(function (view) {

	"use strict";

	var
		  classListProp = "classList"
		, protoProp = "prototype"
		, elemCtrProto = (view.HTMLElement || view.Element)[protoProp]
		, objCtr = Object
		, strTrim = String[protoProp].trim || function () {
			return this.replace(/^\s+|\s+$/g, "");
		}
		, arrIndexOf = Array[protoProp].indexOf || function (item) {
			var
				  i = 0
				, len = this.length
			;
			for (; i < len; i++) {
				if (i in this && this[i] === item) {
					return i;
				}
			}
			return -1;
		}
		// Vendors: please allow content code to instantiate DOMExceptions
		, DOMEx = function (type, message) {
			this.name = type;
			this.code = DOMException[type];
			this.message = message;
		}
		, checkTokenAndGetIndex = function (classList, token) {
			if (token === "") {
				throw new DOMEx(
					  "SYNTAX_ERR"
					, "An invalid or illegal string was specified"
				);
			}
			if (/\s/.test(token)) {
				throw new DOMEx(
					  "INVALID_CHARACTER_ERR"
					, "String contains an invalid character"
				);
			}
			return arrIndexOf.call(classList, token);
		}
		, ClassList = function (elem) {
			var
				  trimmedClasses = strTrim.call(elem.className)
				, classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
				, i = 0
				, len = classes.length
			;
			for (; i < len; i++) {
				this.push(classes[i]);
			}
			this._updateClassName = function () {
				elem.className = this.toString();
			};
		}
		, classListProto = ClassList[protoProp] = []
		, classListGetter = function () {
			return new ClassList(this);
		}
	;
	// Most DOMException implementations don't allow calling DOMException's toString()
	// on non-DOMExceptions. Error's toString() is sufficient here.
	DOMEx[protoProp] = Error[protoProp];
	classListProto.item = function (i) {
		return this[i] || null;
	};
	classListProto.contains = function (token) {
		token += "";
		return checkTokenAndGetIndex(this, token) !== -1;
	};
	classListProto.add = function (token) {
		token += "";
		if (checkTokenAndGetIndex(this, token) === -1) {
			this.push(token);
			this._updateClassName();
		}
	};
	classListProto.remove = function (token) {
		token += "";
		var index = checkTokenAndGetIndex(this, token);
		if (index !== -1) {
			this.splice(index, 1);
			this._updateClassName();
		}
	};
	classListProto.toggle = function (token) {
		token += "";
		if (checkTokenAndGetIndex(this, token) === -1) {
			this.add(token);
		} else {
			this.remove(token);
		}
	};
	classListProto.toString = function () {
		return this.join(" ");
	};

	if (objCtr.defineProperty) {
		var classListPropDesc = {
			  get: classListGetter
			, enumerable: true
			, configurable: true
		};
		try {
			objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
		} catch (ex) { // IE 8 doesn't support enumerable:true
			if (ex.number === -0x7FF5EC54) {
				classListPropDesc.enumerable = false;
				objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
			}
		}
	} else if (objCtr[protoProp].__defineGetter__) {
		elemCtrProto.__defineGetter__(classListProp, classListGetter);
	}

	}(window));

	}
};

if ( (typeof RICKSHAW_NO_COMPAT !== "undefined" && !RICKSHAW_NO_COMPAT) || typeof RICKSHAW_NO_COMPAT === "undefined") {
	new Rickshaw.Compat.ClassList();
}
Rickshaw.namespace('Rickshaw.Graph');

Rickshaw.Graph = function(args) {

	var self = this;

	this.initialize = function(args) {

		if (!args.element) throw "Rickshaw.Graph needs a reference to an element";
		if (args.element.nodeType !== 1) throw "Rickshaw.Graph element was defined but not an HTML element";

		this.element = args.element;
		this.series = args.series;
		this.window = {};

		this.updateCallbacks = [];
		this.configureCallbacks = [];

		this.defaults = {
			interpolation: 'cardinal',
			offset: 'zero',
			min: undefined,
			max: undefined,
			preserve: false,
			xScale: undefined,
			yScale: undefined,
			stack: true
		};

		this._loadRenderers();
		this.configure(args);
		this.validateSeries(args.series);

		this.series.active = function() { return self.series.filter( function(s) { return !s.disabled } ) };
		this.setSize({ width: args.width, height: args.height });
		this.element.classList.add('rickshaw_graph');

		this.vis = d3.select(this.element)
			.append("svg:svg")
			.attr('width', this.width)
			.attr('height', this.height);

		this.discoverRange();
	};

	this._loadRenderers = function() {

		for (var name in Rickshaw.Graph.Renderer) {
			if (!name || !Rickshaw.Graph.Renderer.hasOwnProperty(name)) continue;
			var r = Rickshaw.Graph.Renderer[name];
			if (!r || !r.prototype || !r.prototype.render) continue;
			self.registerRenderer(new r( { graph: self } ));
		}
	};

	this.validateSeries = function(series) {

		if (!Array.isArray(series) && !(series instanceof Rickshaw.Series)) {
			var seriesSignature = Object.prototype.toString.apply(series);
			throw "series is not an array: " + seriesSignature;
		}

		var pointsCount;

		series.forEach( function(s) {

			if (!(s instanceof Object)) {
				throw "series element is not an object: " + s;
			}
			if (!(s.data)) {
				throw "series has no data: " + JSON.stringify(s);
			}
			if (!Array.isArray(s.data)) {
				throw "series data is not an array: " + JSON.stringify(s.data);
			}
			
			if (s.data.length > 0) {
				var x = s.data[0].x;
				var y = s.data[0].y;

				if (typeof x != 'number' || ( typeof y != 'number' && y !== null ) ) {
					throw "x and y properties of points should be numbers instead of " +
						(typeof x) + " and " + (typeof y);
				}
			}

			if (s.data.length >= 3) {
				// probe to sanity check sort order
				if (s.data[2].x < s.data[1].x || s.data[1].x < s.data[0].x || s.data[s.data.length - 1].x < s.data[0].x) {
					throw "series data needs to be sorted on x values for series name: " + s.name;
				}
			}

		}, this );
	};

	this.dataDomain = function() {

		var data = this.series.map( function(s) { return s.data } );

		var min = d3.min( data.map( function(d) { return d[0].x } ) );
		var max = d3.max( data.map( function(d) { return d[d.length - 1].x } ) );

		return [min, max];
	};

	this.discoverRange = function() {

		var domain = this.renderer.domain();

		// this.*Scale is coming from the configuration dictionary
		// which may be referenced by the Graph creator, or shared
		// with other Graphs. We need to ensure we copy the scale
		// so that our mutations do not change the object given to us.
		// Hence the .copy()
		this.x = (this.xScale || d3.scale.linear()).copy().domain(domain.x).range([0, this.width]);
		this.y = (this.yScale || d3.scale.linear()).copy().domain(domain.y).range([this.height, 0]);

		this.x.magnitude = d3.scale.linear()
			.domain([domain.x[0] - domain.x[0], domain.x[1] - domain.x[0]])
			.range([0, this.width]);

		this.y.magnitude = d3.scale.linear()
			.domain([domain.y[0] - domain.y[0], domain.y[1] - domain.y[0]])
			.range([0, this.height]);
	};

	this.render = function() {

		var stackedData = this.stackData();
		this.discoverRange();

		this.renderer.render();

		this.updateCallbacks.forEach( function(callback) {
			callback();
		} );

	};

	this.update = this.render;

	this.stackData = function() {

		var data = this.series.active()
			.map( function(d) { return d.data } )
			.map( function(d) { return d.filter( function(d) { return this._slice(d) }, this ) }, this);

		var preserve = this.preserve;
		if (!preserve) {
			this.series.forEach( function(series) {
				if (series.scale) {
					// data must be preserved when a scale is used
					preserve = true;
				}
			} );
		}

		data = preserve ? Rickshaw.clone(data) : data;

		this.series.active().forEach( function(series, index) {
			if (series.scale) {
				// apply scale to each series
				var seriesData = data[index];
				if(seriesData) {
					seriesData.forEach( function(d) {
						d.y = series.scale(d.y);
					} );
				}
			}
		} );

		this.stackData.hooks.data.forEach( function(entry) {
			data = entry.f.apply(self, [data]);
		} );

		var stackedData;

		if (!this.renderer.unstack) {

			this._validateStackable();

			var layout = d3.layout.stack();
			layout.offset( self.offset );
			stackedData = layout(data);
		}

		stackedData = stackedData || data;

		if (this.renderer.unstack) {
			stackedData.forEach( function(seriesData) {
				seriesData.forEach( function(d) {
					d.y0 = d.y0 === undefined ? 0 : d.y0;
				} );
			} );
		}

		this.stackData.hooks.after.forEach( function(entry) {
			stackedData = entry.f.apply(self, [data]);
		} );

		var i = 0;
		this.series.forEach( function(series) {
			if (series.disabled) return;
			series.stack = stackedData[i++];
		} );

		this.stackedData = stackedData;
		return stackedData;
	};

	this._validateStackable = function() {

		var series = this.series;
		var pointsCount;

		series.forEach( function(s) {

			pointsCount = pointsCount || s.data.length;

			if (pointsCount && s.data.length != pointsCount) {
				throw "stacked series cannot have differing numbers of points: " +
					pointsCount + " vs " + s.data.length + "; see Rickshaw.Series.fill()";
			}

		}, this );
	};

	this.stackData.hooks = { data: [], after: [] };

	this._slice = function(d) {

		if (this.window.xMin || this.window.xMax) {

			var isInRange = true;

			if (this.window.xMin && d.x < this.window.xMin) isInRange = false;
			if (this.window.xMax && d.x > this.window.xMax) isInRange = false;

			return isInRange;
		}

		return true;
	};

	this.onUpdate = function(callback) {
		this.updateCallbacks.push(callback);
	};

	this.onConfigure = function(callback) {
		this.configureCallbacks.push(callback);
	};

	this.registerRenderer = function(renderer) {
		this._renderers = this._renderers || {};
		this._renderers[renderer.name] = renderer;
	};

	this.configure = function(args) {

		this.config = this.config || {};

		if (args.width || args.height) {
			this.setSize(args);
		}

		Rickshaw.keys(this.defaults).forEach( function(k) {
			this.config[k] = k in args ? args[k]
				: k in this ? this[k]
				: this.defaults[k];
		}, this );

		Rickshaw.keys(this.config).forEach( function(k) {
			this[k] = this.config[k];
		}, this );

		if ('stack' in args) args.unstack = !args.stack;

		var renderer = args.renderer || (this.renderer && this.renderer.name) || 'stack';
		this.setRenderer(renderer, args);

		this.configureCallbacks.forEach( function(callback) {
			callback(args);
		} );
	};

	this.setRenderer = function(r, args) {
		if (typeof r == 'function') {
			this.renderer = new r( { graph: self } );
			this.registerRenderer(this.renderer);
		} else {
			if (!this._renderers[r]) {
				throw "couldn't find renderer " + r;
			}
			this.renderer = this._renderers[r];
		}

		if (typeof args == 'object') {
			this.renderer.configure(args);
		}
	};

	this.setSize = function(args) {

		args = args || {};

		if (typeof window !== undefined) {
			var style = window.getComputedStyle(this.element, null);
			var elementWidth = parseInt(style.getPropertyValue('width'), 10);
			var elementHeight = parseInt(style.getPropertyValue('height'), 10);
		}

		this.width = args.width || elementWidth || 400;
		this.height = args.height || elementHeight || 250;

		this.vis && this.vis
			.attr('width', this.width)
			.attr('height', this.height);
	};

	this.initialize(args);
};
Rickshaw.namespace('Rickshaw.Fixtures.RandomData');

Rickshaw.Fixtures.RandomData = function(timeInterval) {

	var addData;
	timeInterval = timeInterval || 1;

	var lastRandomValue = 200;

	var timeBase = Math.floor(new Date().getTime() / 1000);

	this.addData = function(data) {

		var randomValue = Math.random() * 100 + 15 + lastRandomValue;
		var index = data[0].length;

		var counter = 1;

		data.forEach( function(series) {
			var randomVariance = Math.random() * 20;
			var v = randomValue / 25  + counter++ +
				(Math.cos((index * counter * 11) / 960) + 2) * 15 +
				(Math.cos(index / 7) + 2) * 7 +
				(Math.cos(index / 17) + 2) * 1;

			series.push( { x: (index * timeInterval) + timeBase, y: v + randomVariance } );
		} );

		lastRandomValue = randomValue * 0.85;
	};

	this.removeData = function(data) {
		data.forEach( function(series) {
			series.shift();
		} );
		timeBase += timeInterval;
	};
};

Rickshaw.namespace('Rickshaw.Fixtures.Time');

Rickshaw.Fixtures.Time = function() {

	var self = this;

	this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	this.units = [
		{
			name: 'decade',
			seconds: 86400 * 365.25 * 10,
			formatter: function(d) { return (parseInt(d.getUTCFullYear() / 10, 10) * 10) }
		}, {
			name: 'year',
			seconds: 86400 * 365.25,
			formatter: function(d) { return d.getUTCFullYear() }
		}, {
			name: 'month',
			seconds: 86400 * 30.5,
			formatter: function(d) { return self.months[d.getUTCMonth()] }
		}, {
			name: 'week',
			seconds: 86400 * 7,
			formatter: function(d) { return self.formatDate(d) }
		}, {
			name: 'day',
			seconds: 86400,
			formatter: function(d) { return d.getUTCDate() }
		}, {
			name: '6 hour',
			seconds: 3600 * 6,
			formatter: function(d) { return self.formatTime(d) }
		}, {
			name: 'hour',
			seconds: 3600,
			formatter: function(d) { return self.formatTime(d) }
		}, {
			name: '15 minute',
			seconds: 60 * 15,
			formatter: function(d) { return self.formatTime(d) }
		}, {
			name: 'minute',
			seconds: 60,
			formatter: function(d) { return d.getUTCMinutes() }
		}, {
			name: '15 second',
			seconds: 15,
			formatter: function(d) { return d.getUTCSeconds() + 's' }
		}, {
			name: 'second',
			seconds: 1,
			formatter: function(d) { return d.getUTCSeconds() + 's' }
		}, {
			name: 'decisecond',
			seconds: 1/10,
			formatter: function(d) { return d.getUTCMilliseconds() + 'ms' }
		}, {
			name: 'centisecond',
			seconds: 1/100,
			formatter: function(d) { return d.getUTCMilliseconds() + 'ms' }
		}
	];

	this.unit = function(unitName) {
		return this.units.filter( function(unit) { return unitName == unit.name } ).shift();
	};

	this.formatDate = function(d) {
		return d3.time.format('%b %e')(d);
	};

	this.formatTime = function(d) {
		return d.toUTCString().match(/(\d+:\d+):/)[1];
	};

	this.ceil = function(time, unit) {

		var date, floor, year;

		if (unit.name == 'month') {

			date = new Date(time * 1000);

			floor = Date.UTC(date.getUTCFullYear(), date.getUTCMonth()) / 1000;
			if (floor == time) return time;

			year = date.getUTCFullYear();
			var month = date.getUTCMonth();

			if (month == 11) {
				month = 0;
				year = year + 1;
			} else {
				month += 1;
			}

			return Date.UTC(year, month) / 1000;
		}

		if (unit.name == 'year') {

			date = new Date(time * 1000);

			floor = Date.UTC(date.getUTCFullYear(), 0) / 1000;
			if (floor == time) return time;

			year = date.getUTCFullYear() + 1;

			return Date.UTC(year, 0) / 1000;
		}

		return Math.ceil(time / unit.seconds) * unit.seconds;
	};
};
Rickshaw.namespace('Rickshaw.Fixtures.Time.Local');

Rickshaw.Fixtures.Time.Local = function() {

	var self = this;

	this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	this.units = [
		{
			name: 'decade',
			seconds: 86400 * 365.25 * 10,
			formatter: function(d) { return (parseInt(d.getFullYear() / 10, 10) * 10) }
		}, {
			name: 'year',
			seconds: 86400 * 365.25,
			formatter: function(d) { return d.getFullYear() }
		}, {
			name: 'month',
			seconds: 86400 * 30.5,
			formatter: function(d) { return self.months[d.getMonth()] }
		}, {
			name: 'week',
			seconds: 86400 * 7,
			formatter: function(d) { return self.formatDate(d) }
		}, {
			name: 'day',
			seconds: 86400,
			formatter: function(d) { return d.getDate() }
		}, {
			name: '6 hour',
			seconds: 3600 * 6,
			formatter: function(d) { return self.formatTime(d) }
		}, {
			name: 'hour',
			seconds: 3600,
			formatter: function(d) { return self.formatTime(d) }
		}, {
			name: '15 minute',
			seconds: 60 * 15,
			formatter: function(d) { return self.formatTime(d) }
		}, {
			name: 'minute',
			seconds: 60,
			formatter: function(d) { return d.getMinutes() }
		}, {
			name: '15 second',
			seconds: 15,
			formatter: function(d) { return d.getSeconds() + 's' }
		}, {
			name: 'second',
			seconds: 1,
			formatter: function(d) { return d.getSeconds() + 's' }
		}, {
			name: 'decisecond',
			seconds: 1/10,
			formatter: function(d) { return d.getMilliseconds() + 'ms' }
		}, {
			name: 'centisecond',
			seconds: 1/100,
			formatter: function(d) { return d.getMilliseconds() + 'ms' }
		}
	];

	this.unit = function(unitName) {
		return this.units.filter( function(unit) { return unitName == unit.name } ).shift();
	};

	this.formatDate = function(d) {
		return d3.time.format('%b %e')(d);
	};

	this.formatTime = function(d) {
		return d.toString().match(/(\d+:\d+):/)[1];
	};

	this.ceil = function(time, unit) {

		var date, floor, year;

		if (unit.name == 'day') {

			var nearFuture = new Date((time + unit.seconds - 1) * 1000);

			var rounded = new Date(0);
			rounded.setMilliseconds(0);
			rounded.setSeconds(0);
			rounded.setMinutes(0);
			rounded.setHours(0);
			rounded.setDate(nearFuture.getDate());
			rounded.setMonth(nearFuture.getMonth());
			rounded.setFullYear(nearFuture.getFullYear());

			return rounded.getTime() / 1000;
		}

		if (unit.name == 'month') {

			date = new Date(time * 1000);

			floor = new Date(date.getFullYear(), date.getMonth()).getTime() / 1000;
			if (floor == time) return time;

			year = date.getFullYear();
			var month = date.getMonth();

			if (month == 11) {
				month = 0;
				year = year + 1;
			} else {
				month += 1;
			}

			return new Date(year, month).getTime() / 1000;
		}

		if (unit.name == 'year') {

			date = new Date(time * 1000);

			floor = new Date(date.getUTCFullYear(), 0).getTime() / 1000;
			if (floor == time) return time;

			year = date.getFullYear() + 1;

			return new Date(year, 0).getTime() / 1000;
		}

		return Math.ceil(time / unit.seconds) * unit.seconds;
	};
};
Rickshaw.namespace('Rickshaw.Fixtures.Number');

Rickshaw.Fixtures.Number.formatKMBT = function(y) {
	var abs_y = Math.abs(y);
	if (abs_y >= 1000000000000)   { return y / 1000000000000 + "T" }
	else if (abs_y >= 1000000000) { return y / 1000000000 + "B" }
	else if (abs_y >= 1000000)    { return y / 1000000 + "M" }
	else if (abs_y >= 1000)       { return y / 1000 + "K" }
	else if (abs_y < 1 && y > 0)  { return y.toFixed(2) }
	else if (abs_y === 0)         { return '' }
	else                      { return y }
};

Rickshaw.Fixtures.Number.formatBase1024KMGTP = function(y) {
    var abs_y = Math.abs(y);
    if (abs_y >= 1125899906842624)  { return y / 1125899906842624 + "P" }
    else if (abs_y >= 1099511627776){ return y / 1099511627776 + "T" }
    else if (abs_y >= 1073741824)   { return y / 1073741824 + "G" }
    else if (abs_y >= 1048576)      { return y / 1048576 + "M" }
    else if (abs_y >= 1024)         { return y / 1024 + "K" }
    else if (abs_y < 1 && y > 0)    { return y.toFixed(2) }
    else if (abs_y === 0)           { return '' }
    else                        { return y }
};
Rickshaw.namespace("Rickshaw.Color.Palette");

Rickshaw.Color.Palette = function(args) {

	var color = new Rickshaw.Fixtures.Color();

	args = args || {};
	this.schemes = {};

	this.scheme = color.schemes[args.scheme] || args.scheme || color.schemes.colorwheel;
	this.runningIndex = 0;
	this.generatorIndex = 0;

	if (args.interpolatedStopCount) {
		var schemeCount = this.scheme.length - 1;
		var i, j, scheme = [];
		for (i = 0; i < schemeCount; i++) {
			scheme.push(this.scheme[i]);
			var generator = d3.interpolateHsl(this.scheme[i], this.scheme[i + 1]);
			for (j = 1; j < args.interpolatedStopCount; j++) {
				scheme.push(generator((1 / args.interpolatedStopCount) * j));
			}
		}
		scheme.push(this.scheme[this.scheme.length - 1]);
		this.scheme = scheme;
	}
	this.rotateCount = this.scheme.length;

	this.color = function(key) {
		return this.scheme[key] || this.scheme[this.runningIndex++] || this.interpolateColor() || '#808080';
	};

	this.interpolateColor = function() {
		if (!Array.isArray(this.scheme)) return;
		var color;
		if (this.generatorIndex == this.rotateCount * 2 - 1) {
			color = d3.interpolateHsl(this.scheme[this.generatorIndex], this.scheme[0])(0.5);
			this.generatorIndex = 0;
			this.rotateCount *= 2;
		} else {
			color = d3.interpolateHsl(this.scheme[this.generatorIndex], this.scheme[this.generatorIndex + 1])(0.5);
			this.generatorIndex++;
		}
		this.scheme.push(color);
		return color;
	};

};
Rickshaw.namespace('Rickshaw.Graph.Ajax');

Rickshaw.Graph.Ajax = Rickshaw.Class.create( {

	initialize: function(args) {

		this.dataURL = args.dataURL;

		this.onData = args.onData || function(d) { return d };
		this.onComplete = args.onComplete || function() {};
		this.onError = args.onError || function() {};

		this.args = args; // pass through to Rickshaw.Graph

		this.request();
	},

	request: function() {

		jQuery.ajax( {
			url: this.dataURL,
			dataType: 'json',
			success: this.success.bind(this),
			error: this.error.bind(this)
		} );
	},

	error: function() {

		console.log("error loading dataURL: " + this.dataURL);
		this.onError(this);
	},

	success: function(data, status) {

		data = this.onData(data);
		this.args.series = this._splice({ data: data, series: this.args.series });

		this.graph = this.graph || new Rickshaw.Graph(this.args);
		this.graph.render();

		this.onComplete(this);
	},

	_splice: function(args) {

		var data = args.data;
		var series = args.series;

		if (!args.series) return data;

		series.forEach( function(s) {

			var seriesKey = s.key || s.name;
			if (!seriesKey) throw "series needs a key or a name";

			data.forEach( function(d) {

				var dataKey = d.key || d.name;
				if (!dataKey) throw "data needs a key or a name";

				if (seriesKey == dataKey) {
					var properties = ['color', 'name', 'data'];
					properties.forEach( function(p) {
						if (d[p]) s[p] = d[p];
					} );
				}
			} );
		} );

		return series;
	}
} );

Rickshaw.namespace('Rickshaw.Graph.Annotate');

Rickshaw.Graph.Annotate = function(args) {

	var graph = this.graph = args.graph;
	this.elements = { timeline: args.element };
	
	var self = this;

	this.data = {};

	this.elements.timeline.classList.add('rickshaw_annotation_timeline');

	this.add = function(time, content, end_time) {
		self.data[time] = self.data[time] || {'boxes': []};
		self.data[time].boxes.push({content: content, end: end_time});
	};

	this.update = function() {

		Rickshaw.keys(self.data).forEach( function(time) {

			var annotation = self.data[time];
			var left = self.graph.x(time);

			if (left < 0 || left > self.graph.x.range()[1]) {
				if (annotation.element) {
					annotation.line.classList.add('offscreen');
					annotation.element.style.display = 'none';
				}

				annotation.boxes.forEach( function(box) {
					if ( box.rangeElement ) box.rangeElement.classList.add('offscreen');
				});

				return;
			}

			if (!annotation.element) {
				var element = annotation.element = document.createElement('div');
				element.classList.add('annotation');
				this.elements.timeline.appendChild(element);
				element.addEventListener('click', function(e) {
					element.classList.toggle('active');
					annotation.line.classList.toggle('active');
					annotation.boxes.forEach( function(box) {
						if ( box.rangeElement ) box.rangeElement.classList.toggle('active');
					});
				}, false);
					
			}

			annotation.element.style.left = left + 'px';
			annotation.element.style.display = 'block';

			annotation.boxes.forEach( function(box) {


				var element = box.element;

				if (!element) {
					element = box.element = document.createElement('div');
					element.classList.add('content');
					element.innerHTML = box.content;
					annotation.element.appendChild(element);

					annotation.line = document.createElement('div');
					annotation.line.classList.add('annotation_line');
					self.graph.element.appendChild(annotation.line);

					if ( box.end ) {
						box.rangeElement = document.createElement('div');
						box.rangeElement.classList.add('annotation_range');
						self.graph.element.appendChild(box.rangeElement);
					}

				}

				if ( box.end ) {

					var annotationRangeStart = left;
					var annotationRangeEnd   = Math.min( self.graph.x(box.end), self.graph.x.range()[1] );

					// annotation makes more sense at end
					if ( annotationRangeStart > annotationRangeEnd ) {
						annotationRangeEnd   = left;
						annotationRangeStart = Math.max( self.graph.x(box.end), self.graph.x.range()[0] );
					}

					var annotationRangeWidth = annotationRangeEnd - annotationRangeStart;

					box.rangeElement.style.left  = annotationRangeStart + 'px';
					box.rangeElement.style.width = annotationRangeWidth + 'px';

					box.rangeElement.classList.remove('offscreen');
				}

				annotation.line.classList.remove('offscreen');
				annotation.line.style.left = left + 'px';
			} );
		}, this );
	};

	this.graph.onUpdate( function() { self.update() } );
};
Rickshaw.namespace('Rickshaw.Graph.Axis.Time');

Rickshaw.Graph.Axis.Time = function(args) {

	var self = this;

	this.graph = args.graph;
	this.elements = [];
	this.ticksTreatment = args.ticksTreatment || 'plain';
	this.fixedTimeUnit = args.timeUnit;

	var time = args.timeFixture || new Rickshaw.Fixtures.Time();

	this.appropriateTimeUnit = function() {

		var unit;
		var units = time.units;

		var domain = this.graph.x.domain();
		var rangeSeconds = domain[1] - domain[0];

		units.forEach( function(u) {
			if (Math.floor(rangeSeconds / u.seconds) >= 2) {
				unit = unit || u;
			}
		} );

		return (unit || time.units[time.units.length - 1]);
	};

	this.tickOffsets = function() {

		var domain = this.graph.x.domain();

		var unit = this.fixedTimeUnit || this.appropriateTimeUnit();
		var count = Math.ceil((domain[1] - domain[0]) / unit.seconds);

		var runningTick = domain[0];

		var offsets = [];

		for (var i = 0; i < count; i++) {

			var tickValue = time.ceil(runningTick, unit);
			runningTick = tickValue + unit.seconds / 2;

			offsets.push( { value: tickValue, unit: unit } );
		}

		return offsets;
	};

	this.render = function() {

		this.elements.forEach( function(e) {
			e.parentNode.removeChild(e);
		} );

		this.elements = [];

		var offsets = this.tickOffsets();

		offsets.forEach( function(o) {
			
			if (self.graph.x(o.value) > self.graph.x.range()[1]) return;
	
			var element = document.createElement('div');
			element.style.left = self.graph.x(o.value) + 'px';
			element.classList.add('x_tick');
			element.classList.add(self.ticksTreatment);

			var title = document.createElement('div');
			title.classList.add('title');
			title.innerHTML = o.unit.formatter(new Date(o.value * 1000));
			element.appendChild(title);

			self.graph.element.appendChild(element);
			self.elements.push(element);

		} );
	};

	this.graph.onUpdate( function() { self.render() } );
};

Rickshaw.namespace('Rickshaw.Graph.Axis.X');

Rickshaw.Graph.Axis.X = function(args) {

	var self = this;
	var berthRate = 0.10;

	this.initialize = function(args) {

		this.graph = args.graph;
		this.orientation = args.orientation || 'top';

		this.pixelsPerTick = args.pixelsPerTick || 75;
		if (args.ticks) this.staticTicks = args.ticks;
		if (args.tickValues) this.tickValues = args.tickValues;

		this.tickSize = args.tickSize || 4;
		this.ticksTreatment = args.ticksTreatment || 'plain';

		if (args.element) {

			this.element = args.element;
			this._discoverSize(args.element, args);

			this.vis = d3.select(args.element)
				.append("svg:svg")
				.attr('height', this.height)
				.attr('width', this.width)
				.attr('class', 'rickshaw_graph x_axis_d3');

			this.element = this.vis[0][0];
			this.element.style.position = 'relative';

			this.setSize({ width: args.width, height: args.height });

		} else {
			this.vis = this.graph.vis;
		}

		this.graph.onUpdate( function() { self.render() } );
	};

	this.setSize = function(args) {

		args = args || {};
		if (!this.element) return;

		this._discoverSize(this.element.parentNode, args);

		this.vis
			.attr('height', this.height)
			.attr('width', this.width * (1 + berthRate));

		var berth = Math.floor(this.width * berthRate / 2);
		this.element.style.left = -1 * berth + 'px';
	};

	this.render = function() {

		if (this._renderWidth !== undefined && this.graph.width !== this._renderWidth) this.setSize({ auto: true });

		var axis = d3.svg.axis().scale(this.graph.x).orient(this.orientation);
		axis.tickFormat( args.tickFormat || function(x) { return x } );
		if (this.tickValues) axis.tickValues(this.tickValues);

		this.ticks = this.staticTicks || Math.floor(this.graph.width / this.pixelsPerTick);

		var berth = Math.floor(this.width * berthRate / 2) || 0;
		var transform;

		if (this.orientation == 'top') {
			var yOffset = this.height || this.graph.height;
			transform = 'translate(' + berth + ',' + yOffset + ')';
		} else {
			transform = 'translate(' + berth + ', 0)';
		}

		if (this.element) {
			this.vis.selectAll('*').remove();
		}

		this.vis
			.append("svg:g")
			.attr("class", ["x_ticks_d3", this.ticksTreatment].join(" "))
			.attr("transform", transform)
			.call(axis.ticks(this.ticks).tickSubdivide(0).tickSize(this.tickSize));

		var gridSize = (this.orientation == 'bottom' ? 1 : -1) * this.graph.height;

		this.graph.vis
			.append("svg:g")
			.attr("class", "x_grid_d3")
			.call(axis.ticks(this.ticks).tickSubdivide(0).tickSize(gridSize))
			.selectAll('text')
			.each(function() { this.parentNode.setAttribute('data-x-value', this.textContent) });

		this._renderHeight = this.graph.height;
	};

	this._discoverSize = function(element, args) {

		if (typeof window !== 'undefined') {

			var style = window.getComputedStyle(element, null);
			var elementHeight = parseInt(style.getPropertyValue('height'), 10);

			if (!args.auto) {
				var elementWidth = parseInt(style.getPropertyValue('width'), 10);
			}
		}

		this.width = (args.width || elementWidth || this.graph.width) * (1 + berthRate);
		this.height = args.height || elementHeight || 40;
	};

	this.initialize(args);
};

Rickshaw.namespace('Rickshaw.Graph.Axis.Y');

Rickshaw.Graph.Axis.Y = Rickshaw.Class.create( {

	initialize: function(args) {

		this.graph = args.graph;
		this.orientation = args.orientation || 'right';

		this.pixelsPerTick = args.pixelsPerTick || 75;
		if (args.ticks) this.staticTicks = args.ticks;
		if (args.tickValues) this.tickValues = args.tickValues;

		this.tickSize = args.tickSize || 4;
		this.ticksTreatment = args.ticksTreatment || 'plain';

		this.tickFormat = args.tickFormat || function(y) { return y };

		this.berthRate = 0.10;

		if (args.element) {

			this.element = args.element;
			this.vis = d3.select(args.element)
				.append("svg:svg")
				.attr('class', 'rickshaw_graph y_axis');

			this.element = this.vis[0][0];
			this.element.style.position = 'relative';

			this.setSize({ width: args.width, height: args.height });

		} else {
			this.vis = this.graph.vis;
		}

		var self = this;
		this.graph.onUpdate( function() { self.render() } );
	},

	setSize: function(args) {

		args = args || {};

		if (!this.element) return;

		if (typeof window !== 'undefined') {

			var style = window.getComputedStyle(this.element.parentNode, null);
			var elementWidth = parseInt(style.getPropertyValue('width'), 10);

			if (!args.auto) {
				var elementHeight = parseInt(style.getPropertyValue('height'), 10);
			}
		}

		this.width = args.width || elementWidth || this.graph.width * this.berthRate;
		this.height = args.height || elementHeight || this.graph.height;

		this.vis
			.attr('width', this.width)
			.attr('height', this.height * (1 + this.berthRate));

		var berth = this.height * this.berthRate;

		if (this.orientation == 'left') {
			this.element.style.top = -1 * berth + 'px';
		}
	},

	render: function() {

		if (this._renderHeight !== undefined && this.graph.height !== this._renderHeight) this.setSize({ auto: true });

		this.ticks = this.staticTicks || Math.floor(this.graph.height / this.pixelsPerTick);

		var axis = this._drawAxis(this.graph.y);

		this._drawGrid(axis);

		this._renderHeight = this.graph.height;
	},

	_drawAxis: function(scale) {
		var axis = d3.svg.axis().scale(scale).orient(this.orientation);
		axis.tickFormat(this.tickFormat);
		if (this.tickValues) axis.tickValues(this.tickValues);

		if (this.orientation == 'left') {
			var berth = this.height * this.berthRate;
			var transform = 'translate(' + this.width + ', ' + berth + ')';
		}

		if (this.element) {
			this.vis.selectAll('*').remove();
		}

		this.vis
			.append("svg:g")
			.attr("class", ["y_ticks", this.ticksTreatment].join(" "))
			.attr("transform", transform)
			.call(axis.ticks(this.ticks).tickSubdivide(0).tickSize(this.tickSize));

		return axis;
	},

	_drawGrid: function(axis) {
		var gridSize = (this.orientation == 'right' ? 1 : -1) * this.graph.width;

		this.graph.vis
			.append("svg:g")
			.attr("class", "y_grid")
			.call(axis.ticks(this.ticks).tickSubdivide(0).tickSize(gridSize))
			.selectAll('text')
			.each(function() { this.parentNode.setAttribute('data-y-value', this.textContent) });
	}
} );
Rickshaw.namespace('Rickshaw.Graph.Axis.Y.Scaled');

Rickshaw.Graph.Axis.Y.Scaled = Rickshaw.Class.create( Rickshaw.Graph.Axis.Y, {

  initialize: function($super, args) {

    if (typeof(args.scale) === 'undefined') {
      throw new Error('Scaled requires scale');
    }

    this.scale = args.scale;

    if (typeof(args.grid) === 'undefined') {
      this.grid = true;
    } else {
      this.grid = args.grid;
    }

    $super(args);

  },

  _drawAxis: function($super, scale) {
    // Adjust scale's domain to compensate for adjustments to the
    // renderer's domain (e.g. padding).
    var domain = this.scale.domain();
    var renderDomain = this.graph.renderer.domain().y;

    var extents = [
      Math.min.apply(Math, domain),
      Math.max.apply(Math, domain)];

    // A mapping from the ideal render domain [0, 1] to the extent
    // of the original scale's domain.  This is used to calculate
    // the extents of the adjusted domain.
    var extentMap = d3.scale.linear().domain([0, 1]).range(extents);

    var adjExtents = [
      extentMap(renderDomain[0]),
      extentMap(renderDomain[1])];

    // A mapping from the original domain to the adjusted domain.
    var adjustment = d3.scale.linear().domain(extents).range(adjExtents);

    // Make a copy of the custom scale, apply the adjusted domain, and
    // copy the range to match the graph's scale.
    var adjustedScale = this.scale.copy()
      .domain(domain.map(adjustment))
      .range(scale.range());

    return $super(adjustedScale);
  },

  _drawGrid: function($super, axis) {
    if (this.grid) {
      // only draw the axis if the grid option is true
      $super(axis);
    }
  }
} );
Rickshaw.namespace('Rickshaw.Graph.Behavior.Series.Highlight');

Rickshaw.Graph.Behavior.Series.Highlight = function(args) {

	this.graph = args.graph;
	this.legend = args.legend;

	var self = this;

	var colorSafe = {};
	var activeLine = null;

	var disabledColor = args.disabledColor || function(seriesColor) {
		return d3.interpolateRgb(seriesColor, d3.rgb('#d8d8d8'))(0.8).toString();
	};

	this.addHighlightEvents = function (l) {

		l.element.addEventListener( 'mouseover', function(e) {

			if (activeLine) return;
			else activeLine = l;

			self.legend.lines.forEach( function(line) {

				if (l === line) {

					// if we're not in a stacked renderer bring active line to the top
					if (self.graph.renderer.unstack && (line.series.renderer ? line.series.renderer.unstack : true)) {

						var seriesIndex = self.graph.series.indexOf(line.series);
						line.originalIndex = seriesIndex;

						var series = self.graph.series.splice(seriesIndex, 1)[0];
						self.graph.series.push(series);
					}
					return;
				}

				colorSafe[line.series.name] = colorSafe[line.series.name] || line.series.color;
				line.series.color = disabledColor(line.series.color);

			} );

			self.graph.update();

		}, false );

		l.element.addEventListener( 'mouseout', function(e) {

			if (!activeLine) return;
			else activeLine = null;

			self.legend.lines.forEach( function(line) {

				// return reordered series to its original place
				if (l === line && line.hasOwnProperty('originalIndex')) {

					var series = self.graph.series.pop();
					self.graph.series.splice(line.originalIndex, 0, series);
					delete line.originalIndex;
				}

				if (colorSafe[line.series.name]) {
					line.series.color = colorSafe[line.series.name];
				}
			} );

			self.graph.update();

		}, false );
	};

	if (this.legend) {
		this.legend.lines.forEach( function(l) {
			self.addHighlightEvents(l);
		} );
	}

};
Rickshaw.namespace('Rickshaw.Graph.Behavior.Series.Order');

Rickshaw.Graph.Behavior.Series.Order = function(args) {

	this.graph = args.graph;
	this.legend = args.legend;

	var self = this;

	if (typeof window.jQuery == 'undefined') {
		throw "couldn't find jQuery at window.jQuery";
	}

	if (typeof window.jQuery.ui == 'undefined') {
		throw "couldn't find jQuery UI at window.jQuery.ui";
	}

	jQuery(function() {
		jQuery(self.legend.list).sortable( {
			containment: 'parent',
			tolerance: 'pointer',
			update: function( event, ui ) {
				var series = [];
				jQuery(self.legend.list).find('li').each( function(index, item) {
					if (!item.series) return;
					series.push(item.series);
				} );

				for (var i = self.graph.series.length - 1; i >= 0; i--) {
					self.graph.series[i] = series.shift();
				}

				self.graph.update();
			}
		} );
		jQuery(self.legend.list).disableSelection();
	});

	//hack to make jquery-ui sortable behave
	this.graph.onUpdate( function() { 
		var h = window.getComputedStyle(self.legend.element).height;
		self.legend.element.style.height = h;
	} );
};
Rickshaw.namespace('Rickshaw.Graph.Behavior.Series.Toggle');

Rickshaw.Graph.Behavior.Series.Toggle = function(args) {

	this.graph = args.graph;
	this.legend = args.legend;

	var self = this;

	this.addAnchor = function(line) {

		var anchor = document.createElement('a');
		anchor.innerHTML = '&#10004;';
		anchor.classList.add('action');
		line.element.insertBefore(anchor, line.element.firstChild);

		anchor.onclick = function(e) {
			if (line.series.disabled) {
				line.series.enable();
				line.element.classList.remove('disabled');
			} else { 
				if (this.graph.series.filter(function(s) { return !s.disabled }).length <= 1) return;
				line.series.disable();
				line.element.classList.add('disabled');
			}

		}.bind(this);
		
                var label = line.element.getElementsByTagName('span')[0];
                label.onclick = function(e){

                        var disableAllOtherLines = line.series.disabled;
                        if ( ! disableAllOtherLines ) {
                                for ( var i = 0; i < self.legend.lines.length; i++ ) {
                                        var l = self.legend.lines[i];
                                        if ( line.series === l.series ) {
                                                // noop
                                        } else if ( l.series.disabled ) {
                                                // noop
                                        } else {
                                                disableAllOtherLines = true;
                                                break;
                                        }
                                }
                        }

                        // show all or none
                        if ( disableAllOtherLines ) {

                                // these must happen first or else we try ( and probably fail ) to make a no line graph
                                line.series.enable();
                                line.element.classList.remove('disabled');

                                self.legend.lines.forEach(function(l){
                                        if ( line.series === l.series ) {
                                                // noop
                                        } else {
                                                l.series.disable();
                                                l.element.classList.add('disabled');
                                        }
                                });

                        } else {

                                self.legend.lines.forEach(function(l){
                                        l.series.enable();
                                        l.element.classList.remove('disabled');
                                });

                        }

                };

	};

	if (this.legend) {

		var $ = jQuery;
		if (typeof $ != 'undefined' && $(this.legend.list).sortable) {

			$(this.legend.list).sortable( {
				start: function(event, ui) {
					ui.item.bind('no.onclick',
						function(event) {
							event.preventDefault();
						}
					);
				},
				stop: function(event, ui) {
					setTimeout(function(){
						ui.item.unbind('no.onclick');
					}, 250);
				}
			});
		}

		this.legend.lines.forEach( function(l) {
			self.addAnchor(l);
		} );
	}

	this._addBehavior = function() {

		this.graph.series.forEach( function(s) {
			
			s.disable = function() {

				if (self.graph.series.length <= 1) {
					throw('only one series left');
				}
				
				s.disabled = true;
				self.graph.update();
			};

			s.enable = function() {
				s.disabled = false;
				self.graph.update();
			};
		} );
	};
	this._addBehavior();

	this.updateBehaviour = function () { this._addBehavior() };

};
Rickshaw.namespace('Rickshaw.Graph.HoverDetail');

Rickshaw.Graph.HoverDetail = Rickshaw.Class.create({

	initialize: function(args) {

		var graph = this.graph = args.graph;

		this.xFormatter = args.xFormatter || function(x) {
			return new Date( x * 1000 ).toUTCString();
		};

		this.yFormatter = args.yFormatter || function(y) {
			return y === null ? y : y.toFixed(2);
		};

		var element = this.element = document.createElement('div');
		element.className = 'detail';

		this.visible = true;
		graph.element.appendChild(element);

		this.lastEvent = null;
		this._addListeners();

		this.onShow = args.onShow;
		this.onHide = args.onHide;
		this.onRender = args.onRender;

		this.formatter = args.formatter || this.formatter;

	},

	formatter: function(series, x, y, formattedX, formattedY, d) {
		return series.name + ':&nbsp;' + formattedY;
	},

	update: function(e) {

		e = e || this.lastEvent;
		if (!e) return;
		this.lastEvent = e;

		if (!e.target.nodeName.match(/^(path|svg|rect|circle)$/)) return;

		var graph = this.graph;

		var eventX = e.offsetX || e.layerX;
		var eventY = e.offsetY || e.layerY;

		var j = 0;
		var points = [];
		var nearestPoint;

		this.graph.series.active().forEach( function(series) {

			var data = this.graph.stackedData[j++];

			if (!data.length)
				return;

			var domainX = graph.x.invert(eventX);

			var domainIndexScale = d3.scale.linear()
				.domain([data[0].x, data.slice(-1)[0].x])
				.range([0, data.length - 1]);

			var approximateIndex = Math.round(domainIndexScale(domainX));
			if (approximateIndex == data.length - 1) approximateIndex--;

			var dataIndex = Math.min(approximateIndex || 0, data.length - 1);

			for (var i = approximateIndex; i < data.length - 1;) {

				if (!data[i] || !data[i + 1]) break;

				if (data[i].x <= domainX && data[i + 1].x > domainX) {
					dataIndex = Math.abs(domainX - data[i].x) < Math.abs(domainX - data[i + 1].x) ? i : i + 1;
					break;
				}

				if (data[i + 1].x <= domainX) { i++ } else { i-- }
			}

			if (dataIndex < 0) dataIndex = 0;
			var value = data[dataIndex];

			var distance = Math.sqrt(
				Math.pow(Math.abs(graph.x(value.x) - eventX), 2) +
				Math.pow(Math.abs(graph.y(value.y + value.y0) - eventY), 2)
			);

			var xFormatter = series.xFormatter || this.xFormatter;
			var yFormatter = series.yFormatter || this.yFormatter;

			var point = {
				formattedXValue: xFormatter(value.x),
				formattedYValue: yFormatter(series.scale ? series.scale.invert(value.y) : value.y),
				series: series,
				value: value,
				distance: distance,
				order: j,
				name: series.name
			};

			if (!nearestPoint || distance < nearestPoint.distance) {
				nearestPoint = point;
			}

			points.push(point);

		}, this );

		if (!nearestPoint)
			return;

		nearestPoint.active = true;

		var domainX = nearestPoint.value.x;
		var formattedXValue = nearestPoint.formattedXValue;

		this.element.innerHTML = '';
		this.element.style.left = graph.x(domainX) + 'px';

		this.visible && this.render( {
			points: points,
			detail: points, // for backwards compatibility
			mouseX: eventX,
			mouseY: eventY,
			formattedXValue: formattedXValue,
			domainX: domainX
		} );
	},

	hide: function() {
		this.visible = false;
		this.element.classList.add('inactive');

		if (typeof this.onHide == 'function') {
			this.onHide();
		}
	},

	show: function() {
		this.visible = true;
		this.element.classList.remove('inactive');

		if (typeof this.onShow == 'function') {
			this.onShow();
		}
	},

	render: function(args) {

		var graph = this.graph;
		var points = args.points;
		var point = points.filter( function(p) { return p.active } ).shift();

		if (point.value.y === null) return;

		var formattedXValue = point.formattedXValue;
		var formattedYValue = point.formattedYValue;

		this.element.innerHTML = '';
		this.element.style.left = graph.x(point.value.x) + 'px';

		var xLabel = document.createElement('div');

		xLabel.className = 'x_label';
		xLabel.innerHTML = formattedXValue;
		this.element.appendChild(xLabel);

		var item = document.createElement('div');

		item.className = 'item';

		// invert the scale if this series displays using a scale
		var series = point.series;
		var actualY = series.scale ? series.scale.invert(point.value.y) : point.value.y;

		item.innerHTML = this.formatter(series, point.value.x, actualY, formattedXValue, formattedYValue, point);
		item.style.top = this.graph.y(point.value.y0 + point.value.y) + 'px';

		this.element.appendChild(item);

		var dot = document.createElement('div');

		dot.className = 'dot';
		dot.style.top = item.style.top;
		dot.style.borderColor = series.color;

		this.element.appendChild(dot);

		if (point.active) {
			item.classList.add('active');
			dot.classList.add('active');
		}

		// Assume left alignment until the element has been displayed and
		// bounding box calculations are possible.
		var alignables = [xLabel, item];
		alignables.forEach(function(el) {
			el.classList.add('left');
		});

		this.show();

		// If left-alignment results in any error, try right-alignment.
		var leftAlignError = this._calcLayoutError(alignables);
		if (leftAlignError > 0) {
			alignables.forEach(function(el) {
				el.classList.remove('left');
				el.classList.add('right');
			});

			// If right-alignment is worse than left alignment, switch back.
			var rightAlignError = this._calcLayoutError(alignables);
			if (rightAlignError > leftAlignError) {
				alignables.forEach(function(el) {
					el.classList.remove('right');
					el.classList.add('left');
				});
			}
		}

		if (typeof this.onRender == 'function') {
			this.onRender(args);
		}
	},

	_calcLayoutError: function(alignables) {
		// Layout error is calculated as the number of linear pixels by which
		// an alignable extends past the left or right edge of the parent.
		var parentRect = this.element.parentNode.getBoundingClientRect();

		var error = 0;
		var alignRight = alignables.forEach(function(el) {
			var rect = el.getBoundingClientRect();
			if (!rect.width) {
				return;
			}

			if (rect.right > parentRect.right) {
				error += rect.right - parentRect.right;
			}

			if (rect.left < parentRect.left) {
				error += parentRect.left - rect.left;
			}
		});
		return error;
	},

	_addListeners: function() {

		this.graph.element.addEventListener(
			'mousemove',
			function(e) {
				this.visible = true;
				this.update(e);
			}.bind(this),
			false
		);

		this.graph.onUpdate( function() { this.update() }.bind(this) );

		this.graph.element.addEventListener(
			'mouseout',
			function(e) {
				if (e.relatedTarget && !(e.relatedTarget.compareDocumentPosition(this.graph.element) & Node.DOCUMENT_POSITION_CONTAINS)) {
					this.hide();
				}
			}.bind(this),
			false
		);
	}
});
Rickshaw.namespace('Rickshaw.Graph.JSONP');

Rickshaw.Graph.JSONP = Rickshaw.Class.create( Rickshaw.Graph.Ajax, {

	request: function() {

		jQuery.ajax( {
			url: this.dataURL,
			dataType: 'jsonp',
			success: this.success.bind(this),
			error: this.error.bind(this)
		} );
	}
} );
Rickshaw.namespace('Rickshaw.Graph.Legend');

Rickshaw.Graph.Legend = Rickshaw.Class.create( {

	className: 'rickshaw_legend',

	initialize: function(args) {
		this.element = args.element;
		this.graph = args.graph;
		this.naturalOrder = args.naturalOrder;

		this.element.classList.add(this.className);

		this.list = document.createElement('ul');
		this.element.appendChild(this.list);

		this.render();

		// we could bind this.render.bind(this) here
		// but triggering the re-render would lose the added
		// behavior of the series toggle
		this.graph.onUpdate( function() {} );
	},

	render: function() {
		var self = this;

		while ( this.list.firstChild ) {
			this.list.removeChild( this.list.firstChild );
		}
		this.lines = [];

		var series = this.graph.series
			.map( function(s) { return s } );

		if (!this.naturalOrder) {
			series = series.reverse();
		}

		series.forEach( function(s) {
			self.addLine(s);
		} );


	},

	addLine: function (series) {
		var line = document.createElement('li');
		line.className = 'line';
		if (series.disabled) {
			line.className += ' disabled';
		}
		if (series.className) {
			d3.select(line).classed(series.className, true);
		}
		var swatch = document.createElement('div');
		swatch.className = 'swatch';
		swatch.style.backgroundColor = series.color;

		line.appendChild(swatch);

		var label = document.createElement('span');
		label.className = 'label';
		label.innerHTML = series.name;

		line.appendChild(label);
		this.list.appendChild(line);

		line.series = series;

		if (series.noLegend) {
			line.style.display = 'none';
		}

		var _line = { element: line, series: series };
		if (this.shelving) {
			this.shelving.addAnchor(_line);
			this.shelving.updateBehaviour();
		}
		if (this.highlighter) {
			this.highlighter.addHighlightEvents(_line);
		}
		this.lines.push(_line);
		return line;
	}
} );

Rickshaw.namespace('Rickshaw.Graph.RangeSlider');

Rickshaw.Graph.RangeSlider = Rickshaw.Class.create({

	initialize: function(args) {

		var element = this.element = args.element;
		var graph = this.graph = args.graph;

		this.slideCallbacks = [];

		this.build();

		graph.onUpdate( function() { this.update() }.bind(this) );
	},

	build: function() {

		var element = this.element;
		var graph = this.graph;
		var $ = jQuery;

		var domain = graph.dataDomain();
		var self = this;

		$( function() {
			$(element).slider( {
				range: true,
				min: domain[0],
				max: domain[1],
				values: [ 
					domain[0],
					domain[1]
				],
				slide: function( event, ui ) {

					if (ui.values[1] <= ui.values[0]) return;

					graph.window.xMin = ui.values[0];
					graph.window.xMax = ui.values[1];
					graph.update();

					var domain = graph.dataDomain();

					// if we're at an extreme, stick there
					if (domain[0] == ui.values[0]) {
						graph.window.xMin = undefined;
					}

					if (domain[1] == ui.values[1]) {
						graph.window.xMax = undefined;
					}

					self.slideCallbacks.forEach(function(callback) {
						callback(graph, graph.window.xMin, graph.window.xMax);
					});
				}
			} );
		} );

		$(element)[0].style.width = graph.width + 'px';

	},

	update: function() {

		var element = this.element;
		var graph = this.graph;
		var $ = jQuery;

		var values = $(element).slider('option', 'values');

		var domain = graph.dataDomain();

		$(element).slider('option', 'min', domain[0]);
		$(element).slider('option', 'max', domain[1]);

		if (graph.window.xMin == null) {
			values[0] = domain[0];
		}
		if (graph.window.xMax == null) {
			values[1] = domain[1];
		}

		$(element).slider('option', 'values', values);
	},

	onSlide: function(callback) {
		this.slideCallbacks.push(callback);
	}
});

Rickshaw.namespace('Rickshaw.Graph.RangeSlider.Preview');

Rickshaw.Graph.RangeSlider.Preview = Rickshaw.Class.create({

	initialize: function(args) {

		if (!args.element) throw "Rickshaw.Graph.RangeSlider.Preview needs a reference to an element";
		if (!args.graph && !args.graphs) throw "Rickshaw.Graph.RangeSlider.Preview needs a reference to an graph or an array of graphs";

		this.element = args.element;
		this.element.style.position = 'relative';

		this.graphs = args.graph ? [ args.graph ] : args.graphs;

		this.defaults = {
			height: 75,
			width: 400,
			gripperColor: undefined,
			frameTopThickness: 3,
			frameHandleThickness: 10,
			frameColor: "#d4d4d4",
			frameOpacity: 1,
			minimumFrameWidth: 0,
			heightRatio: 0.2
		};

		this.heightRatio = args.heightRatio || this.defaults.heightRatio;
		this.defaults.gripperColor = d3.rgb(this.defaults.frameColor).darker().toString(); 

		this.configureCallbacks = [];
		this.slideCallbacks = [];

		this.previews = [];

		if (!args.width) this.widthFromGraph = true;
		if (!args.height) this.heightFromGraph = true;

		if (this.widthFromGraph || this.heightFromGraph) {
			this.graphs[0].onConfigure(function () {
				this.configure(args); this.render();
			}.bind(this));
		}

		args.width = args.width || this.graphs[0].width || this.defaults.width;
		args.height = args.height || this.graphs[0].height * this.heightRatio || this.defaults.height;

		this.configure(args);
		this.render();
	},

	onSlide: function(callback) {
		this.slideCallbacks.push(callback);
	},

	onConfigure: function(callback) {
		this.configureCallbacks.push(callback);
	},

	configure: function(args) {

		this.config = this.config || {};

		this.configureCallbacks.forEach(function(callback) {
			callback(args);
		});

		Rickshaw.keys(this.defaults).forEach(function(k) {
			this.config[k] = k in args ? args[k]
				: k in this.config ? this.config[k]
				: this.defaults[k];
		}, this);

		if ('width' in args || 'height' in args) {

			if (this.widthFromGraph) {
				this.config.width = this.graphs[0].width;
			}

			if (this.heightFromGraph) {
				this.config.height = this.graphs[0].height * this.heightRatio;
				this.previewHeight = this.config.height;
			}

			this.previews.forEach(function(preview) {

				var height = this.previewHeight / this.graphs.length - this.config.frameTopThickness * 2;
				var width = this.config.width - this.config.frameHandleThickness * 2;
				preview.setSize({ width: width, height: height });

				if (this.svg) {
					var svgHeight = height + this.config.frameHandleThickness * 2;
					var svgWidth = width + this.config.frameHandleThickness * 2;
					this.svg.style("width", svgWidth + "px");
					this.svg.style("height", svgHeight + "px");
				}
			}, this);
		}
	},

	render: function() {

		var self = this;

		this.svg = d3.select(this.element)
			.selectAll("svg.rickshaw_range_slider_preview")
			.data([null]);

		this.previewHeight = this.config.height - (this.config.frameTopThickness * 2);
		this.previewWidth = this.config.width - (this.config.frameHandleThickness * 2);

		this.currentFrame = [0, this.previewWidth];

		var buildGraph = function(parent, index) {

			var graphArgs = Rickshaw.extend({}, parent.config);
			var height = self.previewHeight / self.graphs.length;
			var renderer = parent.renderer.name;

			Rickshaw.extend(graphArgs, {
				element: this.appendChild(document.createElement("div")),
				height: height,
				width: self.previewWidth,
				series: parent.series,
				renderer: renderer
			});

			var graph = new Rickshaw.Graph(graphArgs);
			self.previews.push(graph);

			parent.onUpdate(function() { graph.render(); self.render() });

			parent.onConfigure(function(args) { 
				// don't propagate height
				delete args.height;
				args.width = args.width - self.config.frameHandleThickness * 2;
				graph.configure(args);
				graph.render();
			});

			graph.render();
		};

		var graphContainer = d3.select(this.element)
			.selectAll("div.rickshaw_range_slider_preview_container")
			.data(this.graphs);

		var translateCommand = "translate(" +
			this.config.frameHandleThickness + "px, " +
			this.config.frameTopThickness + "px)";

		graphContainer.enter()
			.append("div")
			.classed("rickshaw_range_slider_preview_container", true)
			.style("-webkit-transform", translateCommand)
			.style("-moz-transform", translateCommand)
			.style("-ms-transform", translateCommand)
			.style("transform", translateCommand)
			.each(buildGraph);

		graphContainer.exit()
			.remove();

		// Use the first graph as the "master" for the frame state
		var masterGraph = this.graphs[0];

		var domainScale = d3.scale.linear()
			.domain([0, this.previewWidth])
			.range(masterGraph.dataDomain());

		var currentWindow = [masterGraph.window.xMin, masterGraph.window.xMax];

		this.currentFrame[0] = currentWindow[0] === undefined ? 
			0 : Math.round(domainScale.invert(currentWindow[0]));

		if (this.currentFrame[0] < 0) this.currentFrame[0] = 0;

		this.currentFrame[1] = currentWindow[1] === undefined ?
			this.previewWidth : domainScale.invert(currentWindow[1]);

		if (this.currentFrame[1] - this.currentFrame[0] < self.config.minimumFrameWidth) {
			this.currentFrame[1] = (this.currentFrame[0] || 0) + self.config.minimumFrameWidth;
		}

		this.svg.enter()
			.append("svg")
			.classed("rickshaw_range_slider_preview", true)
			.style("height", this.config.height + "px")
			.style("width", this.config.width + "px")
			.style("position", "absolute")
			.style("top", 0);

		this._renderDimming();
		this._renderFrame();
		this._renderGrippers();
		this._renderHandles();
		this._renderMiddle();

		this._registerMouseEvents();
	},

	_renderDimming: function() {

		var element = this.svg
			.selectAll("path.dimming")
			.data([null]);

		element.enter()
			.append("path")
			.attr("fill", "white")
			.attr("fill-opacity", "0.7")
			.attr("fill-rule", "evenodd")
			.classed("dimming", true);

		var path = "";
		path += " M " + this.config.frameHandleThickness + " " + this.config.frameTopThickness;
		path += " h " + this.previewWidth;
		path += " v " + this.previewHeight;
		path += " h " + -this.previewWidth;
		path += " z ";
		path += " M " + Math.max(this.currentFrame[0], this.config.frameHandleThickness) + " " + this.config.frameTopThickness;
		path += " H " + Math.min(this.currentFrame[1] + this.config.frameHandleThickness * 2, this.previewWidth + this.config.frameHandleThickness);
		path += " v " + this.previewHeight;
		path += " H " + Math.max(this.currentFrame[0], this.config.frameHandleThickness);
		path += " z";

		element.attr("d", path);
	},

	_renderFrame: function() {

		var element = this.svg
			.selectAll("path.frame")
			.data([null]);

		element.enter()
			.append("path")
			.attr("stroke", "white")
			.attr("stroke-width", "1px")
			.attr("stroke-linejoin", "round")
			.attr("fill", this.config.frameColor)
			.attr("fill-opacity", this.config.frameOpacity)
			.attr("fill-rule", "evenodd")
			.classed("frame", true);

		var path = "";
		path += " M " + this.currentFrame[0] + " 0";
		path += " H " + (this.currentFrame[1] + (this.config.frameHandleThickness * 2));
		path += " V " + this.config.height;
		path += " H " + (this.currentFrame[0]);
		path += " z";
		path += " M " + (this.currentFrame[0] + this.config.frameHandleThickness) + " " + this.config.frameTopThickness;
		path += " H " + (this.currentFrame[1] + this.config.frameHandleThickness);
		path += " v " + this.previewHeight;
		path += " H " + (this.currentFrame[0] + this.config.frameHandleThickness);
		path += " z";

		element.attr("d", path);
	},

	_renderGrippers: function() {

		var gripper = this.svg.selectAll("path.gripper")
			.data([null]);

		gripper.enter()
			.append("path")
			.attr("stroke", this.config.gripperColor)
			.classed("gripper", true);

		var path = "";

		[0.4, 0.6].forEach(function(spacing) {
			path += " M " + Math.round((this.currentFrame[0] + (this.config.frameHandleThickness * spacing))) + " " + Math.round(this.config.height * 0.3);
			path += " V " + Math.round(this.config.height * 0.7);
			path += " M " + Math.round((this.currentFrame[1] + (this.config.frameHandleThickness * (1 + spacing)))) + " " + Math.round(this.config.height * 0.3);
			path += " V " + Math.round(this.config.height * 0.7);
		}.bind(this));

		gripper.attr("d", path);
	},

	_renderHandles: function() {

		var leftHandle = this.svg.selectAll("rect.left_handle")
			.data([null]);

		leftHandle.enter()
			.append("rect")
			.attr('width', this.config.frameHandleThickness)
			.style("cursor", "ew-resize")
			.style("fill-opacity", "0")
			.classed("left_handle", true);

		leftHandle
			.attr('x', this.currentFrame[0])
			.attr('height', this.config.height);

		var rightHandle = this.svg.selectAll("rect.right_handle")
			.data([null]);

		rightHandle.enter()
			.append("rect")
			.attr('width', this.config.frameHandleThickness)
			.style("cursor", "ew-resize")
			.style("fill-opacity", "0")
			.classed("right_handle", true);

		rightHandle
			.attr('x', this.currentFrame[1] + this.config.frameHandleThickness)
			.attr('height', this.config.height);
	},

	_renderMiddle: function() {

		var middleHandle = this.svg.selectAll("rect.middle_handle")
			.data([null]);

		middleHandle.enter()
			.append("rect")
			.style("cursor", "move")
			.style("fill-opacity", "0")
			.classed("middle_handle", true);

		middleHandle
			.attr('width', Math.max(0, this.currentFrame[1] - this.currentFrame[0]))
			.attr('x', this.currentFrame[0] + this.config.frameHandleThickness)
			.attr('height', this.config.height);
	},

	_registerMouseEvents: function() {

		var element = d3.select(this.element);

		var drag = {
			target: null,
			start: null,
			stop: null,
			left: false,
			right: false,
			rigid: false
		};

		var self = this;

		function onMousemove(datum, index) {

			drag.stop = self._getClientXFromEvent(d3.event, drag);
			var distanceTraveled = drag.stop - drag.start;
			var frameAfterDrag = self.frameBeforeDrag.slice(0);
			var minimumFrameWidth = self.config.minimumFrameWidth;

			if (drag.rigid) {
				minimumFrameWidth = self.frameBeforeDrag[1] - self.frameBeforeDrag[0];
			}
			if (drag.left) {
				frameAfterDrag[0] = Math.max(frameAfterDrag[0] + distanceTraveled, 0);
			}
			if (drag.right) {
				frameAfterDrag[1] = Math.min(frameAfterDrag[1] + distanceTraveled, self.previewWidth);
			}

			var currentFrameWidth = frameAfterDrag[1] - frameAfterDrag[0];

			if (currentFrameWidth <= minimumFrameWidth) {

				if (drag.left) {
					frameAfterDrag[0] = frameAfterDrag[1] - minimumFrameWidth;
				}
				if (drag.right) {
					frameAfterDrag[1] = frameAfterDrag[0] + minimumFrameWidth;
				}
				if (frameAfterDrag[0] <= 0) {
					frameAfterDrag[1] -= frameAfterDrag[0];
					frameAfterDrag[0] = 0;
				}
				if (frameAfterDrag[1] >= self.previewWidth) {
					frameAfterDrag[0] -= (frameAfterDrag[1] - self.previewWidth);
					frameAfterDrag[1] = self.previewWidth;
				}
			}

			self.graphs.forEach(function(graph) {

				var domainScale = d3.scale.linear()
					.interpolate(d3.interpolateNumber)
					.domain([0, self.previewWidth])
					.range(graph.dataDomain());

				var windowAfterDrag = [
					domainScale(frameAfterDrag[0]),
					domainScale(frameAfterDrag[1])
				];

				self.slideCallbacks.forEach(function(callback) {
					callback(graph, windowAfterDrag[0], windowAfterDrag[1]);
				});

				if (frameAfterDrag[0] === 0) {
					windowAfterDrag[0] = undefined;
				}
				if (frameAfterDrag[1] === self.previewWidth) {
					windowAfterDrag[1] = undefined;
				}
				graph.window.xMin = windowAfterDrag[0];
				graph.window.xMax = windowAfterDrag[1];

				graph.update();
			});
		}

		function onMousedown() {
			drag.target = d3.event.target;
			drag.start = self._getClientXFromEvent(d3.event, drag);
			self.frameBeforeDrag = self.currentFrame.slice();
			d3.event.preventDefault ? d3.event.preventDefault() : d3.event.returnValue = false;
			d3.select(document).on("mousemove.rickshaw_range_slider_preview", onMousemove);
			d3.select(document).on("mouseup.rickshaw_range_slider_preview", onMouseup);
			d3.select(document).on("touchmove.rickshaw_range_slider_preview", onMousemove);
			d3.select(document).on("touchend.rickshaw_range_slider_preview", onMouseup);
			d3.select(document).on("touchcancel.rickshaw_range_slider_preview", onMouseup);
		}

		function onMousedownLeftHandle(datum, index) {
			drag.left = true;
			onMousedown();
		}

		function onMousedownRightHandle(datum, index) {
			drag.right = true;
			onMousedown();
		}

		function onMousedownMiddleHandle(datum, index) {
			drag.left = true;
			drag.right = true;
			drag.rigid = true;
			onMousedown();
		}

		function onMouseup(datum, index) {
			d3.select(document).on("mousemove.rickshaw_range_slider_preview", null);
			d3.select(document).on("mouseup.rickshaw_range_slider_preview", null);
			d3.select(document).on("touchmove.rickshaw_range_slider_preview", null);
			d3.select(document).on("touchend.rickshaw_range_slider_preview", null);
			d3.select(document).on("touchcancel.rickshaw_range_slider_preview", null);
			delete self.frameBeforeDrag;
			drag.left = false;
			drag.right = false;
			drag.rigid = false;
		}

		element.select("rect.left_handle").on("mousedown", onMousedownLeftHandle);
		element.select("rect.right_handle").on("mousedown", onMousedownRightHandle);
		element.select("rect.middle_handle").on("mousedown", onMousedownMiddleHandle);
		element.select("rect.left_handle").on("touchstart", onMousedownLeftHandle);
		element.select("rect.right_handle").on("touchstart", onMousedownRightHandle);
		element.select("rect.middle_handle").on("touchstart", onMousedownMiddleHandle);
	},

	_getClientXFromEvent: function(event, drag) {

		switch (event.type) {
			case 'touchstart':
			case 'touchmove':
				var touchList = event.changedTouches;
				var touch = null;
				for (var touchIndex = 0; touchIndex < touchList.length; touchIndex++) {
					if (touchList[touchIndex].target === drag.target) {
						touch = touchList[touchIndex];
						break;
					}
				}
				return touch !== null ? touch.clientX : undefined;

			default:
				return event.clientX;
		}
	}
});

Rickshaw.namespace("Rickshaw.Graph.Renderer");

Rickshaw.Graph.Renderer = Rickshaw.Class.create( {

	initialize: function(args) {
		this.graph = args.graph;
		this.tension = args.tension || this.tension;
		this.configure(args);
	},

	seriesPathFactory: function() {
		//implement in subclass
	},

	seriesStrokeFactory: function() {
		// implement in subclass
	},

	defaults: function() {
		return {
			tension: 0.8,
			strokeWidth: 2,
			unstack: true,
			padding: { top: 0.01, right: 0, bottom: 0.01, left: 0 },
			stroke: false,
			fill: false
		};
	},

	domain: function(data) {
		// Requires that at least one series contains some data
		var stackedData = data || this.graph.stackedData || this.graph.stackData();

		var xMin = +Infinity;
		var xMax = -Infinity;

		var yMin = +Infinity;
		var yMax = -Infinity;

		stackedData.forEach( function(series) {

			series.forEach( function(d) {

				if (d.y == null) return;

				var y = d.y + d.y0;

				if (y < yMin) yMin = y;
				if (y > yMax) yMax = y;
			} );

			if (!series.length) return;

			if (series[0].x < xMin) xMin = series[0].x;
			if (series[series.length - 1].x > xMax) xMax = series[series.length - 1].x;
		} );

		xMin -= (xMax - xMin) * this.padding.left;
		xMax += (xMax - xMin) * this.padding.right;

		yMin = this.graph.min === 'auto' ? yMin : this.graph.min || 0;
		yMax = this.graph.max === undefined ? yMax : this.graph.max;

		if (this.graph.min === 'auto' || yMin < 0) {
			yMin -= (yMax - yMin) * this.padding.bottom;
		}

		if (this.graph.max === undefined) {
			yMax += (yMax - yMin) * this.padding.top;
		}

		return { x: [xMin, xMax], y: [yMin, yMax] };
	},

	render: function(args) {

		args = args || {};

		var graph = this.graph;
		var series = args.series || graph.series;

		var vis = args.vis || graph.vis;
		vis.selectAll('*').remove();

		var data = series
			.filter(function(s) { return !s.disabled })
			.map(function(s) { return s.stack });

		var pathNodes = vis.selectAll("path.path")
			.data(data)
			.enter().append("svg:path")
			.classed('path', true)
			.attr("d", this.seriesPathFactory());

		if (this.stroke) {
                        var strokeNodes = vis.selectAll('path.stroke')
                                .data(data)
                                .enter().append("svg:path")
				.classed('stroke', true)
				.attr("d", this.seriesStrokeFactory());
		}

		var i = 0;
		series.forEach( function(series) {
			if (series.disabled) return;
			series.path = pathNodes[0][i];
			if (this.stroke) series.stroke = strokeNodes[0][i];
			this._styleSeries(series);
			i++;
		}, this );

	},

	_styleSeries: function(series) {

		var fill = this.fill ? series.color : 'none';
		var stroke = this.stroke ? series.color : 'none';

		series.path.setAttribute('fill', fill);
		series.path.setAttribute('stroke', stroke);
		series.path.setAttribute('stroke-width', this.strokeWidth);

		if (series.className) {
			d3.select(series.path).classed(series.className, true);
		}
		if (series.className && this.stroke) {
			d3.select(series.stroke).classed(series.className, true);
		}
	},

	configure: function(args) {

		args = args || {};

		Rickshaw.keys(this.defaults()).forEach( function(key) {

			if (!args.hasOwnProperty(key)) {
				this[key] = this[key] || this.graph[key] || this.defaults()[key];
				return;
			}

			if (typeof this.defaults()[key] == 'object') {

				Rickshaw.keys(this.defaults()[key]).forEach( function(k) {

					this[key][k] =
						args[key][k] !== undefined ? args[key][k] :
						this[key][k] !== undefined ? this[key][k] :
						this.defaults()[key][k];
				}, this );

			} else {
				this[key] =
					args[key] !== undefined ? args[key] :
					this[key] !== undefined ? this[key] :
					this.graph[key] !== undefined ? this.graph[key] :
					this.defaults()[key];
			}

		}, this );
	},

	setStrokeWidth: function(strokeWidth) {
		if (strokeWidth !== undefined) {
			this.strokeWidth = strokeWidth;
		}
	},

	setTension: function(tension) {
		if (tension !== undefined) {
			this.tension = tension;
		}
	}
} );

Rickshaw.namespace('Rickshaw.Graph.Renderer.Line');

Rickshaw.Graph.Renderer.Line = Rickshaw.Class.create( Rickshaw.Graph.Renderer, {

	name: 'line',

	defaults: function($super) {

		return Rickshaw.extend( $super(), {
			unstack: true,
			fill: false,
			stroke: true
		} );
	},

	seriesPathFactory: function() {

		var graph = this.graph;

		var factory = d3.svg.line()
			.x( function(d) { return graph.x(d.x) } )
			.y( function(d) { return graph.y(d.y) } )
			.interpolate(this.graph.interpolation).tension(this.tension);

		factory.defined && factory.defined( function(d) { return d.y !== null } );
		return factory;
	}
} );

Rickshaw.namespace('Rickshaw.Graph.Renderer.Stack');

Rickshaw.Graph.Renderer.Stack = Rickshaw.Class.create( Rickshaw.Graph.Renderer, {

	name: 'stack',

	defaults: function($super) {

		return Rickshaw.extend( $super(), {
			fill: true,
			stroke: false,
			unstack: false
		} );
	},

	seriesPathFactory: function() {

		var graph = this.graph;

		var factory = d3.svg.area()
			.x( function(d) { return graph.x(d.x) } )
			.y0( function(d) { return graph.y(d.y0) } )
			.y1( function(d) { return graph.y(d.y + d.y0) } )
			.interpolate(this.graph.interpolation).tension(this.tension);

		factory.defined && factory.defined( function(d) { return d.y !== null } );
		return factory;
	}
} );

Rickshaw.namespace('Rickshaw.Graph.Renderer.Bar');

Rickshaw.Graph.Renderer.Bar = Rickshaw.Class.create( Rickshaw.Graph.Renderer, {

	name: 'bar',

	defaults: function($super) {

		var defaults = Rickshaw.extend( $super(), {
			gapSize: 0.05,
			unstack: false
		} );

		delete defaults.tension;
		return defaults;
	},

	initialize: function($super, args) {
		args = args || {};
		this.gapSize = args.gapSize || this.gapSize;
		$super(args);
	},

	domain: function($super) {

		var domain = $super();

		var frequentInterval = this._frequentInterval(this.graph.stackedData.slice(-1).shift());
		domain.x[1] += Number(frequentInterval.magnitude);

		return domain;
	},

	barWidth: function(series) {

		var frequentInterval = this._frequentInterval(series.stack);
		var barWidth = this.graph.x.magnitude(frequentInterval.magnitude) * (1 - this.gapSize);

		return barWidth;
	},

	render: function(args) {

		args = args || {};

		var graph = this.graph;
		var series = args.series || graph.series;

		var vis = args.vis || graph.vis;
		vis.selectAll('*').remove();

		var barWidth = this.barWidth(series.active()[0]);
		var barXOffset = 0;

		var activeSeriesCount = series.filter( function(s) { return !s.disabled; } ).length;
		var seriesBarWidth = this.unstack ? barWidth / activeSeriesCount : barWidth;

		var transform = function(d) {
			// add a matrix transform for negative values
			var matrix = [ 1, 0, 0, (d.y < 0 ? -1 : 1), 0, (d.y < 0 ? graph.y.magnitude(Math.abs(d.y)) * 2 : 0) ];
			return "matrix(" + matrix.join(',') + ")";
		};

		series.forEach( function(series) {

			if (series.disabled) return;

			var barWidth = this.barWidth(series);

			var nodes = vis.selectAll("path")
				.data(series.stack.filter( function(d) { return d.y !== null } ))
				.enter().append("svg:rect")
				.attr("x", function(d) { return graph.x(d.x) + barXOffset })
				.attr("y", function(d) { return (graph.y(d.y0 + Math.abs(d.y))) * (d.y < 0 ? -1 : 1 ) })
				.attr("width", seriesBarWidth)
				.attr("height", function(d) { return graph.y.magnitude(Math.abs(d.y)) })
				.attr("transform", transform);

			Array.prototype.forEach.call(nodes[0], function(n) {
				n.setAttribute('fill', series.color);
			} );

			if (this.unstack) barXOffset += seriesBarWidth;

		}, this );
	},

	_frequentInterval: function(data) {

		var intervalCounts = {};

		for (var i = 0; i < data.length - 1; i++) {
			var interval = data[i + 1].x - data[i].x;
			intervalCounts[interval] = intervalCounts[interval] || 0;
			intervalCounts[interval]++;
		}

		var frequentInterval = { count: 0, magnitude: 1 };

		Rickshaw.keys(intervalCounts).forEach( function(i) {
			if (frequentInterval.count < intervalCounts[i]) {
				frequentInterval = {
					count: intervalCounts[i],
					magnitude: i
				};
			}
		} );

		return frequentInterval;
	}
} );

Rickshaw.namespace('Rickshaw.Graph.Renderer.Area');

Rickshaw.Graph.Renderer.Area = Rickshaw.Class.create( Rickshaw.Graph.Renderer, {

	name: 'area',

	defaults: function($super) {

		return Rickshaw.extend( $super(), {
			unstack: false,
			fill: false,
			stroke: false
		} );
	},

	seriesPathFactory: function() {

		var graph = this.graph;

		var factory = d3.svg.area()
			.x( function(d) { return graph.x(d.x) } )
			.y0( function(d) { return graph.y(d.y0) } )
			.y1( function(d) { return graph.y(d.y + d.y0) } )
			.interpolate(graph.interpolation).tension(this.tension);

		factory.defined && factory.defined( function(d) { return d.y !== null } );
		return factory;
	},

	seriesStrokeFactory: function() {

		var graph = this.graph;

		var factory = d3.svg.line()
			.x( function(d) { return graph.x(d.x) } )
			.y( function(d) { return graph.y(d.y + d.y0) } )
			.interpolate(graph.interpolation).tension(this.tension);

		factory.defined && factory.defined( function(d) { return d.y !== null } );
		return factory;
	},

	render: function(args) {

		args = args || {};

		var graph = this.graph;
		var series = args.series || graph.series;

		var vis = args.vis || graph.vis;
		vis.selectAll('*').remove();

		// insert or stacked areas so strokes lay on top of areas
		var method = this.unstack ? 'append' : 'insert';

		var data = series
			.filter(function(s) { return !s.disabled })
			.map(function(s) { return s.stack });

		var nodes = vis.selectAll("path")
			.data(data)
			.enter()[method]("svg:g", 'g');

		nodes.append("svg:path")
			.attr("d", this.seriesPathFactory())
			.attr("class", 'area');

		if (this.stroke) {
			nodes.append("svg:path")
				.attr("d", this.seriesStrokeFactory())
				.attr("class", 'line');
		}

		var i = 0;
		series.forEach( function(series) {
			if (series.disabled) return;
			series.path = nodes[0][i++];
			this._styleSeries(series);
		}, this );
	},

	_styleSeries: function(series) {

		if (!series.path) return;

		d3.select(series.path).select('.area')
			.attr('fill', series.color);

		if (this.stroke) {
			d3.select(series.path).select('.line')
				.attr('fill', 'none')
				.attr('stroke', series.stroke || d3.interpolateRgb(series.color, 'black')(0.125))
				.attr('stroke-width', this.strokeWidth);
		}

		if (series.className) {
			series.path.setAttribute('class', series.className);
		}
	}
} );

Rickshaw.namespace('Rickshaw.Graph.Renderer.ScatterPlot');

Rickshaw.Graph.Renderer.ScatterPlot = Rickshaw.Class.create( Rickshaw.Graph.Renderer, {

	name: 'scatterplot',

	defaults: function($super) {

		return Rickshaw.extend( $super(), {
			unstack: true,
			fill: true,
			stroke: false,
			padding:{ top: 0.01, right: 0.01, bottom: 0.01, left: 0.01 },
			dotSize: 4
		} );
	},

	initialize: function($super, args) {
		$super(args);
	},

	render: function(args) {

		args = args || {};

		var graph = this.graph;

		var series = args.series || graph.series;
		var vis = args.vis || graph.vis;

		var dotSize = this.dotSize;

		vis.selectAll('*').remove();

		series.forEach( function(series) {

			if (series.disabled) return;

			var nodes = vis.selectAll("path")
				.data(series.stack.filter( function(d) { return d.y !== null } ))
				.enter().append("svg:circle")
					.attr("cx", function(d) { return graph.x(d.x) })
					.attr("cy", function(d) { return graph.y(d.y) })
					.attr("r", function(d) { return ("r" in d) ? d.r : dotSize});
			if (series.className) {
				nodes.classed(series.className, true);
			}
			
			Array.prototype.forEach.call(nodes[0], function(n) {
				n.setAttribute('fill', series.color);
			} );

		}, this );
	}
} );
Rickshaw.namespace('Rickshaw.Graph.Renderer.Multi');

Rickshaw.Graph.Renderer.Multi = Rickshaw.Class.create( Rickshaw.Graph.Renderer, {

	name: 'multi',

	initialize: function($super, args) {

		$super(args);
	},

	defaults: function($super) {

		return Rickshaw.extend( $super(), {
			unstack: true,
			fill: false,
			stroke: true 
		} );
	},

	configure: function($super, args) {

		args = args || {};
		this.config = args;
		$super(args);
	},

	domain: function($super) {

		this.graph.stackData();

		var domains = [];

		var groups = this._groups();
		this._stack(groups);

		groups.forEach( function(group) {

			var data = group.series
				.filter( function(s) { return !s.disabled } )
				.map( function(s) { return s.stack });

			if (!data.length) return;
			
			var domain = null;
			if (group.renderer && group.renderer.domain) {
				domain = group.renderer.domain(data);
			}
			else {
				domain = $super(data);
			}
			domains.push(domain);
		});

		var xMin = d3.min(domains.map( function(d) { return d.x[0] } ));
		var xMax = d3.max(domains.map( function(d) { return d.x[1] } ));
		var yMin = d3.min(domains.map( function(d) { return d.y[0] } ));
		var yMax = d3.max(domains.map( function(d) { return d.y[1] } ));

		return { x: [xMin, xMax], y: [yMin, yMax] };
	},

	_groups: function() {

		var graph = this.graph;

		var renderGroups = {};

		graph.series.forEach( function(series) {

			if (series.disabled) return;

			if (!renderGroups[series.renderer]) {

				var ns = "http://www.w3.org/2000/svg";
				var vis = document.createElementNS(ns, 'g');

				graph.vis[0][0].appendChild(vis);

				var renderer = graph._renderers[series.renderer];

				var config = {};

				var defaults = [ this.defaults(), renderer.defaults(), this.config, this.graph ];
				defaults.forEach(function(d) { Rickshaw.extend(config, d) });

				renderer.configure(config);

				renderGroups[series.renderer] = {
					renderer: renderer,
					series: [],
					vis: d3.select(vis)
				};
			}
				
			renderGroups[series.renderer].series.push(series);

		}, this);

		var groups = [];

		Object.keys(renderGroups).forEach( function(key) {
			var group = renderGroups[key];
			groups.push(group);
		});

		return groups;
	},

	_stack: function(groups) {

		groups.forEach( function(group) {

			var series = group.series
				.filter( function(series) { return !series.disabled } );

			var data = series
				.map( function(series) { return series.stack } );

			if (!group.renderer.unstack) {

				var layout = d3.layout.stack();
				var stackedData = Rickshaw.clone(layout(data));

				series.forEach( function(series, index) {
					series._stack = Rickshaw.clone(stackedData[index]);
				});
			}

		}, this );

		return groups;

	},

	render: function() {

		this.graph.series.forEach( function(series) {
			if (!series.renderer) {
				throw new Error("Each series needs a renderer for graph 'multi' renderer");
			}
		});

		this.graph.vis.selectAll('*').remove();

		var groups = this._groups();
		groups = this._stack(groups);

		groups.forEach( function(group) {

			var series = group.series
				.filter( function(series) { return !series.disabled } );

			series.active = function() { return series };

			group.renderer.render({ series: series, vis: group.vis });
			series.forEach(function(s) { s.stack = s._stack || s.stack || s.data; });
		});
	}

} );
Rickshaw.namespace('Rickshaw.Graph.Renderer.LinePlot');

Rickshaw.Graph.Renderer.LinePlot = Rickshaw.Class.create( Rickshaw.Graph.Renderer, {

	name: 'lineplot',

	defaults: function($super) {

		return Rickshaw.extend( $super(), {
			unstack: true,
			fill: false,
			stroke: true,
			padding:{ top: 0.01, right: 0.01, bottom: 0.01, left: 0.01 },
			dotSize: 3,
			strokeWidth: 2
		} );
	},

	seriesPathFactory: function() {

		var graph = this.graph;

		var factory = d3.svg.line()
			.x( function(d) { return graph.x(d.x) } )
			.y( function(d) { return graph.y(d.y) } )
			.interpolate(this.graph.interpolation).tension(this.tension);

		factory.defined && factory.defined( function(d) { return d.y !== null } );
		return factory;
	},

	render: function(args) {

		args = args || {};

		var graph = this.graph;

		var series = args.series || graph.series;
		var vis = args.vis || graph.vis;

		var dotSize = this.dotSize;

		vis.selectAll('*').remove();

		var data = series
			.filter(function(s) { return !s.disabled })
			.map(function(s) { return s.stack });

		var nodes = vis.selectAll("path")
			.data(data)
			.enter().append("svg:path")
			.attr("d", this.seriesPathFactory());

		var i = 0;
		series.forEach(function(series) {
			if (series.disabled) return;
			series.path = nodes[0][i++];
			this._styleSeries(series);
		}, this);

		series.forEach(function(series) {

			if (series.disabled) return;

			var nodes = vis.selectAll("x")
				.data(series.stack.filter( function(d) { return d.y !== null } ))
				.enter().append("svg:circle")
				.attr("cx", function(d) { return graph.x(d.x) })
				.attr("cy", function(d) { return graph.y(d.y) })
				.attr("r", function(d) { return ("r" in d) ? d.r : dotSize});

			Array.prototype.forEach.call(nodes[0], function(n) {
				if (!n) return;
				n.setAttribute('data-color', series.color);
				n.setAttribute('fill', 'white');
				n.setAttribute('stroke', series.color);
				n.setAttribute('stroke-width', this.strokeWidth);

			}.bind(this));

		}, this);
	}
} );

Rickshaw.namespace('Rickshaw.Graph.Smoother');

Rickshaw.Graph.Smoother = Rickshaw.Class.create({

	initialize: function(args) {

		this.graph = args.graph;
		this.element = args.element;
		this.aggregationScale = 1;

		this.build();

		this.graph.stackData.hooks.data.push( {
			name: 'smoother',
			orderPosition: 50,
			f: this.transformer.bind(this)
		} );
	},

	build: function() {

		var self = this;
		var $ = jQuery;

		if (this.element) {
			$( function() {
				$(self.element).slider( {
					min: 1,
					max: 100,
					slide: function( event, ui ) {
						self.setScale(ui.value);
						self.graph.update();
					}
				} );
			} );
		}
	},

	setScale: function(scale) {

		if (scale < 1) {
			throw "scale out of range: " + scale;
		}

		this.aggregationScale = scale;
		this.graph.update();
	},

	transformer: function(data) {

		if (this.aggregationScale == 1) return data;

		var aggregatedData = [];

		data.forEach( function(seriesData) {

			var aggregatedSeriesData = [];

			while (seriesData.length) {

				var avgX = 0, avgY = 0;
				var slice = seriesData.splice(0, this.aggregationScale);

				slice.forEach( function(d) {
					avgX += d.x / slice.length;
					avgY += d.y / slice.length;
				} );

				aggregatedSeriesData.push( { x: avgX, y: avgY } );
			}

			aggregatedData.push(aggregatedSeriesData);

		}.bind(this) );

		return aggregatedData;
	}
});

Rickshaw.namespace('Rickshaw.Graph.Socketio');

Rickshaw.Graph.Socketio = Rickshaw.Class.create( Rickshaw.Graph.Ajax, {
	request: function() {
		var socket = io.connect(this.dataURL);
		var self = this;
		socket.on('rickshaw', function (data) {
			self.success(data);
		});
	}
} );
Rickshaw.namespace('Rickshaw.Series');

Rickshaw.Series = Rickshaw.Class.create( Array, {

	initialize: function (data, palette, options) {

		options = options || {};

		this.palette = new Rickshaw.Color.Palette(palette);

		this.timeBase = typeof(options.timeBase) === 'undefined' ? 
			Math.floor(new Date().getTime() / 1000) : 
			options.timeBase;

		var timeInterval = typeof(options.timeInterval) == 'undefined' ?
			1000 :
			options.timeInterval;

		this.setTimeInterval(timeInterval);

		if (data && (typeof(data) == "object") && Array.isArray(data)) {
			data.forEach( function(item) { this.addItem(item) }, this );
		}
	},

	addItem: function(item) {

		if (typeof(item.name) === 'undefined') {
			throw('addItem() needs a name');
		}

		item.color = (item.color || this.palette.color(item.name));
		item.data = (item.data || []);

		// backfill, if necessary
		if ((item.data.length === 0) && this.length && (this.getIndex() > 0)) {
			this[0].data.forEach( function(plot) {
				item.data.push({ x: plot.x, y: 0 });
			} );
		} else if (item.data.length === 0) {
			item.data.push({ x: this.timeBase - (this.timeInterval || 0), y: 0 });
		} 

		this.push(item);

		if (this.legend) {
			this.legend.addLine(this.itemByName(item.name));
		}
	},

	addData: function(data, x) {

		var index = this.getIndex();

		Rickshaw.keys(data).forEach( function(name) {
			if (! this.itemByName(name)) {
				this.addItem({ name: name });
			}
		}, this );

		this.forEach( function(item) {
			item.data.push({ 
				x: x || (index * this.timeInterval || 1) + this.timeBase, 
				y: (data[item.name] || 0) 
			});
		}, this );
	},

	getIndex: function () {
		return (this[0] && this[0].data && this[0].data.length) ? this[0].data.length : 0;
	},

	itemByName: function(name) {

		for (var i = 0; i < this.length; i++) {
			if (this[i].name == name)
				return this[i];
		}
	},

	setTimeInterval: function(iv) {
		this.timeInterval = iv / 1000;
	},

	setTimeBase: function (t) {
		this.timeBase = t;
	},

	dump: function() {

		var data = {
			timeBase: this.timeBase,
			timeInterval: this.timeInterval,
			items: []
		};

		this.forEach( function(item) {

			var newItem = {
				color: item.color,
				name: item.name,
				data: []
			};

			item.data.forEach( function(plot) {
				newItem.data.push({ x: plot.x, y: plot.y });
			} );

			data.items.push(newItem);
		} );

		return data;
	},

	load: function(data) {

		if (data.timeInterval) {
			this.timeInterval = data.timeInterval;
		}

		if (data.timeBase) {
			this.timeBase = data.timeBase;
		}

		if (data.items) {
			data.items.forEach( function(item) {
				this.push(item);
				if (this.legend) {
					this.legend.addLine(this.itemByName(item.name));
				}

			}, this );
		}
	}
} );

Rickshaw.Series.zeroFill = function(series) {
	Rickshaw.Series.fill(series, 0);
};

Rickshaw.Series.fill = function(series, fill) {

	var x;
	var i = 0;

	var data = series.map( function(s) { return s.data } );

	while ( i < Math.max.apply(null, data.map( function(d) { return d.length } )) ) {

		x = Math.min.apply( null, 
			data
				.filter(function(d) { return d[i] })
				.map(function(d) { return d[i].x })
		);

		data.forEach( function(d) {
			if (!d[i] || d[i].x != x) {
				d.splice(i, 0, { x: x, y: fill });
			}
		} );

		i++;
	}
};

Rickshaw.namespace('Rickshaw.Series.FixedDuration');

Rickshaw.Series.FixedDuration = Rickshaw.Class.create(Rickshaw.Series, {

	initialize: function (data, palette, options) {

		options = options || {};

		if (typeof(options.timeInterval) === 'undefined') {
			throw new Error('FixedDuration series requires timeInterval');
		}

		if (typeof(options.maxDataPoints) === 'undefined') {
			throw new Error('FixedDuration series requires maxDataPoints');
		}

		this.palette = new Rickshaw.Color.Palette(palette);
		this.timeBase = typeof(options.timeBase) === 'undefined' ? Math.floor(new Date().getTime() / 1000) : options.timeBase;
		this.setTimeInterval(options.timeInterval);

		if (this[0] && this[0].data && this[0].data.length) {
			this.currentSize = this[0].data.length;
			this.currentIndex = this[0].data.length;
		} else {
			this.currentSize  = 0;
			this.currentIndex = 0;
		}

		this.maxDataPoints = options.maxDataPoints;


		if (data && (typeof(data) == "object") && Array.isArray(data)) {
			data.forEach( function (item) { this.addItem(item) }, this );
			this.currentSize  += 1;
			this.currentIndex += 1;
		}

		// reset timeBase for zero-filled values if needed
		this.timeBase -= (this.maxDataPoints - this.currentSize) * this.timeInterval;

		// zero-fill up to maxDataPoints size if we don't have that much data yet
		if ((typeof(this.maxDataPoints) !== 'undefined') && (this.currentSize < this.maxDataPoints)) {
			for (var i = this.maxDataPoints - this.currentSize - 1; i > 1; i--) {
				this.currentSize  += 1;
				this.currentIndex += 1;
				this.forEach( function (item) {
					item.data.unshift({ x: ((i-1) * this.timeInterval || 1) + this.timeBase, y: 0, i: i });
				}, this );
			}
		}
	},

	addData: function($super, data, x) {

		$super(data, x);

		this.currentSize += 1;
		this.currentIndex += 1;

		if (this.maxDataPoints !== undefined) {
			while (this.currentSize > this.maxDataPoints) {
				this.dropData();
			}
		}
	},

	dropData: function() {

		this.forEach(function(item) {
			item.data.splice(0, 1);
		} );

		this.currentSize -= 1;
	},

	getIndex: function () {
		return this.currentIndex;
	}
} );

	return Rickshaw;
}));

//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,w=Object.keys,_=i.bind,j=function(n){return n instanceof j?n:this instanceof j?(this._wrapped=n,void 0):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.5.2";var A=j.each=j.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a=j.keys(n),u=0,i=a.length;i>u;u++)if(t.call(e,n[a[u]],a[u],n)===r)return};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var E="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(E);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(E);return r},j.find=j.detect=function(n,t,r){var e;return O(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var O=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:O(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,function(n){return n[t]})},j.where=function(n,t,r){return j.isEmpty(t)?r?void 0:[]:j[r?"find":"filter"](n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},j.findWhere=function(n,t){return j.where(n,t,!0)},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);if(!t&&j.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>e.computed&&(e={value:n,computed:a})}),e.value},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);if(!t&&j.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a<e.computed&&(e={value:n,computed:a})}),e.value},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return arguments.length<2||r?n[j.random(n.length-1)]:j.shuffle(n).slice(0,Math.max(0,t))};var k=function(n){return j.isFunction(n)?n:function(t){return t[n]}};j.sortBy=function(n,t,r){var e=k(t);return j.pluck(j.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={},i=null==r?j.identity:k(r);return A(t,function(r,a){var o=i.call(e,r,a,t);n(u,o,r)}),u}};j.groupBy=F(function(n,t,r){(j.has(n,t)?n[t]:n[t]=[]).push(r)}),j.indexBy=F(function(n,t,r){n[t]=r}),j.countBy=F(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=null==r?j.identity:k(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.indexOf(t,n)>=0})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var R=function(){};j.bind=function(n,t){var r,e;if(_&&n.bind===_)return _.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));R.prototype=n.prototype;var u=new R;R.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){return n.apply(this,t.concat(o.call(arguments)))}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:new Date,a=null,i=n.apply(e,u)};return function(){var l=new Date;o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u)):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o;return function(){i=this,u=arguments,a=new Date;var c=function(){var l=new Date-a;t>l?e=setTimeout(c,t-l):(e=null,r||(o=n.apply(i,u)))},l=r&&!e;return e||(e=setTimeout(c,t)),l&&(o=n.apply(i,u)),o}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=w||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))};var I={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};I.unescape=j.invert(I.escape);var T={escape:new RegExp("["+j.keys(I.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(I.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(T[n],function(t){return I[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);
//# sourceMappingURL=underscore-min.map
//# sourceMappingURL=theme.js.map
