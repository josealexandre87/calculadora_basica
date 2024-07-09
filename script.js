// Aguarda o carregamento completo do conteúdo da página antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".botoes button");
  // Adiciona um evento de clique a cada botão da calculadora e captura a ação associada ao botão a partir do atributo 'data-action'
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action");
      handleButtonClick(action); // Chama a função handleButtonClick com a ação do botão clicado
    });
  });

  /*A função lida com o clique dos botões. Dependendo do valor de 'action', 
  ela chama a função apropriada para tratar o dígito, operador, ou executar
  uma ação específica (como limpar a tela ou calcular um resultado).*/
  function handleButtonClick(action) {
    if (!isNaN(action) || action === ".") {
      appendDigit(action);
    } else if (action === "clear") {
      clearDisplay();
    } else if (action === "backspace") {
      backspace();
    } else if (action === "=") {
      calculate();
    } else if (action === "%") {
      calculatePercentage();
    } else {
      appendOperator(action);
    }
  }
  // Esta função limpa o display da calculadora
  function clearDisplay() {
    display.value = "";
  }
  // Esta função remove o último caractere do display
  function backspace() {
    display.value = display.value.slice(0, -1);
  }
  // Esta função adiciona um dígito ao display
  function appendDigit(digit) {
    display.value += digit;
  }
  // Esta função adiciona um operador ao display, se o último caractere não for um operador
  function appendOperator(operator) {
    if (display.value && !isOperator(display.value.slice(-1))) {
      display.value += operator;
    }
  }
  // Esta função verifica se o caractere é um operador
  function isOperator(char) {
    return ["+", "-", "*", "/", "%"].includes(char);
  }
  // Esta função calcula o resultado da expressão no display
  function calculate() {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Erro";
    }
  }

  // Esta função calcula a porcentagem do último número em relação ao primeiro número
  //-> O regex /(\d+(\.\d+)?)([+\-*/])(\d+(\.\d+)?)$/ é usado para capturar duas partes principais da expressão: o primeiro número (num1), o operador (operator), e o segundo número (num2), que será convertido para a porcentagem.
  //-> (\d+(\.\d+)?) captura números inteiros ou decimais.
  //-> ([+\-*/]) captura o operador aritmético.
  //-> (\d+(\.\d+)?)$ captura o segundo número no final da string.

  /* Calcular a Porcentagem:
- Se houver uma correspondência, num1 e num2 são convertidos para floats.
- percentageValue é calculado como (parseFloat(num1) * parseFloat(num2)) / 100.
- display.value.replace substitui a expressão capturada pela expressão com o valor percentual calculado.*/

  function calculatePercentage() {
    const regex = /(\d+(\.\d+)?)([+\-*/])(\d+(\.\d+)?)$/;
    const match = display.value.match(regex);

    if (match) {
      const [_, num1, , operator, num2] = match;
      const percentageValue = (parseFloat(num1) * parseFloat(num2)) / 100;
      display.value = display.value.replace(
        regex,
        `${num1}${operator}${percentageValue}`
      );
    }
  }
});
