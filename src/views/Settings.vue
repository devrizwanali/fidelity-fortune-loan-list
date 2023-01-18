<template>
  <div class="main">
    <div class="d-flex justify-content-between align-items-center">
      <h1>Settings</h1>
      <div class="setting-items justify-content-space-around d-flex" style="cursor: pointer;">
        <div class="mx-3 pb-2 active" @click="$router.push({name: 'DashboardSettingsAppParameters'})">
          <img class="mx-2" src="@/assets/parameters.png">
          <span>Application Parameters</span>
        </div>

        <div class="mx-3 pb-2" @click="$router.push({name: 'DashboardSettingsBranchCodes'})">
          <img class="mx-2" src="@/assets/branch.png">
          <span>Branch Codes</span>
        </div>

        <div class="mx-3 pb-2">
          <img class="mx-2" src="@/assets/branch.png">
          <span>Managers</span>
        </div>
      </div>
      <img src="@/assets/dots.png">
    </div>
    <div class="my-3">
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Settings',
  }
</script>
<style scoped>
  .active {
    color: #1A237E;
    border-bottom: 2px solid #1A237E;
  }
</style>
