<template>
  <div class="d-flex justify-content-between align-items-center p-footer">
    <div class="d-flex align-items-center" style="gap: 8px">
      <p>Show</p>
      <b-form-select
        v-model="perPageLocal"
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
    props: {
      totalElements: {
        required: true,
        type: Number
      },
      totalPages: {
        required: true,
        type: Number
      },
      perPage: {
        required: true,
        type: Number
      },
      currentPage: {
        required: true,
        type: Number
      }
    },
    data() {
      return {
        options: [10, 20, 50],
      }
    },
    computed: {
      showingEnteries () {
        if((this.currentPage * this.perPage) > this.totalElements)
          return this.totalElements
        else
          return this.currentPage * this.perPage
      },
      perPageLocal: {
        set: function(newValue) {
          this.$emit('onPerPageChange', newValue)
        },
        get: function() {
          return this.perPage
        }
      }
    },
    methods: {
      handerPageChange(page) {
        this.$emit('onPageChange', page)
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
</style>