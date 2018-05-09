<template>
  <div class="meds-table">
    <div class="heading-row">
      <div class="page-heading float-sm-left">Medications for: <span>{{$route.params.catName}}</span></div>

      <div class="float-sm-right">
        <div class="grey">last updated</div>
        <!--TODO: format date / time for last time updated-->
        <div id="lastup-date">Date:<span>MM:DD:YY</span></div>
        <div id="lastup-time">Time:<span>HH:MM</span></div>
      </div>
    </div>

    <table class="table">
      <thead id="thead" class="thead-light">
      <tr>
        <th scope="col" class="col-sm-1">#</th>
        <th scope="col" class="col-sm-2">Medication</th>
        <th scope="col" class="col-sm-2">Duration</th>
        <th scope="col" class="col-sm-2">Frequency</th>
        <th scope="col" class="col-sm-2">Dosage</th>
        <th scope="col" class="col-sm-2">Notes</th>
      </tr>
      </thead>
      <tbody v-if="thisCat">
      <tr v-for="(med) in thisCat">
        <td>{{ med.id }}</td>
        <td>{{ med.name }}</td>
        <td>{{ med.duration }}</td>
        <td>{{ med.frequency }}</td>
        <td>{{ med.dosage }}</td>
        <td>{{ med.notes }}</td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <router-link :to="'/cat/'+$route.params.catID+'/medication/create/'+$route.params.catName" class="btn btn-primary btn-text float-right">
            <a role="button">Add A Medication</a>
          </router-link>
        </td>
      </tr>

      </tfoot>
    </table>
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
      const cat$ = Observable.from(axios.get(`http://pure-sea-38216.herokuapp.com/api/v1/medications/?cat__slug=&cat__name=${this.$route.params.catName}`)
        .catch(error => console.log(error)))
        .pluck("data","results");
      return{thisCat: cat$}
    }
  }

</script>

<style scoped>
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

</style>
