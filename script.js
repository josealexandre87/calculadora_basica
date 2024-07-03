// script.js

//Funcão que limpa a calculadora
function clearDisplay() {
  document.getElementById("display").textContent = "0";
}
//Funcão que deleta o último dígito
function deleteLast() {
  let display = document.getElementById("display").textContent;
  if (display.length > 1) {
    document.getElementById("display").textContent = display.slice(0, -1);
  } else {
    document.getElementById("display").textContent = "0";
  }
}

function appendToDisplay(value) {
  let display = document.getElementById("display").textContent;
  if (display === "0") {
    document.getElementById("display").textContent = value;
  } else {
    document.getElementById("display").textContent += value;
  }
}

function calculateResult() {
  let display = document.getElementById("display").textContent;
  try {
    document.getElementById("display").textContent = eval(display);
  } catch {
    document.getElementById("display").textContent = "Erro";
  }
}
