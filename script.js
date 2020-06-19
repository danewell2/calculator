const resultArea = document.querySelector('.calculator__result-area');
const buttons = document.querySelectorAll('.calculator__key');

let calculator = {
    first: null,
    second: null,
    operator: '',
    resultAreaStr: '0',
    clear() {
        this.first = null;
        this.second = null;
        this.operator = '';
        this.resultAreaStr = '0';
        this.updateResultArea();
    },
    backspace() {
        if (this.resultAreaStr.length == 1 && this.resultAreaStr != '0') {
            this.resultAreaStr = '0';
            this.updateResultArea();
        } else if (this.resultAreaStr.length > 1) {
            this.resultAreaStr = this.resultAreaStr.slice(0, this.resultAreaStr.length - 1);
            this.updateResultArea();
        }
    },
    percent() {
        this.resultAreaStr = String(this.first * this.second / 100);
    },
    divide() {
        this.resultAreaStr = String(this.first / this.second);
    },
    multiply() {
        this.resultAreaStr = String(this.first * this.second);
    },
    subtract() {
        this.resultAreaStr = String(this.first - this.second);
    },
    add() {
        this.resultAreaStr = Number(this.first) + Number(this.second);
    },
    result() {
        if (this.operator == "/") this.divide();
        if (this.operator == "*") this.multiply();
        if (this.operator == "-") this.subtract();
        if (this.operator == "+") this.add();
        if (this.operator == "%") this.percent();
        this.setFirst();
        if (this.resultAreaStr.length > 15) this.resultAreaStr = String(Number(this.resultAreaStr).toPrecision(10));
        this.updateResultArea();
    },
    setOperator(operator) {
        this.operator = operator;
    },
    setFirst() {
        this.first = Number(this.resultAreaStr);
    },
    setSecond() {
        this.second = Number(this.resultAreaStr);
    },
    setFloat() {

    },
    updateResultArea() {
        resultArea.innerHTML = String(this.resultAreaStr);
    }
};


function keyClick(e) {
    let keyClicked;
    // Keyboard
    if (this == window) {
        if (e.keyCode == 56 && e.shiftKey) keyClicked = '*';
        else if (e.keyCode == 191) keyClicked = '/';
        else if (e.keyCode == 189) keyClicked = '-';
        else if (e.keyCode == 187 && e.shiftKey) keyClicked = '+';
        else if (e.keyCode == 187 || e.keyCode == 13) keyClicked = '=';
        else if (e.keyCode == 53 && e.shiftKey) keyClicked = '%';
        else if (e.keyCode == 8) keyClicked = 'B';
        else if (e.keyCode == 67) keyClicked = 'C';
        else if (e.keyCode == 188 || e.keyCode == 190) keyClicked = '.';
        else if (e.keyCode >= 48 && e.keyCode <= 57) keyClicked = String.fromCharCode(e.keyCode);
    }
    else keyClicked = this.getAttribute('data-value'); // Buttons
    switch (keyClicked) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            if (calculator.resultAreaStr == '0') calculator.resultAreaStr = keyClicked;
            else if (calculator.resultAreaStr.length < 15) calculator.resultAreaStr += keyClicked;
            calculator.updateResultArea();
            break;
        case 'C':
            calculator.clear();
            break;
        case 'B':
            calculator.backspace();
            break;
        case '/':
        case '*':
        case '-':
        case '+':
        case '%':
            console.log(calculator.operator);
            if (!calculator.operator) {
                calculator.setFirst();
                calculator.setOperator(keyClicked);
                calculator.resultAreaStr = '0';
            } else {
                calculator.setSecond();
                calculator.result();
                calculator.setFirst();
                calculator.setOperator(keyClicked);
                calculator.resultAreaStr = '0';
            }
            break;
        case '=':
            calculator.setSecond();
            calculator.result();
            calculator.setOperator('');
            break;
        case '.':
            if (!calculator.resultAreaStr.includes('.')) {
                calculator.resultAreaStr += '.';
                calculator.updateResultArea();
            }
            break;
        default:
    }
}

calculator.updateResultArea();

buttons.forEach(button => button.addEventListener('click', keyClick));
window.addEventListener('keydown', keyClick);


