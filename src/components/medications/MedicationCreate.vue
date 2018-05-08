
<template>
  <form @submit.prevent="validateBeforeSubmit">

    <div id="pet-content">

      <div class="row">
        <div class="col-sm-1"></div>
        <div class="page-heading col-auto">Add Medication for: <span>{{$route.params.catName}}</span></div>
      </div>
      <div class="row">
        <div class="col-sm-1"></div>
        <!--<div class="col-sm-9" variant="success" dismissible :show="showSuccess">-->
          <!--<strong>Success!</strong> Medication added.-->
        <!--</div>-->
        <!--<div class="col-sm-9" variant="danger" dismissible :show="showDanger">-->
          <!--<strong>Problem:</strong> Did you fill out all fields? Are you on the internet?-->
        <!--</div>-->
      </div>
      <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-sm-5">
          <div class="form-group">
            <label>Medication</label>
            <input name="name" v-model="name" v-validate="'required|integer'" class="col" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" placeholder="medication name">
            <i v-show="errors.has('name')" class="fa fa-warning">required</i>
            <!--<small v-show="errors.has('name)" class="help is-danger form-text text-muted">{{ errors.first('name') }}</small>-->
          </div>
          <div class="form-group">
            <label for="duration">Duration</label>
            <input name="duration" v-model="duration" v-validate="'required|integer'" class="col" :class="{'input': true, 'is-danger': errors.has('duration')}" id="duration" placeholder="duration">
            <i v-show="errors.has('duration')" class="fa fa-warning">required</i>
            <!--<small v-show="errors.has('duration)" class="help is-danger form-text text-muted">{{ errors.first('duration') }}</small>-->
          </div>
          <div class="form-group">
            <label for="frequency">Frequency</label>
            <input name="frequency" v-model="frequency" v-validate="'required|integer'" class="col" :class="{'input': true, 'is-danger': errors.has('frequency')}" id="frequency" placeholder="freq">
            <i v-show="errors.has('frequency')" class="fa fa-warning">required</i>
            <!--<small v-show="errors.has('frequency')" class="help is-danger form-text text-muted">{{ errors.first('frequency') }}</small>-->
          </div>
          <div class="form-group">
            <label for="dosage_unit">Dosage Unit</label>
            <select name="dosage_unit" id="dosage_unit" class="form-control" v-model="dosage_unit" v-validate="'required|alpha'" :class="{'select': true, 'is-danger': errors.has('dosage_unit')}">
              <option value="Choose...">Choose...</option>
              <option value="ML" selected>ML</option>
            </select>
            <i v-show="errors.has('dosage_unit')" class="fa fa-warning">required</i>
            <!--<small v-show="errors.has('dosage_unit')" class="help is-danger form-text text-muted">{{ errors.first('dosage_unit') }}</small>-->
          </div>
        </div>
        <div class="col-auto"></div>
        <div class="col-sm-5">
          <div class="panel-body">
            <div class="form-group">
              <label for="dosage">Dosage</label>
              <input name="dosage" v-model="dosage" v-validate="'required|integer'" class="col" :class="{'input': true, 'is-danger': errors.has('dosage')}" id="dosage" placeholder="dosage">
              <i v-show="errors.has('dosage')" class="fa fa-warning">required</i>
              <!--<small v-show="errors.has('dosage')" class="help is-danger form-text text-muted">{{ errors.first('dosage') }}</small>-->
            </div>
            <div class="form-group">
              <label for="InputNotes">Notes</label>
              <textarea class="form-control" id="InputNotes" rows="6" name="notes" v-model="notes"></textarea>
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
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'medication-create',
    data() {
      return {
        name:   '',
        duration: '',
        frequency: '',
        dosage_unit: 'ML',
        dosage:    '',
        notes: '',
      }
    },
    methods: {
      onSubmitted() {
        axios.post('http://localhost:8000/api/v1/medications/',{
          cat: {id: this.$route.params.catID, name: this.$route.params.catName},
          name: this.name,
          duration: this.duration,
          frequency: this.frequency,
          dosage_unit: this.dosage_unit,
          dosage: this.dosage,
          notes: this.notes
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
        this.$validator.validateAll().then((result) => {
          if (result) {
            console.log('it submitted');
            this.onSubmitted();
          }else{
            console.log('it blew up');
            this.showDanger = true;
          }
        });
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
      color: white;
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
