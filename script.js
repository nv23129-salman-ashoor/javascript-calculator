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
  if (b === 0) return null;
  return a / b;
}

// Function to determine which operation to perform
function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '×':
      return multiply(a, b);
    case '÷':
      if (b === 0) return null;
      return divide(a, b);
    default:
      return null;
  }
}

// Calculator class to manage the calculator state and operations
class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
    this.shouldResetScreen = false;
  }

  delete() {
    if (this.shouldResetScreen) return;
    if (this.currentOperand === '0') return;
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (this.currentOperand === '') this.currentOperand = '0';
  }

  appendNumber(number) {
    if (this.shouldResetScreen) {
      this.currentOperand = '';
      this.shouldResetScreen = false;
    }
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number;
    } else {
      this.currentOperand += number;
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '0' && this.previousOperand === '') return;
    
    if (this.previousOperand !== '') {
      this.compute();
    }
    
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.shouldResetScreen = true;
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    computation = operate(this.operation, prev, current);
    
    if (computation === null) {
      this.currentOperand = 'Error: Division by 0!';
      this.operation = undefined;
      this.previousOperand = '';
      this.shouldResetScreen = true;
      return;
    }

    // Round long decimals
    if (computation.toString().includes('.') && computation.toString().split('.')[1].length > 10) {
      computation = Math.round(computation * 10000000000) / 10000000000;
    }
    
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
    this.shouldResetScreen = true;
  }

  updateDisplay() {
    this.currentOperandElement.textContent = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandElement.textContent = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandElement.textContent = '';
    }
  }
}

// Wait for the DOM to fully load before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const numberButtons = document.querySelectorAll('[data-number]');
  const operationButtons = document.querySelectorAll('[data-operation]');
  const equalsButton = document.getElementById('equals');
  const deleteButton = document.getElementById('delete');
  const clearButton = document.getElementById('clear');
  const decimalButton = document.getElementById('decimal');
  const previousOperandElement = document.querySelector('.previous-operand');
  const currentOperandElement = document.querySelector('.current-operand');

  // Initialize calculator
  const calculator = new Calculator(previousOperandElement, currentOperandElement);

// Event listeners for buttons
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.getAttribute('data-number'));
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.getAttribute('data-operation'));
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

decimalButton.addEventListener('click', () => {
  calculator.appendNumber('.');
  calculator.updateDisplay();
});

// Keyboard support
document.addEventListener('keydown', event => {
  if (event.key >= 0 && event.key <= 9) calculator.appendNumber(event.key);
  if (event.key === '.') calculator.appendNumber('.');
  if (event.key === '=' || event.key === 'Enter') calculator.compute();
  if (event.key === 'Backspace') calculator.delete();
  if (event.key === 'Escape') calculator.clear();
  if (event.key === '+' || event.key === '-') calculator.chooseOperation(event.key);
  if (event.key === '*') calculator.chooseOperation('×');
  if (event.key === '/') calculator.chooseOperation('÷');
  calculator.updateDisplay();
});

// Close the DOMContentLoaded event listener
});
