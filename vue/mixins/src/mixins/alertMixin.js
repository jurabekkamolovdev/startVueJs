export default {
  data() {
    return {
      isAlertVisible: false
    }
  },

  methods: {
    toggleAlert() {
      this.isAlertVisible = !this.isAlertVisible
    }
  }
}
