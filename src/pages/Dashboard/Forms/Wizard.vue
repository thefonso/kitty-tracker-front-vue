<template>
  <div>
    <div class="row d-flex justify-content-center">
      <div class="col-sm-10">
        <div class="card card-wizard" id="wizardCard">
          <form-wizard shape="tab"
                       title="Add a Cat"
                       subtitle="tell us about your kitty"
                       @on-complete="wizardComplete"
                       error-color="#FB404B"
                       color="#35495E">
            <tab-content title="Cat details"
                         class="col-12"
                         :before-change="() => validateStep('firstStep')"
                         icon="nc-icon nc-badge">
              <first-step ref="firstStep" @on-validated="onStepValidated"></first-step>
            </tab-content>

            <tab-content title="Add Profile Photo"
                         class="col-12"
                         :before-change="() => validateStep('secondStep')"
                         icon="nc-icon nc-notes">
              <second-step ref="secondStep" @on-validated="onStepValidated"></second-step>
            </tab-content>

            <tab-content title="Last step"
                         class="col-12"
                         icon="nc-icon nc-check-2">
              <div>
                <h2 class="text-center text-space">Congrats!
                  <br>
                  <small>Click on "<b>Finish</b>" to reload your kitties</small>
                </h2>
              </div>

            </tab-content>

            <button slot="prev" class="btn btn-default btn-fill btn-wd btn-back">Back
              <span class="btn-label btn-label-left"><i class="fa fa-arrow-left"></i></span>
            </button>

            <button slot="next" class="btn btn-default btn-fill btn-wd btn-next">Next
              <span class="btn-label btn-label-right"><i class="fa fa-arrow-right"></i></span>
            </button>

            <button slot="finish" class="btn btn-success btn-fill btn-wd" v-on:click="clickIt">Finish</button>
          </form-wizard>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import FirstStep from './Wizard/FirstStep.vue'
  import SecondStep from './Wizard/SecondStep.vue'
  import swal from 'sweetalert2'

  export default {
    name: 'wizard',
    data () {
      return {
        wizardModel: {}
      }
    },
    components: {
      FormWizard,
      TabContent,
      FirstStep,
      SecondStep
    },
    methods: {
      validateStep (ref) {
        console.log('ref:');
        console.log(ref);
        return this.$refs[ref].validate()
      },
      onStepValidated (validated, model) {
        console.log("validated, model:");
        console.log(validated, model);
        this.wizardModel = {...this.wizardModel, ...model}
      },
      wizardComplete () {
        swal('Good job!', 'Your Cat, with photo, has been added!', 'success');
      },
      clickIt(){
        //since user is currently logged in, this will refreash the page
        this.$router.push('/login');
      }
    }
  }
</script>
<style lang="scss">
  .vue-form-wizard .wizard-icon-circle.tab_shape {
    background-color: #9A9A9A !important;
    color: white;
  }
  .vue-form-wizard .wizard-tab-content {
    display: flex; // to avoid horizontal scroll when animating
    .wizard-tab-container {
      display: block;
      animation: fadeIn 0.5s;
    }
  }
</style>
