<template>
  <b-modal ref="payLoan" title="Pay Loan" hide-header-close hide-footer>
    <form  @submit.prevent="onSubmit">
      <div class="position-relative mt-4">
        <label for="name" class="name-label">Choose Loan</label>
        <b-form-select class="input" v-model="form.loanId" :options="loansList"></b-form-select>
      </div>

      <div class="position-relative mt-4">
        <label for="name" class="name-label">Choose Source</label>
        <b-form-select class="input" v-model="form.source"  :options="sources"></b-form-select>
      </div>

      <div class="position-relative mt-4">
        <label for="name" class="name-label">Paid Date</label>
        <input type="date" v-model="form.paidDate" required class="input">
      </div>

      <div class="position-relative mt-4">
        <label for="name" class="name-label">Repayment Amount</label>
        <input type="number" v-model="form.amount" required class="input">
      </div>

      <div class="position-relative mt-4">
        <label for="name" class="name-label">Payment Description</label>
        <textarea type="text" v-model="form.description" required class="textarea"></textarea>
      </div>

       <div class="d-flex justify-content-between mt-4">
        <button class="button-cancel" @click.prevent="$refs['payLoan'].hide()">Cancel</button>
        <button class="button-save">Save</button>
      </div>
    </form>
  </b-modal>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'PayLoan',
    data() {
      return {
        sources: [
          {value: 'CASH', text: 'Cash'},
          {value: 'GOVT_CHEQUE', text: 'Cheque'}
        ],
        form: {
          source: '',
          paidDate: '',
          amount: '',
          description: '',
          loanId: ''
        },
      }
    },
    computed: {
      ...mapGetters(['customerLoans']),
      loansList() {
        let loans = [];
        this.customerLoans.filter( x => x.approved && !(x.status == 'SETTLED' || x.status == 'LIQUIDATED'))
          .map(x => {
          let obj = {value: x.id, text: x.loanNo}
          loans.push(obj)
        })
        return loans
      }
    },
    methods: {
      ...mapActions(['payLoan']),
      showModal() {
        this.$refs['payLoan'].show()
      },
      onSubmit() {
        this.payLoan(this.form).then(res => {
          this.success(res.data.message)
          this.$refs['payLoan'].hide()
        }).catch(error => this.error(error.message))
      }
    }
  }
</script>
<style scoped>
  @import "@/assets/css/form";

  ::-webkit-input-placeholder {
    color: rgba(48, 36, 82, 0.5);
    text-align: center;
  }
</style>
