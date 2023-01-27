<template>
  <b-modal ref="payLoan" title="Pay Loan" hide-header-close hide-footer>
    <form  @submit.prevent="onSubmit">
      <div class="position-relative mt-4">
        <label for="name" class="name-label">Choose Loan</label>
        <b-form-select class="input" :options="options"></b-form-select>
      </div>

      <div class="position-relative mt-4">
        <label for="name" class="name-label">Choose Source</label>
        <b-form-select class="input" :options="options"></b-form-select>
      </div>

      <div class="position-relative mt-4">
        <label for="name" class="name-label">Paid Date</label>
        <input type="date" v-model="form.date" required class="input">
      </div>

       <div class="position-relative mt-4">
        <label for="name" class="name-label">Repayment Amount</label>
        <input type="text" v-model="form.amount" required class="input">
      </div>

      <div class="position-relative mt-4">
        <label for="name" class="name-label">Payment Description</label>
        <textarea type="text" v-model="form.description" required class="textarea"></textarea>
      </div>

       <div class="d-flex justify-content-between mt-4">
        <button class="button-cancel" @click="$refs['payLoan'].hide()">Cancel</button>
        <button class="button-save">Save</button>
      </div>
    </form>
  </b-modal>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'PayLoan',
    data() {
      return {
        form: {
          name: '',
          date: '',
          amount: '',
          description: ''
        },
        options: [2,3,4]
      }
    },
    methods: {
      ...mapActions(['payLoan']),
      showModal() {
        this.$refs['payLoan'].show()
      },
      onSubmit() {
        this.payLoan(this.form).then(res => {
          this.$refs['payLoan'].hide()
        })
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
