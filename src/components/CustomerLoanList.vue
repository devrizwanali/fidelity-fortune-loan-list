<template>
  <div>
    <b-modal ref="customerLoanListModal"
      :title="customer?.customerName" 
      hide-header-close hide-footer
      id="customerLoanList"
      >
      <div class="action-btns justify-content-around my-4">
        <b-button class="add-customer pl-3 pr-5"
          @click="addLoanModal">
          <img src="@/assets/plus.png"
          > Add Loan
        </b-button>
        <b-button class="export pl-3 pr-5"
          @click="makePayment"
          >
          <img src="@/assets/plus.png"> Make Payment
        </b-button>
        <b-button class="bulk-pay pl-3 pr-5"
          @click="liquidate"
         >
          <img src="@/assets/bulk.svg"> Liquidate
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
        class="mb-5"
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
    </b-modal>
    <add-loan ref="add-loan-modal" />
    <make-payment ref="pay-loan-modal" />
    <liquidate ref="liquidate-modal" />
  </div>
</template>
<script>
  import Pagination from '@/components/Pagination'
  import AddLoan from '@/components/AddLoan'
  import MakePayment from '@/components/MakePayment'
  import Liquidate from '@/components/Liquidate'
  import { mapGetters, mapActions } from 'vuex'
  import mixin from "@/mixins"
  export default {
    name: 'CustomerLoanList',
    data() {
      return {
        currentPage: 1,
        perPage: 10,
        filter: null,
        selectedItem: null,
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
    props: {
      customer: {
        type: Object,
        required: true
      }
    },
    mixins: [mixin],
    components: {
      Pagination, 
      AddLoan, 
      MakePayment,
      Liquidate
    },
    computed:  {
      ...mapGetters(['loans', 'totalElements', 'totalPages', 'isBusy']),
    },
    methods: {
      showModal() {
        this.$refs['customerLoanListModal'].show()
      },
      pageChangeHandler(page) {
        this.currentPage = page
        if((page * this.perPage > this.loans.length && this.totalElements > this.loans.length)) {
          this.$store.dispatch('fetchLoans', { page: page, size: this.perPage || 10 })
          this.$root.$emit('bv::refresh::table', 'loans_table')
        }
      },
      perpageChangeHandler(perPage) {
        this.perPage = perPage
        this.currentPage = 1
      },
      addLoanModal() {
        this.$refs['add-loan-modal'].showModal()
      },
      makePayment() {
        this.$refs['pay-loan-modal'].showModal()
      },
      liquidate() {
        this.$refs['liquidate-modal'].showModal()
      }
    }
  }
</script>
<style>
  #customerLoanList .modal-dialog {
    max-width: 1248px !important;
  }

  #add-loan-modal .modal-dialog {
    max-width: 610px !important;
  }
</style>
