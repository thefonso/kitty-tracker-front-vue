<template>
  <div class="row">
    <div class="col-xs-12">

      <span class="navbar-text">
        <router-link to="/" class="btn btn-sm">home</router-link>
        <router-link to="/cat" class="btn btn-sm">Cat</router-link>
        <router-link to="/catlist" class="btn btn-sm">Catlist</router-link>
        <router-link to="/feedings" class="btn btn-sm">feedings</router-link>
        <router-link to="/login" class="btn btn-sm" v-if="!currentUser">login</router-link>
        <router-link to="/logout" class="btn btn-logout btn-sm" v-if="currentUser">Logout</router-link>
      </span>

    </div>
  </div>
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
