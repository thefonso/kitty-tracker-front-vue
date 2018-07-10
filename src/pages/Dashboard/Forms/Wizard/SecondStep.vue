<template>
  <transition name="fade">
  <div>
    <h5 class="text-center">Add a Profile Photo for your cat.</h5>
    <div class="row align-center">
      <div class="col-sm-3"></div>
      <div class="col-sm-6 align-center" :singleCat="singleCat" v-if="singleCat">
        <!--photo upload-->
        <div id="catID" class="panel-body" :singleCat="singleCat" v-if="singleCat">
          <div class="pet-image-box"><img v-bind:src="singleCat.photo" width="200px" height="200px" alt="" class="pet-image"></div>
        </div>
        <div class="pet-name">{{singleCat.name}}</div>
        <!--<input style="display: none" type="file" @change="onFileChanged" ref="fileInput">-->
        <!--<button class="btn btn-primary" @click="$refs.fileInput.click()">Upload Image</button>-->
        <input class="btn btn-primary" type="file" @change="onFileChanged">
      </div>
      <div class="col-4"></div>
    </div>
  </div>
  </transition>
</template>
<script>
  import axios from 'axios';

  export default {
    name: 'CatPhoto',
    data () {
      return {
        visible: false,
        singleCat: [],
        rootUrl: process.env.KITTY_URL,
        selectedFile: null,
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
        formData.append('name', this.singleCat.name);
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
      }
    },
    mounted(){
      this.visible = true;
    },
    created() {
      axios.get(`${process.env.KITTY_URL}/api/v1/cats/${this.$route.params.catID}`)
        .then(request => {
          console.log(request.data);
          this.singleCat = request.data;
        })
        .catch(error => console.log(error));
    },
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
    height: 266px;
    width: 266px;
    border: 1px solid #DDDDDD;
    border-radius: 5px;
    margin:auto;
  }
  .pet-image {
    margin-top: 7px;
    height: 251px;
    width: 251px;
    border-radius: 1px;
    background-color: #EEEEEE;
  }
  .align-center{
    text-align: center;
  }
</style>

