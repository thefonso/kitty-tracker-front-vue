<template>
    <nav class="navbar navbar-expand-md fixed-top" id="navbar_top">
      <!--TODO: adjust logo to float and fit like prototype design-->
      <router-link to="/" class="navbar-brand"><img src="../assets/logo1.png" height="57px"></router-link>
      <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" onclick="toggleCollapse">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">KittyTracker</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/catlist" class="nav-link">cat list</router-link>
          </li>
        </ul>
        <!-- Right aligned nav items -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/catcreate" class="nav-link">create pet</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/logout" class="nav-link">logout</router-link>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Navbar',
    collapse: true,
    methods: {
      toggleCollapse(){
        const collapsed = !this.state.collapsed;
        this.setState({collapsed});
      }
    },
    computed: {
      ...mapGetters({ currentUser: 'currentUser' })
    }
  }
</script>

<style lang="scss" scoped>
  #navbar_top {
    border-bottom: 1px solid #282828;
    background: black;
  }
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
