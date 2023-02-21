<template>
  <div id="app">
    <router-view :key="$route.path"/>
  </div>
</template>
<script>
export default {
  name: 'App',
}
</script>
<style>
#app {
  font-family: "Poppins", sans-serif;
  background: #F4F5F5;
  height: 100vh;
}

* {
  box-sizing: border-box;
}


.main h1 {
  font-weight: 600;
  font-size: 24px;
  color: #131518;
  margin-top: 15px;
  margin-bottom: 15px;
}

.main {
  padding: 20px;
  background: var(--white);
  box-shadow: 0px 0px 30px rgba(42, 89, 152, 0.03);
  border-radius: 10px;
}

.cursor-pointer {
  cursor: pointer !important;
}

.v-toast__item--error {
  background-color: var(--red) !important;
}

#approve-loan-modal .modal-dialog {
  max-width: 610px !important;
}

.liquidate-modal .modal-dialog {
  max-width: 610px !important;
}
</style>
