<template>
  <div>
    <b-modal ref="addLoanModal" title="Add Loan"
     id="add-cu-loan-one"
      hide-header-close hide-footer>
      <form  @submit.prevent="onSubmit">
        <b-row>
          <b-col>
            <div class="position-relative mt-4">
              <label for="name" class="name-label">Loan Number</label>
              <input type="text" v-model="form.loanNo" class="input" required>
            </div>
          </b-col>
          <b-col>
            <div class="position-relative mt-4">
              <label for="name" class="name-label">Deduction</label>
              <b-form-select required class="input" v-model="form.loanType" :options="deductionOptions"></b-form-select>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="position-relative mt-4">
              <label for="name" class="name-label">Duration</label>
              <input type="number" v-model.number="form.duration" class="input" required>
            </div>
          </b-col>
          <b-col>
            <div class="position-relative mt-4">
              <label for="name" class="name-label">Loan Amount</label>
              <input type="number" v-model.number="form.amount" class="input" required>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="position-relative mt-4">
              <label for="name" class="name-label">Monthly Net Salary</label>
              <input type="number" v-model.number="form.netMonthlySalary" class="input" required>
            </div>
          </b-col>
          <b-col>
            <div class="position-relative mt-4">
              <label for="name" class="name-label">Monthly Gross Salary</label>
              <input type="number" v-model.number="form.grossMonthlySalary" class="input" required>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="position-relative mt-4">
              <label for="name" class="name-label">Interest</label>
              <input type="number" v-model.number="form.interestRate" class="input" required>
            </div>
          </b-col>
          <b-col>
            <div class="position-relative mt-4">
              <label for="name" class="name-label">Start Date</label>
              <input type="date" v-model="form.paymentStartDate" class="input" required>
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
              <b-form-select required class="input" v-model="form.secondaryManagerName" :options="managersList"></b-form-select>
            </div>
          </b-col>
        </b-row>
        <div class="d-flex justify-content-between mt-4">
          <button class="button-cancel" @click.prevent="$refs['addLoanModal'].hide()">Cancel</button>
          <button class="button-save px-3" style="width: auto">Calculate Loan</button>
        </div>
      </form>
    </b-modal>
    <AddLoanTwo ref="add-loan-two" :loan="loan" />
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import axios from '@/axios'
  import AddLoanTwo from '@/components/AddLoanTwo'
  export default {
    name: 'AddLoan',
    data() {
      return {
        loan: {},
        deductionOptions: [
          {text: 'state', value: 'STATE'}, 
          {text: 'Local', value: 'LOCAL'}
        ],
        form: {
          loanNo: '',
          duration: 0,
          managerName: '',
          loanType: '',
          netMonthlySalary: 0,
          grossMonthlySalary: 0,
          interestRate: 0,
          paymentStartDate: null,
          secondaryManagerName: '',
          amount: 0,
          customerId: 0
        }
      }
    },
    components: {
      AddLoanTwo
    },
    props: ['customer'],
    watch: {
      customer: function(newVal, oldVal) {
        this.form.loanNo = `${newVal.branchCode}-00000-MON`
        this.form.customerId = newVal.customerId
      },
      customerId: {

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
      ...mapActions(['addLoan', 'fetchManagers']),
      showModal() {
        this.$refs['addLoanModal'].show()
      },
      onSubmit() {
        this.addLoan(this.form).then(res => {
          this.loan = res.data.response
          this.$refs['addLoanModal'].hide()
          this.$refs['add-loan-two'].showModal()
        }).catch(error => {
          this.error(error.response.data.message)
        })
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
