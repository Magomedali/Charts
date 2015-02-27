$(function(){


	//Для табов
	$('ul.tabs li').css('cursor', 'pointer');

	$('ul.tabs.tabs1 li').click(function(){
	var thisClass = this.className.slice(0,2);
	$('div.t1').hide();
	$('div.t2').hide();
	$('div.t3').hide();
	$('div.t4').hide();
	$('div.' + thisClass).show();
	$('ul.tabs.tabs1 li').removeClass('tab-current');
	$(this).addClass('tab-current');
	});

    //var mychart=new setTitle("Равномерное распределение");

    var n=0,m=0,t=0;
	var arr,max,min; 
	var ts=[];

	$("button.generate").on("click",function(){
		n=parseInt($(".n").val());
		m=parseInt($(".m").val());

		if(myFunc.isInt(m)){
			myFunc.m=m;
			var data=myFunc.buildTable(m);
			arr=data.data;
			arr.sort(function(a,b){return a-b});
			max=myFunc.getMax(arr);
			min=myFunc.getMin(arr);
			$("span.minmax").text("Max = "+max+"; Min = "+min);

			if(myFunc.isInt(n) && n!=0){
				
				t=myFunc.getRoundVal((max-min)/n);
				$("span.t").text("Interval value t = "+t);

				//Строим гистограмму
				ts=myFunc.buildGisto(arr,t);
				//alert(ts);
				var ta=myFunc.getTable(ts);
				// $(".forTable").html(data.table+myFunc.BuildSorttable(arr)+ta);
				
				var chart1=new barChart("Равномерное распределение");
				
				chart1.setData(ts);
				chart1.buildChart();

				
			}else{
				$("span.error").text("Error!!!Value n meant to be > 0");
				return null;
			}		
		}else{
			$("span.error").text("Error!!! Value N meant to be  > 0");
				return null;
		}
		
	});


})