<template>
  <div class="meds-table">
    <div class="heading-row">
      <div class="page-heading float-sm-left">Feedings: <span>{{$route.params.catName}}</span></div>

      <div class="float-sm-right">
        <div class="grey">last updated</div>
        <!--TODO: format date / time for last time updated-->
        <div id="lastup-date">Date:<span>MM:DD:YY</span></div>
        <div id="lastup-time">Time:<span>HH:MM</span></div>
      </div>
    </div>

    <transition name="fade1" appear="">
      <div class="divTable">
        <div class="divTableHeading">
          <div class="divTableRow">
            <div class="col-sm-1 divTableHead">Cat</div>
            <div class="col-sm-2 divTableHead">WBF</div>
            <div class="col-sm-2 divTableHead">WAF</div>
            <div class="col-sm-2 divTableHead">Stimulated?</div>
            <div class="col-sm-2 divTableHead">Stim_type</div>
            <!--<div class="col-sm-2 divTableHead">Photo</div>-->
          </div>
        </div>
        <transition-group tag="div" name="fade2" class="divTableBody" appear="" v-if="thisCat">
          <div class="divTableRow fadecontent"  v-for="(fed) in thisCat" :key="fed.id">
            <div class="divTableCell">{{ fed.cat.name }}</div>
            <div class="divTableCell">{{ fed.weight_before_food }}</div>
            <div class="divTableCell">{{ fed.weight_after_food }}</div>
            <div class="divTableCell">{{ fed.stimulated }}</div>
            <div class="divTableCell">{{ fed.stimulation_type }}</div>
          </div>
        </transition-group>
        <div class="divTableRow">
          <div class="col-sm-1 divTableHead"></div>
          <div class="col-sm-2 divTableHead"></div>
          <div class="col-sm-2 divTableHead"></div>
          <div class="col-sm-2 divTableHead"></div>
          <div class="col-sm-2 divTableHead">
            <router-link :to="'/cat/'+$route.params.catID+'/feeding/create/'+$route.params.catName" class="btn btn-primary btn-text float-right">
              <a role="button">Add A Feeding</a>
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
  import axios from 'axios';
  import { Observable } from 'rxjs';

  export default {
    name: 'FeedingsList',
    data() {
      return {
        thisCat: [],
      }
    },
    subscriptions() {
      const cat$ = Observable.from(axios.get(`${process.env.KITTY_URL}/api/v1/feedings/?cat__slug&cat__name=${this.$route.params.catName}`)
        .catch(error => console.log(error)))
        .pluck("data","results");
      return{thisCat: cat$}
    }
  }

</script>

<style scoped>
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
  #thead th {
    color: black;
  }
  .grey{
    color: grey;
  }
  .heading-row{
    padding-bottom: 7rem;
  }
  .page-heading {
    color: white;
    font-family: "Helvetica Neue";
    font-size: 48px;
    font-weight: bold;
    line-height: 58px;
    margin-bottom: 25px;
  }
  .page-heading > span{
    color: darkgrey;
  }
  .meds-table {
    padding: 3rem 1.5rem;
    text-align: left;
  }
  #lastup-date{

  }
  #lastup-time{

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
