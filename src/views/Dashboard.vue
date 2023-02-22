<template>
  <div class="main">
    <h1>Dashboard</h1>
    <div class="loans__table--header">
      <div>
        <img src="@/assets/search.png" class="px-3 search-icon">
        <input type="text" v-model="searchKeys.search" placeholder="Search by Loan No, Comput...">
        <b-form-select class="input-search" v-model="searchKeys.status" :options="STATUS" placeholder="Search by status"></b-form-select>
        <input type="text" class="mx-1" v-model="searchKeys.managerName" placeholder="Office">
        <input type="date" class="mx-1" style="width: 190px;" v-model="searchKeys.paymentStartDate">
        <button class="btn add-customer btn-secondary mx-1" style="width: 90px"  v-on:click="searchLoans">Search</button>
        <button class="btn export btn-secondary" style="width: 90px;" @click="clearSearch">Clear</button>
      </div>
    </div>

    <div class="action-btns mb-4 justify-content-end">
      <b-button class="add-customer px-3"
        @click="addCustomerModal"
       >
        <img src="@/assets/plus.png">
        Add Customer
      </b-button>
      <b-button class="export px-3"
        @click="exportExcel"
      >
        <img src="@/assets/export.png">
        Export Page
      </b-button>
      <b-button class="bulk-pay px-3"
        @click="blukUpload"
      >
        <img src="@/assets/bulk.svg">
        Bulk Repayment
      </b-button>
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
          class= "px-3 status cursor-pointer"
          v-if="data.value == 'INACTIVE' || data.value == 'PENDING'"
          @click="approveModal(data.item)"
        >
          {{data.value}}
        </span>

        <span
          :style="{color: getColor(data.item), background: getBgColor(data.item)}" 
          class= "px-3 status cursor-pointer"
          v-else
        >
          {{data.value}}
        </span>


      </template>

      <template #cell(ministry)="data">
        {{ data.item.employerAddress }}
      </template>

      <template #cell(loanAmount)="data">
        {{ data.item.amount | formatNumber }}
      </template>

      <template #cell(totalRepaymentAmount)="data">
        {{ data.value | formatNumber}}
      </template>

       <template #cell(monthlyRepaymentAmount)="data">
        {{ data.item.monthlyRepaymentAmount | formatNumber}}
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

    <div class="d-flex justify-content-between align-items-center p-footer">
    <div class="d-flex align-items-center" style="gap: 8px">
      <p>Show</p>
      <b-form-select
        v-model="currentPage"
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
      size="sm"
    ></b-pagination>

      <p class="pagination-footer">
        Showing {{((currentPage - 1) * perPage ) + 1}} to {{showingEnteries}} of {{totalElements}} entries
      </p>
    </div>

    <!-- customer loan list modal -->
    <customer-loan-list ref="customer-loan-modal" :customer="selectedItem" />
    <!-- approve loan -->
    <ApproveLoanMoal ref="approve-loan-dash" />
    <!-- bulk upload -->
    <bulk-upload ref="bulk-upload" />
    <!-- add customer -->
    <add-cutomer ref="addCustomerModal" :per-page="perPage" />
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import axios from '@/axios'
  import Pagination from '@/components/Pagination'
  import { jsontoexcel } from "vue-table-to-excel"
  import CustomerLoanList from '@/components/CustomerLoanList'
  import ApproveLoanMoal from '@/components/ApproveLoanModal'
  import BulkUpload from '@/components/BulkUpload'
  import AddCutomer from '@/components/AddCustomer'
  import mixin from "@/mixins"
  import moment from 'moment'
  export default {
    data() {
      return {
        currentPage: 1,
        perPage: 10,
        options: [10, 20, 50],
        searchKeys: {
          paymentStartDate: '',
          status: '',
          search: '',
          managerName: ''
        },
        selectedItem: {},
        STATUS: ['', 'ACTIVE', 'ACTIVE_PENDING', 'LIQUIDATED', 'TOPUP', 'TOPUP_PENDING', 'PENDING', 'SETTLED', 'DEFAULTED', 'INACTIVE'],
        headers: [
          {label: 'Manager', key: 'managerName'},
          {label: 'secondaryManagerName', key: ''},
          {label: 'Comp No', key: 'computerNo'},
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
      ApproveLoanMoal,
      BulkUpload,
      AddCutomer
    },
    computed:  {
      ...mapGetters(['loans', 'totalElements', 'totalPages', 'isBusy']),
      showingEnteries () {
        if((this.currentPage * this.perPage) > this.totalElements)
          return this.totalElements
        else
          return this.currentPage * this.perPage
      },
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
        let status =  { filterKey: "status", operation: "eq", value : this.searchKeys.status }
        let managerName = { filterKey: "managerName", operation: "eq", value: this.searchKeys.managerName }
        let paymentStartDate = { filterKey: "paymentStartDate", operation: "eq",  value: this.searchKeys.paymentStartDate }
        let se = { filterKey: "search", operation: "cn", value: this.searchKeys.search }
        let obj = {"dataOption": "all", "searchCriteriaList": []}
        
        if(this.searchKeys.managerName)
          obj["searchCriteriaList"].push(managerName)
        if(this.searchKeys.status)
          obj["searchCriteriaList"].push(status)
        if(this.searchKeys.search)
          obj["searchCriteriaList"].push(se)
        if(this.searchKeys.paymentStartDate)
          obj["searchCriteriaList"].push(paymentStartDate)
        this.search(JSON.stringify(obj))
      },
      generateReport(id) {
        axios.post('/report', {
          "format": "pdf",
          "loanId": id,
          "reportType": "ACCOUNT_STATEMENT"
        }).then(res => {
          this.success(res.data.message)
          window.open(res.data.response)
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
            'secondaryManagerName': loan.secondaryManagerName,
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
      async clearSearch() {
        await this.$store.dispatch('fetchLoans', { page: 1, size: this.perPage || 10 })
        this.searchKeys =  {
          paymentStartDate: '',
          status: '',
          search: '',
          managerName: ''
        }
      },
      openCustomerLoanModal(item) {
        this.selectedItem = {...item}
        this.$refs['customer-loan-modal'].showModal()
      },
      approveModal(item) {
        this.$refs['approve-loan-dash'].showModal(item)
      },
      blukUpload() {
        this.$refs['bulk-upload'].showModal()
      },
      addCustomerModal() {
        this.$refs['addCustomerModal'].showModal()
      }
    }
  }
</script>
<style>
  @import '../assets/css/home.css';
  .input-search {
    width: 180px !important;
    height: 50px !important;
    margin-left: 8px;
  }

  .p-footer p, select {
    color: #131518;
    opacity: 0.7;
    text-shadow: 0px 10px 40px rgba(1, 0, 39, 0.25);
  }

  .page-link {
    border: none;
  }

  button[role=menuitemradio], .page-item {
    color: #131518;
    opacity: 0.7;
  }
</style>
