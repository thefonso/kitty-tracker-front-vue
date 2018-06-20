// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Rx from 'rxjs'
import VueRx from 'vue-rx'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate';
import router from './router/router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {Pagination} from 'vue-pagination-2';

library.add(faArrowUp);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('pagination', Pagination);
Vue.use(VueRx, Rx);
Vue.use(BootstrapVue);
Vue.use(VeeValidate);
Vue.use(VueAxios, axios);
Vue.use(require('vue-moment'));
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>',
});
