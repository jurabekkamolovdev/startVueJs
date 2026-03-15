<template>
  <div class="container">
    <div class="card">
      <h1>Dinamik Componentlar</h1>

      <div class="btn-card">
        <AppButton
          :color="active === 'one' ? 'primary' : ''"
          @action="active='one'"
        >One</AppButton>
        <AppButton
          :color="active === 'two' ? 'primary' : ''"
          @action="active='two'"
        >Two</AppButton>
      </div>
    </div>

    <AppTextOne v-if="active === 'one'"></AppTextOne>
    <AppTextTwo v-else-if="active === 'two'"></AppTextTwo>
  </div>
</template>

<script>
import AppButton from './AppButton.vue'
import AppTextOne from './AppTextOne.vue'
import AppTextTwo from './AppTextTwo.vue'

export default {
  data() {
    return {
      active: 'one'
    }
  },
  components: {
    AppButton,
    AppTextOne,
    AppTextTwo
  }
}
</script>
