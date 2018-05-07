<template>
  <!--TODO: do something with me-->
</template>

<script>
  export default {
    name: 'Logout',
    created () {
      delete localStorage.token
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
</script>
