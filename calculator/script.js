class Calculator{
    constructor(){
        this.btns = document.querySelectorAll('.btn');
        this.display = document.querySelector('.display');
        this.numbers = ['00', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this.operators = ['+', '-', '*', '/', '%', '='];
        this.operator = '';
        this.operand1 = 0;
        this.operand2 = 0;
        this.result = 0;
        this.history = [];
    }

    init(){
        this.registerEvents();
        this.renderDisplay();
    }

    registerEvents(){
        this.btns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const ch = e.target.innerText;
                if(this.numbers.includes(ch) || ch === '.'){
                    if(this.operand1 === 0 || this.operator === '') this.operand1 += ch;
                    else this.operand2 += ch;
                }else if(this.operators.includes(ch)){
                    if(this.result !== 0){
                        const tempResult = this.result;
                        this.resetDisplay();
                        this.operand1 = tempResult.toString();
                    }
                    if(ch !== '=') this.operator = ch;
                }else if(ch === 'C'){
                    this.resetDisplay();
                }else{
                    if(this.operand2 !== 0){
                        this.operand2 = this.operand2.slice(0, this.operand2.length - 1);
                        if(this.operand2.length < 1){
                            this.operand2 = 0;
                            this.result = 0
                        }
                    }else{
                        if(this.operator !== ''){
                            this.operator = '';
                        }else if(this.operand1 !== 0){
                            this.operand1 = this.operand1.slice(0, this.operand1.length - 1);
                            if(this.operand1.length < 1) this.resetDisplay();
                        }
                    }
                }
                this.renderDisplay();
            })
        })
    }
    
    removeLeadingZeros(){
        if(this.operand1 !== 0 && this.operand1.charAt(0) === '0'){
            this.operand1 = this.operand1.substring(1, this.operand1.length)
        }

        if(this.operand2 !== 0 && this.operand2.charAt(0) === '0'){
            this.operand2 = this.operand2.substring(1, this.operand2.length)
        }
    }

    adjustDisplayFontSize(){
        const operands = document.querySelectorAll('.operand');
        const operator = document.querySelector('.operator')
        const operandsLen = this.operand1.length + this.operand2.length;
        if(operandsLen === 6){
            operands.forEach((operand) => {
                operand.style.fontSize = '40px';
            });

            if(operator) operator.style.fontSize = "30px";
        }else if(operandsLen >= 7 && operandsLen <= 8){
            operands.forEach((operand) => {
                operand.style.fontSize = '36px';
            });

            if(operator) operator.style.fontSize = "24px";
        }else if(operandsLen >= 9 && operandsLen <= 10){
            operands.forEach((operand) => {
                operand.style.fontSize = '28px';
            });

            if(operator) operator.style.fontSize = "20px";
        }else if(operandsLen >= 11 && operandsLen <= 12){
            operands.forEach((operand) => {
                operand.style.fontSize = '24px';
            });

            if(operator) operator.style.fontSize = "16px";
        }else if(operandsLen > 12){
            operands.forEach((operand) => {
                operand.style.fontSize = '20px';
            });

            if(operator) operator.style.fontSize = "12px";
        }
    }

    renderDisplay(){
        this.removeLeadingZeros();
        let equation = `<div><span class="operand">${this.operand1}</span>`;
        if(this.operator !== '') equation += `<span class="operator">${this.operator}</span>`;
        if(this.operand1 !== 0 && this.operator !== '') equation += `<span class="operand">${this.operand2}</span>`;
        equation += '</div>';
        this.display.innerHTML = `${equation}`;
        this.calculateResult();
        if(this.result !== 0){
            equation += `<div><span class="operand result">= ${this.result}</span></div>`
            this.display.innerHTML = `${equation}`;
        }
        this.adjustDisplayFontSize();
    }

    calculateResult(){
        if(this.operand1 !== 0 && this.operand2 !== 0 && this.operator !== ''){
            let op1 = 0, op2 = 0;
            if(this.operand1.includes('.') || this.operand2.includes('.')){
                op1 = parseFloat(this.operand1);
                op2 = parseFloat(this.operand2);
            }else{
                op1 = parseInt(this.operand1);
                op2 = parseInt(this.operand2);
            }

            switch(this.operator){
                case "+":
                    this.result = op1 + op2;
                    break;
                case "-":
                    this.result = op1 - op2;
                    break;
                case "*":
                    this.result = op1 * op2;
                    break;
                case "/":
                    this.result = op1 / op2;
                    break;
                case "%":
                    this.result = op1 % op2;
                    break;
                default:
                    break;
            }
        }
    }

    resetDisplay(){
        this.operand1 = 0;
        this.operand2 = 0;
        this.operator = '';
        this.result = 0;
    }
}


const calculator = new Calculator();
calculator.init();
