<template>
  <div>
    <b-table
      :items="branchCodes"
      :fields="headers"
      :current-page="currentPage"
      :per-page="perPage"
      show-empty
      :busy.sync="bBusy"
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

      <template #cell(actions)="data">
        <button @click="showModal(data.item)"  class="btn-edit cursor-pointer">EDIT</button>
      </template>

      <template #cell(sn)="data">
        {{data.index + 1}}
      </template>
    </b-table>
    <pagination
      :current-page="currentPage"
      :per-page="perPage"
      :total-pages="branchCodes.length"
      :totalElements="branchCodes.length"
      @onPageChange="pageChangeHandler"
      @onPerPageChange="perpageChangeHandler"
    />

    <!-- Edit branch code -->
    <b-modal ref="edit-modal-b" title="Edit Branch" hide-header-close hide-footer>
      <form ref="application-param-form" @submit.prevent="onSubmit">
        <div class="position-relative mt-4">
          <label for="name" class="name-label">Branch Name</label>
          <input type="text" v-model="selectedItem.name" class="input" required placeholder="Branch Name is Required">
        </div>

         <div class="position-relative mt-4">
          <label for="name" class="name-label">Edit Branch Code</label>
          <input type="text" v-model="selectedItem.code" disabled class="input" placeholder="Branch Code is Required">
        </div>

        <div class="position-relative mt-4">
          <label for="name" class="name-label">Edit Old Branch Code</label>
          <input type="text" required  v-model="selectedItem.oldCode" class="input">
        </div>

        <div class="d-flex justify-content-between mt-4">
          <button class="button-cancel no" @click.prevent="$refs['edit-modal-b'].hide()">Cancel</button>
          <button type="submit" class="btn-update yes">Update</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>
<script>
  import AddBranch from '@/components/AddBranch'
  import Pagination from '@/components/Pagination'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'BranchCodes',
    data() {
      return {
        currentPage: 1,
        perPage: 10,
        selectedItem: {},
        headers: [
          {label: 'S/N', key: 'sn'},
          {label: 'Branch Name', key: 'name'},
          {label: 'Branch Code', key: 'code'},
          {label: 'Old Branch', key: 'oldCode'},
          {label: '', key: 'actions'},
          {label: 'Created By', key: 'createdBy'}
        ]
      }
    },
    components: {
      Pagination,
      AddBranch
    },
    created() {
      this.$store.dispatch('fetchBrachCodes')
    },
    computed: {
      ...mapGetters(['branchCodes', 'bBusy'])
    },
    methods: {
      ...mapActions(['updateBranch']),
      showModal(item) {
        this.selectedItem = {...item}
        this.$refs['edit-modal-b'].show()
      },
      onSubmit() {
        this.updateBranch(this.selectedItem)
        .then(res => {
          this.$refs['edit-modal-b'].hide()
        })
        .catch(error => console.log(error))
      },
      pageChangeHandler(page) {
        this.currentPage = page
      },
      perpageChangeHandler(perPage) {
        this.perPage = perPage
        this.currentPage = 1
      }
    }
  }
</script>
<style scoped>
  @import '@/assets/css/form.css';

  ::-webkit-input-placeholder {
    color: rgba(48, 36, 82, 0.5);
    text-align: center;
  }
</style>