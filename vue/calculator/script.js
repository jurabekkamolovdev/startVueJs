Vue.createApp({
    data() {
        return {
            displayValue: '0'
        }
    },
    
    methods: {
        inputNumber(number) {
            this.displayValue === '0'
                ? this.displayValue = String(number)
                : this.displayValue += String(number)
        },

        inputOperator(operator) {
            this.displayValue === '0'
                ? this.displayValue = String(operator)
                : this.displayValue += String(operator)
        },

        clear() {
            this.displayValue = '0'
        },

        calculate() {
            try {
                this.displayValue = eval(this.displayValue)
            } catch {
                this.displayValue = 'Error'
            }
            
        }
    }
}).mount('#app')