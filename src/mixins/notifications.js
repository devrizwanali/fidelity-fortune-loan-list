export default {
  data() {
    return {
      toastOpt: {
        position: 'top-right'
      }
    }
  },
  methods: {
    success (message) {
      this.$toast.success(message, this.toastOpt)
    },
    error(message) {
      this.$toast.error(message, this.toastOpt)
    }
  }
}
