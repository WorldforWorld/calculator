document.addEventListener('DOMContentLoaded', function() {
  const numbers = document.querySelectorAll('.number');
  const rotate = document.querySelector('.rotate');
  const operations = document.querySelectorAll('.operation');
  const clear = document.querySelector('.clear');
  const result = document.querySelector('.result');
  const deleteBtn = document.querySelector('.delete');
  const square = document.querySelector('.square');

  const window = document.querySelector('.window .input');
  let process = document.querySelector('.process');

  let overResult = [];
  let finishRes = '';
  const clearWindow = () => {window.innerHTML = '';};
  const clearWindowBtn = () => {window.innerHTML = ''; process.innerHTML ='';};

  numbers.forEach(number => {
    number.addEventListener('click', function () {
      window.innerHTML += number.dataset.number;
    });
  });

  operations.forEach(operation => {
    operation.addEventListener('click', function () {
      for (let res = 0; res < process.innerHTML.length; res++) {
        if (process.innerHTML[res] == '=') {
          process.innerHTML = '';
        }
      }
      overResult.push(Number(window.innerHTML));
      overResult.push(operation.dataset.operation);
      if (process.innerHTML.indexOf('sqr', process.innerHTML.length - 6) == -1) {
        process.innerHTML += Number(window.innerHTML) + operation.dataset.operation;
      } else {
        process.innerHTML += operation.dataset.operation;
      }
      clearWindow();
    });
  });

  clear.addEventListener('click', function () {
    finishRes = '';
    overResult = [];
    clearWindowBtn();
  });

  rotate.addEventListener('click', function () {
    if (window.innerHTML.length != 0) {
      window.innerHTML = Number(window.innerHTML)* (-1);
    }
  });

  deleteBtn.addEventListener('click', function () {
    if (window.innerHTML.length != 0) {
      window.innerHTML = window.innerHTML.slice(0, -1);
    }
  });

  square.addEventListener('click', function () {
    if (window.innerHTML.length != 0) {
      process.innerHTML += 'sqr(' + Number(window.innerHTML) + ')';
      window.innerHTML = Number(window.innerHTML)*Number(window.innerHTML);
    }
  });

  result.addEventListener('click', function () {

    if (window.innerHTML.length == 0) {
      finishRes = '';
      overResult = [];
      return clearWindowBtn();
    }
    overResult.push(Number(window.innerHTML));
    if (process.innerHTML.indexOf('=') == -1) {
      process.innerHTML += Number(window.innerHTML) + '=';
    }
    // Операции
    function iterations (itemOperator) {
      mathOperation( Number(overResult[itemOperator-1]), Number(overResult[itemOperator+1]), overResult[itemOperator], itemOperator );
      if (itemOperator == 1) {
        overResult.splice(itemOperator, itemOperator+1);
      } else {
        overResult.splice(itemOperator, itemOperator-1);
      }
      overResult[itemOperator-1] = finishRes;
    }
    for (let item = 0; item < overResult.length; item++) {
      if(typeof overResult[item] != 'number') {
        if (overResult[item] == '/' || overResult[item] == 'x') {
          iterations(item);
          item = 0;
        }
      }
    }
    
    for (let item = 0; item < overResult.length; item++) {
      if ( overResult[item] != '/' || overResult[item] != 'x' ) {
        if(typeof overResult[item] != 'number') {
          iterations(item);
          item = 0;
        }
      }
    }

    function toFixed(value) {
      var power = Math.pow(10, 14);
      return String(Math.round(value * power) / power);
    }
    
    // console.log('Конец: ' + overResult);
    window.innerHTML = toFixed(finishRes);
  });

  function mathOperation(a, b, operator) {
    switch(operator) {
      case 'x':
        finishRes = a*b;
        break;
      case '/':
        if (b === 0) {
          finishRes = 'NaN';
        }
        finishRes = a/b;
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