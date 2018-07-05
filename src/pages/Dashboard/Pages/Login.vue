<template>
  <auth-layout pageClass="login-page">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-lg-4 col-md-6 col-sm-8">
        <form class="form-signin" @submit.prevent="validateBeforeSubmit">
          <!--You can specify transitions on initial render. The `card-hidden` class will be present initially and then it will be removed-->
          <fade-render-transition>
            <card>
              <div slot="header">
                <h3 class="card-title text-center">Login</h3>
              </div>
              <div>
                <fg-input label="username"
                          type="text"
                          placeholder="Enter Username"
                          name="username"
                          v-model="username"
                          v-validate="modelValidations.username"
                          :error="getError('username')">
                </fg-input>
                <fg-input label="passsword"
                          type="password"
                          placeholder="Password"
                          name="password"
                          v-model="password"
                          v-validate="modelValidations.password"
                          :error="getError('password')">
                </fg-input>
                <fg-input>
                  <l-checkbox v-model="subscribe">
                    Subscribe to newsletter
                  </l-checkbox>
                </fg-input>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-fill btn-info btn-round btn-wd ">Login</button>
                <br>
                <div class="forgot">
                  <router-link to="/register" class="card-category">
                    Forgot your password?
                  </router-link>
                </div>
              </div>
            </card>
          </fade-render-transition>

        </form>
      </div>
    </div>
  </auth-layout>
</template>
<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex'
  import { Checkbox as LCheckbox, FadeRenderTransition } from 'src/components/index'
  import AuthLayout from './AuthLayout.vue'
  export default {
    components: {
      LCheckbox,
      FadeRenderTransition,
      AuthLayout
    },
    data () {
      return {
        key: '1',
        visible: false,
        username: '',
        password: '',
        modelValidations: {
          username: {
            required: true,
            alpha_spaces: true
          },
          password: {
            required: true,
            min: 5
          }
        },
        subscribe: false,
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
        this.$router.replace(this.$route.query.redirect || '/table-list/extended')
      }
    },
    updated () {
      if (this.currentUser) {
        this.$router.replace(this.$route.query.redirect || '/table-list/extended')
      }
    },
    methods: {
      getError (fieldName) {
        return this.errors.first(fieldName)
      },
      medicationSubmit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            console.log('it submitted');
            this.postMedications(result);
          }else{
            console.log('it blew up');
            // this.showDanger = true;
          }
        });
      },
      validateBeforeSubmit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            console.log("validate called");
            this.login();
          } else {
            // this.showDanger = true;
          }
        });
      },
      login () {
        axios.post(`${process.env.KITTY_URL}/api/v1/auth/obtain_token/`,
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
        this.$router.replace('/table-list/extended')
      },
      loginFailed (error) {
        this.$store.dispatch('login');
        delete localStorage.token;
        console.log(error)
      },
      toggleNavbar () {
        document.body.classList.toggle('nav-open')
      },
      closeMenu () {
        document.body.classList.remove('nav-open');
        document.body.classList.remove('off-canvas-sidebar')
      }
    },
    beforeDestroy () {
      this.closeMenu()
    }
  }
</script>
<style>
  .navbar-nav .nav-item p{
    line-height: inherit;
    margin-left: 5px;
  }
</style>
