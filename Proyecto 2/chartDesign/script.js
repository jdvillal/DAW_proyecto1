
let cargarOpciones = ()=>{
    let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    fetch(url)
    .then(response => response.json())
    .then(data=>{
        for(let i = 0; i < data.length; i++){
            let plantilla = `<option value="${data[i].id}">${data[i].name}</option>`;
            if(i == 0){
                plantilla = `<option selected="selected" value="${data[i].id}">${data[i].name}</option>`;
            }
            document.getElementById('coin-select').innerHTML += plantilla;
        }

    

        })
    .catch(error => {
        // handle the error
        console.log(error);
    });

}


let cargarGrafico = ()=> {
    var t_f = Math.round((new Date()).getTime() / 1000);
    let t_0 = t_f;

    let timeOptions = document.getElementsByName('chart-time-selector-radiobutton');
    for(i = 0; i < timeOptions.length; i++) {          
        if(timeOptions[i].checked){
            if(timeOptions[i].getAttribute('id') == "day-radiobutton"){
                t_0 -= (60*60*24);
            }else if(timeOptions[i].getAttribute('id') == "week-radiobutton"){
                t_0 -= (60*60*24*7);
            }else if(timeOptions[i].getAttribute('id') == "month-radiobutton"){
                t_0 -= (60*60*24*30);
            }else if(timeOptions[i].getAttribute('id') == "3months-radiobutton"){
                t_0 -= (60*60*24*90);
            }else if(timeOptions[i].getAttribute('id') == "year-radiobutton"){
                t_0 -= (60*60*24*365);
            }
            break;
        }
    }
    console.log(t_0);

    let fiatOptions = document.getElementsByName('chart-fiat-selector-radiobutton');
    let fiat;
    for(i = 0; i < fiatOptions.length; i++){
        if(fiatOptions[i].checked){
            if(fiatOptions[i].getAttribute('id') == "dollar-radiobutton"){
                fiat = "usd";
            }else if(fiatOptions[i].getAttribute('id') == "euro-radiobutton"){
                fiat = "eur";
            }
            break;
        }
    }
    console.log(fiat);

    let typeOptions = document.getElementsByName('chart-type-selector-radiobutton');
    let type;
    for(i = 0; i < typeOptions.length; i++){
        if(typeOptions[i].checked){
            if(typeOptions[i].getAttribute('id') == 'price-radiobutton'){
                type = "price";
            }else if(typeOptions[i].getAttribute('id') == 'marketcap-radiobutton'){
                type = "marketcap";
            }
            break;
        }
    }
    console.log(type);
    
    let coin_id = document.getElementById('coin-select').value;
    console.log(coin_id);

    if(coin_id == -1){
        return;
    }
    
    let url = `https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart/range?vs_currency=${fiat}&from=${t_0}&to=${t_f}`;
    fetch(url)
    .then(response => response.json())
    .then(data=>{
        console.log(data);

        var xValues = [];
        var yValues = [];
        
        if(type == "price"){
            for(let i = 0; i < data.prices.length; i++){
                xValues.push(data.prices[i][0]);
                yValues.push(data.prices[i][1]);
            }
        }else if(type == "marketcap"){
            for(let i = 0; i < data.market_caps.length; i++){
                xValues.push(data.market_caps[i][0]);
                yValues.push(data.market_caps[i][1]);
            }
        }

        let oldChart = document.getElementById('myChart');
        let newChart = document.createElement('canvas');
        newChart.setAttribute('id', 'myChart');
        newChart.setAttribute('style', 'width:100%');

        oldChart.parentNode.replaceChild(newChart, oldChart);

        let charts = document.getElementsByClassName("chartjs-size-monitor");
        for(let i = 0; i < charts.length; i++){
            if(i !=0){
                document.getElementById('chart-div').removeChild(charts[i]);
            }
        }

        new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: "transparent",
            borderColor: "black",
            data: yValues
            }]
        },
        options:{}
        });
    });
    

}

cargarOpciones();
setTimeout(function(){
    cargarGrafico();//TO DO: REFACTOR ASYNC
}, 500);
document.getElementById('coin-select').addEventListener('change', (event)=>{
    cargarGrafico();
    //getSelectedTime();
});