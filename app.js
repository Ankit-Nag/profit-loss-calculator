//setup the inputs and outputs

// var bodyContainer = document.querySelector(".body-container");
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
        diffOutput.innerText= "$"+difference.toFixed(2) +" Profit";
        percOutput.innerText= percentage.toFixed(2) +"% Profit";
        document.querySelector(".body-container").style.backgroundColor="var(--translucent-green)";
        diffOutput.style.color="var(--darker-green)";
        percOutput.style.color="var(--darker-green)";
    }
    else if(totalBuyPrice===0){
        diffOutput.innerHTML= "Enter Buy Price and Quantity";
        percOutput.innerHTML= "Enter Buy Price and Quantity";
        document.querySelector(".body-container").style.backgroundColor="var(--pastel-blue)";
        diffOutput.style.color="var(--deep-blue)";
        percOutput.style.color="var(--deep-blue)";
    }
    else if(difference===0){
        diffOutput.innerText="No profit, no loss";
        percOutput.innerHTML= "0%";
        diffOutput.style.color="var(--deep-blue)";
        percOutput.style.color="var(--deep-blue)";
    }
    else{
        diffOutput.innerText= "$"+Math.abs(difference.toFixed(2)) +" Loss";
        percOutput.innerText= Math.abs(percentage.toFixed(2)) +"% Loss ";
        diffOutput.style.color="var(--red)";
        percOutput.style.color="var(--red)";
        document.querySelector(".body-container").style.backgroundColor="var(--transparent-red)";
    }
}

//click event
function clickEventHandler() {
    calculate(buyPrice.value,quantity.value);
};

btnCheck.addEventListener("click", clickEventHandler)
