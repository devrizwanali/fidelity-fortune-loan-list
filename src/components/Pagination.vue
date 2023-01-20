<template>
  <div class="d-flex justify-content-between align-items-center p-footer">
    <div class="d-flex align-items-center" style="gap: 8px">
      <p>Show</p>
      <b-form-select
        v-model="perPage"
        :options="options"
        class="mb-3"
        >
      </b-form-select>
      <p>entries</p>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalPages"
      :per-page="perPage"
      pills
      @change="handerPageChange"
      size="sm">
    </b-pagination>

      <p class="pagination-footer">
        Showing {{((currentPage - 1) * perPage ) + 1}} to {{showingEnteries}} of {{totalElements}} entries
      </p>
    </div>
</template>
<script>
  export default {
    name: 'Pagination',
    data() {
      return {
        currentPage: 1,
        perPage: 10,
        filter: null,
        interval: null,
        options: [10, 20, 50],
      }
    },
    computed: {
      showingEnteries () {
        if((this.currentPage * this.perPage) > this.totalElements)
          return this.totalElements
        else
          return this.currentPage * this.perPage
      }
    },
    methods: {
      handerPageChange() {
        this.$emit('pageChangeHandler')
      }
    }
  }
</script>

<style>
  .p-footer p, select {
    color: #131518;
    opacity: 0.7;
    text-shadow: 0px 10px 40px rgba(1, 0, 39, 0.25);
  }

  .page-link {
    border: none;
  }

  button[role=menuitemradio], .page-item {
    color: #131518;
    opacity: 0.7;
  }

/*  .page-item.active .page-link {
    color: #0044AA !important;
    opacity: 1 !important;
  }*/

 /* .page-item.active {
    background: rgba(0, 68, 170, 0.7);
    border-radius: 7px;
  }*/
</style>