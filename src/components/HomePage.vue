<template>
  <div class="loans__table">
    <h1>Dashboard</h1>
    <div class="loans__table--header">
      <img src="@/assets/search.png" class="px-3 search-icon">
      <input type="text" v-model="filter" placeholder="Search by Loan No, Comput..." >
      <div style="gap: 15px; display: flex;">
        <b-button class="add-customer px-3">
          <img src="@/assets/plus.png">
          Add Customer
        </b-button>
        <b-button class="export px-3">
          <img src="@/assets/export.png">
          Export Page
        </b-button>
        <b-button class="bulk-pay px-3">
          <img src="@/assets/bulk.svg">
          Bulk Repayment
        </b-button>
      </div>
    </div>
    <b-table
      :items="loans"
      :fields="headers"
      :filter="filter"
      :current-page="currentPage"
      :per-page="perPage"
      show-empty
      small
      @filtered="onFiltered"
      >
      <template #cell(status)="data">
        <span 
          :style="{color: getColor(data.item.approved), background: getBgColor(data.item.approved)}" 
          class= "px-3 status"
        >
          {{data.value}}
        </span>
      </template>
    </b-table>
    <div class="d-flex justify-content-between align-items-center">
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
        :total-rows="totalRows"
        :per-page="perPage"
        pills
        size="sm">
      </b-pagination>

      <p>
        Showing {{((currentPage - 1) * perPage ) + 1}} to {{showingEnteries}} of {{totalRows}} entries
      </p>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        currentPage: 1,
        perPage: 10,
        filter: null,
        options: [10, 20, 50],
        headers: [
          {label: 'Office', key: 'referral'},
          {label: 'Como. No', key: 'computerNo'},
          {label: 'Name', key: 'customerName'},
          {label: 'Loan No.', key: 'loanNo'},
          {label: 'Ministry', key: 'customerName'},
          {label: 'Duration', key: 'duration'},
          {label: 'AMT. Disb', key: 'totalRepaymentAmount'},
          {label: 'Loan Amt', key: 'totalRepaymentAmount'},
          {label: 'Monthly', key: 'monthlyRepaymentAmount'},
          {label: 'S. Date', key: 'paymentStartDate'},
          {label: 'C. Date', key: 'paymentStartDate'},
          {label: 'Status', key: 'status'},
        ]
      }
    },
    computed:  {
      ...mapGetters(['loans', 'totalLoans']),

      totalRows() {
        return this.totalLoans || 1
      },

      showingEnteries () {
        if((this.currentPage * this.perPage) > this.totalLoans)
          return this.totalLoans
        else
          return this.currentPage * this.perPage
      }
    },

    async mounted() {
      await this.$store.dispatch('fetchLoans')
    },

    methods: {
      getColor(approved) {
        return approved ?  '#CC0606' :  '#06B941'
      },

      getBgColor(approved) {
        return approved ? 'rgb(204, 6, 6, 0.1)' : 'rgb(6, 185, 65, 0.1)'
      },
  
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>
<style scoped>
  @import '../assets/css/home.css'; 
</style>
