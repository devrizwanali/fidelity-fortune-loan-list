<template>
  <div class="main">
    <h1>Dashboard</h1>
    <div class="loans__table--header">
      <img src="@/assets/search.png" class="px-3 search-icon">
      <input type="text" v-model="filter" placeholder="Search by Loan No, Comput..." v-on:keyup="searchLoans">
      <div class="action-btns">
        <b-button class="add-customer px-3">
          <img src="@/assets/plus.png">
          Add Customer
        </b-button>
        <b-button class="export px-3"
          @click="exportFile"
        >
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
      :current-page="currentPage"
      :per-page="perPage"
      show-empty
      :busy.sync="isBusy"
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

      <template #cell(status)="data">
        <span 
          :style="{color: getColor(data.item), background: getBgColor(data.item)}" 
          class= "px-3 status"
        >
          {{data.value}}
        </span>
      </template>

      <template #cell(ministry)="data">
        {{ data.item.customerName }}
      </template>

      <template #cell(loanAmount)="data">
        {{ data.item.totalRepaymentAmount }}
      </template>

      <template #cell(CDate)="data">
        {{data.item.created | formatDate }}
      </template>

      <template #cell(SDate)="data">
        {{data.item.paymentStartDate | formatDate }}
      </template>

      <template #cell(loanNo)="data">
        <span @click="generateReport(data.item.id)" class="cursor-pointer">{{data.item.loanNo}}</span>
      </template>
    </b-table>
    <pagination
      :current-page="currentPage"
      :per-page="perPage"
      :total-pages="totalPages"
      :totalElements="totalElements"
      @onPageChange="pageChangeHandler"
      @onPerPageChange="perpageChangeHandler"
    />
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import axios from '@/axios'
  import moment from 'moment'
  import Pagination from '@/components/Pagination'
  export default {
    data() {
      return {
        currentPage: 1,
        perPage: 10,
        filter: null,
        headers: [
          {label: 'Office', key: 'managerName'},
          {label: 'Como. No', key: 'computerNo'},
          {label: 'Name', key: 'customerName'},
          {label: 'Loan No.', key: 'loanNo'},
          {label: 'Ministry', key: 'ministry'},
          {label: 'Duration', key: 'duration'},
          {label: 'AMT. Disb', key: 'totalRepaymentAmount'},
          {label: 'Loan Amt', key: 'loanAmount'},
          {label: 'Monthly', key: 'monthlyRepaymentAmount'},
          {label: 'S. Date', key: 'SDate'},
          {label: 'C. Date', key: 'CDate'},
          {label: 'Status', key: 'status'},
        ]
      }
    },
    components: {
      Pagination
    },
    computed:  {
      ...mapGetters(['loans', 'totalElements', 'totalPages', 'isBusy']),
    },

    filters: {
      formatDate (date) {
        return moment(date).format("MM/DD/YYYY") 
      }
    },

    async beforeCreate() {
      await this.$store.dispatch('fetchLoans', { page: 1, size: this.perPage || 10 })
    },

    methods: {
      ...mapActions(['search']),
      pageChangeHandler(page) {
        this.currentPage = page
        if((page * this.perPage > this.loans.length && this.totalElements > this.loans.length)) {
          this.$store.dispatch('fetchLoans', { page: page, size: this.perPage || 10 })
          this.$root.$emit('bv::refresh::table', 'loans-table')
        }
      },
      getColor(loan) {
        if(loan.status == 'SETTLED' || loan.status == 'LIQUIDATED')
        return 'var(--blue)'
        else if (loan.approved)
        return '#06B941'
        else
        return '#CC0606'
      },
      getBgColor(loan) {
        if(loan.status == 'SETTLED' || loan.status == 'LIQUIDATED')
        return 'rgba(0, 68, 170, 0.1)'
        else if (loan.approved)
        return 'rgb(6, 185, 65, 0.1)'
        else
        return 'rgb(204, 6, 6, 0.1)'
      },
      searchLoans() {
        this.currentPage = 1
        this.search({page: 1, size: this.perPage || 10, query: this.filter})
      },
      generateReport(id) {
        axios.post('/report', {
          "format": "pdf",
          "loanId": id,
          "reportType": "ACCOUNT_STATEMENT"
        }).then(res => {
          window.open(res.response)
        })
      },
      perpageChangeHandler(perPage) {
        this.perPage = perPage
        this.currentPage = 1
      },
      exportFile() {
      }
    }
  }
</script>
<style scoped>
  @import '../assets/css/home.css'; 
</style>
