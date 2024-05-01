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
let pervValues = [''];
let operator = null;
let multipleOperands = true;
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
  if (b === 0) return 'can\'t';
  return a / b;
}

function operate(operator,numOne,numTwo) {
  let result;
  numOne = Number(numOne);
  numTwo = Number(numTwo);

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

  console.log(`${operandOne} ${operator} ${operandTwo} = ${result}`)
  result = (result === 'can\'t') ? 'Can\'t divide by zero' : Number(result.toFixed(5));
  resultsDisplayPane.textContent = result;
  operandOne = result;
  return result;
}

function listenForNumberClicks() {
  allNumberKeys.forEach((numberKey) => {
    numberKey.addEventListener("click", () => {
      console.log("Number key pressed: "+numberKey.textContent);
      numberClicked += numberKey.textContent;
      pervValues.push(numberClicked);
      console.log("Previous Values: "+pervValues);
      resultsDisplayPane.textContent = numberClicked;
    });
  });
}

function listenForOperationClick() {
  allOperationKeys.forEach((operationKey) => {
    operationKey.addEventListener("click", () => {
      console.log("Operation key pressed: "+operationKey.textContent);
      if (setOperands(multipleOperands)) {
        console.log("get result before accepting new operation...")
        result = operate(operator,operandOne,operandTwo);
        console.log(`${operandOne} ${operator} ${operandTwo} = ${result}`);
      }

      operator = operationKey.textContent;
      operationDisplayPane.textContent = operator;
      numberClicked = '';
      pervValues = [''];
      multipleOperands = true;
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

        multipleOperands = false;
        setOperands(multipleOperands);

        operationDisplayPane.textContent = actionKey.textContent;

        result = operate(operator,operandOne,operandTwo);
        console.log(`${operandOne} ${operator} ${operandTwo} = ${result}`);
        numberClicked = '';
      } else if (actionKey.textContent === "x") {
        console.log("Backspace clicked");
        console.log("Prev values Size: "+pervValues.length);
        console.log("Prev values Popped: "+pervValues.pop());
        console.log("Prev values Set: "+pervValues[pervValues.length-1]);
        resultsDisplayPane.textContent = pervValues[pervValues.length-1];
        numberClicked = pervValues[pervValues.length-1];
      }
    });
  });
}

function setOperands(multipleOperands = false) {
  let fulfilOperation = false;

  if (operandOne && multipleOperands) {
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