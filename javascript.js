const displayContent = document.querySelector(".contents");
const operationDisplayPane = displayContent.querySelector(".operation-pane");
const resultsDisplayPane = displayContent.querySelector(".results-pane");

const keypad = document.querySelector(".keypad");
const allOperationKeys = keypad.querySelectorAll(".operation-key");
const allActionKeys = keypad.querySelectorAll(".action-key");
const allNumberKeys = keypad.querySelectorAll(".number-key");

let operandOne = null;
let operandTwo = null;
let numberClicked = '';
let operator;
let result;

function add(a,b) {
  return a + b;
}

function subtract(a,b) {
  return a - b;
}

function multiply(a,b) {
  return a * b;
}

function divide(a,b) {
  if (b === 0) return 'nah';
  return a / b;
}

function operate(operator,numOne,numTwo) {
  let result;
  numOne = Number(numOne);
  numTwo = Number(numTwo);

  console.log(`${numOne} is a ${typeof numOne}`);
  console.log(`${numTwo} is a ${typeof numTwo}`);

  switch(operator) {
    case '+':
      result = add(numOne,numTwo);
      break;
    case  '-':
      result = subtract(numOne,numTwo);
      break;
    case  '*':
      result = multiply(numOne,numTwo);
      break;
    case  '/':
      result = divide(numOne,numTwo);
      break;
  }

  result = Number(result.toFixed(5));
  resultsDisplayPane.textContent = result;
  operandOne = result;
  return result;
}

function listenForNumberClicks() {
  allNumberKeys.forEach((numberKey) => {
    numberKey.addEventListener("click", () => {
      console.log("Number key pressed: "+numberKey.textContent);
      numberClicked += numberKey.textContent;
      resultsDisplayPane.textContent = numberClicked;
    });
  });
}

function listenForOperationClick() {
  allOperationKeys.forEach((operationKey) => {
    operationKey.addEventListener("click", () => {
      console.log("Operation key pressed: "+operationKey.textContent);
      if (setOperands(true)) {
        console.log("get result before accepting new operation...")
        result = operate(operator,operandOne,operandTwo);
        console.log(`${operandOne} ${operator} ${operandTwo} = ${result}`);
      }

      operator = operationKey.textContent;
      operationDisplayPane.textContent = operator;
      numberClicked = '';
    });
  });
}

function listenForActionClicks() {
  allActionKeys.forEach((actionKey) => {
    actionKey.addEventListener("click", () => {
      if (actionKey.textContent === "AC") {
        console.log("Action key pressed: "+actionKey.textContent);
        console.log("All Cleared Clicked")
        operationDisplayPane.textContent = '';
        resultsDisplayPane.textContent = '';
        operandOne = null;
        operandTwo = null;
        numberClicked = '';
        operator = '';
        result = 0;
        console.clear();
      } else if (actionKey.textContent === "=") {
        console.log("Action key pressed: "+actionKey.textContent);

        setOperands(false);

        operationDisplayPane.textContent = actionKey.textContent;

        result = operate(operator,operandOne,operandTwo);
        console.log(`${operandOne} ${operator} ${operandTwo} = ${result}`);
        numberClicked = '';
      }
    });
  });
}

function setOperands(operate = false) {
  let fulfilOperation = false;

  if (operandOne && operate) {
    operandTwo = resultsDisplayPane.textContent;
    console.log("Set Operand two: "+operandTwo);
    console.log("... and operate");
    fulfilOperation = true;
  } else if (operandOne) {
    operandTwo = resultsDisplayPane.textContent;
    console.log("Set Operand two: "+operandTwo);
    console.log("... and don't operate");
  } else {
    operandOne = resultsDisplayPane.textContent;
    console.log("Set Operand one: "+operandOne);
  }

  resultsDisplayPane.textContent = '';
  return fulfilOperation;
}

listenForNumberClicks();
listenForOperationClick();
listenForActionClicks();