<template>
  <div>
    <!--TODO: have cats list below, displayed via paginated tables module DO THIS LAST-->


  <!--CAT LIST with sub fields-->
    <div class="row">
      <div class="col-md-12">
        <card>
          <div slot="header">
            <h4 class="card-title">Cats</h4>
            <p class="card-category">All your cats all the time</p>
            <br />
          </div>
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
                        <table style="min-width: 220px">
                          <template>
                            <div class="TableRow d-flex" role="button">
                              <div class="col-md-4 img-container photo-thumb" v-if="cat.photo !== null">
                                <img :src="cat.photo" alt="thumb">
                              </div>
                              <div class="col-md-4 img-container photo-thumb" v-else>
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
                            </div>
                            <!--TODO: old sub card was located here-->

                          </template>
                        </table>
                      </div>
                    </div>

                </div>
                <!--sub row here-->
                <div :id="'collapseOne'+cat.id" class="collapse" :aria-labelledby="'headingOne'+cat.id" data-parent="#accordion">

                    <card>
                      <vue-tabs value="Description">
                        <v-tab title="Feedings" style="width: 100%;">
                          <div class="table-responsive-sm">
                            <table class="table table-striped table-bordered" >
                              <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">WBF</th>
                                <th scope="col">AFT</th>
                                <th scope="col">FT</th>
                                <th scope="col">ST</th>
                                <th scope="col">STT</th>
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
                              </tr>
                              </tbody>
                            </table>
                          </div>
                        </v-tab>
                        <v-tab title="Medications">
                          <div class="table-responsive-sm">
                            <table class="table table-striped table-bordered" >
                              <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Duration</th>
                                <th scope="col">Freq</th>
                                <th scope="col">Dosage</th>
                                <th scope="col">Notes</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="med in catMedications">
                                <th scope="row">{{med.id}}</th>
                                <td>{{med.name}}</td>
                                <td>{{med.duration}}</td>
                                <td>{{med.frequency}}</td>
                                <td>{{med.dosage}}</td>
                                <td>{{med.notes}}</td>
                              </tr>
                              </tbody>
                            </table>
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
  import { Table, TableColumn, Select, Option, Collapse, CollapseItem, Row, Aside, Main} from 'element-ui'
  import {Pagination as LPagination} from 'src/components/index'
  import Fuse from 'fuse.js'
  import LSwitch from 'src/components/Switch.vue'
  import VueTabs from 'vue-nav-tabs'

  Vue.use(VueTabs);

  export default{
    components: {
      LSwitch,
      LPagination,
      [Select.name]: Select,
      [Option.name]: Option,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Collapse.name]: Collapse,
      [CollapseItem.name]: CollapseItem,
      [Row.name]: Row,
      [Aside.name]: Aside,
      [Main.name]: Main,
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
        fuseSearch: null
      }
    },
    beforeMount () {
      this.getCats();
    },
    mounted () {
      this.fuseSearch = new Fuse(this.cats, {keys: ['name', 'gender']})
    },
    methods: {
      unaFunc: function(row, expanded){
        if(document.getElementsByClassName('el-table__expand-icon--expanded').length > 0)
          if(expanded)
            document.getElementsByClassName('el-table__expand-icon--expanded')[0].click()
      },
      getCats () {
        axios.get(`${process.env.KITTY_URL}/api/v1/cats/`)
          .then(response => {console.log(response.data.results.length); this.cats = response.data.results})
          .catch(error => console.log(error));
      },
      getFeedings(value) {
        axios.get(`${process.env.KITTY_URL}/api/v1/feedings/?cat__slug&cat__name=${value}`)
          .then(response => {console.log(response.data.results); this.catFeedings = response.data.results})
          .catch(error => console.log(error));
      },
      getMedications(value) {
        axios.get(`${process.env.KITTY_URL}/api/v1/medications/?cat__slug=&cat__name=${value}`)
          .then(response => {console.log(response.data.results); this.catMedications = response.data.results})
          .catch(error => console.log(error));
      },
      handleLike (index, row) {
        alert(`You want to like ${row.name}`)
      },
      handleEdit (index, row) {
        alert(`You want to edit ${row.name}`)
      },
      handleDelete (index, row) {
        let indexToDelete = this.cats.findIndex((tableRow) => tableRow.id === row.id)
        if (indexToDelete >= 0) {
          this.cats.splice(indexToDelete, 1)
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
      myClickEvent() {
        console.log(this.$refs);
        // console.log(myID);
        // const elem = this.$refs.myBtn.$el;
        // elem.click();
        // this.$refs.myBtn.$el.

        // document.getElementById(myID).hidden;
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
  .cat-litter{

  }
</style>
