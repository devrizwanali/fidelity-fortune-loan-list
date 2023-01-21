<template>
    <div>
      {{routeName}}
       <b-modal ref="ok" :title="'Add Branch'" hide-header-close>
      <p class="my-4">{{this.routeName}}</p>

      <input type="text" name="" style="background: rgba(255, 255, 255, 0.01);
background-blend-mode: multiply;">

      <template #modal-footer>
           <button class="button-cancel" @click="$refs[routeName].hide()">Cancel</button>
           <button class="button-save">Save</button>
      </template>
     </b-modal>
    </div>
</template>
<script>
  export default {
    name: 'AddBranch',
    props: {
      routeName: {
        type: String,
        required: true
      }
    },
    methods: {
      showModal() {

      }
    }
  }
</script>