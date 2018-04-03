<template>
  <div id="cat-list-table">
    <div class="page-heading">List of Pets</div>
    <transition name="fade1" appear="">
      <div class="divTable">
        <div class="divTableHeading">
          <div class="divTableRow">
            <div class="divTableHead">&nbsp;</div>
            <div class="divTableHead">Name</div>
            <div class="divTableHead">gender</div>
            <div class="divTableHead">&nbsp;</div>
            <div class="divTableHead">Date Added</div>
          </div>
        </div>
        <div class="divTableBody">
          <template v-for="(cat) in cats">
            <transition name="fade2" appear="">
              <div class="divTableRow">
                <div class="divTableCell image"><img v-bind:src="cat.photo" width="40px" height="40px" alt=""></div>
                <div class="divTableCell"><router-link :to="{path:'/cat/' + cat.id}" >{{ cat.name }}</router-link></div>
                <div class="divTableCell">{{ cat.gender }}</div>
                <div class="divTableCell"></div>
                <div class="divTableCell">{{ cat.created }}</div>
              </div>
            </transition>
          </template>
        </div>
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
        // visible: false,
        CatIndex: 0,
      }
    },
    methods: {
    },
    mounted(){
      // this.visible = true;
      // const interval = setInterval(() => {
      //   if (this.CatIndex + 1 < this.cats.length) this.CatIndex++;
      //   else clearInterval(interval);
      // }, 2000);
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
  .fadecontent{
    opacity: 1;
  }
  .fade1, .fade2 {
    backface-visibility: hidden;
    z-index: 1;
  }
  .fade1-enter, .fade1-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .fade1-enter-active, .fade1-leave-active{
    transition: opacity 1s;
  }
  .fade2-enter-active, .fade2-leave-active{
    transition: opacity 2s;
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
    display: table-row;
  }
  .divTableHeading {
    background-color: #EEE;
    display: table-header-group;
  }
  .divTableCell, .divTableHead {
    /*border-bottom: 1px solid lightgray;*/
    display: table-cell;
    /*padding: 3px 10px;*/
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
