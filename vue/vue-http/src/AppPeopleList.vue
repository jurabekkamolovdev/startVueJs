<template>
  <div v-if="people.length !== 0">
    <div class="card row"
      v-for="person in people"
      :key="person.id"
      >
      <h3>{{ person.firstName }}</h3>
      <button class="btn danger" @click="$emit('remove', person.id)">O'chirish</button>
    </div>
  </div>

  <div class="card center" v-else>
    <h3>Malumotlar hali yoq</h3>
    <button class="btn" @click="$emit('load')">Malumotlarni yukalsh</button>
  </div>

</template>

<script>
export default {
  props: {
    people: []
  }
}
</script>
