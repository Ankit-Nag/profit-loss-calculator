//setup the inputs and outputs
var buyPrice = document.querySelector("#input-buyprice");
var quantity = document.querySelector("#input-quantity");
var btnCheck = document.querySelector("#btn-check");
var stockName = document.querySelector("#stock-option");
var diffOutput = document.querySelector("#difference");
var percOutput = document.querySelector("#percentage");
var amd = 91.71;
var intel = 49.82;
var nvidia = 522.20;

// buyPrice.value
// stockName.value

//error handling
function errorHandler(error){
    console.log("Error occured ",error)
}

//calculate profit or loss
function calculate(buyPrice,quantity){
    var difference;
    var totalBuyPrice = buyPrice*quantity;
    if(stockName.value==="amd"){
        var currentPrice = amd*quantity;
    }
    else if(stockName.value==="intel"){
        var currentPrice = intel*quantity;
    }
    else if(stockName.value==="nvidia"){
        var currentPrice = nvidia*quantity;
    }
    difference = currentPrice - totalBuyPrice;
    outputHandler(difference,totalBuyPrice);
}

function outputHandler(difference,totalBuyPrice){
    var percentage = (difference/totalBuyPrice)*100;
    if(difference>0){
        diffOutput.innerHTML= difference.toFixed(2) +" Profit";
        percOutput.innerHTML= percentage.toFixed(2) +" Profit";
    }
    else if(difference===0){
        diffOutput.innerHTML="No profit, no loss";
    }
    else{
        diffOutput.innerHTML= Math.abs(difference.toFixed(2)) +" Loss";
        percOutput.innerHTML= Math.abs(percentage.toFixed(2)) +" Loss ";
    }
}

//click event
function clickEventHandler() {
    calculate(buyPrice.value,quantity.value);
};

btnCheck.addEventListener("click", clickEventHandler)
