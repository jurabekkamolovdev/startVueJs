<template>
  <div class="container">
    <form class="card" @submit.prevent="submitHandler">
      <h1>Anketa Vue uchun !</h1>
      <!-- <div class="form-control" :class="{invalid: errors.name}">
        <label for="name">Ismingizni nima ?</label>
        <input
          type="text"
          id="name"
          v-model.trim="name"
          placeholder="Ismingizni yozing">
          <small v-if="errors.name">{{errors.name}}</small>
      </div> -->
      <AppInput
        label="Ismingizni nima ?"
        placeholder="Ismingizni yozing"
        :error="errors.name"
        v-model="name"
      ></AppInput>
      <div class="form-control">
        <label for="age">Yoshingiz nechida ?</label>
        <input
          type="number"
          id="age"
          v-model.number="age"
        >
      </div>

      <div class="form-control">
        <label for="city">Qayerda yashaysiz ?</label>
        <select id="city" v-model="city">
          <option value="tosh">Toshkent</option>
          <option value="sam">Samarqand</option>
          <option value="sir">Sirdaryo</option>
        </select>
      </div>

      <div class="form-control">
        <label for="">Tokioga borishni hohlaysizmi ?</label>

        <label for="" class="radio">
          <input type="radio" name="radio" value="yes" v-model="relocate">
          <span></span>
          Ha
        </label>
        <label for="" class="radio">
          <input type="radio" name="radio" value="no" v-model="relocate">
          <span></span>
          Yo'q
        </label>
      </div>

      <div class="form-control">
        <label>Vue da nimalarni bilasiz ?</label>

        <label class="checkbox">
          <input type="checkbox" name="skills" value="Vuex" v-model="skills">
          <span></span>
          Vuex
        </label>

        <label class="checkbox">
          <input type="checkbox" name="skills" value="Vue Router" v-model="skills">
          <span></span>
          Vue Router
        </label>

      </div>

      <div class="form-control">
        <label>Bizning qoidalar bilan tanishdingizmi ?</label>
        <label class="checkbox">
          <input type="checkbox" v-model="agree">
          <span></span>
          Qoidalar bilan tanishdim
        </label>

      </div>

      <button type="submit" class="btn">Yuborish</button>
    </form>
  </div>
</template>

<script>
import AppInput from './AppInput.vue'

export default {
  data() {
    return {
      name: '',
      age: 23,
      city: 'tosh',
      relocate: null,
      skills: [],
      agree: false,
      errors: {
        name: null
      }
    }
  },

  methods: {
    formIsValid() {
      let isValid = true
      if (this.name.length === 0) {
        this.errors.name = 'Ismingizni kiriting'
        isValid = false
      } else {
        this.errors.name = null
        isValid = true
      }

      return isValid
    },

    submitHandler() {
      if (this.formIsValid()) {
        console.group('Form Data')
        console.log('Name: ', this.name)
        console.log('Age: ', this.age)
        console.log('City: ', this.city)
        console.log('Relocate: ', this.relocate)
        console.log('Skills: ', this.skills)
        console.log('Agree:', this.agree)
        console.groupEnd()
      }
    }
  },

  components: {
    AppInput
  }
}
</script>

<style scoped>
  .form-control small {
    font-size: 18px;
    color: red;
  }

  .form-control.invalid input {
    border-color: red;
  }
</style>
