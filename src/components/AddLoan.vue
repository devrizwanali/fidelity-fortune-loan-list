<template>
  <b-modal ref="addLoanModal" title="Add Loan"
    id="add-loan-modal"
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
            <b-form-select required class="input" v-model="form.deduction" :options="deductionOptions"></b-form-select>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Duration</label>
            <input type="number" v-model="form.duration" class="input" required>
          </div>
        </b-col>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Loan Amount</label>
            <input type="number" v-model="form.amount" class="input" required>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Monthly Net Salary</label>
            <input type="number" v-model="form.netSalary" class="input" required>
          </div>
        </b-col>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Monthly Gross Salary</label>
            <input type="number" v-model="form.grossSalary" class="input" required>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Interest</label>
            <input type="number" v-model="form.interest" class="input" required>
          </div>
        </b-col>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Start Date</label>
            <input type="date" v-model="form.startDate" class="input" required>
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

      <div class="mt-2">
        <input type="text" placeholder="Processing Fee" class="inline-input form-control">
      </div>
      <div class="mt-2">
        <input type="text" placeholder="Cheque Amount" class="inline-input form-control">
      </div>
      <div class="mt-2">
        <input type="text" placeholder="Monthly Repayment Amount" class="inline-input form-control">
      </div>
      <div class="mt-2">
        <input type="text" placeholder="Total Repayment Amount" class="inline-input form-control">
      </div>

      <div class="d-flex justify-content-between mt-4">
        <button class="button-cancel" @click="$refs['addLoanModal'].hide()">Cancel</button>
        <button class="button-save">Save</button>
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
        deductionOptions: ['State', 'Local'],
        form: {
          loanNo: '',
          duration: 0,
          managerName: '',
          deduction: '',
          netSalary: 0,
          grossSalary: 0,
          interest: 0,
          startDate: null,
          secondaryManagerName: '',
          amount: ''
        }
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
      ...mapActions(['addBranch', 'fetchManagers']),
      showModal() {
        this.$refs['addLoanModal'].show()
      },
      onSubmit() {
        this.addBranch(this.form).then(res => {
          this.$refs['addBranchModal'].hide()
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
