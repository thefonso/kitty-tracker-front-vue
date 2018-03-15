<template>
  <form @submit.prevent="onSubmitted">
    <div class="pet-record">Create New Pet</div>
    <div id="pet-content" class="row form-group">
      <div class="col-2"></div>
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
      <div class="col-sm-5">
        <div class="spacer"></div>
        <div id="catLinks" class="panel-body">
          <div class="float-left label-block"><label for="InputName">Name</label></div>
          <div class="float-left"><input type="text" class="form-control float-left" id="InputName" aria-describedby="name" placeholder="Enter name" v-model="petContent"></div>
          <div class="clearfix"></div>
          <div class="float-left"><label for="InputContent">Gender</label></div>
          <div class="float-left"><input type="text" id="InputContent" class="form-control" v-model="petContent"></div>
          <div class="clearfix"></div>
          <div class="float-left"><label for="InputWeight">Weight</label></div>
          <div class="float-left"><input type="text" class="form-control" id="InputWeight" aria-describedby="weight" placeholder="Enter weight" v-model="petContent"></div>
          <div class="clearfix"></div>
          <div class="float-left"><label for="InputAge" class="">Age</label></div>
          <div class="float-left"><input type="text" class="form-control" id="InputAge" aria-describedby="age" placeholder="Enter age" v-model="petContent"></div>
          <div class="clearfix"></div>
          <button class="bg btn btn-primary" type="submit">Submit</button>
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
    height: 25px;
    width: 53px;
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
    width: 350px;
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
    height: 266px;
    width: 266px;
    border: 1px solid #DDDDDD;
    border-radius: 5px;
    margin:auto;
  }
  .pet-image {

    height: 251px;
    width: 251px;
    border-radius: 1px;
    background-color: #EEEEEE;
    margin-top: .25rem;
    margin-left: .25rem;
  }
  .bg {
    height: 38px;
    width: 140px;
    border: 1px solid #0275D8;
    border-radius: 4px;
    background-color: #0275D8;
    float: left;
    margin-left: 5rem;
  }
</style>
