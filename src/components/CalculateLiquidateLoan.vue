<template>
  <b-modal ref="calculateLiquidateLoan"
    title="Liquidate Loan"
    id="calculate-liquidate-loan"
    hide-header-close hide-footer
    no-close-on-backdrop
    modal-class="liquidate-modal"
    v-if="loan"
    >
    <form  @submit.prevent="onSubmit">
      <b-row>
        <div class="position-relative col mt-4">
          <label for="name" class="name-label">Loan Model</label>
          <b-form-select required class="input" disabled v-model="loanModal" :options="loanModels"></b-form-select>
        </div>

        <div class="col position-relative mt-4">
          <label for="name" class="name-label">Liquidation Type</label>
          <b-form-select required class="input" disabled v-model="liquidType" :options="liquidTypes"></b-form-select>
        </div>
      </b-row>

      <div class="d-flex position-relative mt-4" v-if="loanModal == 'FLEXI'">
        <label for="name" class="name-label">Duration</label>
        <b-form-select required class="input" disabled v-model="loan.duration" :options="durations"></b-form-select>
      </div>

      <div class="mt-2 d-flex mx-2 justify-content-between border-bottom-blue">
        <label class="blue-color">Interest Charged</label>
        <input type="number" readonly step="any" v-model.number="loan.interestCharged" class="blue-color border-0 text-right loan-input-inline">
      </div>

      <div class="mt-2 d-flex mx-2 justify-content-between border-bottom-blue">
        <label class="blue-color">Capital Balance</label>
        <input type="number" readonly step="any" v-model.number="loan.capitalBalance" class="blue-color border-0 text-right loan-input-inline">
      </div>

      <div class="mt-2 d-flex mx-2 justify-content-between border-bottom-blue">
        <label class="blue-color">Liquidation Amount</label>
        <input type="number" readonly step="any" v-model.number="loan.liquidatedBalance" class="blue-color border-0 text-right loan-input-inline">
      </div>

      <div class="d-flex position-relative mt-4">
        <label for="name" class="name-label">Interest Owed</label>
        <input type="number" @keyup="interestOwedChanged" step="any" v-model.number="loan.interestOwed" required class="input">
      </div>

      <div class="mt-2 d-flex mx-2 justify-content-between border-bottom-blue">
        <label class="blue-color">Partial Liqudation Amount</label>
        <input type="number" step="any" v-model.number="loan.partialAmount" class="blue-color border-0 text-right loan-input-inline">
      </div>


     <b-row>
      <div class="position-relative col d-flex mt-4">
        <label for="name" class="name-label">Amount Paid</label>
        <input type="number" step="any" v-model.number="loan.actualAmountPaid"  required class="input">
      </div>

      <div class="col position-relative d-flex mt-4">
        <label for="name" class="name-label">Date Paid</label>
        <input type="date" v-model="loan.paidDate" required class="input">
      </div>

     </b-row>

      <div v-if="liquidType == 'PARTIAL'">
        <b-row>
          <div class="position-relative mt-4 col">
            <label for="name" class="name-label">Interest Rate</label>
            <input type="number" v-model.number="loan.interestRate"  step="any" required class="input">
          </div>

          <div class="position-relative mt-4 col">
            <label for="name" class="name-label">Manager Name</label>
             <b-form-select required class="input" v-model="loan.managerName" :options="managersList"></b-form-select>
          </div>
        </b-row>
        

        <b-row>
          <div class="position-relative col mt-4">
            <label for="name" class="name-label">Loan Number</label>
            <input type="text" v-model="loan.loanNo" required class="input">
          </div>

          <div class="position-relative col mt-4">
            <label for="name" class="name-label">Payment Start Date</label>
            <input type="date" v-model="loan.paymentStartDate" required class="input">
          </div>
        </b-row>
      </div>

       <div class="d-flex justify-content-between mt-4">
        <button class="button-cancel" @click.prevent="$refs['calculateLiquidateLoan'].hide()">Cancel</button>
        <button class="button-save">Save</button>
      </div>
    </form>
  </b-modal>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import axios from '@/axios'
  export default {
    name: 'CalculateLiquidateLoan',
    data() {
      return {
        loan: {},
        durations: [0,1,2,3,4,5,6,7,8,9,10,11,12]
      }
    },
    props: {
      loanModal: {
        type: String,
        required: true
      },
      liquidType: {
        type: String,
        required: true
      },
      loanId: {
        required: true
      }
    },
    computed: {
      ...mapGetters(['calculatedLiquiLoan', 'liquidTypes', 'loanModels', 'customerLoans', 'managers']),
      managersList() {
        return this.managers.map(x => x.managerName)
      },
      loanNumber() {
        return `${this.customerLoans[0].branchCode}-00000-MON`
      }
    },
    watch: {
      loan(newVal, oldVal) {
        this.loan.loanNo = this.loanNumber
      }
    },
    methods: {
      ...mapActions(['fetchCustomerLoans']),
      showModal(loan) {
        let copyObj = {...loan}
        this.loan = copyObj
        this.$refs['calculateLiquidateLoan'].show()
      },
      interestOwedChanged() {
        let interestOwed = this.loan.interestOwed
        let val = (interestOwed == "" || isNaN(interestOwed)) ? 0 : interestOwed
        if(val == 0) {
          this.loan.liquidatedBalance = this.calculatedLiquiLoan.liquidatedBalance
        } else {
          let newAmount = parseFloat(this.calculatedLiquiLoan.liquidatedBalance) + parseFloat(val)
          this.loan.liquidatedBalance = newAmount
        }
      },
      onSubmit() {
        axios.post(`/loan/liquidate/${this.loanId}`, this.loan)
        .then(res => {
          this.success(res.data.message)
          this.$refs['calculateLiquidateLoan'].hide()
          let id = this.customerLoans[0].customerId
          this.fetchCustomerLoans(id).then(res => {
            this.$root.$emit('bv::refresh::table', 'customer_loan_list')
          })
        })
        .catch(error => this.error(error.response.data.message))
      },
    }
  }
</script>
<style scoped>
  @import "@/assets/css/form";

  .inline-input {
    border-bottom: 2px solid var(--blue-color) !important;
    border-right: 0;
    border-top: 0;
    border-left: 0;
    border-radius: 0;
    width: 100%;
  }

  .loan-input-inline:focus {
    box-shadow: none !important;
    outline: none !important;
  }

  .inline-input:focus {
    box-shadow: none !important;
  }

  ::-webkit-input-placeholder {
    color: var(--blue-color) !important;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
</style>