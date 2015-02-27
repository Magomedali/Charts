var myFunc={
		m:0,
		getRandom:function(max,min){
			return Math.random()* (max - min) + min;
		},
		getRoundVal:function(f){
			f=f*100;
			f=Math.round(f);
			f=f/100;
			return f;
		},
		buildTable:function(count){

			var table="<table border='1px'><tr>";
			var td="<tr>";
			var i;
			var data=[];

			for(i=0;i<count;i++){
				var point=myFunc.getRandom(0,1);
				point=myFunc.getRoundVal(point);
				table+="<td>"+(i+1)+"</td>";
				td+="<td>"+point+"</td>";
				data[i]=point;
			}
			td+="</tr>";
			table+="</tr>"+td+"</table>";
			
			var ret={
				data:data,
				table:table
			}
			//alert(ret);
			return ret;
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
		buildGisto:function(arr,t){
			var i;
			var k=0;
			var gisto=new Object();
			var tempt=t;
			var j=0;
			for(i=0;i<arr.length;i++){
			  tempt=myFunc.getRoundVal(tempt);
			   if(arr[i]<=tempt){
		 		 k=k+1; 
			 	 }
			 	 else{
			 	 	//var ver=k/this.m;
			 		gisto["t = "+tempt]=k;
			 		j++;
			 		k=0;
			 		tempt=tempt+t;
			 	}		
			}

			return myFunc.parseObj(gisto);
			//return gisto;
		}


	}


	function Car(name){
		this.name=name;
		
		this.getName=function(){
			return this.name;
		}
	}

	
