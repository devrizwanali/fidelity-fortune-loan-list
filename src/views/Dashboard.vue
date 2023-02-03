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
          @click="exportExcel"
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
      ref="loans_table"
      responsive
      >

      <template v-slot:table-busy>
        <div class="text-center my-2" style="color: var(--blue-color);">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Loading...</strong>
        </div>
      </template>

      <template #cell(customerName)="data">
        <span class="cursor-pointer" 
          @click="openCustomerLoanModal(data.item)">
          {{data.value}}
        </span>
      </template>

      <template #cell(status)="data">
        <span 
          :style="{color: getColor(data.item), background: getBgColor(data.item)}" 
          class= "px-3 status"
          v-if="data.value != 'INACTIVE'"
        >
          {{data.value}}
        </span>

        <span
          :style="{color: getColor(data.item), background: getBgColor(data.item)}" 
          class= "px-3 status cursor-pointer"
          v-else
          @click="approveModal(data.item)"
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

    <!-- customer loan list modal -->
    <customer-loan-list ref="customer-loan-modal" :customer="selectedItem" />
    <!-- approve loan -->
    <ApproveLoanMoal ref="approve-loan-dash" />
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import axios from '@/axios'
  import Pagination from '@/components/Pagination'
  import { jsontoexcel } from "vue-table-to-excel"
  import CustomerLoanList from '@/components/CustomerLoanList'
  import ApproveLoanMoal from '@/components/ApproveLoanModal'
  import mixin from "@/mixins"
  import moment from 'moment'
  export default {
    data() {
      return {
        currentPage: 1,
        perPage: 10,
        filter: null,
        selectedItem: {},
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
    mixins: [mixin],
    components: {
      Pagination,
      CustomerLoanList,
      ApproveLoanMoal
    },
    computed:  {
      ...mapGetters(['loans', 'totalElements', 'totalPages', 'isBusy']),
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
          this.$root.$emit('bv::refresh::table', 'loans_table')
        }
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
        }).catch(error => {
          this.error(error.message)
        })
      },
      perpageChangeHandler(perPage) {
        this.perPage = perPage
        this.currentPage = 1
      },
      exportExcel() {
        const fileName = `${new Date()}.csv`
        const headers = this.headers.map(x => x.label)
        var _this = this
        let data = this.loans.map(loan => {
          return  {
            'Office': loan.managerName,
            'Como. No': loan.computerNo,
            'Name': loan.customerName,
            'Loan No.': loan.loanNo,
            'Ministry': loan.customerName,
            'Duration': loan.duration,
            'AMT. Disb': loan.totalRepaymentAmount,
            'Loan Amt': loan.totalRepaymentAmount,
            'Monthly': loan.monthlyRepaymentAmount,
            'S. Date': moment(loan.paymentStartDate).format("MM/DD/YYYY") ,
            'CDate': moment(loan.created).format("MM/DD/YYYY") ,
            'Status': loan.status
          }
        })
        jsontoexcel.getXlsx(data, headers, fileName);
      },
      openCustomerLoanModal(item) {
        this.selectedItem = {...item}
        this.$refs['customer-loan-modal'].showModal()
      },
      approveModal(item) {
        this.$refs['approve-loan-dash'].showModal(item)
      }
    }
  }
</script>
<style scoped>
  @import '../assets/css/home.css'; 
</style>
