<template>
  <div class="meds-table">
    <div class="heading-row">
      <div class="page-heading float-sm-left">Medications for: <span>{{$route.params.catName}}</span></div>

      <div class="float-sm-right" v-if="thisCat[0]">
        <div class="grey">last updated</div>
        <!--TODO: format date / time for last time updated-->
        <div id="lastup-date">Date:<span>{{thisCat[0].modified | moment("MM-DD-YYYY")}}</span></div>
        <div id="lastup-time">Time:<span>{{thisCat[0].modified | moment("HH:MM a")}}</span></div>
      </div>
    </div>

    <transition name="fade1" appear="">
      <div class="divTable">
        <div class="divTableHeading">
          <div class="divTableRow">
            <div class="col-sm-1 divTableHead">#</div>
            <div class="col-sm-2 divTableHead">Medication</div>
            <div class="col-sm-2 divTableHead">Duration</div>
            <div class="col-sm-2 divTableHead">Frequency</div>
            <div class="col-sm-2 divTableHead">Dosage</div>
            <div class="col-sm-2 divTableHead">Notes</div>
          </div>
        </div>
        <transition-group tag="div" name="fade2" class="divTableBody" appear="">
          <div class="divTableRow fadecontent" v-for="med in thisCat" :key="med.id">
            <div class="divTableCell">{{ med.id }}</div>
            <div class="divTableCell">{{ med.name }}</div>
            <div class="divTableCell">{{ med.duration }}</div>
            <div class="divTableCell">{{ med.frequency }}</div>
            <div class="divTableCell">{{ med.dosage }}</div>
            <div class="divTableCell">{{ med.notes }}</div>
          </div>
        </transition-group>
        <div class="divTableRow">
          <div class="col-sm-1 divTableHead"></div>
          <div class="col-sm-2 divTableHead"></div>
          <div class="col-sm-2 divTableHead"></div>
          <div class="col-sm-2 divTableHead"></div>
          <div class="col-sm-2 divTableHead"></div>
          <div class="col-sm-2 divTableHead">
            <router-link :to="'/cat/'+$route.params.catID+'/medication/create/'+$route.params.catName" class="btn btn-primary btn-text float-right">
              <a role="button">Add A Medication</a>
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
    name: 'MedList',
    data() {
      return {
        thisCat: [],
      }
    },
    subscriptions() {
      const cat$ = Observable.from(axios.get(`${process.env.KITTY_URL}/api/v1/medications/?cat__slug=&cat__name=${this.$route.params.catName}`)
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
