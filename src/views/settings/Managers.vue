<template>
  <div>
    <b-table
      :items="[]"
      :fields="headers"
      current-page="1"
      per-page="10"
      show-empty
      busy.sync="false"
      small
      ref="branch-codes-table"
      responsive
      >

      <template v-slot:table-busy>
        <div class="text-center my-2" style="color: #059e37;">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Loading...</strong>
        </div>
      </template>

      <template #cell(actions)="data">
       <button>Edit</button>
      </template>
    </b-table>
    <pagination />
  </div>
</template>
<script>
  import Pagination from '@/components/Pagination'
  export default {
    name: 'Managers',
    data() {
      return {
        headers: [
          {label: 'S/N', key: 'referral'},
          {label: 'Branch Manager Name', key: 'computerNo'},
          {label: 'Office', key: 'customerName'},
          {label: '', key: 'Actions'},
          {label: 'Created By', key: 'createdBy'}
        ]
      }
    },
    components: {
      Pagination
    }
  }
</script>
<style>
  .table thead th {
    padding: 15px !important;
  }
</style>