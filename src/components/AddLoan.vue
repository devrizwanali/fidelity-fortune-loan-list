<template>
  <b-modal ref="addLoanModal" title="Add Loan"
    id="add-loan-modal"
    hide-header-close hide-footer>
    <form  @submit.prevent="onSubmit">
      <b-row>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Loan Number</label>
            <input type="text" v-model="form.code" class="input" required>
          </div>
        </b-col>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Deduction</label>
            <input type="text" v-model="form.name" class="input" required>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Duration</label>
            <input type="text" v-model="form.code" class="input" required>
          </div>
        </b-col>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Loan Amount</label>
            <input type="text" v-model="form.name" class="input" required>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Monthly Net Salary</label>
            <input type="text" v-model="form.code" class="input" required>
          </div>
        </b-col>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Monthly Gross Salary</label>
            <input type="text" v-model="form.name" class="input" required>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Interest</label>
            <input type="text" v-model="form.code" class="input" required>
          </div>
        </b-col>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Start Date</label>
            <input type="date" v-model="form.name" class="input" required>
          </div>
        </b-col>
      </b-row>

       <b-row>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Branch Manager</label>
            <input type="text" v-model="form.code" class="input" required>
          </div>
        </b-col>
        <b-col>
          <div class="position-relative mt-4">
            <label for="name" class="name-label">Secondary Branch Manager</label>
            <input type="text" v-model="form.name" class="input" required>
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
  import { mapActions } from 'vuex'
  export default {
    name: 'AddLoan',
    data() {
      return {
        form: {
          name: '',
          code: '',
          oldCode: ''
        }
      }
    },
    methods: {
      ...mapActions(['addBranch']),
      showModal() {
        console.log('0---0')
        this.$refs['addLoanModal'].show()
      },
      onSubmit() {
        this.addBranch(this.form).then(res => {
          this.$refs['addBranchModal'].hide()
        })
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
