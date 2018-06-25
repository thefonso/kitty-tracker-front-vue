<template>
  <form @submit.prevent="validateBeforeSubmit">

    <div class="pet-record">Create New Pet</div>

    <div class="row">
      <div class="col-sm-2"></div>

      <b-alert class="col-sm-8" variant="success" dismissible fade :show="showSuccess">
        <strong>Success!</strong> New kitty added.
      </b-alert>

      <b-alert class="col-sm-8" variant="danger" dismissible fade :show="showDanger">
        <strong>Problem:</strong> Did you fill out all fields? Are you on the internet?
      </b-alert>

      <div class="col-sm-2"></div>
    </div>

    <div id="pet-content" class="form-group row">
      <div class="col-2"></div>
      <!--photo column-->
      <div class="col-sm-2 float-right">

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

      <!--second column-->
      <div class="col-sm-3 float-left">
        <div class="form-group">
          <label class="col-sm-12 control-label">Name</label>
          <div class="col-sm-12">
            <input name="name" v-model="name" v-validate="'required'"
                   :class="{'input': true, 'is-danger': errors.has('name'),}" class="form-control" type="text">
            <small v-show="errors.has('name')" class="help is-danger form-text">{{ errors.first('name') }}</small>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-sm-6">
            <label class="col-sm-3 form-label">Gender</label>
            <div class="col-sm-9">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="InputGender1" value="M"
                       v-model="gender">
                <label class="form-check-label" for="InputGender1">Male</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="InputGender2" value="F"
                       v-model="gender" v-on:click="female = true">
                <label class="form-check-label" for="InputGender2">Female</label>
              </div>
            </div>
          </div>

          <div class="form-group col-sm-6">
            <label class="col-sm-3 form-label">Age</label>
            <div class="col-sm-9">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions2" id="InputAge1" value="A"
                       v-model="age">
                <label class="form-check-label" for="InputAge1">Adult</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions2" id="InputAge2" value="K"
                       v-model="age">
                <label class="form-check-label" for="InputAge2">Kitten</label>
              </div>
            </div>
          </div>

        </div>

        <div class="form-group">
          <label class="col-sm-12 control-label">Cat type</label>
          <div class="col-sm-12">
            <select class="" name="cat_type" v-model="cat_type">
              <option disabled value="">Choose</option>
              <option value="O">Orphan</option>
              <option value="P">Pregnant</option>
              <option value="N">Nursing</option>
            </select>
          </div>
        </div>

        <!--NOTE: litter stuff starts here-->
        <!--if a Mother: v-if="cat_type === 'P' || cat_type === 'N'?-->
        <!--...ask..."add  kittens?"...options appears..select option 'YES', new CREATE LITTER modal appears with Mother auto-populated in "Mother field"-->
        <div class="form-group" v-if="cat_type === 'P' || cat_type === 'N'">
          <label class="col-sm-5 col-form-label">Add kittens?</label>
          <div class="col-sm-9">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="AddKittens" id="AddKittens1" value="Y"
                     v-model="addKittens">
              <label class="form-check-label" for="AddKittens1">Yes</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="AddKittens" id="AddKittens2" value="N"
                     v-model="addKittens">
              <label class="form-check-label" for="AddKittens2">No</label>
            </div>
          </div>
        </div>

        <div class="modal" tabindex="-1" role="dialog" v-if="addKittens === 'Y'">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>Create Litter Form goes here...</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary">Save changes</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <!-- if KITTEN...different assoc with litter modal-->
        <div class="form-group row" v-if="age === 'K'">
          <label class="col-sm-3 control-label ">Litter Name</label>
          <div class="col-sm-5">
            <select class="form-control" name="litter_set" v-model="litter_mates">
              <option v-for="item in litter" :value="item.name">{{item.name}}</option>
            </select>
          </div>
        </div>
        <!--NOTE: litter stuff ends here-->
      </div>

      <!--third column-->
      <div class="col-sm-4 float-left">
        <div class="form-group">
          <label class="col-sm-12 control-label">Weight</label>
          <div class="col-sm-12 row">
            <div class="col-sm-4">
              <input name="weight" v-model="weight" v-validate="'required|integer'"
                     :class="{'input': true, 'is-danger': errors.has('weight') }" class="form-control" type="text">
              <small v-show="errors.has('weight')" class="help is-danger form-text">{{ errors.first('weight') }}</small>
            </div>
            <div class="col-sm-3">
              <select name="weight_unit" v-model="weight_unit" v-validate="'required|alpha'"
                      :class="{'select': true, 'is-danger': errors.has('weight_unit')}">
                <option disabled value="">Choose</option>
                <option value="G">Grams</option>
                <option value="LB">Pounds</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-12 form-label">Birthday</label>
          <div class="col-sm-8">
            <input name="birthday" v-model="birthday" v-validate="'required|date_format:YYYY-MM-DD'" class="form-control"
                   :class="{'input': true, 'is-danger': errors.has('birthday') }" type="text" placeholder="  yyyy-mm-dd">
            <small v-show="errors.has('birthday')" class="col-sm-10 help is-danger form-text">{{ errors.first('birthday')
              }}
            </small>
          </div>
        </div>
        <div class="clear-fix"></div>
        <div class="form-group">
          <div class="col-sm-8">
            <button :disabled="errors.any()" type="submit" class="btn btn-primary submit-button">Submit</button>
          </div>
        </div>

      </div>
      <!--<div class="col-1"></div>-->
    </div>
  </form>
</template>

<script>
  import axios from 'axios';
  import {Observable} from 'rxjs';

  export default {
    name: 'catcreate',
    data() {
      return {
        name: '',
        age: '',
        gender: '',
        cat_type: '',
        litter: [],
        litter_mates: null,
        weight: '',
        weight_unit: '',
        birthday: '',
        showSuccess: false,
        showDanger: false,
        female: false,
        addKittens: '',
      }
    },
    methods: {
      onSubmitted() {
        axios.post(`${process.env.KITTY_URL}/api/v1/cats/`, {
          name: this.name,
          age: this.age,
          gender: this.gender,
          cat_type: this.cat_type,
          litter_mates: this.litter_mates,
          weight: this.weight,
          birthday: this.birthday + "T00:00:00-00:00",
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
          } else {
            // this.showDanger = true;
          }
        });
      },
      getLitterNames() {
        axios.get(`${process.env.KITTY_URL}/api/v1/litter/`)
          .then(request => {
            console.log("litter_value: ");
            console.log(request.data.results);
            this.litter = request.data.results;
          })
          .catch(error => console.log(error));
      },
      getLitterNamesObserv() {
        const litter$ = Observable.from(axios.get(`${process.env.KITTY_URL}/api/v1/litter/`)
          .catch(error => console.log(error)))
          .pluck("data", "results");
        console.log(litter$);
        return {litter: litter$}
      }
    },
    beforeMount() {
      this.getLitterNames()
    },
  }
</script>

<style scoped>
  #weight_row {
    margin-bottom: 0;
  }

  #weight_warning {
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

  .form-control {
    margin: 0;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  #age_input {
    margin: 0;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  #pet-content {
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
    margin: auto;
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
