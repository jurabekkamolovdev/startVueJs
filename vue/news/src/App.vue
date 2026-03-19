<template>
  <div class="container">
    <div class="card">
      <h1>Eng so'ngi yangiliklar - {{ now }}</h1>
      <h2>
        Ochilgan yangiliklar soni: {{ openRate }} | O'qilganlar soni:
        {{ readRate }}
      </h2>
      <div class="div-btn">
        <AppButton
          :color="oneColor"
          @action="active='one'"
        >One</AppButton>
        <AppButton
          :color="twoColor"
          @action="active='two'"
        >Two</AppButton>
      </div>
    </div>

    <KeepAlive>
      <component
        :is="componentName"
      ></component>
    </KeepAlive>

    <AppNews
      v-for="item in news"
      :key="item.id"
      :title="item.title"
      :desc="item.desc"
      :is-open="item.isOpen"
      :is-read="item.isRead"
      @news-open="open"
      @news-read="read(item.id)"
      @unmark="unmark()"
    ></AppNews>
  </div>
</template>

<script>
import AppButton from './AppButton.vue'
import AppNews from './AppNews.vue'
import AppTextOne from './AppTextOne.vue'
import AppTextTwo from './AppTextTwo.vue'

export default {
  data() {
    return {
      active: 'one',
      now: new Date().toLocaleDateString(),
      openRate: 0,
      readRate: 0,
      news: [
        {
          id: 1,
          title: 'RealHolat hackathon natijalari',
          desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem tempore illo, eveniet voluptas ipsum culpa cupiditate ab! Fugiat, aliquam omnis.',
          isOpen: false,
          isRead: false
        },
        {
          id: 2,
          title: "Yo'l qurilsh Sergilida",
          desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem tempore illo, eveniet voluptas ipsum culpa cupiditate ab! Fugiat, aliquam omnis.',
          isOpen: false,
          isRead: false
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
      item.isRead = true
      this.readRate++
    },

    unmark() {
      this.readRate--
    }
  },

  computed: {
    componentName() {
      return this.active === 'one' ? 'AppTextOne' : 'AppTextTwo'
    },

    oneColor() {
      return this.active === 'one' ? 'primary' : ''
    },

    twoColor() {
      return this.active === 'two' ? 'primary' : ''
    }
  },

  components: {
    AppNews,
    AppButton,
    AppTextOne,
    AppTextTwo
  }
}
</script>

<style></style>
