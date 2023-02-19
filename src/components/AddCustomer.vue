<template>
  <div>
    <b-modal scrollable modal-class="addCustomerOne" 
      ref="addCustomerOne" :title="steps[step - 1].title" 
      hide-header-close hide-footer
      @show="resetModal"
      no-close-on-backdrop
      >
      <stepper :step="step" />

      <form @submit.prevent="onSubmit" v-if="step == 1">
        <b-row no-gutters>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">BVN</label>
            <input type="text" v-model="form.bvn" class="input">
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
            <input type="text" required v-model="form.firstName" class="input name">
          </div>

          <div class=" col-4 position-relative mt-4">
            <label for="name" class="name-label">Middle Name</label>
            <input type="text" v-model="form.middleName" class="input name">
          </div>

          <div class="col-4 position-relative mt-4">
            <label for="name" class="name-label">Last Name</label>
            <input type="text" v-model="form.lastName" class="input name" required>
          </div>
        </b-row>

        <b-row no-gutters class="justify-content-center">
          <div class="mt-4 cursor-pointer">
            <p class="gray-text">Male / Female</p>
            <div class="d-flex justify-content-center">
              <b-form-radio v-model="form.gender" value="MALE"></b-form-radio>
              <b-form-radio v-model="form.gender" value="FEMALE" class="ml-3"></b-form-radio>
            </div>
           </div>
        </b-row>

        <b-row no-gutters>
          <div class="col-4 position-relative mt-4">
            <label for="name" class="name-label">Date of Birth</label>
            <input type="date" v-model="form.dob" class="input name" required>
          </div>

          <div class=" col-4 position-relative mt-4">
            <label for="name" class="name-label">Phone Number</label>
            <input type="number" v-model="form.phoneNumber" class="input name" required>
          </div>

          <div class="col-4 position-relative mt-4">
            <label for="name" class="name-label">Secondary Number</label>
            <input type="number" v-model="form.secondaryPhoneNumbers[0]" class="input name">
          </div>
        </b-row>

        <b-row no-gutters class="mt-3 ml-5">
          <p class="gray-text">Marital Status</p>
        </b-row>
        <b-row no-gutters style="margin-left: 98px;">
          <b-form-radio v-model="form.maritalStatus" value="SINGLE" class="gray-text">Single</b-form-radio>
          <b-form-radio v-model="form.maritalStatus" value="MARRIED" class="ml-3 gray-text">Married</b-form-radio>
          <b-form-radio v-model="form.maritalStatus" value="DIVORCED" class="ml-3 gray-text">Divorced</b-form-radio>
          <b-form-radio v-model="form.maritalStatus" value="WIDOWED" class="ml-3 gray-text">Widowed</b-form-radio>
        </b-row>
        <b-row no-gutters>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">State</label>
            <b-form-select class="input" v-model="form.stateOfOrigin" @change="stateChangeHandler" required :options="states"></b-form-select>
          </div>
         
          <div class="position-relative ml-3 mt-4">
            <label for="name" class="name-label">LGA</label>
            <b-form-select class="input" v-model="form.lgaOfOrigin" :options="LGAs" required></b-form-select>
          </div>
        </b-row>
        <b-row no-gutters class="position-relative mt-4">
          <label for="name" class="name-label">E-Mail Address</label>
          <input type="email" v-model="form.email" class="input-full" required>
        </b-row>

        <b-row no-gutters class="position-relative mt-4">
          <label for="name" class="name-label">Address</label>
          <input type="text" required v-model="form.residentialAddress" class="input-full">
        </b-row>

         <b-row no-gutters class="position-relative mt-4">
            <label for="name" class="name-label">Directions to Home</label>
            <textarea class="textarea-full" required rows="5" v-model="form.homeTownAddress"></textarea>
        </b-row>

        <div class="d-flex justify-content-between mt-4">
          <button class="button-cancel" @click.prevent="$refs['addCustomerOne'].hide()">Cancel</button>
          <button class="button-save">Next</button>
        </div>
      </form>

      <form @submit.prevent="onSubmit" v-if="step == 2">
        <b-row no-gutters class="position-relative mt-4">
          <label for="name" class="name-label">Name</label>
          <input type="text" required v-model="form.nextOfKin" class="input-full">
        </b-row>

        <b-row no-gutters class="justify-content-between">
          <div class="col-4 position-relative mt-4">
            <label for="name" class="name-label">Relationship</label>
            <input type="text" class="input name" required>
          </div>

          <div class=" col-4 position-relative mt-4">
            <label for="name" class="name-label">Phone Number</label>
            <input type="number" v-model="form.nextOfKinPhoneNumber" required class="input name">
          </div>
        </b-row>

        <b-row no-gutters class="position-relative mt-4">
          <label for="name" class="name-label">Address</label>
          <input type="text" class="input-full">
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
            <input type="text" required v-model="form.computerNumber" class="input name">
          </div>
        </b-row>

        <b-row no-gutters class="position-relative mt-4">
          <label for="name" class="name-label">Organization</label>
          <input type="text" required v-model="form.employer" class="input-full">
        </b-row>

         <b-row no-gutters class="justify-content-between">
          <div class="col-4 position-relative mt-4">
            <label for="name" class="name-label">Employment Date</label>
            <input type="date" required v-model="form.dateOfEmployment" class="input name">
          </div>
        </b-row>

         <b-row no-gutters class="position-relative mt-4">
          <label for="name" class="name-label">Organization Address</label>
          <input type="text" required v-model="form.employerAddress" class="input-full">
        </b-row>

        <div class="mt-5 d-flex justify-content-between">
          <button class="button-cancel" @click.prevent="step -= 1">Back</button>
          <button class="button-save" style="width: 190px">Submit Customer</button>
        </div>
      </form>

      <div v-if="step == 4">
        <b-row>
          <b-col>
            <div class="position-relative mt-4">
              <label for="name" class="name-label">Loan Number</label>
              <input type="text" v-model="loanForm.loanNo" class="input" required>
            </div>
          </b-col>
          <b-col>
            <div class="position-relative mt-4">
              <label for="name" class="name-label">Deduction</label>
              <b-form-select required class="input" v-model="loanForm.loanType" :options="deductionOptions"></b-form-select>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="position-relative mt-4">
              <label for="name" class="name-label">Duration</label>
              <input type="number" step="any" v-model="loanForm.duration" class="input" required>
            </div>
          </b-col>
          <b-col>
            <div class="position-relative mt-4">
              <label for="name" class="name-label">Loan Amount</label>
              <input type="number" step="any" v-model="loanForm.amount" class="input" required>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="position-relative mt-4">
              <label for="name" class="name-label">Monthly Net Salary</label>
              <input type="number" step="any" v-model="loanForm.netMonthlySalary" class="input" required>
            </div>
          </b-col>
          <b-col>
            <div class="position-relative mt-4">
              <label for="name" class="name-label">Monthly Gross Salary</label>
              <input type="number" step="any" v-model="loanForm.grossMonthlySalary" class="input" required>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="position-relative mt-4">
              <label for="name" class="name-label">Interest</label>
              <input type="number" step="any" v-model="loanForm.interestRate" class="input" required>
            </div>
          </b-col>
          <b-col>
            <div class="position-relative mt-4">
              <label for="name" class="name-label">Start Date</label>
              <input type="date" v-model="loanForm.paymentStartDate" class="input" required>
            </div>
          </b-col>
        </b-row>

         <b-row>
          <b-col>
            <div class="position-relative mt-4">
              <label for="name" class="name-label">Branch Manager</label>
               <b-form-select required class="input" v-model="loanForm.managerName" :options="managersList"></b-form-select>
            </div>
          </b-col>
          <b-col>
            <div class="position-relative mt-4">
              <label for="name" class="name-label">Secondary Branch Manager</label>
              <b-form-select required class="input" v-model="loanForm.secondaryManagerName" :options="secondaryManagersList"></b-form-select>
            </div>
          </b-col>
        </b-row>

        <div v-if="loan">
          <div class="mt-2 d-flex justify-content-between auto-filled-inline">
            <label>Processing Fee</label>
            <input type="text" disabled v-model="loanForm.processingFee" class="border-0 text-right loan-input-inline">
          </div>

          <div class="mt-2 d-flex justify-content-between auto-filled-inline">
            <label>Cheque Amount</label>
            <input type="text" disabled v-model="loanForm.chequeAmount" class="border-0 text-right loan-input-inline">
          </div>

          <div class="mt-2 d-flex justify-content-between auto-filled-inline">
            <label>Monthly Repayment Amount</label>
            <input type="text" disabled v-model="loanForm.monthlyRepaymentAmount" class="border-0 text-right loan-input-inline">
          </div>

          <div class="mt-2 d-flex justify-content-between auto-filled-inline">
            <label>Total Repayment Amount</label>
            <input type="text" disabled v-model="loanForm.totalRepaymentAmount" class="border-0 text-right loan-input-inline">
          </div>
        </div>


        <div class="d-flex justify-content-end mt-4">
          <button class="mx-2 button-cancel" @click.prevent="$refs['addCustomerOne'].hide()">Cancel</button>
          <button class="mx-2 button-save" style="width: 152px" v-if="!calculate" @click.prevent="onCalculateLoan">Re-Calculate</button>
          <button class="mx-2 button-save" v-if="calculate" @click.prevent="onCalculateLoan">Calculate</button>
          <button class="mx-2 btn-update" :disabled="calculate" @click.prevent="onSubmitLoan">Submit</button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Stepper from '@/components/Stepper'
  import STATES from '@/data/states'
  import axios from '@/axios'
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
      LGAs: [],
      steps: [
        {title: 'Personal Information'},
        {title: 'Next of Kin'},
        {title: 'Occupation'},
        {title: 'Loan Details'}
      ],
      step: 1,
      calculate: true,
      form: {
        vbn: '',
        min: '',
        firstName: '',
        lastName: '',
        middleName: '',
        lgaOfOrigin: '',
        stateOfOrigin: '',
        gender: 'MALE',
        maritalStatus: 'SINGLE',
        email:'',
        residentialAddress: '',
        secondaryPhoneNumbers: [],
        homeTownAddress: '',
        nextOfKinPhoneNumber: '',
        nextOfKin: '',
        computerNumber: '',
        employer: '',
        dateOfEmployment: '',
        employerAddress: ''

      },
      customer: null,
      secondaryManagersList: [],
      loan: null,
      loanForm: {
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
    ...mapGetters(['branchCodes', 'managers']),
    managersList() {
      const mang = this.managers.map(x => x.managerName)
      this.secondaryManagersList = ["", ...mang]
      return mang
    },
    branchList() {
      let branches = []
      this.branchCodes.map(x => {
        let obj = {text: x.name, value: x.code}
        branches.push(obj)
      })
      return branches
    },
    states() {
      return STATES.map((x) => {
        return {text: x.state.name, value: x.state.id, locals: x.state.locals}
      })
    },
  },
  mounted() {
    if(this.branchCodes.length == 0) {
      this.fetchBrachCodes()
    } if(this.managers.length == 0) {
      this.fetchManagers()
    }
  },
  methods: {
    ...mapActions(['fetchBrachCodes', 'fetchManagers', 'addLoan', 'approveLoan']),
    showModal() {
      this.$refs['addCustomerOne'].show()
    },
    resetModal() {
      this.form = {
        vbn: '',
        min: '',
        firstName: '',
        lastName: '',
        middleName: '',
        lgaOfOrigin: '',
        stateOfOrigin: '',
        gender: 'MALE',
        maritalStatus: 'SINGLE',
        email:'',
        residentialAddress: '',
        secondaryPhoneNumbers: [],
        homeTownAddress: '',
        nextOfKinPhoneNumber: '',
        nextOfKin: '',
        computerNumber: '',
        employer: '',
        dateOfEmployment: '',
        employerAddress: ''
      }
      this.step = 1;
      this.loanForm = {
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
    },
    onSubmit() {
      let success = false;
      if(this.form.secondaryPhoneNumbers[0] && this.form.secondaryPhoneNumbers[0].length != 11) {
        this.error('Secondary phoneNumber must be 11 digits')
        return
      }
      if(this.form.phoneNumber.length != 11) {
        this.error("Phone number must be 11 digits")
        return
      }
      if(this.form.nextOfKinPhoneNumber && this.form.nextOfKinPhoneNumber.length != 11) {
        this.error("Phone number must be 11 digits")
        return
      }
      if(this.step == 3) {
        axios.post('/customer/add', this.form)
        .then(res => {
          this.customer = res.data.response
          this.loanForm.loanNo = `${this.customer.branchCode}-00000-MON`
          this.loanForm.customerId = this.customer.id
          this.success(res.data.message)
          this.step += 1;
          success = true
        })
        .catch(error => {
          this.error(error.response.data.message)
        })
      } else this.step += 1
    },
    onCalculateLoan() {
      axios.post(`/loan/compute`, this.loanForm).then(res => {
        this.loan = res.data.response
        this.loanForm.processingFee = this.loan.processingFee
        this.loanForm.chequeAmount = this.loan.chequeAmount
        this.loanForm.monthlyRepaymentAmount = this.loan.monthlyRepaymentAmount
        this.loanForm.totalRepaymentAmount = this.loan.totalRepaymentAmount
        this.calculate = false
        this.success(res.data.message)
      }).catch(error => {
        this.error(error.response.data.message)
      })
    },
    onSubmitLoan() {
      this.addLoan(this.loanForm).then(res =>  {
        let payload = {data: {"loanNumber": null, "loanStartDate": null}, loanId: res.data.response.id }
          this.approveLoan(payload).then(res => {
          this.success('Successfully Created')
          this.$refs['addCustomerOne'].hide()
          }).catch(e => this.error(e.response.data.message))
        })
        .catch(error => this.error('Something went wrong. Please contact the admin'))
    },
    stateChangeHandler(event) {
      const stateChosen = STATES.filter(x => x.state.id == event)[0]
      const lgas = stateChosen.state.locals.map(x => {
        return {text: x.name, value: x.id, stateId: stateChosen.state.id}
       })
      this.LGAs = lgas
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
