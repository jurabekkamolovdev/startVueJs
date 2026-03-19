<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <AppButton
      color="primary"
      v-bind:text="isNewsOpen ? 'Close' : 'Open'"
      v-on:action="open"
    />
    <AppButton
      v-if="wasRead"
      color="danger"
      text="O'qilganni o'chirish"
      v-on:action="unmark"
      />
    <div v-if="isNewsOpen">
      <p>{{ desc }}</p>
      <AppButton
        v-if="!wasRead"
        text="Read"
        v-on:action="mark"
      />
    </div>
  </div>
</template>

<script>
import AppButton from './AppButton.vue'
export default {
  emits: {
    'read-news'(id) {
      if (id) {
        return true
      }
      console.warn('News da Id topilmadi')
      return false
    },
    'unmark'(id) {
      return typeof id === 'number'
    },
    'open-news'() {
      return true
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
      isNewsOpen: this.isOpen
    }
  },

  methods: {
    open() {
      this.isNewsOpen = !this.isNewsOpen
      if (this.isNewsOpen) {
        this.$emit('open-news')
      }
    },

    mark() {
      this.open()
      this.$emit('read-news', this.id)
    },

    unmark() {
      this.$emit('unmark', this.id)
    }
  },
  components: {
    AppButton
  }
}
</script>
