document.addEventListener('DOMContentLoaded', function(){
	const numbers = document.querySelectorAll('.number');
	const rotate = document.querySelectorAll('.rotate');
	const operations = document.querySelectorAll('.operation');
	const window = document.querySelector('.window .input');
	const clear = document.querySelector('.clear');
	const process = document.querySelector('.process');
	const result = document.querySelector('.result');
  let overResult = [];
  let finishRes = '';
  const clearWindow = () => {window.innerHTML = '';};
  const clearWindowBtn = () => {window.innerHTML = ''; process.innerHTML =''};

  numbers.forEach(number => {
    number.addEventListener('click', function () {
      window.innerHTML += number.dataset.number;
      textProcess = process.innerHTML;
    });
  });
  operations.forEach(operation => {
    operation.addEventListener('click', function () {
      overResult.push(Number(window.innerHTML));
      overResult.push(operation.dataset.operation);
      process.innerHTML += Number(window.innerHTML) + operation.dataset.operation;
      clearWindow();
    });
  });
  rotate.addEventListener('click', function () {
    // Код
  });
  result.addEventListener('click', function () {
    overResult.push(Number(window.innerHTML));
    process.innerHTML += Number(window.innerHTML) + '=';
    // Операции
    for (let item = 0; item < overResult.length; item++) {
      if(typeof overResult[item] != 'number') {
        if (overResult[item] == 'x') {
          operation( Number(overResult[item-1]), Number(overResult[item+1]), overResult[item] );
          overResult.splice(item, item-1);
          overResult[item-1] = finishRes;
          console.log('умножение: ' + overResult);
        }
      }
    }

    for (let item = 0; item < overResult.length; item++) {
      if(typeof overResult[item] != 'number') {
        if (overResult[item] == '/') {
          operation( Number(overResult[item-1]), Number(overResult[item+1]), overResult[item] );
          overResult.splice(item, item-1);
          overResult[item-1] = finishRes;
          console.log('деление: ' + overResult);
        }
      }
    }

    for (let item = 0; item < overResult.length; item++) {
      if ( overResult[item] != '/' && overResult[item] != 'x' ) {
        if(typeof overResult[item] != 'number') {
          operation( Number(overResult[item-1]), Number(overResult[item+1]), overResult[item] );
          overResult.splice(item, item+1);
          overResult[item-1] = finishRes;
          console.log('простое сложение: ' + overResult);
          console.log('item: ' + item);
          item--;
        }
      }
    }
    function toFixed(value) {
      var power = Math.pow(10, 14);
      return String(Math.round(value * power) / power);
    }
    console.log('Конец: ' + overResult);
    window.innerHTML = toFixed(finishRes);
    process.innerHTML += toFixed(finishRes);
  });
  clear.addEventListener('click', function () {
    finishRes = '';
    overResult = [];
    clearWindowBtn();
  });
  function operation(a, b, operator) {
    console.log('a: ' + a + ' b: ' + b + ' operation: ' + operator);
    switch(operator) {
      case '/':
        finishRes = a/b;
        if (b === 0) {
          finishRes = 'NaN';
        }
        break;
      case 'x':
        finishRes = a*b;
        break;
      case '+':
        finishRes = a + b;
      break;
      case '-':
        finishRes = a-b;
      break;
    
      default:
        window.innerHTML = 'NaN';
        process.innerHTML = 'NaN';
        break;
    }
  }
});