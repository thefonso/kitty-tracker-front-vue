<template>
  <div class="meds-table">
    <div class="heading-row">
      <div class="page-heading float-sm-left">Medication: <span>{{thisCat[0].cat.name}}</span></div>

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
        <th scope="col" class="col-sm-1">#</th>
        <th scope="col" class="col-sm-2">Medication</th>
        <th scope="col" class="col-sm-2">Duration</th>
        <th scope="col" class="col-sm-2">Frequency</th>
        <th scope="col" class="col-sm-2">Dosage</th>
      </tr>
      </thead>
      <tbody v-if="thisCat">
      <!--TODO: v-for meds in cat.meds goes here-->
      <tr v-for="(med) in thisCat">
        <td>{{ med.id }}</td>
        <!--TODO: change -name- to -medication- -->
        <td>{{ med.name }}</td>
        <td>{{ med.duration }}</td>
        <td>{{ med.frequency }}</td>
        <td>{{ med.dosage }}</td>
        <!--<td> cat.id </td>-->
        <!--<td> cat.med.medication </td>-->
        <!--<td> cat.med.duration </td>-->
        <!--<td> cat.med.freq </td>-->
        <!--<td> cat.med.dosage </td>-->
      </tr>
      <tr>
        <!--<td> cat.id </td>-->
        <!--<td> cat.med.medication </td>-->
        <!--<td> cat.med.duration </td>-->
        <!--<td> cat.med.freq </td>-->
        <!--<td> cat.med.dosage </td>-->
      </tr>

      </tbody>
    </table>
  </div>

</template>

<script>
  import axios from 'axios';

  export default {
    name: 'MedList',
    data() {
      return {
        thisCat: [],
      }
    },
    created() {
      // this.$route.params.catID
      // TODO: upcase first letter in 'babby' from param line above
      axios.get(`http://localhost:8000/api/v1/medications/?cat__slug=&cat__name=Babby`)
        .then(request => {
          console.log(request.data.results);
          this.thisCat = request.data.results;
        })
        .catch(error => console.log(error));
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
