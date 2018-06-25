<template>
  <div id="cat-list-table">
    <div class="page-heading">List of Pets</div>
    <transition name="fade1" appear="">
      <div class="divTable">
        <div class="divTableHeading">
          <div class="divTableRow">
            <div class="divTableHead col-sm-1">&nbsp</div>
            <div class="divTableHead col-sm-1">Name</div>
            <div class="divTableHead col-sm-2">Gender</div>
            <div class="divTableHead col-sm-2">age</div>
            <div class="divTableHead col-sm-1">Type</div>
            <div class="divTableHead col-sm-4">Date Added</div>
          </div>
        </div>
        <transition-group tag="div" name="fade2" class="divTableBody" appear="">
          <div class="divTableRow fadecontent" v-for="cat in cats" :key="cat.id">
            <div class="divTableCell image col-sm-1"><img v-bind:src="cat.photo" width="40px" height="40px" alt=""></div>
            <div class="divTableCell col-sm-1"><router-link :to="{path:'/cat/' + cat.id}" >{{ cat.name }}</router-link></div>
            <div class="divTableCell col-sm-2">{{ cat.gender }}</div>
            <div class="divTableCell col-sm-2">{{ cat.age }}</div>
            <div class="divTableCell col-sm-1">{{cat.cat_type}}</div>
            <div class="divTableCell col-sm-4">{{ cat.created | moment("MM-DD-YYYY h:MM a")}}</div>
          </div>
        </transition-group>
      </div>
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
        page: 1,
        CatIndex: 0,
      }
    },
    mounted(){},
    subscriptions() {
      const cats$ = Observable.from(axios.get(`${process.env.KITTY_URL}/api/v1/cats/`)
        .catch(error => console.log(error)))
        .pluck("data","results");
      return{cats: cats$}
    },
  }
</script>

<style scoped>

  .page-heading {
    color: white;
    font-family: "Helvetica Neue";
    font-size: 48px;
    font-weight: bold;
    line-height: 58px;
    text-align: center;
    margin-bottom: 25px;
  }

  .fadecontent{
    opacity: 1;
  }
  .fade1-enter,.fade2-enter,.fade3-enter{
    transform: translateX(20px);
    opacity: 0;
  }
  .fade1-enter-active{
    transition: all 1s ease;
  }
  .fade2-enter-active{
    transition: all 1s ease 0.5s;
  }
  .fade3-enter-active{
    transition: all 1s ease 1s;
  }

  .fade1-leave-active,.fade2-leave-active,.fade3-leave-active{
    opacity: 0;
    transform: translateX(20px);
  }
  .fade1-leave-active{
    transition: all 1s ease;
  }
  .fade2-leave-active{
    transition: all 1s ease 1s;
  }
  .fade3-leave-active{
    transition: all 1s ease 2s;
  }

  #cat-list-table {
    padding: 3rem 1.5rem;
    text-align: left;
  }
  /* Div Table */
  .divTable{
    display: table;
    width: 100%;
  }
  .divTableRow {
    /*display: table-row;*/
    border-top: 1px solid #dee2e6;
  }
  .divTableHeading {
    background-color: #EEE;
    display: table-header-group;
  }
  .divTableCell, .divTableHead {
    display: inline-block;
    padding: 0.75rem;
    vertical-align: top;

  }
  .divTableCell img{
    display: block;
    margin: auto;
  }
  .divTableHeading {
    background-color: #EEE;
    display: table-header-group;
    font-weight: bold;
  }
  .divTableFoot {
    background-color: #EEE;
    display: table-footer-group;
    font-weight: bold;
  }
  .divTableBody {
    display: table-row-group;
  }
</style>
