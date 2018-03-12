<template>
  <div>
    <ul id="v-for-object" class="demo">
      <li v-for="cat in cats">
        {{ cat.name }}
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        cats: []
      }
    },
    methods: {
      onGetCats() {
        axios.get('http://localhost:8000/api/v1/cats/')
          .then(
            response => {
              this.cats = response.data.results;
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
