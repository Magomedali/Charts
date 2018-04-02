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
};




var State = {
	isEmpty : true
};



var line = function(params){
		
	this.isVector = false;
	this.arrows=[];
	this.type = "line";
	this.coords = {
			begin:{
				x:0,
				y:0
			},
			end:{
				x:0,
				y:0
			}
	};
	this.draw = function(){

			var coords = this.coords;
			var arrows = this.arrows;
			drawLine(coords.begin.x,coords.begin.y,coords.end.x,coords.end.y);
			if(this.isVector && arrows.length){
				for (var i = 0; i < arrows.length; i++) {
					drawLine(arrows[i].begin.x,arrows[i].begin.y,arrows[i].end.x,arrows[i].end.y);
				}
			}
	};
};







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






Math.radians = function(degrees){
	return degrees * Math.PI / 180;
};




Math.degrees = function(radians){
	return radians * 180/Math.PI;
};




var drawLine = function(x1,y1,x2,y2,styles){
		context.beginPath();
		context.moveTo(x1,y1);
		context.lineTo(x2,y2);
		if(typeof styles == "object"){
			setStyles(styles);
		}
		return context.stroke();
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

		State.isEmpty = false;
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

	//Объекты добавленные на канвас
	var objects = [];
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
		

		drawVector : function(x0,y0,x,y,arrow){
			
			var c_x = x*del;
			var c_y = y != 0 ? y*(-1)*del : 0;
			x0 = x0 * del;
			y0 = y0 != 0 ? y0 * (-1)*del : 0;
			
			var v = new line();
			v.coords.begin.x = x0;
			v.coords.begin.y = y0;
			v.coords.end.x = c_x;
			v.coords.end.y = c_y;

			if(arrow){

				v.isVector = true;
				
				//тригонометрия
				//c_x = c_x - x0;
				//c_y = c_y - y0;
				var vector_length = Math.sqrt(c_x*c_x + c_y*c_y);
				var arrow_h = vector_length * 0.15;
				
				var pi = Math.PI;
				var angle = 180 * Math.atan2(c_y - y0,c_x - x0)/pi;
				
				var ar_x1 = c_x + (arrow_h*Math.cos(pi*(angle + 150)/180));
				var ar_y1 = c_y + (arrow_h*Math.sin(pi*(angle + 150)/180));
				
				var ar_x2 = c_x + (arrow_h*Math.cos(pi*(angle - 150)/180));
				var ar_y2 = c_y + (arrow_h*Math.sin(pi*(angle - 150)/180));

				v.arrows = [
					{
						begin:{
							x:c_x,
							y:c_y
						},
						end:{
							x:ar_x1,
							y:ar_y1
						}
					},
					{
						begin:{
							x:c_x,
							y:c_y
						},
						end:{
							x:ar_x2,
							y:ar_y2
						}
					}
				];
			}
			v.draw();
			objects.push(v);
		},


		getVectors : function(){
			return vectors; 
		},

		getObjects : function(){
			return objects;
		},

		getCanvasContext: function(){
			return context; 
		},


		redrawAll : function(){

			this.clear();

			drawCoords();

			if(drawGrid){
				toDrawGrid();
			}
			
			clearStyles();

			this.redrawObjects();

			
		},

		redrawObjects : function(){
			

			if(objects.length){
				var l = objects.length;
				for (var i = 0; i < l; i++) {
					if(typeof objects[i] == "object" && typeof objects[i].draw == "function"){
						objects[i].draw();
					}
				}
			} 
		},

		clear: function(){
			if(!State.isEmpty){
				context.translate(-cOriginX,-cOriginY);
				context.clearRect(0,0,cWidth,cHeight);
				State.isEmpty = true;
			}
		},
	};



	global.ali2d = ali2d;
})(window);