let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
const buttons = document.querySelectorAll('button');

window.addEventListener('keydown', function (e) {
    const key = document.querySelector(`button[data-key='${e.key}']`);
    key.click();
});

function addition(firstNumber, secondNumber) {
    debugger;
    return (firstNumber + secondNumber);
}

function subtraction(firstNumber, secondNumber) {
    return (firstNumber - secondNumber);
}

function multiplication(firstNumber, secondNumber) {
    return (firstNumber * secondNumber);
}

function division(firstNumber, secondNumber) {
    if (firstNumber === 0) {
        return 0;
    } else if (secondNumber === 0) {
        return 'error';
    }
    return (firstNumber / secondNumber);
}

function percentage(firstNumber, operator, percent) {
    if (firstNumber === 0 || firstNumber === '0') {
        return 0;
    } else {
        if (percent === 0) {
            return firstNumber;
        } else {
            if (operator === '+') {
                return firstNumber + (percent / 100);
            } else if (operator === '-') {
                return firstNumber - (percent / 100);
            }
        }
    }
}

function updateDisplay() {
    const display = document.getElementById('display');
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
                    updateDisplay();
                } else if (buttons[i].classList.contains('operator')) {
                    inputOperator(buttons[i].value);
                } else if (buttons[i].classList.contains('equals')) {
                    inputEquals();
                    updateDisplay();
                } else if (buttons[i].classList.contains('decimal')) {
                    inputDecimal(buttons[i].value);
                    updateDisplay();
                } else if (buttons[i].classList.contains('percent')) {
                    percentage(firstOperand, firstOperator, secondOperand);
                    updateDisplay();
                } else if (buttons[i].classList.contains('sign')) {
                    inputSign(displayValue);
                    updateDisplay();
                } else if (buttons[i].classList.contains('clear'))
                    clearDisplay();
                updateDisplay();
            }
        )
    }
}

clickButton();

function inputOperand(operand) {
    if (firstOperator === null) {
        if (displayValue === '0' || displayValue === 0) {
            //1st click - handles first operand input
            displayValue = operand;
        } else if (displayValue === firstOperand) {
            //starts new operation after inputEquals()
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        //3rd/5th click - inputs to secondOperand
        if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

function inputOperator(operator) {
    if (firstOperator != null && secondOperator === null) {
        //4th click - handles input of second operator
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else if (firstOperator != null && secondOperator != null) {
        //6th click - new secondOperator
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else {
        //2nd click - handles first operator input
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

function inputEquals() {
    //hitting equals doesn't display undefined before operate()
    if (firstOperator === null) {
        displayValue = displayValue;
    } else if (secondOperator != null) {
        //handles final result
        secondOperand = displayValue;
        result = addition(Number(firstOperand), Number(secondOperand), secondOperator);

        checkResult();
    } else {
        //handles first operation
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        checkResult();
    }
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
    firstOperator = null;
    secondOperator = null;
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
        return percentage(firstNumber, operator, secondNumber);
    }
}

function roundAccurately(number, places) {
    return parseFloat(Math.round(number + 'e' + places) + 'e-' + places);
}

function checkResult() {
    if (result === 0) {
        displayValue = 0;
    } else {
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        secondOperand = null;
        firstOperator = null;
        secondOperator = null;
        result = null;
    }
}