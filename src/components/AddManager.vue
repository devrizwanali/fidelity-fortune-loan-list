<template>
  <b-modal ref="addManagerModal" title="Add Manager" hide-header-close hide-footer>
    <form  @submit.prevent="onSubmit">
       <div class="position-relative mt-4">
          <label for="name" class="name-label">Manager Name</label>
          <input type="text" v-model="form.managerName" class="input" placeholder="Manger’s Name Here">
        </div>

        <div class="position-relative mt-4">
          <label for="name" class="name-label">Manager Office</label>
          <input type="text" v-model="form.office" placeholder="Manger’s Office  Here" class="input">
        </div>

       <div class="d-flex justify-content-between mt-4">
        <button class="button-cancel" @click="$refs['addManagerModal'].hide()">Cancel</button>
        <button class="button-save">Save</button>
      </div>
    </form>
  </b-modal>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'AddManager',
    data() {
      return {
        form: {
          managerName: '',
          office: '',
        }
      }
    },
    methods: {
      ...mapActions(['addManager']),
      showModal() {
        this.$refs['addManagerModal'].show()
      },
      onSubmit() {
        this.addManager(this.form).then(res => {
          this.$refs['addManagerModal'].hide()
        })
      }
    }
  }
</script>
<style>
  @import "@/assets/css/form"
</style>