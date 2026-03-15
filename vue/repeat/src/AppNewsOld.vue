<template>
  <div class="container" id="app">
    <div class="card">
      <h2>So'ngi yangiliklar</h2>
      <h3>
        Yangiliklar ochilish soni: {{ openRate }} | O'qilganlar soni:
        {{ readRate }}
      </h3>
    </div>

    <AppNews
      v-for="item in news"
      :key="item.id"
      :title="item.title"
      :desc="item.desc"
      :is-open="item.isOpen"
      :was-read="item.wasRead"
      @open-news="open"
      @read-news="read(item.id)"
      @unmark="unmark(item.id)"
    />
  </div>
</template>

<script>
import AppNews from './AppNews.vue'
export default {
  data() {
    return {
      openRate: 0,
      readRate: 0,
      news: [
        {
          id: 1,
          title: 'RealHakaton boshlanishi uchun vaqt?',
          desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, accusantium sint eius facilis rerum totam quis? Architecto, eveniet? Iusto, accusantium.s',
          isOpen: false,
          wasRead: false
        },
        {
          id: 2,
          title: 'Markaziy Bankning Hakatoni haqida',
          desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, accusantium sint eius facilis rerum totam quis? Architecto, eveniet? Iusto, accusantium.s',
          isOpen: false,
          wasRead: false
        }
      ]
    }
  },
  methods: {
    open() {
      this.openRate++
    },
    read(id) {
      const item = this.news.find((item) => item.id === id)
      item.wasRead = true
      item.isOpen = false
      this.readRate++
    },
    unmark(id) {
      const item = this.news.find((item) => item.id === id)
      item.wasRead = false
      item.isOpen = true
      this.readRate--
    }
  },
  components: {
    AppNews
  },
  provide() {
    return {
      news: this.news
    }
  }
}
</script>

<style scoped>
  h2 {
    color: violet;
  }
</style>
