<template>
  <form action="">

    <div id="pet-content">
  <!--TODO: create a Feeding History page displaying List of feedings. Same layout as Catlist-->


      <div class="row"><div class="col-sm-1"></div><div class="page-heading">Record A Feeding:</div></div>
      <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-sm-5">
          <div class="form-group">
            <label for="InputWBF">Weight Before Food(gm)</label>
            <input type="email" class="form-control" id="InputWBF" aria-describedby="emailHelp" placeholder="WBF">
            <small id="wbfHelp" class="form-text text-muted">how kitty is cat before food?</small>
          </div>
          <div class="form-group">
            <label for="InputWAF">Weight After Food(gm)</label>
            <input type="email" class="form-control" id="InputWAF" aria-describedby="emailHelp" placeholder="WAF">
            <small id="wafHelp" class="form-text text-muted">How heavy kitty is after eating..</small>
          </div>
          <div class="form-group">
            <label for="InputAFT">Amount Of Food Taken(gm)</label>
            <input type="email" class="form-control" id="InputAFT" aria-describedby="aftHelp" placeholder="AFT">
            <small id="aftHelp" class="form-text text-muted">Amount of food eaten in grams</small>
          </div>
          <div class="form-group">
            <label for="InputFoodtype">Type of Food Taken</label>
            <select id="InputFoodtype" class="form-control">
              <option selected>Choose...</option>
              <option value="">Bottle</option>
              <option value="">Bottle/Syringe</option>
              <option value="">Syringe Gruel</option>
              <option value="">Syringe Gruel / Gruel</option>
              <option value="">Gruel</option>
            </select>
            <small id="toftHelp" class="form-text text-muted">What kind of food?</small>
          </div>
        </div>
        <div class="col-sm-5">
          <div class="panel-body">

            <div class="form-group">
              <label for="InputNotes">Notes</label>
              <textarea class="form-control" id="InputNotes" rows="9"></textarea>
            </div>

            <div class="form-group row">
              <div class="col-sm-4">
                <label class="mr-2">Stimulated?</label>
              </div>
              <div class="col-sm-8">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                  <label class="form-check-label" for="inlineRadio1">Yes</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                  <label class="form-check-label" for="inlineRadio2">No</label>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="InputStimType">Stimulation type</label>
              <select id="InputStimType" class="form-control">
                <option selected>Choose...</option>
                <option>Urine</option>
                <option>Feces</option>
                <option>Urine/Feces</option>
              </select>
              <small id="stimtypeHelp" class="form-text text-muted">required</small>
            </div>

            <button type="submit" class="btn btn-primary submit-button btn-text float-right">Submit</button>

          </div>
        </div>
        <div class="col-sm-1"></div>
      </div>
    </div>
  </form>
</template>

<script>

</script>

<style>
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
  }

  .page-heading {
    color: #000000;
    font-family: "Helvetica Neue";
    font-size: 2em;
    font-weight: bold;
    line-height: 2.625em;

  }

  /*feeding button*/
  .feeding-history {
    height: 1.375em;
    width: 210px;
    border: 1px solid #0275D8;
    border-radius: 0.25em;
    background-color: #5CB85C;
  }
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

</style>
