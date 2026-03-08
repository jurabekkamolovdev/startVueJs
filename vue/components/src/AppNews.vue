<template>
  <div class="card">
    <h2>{{ title }}</h2>

    <button class="btn" v-on:click="isOpen = !isOpen">Ko'rish</button>

    <p v-if="isOpen">{{ desc }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    desc: String
  },

  data() {
    return {
      isOpen: false
    }
  }
}
</script>
