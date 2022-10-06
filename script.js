let number1 = null;
let number2 = null;
let operator = null;
let result = null;

const firstPara = document.getElementById('first');
const secondPara = document.getElementById('second');
const numbersBtn = document.querySelectorAll('#numbtn')
const operatorBtn = document.querySelectorAll('#operatorBtn');
const percentageBtn = document.getElementById('percentage')
const dotBtn = document.getElementById('dot');
const equalBtn = document.getElementById('equal');
const negativeBtn = document.getElementById('negative');
const allClearBtn = document.getElementById('AC');

window.addEventListener('keydown', KeyboardInputs);
percentageBtn.addEventListener('click', getPrecentage );
dotBtn.addEventListener('click', addDot);
negativeBtn.addEventListener('click', addMinus);
equalBtn.addEventListener('click', evaluate);
allClearBtn.addEventListener('click', clear);

numbersBtn.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent))
});

operatorBtn.forEach(button => {
    button.addEventListener('click', () => setOperator(button.textContent))
});

function appendNumber(number){
    let string = secondPara.textContent;
    if(string.length > 10){
        return;
    }
    if(secondPara.textContent == '0'){
        secondPara.textContent = '';
    }
    secondPara.textContent +=number;
}

function setOperator(action){
    if(firstPara.textContent != '' && secondPara.textContent == ''){
        firstPara.textContent = number1+action;
        operation(action);
        return;
    }
    if(firstPara.textContent != '' && secondPara.textContent != ''){
        evaluate();
    }
    number1 = secondPara.textContent;
    secondPara.textContent = '';
    firstPara.textContent = number1+action;
    operation(action);
}

function operation(operatorSymbol){
    if(operatorSymbol == '+'){
        operator = 'add';
    }
    else if(operatorSymbol == '-'){
        operator = 'subtract';
    }
    else if(operatorSymbol == 'x' || operatorSymbol == '*'){
        operator = 'multiply';
    }
    else if(operatorSymbol == '÷' || operatorSymbol == '/'){
        operator = 'divide';
    }
}

function getPrecentage(){
    number1 = secondPara.textContent || firstPara.textContent.slice(0,-1);
    firstPara.textContent = ''
    operator = 'percentage'
    result = operate(operator, number1);
    if(result.toString().length > 12){
        result = Math.round(result * 10000)/10000;
    }
    secondPara.textContent = result;
    number1 = null;
    operator = null;
}


function evaluate(){
    if(number1 === null && number2 === null){
        return secondPara.textContent =  secondPara.textContent || '0';
    }
    number2 = secondPara.textContent;
    firstPara.textContent ='';
    result = operate(operator, number1, number2);
    if(result.toString().length > 12){
        if(result.toString().includes('.')){
            result = Math.round(result * 10000)/10000;
        }
        else{
            let lastNo = result.toString().length-10;
            let firstNo = result.toString().slice(0, 10);
            result = firstNo+'e'+lastNo;
        }
    }
    secondPara.textContent = result;
    number1 = null;
    number2 = null;
    operator = null;
}

function addDot(){
    let string = secondPara.textContent;
    if(string.includes('.')){
        return
    }
    secondPara.textContent += '.'
}

function addMinus(){
    if(secondPara.textContent == '0'){
        secondPara.textContent = '-';
        return;
    }
    let string = secondPara.textContent;
    if(string.includes('-')){
        secondPara.textContent = string.replace("-", "");
        return;
    }
    let sign = '-';
    secondPara.textContent = sign.concat(string);
}

function clear(){
    firstPara.textContent = ''
    secondPara.textContent = '0';
    number1 = null;
    number2 = null;
    operator = null;
    result = null;
}

function KeyboardInputs(e){
    if(e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') setOperator(e.key);
    if(e.key == '.') addDot();
    if(e.key == 'Escape') clear();
    if(e.key == 'Enter') evaluate();
}

const add = function(a, b) {
    return a+b;
};
  
const subtract = function(a,b) {
    return a-b;
};

const multiply = function(a, b) {
    return a*b;
};
  
const divide = function(a,b) {
    return a/b;
};

const percentage = function(a){
    return a/100;
}

function operate(operator, num1, num2){
    let a = Number(num1);
    let b = Number(num2);
    if(operator == 'add'){
        return add(a, b);
    }
    else if(operator == 'subtract'){
        return subtract(a, b);
    }
    else if(operator == 'multiply'){
        return multiply(a, b);
    }
    else if(operator == 'divide'){
        if(b == 0) return 'Error'
        return divide(a, b);
    }
    else if(operator == 'percentage'){
        return percentage(a);
    }
}
