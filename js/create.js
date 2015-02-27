function barChart(name){
    
    this.name=name;
        
    this.getName=function(){
        return this.name;
    }
    this.data=[];
    
    this.setData=function(data){
        this.data=data;
    };
    this.getData=function(){
        return this.data;
    };
    this.setTitle=function(data){
        this.name=data;
    };
    this.buildChart=function(){
        $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text:this.getName()
        },
        subtitle: {
            text: 'Source: <a href="http://web-ali.ru">Web-ali</a>'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -50,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Количсетво'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '<b>{point.y:.1f} count</b>'
        },
        series: [{
            name: 'Population',
            data:this.getData(),
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '7px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });

    }
}

