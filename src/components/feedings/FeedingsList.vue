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

    <table class="table">
      <thead class="thead-light">
      <tr>
        <th scope="col" class="col-sm-1">Cat</th>
        <th scope="col" class="col-sm-2">WBF</th>
        <th scope="col" class="col-sm-2">WAF</th>
        <th scope="col" class="col-sm-2">Stimulated?</th>
        <th scope="col" class="col-sm-2">Stim_type</th>
        <!--<th scope="col" class="col-sm-2">Photo</th>-->
      </tr>
      </thead>
      <tbody v-if="thisCat">
      <tr v-for="(fed) in thisCat">
        <td>{{ fed.cat.name }}</td>
        <td>{{ fed.weight_before_food }}</td>
        <td>{{ fed.weight_after_food }}</td>
        <td>{{ fed.stimulated }}</td>
        <td>{{ fed.stimulation_type }}</td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
  import axios from 'axios';

  export default {
    name: 'FeedingsList',
    data() {
      return {
        thisCat: [],
      }
    },
    created() {
      // this.$route.params.catID
      // TODO: insert cat:name value from params
      // TODO: upcase first letter in 'babby' from param line above
      axios.get(`http://localhost:8000/api/v1/feedings/?cat:name=${this.$route.params.catName}`)
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
