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
        <img @click="showModal" src="@/assets/add.png" class="mr-5 cursor-pointer" v-if="addBranchOrManager">
        <img src="@/assets/dots.png" class="cursor-pointer">
      </div>
    </div>
    <div class="my-3">
      <router-view :key="$route.path" />
    </div>


     <b-modal :ref="routeName" :title="'Add ' + modalHeader" hide-header-close>
      <p class="my-4">{{this.routeName}}</p>

      <input type="text" name="" style="background: rgba(255, 255, 255, 0.01);
background-blend-mode: multiply;">

      <template #modal-footer>
           <button class="button-cancel" @click="$refs[routeName].hide()">Cancel</button>
           <button class="button-save">Save</button>
      </template>
     </b-modal>
  </div>
</template>

<script>
  import BranchCode from '@/components/icons/BranchCode'
  import AppParamtere from '@/components/icons/AppParamtere'

  export default {
    name: 'Settings',
    components: {
      BranchCode,
      AppParamtere
    },
    computed: {
      addBranchOrManager() {
        return (this.$route.name === 'SettingsManagers' || this.$route.name === 'SettingsBranchCodes')
      },
      routeName() {
        return this.$route.name
      },
      modalHeader() {
        if(this.routeName == 'SettingsManagers') 
          return 'Manager'
        else if(this.routeName == 'SettingsBranchCodes')
          return 'Branch'
        else
          'Parameter'
      }
    },
    methods: {
      showModal() {
        this.$refs[this.routeName].show()
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
    background: var(--blue);
  }

  .modal-content {
    border: none;
    border-radius: 0;
  }
  .modal-dialog {
    max-width: 349px;
  }
  .button-cancel {
    width: 130px;
    height: 53px;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 24px;
    border: 0;
}

.modal-footer {
  border-top: 0;
  justify-content: space-between;
}

  .button-save {
    width: 130px;
    height: 53px;
    color: white;
    border: 0;
    background: var(--blue);
    border-radius: 24px;
  }
</style>
