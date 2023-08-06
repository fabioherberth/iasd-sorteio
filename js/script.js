const nmrStart = document.getElementById("nmrStart");
const nmrEnd = document.getElementById("nmrEnd");
const checkboxRepeat = document.getElementById("nmrRepeat");
const btnStart = document.getElementById("btnStart");
const btnRaffle = document.getElementById("btnRaffle");
const btnClear = document.getElementById("btnClear");
const btnChange = document.getElementById("btnChange");
const divStart = document.getElementById("divStart");
const divRaffle = document.getElementById("divRaffle");
const divRaffleNumber = document.getElementById("raffleNumber");
const historicalNumbers = document.getElementById("historicalNumbers");

let drawnNumbers = [];
let drawnNumber = 0;
let isRepeatNumber = false;

if(localStorage.getItem("started")) {
    divStart.classList.remove("d-flex");
    divStart.classList.add("d-none");
    divRaffle.classList.remove("d-none");
    divRaffle.classList.add("d-flex");
    nmrStart.value = localStorage.getItem("first-value");
    nmrEnd.value = localStorage.getItem("second-value");
    let historical = localStorage.getItem("historical-numbers");
    if(historical){
        divRaffleNumber.innerText = localStorage.getItem("drawn-number");
        historicalNumbers.innerText = historical.replaceAll(",", " - ");
    }
}

checkboxRepeat.addEventListener("click", () => {
    isRepeatNumber = checkboxRepeat.checked;
});

btnStart.addEventListener("click", () => {
    let firstValue = parseInt(nmrStart.value);
    let secondValue = parseInt(nmrEnd.value);

    if (firstValue <= 0) {
        alert("O número inicial deve ser maior que 0!");
        return;
    }

    if (secondValue <= 0) {
        alert("O número final deve ser maior que 0!");
        return;
    }
    
    if (firstValue > secondValue) {
        alert("O número inicial deve ser menor que o número final!");
        return;
    }
    
    if (firstValue == secondValue) {
        alert("Para ter o sorteio o número inicial deve ser menor que o número final!");
        return;
    }
    
    localStorage.setItem("started", true);
    localStorage.setItem("first-value", firstValue);
    localStorage.setItem("second-value", secondValue);
    showRaffle();

    carryOutDraw(firstValue, secondValue);


});

btnRaffle.addEventListener("click", () => {
    let firstValue = parseInt(localStorage.getItem("first-value"));
    let secondValue = parseInt(localStorage.getItem("second-value"));
    drawnNumbers = localStorage.getItem("historical-numbers") ? localStorage.getItem("historical-numbers").split(',').map(Number) : [];
    if(drawnNumbers.length < secondValue){
        carryOutDraw(firstValue, secondValue);
    }

});

btnClear.addEventListener("click", () => {
    historicalNumbers.innerText = "";
    nmrStart.value = 1;
    nmrEnd.value = 100;
    localStorage.removeItem("first-value");
    localStorage.removeItem("second-value");
    localStorage.removeItem("historical-numbers");
    localStorage.removeItem("started");
    localStorage.removeItem("drawn-number");
    drawnNumbers = [];
    showStart();
});

btnChange.addEventListener("click", () => {
    showStart();
});

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
}

function carryOutDraw(firstValue, secondValue) {
    if (!isRepeatNumber) {
        var rangeOfNumbers = secondValue - firstValue; 

        if (drawnNumbers.length > rangeOfNumbers) {
            return;
        }

        do {
            drawnNumber = getRandomArbitrary(firstValue, secondValue);
        } while (drawnNumbers.indexOf(drawnNumber) >= 0);
    } else {
        drawnNumber = getRandomArbitrary(firstValue, secondValue);
    }
    divRaffleNumber.innerText = drawnNumber;
    saveHistory();
}

function saveHistory() {
    drawnNumbers = localStorage.getItem("historical-numbers") ? localStorage.getItem("historical-numbers").split(',').map(Number) : [];
    if(drawnNumbers.length < nmrEnd.value && drawnNumbers.indexOf(drawnNumber)){
        drawnNumbers.push(drawnNumber);
    }
    if(drawnNumbers.length > 0) {
        localStorage.setItem("drawn-number", drawnNumber);
        localStorage.setItem("historical-numbers", drawnNumbers);
    }
    historicalNumbers.innerText = drawnNumbers.join(" - ");
}

function showRaffle() {
    divStart.classList.remove("d-flex");
    divStart.classList.add("d-none");
    divRaffle.classList.remove("d-none");
    divRaffle.classList.add("d-flex");
}

function showStart() {
    divRaffle.classList.remove("d-flex");
    divRaffle.classList.add("d-none");
    divStart.classList.remove("d-none");
    divStart.classList.add("d-flex");
}