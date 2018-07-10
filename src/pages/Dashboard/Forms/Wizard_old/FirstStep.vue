<template>
  <div>
    <h5 class="text-center">Please tell us more about your cat.</h5>
    <div class="row">
      <div class="col-md-6">
        <fg-input label="Name"
                  name="name"
                  v-validate="modelValidations.Name"
                  v-model="model.Name"
                  :error="getError('name')"
                  placeholder="ex: Babby">
        </fg-input>
      </div>
      <div class="col-md-6">
        <fg-input label="Gender"
                  name="gender"
                  v-validate="modelValidations.Gender"
                  v-model="model.gender"
                  :error="getError('gender')"
                  placeholder="ex: Male">
        </fg-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <fg-input label="Age"
                  placeholder="Age"
                  type="email"
                  name="email"
                  v-validate="modelValidations.age"
                  :error="getError('age')"
                  v-model="model.age">
        </fg-input>
        <fg-input v-validate="modelValidations.age"
                  v-model="model.bootstrapVersion"
                  name="bootstrap version"
                  :error="getError('bootstrap version')"
                  label="Bootstrap version">
          <el-select class="select-default"
                     v-model="model.Age">
            <el-option class="select-default" value="adult">Adult</el-option>
            <el-option class="select-default" value="kitten">Kitten</el-option>
          </el-select>
        </fg-input>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        model: {
          Name: '',
          Gender: '',
          Age: ''
        },
        modelValidations: {
          Name: {
            min: 5
          },
          Gender: {
            required: true
          },
          Age: {
            required: true
          }
        }
      }
    },
    methods: {
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
