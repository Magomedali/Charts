$(function(){


	//Для табов
	$('ul.tabs li').css('cursor', 'pointer');

	$('ul.tabs.tabs1 li').click(function(){
	var thisClass = this.className.slice(0,2);
	$('div.t1').hide();
	$('div.t2').hide();
	$('div.t3').hide();
	$('div.t4').hide();
	$('div.t5').hide();
	$('div.' + thisClass).show();
	$('ul.tabs.tabs1 li').removeClass('tab-current');
	$(this).addClass('tab-current');
	});

	//-----------------------------Фильтрация и проверка входящих данных-----------------------------

	//-----------------------------Фильтрация и проверка входящих данных-----------------------------

	//-----------------------------Фильтрация и проверка входящих данных-----------------------------

	//-----------------------------Фильтрация и проверка входящих данных-----------------------------

	//-----------------------------Фильтрация и проверка входящих данных-----------------------------

	//-----------------------------Фильтрация и проверка входящих данных-----------------------------
	//Предотвращаем ввод не числовых данных
	$("input[type=text]").not("input#alphaexp , input#lambdaErl").keypress(function(event){
		if(event.which && (event.which < 48 || event.which >57)){
			event.preventDefault();
		}
	});

	//Ввод только цифр и точки для вещественных чисел
	$("input#alphaexp , input#lambdaErl").keypress(function(event){
		if(event.which && event.which!=46 && (event.which < 48 || event.which >57)){
			event.preventDefault();
		}
	});







    //var mychart=new setTitle("Равномерное распределение");


    //Равноверное распределение -----------------------------------------------------------

    //Равноверное распределение -----------------------------------------------------------

    //Равноверное распределение -----------------------------------------------------------

    //Равноверное распределение -----------------------------------------------------------

    //Равноверное распределение -----------------------------------------------------------
    var n=0,m=0,t=0;
	var arr,max,min; 
	var ts=[];

	$("button.generate").on("click",function(){

		//проверяем сразу данные
		n=parseInt($(".n").val());
		m=parseInt($(".m").val());
		if(m<=n){			
			alert("Для получения корректного результата количество случайных величин\n должно быть меньше на несколько порядков, чем количество интервалов!!!");
			return null;
		}

		if(myFunc.isInt(m)){
			myFunc.m=m;
			var points=[];

			switch($("input[type=radio]:checked").attr("value")){
					case "random":
						points=myFunc.RandomPoints(m);
						break;
					case "congr":
						alert("congr");
						break;
					case "lehmer":
						var lehmer_m=$("#lehmer_m").val();
						var lehmer_x=$("#lehmer_x").val();
						var lehmer_a=$("#lehmer_a").val();
						var lehmer_c=$("#lehmer_c").val();
						points=myFunc.LehmerPoints(m,lehmer_m,lehmer_x,lehmer_a,lehmer_c);
						break;
					default:
						alert("Выберите один из вариантов");
						break;	
			}

			var table=myFunc.buildTable(points);
			
			points.sort(function(a,b){return a-b});
			max=myFunc.getMax(points);
			min=myFunc.getMin(points);
			$("div#ravnom span.minmax").text("Max = "+max+"; Min = "+min);

			if(myFunc.isInt(n) && n!=0){
				
				t=myFunc.getRoundVal((max-min)/n,1000000);
				$("div#ravnom span.t").text("Interval value t = "+t);

				//Строим гистограмму
				ts=myFunc.buildGisto2(points,max,min,t);
				//alert(ts);
				var ta=myFunc.getTable(ts);
				
				$("div#ravnom .forTable").html("<div class='showtable'>Показать таблицу</div><div class='tables'></div>");

				$("div#ravnom .tables").html(table+myFunc.BuildSorttable(points)+ta);
				
				var chart1=new barChart("Равномерное распределение");
				chart1.container="#container";
				chart1.setData(ts);
				chart1.buildChart();

				
			}else{
				$("div#ravnom span.error").text("Error!!!Value n meant to be > 0");
				return null;
			}		
		}else{
			$("div#ravnom span.error").text("Error!!! Value N meant to be  > 0");
				return null;
		}
		
	});

	$("input[type=radio]").click(function(event){
		
		$("input[type=radio]").not(this).parent("label").next("span.params").fadeOut();
		
		$(this).parent('label').next("span").fadeIn();
	});


	$("body").on("click","div.showtable",function(){
		//$("div.tables").css("display","block");
		$("div.tables").toggle("slowo");
		switch($(this).text()){
			case "Показать таблицу":
				$(this).text("Скрыть таблицу");
			break;
			case "Скрыть таблицы":
				$(this).text("Показатьтаблицу");
			break;
			default:
				$(this).text("Показать таблицу");
			break;
		}
		
	});




	//Экспотенциальное распределения-------------------------------------
	//Экспотенциальное распределения-------------------------------------
	//Экспотенциальное распределения-------------------------------------
	//Экспотенциальное распределения-------------------------------------
	//Экспотенциальное распределения-------------------------------------

	var exp_max,exp_min;

	$("button#exp_gen").click(function(){
		

		var countExp=parseInt($("#countExp").val());
		var countExpT=parseInt($("#countExpT").val());
		var alphaexp=$("#alphaexp").val();
		var constExp=parseInt($("#constExp").val());

		if(countExp<=countExpT){			
			alert("Для получения корректного результата количество случайных величин\n должно быть меньше на несколько порядков, чем количество интервалов!!!");
			return null;
		}

		if(!/^[0-9]+\.?[0-9]+$/.test(alphaexp) || alphaexp==0){
			alert("Введите правильное значение для Лямбда!!!");
			return null;
		}
		
		alphaexp=parseFloat(alphaexp);
		
		
		if(myFunc.isInt(countExp)){
			



			//Получаем случайные числа
			var points=myFunc.RandomPoints(countExp);

			//Преобразуем эти же числа по экспотенциальному распределени. 
			var expPoints=myFunc.getExpPoints(points,alphaexp,constExp);

			
			
			//Строим таблицу
			var table=myFunc.buildTable(expPoints);
			
			//Сортируем массив точек
			expPoints.sort(function(a,b){return a-b});
			exp_max=myFunc.getMax(expPoints);
			if(exp_max=="infinity"){
				alert("При преобразовании экспоненциального распределения получено бесконечное значение!!\n Попробуйте уменшить количество точек");
				return null;
			}
			exp_min=myFunc.getMin(expPoints);
			
			$("div.divforparamsExp span.minmax").text("Max = "+exp_max+"; Min = "+exp_min);

			if(myFunc.isInt(countExpT) && countExpT!=0){
				
				//нахожим значение тау
				var expT=myFunc.getRoundVal((exp_max-exp_min)/countExpT,1000000);
				
				//Выводим значение тау
				$("div.divforparamsExp span.t").text("Interval value t = "+expT);

				//Готовим данные для гистограммы значения по x и по y
				var expts=[];
				//alert(expPoints);
				expts=myFunc.buildGisto2(expPoints,exp_max,exp_min,expT);
				//alert(expts);

				var ta=myFunc.getTable(expts);
				
				$(".exp_fortable").html("<div class='showtable'>Показать таблицу</div><div class='tables'></div>");

				$(".exp_fortable .tables").html(table+myFunc.BuildSorttable(expPoints)+ta);
				
				var chart2=new barChart("Экспотенциальное распределение");
				
				
				chart2.container="#contexp";
				chart2.setData(expts);
				chart2.buildChart();

				
			}else{
				$("div.divforparamsExp span.error").text("Error!!!Value n meant to be > 0");
				return null;
			}		
		}else{
			$("div.divforparamsExp span.error").text("Error!!! Value N meant to be  > 0");
				return null;
		}
		
	});


	
	//---------------------------Нормальное распределение---------------------------------
	//---------------------------Нормальное распределение---------------------------------
	//---------------------------Нормальное распределение---------------------------------
	//---------------------------Нормальное распределение---------------------------------
	//---------------------------Нормальное распределение---------------------------------
	//---------------------------Нормальное распределение---------------------------------
	//---------------------------Нормальное распределение---------------------------------
	//---------------------------Нормальное распределение---------------------------------

	
	$("button#Norm_gen").on("click",function(){


		var countNorm=parseInt($("input#countNorm").val());
		var countNormT=parseInt($("input#countNormT").val());
		var countR=parseInt($("input#countR").val());
		var mathOzh=parseInt($("input#mozh").val());
		var sredkv=parseInt($("input#sredkv").val());

		if(countNorm<=countNormT){			
			alert("Для получения корректного результата количество случайных величин\n должно быть меньше на несколько порядков, чем количество интервалов!!!");
			return null;
		}
		if(countNorm==0 || countR==0 || countNormT==0 || mathOzh==0 || sredkv==0){			
			alert("Пустых значении не должно быть");
			return null;
		}

		if(countNorm!=0){
			
			var normPoints=myFunc.getNormPoints(countNorm,mathOzh,sredkv,countR);
			//alert(normPoints);

			//Строим таблицу
			var table=myFunc.buildTable(normPoints);
			
			//Сортируем массив точек
			normPoints.sort(function(a,b){return a-b});
			var norm_max=myFunc.getMax(normPoints);
			
			if(norm_max=="infinity"){
				alert("При преобразовании экспоненциального распределения получено бесконечное значение!!\n Попробуйте уменшить количество точек");
				return null;
			}

			var norm_min=myFunc.getMin(normPoints);
			
			$("div.divforparamsNorm span.minmax").text("Max = "+norm_max+"; Min = "+norm_min);

			if(myFunc.isInt(countNormT) && countNormT!=0){
				
				//нахожим значение тау
				var normT=myFunc.getRoundVal((norm_max-norm_min)/countNormT,1000000);
				
				//Выводим значение тау
				$("div.divforparamsNorm span.t").text("Interval value t = "+normT);

				//Готовим данные для гистограммы значения по x и по y
				var Normts=[];
				//alert(expPoints);
				Normts=myFunc.buildGisto2(normPoints,norm_max,norm_min,normT);
				//alert(expts);

				var ta=myFunc.getTable(Normts);
				
				$(".Norm_fortable").html("<div class='showtable'>Показать таблицу</div><div class='tables'></div>");

				$(".Norm_fortable .tables").html(table+myFunc.BuildSorttable(normPoints)+ta);
				
				var chart3=new barChart("Нормальное распределение");
				
				
				chart3.container="#contNorm";
				chart3.setData(Normts);
				chart3.buildChart();

				
			}else{
				
				$("div.divforparamsNorm span.error").text("Error!!!Value n meant to be > 0");
				return null;
			
			}

		}else{
			
		 alert("Количество случайных величин не должно равняться нулю");
		}
		
	});


	//---------------------------Нормальное распределение---------------------------------
	//---------------------------Нормальное распределение---------------------------------
	//---------------------------Нормальное распределение---------------------------------
	//---------------------------Нормальное распределение---------------------------------
	//---------------------------Нормальное распределение---------------------------------

	$("button#Tr_gen").on("click",function(){


		var countTr=parseInt($("input#countTr").val());
		var countTrT=parseInt($("input#countTrT").val());
		var trs=parseInt($("input#trs").val());
		var widthtr=parseInt($("input#widthtr").val());

		if(countTr<=countTrT){			
			alert("Для получения корректного результата количество случайных величин\n должно быть меньше на несколько порядков, чем количество интервалов!!!");
			return null;
		}
		if(countTr==0 || countTrT==0 || trs==0 || widthtr==0){			
			alert("Пустых значении не должно быть");
			return null;
		}

		if(countTr!=0){
			
			var trPoints=myFunc.gettrPoints(countTr,widthtr,trs);
			//alert(trPoints);

			// //Строим таблицу
			var table=myFunc.buildTable(trPoints);
			
			// //Сортируем массив точек
			 trPoints.sort(function(a,b){return a-b});
			 var tr_max=myFunc.getMax(trPoints);
			
			 if(tr_max=="infinity"){
			 	alert("При преобразовании экспоненциального распределения получено бесконечное значение!!\n Попробуйте уменшить количество точек");
			 	return null;
			 }

			 var tr_min=myFunc.getMin(trPoints);
			
			 $("div.divforparamsTreug span.minmax").text("Max = "+tr_max+"; Min = "+tr_min);

			if(myFunc.isInt(countTrT) && countTrT!=0){
				
				// //нахожим значение тау
				 var TrT=myFunc.getRoundVal((tr_max-tr_min)/countTrT,1000000);
				
				// //Выводим значение тау
				 $("div.divforparamsTreug span.t").text("Interval value t = "+TrT);

				// //Готовим данные для гистограммы значения по x и по y
				 var treugs=[];
				//alert(expPoints);
				 treugs=myFunc.buildGisto2(trPoints,tr_max,tr_min,TrT);
				 //alert(expts);

				 var ta=myFunc.getTable(treugs);
				
				$(".Tr_fortable").html("<div class='showtable'>Показать таблицу</div><div class='tables'></div>");

				 $(".Tr_fortable .tables").html(table+myFunc.BuildSorttable(trPoints)+ta);
				
				 var chart4=new barChart("Треугольное распределение");
				
				
				 chart4.container="#contTr";
				 chart4.setData(treugs);
				 chart4.buildChart();

				
			}else{
				
				$("div.divforparamsTreug span.error").text("Error!!!Value n meant to be > 0");
				return null;
			
			}

		}else{
			
		 alert("Количество случайных величин не должно равняться нулю");
		}
		
	});


	//---------------------------Эрланговское распределение---------------------------------
	//---------------------------Эрланговское распределение---------------------------------
	//---------------------------Эрланговское распределение---------------------------------
	//---------------------------Эрланговское распределение---------------------------------
	//---------------------------Эрланговское распределение---------------------------------
	//---------------------------Эрланговское распределение---------------------------------
	//---------------------------Эрланговское распределение---------------------------------

	$("button#Erl_gen").on("click",function(){

		var lambdaErl=$("input#lambdaErl").val();

		if(!/^[0-9]+\.?[0-9]+$/.test(lambdaErl) || lambdaErl==0){
			alert("Введите правильное значение для Лямбда!!!");
			return null;
		}

		var countErl=parseInt($("input#countErl").val());
		var countErlT=parseInt($("input#countErlT").val());
		var ErlR=parseInt($("input#ErlR").val());
		lambdaErl=parseFloat(lambdaErl);
		var ErlB=parseInt($("input#ErlB").val());

		if(countErl<=countErlT){			
			alert("Для получения корректного результата количество случайных величин\n должно быть меньше на несколько порядков, чем количество интервалов!!!");
			return null;
		}
		if(countErl==0 || ErlR==0 || countErlT==0 || ErlB==0 || lambdaErl==0){			
			alert("Пустых значении не должно быть");
			return null;
		}

		if(countErl!=0){
			
			var ErlPoints=myFunc.getErlPoints(countErl,lambdaErl,ErlB,ErlR);
			//alert(normPoints);
			
			//Строим таблицу
			var table=myFunc.buildTable(ErlPoints);
			
			//Сортируем массив точек
			ErlPoints.sort(function(a,b){return a-b});
			var Erl_max=myFunc.getMax(ErlPoints);
			
			if(Erl_max=="infinity"){
				alert("При преобразовании экспоненциального распределения получено бесконечное значение!!\n Попробуйте уменшить количество точек");
				return null;
			}

			var Erl_min=myFunc.getMin(ErlPoints);
			
			$("div.divforparamsErl span.minmax").text("Max = "+Erl_max+"; Min = "+Erl_min);

			if(myFunc.isInt(countErlT) && countErlT!=0){
				
				//нахожим значение тау
				var ErlT=myFunc.getRoundVal((Erl_max-Erl_min)/countErlT,1000000);
				
				//Выводим значение тау
				$("div.divforparamsErl span.t").text("Interval value t = "+ErlT);

				//Готовим данные для гистограммы значения по x и по y
				var Erlts=[];
				//alert(expPoints);
				Erlts=myFunc.buildGisto2(ErlPoints,Erl_max,Erl_min,ErlT);
				//alert(expts);

				var ta=myFunc.getTable(Erlts);
				
				$(".Erl_fortable").html("<div class='showtable'>Показать таблицу</div><div class='tables'></div>");

				$(".Erl_fortable .tables").html(table+myFunc.BuildSorttable(ErlPoints)+ta);
				
				var chart4=new barChart("Эрланговское распределение");
				
				
				chart4.container="#contErl";
				chart4.setData(Erlts);
				chart4.buildChart();

				
			}else{
				
				$("div.divforparamsErl span.error").text("Error!!!Value n meant to be > 0");
				return null;
			
			}

		}else{
			
		 alert("Количество случайных величин не должно равняться нулю");
		}
		
	});
})