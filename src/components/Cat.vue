<template>
  <div class="panel panel-default">
    <div>CAT PAGE</div>
    <div class="panel-body">
      {{ $route.params.catID }}
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
  data() {
      return {
        cat: []
      }
    },
    methods: {

      onGetCats() {
        axios.get('http://localhost:8000/api/v1/cats/' + '1')
          .then(
            response => {
              console.log(response);
              this.cat = response.data.results;
            }
          )
          .catch(
            error => console.log(error)
          );
      },
    },
    created(){
      this.onGetCats()
    }
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
