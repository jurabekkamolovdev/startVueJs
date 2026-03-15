<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <div class="btn-card">
      <AppButton :color="'primary'" @action="open">
        {{ openNews ? 'Close' : 'Open' }}
      </AppButton>
      <AppButton v-if="wasRead" :color="'danger'" @action="$emit('unmark')">
        Bekor qilish
      </AppButton>
    </div>
    <div v-if="openNews">
      <p>{{ desc }}</p>
      <AppButton v-if="!wasRead" :color="'primary'" @action="read">
        Read
      </AppButton>
      <AppNewsList></AppNewsList>
    </div>
  </div>
</template>

<script>
import AppButton from './AppButton.vue'
import AppNewsList from './AppNewsList.vue'
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
  watch: {
    isOpen(value) {
      this.openNews = value
    }
  },
  components: {
    AppButton,
    AppNewsList
  }
}
</script>
