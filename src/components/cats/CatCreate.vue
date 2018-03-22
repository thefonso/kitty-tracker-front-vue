<template>
  <!--TODO - v-validate package for vuejs-->
  <form @submit.prevent="onSubmitted" class="needs-validation" novalidate>

    <div class="row alert alert-success" v-if="showSuccess">
      <strong>Success!</strong> New kitty added.
    </div>
    <div class="row alert alert-danger" v-if="showDanger">
      <strong>Problem:</strong> Did you fill out all fields? Are you on the internet?
    </div>

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
              <input type="text" class="form-control" id="InputName" placeholder="name" v-model="name">
              <small id="nameHelp" class="form-text text-muted">required field</small>
            </div>

          </div>

          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Gender</label>
            <div class="col-sm-10">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="InputGender1" value="M" v-model="gender">
                <label class="form-check-label" for="InputGender1">Male</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="InputGender2" value="F" v-model="gender">
                <label class="form-check-label" for="InputGender2">Female</label>
              </div>
            </div>
            <small id="genderHelp" class="form-text text-muted">required field</small>
          </div>

          <div class="form-group row">
            <label for="InputWeight" class="col-sm-2 col-form-label">Weight</label>
            <div class="col-sm-10">
              <input type="number" class="form-control" id="InputWeight" placeholder="weight" v-model.number="weight">
              <small id="weightHelp" class="form-text text-muted">required field</small>
            </div>
          </div>
          <div class="form-group row">
            <label for="InputAge" class="col-sm-2 col-form-label">Age</label>
            <div class="col-sm-10">
              <input type="number" class="form-control" id="InputAge" placeholder="Age" v-model.number="age">
              <small id="ageHelp" class="form-text text-muted">required field</small>
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
      name:   '',
      gender: '',
      weight: '',
      age:    '',
      showSuccess: false,
      showDanger: false,
    }
  },
  methods: {
    onSubmitted() {
      axios.post('http://localhost:8000/api/v1/cats/',{ name: this.name, gender: this.gender, weight: this.weight, age: this.age })
        .then(response => {
          //remove .invisible from .alert-success
            console.log(response);
            response.status === 200 ? this.showSuccess = true : this.showDanger = false
        })
        .catch(error => {
            console.log(error);
            this.showDanger = true
        })
    }
  }
}
</script>

<style scoped>

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
