<template>
  <div class="meds-table">
    <div class="heading-row">
      <div class="page-heading float-sm-left">Medical Records of: <span>{{$route.params.catName}}</span></div>

      <div class="float-sm-right">
        <div class="grey">last updated</div>
        <!--TODO: format date / time for last time updated-->
        <div id="lastup-date">Date:<span>MM:DD:YY</span></div>
        <div id="lastup-time">Time:<span>HH:MM</span></div>
      </div>
    </div>

    <table class="table">
      <thead class="thead-light">
      <tr>
        <th scope="col" class="col-sm-1">cat</th>
        <th scope="col" class="col-sm-2">care</th>
        <th scope="col" class="col-sm-2">date</th>
        <th scope="col" class="col-sm-2">vet practice</th>
        <th scope="col" class="col-sm-2">doctor name</th>
        <th scope="col" class="col-sm-2">follow up date</th>
        <th scope="col" class="col-sm-2">notes</th>
      </tr>
      </thead>
      <tbody v-if="thisCat">
      <tr v-for="(med) in thisCat">
        <td>{{ med.cat.name }}</td>
        <td>{{ med.care_given }}</td>
        <td>{{ med.date }}</td>
        <td>{{ med.vet_practice }}</td>
        <td>{{ med.doc_name }}</td>
        <td>{{ med.follow_up_date }}</td>
        <td>{{ med.notes }}</td>
      </tr>
      </tbody>
    </table>
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
      const cat$ = Observable.from(axios.get(`http://localhost:8000/api/v1/medicalrecords/?cat__slug=&cat__name=${this.$route.params.catName}`)
        .catch(error => console.log(error)))
        .pluck("data","results");
      return{thisCat: cat$}
    }
  }

</script>

<style scoped>
  .grey{
    color: grey;
  }
  .heading-row{
    padding-bottom: 7rem;
  }
  .page-heading {
    color: #000000;
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
