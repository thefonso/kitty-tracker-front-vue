import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';
import Logout from '@/components/Logout';
import Cat from '@/components/cats/Cat';
import Catlist from '@/components/cats/Catlist';
import CatCreate from '@/components/cats/CatCreate';
import Feedings from '@/components/feedings/Feedings';
import MedList from '@/components/medications/MedList';
import Medications from '@/components/medications/Medications';
import MedRecords from '@/components/medications/MedRecords';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', name: 'Login', component: Login },
    { path: '/hello', name: 'HelloWorld', component: HelloWorld },
    { path: '/logout', name: 'Logout', component: Logout },
    { path: '/cat/:catID', name: 'Cat', component: Cat },
    { path: '/cat/:catID/medications/all', name: 'MedList', component: MedList },
    { path: '/cat/:catID/medications', name: 'Medications', component: Medications },
    { path: '/cat/:catID/feedings', name: 'Feedings', component: Feedings },
    { path: '/catlist', name: 'Catlist', component: Catlist },
    { path: '/catcreate', name: 'CatCreate', component: CatCreate },
    // { path: '/cat/:catID/update', name: 'CatUpdate', component: CatCreate },
    // { path: '/cat/:catID/destroy', name: 'CatDelete', component: CatCreate },
    { path: '/medical_records/create', name: 'MedRecordCreate', component: MedRecords},
    // { path: '/medical_records/:catID/update', name: 'MedRecordUpdate', component: MedRecords },
    // { path: '/medical_records/:catID/destroy', name: 'MedRecordDelete', component: MedRecords },
  ],
  mode:'history'
});
