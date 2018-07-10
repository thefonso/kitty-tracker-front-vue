<template>
  <div>
    <h5 class="text-center">Please give us more details about your platform.</h5>
    <div class="row">
      <!--third column BEGINS-->
      <div class="col-sm-12">
        <div class="form-group">
          <label class="col-sm-12 control-label">Weight</label>
          <div class="col-sm-12 row" v-if="cat_form">
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
          <div class="col-sm-8" v-if="cat_form">
            <input name="birthday" v-model="birthday" v-validate="'required|date_format:YYYY-MM-DD'" class="form-control"
                   :class="{'input': true, 'is-danger': errors.has('birthday') }" type="text" placeholder="  yyyy-mm-dd">
            <small v-show="errors.has('birthday')" class="help is-danger form-text">{{ errors.first('birthday')
              }}
            </small>
          </div>
        </div>
        <div class="clear-fix"></div>
        <div class="form-group">
          <div class="col-sm-8">
            <button :disabled="errors.any()" type="submit" name="cat-button" value="button1" class="btn btn-primary submit-button">Submit</button>
          </div>
        </div>
      </div>
      <!--third column ENDS-->
    </div>
  </div>
</template>
<script>



  export default {
    data () {
      return {
        weight: '',
        weight_unit: '',
        birthday: '',
        cat_form: true,
      }
    },
    methods: {
      getLitterNamesObserv() {
        const litter$ = Observable.from(axios.get(`${process.env.KITTY_URL}/api/v1/litter/`)
          .catch(error => console.log(error)))
          .pluck("data", "results");
        console.log(litter$);
        return {litter: litter$}
      },
      hideModal () {
        this.$refs.myModalRef.hide();
      },
      getError (fieldName) {
        return this.errors.first(fieldName)
      },
      validate () {
        return this.$validator.validateAll().then(res => {
          this.$emit('on-validated', res, this.model)
          return res
        })
      }
    }
  }
</script>
<style>
</style>
