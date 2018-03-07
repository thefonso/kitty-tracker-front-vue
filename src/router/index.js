import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';
import Cats from '@/components/Cats';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Login,
    // },
    {
      path: '/cats',
      name: 'Cats',
      component: Cats,
    },
  ],
  mode:'history'
});
