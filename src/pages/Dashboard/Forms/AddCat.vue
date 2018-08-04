<template>
  <form id="cat_form" @submit.prevent="validateBeforeSubmit">
    <div class="d-flex justify-content-around">
      <div class="divTableHead col-sm-2 center">Photo</div>
      <div class="divTableCell col-sm-2 center">
        <div class="form-group">
          <div class="col-sm-12">
            <input type="text" class="form-control form-control-sm bg-copy-10" id="name" placeholder="Name">
          </div>
        </div>
      </div>
      <div class="divTableCell col-sm-2 center">
        <div class="form-group">
          <div class="col-sm-12">
            <div class="form-check form-check-inline">
              <input class="form-check-input bg-copy-10" type="radio" name="gender" id="InputGender1" value="M"
                     v-model="gender" v-validate="'required'">
              <label class="form-check-label" for="InputGender1">Male</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input bg-copy-10" type="radio" name="gender" id="InputGender2" value="F"
                     v-model="gender" v-on:click="female = true">
              <label class="form-check-label" for="InputGender2">Female</label>
            </div>
          </div>
        </div>
      </div>
      <div class="divTableCell col-sm-2 center">Birthdate</div>
      <div class="divTableCell col-sm-1 center">Type</div>
      <div class="divTableCell col-sm-2 center">Litter Number</div>
      <div class="divTableCell col-sm-1 center">Weight</div>
      <div class="divTableCell col-sm-1 center">Unit</div>
    </div>
  </form>
</template>

<script>
  import axios from 'axios';
  import {Observable} from 'rxjs';
  import showSwal from '../Tables/ExtendedTables';


  export default {
    name: "AddCat",
    data () {
      return {
        name: '',
        gender: '',
        age: '',
        cat_type: '',
        litter: [],
        litter_mates: null,
        litter_name: '',
        mom_cat: '',
        female: false,
        addKittens: false,
        cat_form: true,
        selectedFile: null,
        singleCat: [],
        photo: '',
        showSuccess: false,
        showDanger: false,
        showSuccess_litter: false,
        showDanger_litter: false,
        weight: '',
        weight_unit: '',
        birthday: '',
      }
    },
    methods: {
      onFileChanged (event) {
        this.selectedFile = event.target.files[0];
        // console.log(event);
        this.onUpload();
      },
      onUpload() {
        // upload file, get it from this.selectedFile
        const formData = new FormData();
        formData.append('name', this.name);
        formData.append('photo', this.selectedFile, this.selectedFile.name);
        axios.put(`${process.env.KITTY_URL}/api/v1/cats/${this.$route.params.catID}/`,formData,{
          onUploadProgress: progressEvent => {
            console.log('Upload progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
          }
        })
          .then(response => {
            console.log(response.data.photo);
            // response.status === 201 ? this.showSuccess = true : this.showDanger = true
            this.singleCat = response.data;
          })
          .catch(error => {
            console.log(error);
            // this.showDanger = true;
          })
      },
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
        this.$validator.validateAll()
          .then((result) => { console.log(result);
            this.onSubmitted();
          }).catch(error => {
          console.log(error);
          this.showDanger = true;
        });
      },
      onSubmittedLitter() {
        axios.post(`${process.env.KITTY_URL}/api/v1/litter/`, {
          litter_name: this.litter_name,
          mom_cat: this.name,
        })
          .then(response => {
            console.log(response);
            response.status === 201 ? this.showSuccess_litter = true : this.showDanger_litter = true;
            this.cat_form = true;
          })
          .catch(error => {
            console.log(error);
            this.showDanger_litter = true;
          })
      },
      validateBeforeSubmitLitter() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.onSubmittedLitter();
          } else {
            // this.showDanger = true;
          }
        });
      },
      getLitterNames() {
        axios.get(`${process.env.KITTY_URL}/api/v1/litter/`)
          .then(request => {
            console.log("litter_value: ");
            this.litter = request.data.results;
            console.log(this.litter);
          })
          .catch(error => console.log(error));
      },
      getLitterNamesObserv() {
        const litter$ = Observable.from(axios.get(`${process.env.KITTY_URL}/api/v1/litter/`)
          .catch(error => console.log(error)))
          .pluck("data", "results");
        console.log(litter$);
        return {litter: litter$}
      },
      showModal () {
        this.$refs.myModalRef.show();
        // TODO: turn validate off here
        this.cat_form = false;
      },
      hideModal () {
        this.$refs.myModalRef.hide();
      },
      getError (fieldName) {
        return this.errors.first(fieldName)
      },
      validate () {
        return this.$validator.validateAll().then(res => {
          console.log("fuq");
          this.$emit('on-validated', res, this.model);
          return res
        })
      }
    },
    beforeMount() {
      this.getLitterNames()
    },
    components: {
      // 'b-modal': bModal,
      // 'b-container': bContainer,
      // 'b-alert': bAlert
    },
    directives: {
      // 'b-modal': bModalDirective
    },
  }
</script>

<style scoped>
  .bg-copy-10 {
    height: 17px;
    width: 59px;
    border: 1px solid #E7E7E9;
    border-radius: 4px;
    background-color: #FFFFFF;
    font-family: Roboto;
    font-size: 11px;
    line-height: 17px;
    text-align: center;
  }
  .name {
    height: 17.14px;
    width: 50px;
    opacity: 0.85;
    color: #9B9B9B;
    font-family: Roboto;
    font-size: 11px;
    line-height: 17px;
    text-align: center;
  }
</style>
