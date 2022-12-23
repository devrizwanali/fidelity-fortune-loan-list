<template>
  <div id="app">
    <NavBar />
    <b-container fluid class="mt-5">
      <HomePage />
    </b-container>
  </div>
</template>
<script>
import HomePage from '@/components/HomePage.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    HomePage,
    NavBar
  }
}
</script>
<style>
#app {
  font-family: "Poppins", sans-serif;
  background: #F4F5F5;
  height: 100vh;
}

*{
  box-sizing: border-box;
}
</style>
