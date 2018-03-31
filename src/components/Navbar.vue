<template>
  <!--TODO determine how best to refactor b-navbar-->
    <b-navbar tobble="'md"  class="navbar-expand-md navbar-dark bg-dark fixed-top">
      <!--TODO: adjust logo to float and fit like prototype design-->
      <router-link to="/" class="nav-link"><img src="../assets/logo1.png" height="57px"></router-link>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <router-link to="/" class="nav-link">KittyTracker</router-link>
          <router-link to="/catlist" class="nav-link">cat list</router-link>
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
