<template>
  <b-modal ref="bulkUpload" title="Bulk Upload" hide-header-close hide-footer>
    <form  @submit.prevent="onSubmit">
      <div class="position-relative mt-4">
        <label for="name" class="name-label">Select Branch</label>
         <b-form-select required class="input" v-model="form.branchCode" :options="branchList"></b-form-select>
      </div>

      <div class="position-relative mt-4">
        <label for="name" class="name-label">Paid Date</label>
        <input type="date" v-model="form.payDate" class="input" required>
      </div>

      <div class="position-relative mt-4">
        <label for="name" class="name-label">Deduction</label>
        <b-form-select required class="input" v-model="form.loanType" :options="deductionOptions"></b-form-select>
      </div>

      <div class="mt-4" @click="addFile">
        <img src="@/assets/bulk-upload.png">
        <p class="my-2">Add File</p>
      </div>

      <input type="file" class="d-none" @change="fileUploaded" ref="file-input" accept=".csv">
      <p v-if="form.fileName">{{form.fileName.name}}</p>
      <div class="d-flex justify-content-around mt-4">
        <button class="button-cancel" @click.prevent="$refs['bulkUpload'].hide()">Cancel</button>
        <button class="button-save">Submit</button>
      </div>
    </form>
  </b-modal>

</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import axios from '@/axios'
  export default {
    name: 'BulkUpload',
    data() {
      return {
        deductionOptions: [
          {text: 'state', value: 'STATE'}, 
          {text: 'Local', value: 'LOCAL'}
        ],
        form: {
          branchCode: '',
          loanType: '',
          fileName: '',
          fileType: "LOAN_REPAYMENT",
          payDate: '',
        }
      }
    },
    computed: {
      ...mapGetters(['branchCodes']),
      branchList() {
        let branches = []
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
    methods: {
      ...mapActions(['fetchBrachCodes']),
      onSubmit() {
        const formData = new FormData()
         formData.append('fileName', this.form.fileName)
         formData.append('fileType', this.form.fileType)
         formData.append('payDate', this.form.payDate)
         formData.append('branchCode', this.form.branchCode)

        if(!this.form.fileName){
          this.error('Please upload file.')
          return
        } else {

          axios.defaults.headers['Content-Type'] = 'multipart/form-data'
          axios.post(`/file/upload`, formData)
          .then(res => {
            debugger
          })
          .catch(error => this.error(error.response.data.message))
        }
      },
      addFile() {
        this.$refs['file-input'].click()
      },
      showModal() {
        this.$refs['bulkUpload'].show()
      },
      fileUploaded() {
        this.form.fileName = this.$refs['file-input'].files[0]
      }
    }
  }
</script>
