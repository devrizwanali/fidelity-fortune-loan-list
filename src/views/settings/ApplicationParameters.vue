<template>
  <div>
    <b-table
      :items="parameters"
      :fields="headers"
      :current-page="currentPage"
      :per-page="perPage"
      show-empty
      :busy.sync="busy"
      small
      ref="loans-table"
      responsive
      >

      <template v-slot:table-busy>
        <div class="text-center my-2" style="color: var(--blue-color);">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Loading...</strong>
        </div>
      </template>

      <template #cell(edit)="data">
        <button @click="showDelModal(data.item, 'edit-modal-p')" class="btn-edit">EDIT</button>
      </template>

      <template #cell(delete)="data">
        <button @click="showDelModal(data.item, 'delete-modal-p')" class="btn-delete">DELETE</button>
      </template>
    </b-table>
    <pagination
      :current-page="currentPage"
      :per-page="perPage"
      :total-pages="parameters.length"
      :totalElements="parameters.length"
      @onPageChange="pageChangeHandler"
      @onPerPageChange="perpageChangeHandler"
    />

    <!-- Delete modal -->
    <b-modal ref="delete-modal-p" title="Delete" hide-header-close hide-footer>
      <p class="text-center mt-5 del-p">Delete  Parameter?</p>
      <div class="d-flex justify-content-between mt-4">
        <button class="button-cancel no" @click="$refs['delete-modal-p'].hide()">No</button>
        <button @click="deleteParameter()" class="button-save yes">Yes</button>
      </div>
    </b-modal>

    <!-- Edit application parameter -->
    <b-modal ref="edit-modal-p" title="Edit Parameter" hide-header-close hide-footer>
      <form ref="application-param-form" @submit.prevent="onSubmit">
        <div class="position-relative mt-4">
          <label for="name" class="name-label">Parameter Name</label>
          <input type="text" v-model="selectedItem.name" disabled class="input" placeholder="Enter Name">
        </div>

         <div class="position-relative mt-4">
          <label for="name" class="name-label">Value</label>
          <input type="text" v-model="selectedItem.value" required class="input" placeholder="Enter Value">
        </div>

        <div class="position-relative mt-4">
          <label for="name" class="name-label">Unit</label>
          <input type="text" v-model="selectedItem.unit" disabled class="input">
        </div>
       
        <div class="position-relative mt-4">
          <label for="name" class="name-label">Description</label>
          <textarea type="text" v-model="selectedItem.description" required class="textarea"></textarea>
        </div>


        <div class="d-flex justify-content-between mt-4">
          <button class="button-cancel no" @click.prevent="$refs['edit-modal-p'].hide()">Cancel</button>
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
    name: 'ApplicationParameters',
    data() {
      return {
        currentPage: 1,
        perPage: 10,
        filter: null,
        interval: null,
        options: [10, 20, 50],
        selectedItem: {},
        headers: [
          {label: 'Parameter Name', key: 'name'},
          {label: 'Value', key: 'value'},
          {label: 'Unit', key: 'unit'},
          {label: 'Description', key: 'description'},
          {label: '', key: 'edit'},
          {label: '', key: 'delete'}        
        ],
      }
    },
    components: {
      Pagination
    },
    created() {
      this.$store.dispatch('fetchParameters')
    },
    computed: {
      ...mapGetters(['parameters', 'busy'])
    },
    methods: {
      ...mapActions(['deleteApplication', 'updateApplication']),
      showDelModal(item, ref) {
        this.selectedItem = {...item};
        this.$refs[ref].show()
      },
      deleteParameter() {
        // this.deleteApplication(this.selectedItem.id)
        //   .then(res => {
        //     this.$refs['delete-modal-p'].hide()
        //   })
        //   .catch(error => {
        //     console.log(error)
        //   })
        this.$refs['delete-modal-p'].hide()
      },
      onSubmit() {
        this.updateApplication(this.selectedItem)
        .then(res => {
          this.$refs['edit-modal-p'].hide()
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
.btn-delete {
  color: var(--red);
  width: 117px;
  border: 0;
  background: rgba(204, 6, 6, 0.1);
  border-radius: 4px;
}

p.del-p {
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: #000000;
}

.no, .yes {
  font-weight: 500;
  font-size: 20px;
  height: 47px;
}
</style>