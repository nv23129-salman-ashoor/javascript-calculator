let currentNumber = '0';
let prevNumber = '';
let calculationOperator = '';

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        inputNumber(event.target.value);
        updateScreen(currentNumber);
    });
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        inputOperator(event.target.value);
        updateScreen(currentNumber);
    });
});

const equalButton = document.querySelector('.equal-sign');
equalButton.addEventListener('click', () => {
    calculate();
    updateScreen(currentNumber);
});

const clearButton = document.querySelector('.all-clear');
clearButton.addEventListener('click', () => {
    clearAll();
    updateScreen(currentNumber);
});

const updateScreen = (number) => {
    const calculatorScreen = document.querySelector('.calculator-screen');
    calculatorScreen.value = number;
};

const inputNumber = (number) => {
    if (currentNumber === '0') {
        currentNumber = number;
    } else {
        currentNumber += number;
    }
};

const inputOperator = (operator) => {
    prevNumber = currentNumber;
    calculationOperator = operator;
    currentNumber = '';
};

const calculate = () => {
    let result;
    const prev = parseFloat(prevNumber);
    const current = parseFloat(currentNumber);
    switch (calculationOperator) {
        case '+':
            result = prev + current
