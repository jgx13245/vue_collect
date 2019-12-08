<template>
  <div>
    <h3>{{orderId}}</h3>
    <h3>{{userAgent}}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: null,
      userAgent: null
    }
  },
  created () {
    const {orderId} = this.$route.query
    const userAgent = window.navigator.userAgent

    this.orderId = orderId
    this.userAgent = userAgent
  }
}
</script>
