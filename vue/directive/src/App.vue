<template>
  <div class="container">
    <div class="card">
      <h1 v-color.blink.hover="color">Formani to'ldiring!</h1>
      <form class="form-control">
        <label for="name">Ismingiz nima?</label>
        <input v-focus type="text" id="name" />
      </form>

      <button class="btn" @click="color = 'blue'">Rangni o'zgartirish</button>
    </div>
  </div>
</template>

<script>
import focusDirective from './directives/focusDirective.js'
import colorDirective from './directives/colorDirective.js'

export default {
  data() {
    return {
      color: 'red'
    }
  },

  directives: {
    focus: focusDirective,
    color: colorDirective
  }
}
</script>

<style scoped></style>
