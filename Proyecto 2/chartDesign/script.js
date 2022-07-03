
let cargarOpciones = ()=>{
    let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    fetch(url)
    .then(response => response.json())
    .then(data=>{
        for(let i = 0; i < data.length; i++){
            let plantilla = `<option value="${data[i].id}">${data[i].name}</option>`;
            document.getElementById('coin-select').innerHTML += plantilla;
        }

    

        })
    .catch(error => {
        // handle the error
        console.log(error);
    });

}




let cargarGrafico = ()=> {
    


    let coin_id = document.getElementById('coin-select').value;
    console.log(coin_id);
    var t_f = Math.round((new Date()).getTime() / 1000);
    let t_0 = t_f - 86400;

    if(coin_id == -1){
        return;
    }
    
    let url = `https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart/range?vs_currency=usd&from=${t_0}&to=${t_f}`;
    fetch(url)
    .then(response => response.json())
    .then(data=>{
        console.log(data);

        var xValues = [];
        var yValues = [];

        for(let i = 0; i < data.prices.length; i++){
            xValues.push(data.prices[i][0]);
            yValues.push(data.prices[i][1]);
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
document.getElementById('coin-select').addEventListener('change', (event)=>{
    cargarGrafico();
    //getSelectedTime();
});