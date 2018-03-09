<template>
  <div class="container">

    <form class="form-signin" @submit.prevent="login">
      <h2 class="form-signin-heading">Please sign in</h2>
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <label for="inputName" class="sr-only">Name</label>
      <input id="inputName" class="form-control" placeholder="Username" required="" autofocus="" type="text" v-model="username">
      <label for="inputPassword" class="sr-only">Password</label>
      <input id="inputPassword" class="form-control" placeholder="Password" required="" type="password" v-model="password">
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Login',
    data () {
      return {
        username: '',
        password: '',
        error: false
      }
    },
    methods: {
      login () {
        axios.post('http://localhost:8000/api/v1/auth/obtain_token/', { username: this.username, password: this.password })
          .then(request => this.loginSuccessful(request))
          .catch(() => this.loginFailed())
      },
      loginSuccessful (req) {
        if (!req.data.token) {
          this.loginFailed()
          return
        }

        localStorage.token = req.data.token
        this.error = false

        this.$router.replace(this.$route.query.redirect || '/cats')
      },
      loginFailed () {
        this.error = 'Login failed!'
        delete localStorage.token
      }
    }
  }
</script>

<style scoped>

</style>
