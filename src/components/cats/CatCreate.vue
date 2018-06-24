<template>
  <form @submit.prevent="validateBeforeSubmit">

    <div class="pet-record">Create New Pet</div>

    <div class="row">
      <div class="col-sm-2"></div>

      <b-alert class="col-sm-8" variant="success" dismissible :show="showSuccess">
        <strong>Success!</strong> New kitty added.
      </b-alert>

      <b-alert class="col-sm-8" variant="danger" dismissible :show="showDanger">
        <strong>Problem:</strong> Did you fill out all fields? Are you on the internet?
      </b-alert>

      <div class="col-sm-2"></div>
    </div>

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
            <label class="col-sm-3 col-form-label">Name</label>
            <div class="col-sm-9">
              <input name="name" v-model="name" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" placeholder="name">
              <small v-show="errors.has('name')" class="help is-danger form-text">{{ errors.first('name') }}</small>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Gender</label>
            <div class="col-sm-9">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="InputGender1" value="M" v-model="gender">
                <label class="form-check-label" for="InputGender1">Male</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="InputGender2" value="F" v-model="gender">
                <label class="form-check-label" for="InputGender2">Female</label>
                <!--TODO: if female is she a Mother?-->
                <!--TODO if Mother is YES ask...assoc. her kittens?...button appears..select button new CREATE PET appears with Mother auto-populated in "Mother field"-->
              </div>
            </div>
          </div>

        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Age</label>
          <div class="col-sm-9">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="InputAge1" value="A" v-model="age">
              <label class="form-check-label" for="InputAge1">Adult</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="InputAge2" value="K" v-model="age">
              <label class="form-check-label" for="InputAge2">Kitten</label>
            </div>
          </div>
        </div>

          <div class="form-group row">
            <label class="col-sm-3 control-label ">Cat type</label>
            <div class="col-sm-5">
              <select class="form-control" name="cat_type" v-model="cat_type">
                <option value="O">Orphan</option>
                <option value="P">Pregnant</option>
                <option value="N">Nursing</option>
              </select>
            </div>
          </div>
<!--TODO: if Pregnant / Nursing selected above next row appears for Litter-->
        <div class="form-group row">
          <label class="col-sm-3 control-label ">Litter</label>
          <div class="col-sm-5">
            <select class="form-control" v-model="litterVal" >

              <!--<option value="" selected>choose...</option>-->
              <!--<option value="none">none</option>-->
              <!--<option value="A">alpha</option>-->
              <!--<option value="B">beta</option>-->
              <!--<option value="G">gamma</option>-->

              <option v-for="item in litter" :value="item.name">{{item.name}}</option>

            </select>
          </div>
        </div>

          <div class="form-group row" id="weight_row">
            <label class="col-sm-3 col-form-label">Weight</label>
            <div class="col-sm-2">
                <input id="weight_input" name="weight" v-model="weight" v-validate="'required|integer'" class="col-sm-12" :class="{'input': true, 'is-danger': errors.has('weight') }" type="text" placeholder="weight">
              </div>
            <div class="col-sm-3">
              <select name="weight_unit" id="weight_unit" v-model="weight_unit" v-validate="'required|alpha'" :class="{'select': true, 'is-danger': errors.has('weight_unit')}">
                <option disabled value="">Choose</option>
                <option value="G">Grams</option>
                <option value="LB">Pounds</option>
              </select>
            </div>
          </div>
          <div class="row" id="weight_warning">
            <div class="col-sm-2"></div>
            <small v-show="errors.has('weight')" class="col-sm-5 help is-danger form-text">{{ errors.first('weight') }}</small>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Birthday</label>
            <div class="col-sm-9">
              <input name="birthday" v-model="birthday" v-validate="'required|date_format:YYYY-DD-MM'" class="col-sm-5" :class="{'input': true, 'is-danger': errors.has('birthday') }" type="text" placeholder="year-month-day">
            </div>
          </div>
          <div class="row" id="age_warning">
            <div class="col-sm-10"></div>
            <small v-show="errors.has('birthday')" class="col-sm-10 help is-danger form-text">{{ errors.first('birthday') }}</small>
          </div>

          <div class="clear-fix"></div>
          <button :disabled="errors.any()" type="submit" class="btn btn-primary submit-button">Submit</button>

      </div>
      <div class="col-1"></div>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
import { Observable } from 'rxjs';

export default {
  name: 'catcreate',
  data() {
    return {
      name:   '',
      age: '',
      gender: '',
      cat_type: '',
      litter: [],
      litterVal: null,
      weight: '',
      weight_unit: '',
      birthday:    '',
      showSuccess: false,
      showDanger: false,
    }
  },
  methods: {
    onSubmitted() {
      axios.post(`${process.env.KITTY_URL}/api/v1/cats/`,{
        name: this.name,
        age: this.age,
        gender: this.gender,
        cat_type: this.cat_type,
        litter: this.litter,
        weight: this.weight,
        birthday: this.birthday+"T00:00:00-00:00",
        weight_unit: this.weight_unit
      })
        .then(response => {
            console.log(response);
            response.status === 201 ? this.showSuccess = true : this.showDanger = true
        })
        .catch(error => {
            console.log(error);
            this.showDanger = true;
        })
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.onSubmitted();
        }else{
          // this.showDanger = true;
        }
      });
    },
    getLitterNames(){
      axios.get(`${process.env.KITTY_URL}/api/v1/litter/`)
        .then(request => {
          console.log("litter_value: ");
          console.log(request.data.results);
          this.litter = request.data.results;
        })
        .catch(error => console.log(error));
    },
    getLitterNamesObserv(){
      const litter$ = Observable.from(axios.get(`${process.env.KITTY_URL}/api/v1/litter/`)
        .catch(error => console.log(error)))
        .pluck("data","results");
      console.log(litter$);
      return{litter: litter$}
    }
  },
  beforeMount(){
    this.getLitterNames()
  },
}
</script>

<style scoped>
  #weight_row{
    margin-bottom: 0;
  }
  #weight_warning{
    margin-bottom: 16px;
  }
  .help {
    color: red;
  }
  label {
    height: 1.5em;
    color: #4A90E2;
    font-family: "Helvetica Neue";
    font-size: 1.25em;
    font-weight: bold;
    line-height: 1.5625em
  }
  #weight_input{
    margin: 0;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  #age_input{
    margin: 0;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
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
    color: white;
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
