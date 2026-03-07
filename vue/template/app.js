Vue.createApp({
    data() {
        return {
            title: 'Hello Vue!',
        }
    },

    template: `
        <div class="card">
            <h1 v-text="title"></h1>
            <button class="btn" v-on:click="handleClick">Click Me!</button>
        </div>
    `,

    methods: {
        handleClick() {
            this.title = 'Hello JS!'
        }
    }
}).mount('#app')