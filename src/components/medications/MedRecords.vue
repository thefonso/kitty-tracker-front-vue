<template>
  <form @submit.prevent="onSubmitted">
    <div id="pet-content">
        <div class="form-row">
          <div class="page-heading">Medical Records:</div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="careGiven">Care Given</label>
            <select id="careGiven" class="form-control">
              <option selected>Care Given</option>
              <option>...</option>
              <option>...</option>
              <option>...</option>
            </select>
            <small id="careHelp" class="form-text text-muted">required</small>
          </div>
          <div class="form-group col-md-4">
            <label for="inputDate">Date</label>
            <input type="text" class="form-control" id="inputDate" placeholder="mm/dd/yyyy">
            <small id="dateHelp" class="form-text text-muted">required</small>
          </div>
          <div class="form-group col-md-2">
            <label for="inputFollowUp">Follow Up Date</label>
            <input type="text" class="form-control" id="inputFollowUp" placeholder="mm/dd/yyyy">
            <small id="followupHelp" class="form-text text-muted">required</small>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputVetPractice">Vet Practice</label>
            <input type="text" class="form-control" id="inputVetPractice" placeholder="Vet Practice">
            <small id="vetHelp" class="form-text text-muted">required</small>
          </div>
          <div class="form-group col-md-6">
            <label for="inputDocName">Doctor Name</label>
            <input type="text" class="form-control" id="inputDocName" placeholder="Doctor Name">
            <small id="doctorHelp" class="form-text text-muted">required</small>
          </div>
        </div>
        <div class="form-group">
          <label for="inputPetNotes">Pet Notes (optional)</label>
          <textarea class="form-control" id="inputPetNotes" rows="5"></textarea>
        </div>

        <button type="submit" class="btn btn-text btn-primary submit-button float-right">Submit</button>

    </div>
  </form>
</template>
<script>

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
    color: #000000;
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
