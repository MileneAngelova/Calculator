function addition(n1, n2) {
    return( n1 + n2).toFixed(2);
}

function subtraction(firstNumber, secondNumber) {
    return (firstNumber - secondNumber).toFixed(2);
}

function multiplication(firstNumber, secondNumber) {
    return (firstNumber * secondNumber).toFixed(2);
}

function division(firstNumber, secondNumber) {
    if (firstNumber === 0 || secondNumber === 0) {
        return 0;
    }

    return (firstNumber / secondNumber).toFixed(2);
}



// function operate(operator, firstNumber, secondNumber) {
//     let resul = 0;
//
//     if (operator === '+') {
//         resul = addition(firstNumber, secondNumber);
//     } else if (operator === '-') {
//         resul = subtraction(firstNumber, secondNumber);
//     } else if (operator === '*') {
//         resul = multiplication(firstNumber, secondNumber);
//     } else if (operator === '/') {
//         resul = division(firstNumber, secondNumber);
//     }
//     return resul;
// }

// console.log(operate('/', 5, 3));