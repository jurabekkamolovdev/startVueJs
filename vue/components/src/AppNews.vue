<template>
  <div class="card">
    <h2>{{ title }}</h2>

    <button class="btn" v-on:click="open">{{ textBtn }}</button>
    <button class="btn-danger" v-if="wasRead" v-on:click="$emit('unmark', this.id)">O'qilganni olish</button>
    <div v-if="isNewsOpen">
      <p>{{ desc }}</p>
      <button class="btn-read" v-if="!wasRead" v-on:click="mark">O'qish</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: {
    'read-news'(id) {
      if (id) {
        return true
      }
      console.warn('News da Id topilmadi')
      return false
    }
  },
  props: {
    id: Number,
    title: String,
    desc: String,
    isOpen: {
      type: Boolean,
      default: false
    },
    wasRead: Boolean
  },

  data() {
    return {
      textBtn: 'Open',
      isNewsOpen: this.isOpen
    }
  },

  methods: {
    open() {
      this.isNewsOpen = !this.isNewsOpen
      this.textBtn = 'Open'
      if (this.isNewsOpen) {
        this.$emit('open-news')
        this.textBtn = 'Close'
      }
    },

    mark() {
      this.open()
      this.$emit('read-news', this.id)
    }

    // unmark() {
    //   this.$emit('unmark', this.id)
    // }
  }
}
</script>
