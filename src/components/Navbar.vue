<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <!--TODO: adjust logo to float and fit like prototype desing-->
      <a class="navbar-brand" href="/"><img src="../assets/logo1.png" height="57px"> KittyTracker</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/catlist" class="nav-link">cat list</router-link>
          </li>
        </ul>
        <div class="form-inline my-2 my-lg-0">
          <router-link to="/catcreate" class="nav-link">create pet</router-link>
          <router-link to="/logout" class="nav-link">logout</router-link>
        </div>
      </div>
    </nav>
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
