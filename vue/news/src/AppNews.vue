<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <div class="div-btn">
      <AppButton @action="open">{{ isNewsOpen ? 'Close' : 'Open' }}</AppButton>
      <AppButton
        color="danger"
        v-if="isNewsRead"
        @action="unmark"
      >Qayta o'qish</AppButton>
    </div>
    <div v-if="isNewsOpen">
      <p>{{ desc }}</p>
      <AppButton v-if="!isNewsRead" @action="read" color="primary"
        >Read</AppButton
      >
    </div>
  </div>
</template>

<script>
import AppButton from './AppButton.vue'

export default {
  props: {
    title: {
      type: String
    },
    desc: {
      type: String
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isNewsOpen: this.isOpen,
      isNewsRead: this.isRead
    }
  },

  methods: {
    open() {
      this.isNewsOpen = !this.isNewsOpen

      if (this.isNewsOpen) {
        this.$emit('news-open')
      }
    },

    read() {
      this.isNewsOpen = !this.isNewsOpen
      this.isNewsRead = !this.isNewsRead
      this.$emit('news-read')
    },

    unmark() {
      this.isNewsRead = !this.isNewsRead
      this.$emit('unmark')
    }
  },

  components: {
    AppButton
  }
}
</script>

<style scoped>
p {
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
