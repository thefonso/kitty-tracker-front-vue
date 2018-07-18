import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';
import LightBootstrap from './light-bootstrap-main';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap';
// Plugins
import App from './App.vue';
import Rx from 'rxjs';
import VueRx from 'vue-rx';

// router setup
import routes from './routes/routes'
// plugin setup
Vue.use(VueRx, Rx);
Vue.use(VueAxios, axios);
Vue.use(VueMoment, {moment,});
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(LightBootstrap);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active',
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  axios,
  store
});

