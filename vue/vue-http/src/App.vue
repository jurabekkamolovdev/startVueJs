<template>
  <div class="container">
    <form class="card" @submit.prevent="createPerson">
      <h1>Malumotlar Ombori bilan ishlash</h1>
      <!-- <div class="form-control">
        <label for="name">Ismingiz nima ?</label>
        <input
          type="text"
          id="name"
          placeholder="Ismingizni yozing"
          v-model.trim="name"
        />
      </div> -->
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
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      people: []
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
        console.log(data)
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
          this.people = []
          return
        }

        this.people = Object.keys(data).map((key) => {
          return {
            id: key,
            firstName: data[key].firstName
          }
        })
      } catch (e) {
        console.log('Error: ', e)
      }
      // const dataPeople = response.data

      // for (const key in dataPeople) {
      //   console.log(dataPeople[key].firstName)
      // }
    },
    // async loadPeople() {
    //   try {
    //     const response = await fetch(
    //       'https://vue-with-https-bab88-default-rtdb.firebaseio.com/people.json'
    //     )
    //     const data = await response.json()
    //     for (const key in data) {
    //       this.people.push(data[key].firstName)
    //     }
    //   } catch (e) {
    //     console.log('Error:', e)
    //   }
    // }
    async removePerson(id) {
      await axios.delete(
        `https://vue-with-https-bab88-default-rtdb.firebaseio.com/people/${id}.json`
      )
      // const index = this.people.indexOf(person => person.id === id)
      // this.people.splice(index, 1)
      this.people = this.people.filter((person) => person.id !== id)
    }
  },

  components: {
    AppPeopleList,
    AppInput
  }
}
</script>

<style scoped></style>
