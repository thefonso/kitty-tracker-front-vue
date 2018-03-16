import axios from 'axios';

export default {
  name: 'MedHistory',
  data() {
    return {
      singleCat: [],
    }
  },
  created() {
    axios.get(`http://localhost:8000/api/v1/cats/${this.$route.params.catID}`)
      .then(request => {
        console.log(request.data);
        this.singleCat = request.data;
      })
      .catch(error => console.log(error));
  }
}
