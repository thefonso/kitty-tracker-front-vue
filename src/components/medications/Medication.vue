<!--TODO this page displays the same as MedicalList.vue...idealy it will do so with more animation once completed if needed-->
<template>
  <div class="meds-table">
    <div class="heading-row">
      <div class="page-heading float-sm-left">Medications for: <span>{{$route.params.catName}}</span></div>
      <div class="float-sm-right">
        <div>last updated</div>
        <!--TODO: format date / time for last time updated-->
        <div id="lastup-date">Date:<span>MM:DD:YY</span></div>
        <div id="lastup-time">Time:<span>HH:MM</span></div>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-sm-5">
        <select id="InputMedication" class="form-control">
          <option selected>Select One...</option>
          <option>one</option>
          <option>two</option>
          <option>three</option>
        </select>
      </div>
      <div class="col-sm-1"></div>
      <div class="col-sm-5 panel-body">
        <button type="button" class="btn btn-block btn-success"><span class="name">Duration</span> <span class="amount">Day X of 30</span></button>
        <button type="button" class="btn btn-block btn-info"><span class="name">Frequency</span> <span class="amount">2x per day</span></button>
        <button type="button" class="btn btn-block btn-warning"><span class="name">Dosage</span> <span class="amount">1ML mixed in food</span></button>
      </div>
      <div class="col-sm-1"></div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';

  export default {
    name: 'Medications',
    data() {
      return {
        singleCat: [],
      }
    },
    created() {
      axios.get(`http://localhost:8000/api/v1/medications/?cat__slug=&cat__name=${this.$route.params.catName}`)
        .then(request => {
          console.log(request.data);
          this.singleCat = request.data;
        })
        .catch(error => console.log(error));
    }
  }

</script>
<style scoped>
  .btn{
    margin-bottom: 2em;
  }
  .btn .name{
    float: left;
    height: 28.67px;
    width: 108px;
    color: #FFFFFF;
    font-family: "Helvetica Neue";
    font-size: 24px;
    line-height: 29px;
    text-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
  }
  .btn .amount{
    float: right;
    height: 24px;
    width: 108px;
    color: #FFFFFF;
    font-family: "Helvetica Neue";
    font-size: 20px;
    font-weight: bold;
    line-height: 25px;
    /*text-align: right;*/
  }
  .btn-success{
    background-color: #5CB85C;
  }
  .btn-info{
    background-color: #5BC0DE;
  }
  .btn-warning{
    background-color: #F0AD4E;
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
