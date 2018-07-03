<template>
  <div>
    <card title="Paginated tables">
        <div>
          <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
            <el-select
              class="select-default mb-3"
              style="width: 200px"
              v-model="pagination.perPage"
              placeholder="Per page">
              <el-option
                class="select-default"
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-input type="search"
                      class="mb-3"
                      style="width: 200px"
                      placeholder="Search records"
                      v-model="searchQuery"
                      aria-controls="datatables"/>
          </div>
          <div class="col-sm-12">
            <el-table stripe
                      style="width: 100%;"
                      :data="queriedData"
                      border>
              <el-table-column v-for="column in tableColumns"
                               :key="column.label"
                               :min-width="column.minWidth"
                               :prop="column.prop"
                               :label="column.label">
              </el-table-column>
              <el-table-column
                :min-width="120"
                fixed="right"
                label="Actions">
                <template slot-scope="props">
                  <a v-tooltip.top-center="'Like'" class="btn-info btn-simple btn-link"
                     @click="handleLike(props.$index, props.row)">
                    <i class="fa fa-heart"></i></a>
                  <a v-tooltip.top-center="'Edit'" class="btn-warning btn-simple btn-link"
                     @click="handleEdit(props.$index, props.row)"><i
                    class="fa fa-edit"></i></a>
                  <a v-tooltip.top-center="'Delete'" class="btn-danger btn-simple btn-link"
                     @click="handleDelete(props.$index, props.row)"><i class="fa fa-times"></i></a>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div slot="footer" class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
          <div class="">
            <p class="card-category">Showing {{from + 1}} to {{to}} of {{total}} entries</p>
          </div>
          <l-pagination class="pagination-no-border"
                        v-model="pagination.currentPage"
                        :per-page="pagination.perPage"
                        :total="pagination.total">
          </l-pagination>
        </div>
      </card>

    <div class="row">
      <div class="col-md-12">
        <card>
          <div slot="header">
            <h4 class="card-title">Table Extended</h4>
            <p class="card-category">A table for content management</p>
            <br />
          </div>
          <div class="table-responsive">
              <el-collapse>
                <el-table class="table-bigboy" style="width: 100%" :data="cats">
                  <el-table-column min-width="220">
                    <template slot-scope="{row}">
                      <el-row class="TableRow d-flex">
                        <div class="col-md-4 img-container photo-thumb" v-if="row.photo !== null">
                          <img :src="row.photo" alt="thumb">
                        </div>
                        <div class="col-md-4 img-container photo-thumb" v-else>
                          <img src="/static/img/bastet.png" alt="bastet">
                        </div>
                        <div class="col-md-4 cat-name"><h4>{{row.name}}</h4><p class="card-category">{{row.created | moment("MM-DD-YYYY h:MM a")}}</p></div>
                        <div class="col-md-4 cat-litter">
                          <div class="btn-group">
                            <button type="button" class="btn btn-default btn-outline">Litter:</button>
                            <button type="button" class="btn btn-default btn-outline" >{{row.litter_mates ? row.litter_mates : 'none'}}</button>
                          </div>
                        </div>
                        <div class="col-md-2">
                          <span>ping</span>
                        </div>
                      </el-row>
                      <el-collapse-item title="Press for more info" :name="row.id">
                        <div>
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                      </el-collapse-item>
                    </template>
                  </el-table-column>
                </el-table>
              </el-collapse>


          </div>
        </card>
      </div>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios';
  import { Observable } from 'rxjs';
  import { Table, TableColumn, Select, Option, Collapse, CollapseItem } from 'element-ui'
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
      [CollapseItem.name]: CollapseItem
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
        cats: [],
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
      axios.get(`${process.env.KITTY_URL}/api/v1/cats/`)
        .then(response => {console.log(response.data.results.length); this.cats = response.data.results})
        .catch(error => console.log(error));
    },
    mounted () {
      this.fuseSearch = new Fuse(this.cats, {keys: ['name', 'gender']})
    },
    methods: {
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
      }
    }
  }
</script>
<style lang="scss" scoped>
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

  }
  .cat-litter{

  }
</style>
