let displayValue = '';
let firstNumber = null;
let secondNumber = null;
let currentOperator = null;

const display = document.getElementById('display');

function updateDisplay(value) {
    display.value = value;
}

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
    if (b === 0) {
        return "Error: Division by 0";
    }
    return
