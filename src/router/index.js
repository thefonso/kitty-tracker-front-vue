import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';
import Logout from '@/components/Logout';
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
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
    },
    // {
    //   path: '/feedings',
    //   name: 'Feedings',
    //   component: Feedings,
    // },
    {
      path: '/cats',
      name: 'Cats',
      component: Cats,
    },
  ],
  mode:'history'
});
