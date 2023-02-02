<template>
  <div>
    <b-modal ref="liquidateLoan" title="Liquidate Loan" hide-header-close hide-footer>
      <form  @submit.prevent="onSubmit">
        <div class="position-relative mt-4">
          <label for="name" class="name-label">Loan Model</label>
          <b-form-select required class="input" v-model="loanModal" :options="loanModals"></b-form-select>
        </div>

        <div class="position-relative mt-4">
          <label for="name" class="name-label">Liquidation Type</label>
          <b-form-select required class="input" v-model="liquidType" :options="liquidTypes"></b-form-select>
        </div>

         <div class="d-flex justify-content-between mt-4">
          <button class="button-cancel" @click.prevent="$refs['liquidateLoan'].hide()">Cancel</button>
          <button class="button-save" style="width: 52%;" >Calculate Loan</button>
        </div>
      </form>
    </b-modal>
    <calculate-liquidate-loan ref="calculate-liquidate" :liquidType="liquidType" :loanModal="loanModal" />
  </div>
</template>
<script>
  import CalculateLiquidateLoan from '@/components/CalculateLiquidateLoan'
  import { mapActions } from 'vuex'
  export default {
    name: 'Liquidate',
    data() {
      return {
        liquidTypes: ['Full', 'Partial'],
        loanModals: ['Standard', 'Flexi'],
        loanModal: 'Standard',
        liquidType: 'Full'
      }
    },
    components: {
      CalculateLiquidateLoan
    },
    methods: {
      ...mapActions(['liquidateLoan']),
      showModal() {
        this.$refs['liquidateLoan'].show()
      },
      onSubmit() {
        // this.liquidateLoan(this.form).then(res => {
        //   this.$refs['liquidateLoan'].hide()
        // })
        this.$refs['calculate-liquidate'].showModal()
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
    color: rgba(48, 36, 82, 0.5);
    text-align: center;
  }
</style>
