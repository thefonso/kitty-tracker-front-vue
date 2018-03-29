<template>
  <!--TODO determine how best to refactor b-navbar-->
    <b-navbar tobble="'md"  class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <!--TODO: adjust logo to float and fit like prototype design-->
      <b-navbar-brand>
        <router-link to="/"><img src="../assets/logo1.png" height="57px"> KittyTracker</router-link>
      </b-navbar-brand>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item class="nav-link"><router-link to="/catlist">cat list</router-link></b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <router-link to="/catcreate" class="nav-link">create pet</router-link>
            <router-link to="/logout" class="nav-link">logout</router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Navbar',
    computed: {
      ...mapGetters({ currentUser: 'currentUser' })
    }
  }
</script>

<style lang="scss" scoped>
  .bg-cats {
    background: #605B56 !important;
  }

  .btn-logout {
    background-color: #837A75;
    border-color: #837A75;
    color: #fff;
  }

  .btn-logout:hover {
    background-color: darken(#837A75, 20%);
    border-color: darken(#837A75, 20%);
    color: #fff;
  }
</style>
