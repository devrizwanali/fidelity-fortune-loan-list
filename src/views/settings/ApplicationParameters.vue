<template>
  <div>
    <b-table
      :items="loans"
      :fields="headers"
      :filter="filter"
      :current-page="currentPage"
      :per-page="perPage"
      show-empty
      :busy.sync="isBusy"
      small
      ref="loans-table"
      responsive
      @filtered="onFiltered"
      >

      <template v-slot:table-busy>
        <div class="text-center my-2" style="color: #059e37;">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Loading...</strong>
        </div>
      </template>

      <template #cell(cDate)="actions">
        <button>Edit</button>
        <button>Delete</button>
      </template>
    </b-table>

    <div class="d-flex justify-content-between align-items-center p-footer">
      <div class="d-flex align-items-center" style="gap: 8px">
        <p>Show</p>
        <b-form-select
          v-model="perPage"
          :options="options"
          class="mb-3"
          >
        </b-form-select>
        <p>entries</p>
      </div>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalPages"
        :per-page="perPage"
        pills
        @change="pageChangeHandler"
        size="sm">
      </b-pagination>

      <p>
        Showing {{((currentPage - 1) * perPage ) + 1}} to {{showingEnteries}} of {{totalElements}} entries
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ApplicationParameters',
      data() {
      return {
        currentPage: 1,
        perPage: 10,
        filter: null,
        interval: null,
        options: [10, 20, 50],
        headers: [
          {label: 'Parameter Name', key: 'referral'},
          {label: 'Value', key: 'computerNo'},
          {label: 'Unit', key: 'customerName'},
          {label: 'Description', key: 'loanNo'},
          {label: '', key: 'Actions'},
        ]
      }
    }
  }
</script>
<style>
  .table thead th {
    padding: 15px !important;
  }
</style>