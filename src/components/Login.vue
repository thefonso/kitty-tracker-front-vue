<template>
  <div class="container">

    <form class="form-signin">
      <h2 class="form-signin-heading">Please sign in</h2>
      <label for="inputName" class="sr-only">Name</label>
      <input id="inputName" class="form-control" placeholder="User name" required="" autofocus="" type="username" v-model="username">
      <label for="inputPassword" class="sr-only">Password</label>
      <input id="inputPassword" class="form-control" placeholder="Password" required="" type="password" v-model="password">
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="signin">Sign in</button>
    </form>

  </div>
</template>

<script>
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    signin() {
      axios.post('http://localhost:8000/auth/obtain_token/',
        { name: this.username, password: this.password },
        { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
        .then(
          (response) => console.log(response),
        )
        .catch(
          (error) => console.log(error),
        );
    },
  },
};
</script>

<style scoped>

</style>
