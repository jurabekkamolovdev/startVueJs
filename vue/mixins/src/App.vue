<template>
  <div class="container">
    <AppAlert
      v-if="isAlertVisible"
      title="Xato!"
      text="Habarda xatolik bor"
      type="danger"
      @close="isAlertVisible = false"
    ></AppAlert>
    <div class="card">
      <button class="btn" @click="toggleAlert">Habarni ko'rasatish</button>
    </div>
  </div>
</template>

<script>
import AppAlert from './components/AppAlert.vue'

export default {
  data() {
    return {
      isAlertVisible: false
    }
  },

  methods: {
    toggleAlert() {
      this.isAlertVisible = !this.isAlertVisible
    }
  },

  components: {
    AppAlert
  }
}
</script>

<style scoped></style>
