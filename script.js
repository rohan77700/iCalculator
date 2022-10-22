// DOM Elements
const value = document.querySelector('.value');

const clear = document.querySelector('.clear');
const sign = document.querySelector('.sign');
const percent = document.querySelector('.percent');

const addition = document.querySelector('.addition');
const subtraction = document.querySelector('.subtraction');
const multiplication = document.querySelector('.multiplication');
const division = document.querySelector('.division');
const equal = document.querySelector('.equal');

const decimal = document.querySelector('.decimal');
const num0 = document.querySelector('.zero');
const num1 = document.querySelector('.one');
const num2 = document.querySelector('.two');
const num3 = document.querySelector('.three');
const num4 = document.querySelector('.four');
const num5 = document.querySelector('.five');
const num6 = document.querySelector('.six');
const num7 = document.querySelector('.seven');
const num8 = document.querySelector('.eight');
const num9 = document.querySelector('.nine');
const numberArray = [
  num0, num1, num2, num3, num4,
  num5, num6, num7, num8, num9
];


// Variables
let valueInMemory = null;
let operatorInMemory = null;


// Time function
window.onload = displayTime()

function displayTime() {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  h = h % 12;
  h = h ? h : 12; // the hour '0' should be '12'
  m = m < 10 ? '0'+m : m; // add a zero in front of numbers<10
	let current_time = h + ":" + m;
	document.querySelector(".time").innerHTML = current_time;
  setTimeout(displayTime, 1000)
}


// Functions
const getValueAsStr = () => value.textContent.split(',').join('');

const getValueAsNum = () => {
  return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
  if (valueStr[valueStr.length - 1] === '.') {
    value.textContent += '.';
    return;
  }

  const [wholeNumStr, decimalStr] = valueStr.split('.');
  if (decimalStr) {
    value.textContent =
      parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
  } else {
    value.textContent = parseFloat(wholeNumStr).toLocaleString();
  }
};

const handleNumberClick = (numStr) => {
  const currentValueStr = getValueAsStr();
  if (currentValueStr === '0') {
    setStrAsValue(numStr);
  } else {
    setStrAsValue(currentValueStr + numStr);
  }
};

const getResultOfOperationAsStr = () => {
  const currentValueNum = getValueAsNum();
  const valueNumInMemory = parseFloat(valueInMemory);
  let newValueNum;
  if (operatorInMemory === 'addition') {
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorInMemory === 'subtraction') {
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorInMemory === 'multiplication') {
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorInMemory === 'division') {
    newValueNum = valueNumInMemory / currentValueNum;
  }

  return newValueNum.toString();
};

const handleOperatorClick = (operation) => {
  const currentValueStr = getValueAsStr();

  if (!valueInMemory) {
    valueInMemory = currentValueStr;
    operatorInMemory = operation;
    setStrAsValue('0');
    return;
  }
  valueInMemory = getResultOfOperationAsStr();
  operatorInMemory = operation;
  setStrAsValue('0');
};


// Add Event Listeners to functions
clear.addEventListener('click', () => {
  setStrAsValue('0');
  valueInMemory = null;
  operatorInMemory = null;
});
sign.addEventListener('click', () => {
  const currentValueNum = getValueAsNum();
  const currentValueStr = getValueAsStr();

  if (currentValueStr === '-0') {
    setStrAsValue('0');
    return;
  }
  if (currentValueNum >= 0) {
    setStrAsValue('-' + currentValueStr);
  } else {
    setStrAsValue(currentValueStr.substring(1));
  }
});
percent.addEventListener('click', () => {
  const currentValueNum = getValueAsNum();
  const newValueNum = currentValueNum / 100;
  setStrAsValue(newValueNum.toString());
  valueInMemory = null;
  operatorInMemory = null;
});


// Add event listeners to operators
addition.addEventListener('click', () => {
  handleOperatorClick('addition');
});
subtraction.addEventListener('click', () => {
  handleOperatorClick('subtraction');
});
multiplication.addEventListener('click', () => {
  handleOperatorClick('multiplication');
});
division.addEventListener('click', () => {
  handleOperatorClick('division');
});
equal.addEventListener('click', () => {
  if (valueInMemory) {
    setStrAsValue(getResultOfOperationAsStr());
    valueInMemory = null;
    operatorInMemory = null;
  }
});


// Add Event Listeners to numbers and decimal
for (let i=0; i < numberArray.length; i++) {
  const numberEl = numberArray[i];
  numberEl.addEventListener('click', () => {
    handleNumberClick(i.toString());
  });
}
decimal.addEventListener('click', () => {
  const currentValueStr = getValueAsStr();
  if (!currentValueStr.includes('.')) {
    setStrAsValue(currentValueStr + '.');
  }
});

