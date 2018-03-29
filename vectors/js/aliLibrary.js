/**
* Test ali2d JS Library v 1.0.0
*/
;(function(global){
	"use strict";
	
	var document = global.document;
	var canvas;
	var context;

	

	var cWidth;
	var cHeight;
	var cOriginX;
	var cOriginY;

	//Цена деления
	var del = 25;
	var delLength = 4;
	var drawGrid = true;
	var defaultStyles = {
		strokeStyle : "#000",
		lineWidth 	: 1
	}

	var clearStyles = function(){
		setStyles(defaultStyles);
	};


	var setStyles = function(styles){
		if(typeof styles == "object"){
			for(var item in styles){
				context[item] = styles[item];
			}
		}else{
			context.strokeStyle = "#f00";
		}
	};


	var drawLine = function(x1,y1,x2,y2,styles){

		context.beginPath();
		context.moveTo(x1,y1);
		context.lineTo(x2,y2);
		if(typeof styles == "object"){
			setStyles(styles);
		}
		
		context.stroke();

	};

	var drawCoords = function(){
		/**
		*Рисуем систему координат
		*/
		var styles = {strokeStyle:"#f00"};

		//Рисуем ось X
		drawLine(0,cOriginY,cWidth,cOriginY,styles);

		//Рисуем ось Y
		drawLine(cOriginX,0,cOriginX,cHeight,styles);
		
		//Меняем начальную точку системы координат
		context.translate(cOriginX,cOriginY);

		//Делим ось X на отрезки;
		for (var i = del, j = -del; i < cOriginX , j > -cOriginX ; i = i + del,j = j - del) {
			drawLine(i,0-delLength,i,0+delLength,styles);
			drawLine(j,0-delLength,j,0+delLength,styles);
		}


		//Делим ось Y на отрезки;
		for (var i = del, j = -del; i < cOriginY , j > -cOriginY ; i = i + del,j = j - del) {
			drawLine(0-delLength,i,0+delLength,i,styles);
			drawLine(0-delLength,j,0+delLength,j,styles);
		}
	};


	var toDrawGrid = function(){
		if(!drawGrid) return;

		var styles = {strokeStyle:"#00f",lineWidth:0.2};

		//Рисуем сетку
		//Делим ось Y на отрезки;
		for (var i = del, j = -del; i < cWidth , j > -cWidth ; i = i + del,j = j - del) {
			drawLine(i,-cOriginY,i,cOriginY,styles);
			drawLine(j,-cOriginY,j,cOriginY,styles);
		}

		for (var i = del, j = -del; i < cHeight , j > -cHeight ; i = i + del,j = j - del) {
			drawLine(-cOriginX,i,cOriginX,i,styles);
			drawLine(-cOriginX,j,cOriginX,j,styles);
		}
	}


	var ali2d = {
		init : function($elemntID,options){
			canvas = document.getElementById("canvas");
			context = canvas.getContext("2d");


			cWidth = canvas.width;
			cHeight = canvas.height;
			cOriginX = cWidth/2;
			cOriginY = cHeight/2;

			if(typeof options == "object"){
				del = options.hasOwnProperty("delimiterWidth") ? options.delimiterWidth : del;
				delLength = options.hasOwnProperty("delimiterLength") ? options.delimiterLength : delLength;
				drawGrid = options.hasOwnProperty("drawGrid") ? true & options.drawGrid : drawGrid;
			}

			drawCoords();

			if(drawGrid){
				toDrawGrid();
			}

			clearStyles();
		},


		drawVector : function(x,y,arrow){
			
			var c_x = x*del;
			var c_y = y*(-1)*del;
			drawLine(0,0,c_x,c_y);

			if(arrow){
				var dgLine = 45;
				var dg = 10;
				var arr_l = 10;

				var eX = c_x,
					eY = c_y;

				var g = Math.sqrt(c_x*c_x + c_y*c_y);
				console.log("Hipotenuza = "+g);

				var ar_bX = eX, ar_bY = eY;
				var ar_eX = 0,  ar_eY = 0;

				ar_eX = ar_bX + arr_l * c_x/g;
				ar_eY = ar_bY + arr_l * Math.abs(c_y)/g;

				drawLine(ar_bX,ar_bY,ar_eX,ar_eY);


				var ar2_bX = eX, ar2_bY = eY;
				var ar2_eX = 0,  ar2_eY = 0;

				ar2_eX = ar2_bX + arr_l *  c_x/g;
				ar2_eY = ar2_bY + arr_l *  Math.abs(c_y)/g;

				//drawLine(ar2_bX,ar2_bY,-ar2_eX,-ar2_eY);
			}
		},


	};









	global.ali2d = ali2d;
})(window);