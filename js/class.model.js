var myFunc={
		m:0,
		getRandom:function(max,min){
			return Math.random()* (max - min) + min;
		},
		getRoundVal:function(f,dec){
			f=f*dec;
			f=Math.round(f);
			f=f/dec;
			return f;
		},
		RandomPoints:function(count){
			var data=[];
			for (var i=0; i<count; i++) {
				var point=myFunc.getRandom(0,1);
				point=myFunc.getRoundVal(point,1000000);
				data[i]=point;

			}
			return data

		},
		CongrPoints:function(count){
			var data=[];

			return data;
		},
		LehmerPoints:function(count,m,x,a,c){
			var data=[];
			data[0]=x;

			for (var i = 1; i<count; i++) {
				data[i]=((a*data[i-1])+parseInt(c))%m;
			}
			return data;
		},
		buildTable:function(data){

			var table="<table border='1px'><tr>";
			var td="<tr>";
			var i;
			
			for(i=0;i<data.length;i++){
				table+="<td>"+(i+1)+"</td>";
				td+="<td>"+data[i]+"</td>";
			}
			td+="</tr>";
			table+="</tr>"+td+"</table>";
			return table;
		},
		BuildSorttable:function(data){

			var table="<label>Sorted table</label><table border='1px'><tr>";
			var td="<tr>";
			var i;

			for(i=0;i<data.length;i++){
				table+="<td>"+(i+1)+"</td>";
				td+="<td>"+data[i]+"</td>";
			}
			td+="</tr>";
			table+="</tr>"+td+"</table>";
			
			return table;

		},
		getTable:function(data){
			var table="</br></br><table border='1px'>";
			var tr1="<tr><td>  -  <td>";
			var tr2="<tr><td>  t  <td>";
			var tr3="<tr><td>count<td>";
			var i=1;
			for(var key in data){
				tr1+="<td>"+i+"</td>";
				tr2+="<td>"+data[key][0]+"</td>";
				tr3+="<td>"+data[key][1]+"</td>";
				i++;
				// alert(data[key][0]);
			}
			table+=tr1+tr2+tr3+"</table>";
			return table;
		},
		isInt:function(data){
			if(data!=0)
				return (data/data)? true : false;
			return false;
		},
		getMax:function(data){
			return Math.max.apply(null,data);
		},
		getMin:function(data){
			return Math.min.apply(null,data);
		},

		parseObj:function(obj){
			var data=[];
			var i=0;
			for(var key in obj){
				i++;
				data.push([key,obj[key]]);

			}
			return data;
		},
		buildGisto2:function(arr,max,min,t){
			var k=0;
			var i;
			var gisto=new Object();
			var tempt=parseFloat(min);
			t=parseFloat(t);
			max=parseFloat(max);
			var tay=tempt;
			
			while(tempt<max){
			    tempt=myFunc.getRoundVal(tempt,1000000);
			 	k=0;
			 	tay=myFunc.getRoundVal(tay+t,1000000);
				
				for (i = 0; i < arr.length; i++) {
			 		if(tempt<=arr[i] && arr[i]<=tay){
		 				 k=k+1;
			 		 } 
			 	}

			 gisto["t = "+tempt]=k;
			 tempt=tempt+t;	
			   		
			};

			return myFunc.parseObj(gisto);
			
		},
		getExpPoints:function(points,alpha,consts){
			
			if(Array.isArray(points)){
				if(typeof(consts)=="undefined") consts=0;
				var expPoints=[];
				for (var i = 0; i < points.length; i++) {
					//Формула Экспотенциального распределения
					expPoints[i]=-(1/parseFloat(alpha))*(Math.log((points[i])))+consts;
					//Округляем до 100
					expPoints[i]=this.getRoundVal(expPoints[i],1000000);
				}
				//alert(points);
				//alert(expPoints);
				return expPoints;
			}
		},
		getNormPoints:function(count,mozh,sred,mx){

			var NormPoint=[];
			
			
			//var Randoms=[];
			// for (var i=0; i<mx; i++) {
			// 	Randoms[i]=this.RandomPoints(count);
			// };
			// //alert(Randoms[0]);
			
			

			for (var i=0; i<count; i++) {

				var Random=this.RandomPoints(mx);
				var tempz=0;
				
				for (var j=0;j<mx; j++) {
					tempz=tempz+(Random[j]-(mx/2));		
					
				}

				NormPoint[i]=mozh+(sred*Math.sqrt((12/mx)))*tempz;
			}

			return NormPoint;
		},
		gettrPoints:function(count,width,s){
			var trPoints=[];

			for (var i=0;i<count; i++) {
				trPoints[i]=width*(this.getRandom(0,1)+this.getRandom(0,1))+s;	
			}

			return trPoints;
		},
		getErlPoints:function(count,lamda,B,R){
			ErlPoints=[];
			for (var i=0; i<count; i++) {
				ErlPoints[i]=0;
				for (var j=0;j<R; j++) {
					ErlPoints[i]=ErlPoints[i]-(1/parseFloat(lamda))*Math.log(this.getRandom(0,1));
				}
				//ErlPoints[i]=-(1/parseFloat(lamda))*this.getRandom(0,1)+B;
			}

			return ErlPoints;
		},
		myConverter:function(fl){
			var decimal=fl % 1;
			var strDec=decimal.toString();
			var str=strDec.substr(2);
			var parInt=parseInt(str);
			return parInt;
		},
		getInt:function(param){
			switch(param){
				case "exp": 
					//alert("корень из exp");
					//получаем корень експоненты
					var sqrtexp=Math.exp(1);
					var s=myFunc.myConverter(sqrtexp);

					return s;
					break;
				case "pi" :	
					//alert("корень из  pi");
					var sqrtPi=Math.PI;
					var s=myFunc.myConverter(sqrtPi);
					return s;
					break;
				case "2" :	
					//alert("корень из  2");
					var sqrt=Math.sqrt(2);
					var s=myFunc.myConverter(sqrt);
					return s;
					break;
				case "3" :	
					//alert("корень из  3");
					var sqrt=Math.sqrt(3);
					var s=myFunc.myConverter(sqrt);
					return s;
					break;
				case "5" :	
					//alert("корень из  5");
					var sqrt=Math.sqrt(5);
					var s=myFunc.myConverter(sqrt);
					return s;
					break;
				case "7" :	
					//alert("корень из  7");
					var sqrt=Math.sqrt(7);
					var s=myFunc.myConverter(sqrt);
					return s;
					break;
				case "11" :	
					// alert("корень из 11");
					var sqrt=Math.sqrt(11);
					var s=myFunc.myConverter(sqrt);
					return s;
					break;
				case "13" :	
					// alert("корень из 13");
					var sqrt=Math.sqrt(13);
					var s=myFunc.myConverter(sqrt);
					return s;
					break;						

			}
		}
		,
		getChekedParams:function(count){
			//метод возвращает значения выбранных параметров checkbox
			var c=$('span.congr_params :checkbox:checked');
			if(c.length!=2) {
				alert("Выберите два любых параметра");
				return false;
			}
			var congrPoints=[];

			var p1=c.eq(0).attr("name");
			var p2=c.eq(1).attr('name');
			
			var a=myFunc.getInt(p1);
			var b=myFunc.getInt(p2);
			
			var ab=0;
			var temp=b;
			for (var i = 0; i < count; i++) {
				ab=a*temp;
				var strab=ab.toString();
				temp=parseFloat("0."+strab.substr(2,12));	
				congrPoints[i]=temp;
				temp=myFunc.myConverter(temp);
			};

			return congrPoints;
		}

	}

var filtr={
}