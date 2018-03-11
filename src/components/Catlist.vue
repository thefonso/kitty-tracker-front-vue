<template>
  <div>
    <button class="btn btn-primary" @click="onGetCats">Get Cats</button>
    <hr>
    <app-cat v-for="cat in cats" :cat="cat" @catDeleted="onCatDeleted($event)"></app-cat>
  </div>
</template>

<script>
  import Cat from './Cat.vue';
  import axios from 'axios';

  export default {
    data() {
      return {
        cats: []
      }
    },
    methods: {
      onGetCats() {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/v1/cats/' + '?token=' + token)
          .then(
            response => {
              this.cats = response.data.cats;
            }
          )
          .catch(
            error => console.log(error)
          );
      },
      onCatDeleted(id) {
        const position = this.cats.findIndex((element) => {
          return element.id == id;
        });
        this.cats.splice(position, 1);
      }
    },
    components: {
      'app-cat': Cat
    }
  }
</script>
