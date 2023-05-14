let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;

const buttons = document.querySelectorAll('button');
const display = document.getElementById('display');

function addition(firstNumber, secondNumber) {
    return (firstNumber + secondNumber);
}

function subtraction(firstNumber, secondNumber) {
    return (firstNumber - secondNumber);
}

function multiplication(firstNumber, secondNumber) {
    return (firstNumber * secondNumber);
}

function division(firstNumber, secondNumber) {
    if (secondNumber === 0) {
        return 'Infinity';
    }
    return (firstNumber / secondNumber);
}

function backspace(number) {
    if (number.toString().length === 1) {
        displayValue = 0;
    } else {
        number = number.toString().substring(0, number.toString().length - 1);
        displayValue = number;
    }
}

function updateDisplay() {
    display.textContent = displayValue;
    if (displayValue.length > 12) {
        display.textContent = displayValue.substring(0, 12);
    }
}

updateDisplay();

function clickButton() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
                if (buttons[i].classList.contains('operand')) {
                    inputOperand(buttons[i].value);
                } else if (buttons[i].classList.contains('operator')) {
                    inputOperator(buttons[i].value);
                } else if (buttons[i].classList.contains('equals')) {
                    inputEquals();
                } else if (buttons[i].classList.contains('decimal')) {
                    inputDecimal(buttons[i].value);
                } else if (buttons[i].classList.contains('backspace')) {
                    backspace(displayValue);
                } else if (buttons[i].classList.contains('sign')) {
                    inputSign(displayValue);
                } else if (buttons[i].classList.contains('clear')) {
                    clearDisplay();
                }
                updateDisplay();
            }
        )
    }
}

clickButton();

function inputOperand(operand) {
    if (operator === null) {
        if (displayValue === '0' || displayValue === 0) {
            displayValue = operand;
        } else if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

function inputOperator(currentOperator) {
    if (operator != null) {
        if (operator !== currentOperator) {
            if (firstOperand !== null && firstOperand !== displayValue) {
                secondOperand = displayValue;
                result = operate(Number(firstOperand), Number(secondOperand), operator);
                displayValue = roundAccurately(result, 12).toString();
                firstOperand = displayValue;
            }
            operator = currentOperator;
            return;
        }
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), operator);
        displayValue = roundAccurately(result, 12).toString();
        firstOperand = displayValue;
        result = null;
    } else if (operator != null && currentOperator != null) {
        secondOperand = displayValue;
        operator = currentOperator;
        result = operate(Number(firstOperand), Number(secondOperand), operator);
        displayValue = roundAccurately(result, 12).toString();
        firstOperand = displayValue;
        result = null;
    } else {
        operator = currentOperator;
        firstOperand = displayValue;
    }
}

function inputEquals() {
    if (operator === null) {
        return;
    }
    secondOperand = displayValue;
    result = operate(Number(firstOperand), Number(secondOperand), operator);
    checkResult();
}

function inputDecimal(dot) {
    if (displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = '0';
        displayValue += dot;
    } else if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
}

function inputSign(num) {
    displayValue = (num * -1).toString();
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    operator = null;
    result = null;
}

function operate(firstNumber, secondNumber, operator) {
    if (operator === '+') {
        return addition(firstNumber, secondNumber);
    } else if (operator === '-') {
        return subtraction(firstNumber, secondNumber);
    } else if (operator === '*') {
        return multiplication(firstNumber, secondNumber);
    } else if (operator === '/') {
        return division(firstNumber, secondNumber);
    } else if (operator === '%') {
        return backspace(firstNumber);
    }
}

function roundAccurately(number, places) {
    return parseFloat(Math.round(number + 'e' + places) + 'e-' + places);
}

function checkResult() {
    if (result === 0) {
        displayValue = 0;
    } else if (result === 'Infinity') {
        displayValue = 'Infinity';
    } else {
        displayValue = roundAccurately(result, 4).toString();
        firstOperand = displayValue;
        secondOperand = null;
        operator = null;
        result = '';
    }
}