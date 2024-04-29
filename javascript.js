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

  return result;
}

const keypad = document.querySelector(".keypad");
const displayContent = document.querySelector(".contents");
const allOperationKeys = keypad.querySelectorAll(".operation-key");
const allActionKeys = keypad.querySelectorAll(".action-key");
const allNumberKeys = keypad.querySelectorAll(".number-key");
let operandOne = null;
let operandTwo = null;
let operator;
let result;

allNumberKeys.forEach((numberKey) => {
  numberKey.addEventListener("click", () => {
    displayContent.textContent += numberKey.textContent;
  });
});

allActionKeys.forEach((actionKey) => {
  actionKey.addEventListener("click", () => {
    if (actionKey.textContent === "AC") {
      console.log("All Cleared Clicked")
      displayContent.textContent = '';
      operandOne = null;
      operandTwo = null;
      operator = '';
      result = 0;
    }
  });
})