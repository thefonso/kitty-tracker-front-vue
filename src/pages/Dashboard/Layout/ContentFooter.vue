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
        &copy; 2017-{{ getYear() }} for cat lovers
        <i class="fa fa-heart heart"></i>.
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
