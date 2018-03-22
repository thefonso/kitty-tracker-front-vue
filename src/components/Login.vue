<template>
  <div class="text-center">
    <form class="form-signin" @submit.prevent="login">
      <img class="mb-4" src="../assets/logo1.png" height="189px">
      <h1 class="h3 mb-3 font-weight-normal">Kitty Tracker</h1>
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <label for="inputName" class="sr-only">Name</label>
      <input id="inputName" class="form-control" placeholder="Username" required="" autofocus="" type="text" v-model="username">
      <label for="inputPassword" class="sr-only">Password</label>
      <input id="inputPassword" class="form-control" placeholder="Password" required="" type="password" v-model="password">
      <button class="btn btn-lg btn-primary btn-block mt-5" type="submit">Sign in</button>
      <p>Don't have an account? <router-link to="/signup" class="-link">Sign Up</router-link></p>

      <p class="mt-5 mb-3 text-muted">&copy; 2017-{{ getYear() }} </p>
    </form>
  </div>
</template>

<script>
  // import axios from '../backend/vue-axios/axios'
  import axios from 'axios';
  import { mapGetters } from 'vuex'

  export default {

    name: 'Login',
    data () {
      return {
        username: '',
        password: '',
        error: false
      }
    },
    computed: {
      ...mapGetters({ currentUser: 'currentUser' })
    },
    created () {
      if (this.currentUser) {
        this.$router.replace(this.$route.query.redirect || '/catlist')
      }
    },
    updated () {
      if (this.currentUser) {
        this.$router.replace(this.$route.query.redirect || '/catlist')
      }
    },
    methods: {
      login () {
        axios.post('http://localhost:8000/api/v1/auth/obtain_token/',
          { username: this.username, password: this.password },
          { headers: {'X-Requested-With': 'XMLHttpRequest'}})
          .then(request => this.loginSuccessful(request))
          .catch((error) => this.loginFailed(error))
      },
      loginSuccessful (req) {
        if (!req.data.token) {
          this.loginFailed();
          return
        }
        this.error = false;

        localStorage.token = req.data.token;
        this.$store.dispatch('login');
        console.log(req);
        // TODO: BUG exist when you logout after selecting signup the router takes you to that page on failed login. Check to see if this fixes
        // this.$router.replace(this.$route.query.redirect || '/catlist')
        this.$router.replace('/catlist')
      },
      loginFailed (error) {
        this.$store.dispatch('login');
        delete localStorage.token;
        console.log(error)
      },
      getYear(){
        let year = new Date().getFullYear();
        return year
      }

    }
  }
</script>

<style scoped>
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }
  .form-signin .checkbox {
    font-weight: 400;
  }
</style>
