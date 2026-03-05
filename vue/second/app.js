Vue.createApp({
    data() {
        return {
            title: 'Hello, Vue!',
            items: [1, 2, 3, 4, 5, 6],
        }
    },
    
    methods: {
        addItem() {
            this.items.push(this.$refs.inputValue.value)
            this.$refs.inputValue.value = ''
        }
    },
    
    // computed: {
    //     evenItems() {
    //         this.items = this.items.filter(val => val%2 === 0)
    //         return this.items
    //     }
    // }
}).mount('#app')