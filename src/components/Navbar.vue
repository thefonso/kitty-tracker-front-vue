<template>
    <nav class="navbar navbar-expand-md fixed-top" id="navbar_top">
      <!--TODO: adjust logo to float and fit like prototype design-->
      <router-link to="/" class="navbar-brand"><img src="../assets/logo_long.png" height="57px"></router-link>
      <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" onclick="toggleCollapse">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <!--<li class="nav-item">-->
            <!--<router-link to="/" class="nav-link">KittyTracker</router-link>-->
          <!--</li>-->
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
    /*border-bottom: 1px solid #282828;*/
    /*background-color: #272b35;*/
    /*border-bottom: 1px solid #232730;*/
    padding: 0 10px 0 10px;
    border-bottom: 1px solid #222;
    /*box-shadow: 0 1px 0 #262626;*/
    background-color: #21252d;
    /*background-image: -webkit-gradient(linear,left top,left bottom,from(#21252D),to(#191919));*/
    /*background-image: -webkit-linear-gradient(top,#21252D,#191919);*/
    /*background-image: linear-gradient(top,#21252D,#191919);*/
    /*background-repeat: no-repeat;*/
    line-height: 12px;
    z-index: 9999;
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
  a:focus, a:hover, a:active {
    color: #2A9FD6;
    /*text-shadow: hoff voff blur #fff;*/
  }
  a {
    color: #6d5cae;
  }
</style>
