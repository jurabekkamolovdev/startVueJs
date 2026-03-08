<template>
  <div class="card">
    <h2>{{ title }}</h2>

    <button class="btn" v-on:click="open">{{ textBtn }}</button>

    <p v-if="isNewsOpen">{{ desc }}</p>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    desc: String,
    isOpen: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isNewsOpen: this.isOpen,
      textBtn: 'Open'
    }
  },

  methods: {
    open() {
      this.isNewsOpen = !this.isNewsOpen
      this.textBtn = 'Open'
      if (this.isNewsOpen) {
        this.$emit('news-open')
        this.textBtn = 'Close'
      }
    }
  }
}
</script>
