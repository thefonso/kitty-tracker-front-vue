<template>
    <div class="row">
      <div class="col-md-12">
        <card>
          <div slot="header">
              <h4 class="card-title">Striped table</h4>
              <p class="card-category">Here is a subtitle for this table</p>
          </div>
          <div class="table-responsive table-full-width">
            <el-table class="table-striped" :data="cats">
                <el-table-column label="Id" property="id"></el-table-column>
                <el-table-column label="Name" property="name"></el-table-column>
                <el-table-column label="Gender" property="gender"></el-table-column>
                <el-table-column label="Age" property="age"></el-table-column>
                <el-table-column label="Type" property="cat_type"></el-table-column>
            </el-table>

          </div>
        </card>
      </div>

      <div class="col-md-12">
        <card class="card-plain">
          <div slot="header">
            <h4 class="card-title">Table on Plain Background</h4>
            <p class="card-category">Here is a subtitle for this table</p>
          </div>
          <div class="table-responsive table-full-width">
            <el-table :data="cats">
              <el-table-column label="Id" property="id"></el-table-column>
              <el-table-column label="Name" property="name"></el-table-column>
              <el-table-column label="Gender" property="gender"></el-table-column>
              <el-table-column label="Age" property="age"></el-table-column>
              <el-table-column label="Type" property="cat_type"></el-table-column>
            </el-table>

          </div>
        </card>
      </div>

      <div class="col-md-12">
        <card>
          <div slot="header">
            <h4 class="card-title">Regular Table with Colors</h4>
            <p class="card-category">Here is a subtitle for this table</p>
          </div>
          <div class="table-responsive table-full-width">
            <el-table :row-class-name="tableRowClassName"
                      :data="cats">
              <el-table-column class="success" label="Id" property="id"></el-table-column>
              <el-table-column label="Name" property="name"></el-table-column>
              <el-table-column class="danger" label="Gender" property="gender"></el-table-column>
              <el-table-column class="info" label="Age" property="age"></el-table-column>
              <el-table-column label="Type" property="cat_type"></el-table-column>
            </el-table>

          </div>
        </card>
      </div>

    </div>
</template>
<script>
  import axios from 'axios';
  import { Observable } from 'rxjs';
  import {Table, TableColumn} from 'element-ui'
  export default {
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data () {
      return {
        cats: [],
        page: 1,
        CatIndex: 0,
        tableData: [
        {
          id: 1,
          name: 'Dakota Rice',
          salary: '$36.738',
          country: 'Niger',
          city: 'Oud-Turnhout',
        },
        {
          id: 2,
          name: 'Minerva Hooper',
          salary: '$23,789',
          country: 'Curaçao',
          city: 'Sinaai-Waas'
        },
        {
          id: 3,
          name: 'Sage Rodriguez',
          salary: '$56,142',
          country: 'Netherlands',
          city: 'Baileux'
        },
        {
          id: 4,
          name: 'Philip Chaney',
          salary: '$38,735',
          country: 'Korea, South',
          city: 'Overland Park'
        },
        {
          id: 5,
          name: 'Doris Greene',
          salary: '$63,542',
          country: 'Malawi',
          city: 'Feldkirchen in Kärnten'
        }]
      }
    },
    subscriptions () {
      const cats$ = Observable.from(axios.get(`${process.env.KITTY_URL}/api/v1/cats/`)
        .catch(error => console.log(error)))
        .pluck("data","results");
      return{cats: cats$}
    },
    methods: {
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
      }
    }
  }

</script>
<style>

</style>
