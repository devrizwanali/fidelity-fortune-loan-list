<template>
  <b-modal ref="liquidateLoan" title="Liquidate Loan" hide-header-close hide-footer>
    <form  @submit.prevent="onSubmit">
      <div class="position-relative mt-4">
        <label for="name" class="name-label">Loan Model</label>
        <b-form-select required class="input" :options="options"></b-form-select>
      </div>

      <div class="position-relative mt-4">
        <label for="name" class="name-label">Liquidation Type</label>
        <b-form-select required class="input" :options="options"></b-form-select>
      </div>

       <div class="d-flex justify-content-between mt-4">
        <button class="button-cancel" @click="$refs['liquidateLoan'].hide()">Cancel</button>
        <button class="button-save" style="width: 52%;">Calculate Loan</button>
      </div>
    </form>
  </b-modal>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'Liquidate',
    data() {
      return {
        options: [3,4,6]
      }
    },
    methods: {
      ...mapActions(['liquidateLoan']),
      showModal() {
        this.$refs['liquidateLoan'].show()
      },
      onSubmit() {
        this.liquidateLoan(this.form).then(res => {
          this.$refs['liquidateLoan'].hide()
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
