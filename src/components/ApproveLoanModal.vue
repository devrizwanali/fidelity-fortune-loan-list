<template>
  <b-modal ref="approve-loan-modal" 
    title="Approve Loan"
    id="approve-loan-modal"
    hide-header-close hide-footer>
    <form  @submit.prevent="onSubmit">
      <div class="mt-2 d-flex justify-content-between border-bottom-blue">
        <label class="blue-color">Customer Name</label>
        <input type="text" readonly v-model="loan.customerName" class="blue-color border-0 text-right loan-input-inline">
      </div>

      <div class="mt-2 d-flex justify-content-between border-bottom-blue">
        <label class="blue-color">Loan Duration</label>
        <input type="text" readonly v-model="loan.duration" class="blue-color border-0 text-right loan-input-inline">
      </div>

      <div class="mt-2 d-flex justify-content-between border-bottom-blue">
        <label class="blue-color">Outstanding Balance</label>
        <input type="text" readonly v-model="loan.outstanding" class="blue-color border-0 text-right loan-input-inline">
      </div>

      <div class="mt-2 d-flex justify-content-between border-bottom-blue">
        <label class="blue-color">Loan Amount</label>
        <input type="text" readonly v-model="loan.amount" class="blue-color border-0 text-right loan-input-inline">
      </div>
      <div class="mt-2 d-flex justify-content-between border-bottom-blue">
        <label class="blue-color">Interest Paid</label>
        <input type="text" readonly v-model="loan.interestPaid" class="blue-color border-0 text-right loan-input-inline">
      </div>
      
      <div class="mt-2 d-flex justify-content-between border-bottom-blue">
        <label class="blue-color">Monthly Repayment</label>
        <input type="text" readonly v-model="loan.monthlyRepaymentAmount" class="blue-color border-0 text-right loan-input-inline">
      </div>
     
      <div class="mt-2 d-flex justify-content-between border-bottom-blue">
        <label class="blue-color"> Total Repayment</label>
        <input type="text" readonly v-model="loan.totalRepaymentAmount" class="blue-color border-0 text-right loan-input-inline">
      </div>

      <div class="mt-2 d-flex justify-content-between border-bottom-blue">
        <label class="blue-color">Loan Number</label>
        <input type="text" readonly v-model="loan.loanNo" class="blue-color border-0 text-right loan-input-inline">
      </div>
      <div class="mt-2 d-flex justify-content-between border-bottom-blue">
        <label class="blue-color">Loan Start Date</label>
        <input type="text" readonly v-model="loan.paymentStartDate" class="blue-color border-0 text-right loan-input-inline">
      </div>

      <div class="d-flex justify-content-around mt-4">
        <button class="button-cancel" @click.prevent="$refs['approve-loan-modal'].hide()">Cancel</button>
        <button class="btn-update">Approve</button>
      </div>
    </form>
  </b-modal>
</template>
<script>
  import axios from '@/axios'
  export default {
    name: 'ApproveLoanModal',
    data() {
      return {
        loan: {
        }
      }
    },
    methods: {
      onSubmit() {
        axios.post(`/loan/approve/${this.loan.id}`, {
          "loanNumber": null,
          "loanStartDate": null
        })
        .then(res => {
          this.success('Successfully Approved')
          this.$refs['approve-loan-modal'].hide()
        })
        .catch(error => this.error(error.response.data.message))
      },
      showModal(loan) {
        this.loan = loan
        this.$refs['approve-loan-modal'].show()
      }
    }
  }
</script>
<style scoped>
  @import "@/assets/css/form";
</style>