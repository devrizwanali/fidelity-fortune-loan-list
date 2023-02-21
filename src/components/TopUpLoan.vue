<template>
  <b-modal ref="topUpLoanModal" title="Top Up Loan"
   id="add-cu-loan-one"
    hide-header-close hide-footer>
    <form  @submit.prevent="onSubmit">
      <b-row class="justify-content-center">
        <b-col cols="6">
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Loan Number</label>
            <input type="text" v-model="form.loanNumber" class="input" required>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Branch Manager</label>
             <b-form-select required class="input" v-model="form.managerName" :options="managersList"></b-form-select>
          </div>
        </b-col>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Secondary Branch Manager</label>
            <b-form-select class="input" v-model="form.secondaryManagerName" :options="secondaryManagersList"></b-form-select>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div class="position-relative auto-filled mt-4">
            <label for="name" class="name-label">Capital Balance</label>
            <input type="number" step="any" v-model.number="form.capitalBalance" disabled class="input" required>
          </div>
        </b-col>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Interest Owed</label>
            <input type="number" step="any" v-model.number="form.interestOwed" class="input" required>
          </div>
        </b-col>
      </b-row>

      <div class="position-relative auto-filled mt-4">
        <label for="name" class="name-label">Total Capital Balance</label>
        <input type="number" step="any" v-model.number="totalCapitalBalance" disabled class="input full-input" required>
      </div>

      <div class="position-relative mt-4">
        <label for="name" class="name-label">Enter Top Up Amount</label>
        <input type="number" step="any" v-model.number="topUpAmount" class="input full-input" required @keyup="topupAmountChanged">
      </div>

      <div class="position-relative auto-filled mt-4">
        <label for="name" class="name-label">New Loan Amount</label>
        <input type="number" step="any" v-model.number="form.amount" disabled class="input full-input" required>
      </div>

      <b-row>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Monthly Net Salary</label>
            <input type="number" step="any" v-model.number="form.netMonthlySalary" class="input" required>
          </div>
        </b-col>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Monthly Gross Salary</label>
            <input type="number" step="any" v-model.number="form.grossMonthlySalary" class="input" required>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Loan Duration</label>
            <input type="number" step="any" v-model.number="form.duration" class="input" required>
          </div>
        </b-col>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Interest Rate</label>
            <input type="number" step="any" v-model="form.interestRate" class="input" required>
          </div>
        </b-col>
      </b-row>

      <b-row class="justify-content-center">
        <b-col cols="6">
          <div class="position-relative mt-4">
             <label class="name-label">Start Date</label>
            <input type="date" v-model="form.loanStartDate" class="input" required>
          </div>
        </b-col>
      </b-row>

      <div class="d-flex justify-content-between mt-4">
        <button class="button-cancel" @click.prevent="$refs['topUpLoanModal'].hide()">Cancel</button>
        <button class="button-save px-3" style="width: 20%">Save</button>
      </div>
    </form>
  </b-modal>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import axios from '@/axios'
  export default {
    name: 'AddLoan',
    data() {
      return {
        loan: {},
        secondaryManagersList: [],
        topUpAmount: '',
        totalCapitalBalance: '',
        form: {
          loanNumber: '',
          duration: '',
          managerName: '',
          netMonthlySalary: '',
          grossMonthlySalary: '',
          interestRate: '',
          secondaryManagerName: '',
          amount: '',
          capitalBalance: '',
          interestOwed: '',
          customerId: '',
          id: '',
          loanType: "STATE",
          remainingUnpaidInterest: 0,
          loanStartDate: ''
        }
      }
    },
    computed: {
      ...mapGetters(['managers', 'computedTopUpLoan']),
      managersList() {
        const mang = this.managers.map(x => x.managerName)
        this.secondaryManagersList = ["", ...mang]
        return mang
      }
    },
    mounted() {
      if(this.managers.length == 0) {
        this.fetchManagers()
      }
    },
    methods: {
      ...mapActions(['fetchManagers', 'addCustomerLoan']),
      showModal(loan, customer, customerId) {
        this.loan = loan;
        this.form.loanNumber = `${customer.branchCode}-00000-MON`
        this.form.capitalBalance = loan.capitalBalance
        this.form.interestOwed = loan.interestOwed
        this.form.amount = loan.amount
        this.form.interestRate = loan.interestRate
        this.form.duration = loan.duration
        this.form.capitalBalance = loan.capitalBalance
        this.form.customerId = customerId
        this.form.id = loan.id
        this.totalCapitalBalance = Math.round(parseFloat(loan.capitalBalance) + parseFloat(loan.interestOwed))
        this.$refs['topUpLoanModal'].show()
      },
      onSubmit() {
        axios.post(`/loan/topup`, this.form)
        .then(res => {
          this.addCustomerLoan(res.data.response)
          this.success(res.data.message)
          this.$refs['topUpLoanModal'].hide()
        })
        .catch(error => this.error(error.response.data.message))
      },
      topupAmountChanged() {
        let topUp = this.topUpAmount == "" ? 0 : this.topUpAmount
        if(topUp == 0) {
          this.form.amount = this.loan.amount
        } else {
          let newAmount = parseFloat(this.loan.amount) + parseFloat(topUp)
          this.form.amount = newAmount
        }
      }
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
