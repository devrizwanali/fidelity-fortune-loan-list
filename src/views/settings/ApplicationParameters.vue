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
        <div class="text-center my-2" style="color: #059e37;">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Loading...</strong>
        </div>
      </template>

      <template #cell(edit)="data">
        <button class="btn-edit">EDIT</button>
      </template>

      <template #cell(delete)="data">
        <button @click="showDelModal(data.item.id)" class="btn-delete">DELETE</button>
      </template>
    </b-table>

    <Pagination />

    <!-- Delete modal -->
    <b-modal ref="delete-modal-p" title="Delete" hide-header-close>
      <p class="text-center mt-5 del-p">Delete  Parameter?</p>
      <template #modal-footer>
        <button class="button-cancel no" @click="$refs['delete-modal-p'].hide()">No</button>
        <button @click="deleteApplication(selectedItemId)" class="button-save yes">Yes</button>
      </template>
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
        selectedItemId: null,
        headers: [
          {label: 'Parameter Name', key: 'name'},
          {label: 'Value', key: 'value'},
          {label: 'Unit', key: 'unit'},
          {label: 'Description', key: 'description'},
          {label: '', key: 'edit'},
          {label: '', key: 'delete'}        
        ]
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
      ...mapActions(['deleteApplication']),
      showDelModal(id) {
        this.selectedItemId = id;
        this.$refs['delete-modal-p'].show()
      }
    }
  }
</script>
<style>
  .table thead th {
    padding: 15px !important;
  }

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

.modal-title {
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: var(--white);
}
</style>