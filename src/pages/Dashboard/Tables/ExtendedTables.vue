<template>
  <div>
    <!--TODO: have cats list below, displayed via paginated tables module DO THIS LAST-->


    <!--CAT LIST with sub fields-->
    <div class="row">
      <div class="col-md-12">
        <card>
          <div slot="header">
            <div class="d-flex justify-content-between">
              <div>
                <h4 class="card-title">Cats</h4>
                <p class="card-category">All your cats all the time</p>
              </div>
              <div>
                <button class="btn btn-round btn-sm" v-on:click="handleAdd = !handleAdd">Add a Cat</button>
              </div>
            </div>
            <br />
          </div>
          <Wizard v-show="handleAdd"></Wizard>
          <div class="table-responsive">
            <div id="accordion">
              <div class="card" v-for="cat in cats">
                <div class="card-header" :id="'headingOne'+cat.id">

                  <div role="button" style="width: 100%" class="btn btn-link" v-on:click="getMedications(cat.name); getFeedings(cat.name)"
                       data-toggle="collapse"
                       :data-target="'#collapseOne'+cat.id"
                       aria-expanded="false"
                       :aria-controls="'collapseOne'+cat.id">
                    <div class="table-bigboy" style="width: 100%">
                      <table class="col-sm-12">
                        <template>
                          <div class="d-flex justify-content-between primary-cat-row" role="button">
                            <div class="col-md-2 img-container photo-thumb" v-if="cat.photo !== null">
                              <img :src="cat.photo" alt="thumb">
                            </div>
                            <div class="col-md-2 img-container photo-thumb" v-else>
                              <img src="/static/img/bastet.png" alt="bastet">
                            </div>
                            <div class="col-md-4 cat-name">
                              <h4>{{cat.name}}</h4>
                              <p>added: {{cat.created | moment("MM-DD-YYYY h:MM a")}}</p>
                              <div class="col-sm-12" style="border: 1px solid darkgrey; display: table" >
                                <div style="display: table-row-group">
                                  <div class="card-category" style="display: table-row">
                                    <div class="cell" style="display: table-cell">weight</div>
                                    <div class="cell" style="display: table-cell">gender</div>
                                    <div class="cell" style="display: table-cell">age</div>
                                    <div class="cell" style="display: table-cell">type</div>
                                  </div>
                                </div>
                                <div style="display: table-row-group">
                                  <div class="table-striped" style="display: table-row">
                                    <div style="display: table-cell">{{cat.weight}}</div>
                                    <div style="display: table-cell">{{cat.gender}}</div>
                                    <div style="display: table-cell">{{cat.age}}</div>
                                    <div style="display: table-cell">{{cat.cat_type}}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-4 cat-litter">
                              <div class="btn-group" v-if="cat.litter_mates !== null">
                                <button type="button" class="btn btn-warning btn-outline">Litter:</button>
                                <button type="button" class="btn btn-warning btn-outline">{{cat.litter_mates ? cat.litter_mates : 'none'}}</button>
                              </div>
                              <div class="btn-group" v-else>
                                <button type="button" class="btn btn-default btn-outline">Litter:</button>
                                <button type="button" class="btn btn-default btn-outline">{{cat.litter_mates ? cat.litter_mates : 'none'}}</button>
                              </div>
                            </div>
                            <div class="col-md-2 cat-actions">
                              <div class="cell">
                                <a class="btn-info btn-simple btn-link" v-tooltip.top-center="'Edit'"
                                   @click="handleEdit(cat.id, cat.name)">
                                  <i class="fa fa-edit"></i>
                                </a>
                                <a class="btn-danger btn-simple btn-link" v-tooltip.top-center="'Delete'"
                                   @click="handleDelete(cat.id, cat.name)">
                                  <i class="fa fa-times"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                          <!--TODO: old sub card was located here-->
                        </template>
                      </table>
                    </div>
                  </div>

                </div>
                <!--TODO: new sub row here-->
                <div :id="'collapseOne'+cat.id" class="collapse" :aria-labelledby="'headingOne'+cat.id" data-parent="#accordion">
                  <card>
                    <vue-tabs value="Description">
                      <v-tab title="Feedings" style="width: 100%;">
                        <div class="table-responsive-sm">
                          <table class="table table-striped table-bordered">
                            <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">WBF</th>
                              <th scope="col">AFT</th>
                              <th scope="col">FT</th>
                              <th scope="col">ST</th>
                              <th scope="col">STT</th>
                              <th scope="col">Actons</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="fed in catFeedings">
                              <th scope="row">{{fed.id}}</th>
                              <td>{{fed.weight_before_food}}</td>
                              <td>{{fed.amount_of_food_taken}}</td>
                              <td>{{fed.food_type}}</td>
                              <td>{{fed.stimulated}}</td>
                              <td>{{fed.stimulation_type}}</td>
                              <td>
                                <button class="btn btn-sm btn-info" @click="feedEdit(med.id, false)">Edit</button>
                                <button class="btn btn-sm btn-danger" @click="feedEdit(med.id, false)">Delete</button>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </v-tab>
                      <v-tab title="Medications">
                        <div class="table-responsive table-full-width" v-if="showRow">
                          <card class="stacked-form" v-for="med in catMedications" :key="med.id">
                            <form :id="'form'+med.id" @submit.prevent="validateMedicationsBeforeSubmit(med.id, med.name, 'edit')">
                              <div class="d-flex justify-content-start">
                                <div class="col-md-1">
                                  <fg-input v-if="!med.showRow" :form="'form'+med.id" name="id" :value="med.id" label="ID"></fg-input>
                                  <span v-if="med.showRow">{{med.id}}</span>
                                </div>
                                <div class="col-md-2">
                                  <fg-input v-if="!med.showRow" :form="'form'+med.id" name="name" v-validate="'required'" label="Name" v-model="name" type="text" :placeholder="med.name" :error="getError('requiredText')"></fg-input>
                                  <span v-if="med.showRow">{{med.name}}</span>
                                </div>
                                <div class="col-md-2">
                                  <fg-input v-if="!med.showRow" :form="'form'+med.id" name="duration"  v-validate="'required'" label="Duration" v-model="duration" type="text" :placeholder="med.duration" :error="getError('duration')"></fg-input>
                                  <span v-if="med.showRow">{{med.duration}}</span>
                                </div>
                                <div class="col-md-1">
                                  <fg-input v-if="!med.showRow" :form="'form'+med.id" name="frequency" v-validate="'required|integer'" v-model="frequency" :error="getError('frequency')" label="Freq." type="text" :placeholder="med.frequency"></fg-input>
                                  <span v-if="med.showRow">{{med.frequency}}</span>
                                </div>
                                <div class="col-md-1">
                                  <fg-input v-if="!med.showRow" :form="'form'+med.id" name="dosage" v-validate="'required|integer'" v-model="dosage" :error="getError('dosage')" label="Dosage" type="text" :placeholder="med.dosage"></fg-input>
                                  <span v-if="med.showRow">{{med.dosage}}</span>
                                </div>
                                <div class="col-md-2">
                                  <fg-input v-if="!med.showRow" :form="'form'+med.id" name="notes" v-model="notes" :error="getError('notes')" label="Notes" type="textarea" :placeholder="med.notes"></fg-input>
                                  <span v-if="med.showRow">{{med.notes}}</span>
                                </div>
                                <div class="col-md-1 d-flex align-items-center">
                                  <button class="btn btn-sm btn-info" @click='med.showRow = !med.showRow'><span v-if="med.showRow">Edit</span><span v-if="!med.showRow">Cancel</span></button>
                                  <button type="submit" class="btn btn-sm btn-info" v-if="!med.showRow">Submit</button>
                                </div>
                              </div>
                            </form>
                          </card>
                        </div>

                      </v-tab>
                    </vue-tabs>
                  </card>
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>
    </div><!--CAT LIST with sub fields ENDS-->
  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios';
  import { Observable } from 'rxjs';
  import swal from 'sweetalert2'
  import { Table, TableColumn, Select, Option, Collapse, CollapseItem, Row, Aside, Main, Button} from 'element-ui'
  import {Pagination as LPagination} from 'src/components/index'
  import Fuse from 'fuse.js'
  import LSwitch from 'src/components/Switch.vue'
  import VueTabs from 'vue-nav-tabs'
  import Wizard from  '../Forms/Wizard'

  Vue.use(VueTabs);

  export default{
    components: {
      LSwitch,
      LPagination,
      [Button.name]: Button,
      [Select.name]: Select,
      [Option.name]: Option,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Collapse.name]: Collapse,
      [CollapseItem.name]: CollapseItem,
      [Row.name]: Row,
      [Aside.name]: Aside,
      [Main.name]: Main,
      Wizard,
    },
    computed: {
      pagedData () {
        return this.cats.slice(this.from, this.to)
      },
      /***
       * Searches through table data and returns a paginated array.
       * Note that this should not be used for table with a lot of data as it might be slow!
       * Do the search and the pagination on the server and display the data retrieved from server instead.
       * @returns {computed.pagedData}
       */
      queriedData () {
        let result = this.cats
        if (this.searchQuery !== '') {
          result = this.fuseSearch.search(this.searchQuery)
          this.pagination.total = result.length
        }
        return result.slice(this.from, this.to)
      },
      to () {
        let highBound = this.from + this.pagination.perPage
        if (this.total < highBound) {
          highBound = this.total
        }
        return highBound
      },
      from () {
        return this.pagination.perPage * (this.pagination.currentPage - 1)
      },
      total () {
        this.pagination.total = this.cats.length
        return this.cats.length
      }
    },
    data () {
      return {
        activeName: 'first',
        cat: '',
        cats: [],
        catFeedings: [],
        catMedications: [],
        medToEdit: [],
        feedToEdit: [],
        page: 1,
        CatIndex: 0,
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
          total: 0
        },
        searchQuery: '',
        propsToSearch: ['name', 'gender', 'age'],
        tableColumns: [
          {
            prop: 'name',
            label: 'Name',
            minWidth: 200
          },
          {
            prop: 'gender',
            label: 'Gender',
            minWidth: 250
          },
          {
            prop: 'age',
            label: 'Age',
            minWidth: 100
          },
          {
            prop: 'cat_type',
            label: 'Type',
            minWidth: 120
          }
        ],
        fuseSearch: null,
        weight_before_food: '',
        weight_after_food: '',
        amount_of_food_taken: '',
        food_type: '',
        notes:    '',
        stimulated: '',
        stimulation_type: '',
        showSuccess: false,
        showDanger: false,
        constant: 0,
        thisCat: [],
        dismissSecs: 4,
        dismissCountDown: 0,
        dismissCountDown2: 0,
        nursing: false,
        handleAdd: false,
        showRow: true,
        name:   '',
        duration: '',
        frequency: '',
        dosage_unit: 'ML',
        dosage:    '',
      }
    },
    beforeMount () {
      this.getCats();
    },
    mounted () {
      this.fuseSearch = new Fuse(this.cats, {keys: ['name', 'gender']})
    },
    methods: {
      showSwal (type) {
        if (type === 'basic') {
          swal({
            title: `Here's a message!`,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success btn-fill'
          })
        } else if (type === 'title-and-text') {
          swal({
            title: `Here's a message!`,
            text: `It's pretty, isn't it?`,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-info btn-fill'
          })
        } else if (type === 'success-message') {
          swal({
            title: `Good job!`,
            text: 'You clicked the button!',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success btn-fill',
            type: 'success'
          })
        } else if (type === 'warning-message-and-confirmation') {
          swal({
            title: 'Are you sure?',
            text: `You won't be able to revert this!`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success btn-fill',
            cancelButtonClass: 'btn btn-danger btn-fill',
            confirmButtonText: 'Yes, delete it!',
            buttonsStyling: false
          }).then(function () {
            swal({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              type: 'success',
              confirmButtonClass: 'btn btn-success btn-fill',
              buttonsStyling: false
            })
          })
        } else if (type === 'warning-message-and-cancel') {
          swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
            confirmButtonClass: 'btn btn-success btn-fill',
            cancelButtonClass: 'btn btn-danger btn-fill',
            buttonsStyling: false
          }).then(function () {
            swal({
              title: 'Deleted!',
              text: 'Your imaginary file has been deleted.',
              type: 'success',
              confirmButtonClass: 'btn btn-success btn-fill',
              buttonsStyling: false
            })
          }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
              swal({
                title: 'Cancelled',
                text: 'Your imaginary file is safe :)',
                type: 'error',
                confirmButtonClass: 'btn btn-info btn-fill',
                buttonsStyling: false
              })
            }
          })
        } else if (type === 'custom-html') {
          swal({
            title: 'HTML example',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success btn-fill',
            html: 'You can use <b>bold text</b>, ' +
            '<a href="http://github.com">links</a> ' +
            'and other HTML tags'
          })
        } else if (type === 'auto-close') {
          swal({
            title: 'Auto close alert!',
            text: 'I will close in 2 seconds.',
            timer: 2000,
            showConfirmButton: false
          })
        } else if (type === 'input-field') {
          swal({
            title: 'Input something',
            html: '<div class="form-group">' +
            '<input id="input-field" type="text" class="form-control" />' +
            '</div>',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success btn-fill',
            cancelButtonClass: 'btn btn-danger btn-fill',
            buttonsStyling: false
          }).then(function (result) {
            swal({
              type: 'success',
              html: 'You entered',
              confirmButtonClass: 'btn btn-success btn-fill',
              buttonsStyling: false

            })
          }).catch(swal.noop)
        }
      },
      getError (fieldName) {
        return this.errors.first(fieldName)
      },
      getCats () {
        axios.get(`${process.env.KITTY_URL}/api/v1/cats/`)
          .then(response => {this.cats = response.data.results})
          .catch(error => console.log(error));
      },
      getFeedings(value) {
        axios.get(`${process.env.KITTY_URL}/api/v1/feedings/?cat__slug&cat__name=${value}`)
          .then(response => {console.log(response.data.results); this.catFeedings = response.data.results})
          .catch(error => console.log(error));
      },
      postFeedings(catID, catName) {
        axios.post(`${process.env.KITTY_URL}/api/v1/feedings/`,{
          cat: {id: catID, name: catName},
          weight_unit_measure: 'G',
          weight_before_food: this.weight_before_food,
          food_unit_measure: 'G',
          amount_of_food_taken: this.amount_of_food_taken,
          food_type: this.food_type,
          weight_after_food: this.weight_after_food,
          stimulated: this.stimulated,
          stimulation_type: this.stimulation_type,
          notes: this.notes,
        })
          .then(response => {
            console.log(response);
            response.status === 201 ? this.showSwal('auto-close') : this.showSwal('success-message');
          })
          .catch(error => {
            console.log(error);
            this.showSwal('auto-close');
          })
      },
      postFeedingsMom(catID, catName) {
        axios.post(`${process.env.KITTY_URL}/api/v1/feedings/`,{
          cat: {id: catID, name: catName},
          weight_unit_measure: 'G',
          weight_before_food: '0',
          food_unit_measure: 'G',
          amount_of_food_taken: '0',
          food_type: this.food_type,
          weight_after_food: this.weight_after_food,
          stimulated: false,
          stimulation_type: 'NA',
          notes: 'kitten',
        })
          .then(response => {
            console.log(response);
            response.status === 201 ? this.showAlert() : this.showAlert2();
          })
          .catch(error => {
            console.log(error);
            this.dismissCountDown = true;
            this.showAlert();
          })
      },
      getMedications(value) {
        axios.get(`${process.env.KITTY_URL}/api/v1/medications/?cat__slug=&cat__name=${value}`)
          .then(response => {console.log("catMedications: ");console.log(response.data.results); this.catMedications = response.data.results})
          .catch(error => console.log(error));
      },
      addMedications(catID, catName){
        axios.post(`${process.env.KITTY_URL}/api/v1/medications/`,{
          cat: {id: catID, name: catName},
          name: this.name,
          duration: this.duration,
          frequency: this.frequency,
          dosage_unit: 'ML',
          dosage: this.dosage,
          notes: this.notes
        })
          .then(response => {
            console.log(response);
            response.status === 201 ? this.showSwal('success-message') : this.showSwal('auto-close');
            this.handleEdit(true);
          })
          .catch(error => {
            console.log(error);
            this.showSwal('auto-close');
          })
      },
      editMedications(catID, catName){
        console.log("edit meds called:");
        axios.put(`${process.env.KITTY_URL}/api/v1/medications/`,{
          cat: {id: catID, name: catName},
          name: this.name,
          duration: this.duration,
          frequency: this.frequency,
          dosage_unit: 'ML',
          dosage: this.dosage,
          notes: this.notes
        })
          .then(response => {
            console.log("editMedications success");
            console.log(response);
            response.status === 201 ? this.showSwal('success-message') : this.showSwal('auto-close');
            this.handleEdit(true);
          })
          .catch(error => {
            console.log(error);
            this.showSwal('auto-close');
          })
      },
      validateMedicationsBeforeSubmit(catID, catName) {
        this.$validator.validateAll().then((result) => {
          if (result) {
            editMedications(catID, catName);
            console.log('sent to edit: ');
          }else{console.log('it blew up: ');}
        });
      },
      handleLike (index, row) {
        alert(`You want to like ${row.name}`)
      },
      handleEdit (bool) {
        // map / filter / reduce
        this.showRow = bool;
        console.log(this.showRow);
      },
      testSubmit(one,two,three){
        console.log(one,two,three);
      },
      medEdit (medID, bool) {
        // map / filter / reduce
        this.showRow = bool;
        this.medToEdit = this.catMedications.filter(function(medToChange){
          return medToChange.id == medID;
        });
      },
      feedEdit (fedID, bool) {
        // map / filter / reduce
        this.showRow = bool;
        this.feedToEdit = this.catFeedings.filter(function(fedToChange){
          return fedToChange.id == medID;
        });
      },
      handleDelete (index, row) {
        alert(`You want to delete ${index} ${row}`);
        console.log(index);
        // let indexToDelete = this.cats.findIndex((tableRow) => tableRow.id === row.id);
        // if (indexToDelete >= 0) {
        //   this.cats.splice(indexToDelete, 1)
        // }
      },
      getSummaries (param) {
        const { columns } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = 'Total'
          } else if (index < columns.length - 1) {
            sums[index] = ''
          } else {
            let sum = 0
            this.productsTable.forEach((obj) => {
              sum += obj.quantity * obj.price
            })
            sums[index] = `€ ${sum}`
          }
        })
        return sums
      },
      tableRowClassName (row, index) {
        if (index === 0) {
          return 'success'
        } else if (index === 2) {
          return 'info'
        } else if (index === 4) {
          return 'danger'
        } else if (index === 6) {
          return 'warning'
        }
        return ''
      },
    }
  }
</script>
<style lang="scss" scoped>
  .el-collapse-item__header{
    border-bottom: none;
  }
  .photo-thumb img{
    width: 100px;
    height: 100px;
  }
  // css transition for tabs
  .vue-tabs .tab-content {
    padding-top: 10px;
    min-height: 100px;
    display: flex; // to avoid horizontal scroll when animating
    .tab-container {
      display: block;
      animation: fadeIn 0.5s;
    }
  }
  .TableRow{
    display: inline-flex;
  }
  .cat-name{
    text-align: center;
  }
  .cat-actions{
    z-index: 2;
    transform-style: preserve-3d;
  }
  .primary-cat-row{
    z-index: 1;
  }
</style>
