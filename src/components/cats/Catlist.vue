<template>

  <div id="cat-list-table">
    <div class="page-heading" >List of Pets</div>

    <transition name="fade">
      <table class="table" v-if="visible">
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
        <template v-for="(cat, index) in cats">
          <tr :key="index" v-if="index <= CatIndex">
            <td><img v-bind:src="cat.photo" width="40px" height="40px" alt=""></td>
            <td><router-link :to="{path:'/cat/' + cat.id}" >{{ cat.name }}</router-link></td>
            <td>{{ cat.gender }}</td>
            <td></td>
            <td>{{ cat.created }}</td>
          </tr>
        </template>
        </tbody>
      </table>
    </transition>
  </div>

</template>

<script>
  import axios from 'axios';
  import { Observable } from 'rxjs';

  export default {
    name: 'CatList',
    data() {
      return {
        cats: [],
        visible: false,
        CatIndex: 0,
      }
    },
    methods: {
    },
    mounted(){
      this.visible = true;
      setInterval(() => {
        if (this.CatIndex + 1 < this.cats.length) this.CatIndex++;
        else this.CatIndex = 0;
      }, 1000);
    },
    subscriptions() {
      const cats$ = Observable.from(axios.get(`http://localhost:8000/api/v1/cats/`)
        .catch(error => console.log(error)))
        .pluck("data","results");
      return{cats: cats$}
    },

  }
</script>

<style scoped>
  .page-heading {
    color: #000000;
    font-family: "Helvetica Neue";
    font-size: 48px;
    font-weight: bold;
    line-height: 58px;
    text-align: center;
    margin-bottom: 25px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  #cat-list-table {
    padding: 3rem 1.5rem;
    text-align: left;
  }
  .list-enter-active, .list-leave-active {
    transition: opacity 2s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    /*transform: translateY(-10px);*/
  }

</style>
