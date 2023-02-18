<template>
  <div>
    <b-modal ref="liquidateLoan" id="liquidate-loan" title="Liquidate Loan" 
      hide-header-close hide-footer
      no-close-on-backdrop
      @show="resetModal"
      >
      <form  @submit.prevent="onSubmit">
        <div class="position-relative mt-4">
          <label for="name" class="name-label">Loan Model</label>
          <b-form-select required class="input" v-model="loanModal" :options="loanModels"></b-form-select>
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
    <calculate-liquidate-loan ref="calculate-liquidate" :loanId="loanId" :liquidType="liquidType" :loanModal="loanModal" />
  </div>
</template>
<script>
  import CalculateLiquidateLoan from '@/components/CalculateLiquidateLoan'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'Liquidate',
    data() {
      return {
        loanModal: 'STANDARD',
        liquidType: 'FULL'
      }
    },
    components: {
      CalculateLiquidateLoan
    },
    computed: {
      ...mapGetters(['customerLoans', 'liquidTypes', 'loanModels']),
      loanId() {

        const loans = this.customerLoans.filter(x => (x.status == 'ACTIVE' || x.status == 'TOPUP'))
        return loans[0]?.id
      }
    },
    methods: {
      ...mapActions(['liquidateLoan', 'computeLoan']),
      showModal() {
        this.$refs['liquidateLoan'].show()
      },
      resetModal() {
        this.loanModal = ''
        this.liquidType = ''
      },
      onSubmit() {
        const loanId = this.loanId
        let data = {model: this.loanModal, type: this.liquidType, loanId}
        this.computeLoan(data).then(res => {
          const loan = res.data.response
          this.$refs['liquidateLoan'].hide()
          this.$refs['calculate-liquidate'].showModal(loan)
        })
        .catch(error => this.error(error.response.data.message))
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
