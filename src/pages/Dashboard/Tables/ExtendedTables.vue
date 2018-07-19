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
                <button id="add-a-cat" class="btn btn-round btn-sm" v-on:click="handleAdd = !handleAdd">Add a Cat</button>
                <button id="reload-cats" class="btn btn-round btn-sm" style="display:none;" v-on:click="getCats">Add a Cat2</button>
              </div>
            </div>
            <br />
          </div>
          <!--TODO: ADD a Cat is here-->
          <Wizard v-show="handleAdd"></Wizard>
          <div class="table-responsive">
            <div id="accordion">
              <div class="card" v-for="cat in sortedCats" :key="cat.id">
                <div class="card-header" :id="'headingOne'+cat.id">
<!--TODO: CAT big one begins here-->
                  <div role="button" style="width: 100%" class="btn btn-link" v-on:click="getMedications(cat.name); getFeedings(cat.name)"
                       data-toggle="collapse"
                       :data-target="'#collapseOne'+cat.id"
                       aria-expanded="false"
                       :aria-controls="'collapseOne'+cat.id">
                    <div class="table-bigboy" style="width: 100%">
                      <table class="col-sm-12">
                        <template>
                          <div class="d-flex justify-content-start primary-cat-row" role="button">
                            <div class="col-md-2 img-container photo-thumb" v-if="cat.photo !== null">
                              <img :src="cat.photo" alt="thumb" class="rounded-circle img-fluid max-width: 100%;height: auto;">
                            </div>
                            <div class="col-md-2 img-container photo-thumb" v-else>
                              <img src="/static/img/bastet.png" alt="bastet">
                            </div>
                            <div class="col-md-2 cat-name">
                              <h4 style="color: #000;text-transform: capitalize;">{{cat.name}}</h4>
                              <div class="col-sm-12" style="border: 0px solid darkgrey; display: table" >
                                <div class="d-flex justify-content-center">
                                  <div class="table-striped" style="display: table-row">
                                    <div style="display: table-cell">{{cat.age}}</div>
                                    <div style="display: table-cell">-</div>
                                    <div style="display: table-cell">{{cat.weight}}</div>
                                    <div style="display: table-cell">{{cat.gender}}</div>
                                    <div style="display: table-cell">{{cat.cat_type}}</div>
                                  </div>
                                </div>
                              </div>
                              <span v-if="cat.gender === 'M' " style="color: black;">Male</span>
                              <span v-if="cat.gender === 'F' " style="color: black;">Female</span>
                              <p style="color: black;">{{cat.birthday | moment("from", "now", true)}}</p>
                            </div>
                            <!--TODO chart goes here-->
                            <div class="col-md-3"><GattoChart></GattoChart></div>
                            <!--<div class="col-md-3"><span></span></div>-->
                            <div class="col-md-3 cat-litter">
                              <div class="btn-group" v-if="cat.litter_mates !== null">
                                <button type="button" class="btn btn-warning btn-outline">Litter:</button>
                                <button type="button" class="btn btn-warning btn-outline">{{cat.litter_mates ? cat.litter_mates : 'none'}}</button>
                              </div>
                              <div class="btn-group" v-else>
                                <button type="button" class="btn btn-default btn-outline">Litter:</button>
                                <button type="button" class="btn btn-default btn-outline">{{cat.litter_mates ? cat.litter_mates : 'none'}}</button>
                              </div>
                            </div>
                            <div class="col-md-2 cat-actions d-flex justify-content-end">
                              <div class="cell">
                                <!--<a class="btn-info btn-simple btn-link" v-tooltip.top-center="'Edit'"-->
                                   <!--@click="handleEdit(cat.id, cat.name)">-->
                                  <!--<i class="fa fa-edit"></i>-->
                                <!--</a>-->
                                <a class="btn-danger btn-simple btn-link" v-tooltip.top-center="'Delete'"
                                   @click="handleDelete(cat.id, cat.name, 'catRow')">
                                  <i class="fa fa-times"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                        </template>
                      </table>
                    </div>
                  </div>
<!--TODO: CAT big one ends here-->
                </div>
<!--TODO: Sub rows START here-->
                <div :id="'collapseOne'+cat.id" class="collapse" :aria-labelledby="'headingOne'+cat.id" data-parent="#accordion">
                  <card>
                    <vue-tabs value="Description">
                      <v-tab title="Feedings">
                        <div class="table table-striped table-bordered">
                            <div class="medRow d-flex justify-content-start top-row">
                              <div class="col-md-1">#</div>
                              <div class="col-md-1">FT</div>
                              <div class="col-md-1">WBF</div>
                              <div class="col-md-1">AFT</div>
                              <div class="col-md-1">WAF</div>
                              <div class="col-md-1">ST</div>
                              <div class="col-md-2">STT</div>
                              <div class="col-md-2">Actions</div>
                            </div>
                            <div id="feedtable" class="" v-for="fed in catFeedings" :key="fed.id">
                              <form :id="'form'+fed.id" @submit.prevent="updateDeleteFeedsSubmit(fed.id, fed.name, cat.id, cat.name)">
                                <div class="medRow d-flex justify-content-start">
                                  <div class="col-md-1">
                                    <fg-input v-if="!fed.showRow" :form="'form'+fed.id" name="id" :value="fed.id">{{fed.id}}</fg-input>
                                    <span v-if="fed.showRow">{{fed.id}}</span>
                                  </div>
                                  <div class="col-md-1">
                                    <fg-input v-if="!fed.showRow" :form="'form'+fed.id" name="food_type" v-validate="'required'" v-model="food_type" type="text" :placeholder="fed.food_type" :error="getError('food_type')"></fg-input>
                                    <span v-if="fed.showRow">{{fed.food_type}}</span>
                                  </div>
                                  <div class="col-md-1">
                                    <fg-input v-if="!fed.showRow" :form="'form'+fed.id" name="weight_before_food" v-validate="'required'" v-model="weight_before_food" type="text" :placeholder="fed.weight_before_food" :error="getError('weight_before_food')"></fg-input>
                                    <span v-if="fed.showRow">{{fed.weight_before_food}}</span>
                                  </div>
                                  <div class="col-md-1">
                                    <fg-input v-if="!fed.showRow && food_type !== 'MN'" :form="'form'+fed.id" name="amount_of_food_taken"  v-validate="'required'" v-model="amount_of_food_taken" type="text" :placeholder="fed.amount_of_food_taken" :error="getError('amount_of_food_taken')"></fg-input>
                                    <span v-if="fed.showRow">{{fed.amount_of_food_taken}}</span>
                                  </div>
                                  <div class="col-md-1">
                                    <fg-input v-if="!fed.showRow" :form="'form'+fed.id" name="weight_after_food" v-model="weight_after_food" v-validate="'required|integer'"  :placeholder="fed.weight_after_food":error="getError('weight_after_food')"/>
                                    <span v-if="fed.showRow">{{fed.weight_after_food}}</span>
                                  </div>
                                  <div class="col-md-1">
                                    <fg-input v-if="!fed.showRow" :form="'form'+fed.id" name="stimulated" v-validate="'required'" v-model="stimulated" :error="getError('stimulated')" type="text" :placeholder="fed.stimulated"></fg-input>
                                    <span v-if="fed.showRow">{{fed.stimulated}}</span>
                                  </div>
                                  <div class="col-md-2">
                                    <fg-input v-if="!fed.showRow" :form="'form'+fed.id" name="stimulation_type" v-validate="'required'" v-model="stimulation_type" :error="getError('stimulation_type')" type="text" :placeholder="fed.stimulation_type"></fg-input>
                                    <span v-if="fed.showRow">{{fed.stimulation_type}}</span>
                                  </div>
                                  <div class="col-md-3 d-flex align-items-center cancel-submit">
                                    <!--<button class="btn btn-sm btn-info" @click='fed.showRow = !fed.showRow' v-if="fed.showRow">Edit</button>-->
                                    <button class="btn btn-sm btn-warning" @click='fed.showRow = !fed.showRow' v-if="!fed.showRow">Cancel</button>
                                    <button type="submit" class="btn btn-sm btn-success" v-if="!fed.showRow">Submit</button>
                                    <button type="submit" class="btn btn-sm btn-danger" v-if="fed.showRow" @click="handleDelete(fed.id, fed.name, 'feedingRow')">Delete</button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          <!--TODO: ADD a recorded FEEDING-->
                          <!--<form id="formaddfeed">-->
                            <div class="fedRow d-flex justify-content-start">
                              <div class="col-md-1">&nbsp;</div>
                              <div class="col-md-1">
                                <el-select v-if="!showButton" form="formaddfeed" name="food_type" v-validate="'required|alpha'" v-model="food_type"  placeholder="FT" :error="getError('food_type')">
                                  <el-option value="Choose..." selected>Choose...</el-option>
                                  <el-option value="NA" >None / Not Entered</el-option>
                                  <el-option value="MN" >Mom (Nursing)</el-option>
                                  <el-option value="BO" >Bottle</el-option>
                                  <el-option value="BS" >Bottle/Syringe</el-option>
                                  <el-option value="SG" >Syringe Gruel</el-option>
                                  <el-option value="GG" >Syringe Gruel / Gruel</el-option>
                                  <el-option value="G" >Gruel</el-option>
                                </el-select>
                                <span v-if="showButton">&nbsp;</span>
                              </div>
                              <div class="col-md-1">
                                <fg-input name="weight_before_food" id="weight_before_food" v-if="!showButton && food_type !== 'MN'" form="formaddfeed" v-validate="'required|integer'" v-model="weight_before_food" type="text" placeholder="WBF" :error="getError('requiredText')" v-on:change="fivePercenter"/>
                                <span v-if="showButton"> </span>
                                <div v-if="food_type !== 'G' && food_type !== 'MN' && !showButton" class="form-group">
                                   <div id="target_weight_after_food"></div>
                                </div>
                              </div>
                              <div class="col-md-1">
                                <fg-input v-if="!showButton" form="formaddfeed" name="amount_of_food_taken"  v-validate="'required'" v-model="amount_of_food_taken" type="text" placeholder="AFT" :error="getError('amount_of_food_taken')"/>
                                <span v-if="showButton"> </span>
                              </div>
                              <div class="col-md-1">
                                <fg-input v-if="!showButton" name="weight_after_food" v-model="weight_after_food" v-validate="'required|integer'"  id="weight_after_food" placeholder="WAF" :error="getError('weight_after_food')"/>
                                <span v-if="showButton"> </span>
                              </div>
                              <div class="col-md-1">
                                <el-select v-if="!showButton" form="formaddfeed" name="stimulated" v-on:change="checkFoodType(food_type)" v-validate="'required|alpha'" v-model="stimulated"  placeholder="ST" :error="getError('stimulated')">
                                  <el-option value="Choose..." selected>Choose...</el-option>
                                  <el-option value="true">True</el-option>
                                  <el-option value="false">False</el-option>
                                </el-select>
                                <span v-if="showButton">&nbsp;</span></div>
                              <div class="col-md-2 form-group">
                                <el-select v-if="!showButton" form="formaddfeed" name="stimulation_type" id="stimulation_type" v-model="stimulation_type" v-validate="'required|alpha'" :error="getError('stimulation_type')" placeholder="STT">
                                  <el-option value="Choose..." selected>Choose...</el-option>
                                  <el-option value="NA">None / Not Entered</el-option>
                                  <el-option value="UR">Urine</el-option>
                                  <el-option value="FE">Feces</el-option>
                                  <el-option value="UF">Urine/Feces</el-option>
                                </el-select>
                                <span v-if="showButton">&nbsp;</span></div>
                              <div class="col-md-3 fed-submit-buttons">
                                <button class="btn btn-sm btn-info btn-outline" @click='showButton = !showButton' v-if="showButton">Add</button>
                                <button class="btn btn-sm btn-warning" @click='showButton = !showButton' v-if="!showButton">Cancel</button>
                                <!--TODO: make default null values for when "Mom" is selected as Type Of Food taken (TFT)-->
                                <button type="submit" class="btn btn-sm btn-success" v-if="food_type !== 'MN' && !showButton" v-on:click="validateSubmitNoMom(cat.id, cat.name)" @click='showButton = !showButton'>Submit</button>
                                <button type="submit" class="btn btn-sm btn-success" v-if="food_type === 'MN' && !showButton" v-on:click="validateSubmitMom(cat.id, cat.name)">Submit mom</button>
                              </div>
                            </div>
                          <!--</form>-->
                        </div>
                      </v-tab>
                      <v-tab title="Medications">
                        <div class="table table-striped table-bordered" v-if="showRow">
                          <div class="medRow d-flex justify-content-start top-row">
                            <div class="col-md-1">#</div>
                            <div class="col-md-2">Name</div>
                            <div class="col-md-2">Duration</div>
                            <div class="col-md-1">Freq.</div>
                            <div class="col-md-1">Dose</div>
                            <div class="col-md-2">Notes</div>
                            <div class="col-md-3">Actions</div>
                          </div>
                          <div id="medtable" class="" v-for="med in catMedications" :key="med.id">
                            <form :id="'form'+med.id" @submit.prevent="updateDeleteMedsSubmit(med.id, med.name, cat.id, cat.name)">
                              <div class="medRow d-flex justify-content-start">
                                <div class="col-md-1">
                                  <fg-input v-if="!med.showRow" :form="'form'+med.id" name="id" :value="med.id"></fg-input>
                                  <span v-if="med.showRow">{{med.id}}</span>
                                </div>
                                <div class="col-md-2">
                                  <fg-input v-if="!med.showRow" :form="'form'+med.id" name="name" v-validate="'required'" v-model="name" type="text" :placeholder="med.name" :error="getError('requiredText')"></fg-input>
                                  <span v-if="med.showRow">{{med.name}}</span>
                                </div>
                                <div class="col-md-2">
                                  <fg-input v-if="!med.showRow" :form="'form'+med.id" name="duration"  v-validate="'required'" v-model="duration" type="text" :placeholder="med.duration" :error="getError('duration')"></fg-input>
                                  <span v-if="med.showRow">{{med.duration}}</span>
                                </div>
                                <div class="col-md-1">
                                  <fg-input v-if="!med.showRow" :form="'form'+med.id" name="frequency" v-validate="'required|integer'" v-model="frequency" :error="getError('frequency')" type="text" :placeholder="med.frequency"></fg-input>
                                  <span v-if="med.showRow">{{med.frequency}}</span>
                                </div>
                                <div class="col-md-1">
                                  <fg-input v-if="!med.showRow" :form="'form'+med.id" name="dosage" v-validate="'required|integer'" v-model="dosage" :error="getError('dosage')" type="text" :placeholder="med.dosage"></fg-input>
                                  <span v-if="med.showRow">{{med.dosage}}</span>
                                </div>
                                <div class="col-md-2">
                                  <fg-input v-if="!med.showRow" :form="'form'+med.id" name="notes" v-model="notes" :error="getError('notes')" type="textarea" :placeholder="med.notes"></fg-input>
                                  <span v-if="med.showRow">{{med.notes}}</span>
                                </div>
                                <div class="col-md-3 d-flex align-items-center cancel-submit">
                                  <!--<button class="btn btn-sm btn-info" @click='med.showRow = !med.showRow' v-if="med.showRow">Edit</button>-->
                                  <button class="btn btn-sm btn-warning" @click='med.showRow = !med.showRow' v-if="!med.showRow">Cancel</button>
                                  <button type="submit" class="btn btn-sm btn-success" v-if="!med.showRow" @click="handleAdd(med.id, med.name, 'medicationRow')">Submit</button>
                                  <button type="submit" class="btn btn-sm btn-danger" v-if="med.showRow" @click="handleDelete(med.id, med.name, 'medicationRow')">Delete</button>
                                </div>
                              </div>
                            </form>
                          </div>
                          <!--TODO: add a MEDICATION-->
                          <form id="formadd">
                          <div class="medRow d-flex justify-content-start">
                            <div class="col-md-1">&nbsp;</div>
                            <div class="col-md-2">
                              <fg-input v-if="!showButton" form="formadd" name="name" v-validate="'required'" v-model="name" type="text" placeholder="name" :error="getError('requiredText')"></fg-input>
                              <span v-if="showButton">&nbsp;</span>
                            </div>
                            <div class="col-md-2">
                              <fg-input v-if="!showButton" form="formadd" name="duration"  v-validate="'required'" v-model="duration" type="text" placeholder="duration" :error="getError('duration')"></fg-input>
                              <span v-if="showButton">&nbsp;</span>
                            </div>
                            <div class="col-md-1">
                              <fg-input v-if="!showButton" form="formadd" name="frequency" v-validate="'required|integer'" v-model="frequency" :error="getError('frequency')" type="text" placeholder="frequency"></fg-input>
                              <span v-if="showButton">&nbsp;</span>
                            </div>
                            <div class="col-md-1">
                              <fg-input v-if="!showButton" form="formadd" name="dosage" v-validate="'required|integer'" v-model="dosage" :error="getError('dosage')" type="text" placeholder="dosage"></fg-input>
                              <span v-if="showButton">&nbsp;</span>
                            </div>
                            <div class="col-md-2">
                              <fg-input v-if="!showButton" form="formadd" name="notes" v-model="notes" :error="getError('notes')" type="textarea" placeholder="notes"></fg-input>
                              <span v-if="showButton">&nbsp;</span>
                            </div>
                            <div class="col-md-3">
                              <button class="btn btn-sm btn-info btn-outline" @click='showButton = !showButton' v-if="showButton">Add</button>
                              <button type="submit" class="btn btn-sm btn-success" v-if="!showButton" @click='showButton = !showButton' v-on:click="validateMedicationsBeforeSubmit(cat.id, cat.name)">Submit</button>
                              <button class="btn btn-sm btn-warning" @click='showButton = !showButton' v-if="!showButton">Cancel</button>
                            </div>
                          </div>
                          </form>
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
  import GattoChart from 'src/components/GattoChart'
  import Fuse from 'fuse.js'
  import LSwitch from 'src/components/Switch.vue'
  import VueTabs from 'vue-nav-tabs'
  import Wizard from  '../Forms/Wizard'
  import ElSelectDropdown from "element-ui/packages/select/src/select-dropdown";

  Vue.use(VueTabs);

  export default{
    components: {
      GattoChart,
      ElSelectDropdown,
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
        let result = this.cats;
        if (this.searchQuery !== '') {
          result = this.fuseSearch.search(this.searchQuery);
          this.pagination.total = result.length
        }
        return result.slice(this.from, this.to)
      },
      to () {
        let highBound = this.from + this.pagination.perPage;
        if (this.total < highBound) {
          highBound = this.total
        }
        return highBound
      },
      from () {
        return this.pagination.perPage * (this.pagination.currentPage - 1)
      },
      total () {
        this.pagination.total = this.cats.length;
        return this.cats.length
      },
      sortedCats: function() {
        function compare(a, b) {
          if (a.created < b.created)
            return -1;
          if (a.created > b.created)
            return 1;
          return 0;
        }
        return this.cats.sort(compare);
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
        showButton: true,
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
      showSwal (type, message) {
        if (type === 'basic') {
          swal({
            title: message,
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
            text: message,
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
              text: 'Your cat record has been deleted.',
              type: 'success',
              confirmButtonClass: 'btn btn-success btn-fill',
              buttonsStyling: false
            })
          }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
              swal({
                title: 'Cancelled',
                text: 'Your cat record is safe :)',
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
            title: message,
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
      deleteCat (catID) {
        axios.delete(`${process.env.KITTY_URL}/api/v1/cats/${catID}/`)
          .then(response => {console.log("un Gatto gone:");this.cat = response.data.results})
          .catch(error => console.log(error));
      },
      deleteFeeding (feedID) {
        axios.delete(`${process.env.KITTY_URL}/api/v1/feedings/${feedID}/`)
          .then(response => {console.log("feeding gone:"); console.log(response);})
          .catch(error => console.log(error));
      },
      deleteMedication (medID) {
        axios.delete(`${process.env.KITTY_URL}/api/v1/medications/${medID}/`)
          .then(response => {console.log("medication gone:"); console.log(response);})
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
            response.status === 201 ? this.showSwal('success-message','Feeding added') : null;
            this.getFeedings(catName);
          })
          .catch(error => {
            console.log(error);
            this.showSwal('auto-close', error);
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
            response.status === 201 ? console.log("success") : console.log("fail");
            this.getFeedings(catName);
          })
          .catch(error => {
            console.log(error);
            this.dismissCountDown = true;
            console.log("fail");
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
            console.log(response);console.log(this.showButton);
            this.showButton = true;
            response.status === 201 ? this.showSwal('success-message','Medication added') : console.log(response);
            this.getMedications(catName);
          })
          .catch(error => {
            console.log(error);
            this.showSwal('auto-close', error);
          })
      },
      editMedications(medID, medName, catID, catName){
        console.log("edit meds called:");
        axios.put(`${process.env.KITTY_URL}/api/v1/medications/${medID}/`,{
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
            response.status === 201 ? this.showSwal('success-message','record updated') : null;
            this.handleEdit(true);
          })
          .catch(error => {
            console.log(error);
            this.showSwal('auto-close', error);
          })
      },
      editFeedings(medID, medName, catID, catName) {
        axios.put(`${process.env.KITTY_URL}/api/v1/feedings/${medID}/`,{
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
            console.log(response); console.log(medID, medName, catID, catName);
            response.status === 201 ? console.log("error") : this.showSwal('success-message');
          })
          .catch(error => {
            console.log(error);
          })
      },
      feedingsBeforeSubmit(medID, medName, catID, catName) {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.postFeedings(catID, catName);
          }else{console.log('it blew up: ');}
        });
      },
      validateSubmitNoMom(catID, catName) {
        this.$validator.validateAll()
          .then((result) => {
            this.postFeedings(catID, catName);console.log("validatedNoMom: ");console.log(result);
          })
          .catch(error => {
            console.log('it blew up 1: ');
            console.log(error);
        })
      },
      validateSubmitMom(catID, catName) {
        this.$validator.validateAll()
          .then((result) => {
            this.postFeedingsMom(catID, catName);console.log("validatedNoMom: ");console.log(result);
          })
          .catch(error => {
            console.log('it blew up 1: ');
            console.log(error);
          })
      },
      updateDeleteMedsSubmit(medID, medName, catID, catName) {
        this.$validator.validateAll().then((result) => {
          if (result) {
            // this.addMedications(catID, catName);
            this.editMedications(medID, medName, catID, catName);
            console.log("ping");console.log(catID, catName);
          }else{console.log('it blew up: ');}
        });
      },
      updateDeleteFeedsSubmit(fedID, fedName, catID, catName) {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.editFeedings(fedID, fedName, catID, catName);
            console.log("ping");console.log(catID, catName);
          }else{console.log('it blew up: ');}
        });
      },
      validateMedicationsBeforeSubmit(catID, catName) {
        this.$validator.validateAll()
          .then((result) => {
            this.addMedications(catID, catName);
            // this.editMedications(medID, medName, catID, catName);
            console.log("validatedMedications: ");console.log(result);
          })
          .catch(error => {
            console.log('it blew up: ');
            console.log(error);
          });
      },
      handleLike (index, row) {
        this.showSwal.title(`You want to like ${row.name}`)
      },
      changeHandleAdd(value){
        this.handleAdd = value;
        console.log("changeHandleAdd called 1: ")
      },
      handleEdit (bool) {
        // map / filter / reduce
        this.showRow = bool;
        console.log(this.showRow);
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
      handleDelete (id, name, row) {
        // alert(`You want to delete ${name}`);
        this.showSwal('basic', `You want to delete ${name}`);
        if (row === 'catRow'){
          this.showSwal('basic','un gatto gone');
          this.deleteCat(id);//delete cat from database
          let i = this.cats.map(item => item.id).indexOf(id); // find index of your object
          this.cats.splice(i, 1) // remove it from array visually
        }else if (row === 'feedingRow'){
          this.showSwal('basic', 'feeding deleted');
          this.deleteFeeding(id);
          let i = this.catFeedings.map(item => item.id).indexOf(id); // find index of your object
          this.catFeedings.splice(i, 1) // remove it from array visually
        }else if (row === 'medicationRow'){
          this.showSwal('basic', 'medication removed');
          this.deleteMedication(id);
          let i = this.catMedications.map(item => item.id).indexOf(id); // find index of your object
          this.catMedications.splice(i, 1) // remove it from array visually
        }
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
      fivePercenter(){
        let percent_wbf = document.getElementById("weight_before_food").value * 0.05;
        let wbf = Number(document.getElementById("weight_before_food").value);
        console.log(typeof percent_wbf);
        console.log(typeof wbf);
        document.getElementById("target_weight_after_food").innerHTML = wbf + percent_wbf;
      },
      checkFoodType(food_type_taken){
        if (this.stimulated === "false"){
          if (food_type_taken === "BO" || food_type_taken === "BS") {
            // TODO: turn these two alerts into modals?
            this.showSwal('basic','You selected Bottle or Bottle-Syringe: Did you forget to stimulate the kitten?');
          }
        }else{
          if (food_type_taken === "SG" || food_type_taken === "GG" || food_type_taken === "G") {
            this.showSwal('basic','You selected Syringe Gruel, Gruel or Both: Was the kitten stimulated');
          }
        }
      },
    },
    beforeDestroy() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
  }
</script>

<style lang="scss">
  #chartdiv {
    width: 30%;
    height: 210px;
  }
  .fedRow{
    border-bottom: 1px solid #D4D4D4;
  }
  .fedRow div{
    padding: 0;
    margin: 0;
    border-left: 1px solid #D4D4D4;
  }
  .fed-submit-buttons button{
    margin-top: 5px;
    margin-left: 6px;
  }
  #feedtable:nth-child(even){
    background-color: #F2F2F2;;
  }
  #feedtable button{
    margin-right: 5px;
  }
  #medtable:nth-child(even){
    background-color: #F2F2F2;;
  }
  #medtable button{
    margin-right: 5px;
  }
  .medRow{
    border-bottom: 1px solid #D4D4D4;
  }
  .medRow div{
    border-left: 1px solid #D4D4D4;
  }
  .top-row div{
    font-size: 12px;
    text-transform: uppercase;
    color: #9A9A9A;
    font-weight: 400;
    padding-bottom: 5px;
  }
  .cancel-submit button{
    padding-right: 15px;
    display: block;
  }
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
    display: block !important;
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
