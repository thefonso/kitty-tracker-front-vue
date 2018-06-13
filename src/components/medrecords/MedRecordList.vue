<template>
  <div class="meds-table">
    <div class="heading-row">
      <div class="page-heading float-sm-left">Medical Records of: <span>{{$route.params.catName}}</span></div>

      <div class="float-sm-right" v-if="thisCat[0].cat">
        <div class="grey">last updated</div>
        <div id="lastup-date">Date: <span>{{thisCat[0].cat.modified | moment("MM-DD-YYYY")}}</span></div>
        <div id="lastup-time">Time: <span>{{thisCat[0].cat.modified | moment("HH:MM a")}}</span></div>
      </div>
    </div>

    <transition name="fade1" appear="">
      <div class="divTable">
        <div class="divTableHeading">
          <div class="divTableRow">
            <div class="col-sm-1 divTableHead">cat</div>
            <div class="col-sm-2 divTableHead">care</div>
            <div class="col-sm-2 divTableHead">date</div>
            <div class="col-sm-2 divTableHead">vet practice</div>
            <div class="col-sm-2 divTableHead">doctor name</div>
            <div class="col-sm-2 divTableHead">follow up date</div>
            <div class="col-sm-2 divTableHead">notes</div>
          </div>
        </div>
        <transition-group tag="div" name="fade2" class="divTableBody" appear="" v-if="thisCat">
          <div class="divTableRow fadecontent" v-for="(med) in thisCat" :key="med.id">
            <div class="divTableCell">{{ med.cat.name }}</div>
            <div class="divTableCell">{{ med.care_given }}</div>
            <div class="divTableCell">{{ med.date | moment("MM-DD-YYYY h:MM a")}}</div>
            <div class="divTableCell">{{ med.vet_practice }}</div>
            <div class="divTableCell">{{ med.doc_name }}</div>
            <div class="divTableCell">{{ med.follow_up_date }}</div>
            <div class="divTableCell">{{ med.notes }}</div>
          </div>
        </transition-group>
        <div class="divTableRow">
          <div class="col-sm-1 divTableHead"></div>
          <div class="col-sm-2 divTableHead"></div>
          <div class="col-sm-2 divTableHead"></div>
          <div class="col-sm-2 divTableHead"></div>
          <div class="col-sm-2 divTableHead"></div>
          <div class="col-sm-2 divTableHead"></div>
          <div class="col-sm-2 divTableHead">
            <router-link :to="'/cat/'+$route.params.catID+'/medical_records/create/'+$route.params.catName" class="btn btn-primary btn-text float-right">
              <a role="button">Add New Record</a>
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
    name: 'MedicalRecords',
    data() {
      return {
        thisCat: [],
      }
    },
    subscriptions() {
      const cat$ = Observable.from(axios.get(`${process.env.KITTY_URL}/api/v1/medicalrecords/?cat__slug=&cat__name=${this.$route.params.catName}`)
        .catch(error => console.log(error)))
        .pluck("data","results");
      console.log(cat$);
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
