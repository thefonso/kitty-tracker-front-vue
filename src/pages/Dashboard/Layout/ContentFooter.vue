<template>
  <footer class="footer">
    <div class="container-fluid d-flex flex-wrap justify-content-between">
      <nav>
        <ul class="footer-menu">
          <li>
            <router-link :to="{path:'/admin'}">Dashboard</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright">
        &copy; 2017-{{ getYear() }} Coded with
        <i class="fa fa-heart heart"></i> by
        <a href="https://github.com/thefonso" target="_blank">Alfonso Rush</a>.
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    methods: {
      getYear() {
        let year
        return year = new Date().getFullYear();
      },
    }
  }

</script>
<style>

</style>
