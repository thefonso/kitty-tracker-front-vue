<template>
  <div id="cat-list-table">
    <div class="page-heading">List of Pets</div>
    <transition name="fade1" appear="">
      <div class="divTable">
        <div class="divTableHeading">
          <div class="divTableRow">
            <div class="divTableHead col-sm-1">&nbsp</div>
            <div class="divTableHead col-sm-2">Name</div>
            <div class="divTableHead col-sm-2">gender</div>
            <div class="divTableHead col-sm-2">&nbsp</div>
            <div class="divTableHead col-sm-4">Date Added</div>
          </div>
        </div>
        <transition-group tag="div" name="fade2" class="divTableBody" appear="">
          <div class="divTableRow fadecontent" v-for="cat in cats" :key="cat.id">
            <div class="divTableCell image"><img v-bind:src="cat.photo" width="40px" height="40px" alt=""></div>
            <div class="divTableCell"><router-link :to="{path:'/cat/' + cat.id}" >{{ cat.name }}</router-link></div>
            <div class="divTableCell">{{ cat.gender }}</div>
            <div class="divTableCell">&nbsp</div>
            <div class="divTableCell">{{ cat.created | moment("MM-DD-YYYY h:MM a")}}</div>
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
  }
  .divTableHeading {
    background-color: #EEE;
    display: table-header-group;
  }
  .divTableCell, .divTableHead {
    display: inline-flex;
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
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
