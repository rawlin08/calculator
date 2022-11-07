// selectors for DOM

const numberBttns = document.querySelectorAll('[data-number]');
const decimalBttn = document.querySelector('[data-decimal]')
const clearBttn = document.querySelector('[data-clear]');
const deleteBttn = document.querySelector('[data-delete]');
const operationBttns = document.querySelectorAll('[data-operator]');
const equalsBttn = document.querySelector('[data-equal]');

const equationScreen = document.querySelector('.equationScreen');
const resultScreen = document.querySelector('.resultScreen');

// event listeners

numberBttns.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent);
        updateScreen();
    })
});

operationBttns.forEach(button => {
    button.addEventListener('click', () => {
        operation(button.textContent)
        updateScreen();
    })
});

decimalBttn.addEventListener('click', () => {
    decimal();
    updateScreen();
});

equalsBttn.addEventListener('click', () => {
    operate();
    updateScreen();
});

clearBttn.addEventListener('click', () => {
    clear();
    updateScreen();
});

deleteBttn.addEventListener('click', () => {
    remove();
    updateScreen();
});

// keyboard support

window.addEventListener('keydown', keyboard)

function keyboard(e) {
    if (e.key >= 0 && e.key <= 9) {
        appendNumber(e.key);
        updateScreen();
    }
    if (e.key === '.') {
        decimal();
        updateScreen();
    }
    if (e.key === '=') {
        operate();
        updateScreen();
    }
    if (e.key === 'Backspace') {
        remove();
        updateScreen();
    }
    if (e.key === 'Escape') {
        clear();
        updateScreen();
    }
    if (e.key === '+' || e.key === '-' || e.key === 'x' || e.key === '/') {
        operation(e.key);
        updateScreen();
    }
}

// calculator object

calculator = {
    first: '0',
    second: '',
    operator: '',
    result: '',
};

equationScreen.textContent = calculator.first;

// functions

function clear() {
    calculator.first = '0';
    calculator.second = '';
    calculator.operator = '';
    calculator.result = '';
}

function remove() {
    if (calculator.result === '') { // result = nothing
        if (calculator.operator === '') { // operator = nothing
            if (calculator.first !== '0') { // first number does not = 0
                calculator.first = calculator.first.slice(0, -1);
            }
        }
        else {
            calculator.second = calculator.second.slice(0, -1);
        }
    }
}

function appendNumber(number) {
    if (calculator.result === '') { // result equals nothing (calculator did not give a result already)
        if (calculator.operator === '') { // operator = nothing
            if (calculator.first == '0') { // first number = 0
                calculator.first = calculator.first.slice(0, 1);
                calculator.first = number;
            }
            else { // first number = anything but 0
                calculator.first = calculator.first + number;
            }
        }
        else { // operator = has something in it
            calculator.second = calculator.second + number;
        }
    }
}

function decimal() {
    if (calculator.result === '') { // result equals nothing (calculator did not give a result already)
        if (calculator.operator === '') { // operator = nothing
            if (calculator.first.includes('.') === false) { // first number does not include a decimal yet
                calculator.first = calculator.first + '.';
            }
        }
        else { // operator = has something in it
            if (calculator.second.includes('.') === false) { // second number does not include a decimal yet
                calculator.second = calculator.second + '.';
            }
        }
    }    
}

function operation(operation) {
    if (calculator.result === '') { // result = nothing
        calculator.operator = operation;
    }
    if (calculator.result === 'ERROR NOTHING TO COMPUTE') { // if the calculator errors, don't put the error into number one
        return
    }
    else { // calculator threw a result already
        calculator.first = resultScreen.textContent;
        calculator.result = '';
        calculator.operator = operation;
        calculator.second = '';
    }
}

function operate() {
    if (calculator.second == '' || calculator.second === '0') { // if second number = nothing or 0
        calculator.result = 'ERROR NOTHING TO COMPUTE';
    }
    else {
        if (calculator.operator === '+') {
            num = Number(calculator.first) + Number(calculator.second);
            calculator.result = Math.round(num * 10000) / 10000;
        }
        if (calculator.operator === '-') {
            num = Number(calculator.first) - Number(calculator.second);
            calculator.result = Math.round(num * 10000) / 10000;
        }
        if (calculator.operator === 'x') {
            num = Number(calculator.first) * Number(calculator.second);
            calculator.result = Math.round(num * 10000) / 10000;
        }
        if (calculator.operator === '/') {
            num = Number(calculator.first) / Number(calculator.second);
            calculator.result = Math.round(num * 10000) / 10000;
        }
    }
}

function updateScreen() {
    if (calculator.first == '') { // first number = nothing (fail safe)
        calculator.first = '0';
    }
    equationScreen.textContent = `${calculator.first} ${calculator.operator} ${calculator.second}`;
    resultScreen.textContent = calculator.result;
}