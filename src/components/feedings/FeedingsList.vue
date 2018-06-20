<template>
  <div class="meds-table">
    <div class="row">
      <div class="col-sm-1"></div>
      <!--bootstrap-vue-->
      <!--<b-alert class="col-sm-9" variant="warning" dismissible fade :show="dismissCountDown" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">-->
        <!--Kitty does not have <strong>{{food_type}}</strong> as a feeding choice.-->
      <!--</b-alert>-->
      <b-modal ref="myModalRef" hide-header hide-footer title="">
        <div class="d-block text-center">
          <h3>Kitty does not have <strong>{{food_type_name}}</strong> as a feeding choice.</h3>
        </div>
        <b-btn class="mt-3" variant="outline-warning" block @click="hideModal">understood</b-btn>
      </b-modal>

    </div>
    <div class="heading-row">
      <div class="page-heading float-sm-left">Feedings: <span>{{$route.params.catName}}</span></div>
      <div class="float-sm-right" v-if="thisCat[0]">
        <div class="grey">last updated</div>
        <div id="lastup-date">Date: <span>{{thisCat[0].modified | moment("MM-DD-YYYY")}}</span></div>
        <div id="lastup-time">Time: <span>{{thisCat[0].modified | moment("HH:MM a")}}</span></div>
      </div>
    </div>

    <transition name="fade1" appear="">
      <div class="divTable">
        <div class="divTableHeading">
          <div class="divTableRow">
            <div class=" divTableHead col-sm-1">Cat</div>
            <!--<div class="divTableHead col-sm-1 hand" @click="sort('food_type')" v-on:click=" collapsed = !collapsed">Feeding-->
              <!--<i :class="[collapsed ? 'fa-chevron-up' : 'fa-chevron-down', 'fa']"></i>-->
            <!--</div>-->
            <div id="feeding-select" class="divTableHead hand col-sm-3" @click="sort('food_type')" v-on:click=" collapsed = !collapsed">
              <!--<label for="food_type">Feeding</label>-->
                <select name="food_type" id="food_type" class="clearfix" v-model="food_type">
                  <option value="" selected>Feeding</option>
                  <option value="BO">Bottle</option>
                  <option value="BS">Bottle/Syringe</option>
                  <option value="SG">Syringe Gruel</option>
                  <option value="GG">Syringe Gruel / Gruel</option>
                  <option value="G">Gruel</option>
                </select>
              <i :class="[collapsed ? 'fa-chevron-up' : 'fa-chevron-down', 'fa']" class="col-sm-1"></i>
            </div>
            <div class="divTableHead col-sm-2">WBF</div>
            <div class="divTableHead col-sm-2">WAF</div>
            <div class="divTableHead col-sm-1">Stimulated?</div>
            <div class="divTableHead col-sm-1">Stim_type</div>
            <div class="divTableHead hand col-sm-1" @click="sort('created')" v-on:click=" collapsed = !collapsed">Date
              <i :class="[collapsed ? 'fa-chevron-up' : 'fa-chevron-down', 'fa']"></i>
            </div>
          </div>
        </div>
        <transition-group tag="div" name="fade2" class="divTableBody" appear="">
          <div class="divTableRow fadecontent"  v-for="(fed) in sortedCat" :key="fed.id">
            <div class="divTableCell col-sm-1">{{ fed.cat.name }}</div>
            <div class="divTableCell col-sm-3">{{ fed.food_type }}</div>
            <div class="divTableCell col-sm-2">{{ fed.weight_before_food }}</div>
            <div class="divTableCell col-sm-2">{{ fed.weight_after_food }}</div>
            <div class="divTableCell col-sm-1">{{ fed.stimulated }}</div>
            <div class="divTableCell col-sm-1">{{ fed.stimulation_type }}</div>
            <div class="divTableCell col-sm-2">{{ fed.created | moment("MM-DD-YYYY h:MM a")}}</div>
          </div>
        </transition-group>
        <div class="divTableRow">
          <div class="col-sm-1 divTableHead"></div>
          <div class="col-sm-3 divTableHead"></div>
          <div class="col-sm-2 divTableHead"></div>
          <div class="col-sm-2 divTableHead"></div>
          <div class="col-sm-1 divTableHead"></div>
          <div class="col-sm-1 divTableHead"></div>
          <div class="col-sm-2 divTableHead">
            <router-link :to="'/cat/'+$route.params.catID+'/feeding/create/'+$route.params.catName" class="btn btn-primary btn-text float-right">
              <a role="button">Add A Feeding</a>
            </router-link>
          </div>
        </div>
      </div>
    </transition>
    <!--debug: sort={{currentSort}}, dir={{currentSortDir}}-->
  </div>

</template>

<script>
  import axios from 'axios';

  export default {
    name: 'FeedingsList',

    data() {
      return {
        thisCat: [],
        currentSort:'name',
        currentSortDir:'asc',
        collapsed: true,
        loading: false,
        postContent: null,
        food_type: '',
        food_type_name: '',
        foodVal: '',
        dismissSecs: 5,
        dismissCountDown: 0,
      }
    },
    watch: {
      food_type: function () {
        this.fetchApi()
      }
    },
    methods:{
      countDownChanged (dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert () {
        this.dismissCountDown = this.dismissSecs
      },
      foodName(food){
        console.log(food);
        switch (food.value){
          case "G":{
            this.food_type_name = "Gruel";
            break;
          }
          case "GG":{
            this.food_type_name = "Syringe Gruel / Gruel";
            break;
          }
          case "SG":{
            this.food_type_name = "Syringe Gruel";
            break;
          }
          case "BS":{
            this.food_type_name = "Bottle/Syringe";
            break;
          }
          case "BO":{
            this.food_type_name = "Bottle";
            break;
          }
        }
      },
      showModal (food) {
        this.foodName(food);
        // return food_type_name;
        this.$refs.myModalRef.show()
      },
      hideModal () {
        this.$refs.myModalRef.hide()
      },
      sort(s) {
        //if s == current sort, reverse
        if(s === this.currentSort) {
          this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
        }
        this.currentSort = s;
      },
      fetchApi: function(value){
        this.loading = true;
        axios.get(`${process.env.KITTY_URL}/api/v1/feedings/?cat__slug&cat__name=${this.$route.params.catName}&food_type=${this.food_type}`)
          .then(response => {
            console.log(response.data.results.length);
            if(response.data.results.length === 0){
              this.showModal(food_type);
            }else{
              this.thisCat = response.data.results
            }
          })
          .catch(error => console.log(error));

        this.loading = false;
      }
    },
    created() {
      axios.get(`${process.env.KITTY_URL}/api/v1/feedings/?cat__slug&cat__name=${this.$route.params.catName}`)
        .then(response => {
          console.log(response.data.results);
          this.thisCat = response.data.results
        })
        .catch(error => console.log(error));
    },
    computed:{
      sortedCat() {
        return this.thisCat.sort((a,b) => {
          let modifier = 1;
          if(this.currentSortDir === 'desc') modifier = -1;
          if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        });
      }
    },
  }

</script>

<style scoped>
  .hand{
    cursor: pointer;
  }
  .fadecontent{
    opacity: 1;
  }
  .fade1-enter,.fade2-enter,.fade3-enter{
    transform: translateX(20px);
    opacity: 0;
  }
  .fade1-enter-active{
    transition: all 1s ease;
  }
  .fade2-enter-active{
    transition: all 1s ease 0.5s;
  }
  .fade3-enter-active{
    transition: all 1s ease 1s;
  }

  .fade1-leave-active,.fade2-leave-active,.fade3-leave-active{
    opacity: 0;
    transform: translateX(20px);
  }
  .fade1-leave-active{
    transition: all 1s ease;
  }
  .fade2-leave-active{
    transition: all 1s ease 1s;
  }
  .fade3-leave-active{
    transition: all 1s ease 2s;
  }
  #thead th {
    color: black;
  }
  .grey{
    color: grey;
  }
  .heading-row{
    padding-bottom: 7rem;
  }
  .page-heading {
    color: white;
    font-family: "Helvetica Neue";
    font-size: 48px;
    font-weight: bold;
    line-height: 58px;
    margin-bottom: 25px;
  }
  .page-heading > span{
    color: darkgrey;
  }
  .meds-table {
    padding: 3rem 1.5rem;
    text-align: left;
  }
  #feeding-select{
    left: 0px;
    top: 0px;
    text-align: left;
  }
  #feeding-select label{
    float: left;
    margin: 1px;
  }
  #lastup-date{

  }
  #lastup-time{

  }

  /* Div Table */
  .divTable{
    display: table;
    width: 100%;
  }
  .divTableRow {
    display: table-row;
  }
  .divTableHeading {
    background-color: #EEE;
    display: table-header-group;
  }
  .divTableCell, .divTableHead {
    display: inline-block;
    padding: 0.75rem;
    vertical-align: top;
    /*border-top: 1px solid #dee2e6;*/
  }
  .divTableCell img{
    display: block;
    margin: auto;
  }
  .divTableHeading {
    background-color: #EEE;
    display: table-header-group;
    font-weight: bold;
  }
  .divTableFoot {
    background-color: #EEE;
    display: table-footer-group;
    font-weight: bold;
  }
  .divTableBody {
    display: table-row-group;
  }
</style>
