<template>
  <form @submit.prevent="onSubmitted">
    <div class="pet-record">Create New Pet</div>
    <div id="pet-content" class="row form-group">
      <div class="col-2"></div>
      <div class="col-sm-4 align-center">

        <div id="catID">
          <div class="pet-image-box">
            <img src="" width="200px" height="200px" alt="" class="pet-image">
          </div>
        </div>
        <!--TODO: v-if goes here-->
        <div class="pet-add-photo">click to add photo</div>
        <!--TODO: v-else goes here-->
        <!--<div class="pet-name">{{path-to-photo}}</div>-->
        <!--TODO: end if/else here-->
      </div>
      <div class="col-sm-5">

          <div class="form-group row">
            <label for="InputName" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="InputName" placeholder="name">
            </div>
          </div>


          <div class="form-group row">
            <label for="InputName" class="col-sm-2 col-form-label">Gender</label>
            <div class="col-sm-10">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                <label class="form-check-label" for="inlineRadio1">Male</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                <label class="form-check-label" for="inlineRadio2">Female</label>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label for="InputWeight" class="col-sm-2 col-form-label">Weight</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="InputWeight" placeholder="weight">
            </div>
          </div>
          <div class="form-group row">
            <label for="InputAge" class="col-sm-2 col-form-label">Age</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="InputAge" placeholder="Age">
            </div>
          </div>
          <div class="clear-fix"></div>
          <button type="submit" class="btn btn-primary submit-button">Submit</button>

      </div>
      <div class="col-1"></div>
    </div>
  </form>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        petContent: ''
      }
    },
    methods: {
      onSubmitted() {
        axios.post('http://localhost:8000/api/v1/cats/',{content: this.petContent})
          .then(
            (response) => console.log(response)
          )
          .catch(
            (error) => console.log(error)
          );
      }
    }
  }
</script>

<style scoped>

  /*label{*/
    /*height: 55px;*/
    /*color: #373A3C;*/
    /*font-family: "Helvetica Neue";*/
    /*font-size: 20px;*/
    /*line-height: 24px;*/
    /*margin-right: 1.7rem;*/
    /*margin-bottom: 1.5rem;*/
    /*padding-top: 6px;*/
  /*}*/


  /*input {*/
    /*height: 38px;*/
    /*border: 1px solid #CCCCCC;*/
    /*border-radius: 4px;*/
    /*background-color: #FFFFFF;*/
  /*}*/

  #pet-content{
    padding-top: 35px;
  }
  /*pet image area*/
  .pet-add-photo {
    height: 88px;
    color: #9B9B9B;
    font-family: "Helvetica Neue";
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
    text-align: center;
    margin-top: 20px;
  }
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
    color: #000000;
    font-family: "Helvetica Neue";
    font-size: 48px;
    font-weight: bold;
    line-height: 58px;
    text-align: center;
    margin-bottom: 25px;
    padding-top: 35px;
  }
  .pet-image-box {
    box-sizing: border-box;
    height: 182px;
    width: 182px;
    border: 1px solid #DDDDDD;
    border-radius: 5px;
    margin:auto;
  }
  .pet-image {

    height: 172px;
    width: 172px;
    border-radius: 1px;
    background-color: #EEEEEE;
    margin-top: .25rem;
    margin-left: .25rem;
  }
  .submit-button {
    height: 38px;
    width: 140px;
    border: 1px solid #0275D8;
    border-radius: 4px;
    background-color: #0275D8;
    float: left;
    margin-top: 1em;
  }
</style>
