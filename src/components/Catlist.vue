<template>

<div class="catlist-table">
  <table class="table">
    <thead class="thead-dark">
    <tr>
      <th scope="col" class="col-sm-1"></th>
      <th scope="col" class="col-sm-2">Name</th>
      <th scope="col" class="col-sm-2">gender</th>
      <th scope="col" class="col-sm-5"></th>
      <th scope="col" class="col-sm-2">Date Added</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(cat, index) in cats">
      <td><img v-bind:src="cat.photo" width="40px" height="40px" alt=""></td>
      <td><router-link :to="{path:'/cat/' + index}" >{{ cat.name }}</router-link></td>
      <td>{{ cat.gender }}</td>
      <td></td>
      <td>{{ cat.created }}</td>
    </tr>
    </tbody>
  </table>
</div>

</template>

<script>
  import axios from 'axios';
  import cats from './Cat';

  export default {
    components:{
      'app-cats': cats
    },
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
              console.log(response);
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

<style scoped>
  .catlist-table {
    padding: 3rem 1.5rem;
    text-align: left;
  }
</style>
