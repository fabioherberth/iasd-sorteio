const nmrStart = document.getElementById("nmrStart");
const nmrEnd = document.getElementById("nmrEnd");
const checkboxRepeat = document.getElementById("nmrRepeat");
const btnStart = document.getElementById("btnStart");
const btnRaffle = document.getElementById("btnRaffle");
const btnClear = document.getElementById("btnClear");
const divStart = document.getElementById("divStart");
const divRaffle = document.getElementById("divRaffle");
const divRaffleNumber = document.getElementById("raffleNumber");
const historicalNumbers = document.getElementById("historicalNumbers");

let drawnNumbers = [];
let drawnNumber = 0;
let isRepeatNumber = false;

checkboxRepeat.addEventListener("click", () => {
    isRepeatNumber = checkboxRepeat.checked;
});

btnStart.addEventListener("click", () => {
    var firstValue = parseInt(nmrStart.value);
    var secondValue = parseInt(nmrEnd.value);

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

    localStorage.setItem("first-value", firstValue);
    localStorage.setItem("second-value", secondValue);

    carryOutDraw(firstValue, secondValue);

    divStart.classList.remove("d-flex");
    divStart.classList.add("d-none");
    divRaffle.classList.remove("d-none");
    divRaffle.classList.add("d-flex");

});

btnRaffle.addEventListener("click", () => {
    var firstValue = parseInt(localStorage.getItem("first-value"));
    var secondValue = parseInt(localStorage.getItem("second-value"));
    
    carryOutDraw(firstValue, secondValue);

});

btnClear.addEventListener("click", () => {
    divRaffle.classList.remove("d-flex");
    divRaffle.classList.add("d-none");
    divStart.classList.remove("d-none");
    divStart.classList.add("d-flex");
    historicalNumbers.innerText = "";
    nmrStart.value = 1;
    nmrEnd.value = 100;
    localStorage.clear();
});

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
}

function carryOutDraw(firstValue, secondValue) {

    if (!isRepeatNumber) {
        do {
            drawnNumber = getRandomArbitrary(firstValue, secondValue);
        } while (drawnNumbers.indexOf(drawnNumber) > -1);
    } else {
        drawnNumber = getRandomArbitrary(firstValue, secondValue);
    }

    divRaffleNumber.innerHTML = drawnNumber;
    saveHistory();
}

function saveHistory() {
    drawnNumbers.push(drawnNumber);

    if(drawnNumbers.length > 0) {
        localStorage.setItem("historical-numbers", drawnNumbers);
    }

    historicalNumbers.innerHTML = drawnNumbers.join(" - ");
}