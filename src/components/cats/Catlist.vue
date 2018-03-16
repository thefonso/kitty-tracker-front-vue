<template>

<div class="catlist-table">
  <div class="page-heading">List of Pets Created</div>
  <table class="table">
    <thead class="thead-light">
    <tr>
      <th scope="col" class="col-sm-1"></th>
      <th scope="col" class="col-sm-2">Name</th>
      <th scope="col" class="col-sm-2">gender</th>
      <th scope="col" class="col-sm-5"></th>
      <th scope="col" class="col-sm-2">Date Added</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(cat) in cats">
      <td><img v-bind:src="cat.photo" width="40px" height="40px" alt=""></td>
      <td><router-link :to="{path:'/cat/' + cat.id}" >{{ cat.name }}</router-link></td>
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
  // import cats from './Cat';

  export default {
    // components:{
    //   'app-cats': cats
    // },
    name: 'Catlist',
    data() {
      return {
        cats: []
      }
    },
    methods: {
      onGetCats() {
        axios.get(`http://localhost:8000/api/v1/cats/`)
          .then(
            request => {
              console.log(request);
              this.cats = request.data.results;
            })
          .catch(error => console.log(error));
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
  .page-heading {
    color: #000000;
    font-family: "Helvetica Neue";
    font-size: 48px;
    font-weight: bold;
    line-height: 58px;
    text-align: center;
    margin-bottom: 25px;
  }
</style>
