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
		gettroints:function(count,width,s){
			var trPoints=[];

			for (var i=0;i<count; i++) {
				trPoints[i]=width*(this.getRandom(0,1)+this.getRandom(0,1))+s;	
			}

			return trPoints;
		}

	}

var filtr={
}