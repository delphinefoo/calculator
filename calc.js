var Calculator = function() {
  this.storage = 0;
  this.current = 0;
};

Calculator.prototype = {

  add: function() {
    this.current = this.storage;
    this.storage = 0;
    this.operation = function(first, second) {
      return first + second;
    };
  },
  clear: function() {
    this.storage = 0;
    this.updateDisplay(this.storage);
  },
  convert: function() {

  },
  decimal: function() {

  },
  digit: function(number) {
    this.storage = this.storage * 10 + number;
    this.updateDisplay(this.storage);
    return this.storage;
  },
  divide: function() {
    this.current = this.storage;
    this.storage = 0;
    this.operation = function(first, second) {
      return first / second;
    };
  },
  equals: function() {
    var num = this.operation(this.current, this.storage);
    this.storage = num;
    this.updateDisplay(num);
  },
  multiply: function() {},
  percent: function() {

  },
  setCurrent: function(value, text) {

  },
  subtract: function() {},
  updateDisplay: function(value) {
    $('#display').text(value);
  }
};

var calc = new Calculator();

$('.row>div').click(function() {
  var rawNum = $(this).text()
  number = parseInt(rawNum, 10);
  if (isNaN(number)) {
    switch (rawNum) {
      case 'C':
        calc.clear();
        break;
      case 'X':
        calc.multiply();
        break;
      case '÷':
        calc.divide();
        break;
      case '+':
        calc.add();
        break;
      case '-':
        calc.subtract();
        break;
      case '=':
        calc.equals();
        break;
      case '.':
        calc.decimal();
        break;
      case '%':
        calc.percent();
        break;
      case '+/-':
        calc.convert();
        break;
    }
  } else {
    calc.digit(number);
  }
});