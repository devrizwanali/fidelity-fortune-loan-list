<template>
  <div>
    <b-table
      :items="managers"
      :fields="headers"
      current-page="1"
      per-page="10"
      show-empty
      :busy.sync="mBusy"
      small
      ref="branch-codes-table"
      responsive
      >

      <template v-slot:table-busy>
        <div class="text-center my-2" style="color: var(--blue-color);">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Loading...</strong>
        </div>
      </template>

      <template #cell(sn)="data">
        {{data.index + 1}}
      </template>

      <template #cell(actions)="data">
        <button @click="showModal(data.item)"  class="btn-edit cursor-pointer">EDIT</button>
      </template>
    </b-table>
    <pagination />

    <!-- Edit branch code -->
    <b-modal ref="edit-modal-m" title="Edit Branch" hide-header-close hide-footer>
      <form ref="application-param-form" @submit.prevent="onSubmit">
        <div class="position-relative mt-4">
          <label for="name" class="name-label">Edit Manager Name</label>
          <input type="text" v-model="selectedItem.managerName" class="input" placeholder="Manger’s Name Here">
        </div>

        <div class="position-relative mt-4">
          <label for="name" class="name-label">Edit Manager Office</label>
          <input type="text" v-model="selectedItem.office" disabled placeholder="Manger’s Office  Here" class="input">
        </div>

        <div class="d-flex justify-content-between mt-4">
          <button class="button-cancel no" @click.prevent="$refs['edit-modal-m'].hide()">Cancel</button>
          <button type="submit" class="btn-update yes">Update</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>
<script>
  import Pagination from '@/components/Pagination'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Managers',
    data() {
      return {
        selectedItem: {},
        headers: [
          {label: 'S/N', key: 'sn'},
          {label: 'Branch Manager Name', key: 'managerName'},
          {label: 'Office', key: 'office'},
          {label: '', key: 'Actions'},
          {label: 'Created By', key: 'createdBy'}
        ]
      }
    },
    components: {
      Pagination
    },
    computed: {
      ...mapGetters(['managers', 'mBusy'])
    },
    created() {
      this.$store.dispatch('fetchManagers')
    },
    methods: {
      ...mapActions(['updateManager']),
      showModal(item) {
        this.selectedItem = {...item}
        this.$refs['edit-modal-m'].show()
      },
      onSubmit() {
        this.updateManager(this.selectedItem)
        .then(res => {
          this.$refs['edit-modal-m'].hide()
        })
        .catch(error => console.log(error))
      }
    }
  }
</script>
<style scoped>
  @import '@/assets/css/form.css';
</style>