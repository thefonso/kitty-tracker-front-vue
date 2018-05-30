<template>
    <div class="text-center">
      <form class="form-signin" @submit.prevent="login">
          <transition name="fade1" appear="">
            <div class="fadecontent">
              <img class="mb-4" src="../assets/logo2.png" height="189px">
              <h1 class="h3 mb-3 font-weight-normal">Kitty Tracker</h1>
              <div class="alert alert-danger" v-if="error">{{ error }}</div>
            </div>
          </transition>
          <transition name="fade2" appear="">
            <div class="fadecontent">
              <label for="inputName" class="sr-only">Name</label>
              <input id="inputName" name="username" class="form-control" placeholder="Username" required="" autofocus="" type="text" v-model="username">
              <label for="inputPassword" class="sr-only">Password</label>
              <input id="inputPassword" name="password" class="form-control" placeholder="Password" required="" type="password" v-model="password">
            </div>
          </transition>
          <transition name="fade3" appear="">
            <div class="fadecontent">
              <button class="btn btn-lg btn-primary btn-block mt-5" type="submit">Sign in</button>
              <p>Don't have an account? <router-link to="/signup" class="-link">Sign Up</router-link></p>
              <p class="mt-5 mb-3 text-muted">&copy; 2017-{{ getYear() }} </p>
            </div>
          </transition>
      </form>
    </div>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex'

  export default {

    name: 'Login',
    data () {
      return {
        key: '1',
        visible: false,
        username: '',
        password: '',
        error: false
      }
    },
    computed: {
      ...mapGetters({ currentUser: 'currentUser' })
    },
    mounted(){
      this.visible = true;
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

  .fadecontent{
    opacity: 1;
  }
  .fade1-enter,.fade2-enter,.fade3-enter{
    transform: translateX(20px);
    opacity: 0;
  }
  .fade1-enter-active{
    transition: all 1s ease;
  }
  .fade2-enter-active{
    transition: all 1s ease 0.5s;
  }
  .fade3-enter-active{
    transition: all 1s ease 1s;
  }

  .fade1-leave-active,.fade2-leave-active,.fade3-leave-active{
    opacity: 0;
    transform: translateX(20px);
  }
  .fade1-leave-active{
    transition: all 1s ease;
  }
  .fade2-leave-active{
    transition: all 1s ease 1s;
  }
  .fade3-leave-active{
    transition: all 1s ease 2s;
  }

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
