<template>
  <ul>
    <li v-for="(item, index) in news" :key="index">
      {{ item.title }}
    </li>
  </ul>
</template>

<script>
export default {
  inject: ['news']
}
</script>
