<template>
  <div class="container">
    <div class="card">
      <h2>So'ngi yangiliklar {{ now }}</h2>
      <h3>Ko'rilganlar soni: {{ count }}</h3>
    </div>

    <AppNews
      v-for="item in news"
      v-bind:key="item.id"
      v-bind:id="item.id"
      v-bind:title="item.title"
      v-bind:desc="item.desc"
      v-model:isOpen="isOpen"
      v-on:news-open="openNews(item.id)"
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
      ],
      count: 0
    }
  },
  components: {
    AppNews
  },
  methods: {
    openNews(id) {
      this.count++
      console.log(id)
    }
  }
}
</script>

<style></style>
