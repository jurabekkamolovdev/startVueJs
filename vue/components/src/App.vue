<template>
  <div class="container">
    <div class="card">
      <h2>So'ngi yangiliklar {{ now }}</h2>
      <h3>Ko'rilganlar soni: {{ openRate }} | O'qilganlar soni: {{ readRate }}</h3>
    </div>

    <AppNews
      v-for="item in news"
      v-bind:key="item.id"
      v-bind:id="item.id"
      v-bind:title="item.title"
      v-bind:desc="item.desc"
      v-bind:was-read="item.wasRead"
      v-on:open-news="openNews"
      v-on:read-news="readNews"
      v-on:unmark="unReadNews"
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
          desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis consequuntur accusantium cumque veritatis distinctio porro.',
          wasRead: false
        },
        {
          id: 2,
          title: 'Bugun xotin-qizlar bayrami',
          desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis consequuntur accusantium cumque veritatis distinctio porro.',
          wasRead: false
        }
      ],
      openRate: 0,
      readRate: 0
    }
  },
  components: {
    AppNews
  },
  methods: {
    openNews() {
      this.openRate++
    },

    readNews(id) {
      this.readRate++
      const inx = this.news.findIndex(item => item.id === id)
      this.news[inx].wasRead = true
    },

    unReadNews(id) {
      const item = this.news.find(item => item.id === id)
      item.wasRead = false
      this.readRate--
    }
  }
}
</script>

<style></style>
