<template>
  <div class="container">
    <div class="card">
      <h2>So'ngi yangiliklar {{ now }}</h2>
    </div>

    <AppNews
      v-for="item in news"
      v-bind:key="item.id"
      v-bind:title="item.title"
      v-bind:desc="item.desc"
    />

  </div>
</template>

<script>
import AppNews from './AppNews.vue'
export default {
  data() {
    return {
      now: new Date().toLocaleDateString(),
      news: [
        {
          id: 1,
          title: 'Bugun ramazonning 17-kuni',
          desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis consequuntur accusantium cumque veritatis distinctio porro.'
        },
        {
          id: 2,
          title: 'Bugun xotin-qizlar bayrami',
          desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis consequuntur accusantium cumque veritatis distinctio porro.'
        }
      ]
    }
  },
  components: {
    AppNews
  }
}
</script>

<style></style>
