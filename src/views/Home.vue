<template>
  <div>
    <NavBar />
    <b-container fluid class="mt-5">
      <router-view :key="$route.path"/>
    </b-container>
  </div>
</template>
<script>
  import NavBar from '@/components/NavBar'
  export default {
    name: 'Home',
    components: {
      NavBar
    }
  }
</script>
