<template>
  <b-modal ref="bulkUpload" title="Bulk Upload" no-close-on-backdrop hide-header-close hide-footer>
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

      <div class="mt-4 cursor-pointer" @click="addFile">
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
          {text: 'State', value: 'STATE'}, 
          {text: 'Local', value: 'LOCAL'}
        ],
        form: {
          branchCode: '',
          loanType: '',
          fileName: '',
          data: null, // added for Base64 string
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
        formData.append('data', this.form.data) // append the Base64 encoded string
         formData.append('fileName', this.form.fileName.name)
         formData.append('fileType', this.form.fileType)
         formData.append('payDate', this.form.payDate)
         formData.append('branchCode', this.form.branchCode)
         formData.append('', this.form.fileName)
         formData.append('loanType', this.form.loanType) //loanType was not previously being appended

        if(!this.form.fileName){
          this.error('Please upload file.')
          return
        } else {
          axios.post(`/file/upload`, formData)
          .then(res => {
            this.success(res.data.message)
            this.$store.dispatch('fetchLoans', { page: 1, size: 10 })
            this.$refs['bulkUpload'].hide()
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
        const fileReader = new FileReader()
        fileReader.readAsDataURL(this.$refs['file-input'].files[0])
        fileReader.onload = () => {
          this.form.fileName = this.$refs['file-input'].files[0]
          this.form.data = fileReader.result.split(',')[1] // get the Base64 encoded string
        }
      }
    }
  }
</script>
