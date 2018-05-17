// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Rx from 'rxjs'
import VueRx from 'vue-rx'
import BootstrapNative from 'bootstrap.native';
import VeeValidate from 'vee-validate';
import router from './router/router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';
import 'bootstrap.native/dist/bootstrap-native-v4';

Vue.use(VueRx, Rx);
Vue.use(BootstrapNative);
Vue.use(VeeValidate);
Vue.use(VueAxios, axios);
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
