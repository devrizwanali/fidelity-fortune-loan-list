<template>
  <div class="main pb-5">
    <div class="d-flex justify-content-between mx-2">
      <h1>Reports</h1>
      <img src="@/assets/dots.svg" class="cursor-pointer">
    </div>
    <div class="container">
      <b-row class="d-flex justify-content-center">
        <div class="box mx-5 my-3" 
          @click="reportHandler(0)"
          >
          <img src="@/assets/library_books.svg">
          <p>LEDGER</p>
        </div>
        <div class="box mx-5 my-3" 
          @click="reportHandler(1)"
          >
          <img src="@/assets/subtitles.svg">
          <p>SHORT-PAID LIST</p>
        </div>
        <div class="box mx-5 my-3" 
          @click="reportHandler(2)"
          >
          <img src="@/assets/close.svg">
          <p>DEFAULTERS LIST</p>
        </div>
      </b-row>
      <b-row class="d-flex justify-content-center">
        <div class="box mx-5 my-3" 
          @click="reportHandler(3)"
          >
          <img src="@/assets/done_all.svg">
          <p>EXPIRY</p>
        </div>
        <div class="box mx-5 my-3" 
          @click="reportHandler(4)"
          >
          <img src="@/assets/assignment.png">
          <p>OVER-PAID LIST</p>
        </div>
        <div class="box mx-5 my-3" 
          @click="reportHandler(5)"
          >
          <img src="@/assets/done_all.svg">
          <p>PAID-UP LIST</p>
        </div>
      </b-row>
      <b-row class="d-flex justify-content-center">
        <div class="box mx-5 my-3">
          <img src="@/assets/library_books.svg">
          <p>Payoff Statement</p>
        </div>
        <div class="box mx-5 my-3">
          <img src="@/assets/subtitles.svg">
          <p>Performance Reports</p>
        </div>
        <div class="box mx-5 my-3">
          <img src="@/assets/library_books.svg">
          <p>Customer List</p>
        </div>
      </b-row>
    </div>

    <b-modal ref="reportsItem" :title="title" hide-header-close hide-footer>
      <form  @submit.prevent="onSubmit">
        <div class="position-relative mt-5">
          <label for="name" class="name-label">Select Branch</label>
           <b-form-select required class="input" v-model="form.branchCode" :options="branchList"></b-form-select>
        </div>

        <div class="position-relative mt-5">
          <label for="name" class="name-label">Select Date</label>
          <input type="date" v-model="form.startDate" class="input" required>
        </div>

        <div class="mt-4 cursor-pointer">
          <p style="color: #808080">PDF/Excel</p>
          <div class="d-flex justify-content-center">
            <b-form-radio v-model="form.format" name="some-radios" value="pdf"></b-form-radio>
            <b-form-radio v-model="form.format" name="some-radios" value="excel"></b-form-radio>
          </div>
         </div>

        <div class="d-flex justify-content-around mt-4">
          <button class="button-cancel" @click.prevent="$refs['reportsItem'].hide()">Cancel</button>
          <button class="button-save">Generate</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import axios from '@/axios'
  export default {
    data() {
      return {
        reportTypes: [
          {title: 'LEDGER', type: 'LEDGER'},
          {title: 'SHORT-PAID LIST', type: 'SHORT_PAID_FOR_PERIOD'},
          {title: 'DEFAULTERS LIST', type: 'DEFAULTERS_FOR_PERIOD'},
          {title: 'EXPIRY', type: 'EXPIRY'},
          {title: 'OVER-PAID LIST', type: 'OVER_PAYMENT_FOR_PERIOD'},
          {title: 'PAID-UP LIST', type: 'PAID_UP_CUSTOMER'},
          {title: 'Payoff Statement', type: ""},
          {title: 'Performance Reports', type: ""},
          {title: 'Customer List', type: ""},
        ],
        title: '',
        form:{
          branchCode: '',
          customerId: null,
          endDate: null,
          format: 'pdf',
          reportType: '',
          startDate: '',
          status: null,
          loanId: null,
        }
      }
    },
    methods: {
      ...mapActions(['fetchBrachCodes']),
      reportHandler(index) {
        this.title = this.reportTypes[index].title
        this.form.reportType = this.reportTypes[index].type
        this.$refs['reportsItem'].show()
      },
      onSubmit() {
        axios.post('/report', this.form)
        .then(res => {
          this.success(res.data.message)
          window.open(res.data.response)
          this.form.branchCode = ''
          this.form.format = ''
          this.form.startDate = ''
        }).catch(error => {
          this.error(error.response.data.message)
        })
      }
    },
    computed: {
      ...mapGetters(['branchCodes']),
      branchList() {
        let branches = ['All Branches']
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
  }
</script>

<style scoped>
  @import '@/assets/css/form.css';

  .box {
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 208px;
    height: 121.9px;
    background: #F1F0F0;
    box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
  }

  .box p {
    margin-top: 5px;
  }

  .box img {
    margin-top: 15px;
  }
</style>
