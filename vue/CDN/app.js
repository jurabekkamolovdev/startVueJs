const App = {
    data() {
        return {
            title: 'Message',
            placeholder: 'Habar yozing',
            inputValue: '',
            notes: ['1-Task', '2-Task']
            // counter: 0,
        };
    },

    methods: {
        inputChangeHandler(event) {
            this.inputValue = event.target.value;
        },

        addHandler() {
            if (this.inputValue !== '') this.notes.push(this.inputValue);
            this.inputValue = '';
        },

        popHandler() {
            this.notes.pop();
        },

        toUpperCase(item) {
            return item.toUpperCase();
        },

        deleteHandler(index) {
            this.notes.splice(index, 1);
        },

        keypressHandler(event) {
            if (event.key === 'Enter') {
                this.addHandler();
            }
        },

        // doubleCount() {
        //     console.log('dCount');
        //     return this.notes.length * 2
        // }

    },

    computed: {
        doubleCount() {
            console.log('dCount');
            return this.notes.length * 2
        }
    },

    watch: {
        inputValue(value) {
            console.log('Watch', value)
        }
    }
};

Vue.createApp(App).mount('#app')