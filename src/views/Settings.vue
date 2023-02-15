<template>
  <div class="main">
    <div class="d-flex justify-content-between align-items-center">
      <h1>Settings</h1>
      <div class="setting-items justify-content-space-around d-flex" style="cursor: pointer;">
        <div class="mx-3 pb-2" 
          @click="$router.push({name: 'SettingsAppParameter'})"
          :class="$route.name == 'SettingsAppParameter' ? 'active-setting' : ''"
          >
          <AppParamtere 
            class="mx-2" 
            :color="$route.name == 'SettingsAppParameter' ? '#1A237E' : 'black'" 
          />
          <span>Application Parameters</span>
        </div>

        <div 
          class="mx-3 pb-2" 
          @click="$router.push({name: 'SettingsBranchCodes'})" 
          :class="$route.name == 'SettingsBranchCodes' ? 'active-setting' : ''"
          >
          <BranchCode 
            class="mx-2"
            :color="$route.name == 'SettingsBranchCodes' ? '#1A237E' : 'black'" 
          />
          <span>Branch Codes</span>
        </div>

        <div 
          class="mx-3 pb-2" 
          @click="$router.push({name: 'SettingsManagers'})" 
          :class="$route.name == 'SettingsManagers' ? 'active-setting' : ''"
          >
          <BranchCode 
            class="mx-2" 
            :color="$route.name == 'SettingsManagers' ? '#1A237E' : 'black'" 
          />
          <span>Managers</span>
        </div>
      </div>
      <div>
        <img @click="showModal" src="@/assets/add.svg" class="mr-5 cursor-pointer" v-if="addBranchOrManager">
        <img src="@/assets/dots.svg" class="cursor-pointer">
      </div>
    </div>
    <div class="my-3">
      <router-view :key="$route.path" />
    </div>

    <add-branch ref="addBranch"/>
    <add-manager ref="addManager"/>
  </div>
</template>

<script>
  import BranchCode from '@/components/icons/BranchCode'
  import AppParamtere from '@/components/icons/AppParamtere'
  import AddBranch from '@/components/AddBranch'
  import AddManager from '@/components/AddManager'

  export default {
    name: 'Settings',
    components: {
      BranchCode,
      AddBranch,
      AppParamtere,
      AddManager
    },
    computed: {
      addBranchOrManager() {
        return (this.$route.name === 'SettingsManagers' || this.$route.name === 'SettingsBranchCodes')
      },
      routeName() {
        return this.$route.name
      }
    },
    methods: {
      showModal() {
        if(this.routeName == 'SettingsManagers') {
          this.$refs['addManager'].showModal()
        } else {
          this.$refs['addBranch'].showModal()
        }
      }
    }
  }
</script>
<style>
.active-setting {
  color: #1A237E;
  border-bottom: 2px solid #1A237E;
}
header {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  display: block !important;
  color: #FFFFFF;
  background: var(--blue-color) !important;
}
.table thead th {
  padding: 15px !important;
}
.modal-content {
  border: none;
  border-radius: 0;
}
.modal-title {
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: var(--white);
}
.modal-body {
  text-align: center !important;
}
.modal-dialog {
  max-width: 349px !important;
}
</style>
