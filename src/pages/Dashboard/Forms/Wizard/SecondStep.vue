<template>
  <transition name="fade">
    <div>
      <h5 class="text-center">Add A Profile Photo</h5>
      <!--second column alerts BEGINS-->
      <div class="row">
        <div class="col-sm-2"></div>

        <b-alert class="col-sm-8" variant="success" dismissible fade :show="showSuccess">
          <strong>Success!</strong> New kitty photo added.
        </b-alert>

        <b-alert class="col-sm-8" variant="danger" dismissible fade :show="showDanger">
          <strong>Problem:</strong> Did you fill out all fields? Are you on the internet?
        </b-alert>

        <div class="col-sm-2"></div>
      </div>
      <!--second column alerts ENDS-->
      <div class="row align-center">
        <div class="col-sm-3"></div>
        <div class="col-sm-6 align-center" :singleCat="singleCat" v-if="singleCat">
          <!--photo upload-->
          <div id="catID" class="panel-body" :singleCat="singleCat" v-if="singleCat">
            <div class="pet-image-box" v-if="singleCat.photo">
              <img v-bind:src="singleCat.photo" alt="" class="pet-image">
            </div>
            <div class="pet-image-box" v-else>
              <img src="static/img/cat_butt.png" alt="" class="pet-image">
            </div>
          </div>
          <div class="pet-name">{{singleCat.name}}</div>
          <input style="display: none" type="file" @change="onFileChanged" ref="fileInput">
          <button class="btn btn-primary" @click="$refs.fileInput.click()">Upload Image</button>
          <!--<input class="btn btn-primary" type="file" @change="onFileChanged">-->
        </div>
        <div class="col-4"></div>
      </div>
    </div>
  </transition>
</template>
<script>
  import axios from 'axios';

  export default {
    name: 'second-step',
    data () {
      return {
        lastCat: '',
        showSuccess: false,
        showDanger: false,
        visible: false,
        singleCat: [],
        defaultImage: {
          type: String,
          default: 'static/img/cat_butt.png'
        },
        catArray: [],
        rootUrl: process.env.KITTY_URL,
        selectedFile: null,
      }
    },
    computed: {
      sortedCats: function() {
        function compare(a, b) {
          if (a.created < b.created)
            return -1;
          if (a.created > b.created)
            return 1;
          return 0;
        }
        return this.catArray.sort(compare);
      }
    },
    created() {
      console.log("cats: ");
      this.fetchCatsList();
      this.timer = setInterval(this.fetchCatsList, 1000)
    },
    methods: {
      getError (fieldName) {
        return this.errors.first(fieldName)
      },
      validate () {
        return this.$validator.validateAll().then(res => {
          this.$emit('on-validated', res, this.model)
          return res
        })
      },
      onFileChanged (event) {
        this.selectedFile = event.target.files[0];
        // console.log(event);
        this.onUpload();
      },
      onUpload() {
        // upload file, get it from this.selectedFile
        const formData = new FormData();
        formData.append('name', this.singleCat.name);
        formData.append('photo', this.selectedFile, this.selectedFile.name);
        axios.put(`${process.env.KITTY_URL}/api/v1/cats/${this.singleCat.id}/`,formData,{
          onUploadProgress: progressEvent => {
            console.log('Upload progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
          }
        })
          .then(response => {
            console.log(response.data.photo);
            console.log(response.status);
            response.status === 200 ? this.showSuccess = true : this.showDanger = true;
            this.singleCat = response.data;
            // NOTE: set a timer to run this line 2 seconds after success response
            setTimeout( () => this.$router.push('/login'), 4000);
          })
          .catch(error => {
            console.log(error);
            this.showDanger = true;
          })
      },
      fetchCatsList: function() {
        axios.get(`${process.env.KITTY_URL}/api/v1/cats/`)
          .then(request => {this.catArray = request.data.results;
            // this.singleCat = catArray[catArray.length - 1];
            this.singleCat = this.sortedCats[this.sortedCats.length -1];
            // console.log(this.singleCat.name);
          })
          .catch(error => console.log(error));
      },
      cancelAutoUpdate: function() { clearInterval(this.timer) }
    },
    mounted(){
      this.visible = true;
    },
    beforeDestroy() {
      clearInterval(this.timer);
      this.cancelAutoUpdate()
    }
  }
</script>
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
    cursor: pointer;
  }

  #pet-content{
    padding-top: 35px;
  }

  /*pet image area*/
  .pet-name {
    height: 88px;
    color: #9B9B9B;
    font-family: "Helvetica Neue";
    font-size: 36px;
    font-weight: bold;
    line-height: 44px;
    text-align: center;
    margin-top: 20px;
  }
  .pet-record {
    color: lightskyblue;
    font-family: "Helvetica Neue";
    font-size: 48px;
    font-weight: bold;
    line-height: 58px;
    text-align: center;
    margin-bottom: 25px;
  }
  .pet-image-box {
    box-sizing: border-box;
    height: 12.167em;
    width: 12.167em;
    border: 1px solid #DDDDDD;
    border-radius: 5px;
    margin:auto;
  }
  .pet-image {
    margin-top: 7px;
    height: 10.917em;
    width: 10.917em;
    border-radius: 1px;
    background-color: #EEEEEE;
  }
  .align-center{
    text-align: center;
  }
</style>

