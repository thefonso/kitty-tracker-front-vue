<template>
  <div class="panel panel-default">
    <div class="panel-body">
      PONG
      {{ ct.name }}
    </div>
    <div class="panel-footer">
      <div v-if="editing">
        <input type="text" v-model="editValue">
        <a @click="onUpdate">Save</a>
        <a @click="onCancel">Cancel</a>
      </div>
      <div v-if="!editing">
        <a @click="onEdit">Edit</a>
        <a @click="onDelete">Delete</a>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    props: ['ct'],
    data() {
      return {
        editing: false,
        editValue: this.ct.name
      }
    },
    methods: {
      onEdit() {
        this.editing = true;
        this.editValue = this.ct.name
      },
      onCancel() {
        this.editing = false;
      },
      onDelete() {
        this.$emit('catDeleted', this.ct.id);
        axios.delete('http://localhost:8000/api/v1/cats/' + this.ct.id)
          .then(
            response => console.log(response)
          )
          .catch(
            error => console.log(error)
          )
      },
      onUpdate() {
        this.editing = false;
        this.ct.content = this.editValue;
        axios.put('http://localhost:8000/api/v1/cats/' + this.ct.id,
          {content: this.editValue})
          .then(
            response => console.log(response)
          )
          .catch(
            error => console.log(error)
          );
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
