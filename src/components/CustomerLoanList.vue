<template>
  <div>
    <b-modal ref="customerLoanListModal"
      :title="customer.customerName" 
      hide-footer
      hide-header-close
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
        :items="customerLoans"
        :fields="headers"
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
          <img
            class="cursor-pointer"
            src="@/assets/naira-sign.png" 
            width="25"
            height="25"
            @click="topUpLoanModal(data.item)"
            v-if="data.item.approved && !(data.item.status == 'SETTLED' || data.item.status == 'LIQUIDATED')">
          <span 
            :style="{color: getColor(data.item), background: getBgColor(data.item)}" 
            class= "px-3 status cursor-pointer"
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
    </b-modal>
    <add-loan ref="add-loan-modal" :customer="customer" />
    <make-payment ref="pay-loan-modal" />
    <liquidate ref="liquidate-modal" />
    <top-up-loan ref="top-up-loan-modal" />
    <ApproveLoanMoal ref="approve-loan-cus" />
  </div>
</template>
<script>
  import AddLoan from '@/components/AddLoan'
  import MakePayment from '@/components/MakePayment'
  import Liquidate from '@/components/Liquidate'
  import TopUpLoan from '@/components/TopUpLoan'
  import ApproveLoanMoal from '@/components/ApproveLoanModal'
  import { mapGetters, mapActions } from 'vuex'
  import mixin from "@/mixins"
  import axios from '@/axios'
  export default {
    name: 'CustomerLoanList',
    data() {
      return {
        isBusy: true,
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
      AddLoan,
      MakePayment,
      TopUpLoan,
      Liquidate,
      ApproveLoanMoal
    },
    watch: {
      customer: function(newVal, oldVal) {
        this.isBusy = true
        this.customer = newVal
        this.fetchCustomerLoans(newVal.customerId).then(res => {
          this.isBusy = false
          this.$root.$emit('bv::refresh::table', 'loans_table')
        }).catch(error => {
          this.isBusy = false
          console.log(error.message)
        })
      }
    },
    computed:  {
      ...mapGetters(['customerLoans']),
    },
    methods: {
      ...mapActions(['fetchCustomerLoans', 'computeTopUpLoan']),
      showModal() {
        this.$refs['customerLoanListModal'].show()
      },
      addLoanModal() {
        this.$refs['add-loan-modal'].showModal()
      },
      makePayment() {
        this.$refs['pay-loan-modal'].showModal()
      },
      liquidate() {
        this.$refs['liquidate-modal'].showModal()
      },
      generateReport(id) {
        axios.post('/report', {
          "format": "pdf",
          "loanId": id,
          "reportType": "ACCOUNT_STATEMENT"
        }).then(res => {
          window.open(res.response)
        }).catch(error => {
          this.error(error.response.data.message)
        })
      },
      topUpLoanModal(loan) {
        var customerId = loan.customerId
        this.computeTopUpLoan(loan.id).then(res => {
          this.$refs['top-up-loan-modal'].showModal(res.data.response, this.customer, customerId)
        })
        .catch(err => this.error(err.response.data.message))
      },
      approveModal(item) {
        this.$refs['approve-loan-cus'].showModal(item)
      }
    }
  }
</script>
<style>
  #customerLoanList .modal-dialog {
    max-width: 1248px !important;
  }

  #add-cu-loan-one .modal-dialog {
    max-width: 610px !important;
  }

  .custom-select:disabled {
    background: none !important;
  }

  #add-loan-two .modal-dialog {
    max-width: 610px !important;
  }

/*  #liquidate-loan .modal-dialog {
    max-width: 610px !important;
  }

  #liquidate-loan .modal-body {
    margin: auto;
  }

  #calculate-liquidate-loan .modal-dialog {
    max-width: 610px !important;
  }*/
</style>
