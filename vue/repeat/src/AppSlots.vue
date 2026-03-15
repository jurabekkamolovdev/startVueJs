<template>
  <div class="container">
    <div class="card">
      <h1>Bosh Menu</h1>
    </div>

    <AppList></AppList>

    <AppBlock>
      <h3>Hello</h3>

      <template #header>
        <h2>Header</h2>
      </template>

      <template v-slot:footer>
        <hr>
        <h2>Footer</h2>
      </template>

    </AppBlock>
  </div>
</template>

<script>
import AppBlock from './AppBlock.vue'
import AppList from './AppList.vue'

export default {
  components: {
    AppBlock,
    AppList
  }
}
</script>
