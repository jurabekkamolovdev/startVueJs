<template>
  <div class="alert" :class="type">
    <h2>{{ title }}</h2>
    <h3>{{ text }}</h3>
    <button class="btn" :class="type" @click="$emit('close')">Yopish</button>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    text: String,
    type: {
      type: String,
      default: 'primary'
    }
  }
}
</script>
