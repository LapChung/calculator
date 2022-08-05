let previousOperand = "";
let currentOperand = "";
let operator = "";

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const prevOperator = document.querySelector("[data-prev-operator]");
const currOperator = document.querySelector("[data-curr-operator]");

/**
 * Reset all stored operands and operators to empty strings
 */
const clear = () => {
  prevOperand = "";
  currentOperand = "";
  operator = "";

  return;
};

/**
 * Removes the last character in the string
 */
const deleteValue = () => {
  currentOperand = currentOperand.toString().slice(0, -1);

  return;
};

/**
 * Appends a number to the string
 */
const appendNumber = (number) => {
  // Checks if "." is already in the string. Allows only 1 ".".
  if (number === "." && currentOperand.includes(".")) return;
  // Allows for 1 "0" at beginning on string
  if (number === "0" && currentOperand === "0") return;
  // If current value is "Error", resets to empty string
  if (currentOperand === "Error") {
    currentOperand = "";
  }
  currentOperand = currentOperand.toString() + number.toString();

  return currentOperand;
};

/**
 * 1. Checks for current operand value if not return undefined
 * 2. If there is a previous operand along with an operator, commute the value with current operand
 */
const operation = (op) => {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    operate();
  }

  operator = op;
  previousOperand = currentOperand;
  currentOperand = "";

  return;
};

/**
 * 1. Checks if operand are numbers
 * 2. Computes the two values stored in the operand strings
 * 3. Sets the current operand to the computed value and resets the operator and prev operand
 */
const operate = () => {
  let value = null;
  const prevNumber = parseFloat(previousOperand);
  const currNumber = parseFloat(currentOperand);
  if (isNaN(prevNumber) || isNaN(currNumber)) return;
  switch (operator) {
    case "+":
      value = add(prevNumber, currNumber);
      break;
    case "-":
      value = subtract(prevNumber, currNumber);
      break;
    case "*":
      value = multiply(prevNumber, currNumber);
      break;
    case "/":
      value = divide(prevNumber, currNumber);
      break;
    default:
      return;
  }
  currentOperand = value;
  previousOperand = "";
  operator = "";

  return;
};

/**
 * Converts thousandths with commas
 */
const addCommas = (number) => {
  // Splits the number into an array with two numbers: before the decimal and after
  const numArray = number.toString().split(".");
  const beforeDecimal = parseFloat(numArray[0]);
  const afterDecimal = numArray[1];

  let newNumber;
  // sets newNumber to empty string to handle if "." is the first operand or there is no input
  if (isNaN(beforeDecimal)) {
    newNumber = "";
  } else {
    // Handles other numbers and inputs a comma
    newNumber = beforeDecimal.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
  }
  if (afterDecimal != null) {
    return `${newNumber}.${afterDecimal}`;
  } else {
    return newNumber;
  }
};

/**
 * Displays the stored previous operand and operator as well as the computed value to the screen
 */
const display = () => {
  currOperator.innerText = addCommas(currentOperand);
  if (operator !== null) {
    //console.log("Operator = " + operator);
    prevOperator.innerText = `${addCommas(previousOperand)} ${operator}`;
  } else {
    prevOperator.innerText = "";
  }
};

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  if (b === 0) return "Error";
  return a / b;
};

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);
    display();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    operation(button.innerText);
    display();
  });
});

deleteButton.addEventListener("click", () => {
  deleteValue();
  display();
});

allClearButton.addEventListener("click", () => {
  clear();
  display();
});

equalsButton.addEventListener("click", () => {
  operate();
  display();
});
