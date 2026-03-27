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
    <AppBlock></AppBlock>
  </div>
</template>

<script>
import AppAlert from './components/AppAlert.vue'
import AppBlock from './components/AppBlock.vue'
import alertMixin from '@/mixins/alertMixin.js'

export default {
  // data() {
  //   return {
  //     isAlertVisible: false
  //   }
  // },

  // methods: {
  //   toggleAlert() {
  //     this.isAlertVisible = !this.isAlertVisible
  //   }
  // },

  mixins: [alertMixin],

  components: {
    AppAlert,
    AppBlock
  }
}
</script>

<style scoped></style>
