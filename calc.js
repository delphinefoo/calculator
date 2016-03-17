var Calculator = function() {
  this.storage = 0;
  this.current = 0;
  this.dec = 0;
  this.operation;
  this.print = [];
};

Calculator.prototype = {

  add: function() {
    this.setCurrent();
    this.operation = function(first, second) {
      return first + second;
    };
    this.current = 0;
    this.print.push('+');
  },

  clear: function() {
    this.current = 0;
    this.storage = 0;
    this.dec = 0;
    this.updateDisplay(this.current);
  },

  convert: function() {
    if (this.current > 0 ) {
      this.current = -Math.abs(this.current);
    } else {
      this.current = Math.abs(this.current);
    }
    this.updateDisplay(this.current);
  },

  decimal: function() {
    this.current = this.current + '.';
    if (this.dec !== 1) this.dec++;
    this.updateDisplay(this.current);
  },

  digit: function(number) {
    if (this.dec) {
      this.current = parseFloat(this.current) + number / Math.pow(10, this.dec);
      this.dec++;
    } else {
      this.current = this.current * 10 + number;
    }
    this.updateDisplay(this.current);
    return this.current;
  },

  divide: function() {
    this.setCurrent();
    this.operation = function(first, second) {
      return first / second;
    };
    this.current = 0;
    this.print.push('÷');
  },

  equals: function() {
    var num = this.operation ? this.operation(this.storage, this.current) : undefined;
    this.storage = num;
    this.current = num;
    this.operation = undefined;
    this.updateDisplay(num);
    this.print.push('=', num);
  },

  multiply: function() {
    this.setCurrent();
    this.current = 0;
    this.operation = function(first, second) {
      return first * second;
    };
    this.print.push('x');
  },

  percent: function() {
    this.current = this.current / 100;
    this.setCurrent();
    this.updateDisplay(this.storage);
  },

  setCurrent: function() {
    if (this.operation) {
      this.storage = this.operation(this.storage, this.current);
    } else {
      this.storage = this.current;
    }
    this.dec = 0;
    this.print.push(this.current);
  },

  subtract: function() {
    this.setCurrent();
    this.operation = function(first, second) {
      return first - second;
    };
    this.current = 0;
    this.print.push('-');

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
      case 'x':
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
