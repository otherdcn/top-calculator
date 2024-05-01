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
let prevValues = [''];
let positiveOrNegative = '+';
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

function percentageOf(a,b) {
  return (a/100) * b;
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
    case '%':
      result = percentageOf(numOne,numTwo);
      break;
  }

  result = (result === 'can\'t') ? 'Can\'t divide by zero' : Number(result.toFixed(5));
  resultsDisplayPane.textContent = result;
  operandOne = result;
  return result;
}

function listenForNumberClicks() {
  allNumberKeys.forEach((numberKey) => {
    numberKey.addEventListener("click", () => {

      if (numberKey.textContent === "." && numberClicked.includes(".")) {
        // Disbale if the key "." is already included in the number
        return;
      }

      numberClicked += numberKey.textContent;
      if (positiveOrNegative === "-" && numberClicked > 0) numberClicked = -numberClicked;
      if (positiveOrNegative === "+" && numberClicked < 0) numberClicked = -(numberClicked);
      prevValues.push(numberClicked);
      resultsDisplayPane.textContent = numberClicked;
    });
  });
}

function listenForOperationClick() {
  allOperationKeys.forEach((operationKey) => {
    operationKey.addEventListener("click", () => {
      if (setOperands(multipleOperands)) {
        result = operate(operator,operandOne,operandTwo);
      }

      operator = operationKey.textContent;
      operationDisplayPane.textContent = operator;
      resetValues(true);
      multipleOperands = true;
    });
  });
}

function listenForActionClicks() {
  allActionKeys.forEach((actionKey) => {
    actionKey.addEventListener("click", () => {
      if (actionKey.textContent === "AC") {
        resetValues();
      } else if (actionKey.textContent === "=") {

        if (!operandTwo && !operandOne) {
          // If user clicks "=" sign before entering operands
          return;
        }

        // Keep 'multipleOperands = false' here to ensure continuous operation after user clicked '=' sign.
        // The previous result will be used as operandOne if the user immediately clicks another operation key.
        multipleOperands = false;
        setOperands(multipleOperands);

        operationDisplayPane.textContent = actionKey.textContent;

        result = operate(operator,operandOne,operandTwo);
        resetValues(true);
      } else if (actionKey.textContent === "x") {
        prevValues.pop();

        if (prevValues[0] === undefined) prevValues[0] = '';
        
        resultsDisplayPane.textContent = prevValues[prevValues.length-1];
        numberClicked = prevValues[prevValues.length-1];
      } else if (actionKey.textContent === "±") {
        toggleNumberSign();
      }
    });
  });
}

function toggleNumberSign() {
  let positive = "+";
  let negative = "-";

  if (positiveOrNegative === positive) {
    positiveOrNegative = negative;

    prevValues = prevValues.map((number) => {
      return -number;
    });
  } else {
    positiveOrNegative = positive;

    prevValues = prevValues.map((number) => {
      return -(number);
    });
  }

  numberClicked = prevValues[prevValues.length-1];
  resultsDisplayPane.textContent = numberClicked;
}

function setOperands(multipleOperands = false) {
  let chainOperations = false;

  if (operandOne && multipleOperands) {
    operandTwo = resultsDisplayPane.textContent;
    chainOperations = true;
  } else if (operandOne) {
    operandTwo = resultsDisplayPane.textContent;
  } else {
    operandOne = resultsDisplayPane.textContent;
  }

  resultsDisplayPane.textContent = '';
  return chainOperations;
}

function resetValues(onlyNumbersClicked = false) {
  if (onlyNumbersClicked) {
    numberClicked = '';
    prevValues = [''];
    positiveOrNegative = "+";
  } else {
    operationDisplayPane.textContent = '';
    resultsDisplayPane.textContent = '';
    operandOne = null;
    operandTwo = null;
    numberClicked = '';
    prevValues = [''];
    numberClicked = '';
    operator = '';
    result = 0;
    console.clear();
    positiveOrNegative = "+";
  }
}

listenForNumberClicks();
listenForOperationClick();
listenForActionClicks();