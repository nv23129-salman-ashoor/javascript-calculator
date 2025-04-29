// Basic math functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b === 0 ? null : a / b;
}

// Function to determine which operation to perform
function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '×': return multiply(a, b);
    case '÷': return divide(a, b);
    default: return null;
  }
}

// Get DOM elements
const previousOperandElement = document.querySelector('.previous-operand');
const currentOperandElement = document.querySelector('.current-operand');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const decimalButton = document.getElementById('decimal');

// Calculator state
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

// Update the display
function updateDisplay() {
  currentOperandElement.textContent = currentOperand;
  
  if (operation != null) {
    previousOperandElement.textContent = `${previousOperand} ${operation}`;
  } else {
    previousOperandElement.textContent = '';
  }
}

// Clear the calculator
function clear() {
  currentOperand = '0';
  previousOperand = '';
  operation = undefined;
  shouldResetScreen = false;
  updateDisplay();
}

// Delete last digit
function deleteDigit() {
  if (shouldResetScreen) return;
  if (currentOperand === '0') return;
  
  currentOperand = currentOperand.toString().slice(0, -1);
  if (currentOperand === '') currentOperand = '0';
  updateDisplay();
}

// Append a number to the display
function appendNumber(number) {
  if (shouldResetScreen) {
    currentOperand = '';
    shouldResetScreen = false;
  }
  
  if (number === '.' && currentOperand.includes('.')) return;
  
  if (currentOperand === '0' && number !== '.') {
    currentOperand = number;
  } else {
    currentOperand += number;
  }
  
  updateDisplay();
}

// Choose operation
function chooseOperation(op) {
  if (currentOperand === '0' && previousOperand === '') return;
  
  if (previousOperand !== '') {
    compute();
  }
  
  operation = op;
  previousOperand = currentOperand;
  shouldResetScreen = true;
  updateDisplay();
}

// Compute the result
function compute() {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  
  if (isNaN(prev) || isNaN(current)) return;
  
  let result = operate(operation, prev, current);
  
  if (result === null) {
    currentOperand = 'Error: Division by 0!';
  } else {
    // Round long decimals
    if (result.toString().includes('.') && result.toString().split('.')[1].length > 10) {
      result = Math.round(result * 10000000000) / 10000000000;
    }
    currentOperand = result.toString();
  }
  
  operation = undefined;
  previousOperand = '';
  shouldResetScreen = true;
  updateDisplay();
}

// Add event listeners for number buttons
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.getAttribute('data-number'));
  });
});

// Add event listeners for operation buttons
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    chooseOperation(button.getAttribute('data-operation'));
  });
});

// Add event listener for equals button
equalsButton.addEventListener('click', compute);

// Add event listener for clear button
clearButton.addEventListener('click', clear);

// Add event listener for delete button
deleteButton.addEventListener('click', deleteDigit);

// Add event listener for decimal button
decimalButton.addEventListener('click', () => {
  appendNumber('.');
});

// Add keyboard support
document.addEventListener('keydown', event => {
  if (event.key >= '0' && event.key <= '9') appendNumber(event.key);
  if (event.key === '.') appendNumber('.');
  if (event.key === '=' || event.key === 'Enter') compute();
  if (event.key === 'Backspace') deleteDigit();
  if (event.key === 'Escape') clear();
  if (event.key === '+' || event.key === '-') chooseOperation(event.key);
  if (event.key === '*') chooseOperation('×');
  if (event.key === '/') chooseOperation('÷');
});

// Initialize display
updateDisplay();
