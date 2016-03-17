var Calculator = function() {
  this.storage = 0;
  this.current = 0;
  this.operation;
};

Calculator.prototype = {

  add: function() {
    if (this.operation) {
      this.storage = this.operation(this.storage, this.current);
    } else {
      this.storage = this.current;
    }
    this.operation = function(first, second) {
      return first + second;
    };
    this.current = 0;
  },

  clear: function() {
    this.current = 0;
    this.storage = 0;
    this.updateDisplay(this.current);
  },

  convert: function() {

  },

  decimal: function() {

  },

  digit: function(number) {
    this.current = this.current * 10 + number;
    this.updateDisplay(this.current);
    return this.current;
  },

  divide: function() {
    if (this.operation) {
      this.storage = this.operation(this.storage, this.current);
    } else {
      this.storage = this.current;
    }
    this.operation = function(first, second) {
      return first / second;
    };
    this.current = 0;
  },

  equals: function() {
    var num = this.operation(this.storage, this.current);
    this.storage = num;
    this.updateDisplay(num);
  },

  multiply: function() {
    if (this.operation) {
      this.storage = this.operation(this.storage, this.current);
    } else {
      this.storage = this.current;
    }
    this.current = 0;
    this.operation = function(first, second) {
      return first * second;
    };
  },

  percent: function() {

  },

  subtract: function() {
    if (this.operation) {
      this.storage = this.operation(this.current, this.storage);
    } else {
      this.storage = this.current;
    }
    this.operation = function(first, second) {
      return first - second;
    };
    this.current = 0;
  },

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