<template>
  <div>
    <!--TODO: have cats list below, displayed via this paginated tables module DO THIS LAST-->
      <!--<card title="Paginated tables">-->
        <!--<div>-->
          <!--<div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">-->
            <!--&lt;!&ndash;number of items per page selector&ndash;&gt;-->
            <!--<el-select-->
              <!--class="select-default mb-3"-->
              <!--style="width: 200px"-->
              <!--v-model="pagination.perPage"-->
              <!--placeholder="Per page">-->
              <!--<el-option-->
                <!--class="select-default"-->
                <!--v-for="item in pagination.perPageOptions"-->
                <!--:key="item"-->
                <!--:label="item"-->
                <!--:value="item">-->
              <!--</el-option>-->
            <!--</el-select>-->
            <!--&lt;!&ndash;search box&ndash;&gt;-->
            <!--<el-input type="search"-->
                      <!--class="mb-3"-->
                      <!--style="width: 200px"-->
                      <!--placeholder="Search records"-->
                      <!--v-model="searchQuery"-->
                      <!--aria-controls="datatables"/>-->
          <!--</div>-->
          <!--<div class="col-sm-12">-->
            <!--<el-table stripe-->
                      <!--style="width: 100%;"-->
                      <!--:data="queriedData"-->
                      <!--border>-->
              <!--&lt;!&ndash;TODO: how to manipulate this block to display full CAT on primary table?&ndash;&gt;-->
              <!--<el-table-column v-for="column in tableColumns"-->
                               <!--:key="column.label"-->
                               <!--:min-width="column.minWidth"-->
                               <!--:prop="column.prop"-->
                               <!--:label="column.label">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--:min-width="120"-->
                <!--fixed="right"-->
                <!--label="Actions">-->
                <!--<template slot-scope="props">-->
                  <!--<a v-tooltip.top-center="'Like'" class="btn-info btn-simple btn-link"-->
                     <!--@click="handleLike(props.$index, props.row)">-->
                    <!--<i class="fa fa-heart"></i></a>-->
                  <!--<a v-tooltip.top-center="'Edit'" class="btn-warning btn-simple btn-link"-->
                     <!--@click="handleEdit(props.$index, props.row)">-->
                    <!--<i class="fa fa-edit"></i></a>-->
                  <!--<a v-tooltip.top-center="'Delete'" class="btn-danger btn-simple btn-link"-->
                     <!--@click="handleDelete(props.$index, props.row)">-->
                    <!--<i class="fa fa-times"></i></a>-->
                <!--</template>-->
              <!--</el-table-column>-->
            <!--</el-table>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div slot="footer" class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">-->
          <!--<div class="">-->
            <!--<p class="card-category">Showing {{from + 1}} to {{to}} of {{total}} entries</p>-->
          <!--</div>-->
          <!--<l-pagination class="pagination-no-border"-->
                        <!--v-model="pagination.currentPage"-->
                        <!--:per-page="pagination.perPage"-->
                        <!--:total="pagination.total">-->
          <!--</l-pagination>-->
        <!--</div>-->
      <!--</card>-->

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
            <div class="card">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    <div class="table-bigboy" style="width: 100%" :data="cats">
                      pong
                    </div>
                  </button>
                </h5>
              </div>
              <!--sub row here-->
              <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
          </div>
          </div>
        </card>
      </div>
    </div>
    <!--CAT LIST with sub fields ENDS-->

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

  }
  .cat-litter{

  }
</style>
