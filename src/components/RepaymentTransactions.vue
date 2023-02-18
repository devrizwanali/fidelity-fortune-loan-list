<template>
  <div>
    <b-modal 
      ref="re-payment-transation-modal"
      :title="title" 
      hide-footer
      hide-header-close
      modal-class="customerLoanList"
      > 
      <div class="my-5"></div>

      <b-table
        :items="transactions"
        :fields="headers"
        :current-page="currentPage"
        :per-page="perPage"
        show-empty
        :busy.sync="isBusy"
        small
        ref="transations_list"
        responsive
        class="mb-5"
        >

        <template v-slot:table-busy>
          <div class="text-center my-2" style="color: var(--blue-color);">
            <b-spinner class="align-middle"></b-spinner>
            <strong> Loading...</strong>
          </div>
        </template>

        <template #cell(status)="data">
          <span 
            :style="{color: getColorTransation(data.item.status), 
            background: getBgColorTransaction(data.item.status)}" 
            class= "px-3 status cursor-pointer"
          >
            {{data.value}}
          </span>
        </template>

        <template #cell(source)="data">
          <span>
            {{data.value == 'CASH' ? 'Cash' : 'Cheque'}}
          </span>
        </template>

        <template #cell(amount)="data">
          <span>
            {{data.value | formatNumber}}
          </span>
        </template>
      </b-table>
      <pagination
        :current-page="currentPage"
        :per-page="perPage"
        :total-pages="transactions.length"
        :totalElements="transactions.length"
        @onPageChange="pageChangeHandler"
        @onPerPageChange="perpageChangeHandler"
      />
    </b-modal>
  </div>
</template>
<script>
  import Pagination from '@/components/Pagination'
  import { mapGetters, mapActions } from 'vuex'
  import mixin from "@/mixins"
  import axios from '@/axios'
  export default {
    name: 'RepaymentTransactions',
    data() {
      return {
        isBusy: true,
        currentPage: 1,
        transactions: [],
        perPage: 10,
        headers: [
          {label: 'Transaction ID', key: 'id'},
          {label: 'Amount', key: 'amount'},
          {label: 'Paid Date', key: 'paidDate'},
          {label: 'Source', key: 'source'},
          {label: 'Status', key: 'status'},
        ]
      }
    },
    props: {
      loanId: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true
      }
    },
    mixins: [mixin],
    components: {
      Pagination
    },
    watch: {
      loanId: function(newVal, oldVal) {
        this.isBusy = true
        axios.post(`transaction/${newVal}`).then(res => {
          this.transactions = res.data.response
          this.isBusy = false
        }).catch(error => {
          this.isBusy = false
          this.error('Something went wrong!')
        })
      }
    },
    methods: {
      showModal() {
        this.$refs['re-payment-transation-modal'].show()
      },
      pageChangeHandler(page) {
        this.currentPage = page
      },
      perpageChangeHandler(perPage) {
        this.perPage = perPage
        this.currentPage = 1
      },
    }
  }
</script>
