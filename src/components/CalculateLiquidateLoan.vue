<template>
  <b-modal ref="calculateLiquidateLoan"
    title="Liquidate Loan"
    hide-header-close hide-footer>
    <form  @submit.prevent="onSubmit">
      <div class="position-relative mt-4">
        <label for="name" class="name-label">Loan Model</label>
        <b-form-select required class="input" v-model="loanModal" :options="loanModals"></b-form-select>
      </div>

      <div class="position-relative mt-4">
        <label for="name" class="name-label">Liquidation Type</label>
        <b-form-select required class="input" v-model="liquidType" :options="liquidTypes"></b-form-select>
      </div>

      <div class="mt-2">
        <input type="text" placeholder="Interest Charged" class="inline-input form-control">
      </div>
      <div class="mt-2">
        <input type="text" placeholder="Capital Balance" class="inline-input form-control">
      </div>

       <div class="mt-2">
        <input type="text" placeholder="Liquidation Amount" class="inline-input form-control">
      </div>

      <div class="position-relative mt-4">
        <label for="name" class="name-label">Interest Owed</label>
        <input type="number"  required class="input">
      </div>


      <div class="position-relative mt-4">
        <label for="name" class="name-label">Amount Paid</label>
        <input type="number"  required class="input">
      </div>

      <div class="position-relative mt-4">
        <label for="name" class="name-label">Date Paid</label>
        <input type="date"  required class="input">
      </div>


       <div class="d-flex justify-content-between mt-4">
        <button class="button-cancel" @click="$refs['calculateLiquidateLoan'].hide()">Cancel</button>
        <button class="button-save" style="width: 52%;">Save</button>
      </div>
    </form>
  </b-modal>
</template>
<script>
  export default {
    name: 'CalculateLiquidateLoan',
    data() {
      return {
        liquidTypes: ['Full', 'Partial'],
        loanModals: ['Standard', 'Flexi'],
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
      }
    },
    methods: {
      showModal() {
        this.$refs['calculateLiquidateLoan'].show()
      },
      onSubmit() {
        console.log('hello')
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