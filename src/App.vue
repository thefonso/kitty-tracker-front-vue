<template>
  <div id="app">
    <template v-if="currentUser">
      <Navbar></Navbar>
    </template>
    <main class="container-fluid">
      <router-view/>
    </main>
    <template v-if="currentUser">
      <Foot></Foot>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from './components/Navbar'
import Foot from './components/Foot'

export default {
  name: 'App',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  created () {
    this.checkCurrentLogin()
  },
  updated () {
    this.checkCurrentLogin()
  },
  methods: {
    checkCurrentLogin () {
      if (!this.currentUser && this.$route.path !== '/') {
        this.$router.push('/?redirect=' + this.$route.path)
      }
    }
  },
  components: {
    Navbar,
    Foot
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
/*Body padding reguired for fixed-top bootstrap navbar - see docs*/
body {
  background-color: #2B303B;
  padding-top: 4.3em;
  padding-bottom: 3em;
}

.divTableRow:nth-child(even) {
  background-color: #21252D;
  color: darkgray;
}

.visible {
  visibility: visible;
}
.invisible {
  visibility: hidden;
}
.divTableCell{
  color: lightgray;
}
.is-danger{
  color:red;
}
.fa-warning{
  color:red;
}
/*BOOTSTRAP OVERRIDE*/
.btn-primary {
  background-color: #0275D8;
}
.bg-primary {
  background-color: #6d5cae;
}
.bg-master {
  background-color: #626262;
}
.bg-complete {
  background-color: #48b0f7;
}
.bg-success {
  background-color: #10cfbd;
}
.bg-menu {
  background-color: #202328;
}
.bg-info {
  background-color: #3b4752;
}
.bg-danger {
  background-color: #f55753;
}
.bg-warning {
  background-color: #f8d053;
}
.bg-master-darkest {
  background-color: #000000;
}
.bg-master-darker {
  background-color: #1a1a1a;
}
.bg-master-dark {
  background-color: #2c2c2c;
}
.bg-master {
  background-color: #626262;
}
.bg-master-light {
  background-color: #e6e6e6;
}
.bg-master-lighter {
  background-color: #f0f0f0;
}
.bg-master-lightest {
  background-color: #fafafa;
}
.bg-primary-darker {
  background-color: #413768;
}
.bg-primary-dark {
  background-color: #5b4d91;
}
.bg-primary {
  background-color: #6d5cae;
}
.bg-primary-light {
  background-color: #8a7dbe;
}
.bg-primary-lighter {
  background-color: #e2deef;
}
.bg-complete-darker {
  background-color: #2b6a94;
}
.bg-complete-dark {
  background-color: #3c93ce;
}
.bg-complete {
  background-color: #48b0f7;
}
.bg-complete-light {
  background-color: #6dc0f9;
}
.bg-complete-lighter {
  background-color: #daeffd;
}
.bg-success-darker {
  background-color: #0a7c71;
}
.bg-success-dark {
  background-color: #0dad9e;
}
.bg-success {
  background-color: #10cfbd;
}
.bg-success-light {
  background-color: #40d9ca;
}
.bg-success-lighter {
  background-color: #cff5f2;
}
.bg-warning-darker {
  background-color: #957d32;
}
.bg-warning-dark {
  background-color: #cfae45;
}
.bg-warning {
  background-color: #f8d053;
}
.bg-warning-light {
  background-color: #f9d975;
}
.bg-warning-lighter {
  background-color: #fef6dd;
}
.bg-danger-darker {
  background-color: #933432;
}
.bg-danger-dark {
  background-color: #cd4945;
}
.bg-danger {
  background-color: #f55753;
}
.bg-danger-light {
  background-color: #f77975;
}
.bg-danger-lighter {
  background-color: #fddddd;
}
.bg-info-darker {
  background-color: #232b31;
}
.bg-info-dark {
  background-color: #313b44;
}
.bg-info {
  background-color: #3b4752;
}
.bg-info-light {
  background-color: #626c75;
}
.bg-info-lighter {
  background-color: #d8dadc;
}
.bg-menu-light {
  background-color: #646972;
}
.bg-menu {
  background-color: #202328;
}
.bg-menu-light {
  background-color: #646972;
}
.bg-white {
  background-color: #fff;
}
.b-grey {
  border-color: #e6e6e6;
}
a:focus, a:hover, a:active {
  color: #6d5cae;
  /*text-shadow: hoff voff blur #fff;*/
}
a {
  color: #2A9FD6;
}
</style>
