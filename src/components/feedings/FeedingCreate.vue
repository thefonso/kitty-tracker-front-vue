<template>
  <form @submit.prevent="validateBeforeSubmit">

    <div id="pet-content">

      <div class="row">
        <div class="col-sm-1"></div>
        <div class="page-heading col-auto">New Feeding For: <span> {{$route.params.catName}}</span></div>
      </div>
      <div class="row">
        <div class="col-sm-1"></div>
        <b-alert class="col-sm-9" variant="success" dismissible :show="showSuccess">
          <strong>Success!</strong> Feeding added.
        </b-alert>
        <b-alert class="col-sm-9" variant="danger" dismissible :show="showDanger">
          <strong>Problem:</strong> Did you fill out all fields? Are you on the internet?
        </b-alert>
      </div>
      <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-sm-5">
          <div class="form-group">
            <label for="weight_before_food">Weight Before Food(gm)</label>
            <input name="weight_before_food" v-model="weight_before_food" v-validate="'required|integer'" class="col" :class="{'input': true, 'is-danger': errors.has('weight_before_food') }" id="weight_before_food" type="text" placeholder="WBF" v-on:change="fivePercenter">
            <!--<i v-show="errors.has('weight_before_food')" class="fa fa-warning">required</i>-->
            <small v-show="errors.has('weight_before_food')" class="help is-danger form-text text-muted">{{ errors.first('weight_before_food') }}</small>
          </div>
          <div class="form-group">
            <label for="target_weight_after_food">Target Weight After Food(gm): <div id="target_weight_after_food"></div></label>
          </div>
          <div class="form-group">
            <label for="weight_after_food">Actual Weight After Food(gm)</label>
            <input name="weight_after_food" v-model="weight_after_food" v-validate="'required|integer'" class="col" :class="{'input': true, 'is-danger': errors.has('weight_after_food')}" id="weight_after_food" placeholder="WAF">
            <!--<i v-show="errors.has('weight_after_food')" class="fa fa-warning">required</i>-->
            <small v-show="errors.has('weight_after_food')" class="help is-danger form-text text-muted">{{ errors.first('weight_after_food') }}</small>
          </div>
          <div class="form-group">
            <label for="amount_of_food_taken">Amount Of Food Taken(gm)</label>
            <input name="amount_of_food_taken" v-model="amount_of_food_taken" v-validate="'required|integer'" class="col" :class="{'input': true, 'is-danger': errors.has('amount_of_food_taken')}" id="amount_of_food_taken" placeholder="AFT">
            <!--<i v-show="errors.has('amount_of_food_taken')" class="fa fa-warning">required</i>-->
            <small v-show="errors.has('amount_of_food_taken')" class="help is-danger form-text text-muted">{{ errors.first('amount_of_food_taken') }}</small>
          </div>
          <div class="form-group">
            <label for="food_type">Type of Food Taken</label>
            <select name="food_type" id="food_type" class="form-control" v-model="food_type" v-validate="'required|alpha'" :class="{'select': true, 'is-danger': errors.has('food_type')}">
              <option value="Choose..." selected>Choose...</option>
              <option value="NA">None /Not Entered</option>
              <option value="BO">Bottle</option>
              <option value="BS">Bottle/Syringe</option>
              <option value="SG">Syringe Gruel</option>
              <option value="GG">Syringe Gruel / Gruel</option>
              <option value="G">Gruel</option>
            </select>
            <!--<i v-show="errors.has('food_type')" class="fa fa-warning">required</i>-->
            <small v-show="errors.has('food_type')" class="help is-danger form-text text-muted">{{ errors.first('food_type') }}</small>
          </div>
        </div>
        <div class="col-auto"></div>
        <div class="col-sm-5">
          <div class="panel-body">
            <div class="form-group">
              <label for="InputNotes">Notes</label>
              <textarea class="form-control" id="InputNotes" rows="6" name="notes" v-model="notes"></textarea>
            </div>
            <div class="form-group row">
              <div class="col-xl-4">
                <label  class="mr-2">Stimulated?</label>
              </div>
              <div class="col-xl-4">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="stimulated"  value="true" v-validate="'required|alpha'" v-model="stimulated">
                  <label class="form-check-label">Yes</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="stimulated"  value="false" v-model="stimulated">
                  <label class="form-check-label">No</label>
                </div>
                <i v-show="errors.has('stimulated')" class="fa fa-warning">required</i>
              </div>
            </div>
            <div class="form-group">
              <label for="stimulation_type">Stimulation type</label>
              <select name="stimulation_type" id="stimulation_type" class="form-control" v-model="stimulation_type" v-validate="'required|alpha'" :class="{'select': true, 'is-danger': errors.has('stimulation_type')}">
                <option value="Choose..." selected>Choose...</option>
                <option value="NA">None / Not Entered</option>
                <option value="UR">Urine</option>
                <option value="FE">Feces</option>
                <option value="UF">Urine/Feces</option>
              </select>
              <i v-show="errors.has('stimulation_type')" class="fa fa-warning">required</i>
            </div>
          </div>
        </div>
        <div class="col-sm-1"></div>
      </div>
      <div class="row">
        <div class="col-sm-6"></div>
        <div class="col-auto"></div>
        <div class="col-sm-5">
          <button type="submit" class="btn btn-primary submit-button btn-text float-left">Submit</button>
        </div>
        <div class="col-sm-1"></div>
      </div>


    </div>
  </form>
  <!--<div class="clear-fix"></div>-->
</template>

<script>
  import axios from 'axios';
  import { Observable } from 'rxjs';

  export default {
    name: 'FeedingCreate',
    data() {
      return {
        weight_before_food: '',
        weight_after_food: '',
        amount_of_food_taken: '',
        food_type: '',
        notes:    '',
        stimulated: '',
        stimulation_type: '',
        showSuccess: false,
        showDanger: false,
        constant: 0,
      }
    },
    methods: {
      onSubmitted() {
        axios.post('http://localhost:8000/api/v1/feedings/',{
          cat: {id: this.$route.params.catID, name: this.$route.params.catName},
          weight_unit_measure: 'G',
          weight_before_food: this.weight_before_food,
          food_unit_measure: 'G',
          amount_of_food_taken: this.amount_of_food_taken,
          food_type: this.food_type,
          weight_after_food: this.weight_after_food,
          stimulated: this.stimulated,
          stimulation_type: this.stimulation_type,
          notes: this.notes,
        })
          .then(response => {
            console.log(response);
            response.status === 201 ? this.showSuccess = true : this.showDanger = false
          })
          .catch(error => {
            console.log(error);
            this.showDanger = true;
          })
      },
      validateBeforeSubmit() {
        console.log(this.$route.params);
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.onSubmitted();
          }else{
            this.showDanger = true;
          }
        });
      },
      fivePercenter(){
        let percent_wbf = document.getElementById("weight_before_food").value * 0.05;
        let wbf = Number(document.getElementById("weight_before_food").value);
        console.log(typeof percent_wbf);
        console.log(typeof wbf);
        document.getElementById("target_weight_after_food").innerHTML = wbf + percent_wbf;
      }
    }
  }
</script>

<style>
  i{
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
  #pet-content{
    padding-top: 2.1875em
    /*padding: 3rem 1.5rem;*/
  }

  @media only screen and (min-width: 600px){
    .page-heading {
      color: White;
      font-family: "Helvetica Neue";
      font-size: 2em;
      font-weight: bold;
      line-height: 2.625em;
    }
  }

  @media only screen and (max-width: 600px){
    .page-heading {
      font-size: 1.50em;
      line-height: 1.625em;
      padding-bottom: 1em;
    }
  }

  /*feeding button*/
  .btn-text {
    color: #FFFFFF;
    font-family: "Helvetica Neue";
    font-size: 1.25em;
    line-height: 1.3em;
    text-align: center;
  }
  .submit-button {
    height: 2.375em;
    width: 210px;
    border: 1px solid #0275D8;
    border-radius: 0.25em;
    background-color: #0275D8;
  }
  .custom-radio{
    padding-top: 0.375em;
    margin-left: 0.625em;
  }
  .page-heading{
  color: white;
  }
</style>
