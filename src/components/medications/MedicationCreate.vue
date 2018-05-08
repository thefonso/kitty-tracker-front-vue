
<template>
  <form @submit.prevent="validateBeforeSubmit">
    <div class="meds-table">
      <div class="heading-row">
        <div class="page-heading float-sm-left">Add Medication for: <span>{{$route.params.catName}}</span></div>

        <div class="float-sm-right">
          <div class="grey">last updated</div>
          <!--TODO: format date / time for last time updated-->
          <div id="lastup-date">Date:<span>MM:DD:YY</span></div>
          <div id="lastup-time">Time:<span>HH:MM</span></div>
        </div>
      </div>

      <table class="table">
        <thead id="thead" class="thead-light">
        <tr>
          <th scope="col" class="col-sm-2">Medication</th>
          <th scope="col" class="col-sm-2">Duration</th>
          <th scope="col" class="col-sm-2">Frequency</th>
          <th scope="col" class="col-sm-2">Dosage</th>
          <th scope="col" class="col-sm-2">Notes</th>
        </tr>
        </thead>
        <tbody>
        <tr class="form-group">
          <td>
            <label class="col-form-label">name</label>
            <input name="name" v-model="name" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" placeholder="name">
            <i v-show="errors.has('name')" class="fa fa-warning">required</i>
          </td>
          <td>
            <label class="col-form-label">duration</label>
            <input name="duration" v-model="duration" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('duration') }" type="text" placeholder="duration">
            <i v-show="errors.has('duration')" class="fa fa-warning">required</i>
          </td>
          <td>
            <label class="col-form-label">frequency</label>
            <input name="frequency" v-model="frequency" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('frequency') }" type="text" placeholder="frequency">
            <i v-show="errors.has('frequency')" class="fa fa-warning">required</i>
          </td>
          <td>
            <label class="col-form-label">dosage</label>
            <input name="dosage" v-model="dosage" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('dosage') }" type="text" placeholder="dosage">
            <i v-show="errors.has('dosage')" class="fa fa-warning">required</i>
          </td>
          <td>
            <label class="col-form-label">notes</label>
            <input name="notes" v-model="notes" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('notes') }" type="text" placeholder="notes">
            <i v-show="errors.has('notes')" class="fa fa-warning">required</i>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="clear-fix"></div>
      <button type="submit" class="btn btn-primary submit-button">Submit</button>
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
        dosage:    '',
        notes: '',
      }
    },
    methods: {
      // TODO able to post
      onSubmitted() {
        axios.post('http://localhost:8000/api/v1/medications/',{
          cat: {id: this.$route.params.catID, name: this.$route.params.catName},
          name: this.name,
          duration: this.duration,
          frequency: this.frequency,
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
            this.onSubmitted();
          }else{
            this.showDanger = true;
          }
        });
      }
    }
  }
</script>
<style scoped>
  #thead th{
    color: black;
  }
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
    /*width: 108px;*/
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
    color: white;
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
  .submit-button {
    height: 38px;
    width: 140px;
    border: 1px solid #0275D8;
    border-radius: 4px;
    background-color: #0275D8;
    float: right;
    margin-top: 1em;
  }
</style>
