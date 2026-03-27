<template>
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
</template>

<script>
import AppAlert from './AppAlert.vue'
import alertMixin from '@/mixins/alertMixin'

export default {
  mixins: [alertMixin],

  components: {
    AppAlert
  }
}
</script>

<style scoped></style>
