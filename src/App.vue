<template>
    <router-view></router-view>
</template>


<script>
  import { mapGetters } from 'vuex'

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

    }
  }
</script>
<style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
