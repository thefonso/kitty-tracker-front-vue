<template>
  <form id="cat_form" @submit.prevent="validateBeforeSubmit">
    <div class="d-flex justify-content-around">
      <!--<div class="divTableHead col-sm-2 center">Photo</div>-->
      <div class="divTableCell col-sm-1 center">
        <div class="form-group">
            <input type="text" onfocus="this.value=''"
                   class="form-control form-control-sm bg-copy-10 name"
                   id="name" placeholder="Name">
        </div>
      </div>
      <div class="divTableCell col-sm-2 center">
        <div class="form-group">
          <select class="bg-copy-10 gender" name="gender" v-model="gender" v-validate="'required'">
            <option disabled value="">Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
      </div>
      <!--TODO: DATE PICKER-->
      <div class="divTableCell col-sm-2 center">
        <div class="form-group">
          <fg-input>
            <el-date-picker v-model="datePicker" type="date"
                            placeholder="Date picker here"
                            :picker-options="pickerOptions1">
            </el-date-picker>
          </fg-input>
        </div>
      </div>
      <div class="divTableCell col-sm-1 center">
        <div class="form-group">
          <select class="bg-copy-10" name="cat_type" v-model="cat_type" v-validate="'required'">
            <option disabled value="">Type</option>
            <option value="O">Orphan Kitten</option>
            <option value="N">Nursing Kitten</option>
            <option value="N" v-if="age !== 'K'">Nursing Mom</option>
            <option value="P" v-if="gender === 'F' && age !== 'K'">Pregnant Mom</option>
            <option value="A">Adult</option>
          </select>
        </div>
      </div>
      <div class="divTableCell col-sm-2 center">
        <div class="form-group">
          <select class="bg-copy-10 litter_name" name="litter_set" v-model="litter_mates">
            <option v-for="item in litter" :value="item.litter_name">{{item.litter_name}}</option>
          </select>
        </div>
      </div>
      <div class="divTableCell col-sm-1 center">
        <div class="form-group">
          <input name="weight" onfocus="this.value=''"
                 v-model="weight" v-validate="'required|integer'"
                 :class="{'input': true, 'is-danger': errors.has('weight') }"
                 class="bg-copy-10 weight" type="text" placeholder="Weight">
        </div>
      </div>
      <div class="divTableCell col-sm-1 center">
        <div class="form-group">
          <select class="bg-copy-10 unit" name="weight_unit" v-model="weight_unit" v-validate="'required|alpha'"
                  :class="{'select': true, 'is-danger': errors.has('weight_unit')}">
            <option disabled value="">Unit</option>
            <option value="G">Grams</option>
            <option value="LB">Pounds</option>
          </select>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import { DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option } from 'element-ui'
  import axios from 'axios';
  import {Observable} from 'rxjs';
  import showSwal from '../Tables/ExtendedTables';
  import {
    Progress as LProgress,
    Switch as LSwitch,
    Radio as LRadio,
    Checkbox as LCheckbox,
    FormGroupInput as FgInput
  } from 'src/components/index'


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
        pickerOptions1: {
          shortcuts: [{
            text: 'Today',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
            {
              text: 'Yesterday',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', date)
              }
            },
            {
              text: 'A week ago',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', date)
              }
            }]
        },
        datePicker: '',
        dateTimePicker: '',
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
      FgInput,
      [DatePicker.name]: DatePicker,
      [TimeSelect.name]: TimeSelect,
      [Slider.name]: Slider,
      [Tag.name]: Tag,
      [Input.name]: Input,
      [Button.name]: Button,
      [Option.name]: Option,
      [Select.name]: Select,
      LSwitch,
      LProgress,
      LRadio,
      LCheckbox
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
  /*add-a-cat menu begins*/
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
  .date_picker{
    height: 17px;
    width: 84px;
  }
  .name{
    width: 59px;
  }
  .gender{
    width: 59px;
  }
  .litter_name{
    width: 122px;
  }
  .weight{
    width: 64px;
  }
  .unit{
    width: 53px;
  }
  /*add-a-cat menu ends*/
</style>
