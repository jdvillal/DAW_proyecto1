
let cargarOpciones = async ()=>{
    let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    await fetch(url)
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

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
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
            }/*else if(timeOptions[i].getAttribute('id') == "3months-radiobutton"){
                t_0 -= (60*60*24*90);
            }*/else if(timeOptions[i].getAttribute('id') == "year-radiobutton"){
                t_0 -= (60*60*24*365);
            }
            break;
        }
    }

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
    
    let coin_id = document.getElementById('coin-select').value;

    if(coin_id == -1){
        return;
    }
    
    let url = `https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart/range?vs_currency=${fiat}&from=${t_0}&to=${t_f}`;
    fetch(url)
    .then(response => response.json())
    .then(data=>{

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

        for(let timestamp of xValues){

            const date = new Date(timestamp * 1000);

            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            // 👇️ Format as hh:mm:ss
            const time = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
            seconds,
            )}`;

            console.log(date);
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
        options: {
            legend: {display: false},
            scales: {
                xAxes: [{
                 ticks: {
                        display: false
                 },
                gridLines : {
                    display : false
                }
               }]
             }
        }
        });
    });
    

}


let cargar_datos = () =>{
    let coin_id = document.getElementById('coin-select').value;
    let url = `https://api.coingecko.com/api/v3/coins/${coin_id}`;
    fetch(url)
    .then(response => response.json())
    .then(data=>{
        console.log(data);

        let description = data.description.en;
        document.getElementById('coin-description-span').innerHTML = description;
        //console.log(description);

        /*Recuperar moneda seleccionada (dolar o euro)*/
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
        let simbolo;
        let precio;
        let marketcap;
        let coin_ath;
        let alto_24h;
        let bajo_24h;
        

        if(fiat == "eur"){
            simbolo = "€"
            precio =  data.market_data.current_price.eur;
            marketcap = data.market_data.market_cap.eur;
            coin_ath = data.market_data.ath.eur;
            alto_24h = data.market_data.high_24h.eur;
            bajo_24h = data.market_data.low_24h.eur;
        }else{
            simbolo = "$";
            precio = data.market_data.current_price.usd;
            marketcap = data.market_data.market_cap.usd;
            coin_ath = data.market_data.ath.usd;
            alto_24h = data.market_data.high_24h.usd;
            bajo_24h = data.market_data.low_24h.usd;
        }
        let precio_change_24h = data.market_data.price_change_percentage_24h;
        let market_cap_change_24h = data.market_data.market_cap_change_percentage_24h;
        let rank = data.market_cap_rank;

        let pop_twitter = data.community_data.twitter_followers;
        let reddit_posts = data.community_data.reddit_average_posts_48h;
        let genesis_date = data.genesis_date;
        let coin_img_src = data.image.small;

        document.getElementById('coin-name-h5').innerText = data.name;
        document.getElementById('coin-name-span').innerText = data.name;
        document.getElementById('current-price-tag').innerText = simbolo+precio;
        document.getElementById('current-mcap-tag').innerText = simbolo+(Math.round(marketcap/1000000))+"M";
        document.getElementById('rank-tag').innerText = "#"+rank;
        document.getElementById('twitter-followers-tag').innerText = pop_twitter;
        document.getElementById('reddit_data_tag').innerText = reddit_posts;
        document.getElementById('genesis-date-tag').innerText = genesis_date;
        document.getElementById('coin-img').setAttribute('src',coin_img_src);
        document.getElementById('min-24h-tag').innerText = "Min:" + simbolo + bajo_24h;
        document.getElementById('max-24h-tag').innerText = "Max:" + simbolo + alto_24h;
        let percentage = "width: " + Math.round(((alto_24h - bajo_24h)/precio)*100) + "%";
        document.getElementById('price-bar').setAttribute('style',percentage);
        console.log(percentage);
        if(precio_change_24h < 0){
            precio_change_24h = -precio_change_24h;
            document.getElementById('price-percent-tag').setAttribute('class', 'text-danger fw-semibold');
            document.getElementById('price-percent-tag').innerHTML = `<i class="bx bx-down-arrow-alt"></i>` + precio_change_24h+"%";
        }else{
            document.getElementById('price-percent-tag').setAttribute('class', 'text-success fw-semibold');
            document.getElementById('price-percent-tag').innerHTML = `<i class="bx bx-up-arrow-alt"></i>` + precio_change_24h+"%";
        }
        
        if(market_cap_change_24h < 0){
            market_cap_change_24h = -market_cap_change_24h;
            document.getElementById('mcap-percent-tag').setAttribute('class', 'text-danger fw-semibold');
            document.getElementById('mcap-percent-tag').innerHTML = `<i class="bx bx-down-arrow-alt"></i>` + market_cap_change_24h+"%";
        }else{
            document.getElementById('mcap-percent-tag').setAttribute('class', 'text-success fw-semibold');
            document.getElementById('mcap-percent-tag').innerHTML = `<i class="bx bx-up-arrow-alt"></i>` + market_cap_change_24h+"%";
        }

        

    })
    .catch(error => {
        // handle the error
        console.log(error);
    });
}

let cargar_tendencias = async () => {
    /*Recuperar moneda seleccionada (dolar o euro)*/
    let fiatOptions = document.getElementsByName('chart-fiat-selector-radiobutton');
    var fiat;
    var symbolo;
    for(i = 0; i < fiatOptions.length; i++){
        if(fiatOptions[i].checked){
            if(fiatOptions[i].getAttribute('id') == "dollar-radiobutton"){
                fiat = "usd";
                symbolo = "USD"
            }else if(fiatOptions[i].getAttribute('id') == "euro-radiobutton"){
                fiat = "eur";
                symbolo = "EUR"
            }
            break;
        }
    }
    var btc_price;
    await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${fiat}`)
    .then(response => response.json())
    .then(data=>{
        if(fiat == "usd"){
            btc_price = data.bitcoin.usd;
        }else{
            btc_price = data.bitcoin.eur;
        }
        //console.log(btc_price);
    })
    .catch(error => {
        // handle the error
        console.log(error);
    });
    let url = "https://api.coingecko.com/api/v3/search/trending";
    await fetch(url)
    .then(response => response.json())
    .then(data=>{
        document.getElementById('trending-list').innerHTML = "";
        for(let i = 0; i < 6; i++){
            console.log(data.coins[i].item.price_btc, btc_price);
            let price_fiat = (data.coins[i].item.price_btc)*(btc_price);
            let plantilla = `
                <li class="d-flex mb-4 pb-1">
                <div class="avatar flex-shrink-0 me-3">
                <img src="${data.coins[i].item.small}" alt="User" class="rounded" />
                </div>
                <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div class="me-2">
                    <small class="text-muted d-block mb-1">#${i+1}</small>
                    <h6 class="mb-0">${data.coins[i].item.name}</h6>
                </div>
                <div class="user-progress d-flex align-items-center gap-1">
                    <h6 class="mb-0">${Math.round(price_fiat*10000000)/10000000}</h6>
                    <span class="text-muted">${symbolo}</span>
                </div>
                </div>
            </li>
                `;
            document.getElementById('trending-list').innerHTML += plantilla;
        }
    })
    .catch(error => {
        // handle the error
        console.log(error);
    });
}




async function cargar_todo() {
    await cargarOpciones();
    cargarGrafico();
    cargar_datos();
    cargar_tendencias();
}
cargar_todo();

document.getElementById('coin-select').addEventListener('change', (event)=>{
    cargarGrafico();
    cargar_datos();
    //getSelectedTime();
});

let chart_time_buttons = document.getElementsByName('chart-time-selector-radiobutton');
let chart_fiat_buttons = document.getElementsByName('chart-fiat-selector-radiobutton');
let chart_type_buttons = document.getElementsByName('chart-type-selector-radiobutton');

for(let i = 0; i < chart_time_buttons.length; i++){
    chart_time_buttons[i].onclick = ()=>{
        cargarGrafico();
    }
}
for(let i = 0; i < chart_fiat_buttons.length; i++){
    chart_fiat_buttons[i].onclick  = ()=>{
        cargarGrafico();
        cargar_datos();
        cargar_tendencias();
    }
}
for(let i = 0; i < chart_type_buttons.length; i++){
    chart_type_buttons[i].onclick  = ()=>{
        cargarGrafico();
    }
}
