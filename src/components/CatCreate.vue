<template>
  <form @submit.prevent="onSubmitted">
    <div class="pet-record">Create New Pet</div>
    <div id="pet-content" class="row form-group">
      <div class="col-1"></div>
      <div class="col-sm-4 align-center">

        <div id="catID" class="panel-body">
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
      <div class="col-1"></div>
      <div class="col-sm-5">
        <div class="spacer"></div>
        <div id="catLinks" class="panel-body">
          <div class="float-left col-2"><label class="col-form-label" for="InputName">Name</label></div>
          <div class="float-left col-auto"><input type="text" class="col-auto" id="InputName" aria-describedby="name" placeholder="Enter name" v-model="petContent"></div>
          <div class="clearfix"></div>
          <div class="float-left col-2"><label class="col-form-label" for="InputGender">Gender</label></div>
          <div class="float-left col-auto" id="InputGender">
            <label class="checkbox-inline"><input type="checkbox" value="">Female</label>
            <label class="checkbox-inline"><input type="checkbox" value="">Male</label>
          </div>
          <div class="clearfix"></div>
          <div class="float-left col-2"><label class="col-form-label" for="InputWeight">Weight</label></div>
          <div class="float-left col-auto"><input type="text" class="col-auto" id="InputWeight" aria-describedby="weight" placeholder="Enter weight" v-model="petContent"></div>
          <div class="clearfix"></div>
          <div class="float-left col-2"><label class="col-form-label" for="InputAge">Age</label></div>
          <div class="float-left col-auto"><input type="text" class="col-auto" id="InputAge" aria-describedby="age" placeholder="Enter age" v-model="petContent"></div>
          <div class="clearfix"></div>
          <button class="submit-button btn btn-primary" type="submit">Submit</button>
        </div>
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

  label{
    height: 55px;
    color: #373A3C;
    font-family: "Helvetica Neue";
    font-size: 20px;
    line-height: 24px;
    margin-right: 1.7rem;
    margin-bottom: 1.5rem;
    padding-top: 6px;
  }


  input {
    height: 38px;
    border: 1px solid #CCCCCC;
    border-radius: 4px;
    background-color: #FFFFFF;
  }

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
