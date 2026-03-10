<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <AppButton
      :color="'primary'"
      @action="open"
    > {{ openNews ? 'Close': 'Open' }} </AppButton>
    <div v-if="openNews">
      <p>{{ desc }}</p>
      <AppButton
        v-if="!wasRead"
        :color="'primary'"
        @action="read"
      >
      Read
      </AppButton>
    </div>
  </div>
</template>

<script>
import AppButton from './AppButton.vue'
export default {
  emits: {
    'open-news': null
  },
  props: {
    title: String,
    desc: String,
    isOpen: {
      type: Boolean,
      default: false
    },
    wasRead: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      openNews: this.isOpen
    }
  },
  methods: {
    open() {
      this.openNews = !this.openNews
      if (this.openNews) {
        this.$emit('open-news')
      }
    },
    read() {
      this.open()
      this.$emit('read-news')
    }
  },
  components: {
    AppButton
  }
}
</script>
