//setup the inputs and outputs

var buyPrice = document.querySelector("#input-buyprice"); //buy price
var quantity = document.querySelector("#input-quantity"); //no. of stocks
var btnCheck = document.querySelector("#btn-check"); //check button
var stockName = document.querySelector("#stock-option"); //company stock selected
var diffOutput = document.querySelector("#difference"); //profit/oss
var percOutput = document.querySelector("#percentage"); //percentage
var currentData = document.querySelector("#currentPrice"); //API data
var loading = document.querySelector("#btn-content");
var apikey = "0QVW1DBC4JJ5LAG7";
var stockValue = 0,
    quote;
var fetcher = document.querySelector("#fetch");


//1. click event
function clickEventHandler() {
    load();
    window.setTimeout(complete, 700);
    window.setTimeout(start, 750);
};

//2. animate the loader
function load() {
    loading.style.border = "5px solid var(--white)";
    loading.style.borderTop = "5px solid var(--deep-blue)";
    loading.style.animation = "spin 1s linear infinite";
}

//3. loading complete
function complete() {
    loading.style.border = "5px solid var(--white)";
}

//4. start execution by fetch()
function start() {
    var url = urlHandler(stockName.value);
    fetch(url, {
            "method": "GET"
        })
        .then(response => response.json())
        .then(json => {
            quote = json["Global Quote"];
            stockValue = quote["05. price"];
        })
        .then(run => {
            calculate(buyPrice.value, quantity.value);
        })
        .catch(err => {
            console.error(err);
        });
}

//4.1. create the URL
function urlHandler(index) {
    var urlgen = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + index + "&apikey=" + apikey;
    return urlgen

}

//4.2. error handling
function errorHandler(error) {
    console.log("Error occured ", error)
}

//5. calculate profit or loss
function calculate(buyPrice, quantity) {
    var difference;
    var totalBuyPrice = buyPrice * quantity;
    var currentPrice = stockValue * quantity;
    difference = currentPrice - totalBuyPrice;
    outputHandler(difference, totalBuyPrice);
}

//6 output
function outputHandler(difference, totalBuyPrice) {
    // currentData.innerText=stockValue;
    //show current data on stock-->
    stockData(quote);
    var percentage = (difference / totalBuyPrice) * 100;
    if (difference > 0) {
        diffOutput.innerText = "$" + difference.toFixed(2) + " Profit";
        percOutput.innerText = percentage.toFixed(2) + "% Profit";
        document.querySelector(".body-container").style.backgroundColor = "var(--translucent-green)";
        diffOutput.style.color = "var(--darker-green)";
        percOutput.style.color = "var(--darker-green)";
        currentData.style.color = "var(--darker-green)";
    } else if (totalBuyPrice === 0) {
        diffOutput.innerHTML = "Enter Buy Price and Quantity";
        percOutput.innerHTML = "Enter Buy Price and Quantity";
        document.querySelector(".body-container").style.backgroundColor = "var(--pastel-blue)";
        diffOutput.style.color = "var(--deep-blue)";
        percOutput.style.color = "var(--deep-blue)";
        currentData.style.color = "var(--deep-blue)";
    } else if (difference === 0) {
        diffOutput.innerText = "No profit, no loss";
        percOutput.innerHTML = "0%";
        diffOutput.style.color = "var(--deep-blue)";
        percOutput.style.color = "var(--deep-blue)";
        currentData.style.color = "var(--deep-blue)";
    } else {
        diffOutput.innerText = "$" + Math.abs(difference.toFixed(2)) + " Loss";
        percOutput.innerText = Math.abs(percentage.toFixed(2)) + "% Loss ";
        diffOutput.style.color = "var(--red)";
        percOutput.style.color = "var(--red)";
        currentData.style.color = "var(--red)";
        document.querySelector(".body-container").style.backgroundColor = "var(--transparent-red)";
    }
}

//present current stock data
//!try using innerHTML to style the output
function stockData(quote) {
    var str=""
    if(quote["05. price"]==NaN){
        str="We check only NASDAQ stocks";
        console.log("iffing");
    }
    else{
    var str = "Current Price: $" + parseFloat(quote["05. price"]).toFixed(2) + "\n Open: $" + parseFloat(quote["02. open"]).toFixed(2) + "\n High: $" + parseFloat(quote["03. high"]).toFixed(2) + "\n Low: $" + parseFloat(quote["04. low"]).toFixed(2) + "\n Volume: " + parseFloat(quote["06. volume"]).toFixed(2) + "\n Change: " + parseFloat(quote["09. change"]).toFixed(2) + "\n Change Percent: " + parseFloat(quote["10. change percent"]).toFixed(2);
    }

    currentPrice.innerText = str;
    // available data in quote[]-
    // "01. symbol":"TSLA"
    // "02. open":"777.8700"
    // "03. high":"789.7500"
    // "04. low":"770.7700"
    // "05. price":"771.8426"
    // "06. volume":"6995867"
    // "07. latest trading day":"2020-02-12"
    // "08. previous close":"774.3800"
    // "09. change":"-2.5374"
    // "10. change percent":"-0.3277%"

}

btnCheck.addEventListener("click", clickEventHandler);