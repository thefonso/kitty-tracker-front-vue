<template>
  <form @submit.prevent="validateBeforeSubmit">
    <div id="pet-content">
      <div class="form-row">
        <div class="page-heading col-auto">New Medical Record: <span>{{$route.params.catName}}</span></div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <!--TODO: need to know what should actually go in these fields-->
          <label for="care_given">Care Given</label>
          <select id="care_given" name="care_given" class="form-control" v-model="care_given">
            <option selected>Care Given</option>
            <option>hugs</option>
            <option>food</option>
            <option>medicine</option>
          </select>
          <small id="careHelp" class="form-text text-muted">required</small>
        </div>
        <div class="form-group col-md-4">
          <label for="inputDate">Date</label>
          <input type="text" class="form-control" id="inputDate" name="date" placeholder="yyyy-mm-dd" v-model="date">
          <small id="dateHelp" class="form-text text-muted">required</small>
        </div>
        <div class="form-group col-md-2">
          <label for="inputFollowUp">Follow Up Date</label>
          <input type="text" class="form-control" id="inputFollowUp" name="follow_up_date" placeholder="yyyy-mm-dd" v-model="follow_up_date">
          <small id="followupHelp" class="form-text text-muted">required</small>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputVetPractice">Vet Practice</label>
          <input type="text" class="form-control" id="inputVetPractice" name="vet_practice" placeholder="Vet Practice" v-model="vet_practice">
          <small id="vetHelp" class="form-text text-muted">required</small>
        </div>
        <div class="form-group col-md-6">
          <label for="inputDocName">Doctor Name</label>
          <input type="text" class="form-control" id="inputDocName" name="doc_name" placeholder="Doctor Name" v-model="doc_name">
          <small id="doctorHelp" class="form-text text-muted">required</small>
        </div>
      </div>
      <div class="form-group">
        <label for="inputPetNotes">Pet Notes (optional)</label>
        <textarea class="form-control" id="inputPetNotes" name="notes" rows="5" v-model="notes"></textarea>
      </div>

      <button type="submit" class="btn btn-text btn-primary submit-button float-right">Submit</button>

    </div>
  </form>
</template>
<script>
  import axios from 'axios';
  import { Observable } from 'rxjs';

  export default {
    name: 'MedicalRecordCreate',
    data() {
      return {
        care_given: '',
        date: '',
        vet_practice: '',
        doc_name: '',
        follow_up_date: '',
        notes:    '',
        showSuccess: false,
        showDanger: false,
      }
    },
    methods: {
      onSubmitted() {
        axios.post('https://pure-sea-38216.herokuapp.com/api/v1/medicalrecords/',{
          cat: {id: this.$route.params.catID, name: this.$route.params.catName},
          care_given: this.care_given,
          date: this.date,
          vet_practice: this.vet_practice,
          doc_name: this.doc_name,
          follow_up_date: this.follow_up_date,
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
      }
    }
  }
</script>
<style scoped>
  #catLinks{
    padding-top: 5em;
  }

  label {
    height: 24.58px;
    color: #4A90E2;
    font-family: "Helvetica Neue";
    font-size: 20px;
    font-weight: bold;
    line-height: 25px;
  }

  #pet-content{
    padding-top: 35px;
  }

  .page-heading {
    color: white;
    font-family: "Helvetica Neue";
    font-size: 48px;
    font-weight: bold;
    line-height: 58px;
    margin-bottom: 25px;
  }

  /*feeding button*/
  .feeding-history {
    height: 38px;
    width: 210px;
    border: 1px solid #0275D8;
    border-radius: 4px;
    background-color: #5CB85C;
  }
  .feeding-history-text {
    color: #FFFFFF;
    font-family: "Helvetica Neue";
    font-size: 20px;
    line-height: 21px;
    text-align: center;
  }
  .btn-text {
    color: #FFFFFF;
    font-family: "Helvetica Neue";
    font-size: 20px;
    line-height: 21px;
    text-align: center;
  }
  .submit-button {
    height: 38px;
    width: 210px;
    border: 1px solid #0275D8;
    border-radius: 4px;
    background-color: #0275D8;
  }
  .custom-radio{
    padding-top: 6px;
    margin-left: 10px;
  }
</style>
