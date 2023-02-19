<template>
  <b-navbar toggleable="lg" class="navbar">
    <b-navbar-brand href="#" class="logo">
      <img src="@/assets/logo.svg">
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item 
          @click="$router.push({name: 'Dashboard'})"
          class="link" 
          :class="$route.name =='Dashboard' ? 'active' : ''"
          >Dashboard
        </b-nav-item>
        <b-nav-item 
          class="link"
          @click="$router.push({name: 'Reports'})"
          :class="$route.path.includes('reports') ? 'active' : ''"
          >Reports
        </b-nav-item>
        <b-nav-item 
          class="link"
          @click="$router.push({name: 'SettingsAppParameter'})"
          :class="$route.path.includes('settings') ? 'active' : ''"
          >Settings
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
            <img src="@/assets/profile.svg">
            <em class="mx-2">{{user.name}}</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    name: 'NavBar',
    methods: {
      ...mapActions(['logOut']),
      signOut() {
        this.logOut().then(res => {
          this.$router.push("/")
        })
      }
    },
    computed: {
      ...mapGetters(['user']),
    },
  }
</script>

<style scoped>
  @import '../assets/css/navbar.css';
</style>
