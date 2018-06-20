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
            <div class="divTableHead col-sm-1">#</div>
            <div class="divTableHead col-sm-2">Medication</div>
            <div class="divTableHead col-sm-2">Duration</div>
            <div class="divTableHead col-sm-2">Frequency</div>
            <div class="divTableHead col-sm-2">Dosage</div>
            <div class="divTableHead col-sm-2">Notes</div>
          </div>
        </div>
        <transition-group tag="div" name="fade2" class="divTableBody" appear="">
          <div class="divTableRow fadecontent" v-for="med in thisCat" :key="med.id">
            <div class="divTableCell col-sm-1">{{ med.id }}</div>
            <div class="divTableCell col-sm-2">{{ med.name }}</div>
            <div class="divTableCell col-sm-2">{{ med.duration }}</div>
            <div class="divTableCell col-sm-2">{{ med.frequency }}</div>
            <div class="divTableCell col-sm-2">{{ med.dosage }}</div>
            <div class="divTableCell col-sm-2">{{ med.notes }}</div>
          </div>
        </transition-group>
        <div class="divTableRow">
          <div class="divTableHead col-sm-1"></div>
          <div class="divTableHead col-sm-2"></div>
          <div class="divTableHead col-sm-2"></div>
          <div class="divTableHead col-sm-2"></div>
          <div class="divTableHead col-sm-2"></div>
          <div class="divTableHead col-sm-2">
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

  /* Div Table */
  .divTable{
    display: table;
    width: 100%;
  }
  .divTableRow {
    display: table-row;
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
