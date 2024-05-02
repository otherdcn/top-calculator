const displayContent = document.querySelector(".contents");
const operationDisplayPane = displayContent.querySelector(".operation-pane");
const resultsDisplayPane = displayContent.querySelector(".results-pane");

const keypad = document.querySelector(".keypad");
const allOperationKeys = keypad.querySelectorAll(".operation-key");
const allActionKeys = keypad.querySelectorAll(".action-key");
const allNumberKeys = keypad.querySelectorAll(".number-key");

// The two variables will hold the values either side of the operator
let operandOne = null; // First value before operator (+, -, *, /, %) is clicked
let operandTwo = null; // second value before operator (+, -, *, /, %) is clicked

/*
Clipped from: https://www.theodinproject.com/lessons/foundations-calculator

You press a number button (12), followed by an operator button (+), a second number button (7), and finally a second operator button (-). Your calculator should then do the following: first, evaluate the first pair of numbers (12 + 7), second, display the result of that calculation (19), and finally, use that result (19) as the first number in your new calculation, along with the next operator (-). 

Continuous chaining instead of evaluating more than a single pair of numbers at a time.
*/
let multipleOperands = true; // This will enable continuous chaining

// The numbers that hold the current input from the display
let numberClicked = ''; // Concatenation of the currently clicked number
let prevValues = ['']; // This will be used to revert back if user clicks on backspace
let positiveOrNegative = '+'; // Will be used to negate numbers if toggled/clicked

let operator = null; // This will store the math operation clicked (+, -, *, /, %)

let result; // The reuslt of each operation

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
  if (b === 0) return 'error';
  return a / b;
}

function percentageOf(a,b) {
  return (a/100) * b;
}

function operate(operator,numOne,numTwo) {
  let result;

  // Convert to number type especially for add function
  numOne = Number(numOne);
  numTwo = Number(numTwo);

  switch(operator) {
    case '+':
      result = add(numOne,numTwo);
      break;
    case  '−':
      result = subtract(numOne,numTwo);
      break;
    case  '×':
      result = multiply(numOne,numTwo);
      break;
    case  '÷':
      result = divide(numOne,numTwo);
      break;
    case '%':
      result = percentageOf(numOne,numTwo);
      break;
  }

  // Return final result depending on whether it's a divide by zero response or floating point
  result = (result === 'error') ? "Can't divide by zero" : Number(result.toFixed(5));
  
  resultsDisplayPane.textContent = result;

  // use the result as the first number in your new calculation, enabling continuous chaining
  operandOne = result;
}

function listenForNumberClicks() {
  allNumberKeys.forEach((numberKey) => {
    numberKey.addEventListener("click", () => {

      if (numberKey.textContent === "." && numberClicked.includes(".")) {
        // Exit function if the key "." is already included in the number
        return;
      }

      numberClicked += numberKey.textContent;

      // Make the number negative or positive
      if (positiveOrNegative === "-" && numberClicked > 0) numberClicked = -numberClicked;
      if (positiveOrNegative === "+" && numberClicked < 0) numberClicked = -(numberClicked);

      // Add current number just in case program need to revert to it if user click backspace
      prevValues.push(numberClicked);

      resultsDisplayPane.textContent = numberClicked;
    });
  });
}

function listenForOperationClick() {
  allOperationKeys.forEach((operationKey) => {
    operationKey.addEventListener("click", () => {

      // When user clicks an operation key, call setOperands() function and receive return result
      if (setOperands(multipleOperands)) {
        // If setOperands() return true, then immediately operate, despit the "=" key not click
        // This enables continuous chaining
        operate(operator,operandOne,operandTwo);
      }


      operator = operationKey.textContent;
      operationDisplayPane.textContent = operator;

      resetValues(true);

      // Set to true if user tries continuous chaining of operands and operators before clicking "=" sign
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
          // Exit function if user clicks "=" sign before entering all or second operands
          return;
        }

        // The previous result will be used as operandOne if the user immediately clicks 
        // another operation key after the "=" key
        // Therefore set to false to wait for a number to be set to operandTwo
        multipleOperands = false;
        setOperands(multipleOperands);

        operationDisplayPane.textContent = actionKey.textContent;

        operate(operator,operandOne,operandTwo);

        // Only reset numberClicked, prevValues, positiveOrNegative
        resetValues(true);
      } else if (actionKey.textContent === "DEL") {
        prevValues.pop(); // Removes last number, which is the current number in display

        if (prevValues[0] === undefined) prevValues[0] = ''; // Just incased we popped the last element
        
        resultsDisplayPane.textContent = prevValues[prevValues.length-1]; // Set previous number to the display
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

    // Despite the numbers entered previous were probably positive we need to
    // make every element negative just incase the user backspaces
    prevValues = prevValues.map((number) => {
      return -number;
    });
  } else {
    positiveOrNegative = positive;

    // Despite the numbers entered previous were probably negatve we need to
    // make every element positive just incase the user backspaces
    prevValues = prevValues.map((number) => {
      return -(number);
    });
  }

  numberClicked = prevValues[prevValues.length-1];
  resultsDisplayPane.textContent = numberClicked; // Display same value in display after positive/negative toggle
}

function setOperands(multipleOperands = false) {
  // This will allow the program to operate even if user did 
  // not click "=" sign, allowing continuous chaining, when true
  let chainOperations = false;

  if (operandOne && multipleOperands) {
    operandTwo = resultsDisplayPane.textContent;
    chainOperations = true; // Go ahead and chain operands and operators before clicking "=" key
  } else if (operandOne) {
    operandTwo = resultsDisplayPane.textContent;
  } else {
    operandOne = resultsDisplayPane.textContent;
  }

  resultsDisplayPane.textContent = ''; // Display empty display for the user to enter operandTwo
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
    positiveOrNegative = "+";
  }
}

listenForNumberClicks();
listenForOperationClick();
listenForActionClicks();