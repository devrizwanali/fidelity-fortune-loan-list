<template>
  <div class="my-3 d-flex justify-content-between align-items-center">
    <div class="stepper rounded-circle align-items-center d-flex justify-content-center"
      :class="step  >= 1 ? 'stepper__active' : 'stepper__inactive'"
    >
      <span>1</span>
    </div>

    <div class="stepper__line" 
      :class="step > 1 ? 'stepper__line--active' : 'stepper__line--inactive'"
    ></div>
    <div class="stepper rounded-circle align-items-center d-flex justify-content-center"
      :class="step >= 2 ? 'stepper__active' : 'stepper__inactive'"
    >
      <span>2</span>
    </div>

    <div class="stepper__line" 
      :class="step > 2 ? 'stepper__line--active' : 'stepper__line--inactive'"
    ></div>
    <div class="stepper rounded-circle align-items-center d-flex justify-content-center"
      :class="step  >= 3 ? 'stepper__active' : 'stepper__inactive'"
    >
      <span>3</span>
    </div>

    <div class="stepper__line"
      :class="step > 3 ? 'stepper__line--active' : 'stepper__line--inactive'"
    ></div>
    <div class="stepper rounded-circle align-items-center d-flex justify-content-center" 
        :class="step  === 4 ? 'stepper__active' : 'stepper__inactive'"
     >
      <span>4</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Stepper',
    props: {
      step: {
        type: Number,
        required: true
      }
    }
  }
</script>
<style scoped>
  .stepper {
    width: 37px;
    height: 37px;
  }
  .stepper span {
    font-size: 25px;
  }
  .stepper__active {
    color: #FFFFFF;
    background: var(--blue-color);
  }
  .stepper__inactive {
    background: #D9D9D9;
    color: #131518;
  }
  .stepper__line {
    width: 171px;
    height: 1px;
  }
  .stepper__line--active {
    border: 1px solid var(--blue-color);
  }
  .stepper__line--inactive {
    border: 1px solid #D9D9D9;
  }
</style>