<template>
  <b-modal ref="addLoanModalTow" title="Add Loan"
    hide-header-close hide-footer
    id="add-loan-two"
    >
    <form  @submit.prevent="onSubmit" v-if="loan">
      <b-row>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Loan Number</label>
            <input type="text" v-model="loan.loanNo" class="input" required>
          </div>
        </b-col>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Deduction</label>
            <b-form-select required class="input" v-model="loan.loanType" :options="deductionOptions"></b-form-select>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Duration</label>
            <input type="number" step="any" v-model="loan.duration" class="input" required>
          </div>
        </b-col>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Loan Amount</label>
            <input type="number" step="any" v-model="loan.amount" class="input" required>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Monthly Net Salary</label>
            <input type="number" step="any" v-model="loan.netMonthlySalary" class="input" required>
          </div>
        </b-col>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Monthly Gross Salary</label>
            <input type="number" step="any" v-model="loan.grossMonthlySalary" class="input" required>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Interest</label>
            <input type="number" step="any" v-model="loan.interestRate" class="input" required>
          </div>
        </b-col>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Start Date</label>
            <input type="date" v-model="loan.paymentStartDate" class="input" required>
          </div>
        </b-col>
      </b-row>

       <b-row>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Branch Manager</label>
             <b-form-select required class="input" v-model="loan.managerName" :options="managersList"></b-form-select>
          </div>
        </b-col>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Secondary Branch Manager</label>
            <b-form-select required class="input" v-model="loan.secondaryManagerName" :options="managersList"></b-form-select>
          </div>
        </b-col>
      </b-row>

      <div class="mt-2 d-flex justify-content-between border-bottom-blue">
        <label class="blue-color">Processing Fee</label>
        <input type="text" v-model="loan.processingFee" class="blue-color border-0 text-right loan-input-inline">
      </div>

      <div class="mt-2 d-flex justify-content-between border-bottom-blue">
        <label class="blue-color">Cheque Amount</label>
        <input type="text"  v-model="loan.chequeAmount" class="blue-color border-0 text-right loan-input-inline">
      </div>

      <div class="mt-2 d-flex justify-content-between border-bottom-blue">
        <label class="blue-color">Monthly Repayment Amount</label>
        <input type="text" v-model="loan.monthlyRepaymentAmount" class="blue-color border-0 text-right loan-input-inline">
      </div>

      <div class="mt-2 d-flex justify-content-between border-bottom-blue">
        <label class="blue-color">Total Repayment Amount</label>
        <input type="text" v-model="loan.totalRepaymentAmount" class="blue-color border-0 text-right loan-input-inline">
      </div>

      <div class="d-flex justify-content-between mt-4">
        <button class="button-cancel" @click.prevent="$refs['addLoanModalTow'].hide()">Cancel</button>
        <button class="button-save">Submit</button>
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
        deductionOptions: [
          {text: 'state', value: 'STATE'}, 
          {text: 'Local', value: 'LOCAL'}
        ],
      }
    },
    props: {
      loan: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapGetters(['managers']),
      managersList() {
        return this.managers.map(x => x.managerName)
      }
    },
    mounted() {
      if(this.managers.length == 0) {
        this.fetchManagers()
      }
    },
    methods: {
      ...mapActions(['fetchManagers', 'approveLoan']),
      showModal() {
        this.$refs['addLoanModalTow'].show()
      },
      onSubmit() {
        let payload = {data: {"loanNumber": null, "loanStartDate": null}, loanId: this.loan.id }
        this.approveLoan(payload).then(res => {
          this.$refs['addLoanModalTow'].hide()
          this.success('Successfully Created')
        }).catch(error => this.error('Something went wrong. Please contact the admin'))
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
