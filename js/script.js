const nmrStart = document.getElementById("nmrStart");
const nmrEnd = document.getElementById("nmrEnd");
const btnStart = document.getElementById("btnStart");
const btnRaffle = document.getElementById("btnRaffle");
const btnClear = document.getElementById("btnClear");
const divStart = document.getElementById("divStart");
const divRaffle = document.getElementById("divRaffle");
const historicalNumbers = document.getElementById("historicalNumbers");
  
btnStart.addEventListener("click", () => {
    divStart.classList.remove("d-flex");
    divStart.classList.add("d-none");
    divRaffle.classList.remove("d-none");
    divRaffle.classList.add("d-flex");
});

btnRaffle.addEventListener("click", () => {
    console.log("click");
});

btnClear.addEventListener("click", () => {
    divRaffle.classList.remove("d-flex");
    divRaffle.classList.add("d-none");
    divStart.classList.remove("d-none");
    divStart.classList.add("d-flex");
    historicalNumbers.innerText = "";
    nmrStart.value = 0;
    nmrEnd.value = 100;
});