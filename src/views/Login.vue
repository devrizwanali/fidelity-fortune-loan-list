<template>
  <div class="login-wrapper">
    <div class="login">
      <div class="login-content text-white text-center">
        <h1 class="welcome my-4">Welcome</h1>
        <h4 class="heading">Please enter your details.</h4>
        <form v-on:submit.prevent="submitHandler">
          <b-form-group id="email">
            <b-form-input
              v-model="user.usernameOrEmailOrPhone"
              type="text"
              placeholder="User Name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="password" class="mt-5">
            <b-form-input
              v-model="user.password"
              type="password"
              class="mb-1"
              placeholder="Password"
              required
              autocomplete="on"
            ></b-form-input>
          </b-form-group>
          <p class="forgot-password mt-4">Forgot Password</p>
          <button class="btn btn-light btn-block mt-5" :disabled="clicked">
            <span v-if="clicked">Logging in...</span>
            <span v-else>Log in</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'Login',
    data() {
      return {
        clicked: false,
        user: {
          usernameOrEmailOrPhone: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions(['login']),
      submitHandler() {
        this.clicked = true
        this.login(this.user).then(res => {
          this.success(res.data.message)
          this.$router.push('/dashboard')
        }).catch(error => {
          this.error(error.response.data.message)
          this.clicked = false
        })
      }
    }
  }
</script>
<style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk&family=Manrope:wght@800&display=swap");

  * {
    font-family: 'Space Grotesk';
  }

  .login-wrapper {
    background-image: url('@/assets/login-page.png');
    height: 100vh;
    object-fit: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .login {
    position: absolute;
    width: 50%;
    right: 0;
    top: 0%;
    bottom: 0%;
    background: rgba(41, 41, 41, 0.39);
    -webkit-backdrop-filter: blur(50px);
    backdrop-filter: blur(50px);
  }

  .login-content {
    position: absolute;
    width: 50%;
    left: 27%;
    top: 22%;
  }

  .heading {
    font-size: 20px;
    line-height: 26px;
  }

  .welcome {
    font-size: 36px;
    line-height: 49px;
    font-family: 'Manrope';
  }

  .forgot-password {
    font-size: 15px;
    cursor: pointer;
    line-height: 19px;
    text-decoration-line: underline;
  }

  input, input:focus {
    border: none;
    background: none;
    border-bottom: 1px solid #E0E0E0;
    border-radius: unset;
    box-shadow: none;
    color: #FFFFFF;
  }

  form {
    margin-top: 4rem !important;
  }

  .form-control::-webkit-input-placeholder {
    font-size: 20px;
    line-height: 26px;
    color: #FFFFFF;
  }

  .btn-block {
    margin-top: 100px !important;
  }
</style>
