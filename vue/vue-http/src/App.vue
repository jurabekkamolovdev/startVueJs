<template>
  <div class="container">
    <AppAlert
      :alert="alert"
      @close="alert = null"
    ></AppAlert>
    <form class="card" @submit.prevent="createPerson">
      <h1>Malumotlar Ombori bilan ishlash</h1>
      <AppInput
        type="text"
        label="Ismingiz nima ?"
        placeholder="Ismingizni yozing"
        v-model.trim="name"
      >
      </AppInput>
      <button class="btn" type="submit" :disabled="name.length === 0">
        Yuborish
      </button>
    </form>

    <AppPeopleList
      :people="people"
      @load="loadPeople"
      @remove="removePerson"
    ></AppPeopleList>
  </div>
</template>

<script>
import AppPeopleList from './AppPeopleList.vue'
import AppInput from './AppInput.vue'
import AppAlert from './AppAlert.vue'
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      people: [],
      alert: null
    }
  },

  mounted() {
    this.loadPeople()
  },

  methods: {
    async createPerson() {
      try {
        const response = await fetch(
          'https://vue-with-https-bab88-default-rtdb.firebaseio.com/people.json',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              firstName: this.name
            })
          }
        )

        const data = await response.json()
        this.people.unshift({
          id: data.name,
          firstName: this.name
        })

        this.name = ''
      } catch (e) {
        console.log('Error: ', e)
      }
    },

    async loadPeople() {
      try {
        const { data } = await axios.get(
          'https://vue-with-https-bab88-default-rtdb.firebaseio.com/people.json'
        )

        if (!data) {
          throw new Error('Foydalanuvchilar mavjud emas')
        }

        this.people = Object.keys(data).map((key) => {
          return {
            id: key,
            firstName: data[key].firstName
          }
        })
      } catch (e) {
        this.alert = {
          type: 'danger',
          title: 'Xato!',
          text: e.message
        }
        console.log('Error: ', e)
      }
    },
    async removePerson(id) {
      this.people = this.people.filter((person) => person.id !== id)
      await axios.delete(
        `https://vue-with-https-bab88-default-rtdb.firebaseio.com/people/${id}.json`
      )
      this.alert = {
        type: 'primary',
        title: 'Qoniqarli!',
        text: 'Foydalanuvchi o\'chirildi'
      }
    }
  },

  components: {
    AppPeopleList,
    AppInput,
    AppAlert
  }
}
</script>

<style scoped></style>
