<template>
  <transition name="fade">
    <div id="pet-content" class="row">
      <div class="col-2"></div>
      <div class="col-sm-4 align-center">
        <div class="pet-record">Pet Record</div>
        <div id="catID" class="panel-body" :singleCat="singleCat" v-if="singleCat">
          <div class="pet-image-box"><img v-bind:src="singleCat.photo" width="200px" height="200px" alt="" class="pet-image"></div>
        </div>
        <div class="pet-name">{{singleCat.name}}</div>
      </div>
      <div class="col-sm-2 align-left">
        <div class="spacer"></div>
        <div id="catLinks" class="panel-body" :singleCat="singleCat" v-if="singleCat">
          <router-link :to="'/cat/'+singleCat.id+'/feedings/all/'+singleCat.name" class="feeding rectangle-28 btn btn-primary btn-text">
            <a role="button">Feeding</a>
          </router-link>
          <router-link :to="'/cat/'+singleCat.id+'/medications/all/'+singleCat.name" class="medication rectangle-28 btn btn-warning btn-text">
            <a role="button">Medication</a>
          </router-link>
          <router-link :to="'/cat/'+singleCat.id+'/medical_records/all/'+singleCat.name" class="med-records rectangle-28 btn btn-info btn-text">
            <a role="button">Medical Records</a>
          </router-link>
          <router-link :to="'/catlist'" class="all-pets rectangle-28 btn btn-success btn-text">
            <a role="button">All Pets</a>
          </router-link>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </transition>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Cat',
    data() {
      return {
        visible: false,
        singleCat: [],
      }
    },
    mounted(){
      this.visible = true;
    },
    created() {
      axios.get(`http://pure-sea-38216.herokuapp.com/api/v1/cats/${this.$route.params.catID}`)
        .then(request => {
          console.log(request.data);
          this.singleCat = request.data;
        })
        .catch(error => console.log(error));
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
    cursor: pointer;
  }

  #pet-content{
    padding-top: 35px;
  }

  /*pet image area*/
  .pet-name {
    height: 88px;
    color: #9B9B9B;
    font-family: "Helvetica Neue";
    font-size: 36px;
    font-weight: bold;
    line-height: 44px;
    text-align: center;
    margin-top: 20px;
  }
  .pet-record {
    color: lightskyblue;
    font-family: "Helvetica Neue";
    font-size: 48px;
    font-weight: bold;
    line-height: 58px;
    text-align: center;
    margin-bottom: 25px;
  }
  .pet-image-box {
    box-sizing: border-box;
    height: 266px;
    width: 266px;
    border: 1px solid #DDDDDD;
    border-radius: 5px;
    margin:auto;
  }
  .pet-image {
    margin-top: 7px;
    height: 251px;
    width: 251px;
    border-radius: 1px;
    background-color: #EEEEEE;
  }



  /*records buttons*/
  #catlinks{

  }
  .spacer{
    height: 64px;
  }
  .feeding {
    height: 64px;
    width: 165px;
  }
  .medication {
    height: 64px;
    width: 213px;
  }
  .med-records {
    height: 64px;
    width: 303px;
  }
  .all-pets {
    height: 64px;
    width: 165px;
  }
  .rectangle-28 {
    box-sizing: border-box;
    /*height: 66px;*/
    /*width: 167px;*/
    margin-top: 20px;
    border: 1px solid #357EBD;
    border-radius: 5px;
  }
  .btn-text {
    /*height: 43px;*/
    /*width: 165px;*/
    color: #FFFFFF;
    font-family: "Helvetica Neue";
    font-size: 36px;
    line-height: 43px;
    text-align: center;
  }
  .align-left{
    text-align: left;
  }
  .align-center{
    text-align: center;
  }
</style>
