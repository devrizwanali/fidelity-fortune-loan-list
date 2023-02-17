<template>
  <div>
    <b-modal scrollable modal-class="addCustomerOne" ref="addCustomerOne" :title="steps[step - 1].title" hide-header-close hide-footer>
      <stepper :step="step" />

      <form @submit.prevent="onSubmit" v-if="step == 1">
        <b-row no-gutters>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">BVN</label>
            <input type="text" v-model="form.vbn" class="input">
          </div>
        </b-row>

        <b-row no-gutters>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">NIN</label>
            <input type="text" v-model="form.min" class="input">
          </div>
        </b-row>

        <b-row no-gutters>
          <div class="col-4 position-relative mt-4">
            <label for="name" class="name-label">First Name</label>
            <input type="text" v-model="form.min" class="input name">
          </div>

          <div class=" col-4 position-relative mt-4">
            <label for="name" class="name-label">Middle Name</label>
            <input type="text" v-model="form.min" class="input name">
          </div>

          <div class="col-4 position-relative mt-4">
            <label for="name" class="name-label">Last Name</label>
            <input type="text" v-model="form.min" class="input name">
          </div>
        </b-row>

        <b-row no-gutters class="justify-content-center">
          <div class="mt-4 cursor-pointer">
            <p class="gray-text">Male / Female</p>
            <div class="d-flex justify-content-center">
              <b-form-radio v-model="form.gender" value="male"></b-form-radio>
              <b-form-radio v-model="form.gender" value="female" class="ml-3"></b-form-radio>
            </div>
           </div>
        </b-row>

        <b-row no-gutters>
          <div class="col-4 position-relative mt-4">
            <label for="name" class="name-label">Date of Birth</label>
            <input type="date" v-model="form.min" class="input name">
          </div>

          <div class=" col-4 position-relative mt-4">
            <label for="name" class="name-label">Phone Number</label>
            <input type="text" v-model="form.min" class="input name">
          </div>

          <div class="col-4 position-relative mt-4">
            <label for="name" class="name-label">Secondary Number</label>
            <input type="text" v-model="form.min" class="input name">
          </div>
        </b-row>

        <b-row no-gutters class="mt-3 ml-5">
          <p class="gray-text">Marital Status</p>
        </b-row>
        <b-row no-gutters style="margin-left: 98px;">
          <b-form-radio v-model="form.maritalStatus" value="single" class="gray-text">Single</b-form-radio>
          <b-form-radio v-model="form.maritalStatus" value="married" class="ml-3 gray-text">Married</b-form-radio>
          <b-form-radio v-model="form.maritalStatus" value="divorced" class="ml-3 gray-text">Divorced</b-form-radio>
          <b-form-radio v-model="form.maritalStatus" value="widowed" class="ml-3 gray-text">Widowed</b-form-radio>
        </b-row>
        <b-row no-gutters>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">LGA</label>
            <b-form-select class="input" v-model="form.lga" options="[]"></b-form-select>
          </div>

          <div class="position-relative ml-2 mt-4">
            <label for="name" class="name-label">State</label>
            <b-form-select class="input" v-model="form.state" options="[]"></b-form-select>
          </div>
        </b-row>
        <b-row no-gutters class="position-relative mt-4">
          <label for="name" class="name-label">E-Mail Address</label>
          <input type="email" v-model="form.email" class="input w-100">
        </b-row>

        <b-row no-gutters class="position-relative mt-4">
          <label for="name" class="name-label">Address</label>
          <input type="text" v-model="form.address" class="input w-100">
        </b-row>

         <b-row no-gutters class="position-relative mt-4">
            <label for="name" class="name-label">Directions to Home</label>
            <textarea class="textarea w-100" rows="5" v-model="form.directions"></textarea>
        </b-row>

        <div class="d-flex justify-content-between mt-4">
          <button class="button-cancel" @click.prevent="$refs['addCustomerOne'].hide()">Cancel</button>
          <button class="button-save">Next</button>
        </div>
      </form>

      <form @submit.prevent="onSubmit" v-if="step == 2">
        <b-row no-gutters class="position-relative mt-4">
          <label for="name" class="name-label">Name</label>
          <input type="text" v-model="form.name" class="input w-100">
        </b-row>

        <b-row no-gutters class="justify-content-between">
          <div class="col-4 position-relative mt-4">
            <label for="name" class="name-label">Relationship</label>
            <input type="text" v-model="form.min" class="input name">
          </div>

          <div class=" col-4 position-relative mt-4">
            <label for="name" class="name-label">Phone Number</label>
            <input type="text" v-model="form.min" class="input name">
          </div>
        </b-row>

        <b-row no-gutters class="position-relative mt-4">
          <label for="name" class="name-label">Address</label>
          <input type="text" v-model="form.address" class="input w-100">
        </b-row>

        <div class="mt-5 d-flex justify-content-between">
          <button class="button-cancel" @click.prevent="step -= 1">Back</button>
          <button class="button-save">Next</button>
        </div>
      </form>

      <form @submit.prevent="onSubmit" v-if="step == 3">
        <b-row no-gutters class="justify-content-center align-items-center">
        <div class="position-relative mt-4">
            <label for="name" class="name-label">Select Branch</label>
          <b-form-select class="input" v-model="form.branchCode" :options="branchList"></b-form-select>
        </div>
        </b-row>

        <b-row no-gutters class="justify-content-between">
          <div class="col-4 position-relative mt-4">
            <label for="name" class="name-label">Employee ID</label>
            <input type="text" v-model="form.min" class="input name">
          </div>
        </b-row>

        <b-row no-gutters class="position-relative mt-4">
          <label for="name" class="name-label">Organization</label>
          <input type="text" v-model="form.address" class="input w-100">
        </b-row>

         <b-row no-gutters class="justify-content-between">
          <div class="col-4 position-relative mt-4">
            <label for="name" class="name-label">Employment Date</label>
            <input type="text" v-model="form.min" class="input name">
          </div>
        </b-row>

         <b-row no-gutters class="position-relative mt-4">
          <label for="name" class="name-label">Organization Address</label>
          <input type="text" v-model="form.address" class="input w-100">
        </b-row>

        <div class="mt-5 d-flex justify-content-between">
          <button class="button-cancel" @click.prevent="step -= 1">Back</button>
          <button class="button-save">Next</button>
        </div>
      </form>

      <form  @submit.prevent="onSubmit" v-if="step == 4">
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

        <div class="mt-2 d-flex border-bottom-blue justify-content-between">
          <label class="blue-color">Processing Fee</label>
          <input type="text" v-model="loan.processingFee" class="border-0 text-right blue-color loan-input-inline">
        </div>

        <div class="mt-2 d-flex  border-bottom-blue justify-content-between">
          <label class="blue-color">Cheque Amount</label>
          <input type="text" v-model="loan.chequeAmount" class="border-0 text-right blue-color loan-input-inline">
        </div>

        <div class="mt-2 d-flex border-bottom-blue justify-content-between">
          <label class="blue-color">Monthly Repayment Amount</label>
          <input type="text" v-model="loan.monthlyRepaymentAmount" class="border-0 blue-color text-right loan-input-inline">
        </div>

        <div class="mt-2 d-flex border-bottom-blue justify-content-between">
          <label class="blue-color">Total Repayment Amount</label>
          <input type="text" v-model="loan.totalRepaymentAmount" class="border-0 blue-color text-right loan-input-inline">
        </div>

        <div class="d-flex justify-content-between mt-4">
          <button class="button-cancel" @click.prevent="$refs['addCustomerOne'].hide()">Cancel</button>
          <button class="button-cancel" @click.prevent="step -= 1">Back</button>
          <button class="button-save">Submit</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
import Stepper from '@/components/Stepper'
export default {
  name: "AddCustomer",
  components: {
    Stepper
  },
  data() {
    return {
      deductionOptions: [
          {text: 'State', value: 'STATE'}, 
          {text: 'Local', value: 'LOCAL'}
        ],
      steps: [
        {title: 'Personal Information'},
        {title: 'Next of Kin'},
        {title: 'Occupation'},
        {title: 'Loan Details'}
      ],
      step: 1,
      form: {
        vbn: '',
        min: '',
        lga: '',
        state: '',
        gender: 'male',
        maritalStatus: 'single',
        email:'',
        address: '',
        directions: ''
      },
      loan: {
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
    };
  },
  computed: {
    ...mapGetters(['branchCodes']),
    branchList() {
      let branches = []
      this.branchCodes.map(x => {
        let obj = {text: x.name, value: x.code}
        branches.push(obj)
      })
      return branches
    }
  },
    mounted() {
      if(this.branchCodes.length == 0) {
        this.fetchBrachCodes()
      }
    },
  methods: {
    showModal() {
      this.$refs['addCustomerOne'].show()
    },
    onSubmit() {
      this.step += 1;
    }
  }
};
</script>
<style lang="css">
  .name {
    width: 210px !important;
  }
  .addCustomerOne .modal-dialog, .addCustomerOne .modal-content {
    max-width: 690px !important;
    height: 600px !important;
  }
  .gray-text {
    color: #808080
  }
</style>
