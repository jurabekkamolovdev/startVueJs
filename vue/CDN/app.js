const App = {
    data() {
        return {
            title: 'Message',
            placeholder: 'Habar yozing',
            inputValue: '',
            notes: ['1-Task', '2-Task']
            // counter: 0,
        }
    },

    methods: {
        inputChangeHandler(event) {
            this.inputValue = event.target.value
        },

        addHandler() {
            this.notes.push(this.inputValue)
            this.inputValue = ''
        }
    }
}

Vue.createApp(App).mount("#app")

