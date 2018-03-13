<template>
  <div class="panel panel-default">
    <div>CAT PAGE</div>
    <div class="panel-body">
      {{ $route.params.catNAME }}
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
    cursor: pointer;
  }
</style>
