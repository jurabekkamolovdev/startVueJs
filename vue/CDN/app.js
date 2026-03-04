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
            if (this.inputValue !== '') this.notes.push(this.inputValue)
            this.inputValue = ''
        },

        popHandler() {
            this.notes.pop()
        },
        
        deleteHandler(index) {
            this.notes.splice(index, 1)
        }
    }
}

Vue.createApp(App).mount("#app")

