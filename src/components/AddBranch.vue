<template>
  <b-modal ref="addBranchModal" title="Add Branch" hide-header-close hide-footer>
    <form  @submit.prevent="onSubmit">
      <div class="position-relative mt-4">
        <label for="name" class="name-label">Branch Name</label>
        <input type="text" v-model="form.name" class="input" placeholder="Branch Name is Required">
      </div>

       <div class="position-relative mt-4">
        <label for="name" class="name-label">Branch Code</label>
        <input type="text" v-model="form.code" class="input" placeholder="Branch Code is Required">
      </div>

      <div class="position-relative mt-4">
        <label for="name" class="name-label">Old Branch Code</label>
        <input type="text" v-model="form.oldCode" class="input">
      </div>

       <div class="d-flex justify-content-between mt-4">
        <button class="button-cancel" @click="$refs['addBranchModal'].hide()">Cancel</button>
        <button class="button-save">Save</button>
      </div>
    </form>
  </b-modal>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'AddBranch',
    data() {
      return {
        form: {
          name: '',
          code: '',
          oldCode: ''
        }
      }
    },
    methods: {
      ...mapActions(['addBranch']),
      showModal() {
        this.$refs['addBranchModal'].show()
      },
      onSubmit() {
        this.addBranch(this.form).then(res => {
          this.$refs['addBranchModal'].hide()
        })
      }
    }
  }
</script>
<style>
  @import "@/assets/css/form"
</style>