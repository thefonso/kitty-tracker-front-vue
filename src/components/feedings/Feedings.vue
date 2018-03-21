<template>
  <form action="">
  <div id="pet-content" class="row">
<!--TODO: create a Feeding History page displaying List of feedings. Same layout as Catlist-->
      <div class="col-sm-5">
        <div class="page-heading">Record A Feeding:</div>
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

        <a role="button" href="#" class="feeding-history feeding-history-text btn btn-text btn-success">Feeding History</a>

      </div>
      <div class="col-sm-1"></div>
      <div class="col-sm-5 align-left">
        <div id="catLinks" class="panel-body">
          <div class="form-group">
            <label for="InputFoodtype">Type of Food Taken</label>
            <select id="InputFoodtype" class="form-control">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div class="form-group">
            <label for="InputAFT">Amount Of Food Taken(gm)</label>
            <input type="email" class="form-control" id="InputAFT" aria-describedby="aftHelp" placeholder="AFT">
            <small id="aftHelp" class="form-text text-muted">Amount of food eaten in grams</small>
          </div>

          <div class="form-group row">
            <label for="InputStimulated" class="col-sm-3 col-form-label">Stimulated?</label>
            <div class="col-sm-7 custom-radio">
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
            <!--<label for="InputFoodtype">Type of Food Taken</label>-->
            <select id="InputFoodtype" class="form-control">
              <option selected>Choices...</option>
              <option>...</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary submit-button float-right">Submit</button>

        </div>
      </div>
      <div class="col-sm-1"></div>
  </div>
  </form>
</template>

<script>

</script>

<style scoped>
  #catLinks{
    padding-top: 5em;
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

  .submit-button {
    height: 38px;
    width: 140px;
    border: 1px solid #0275D8;
    border-radius: 4px;
    background-color: #0275D8;
    float: left;
    margin-top: 1em;
  }
  .custom-radio{
    padding-top: 6px;
    margin-left: 10px;
  }

</style>
