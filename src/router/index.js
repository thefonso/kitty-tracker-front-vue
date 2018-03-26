import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Logout from '@/components/Logout';
import Cat from '@/components/cats/Cat';
import Catlist from '@/components/cats/Catlist';
import CatCreate from '@/components/cats/CatCreate';
import Feedings from '@/components/feedings/Feedings';
import FeedingsList from '@/components/feedings/FeedingsList';
import MedList from '@/components/medications/MedList';
import Medications from '@/components/medications/Medications';
import MedRecords from '@/components/medications/MedRecords';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', name: 'Login', component: Login },
    { path: '/logout', name: 'Logout', component: Logout },
    // TODO: create SIGNUP component
    // { path: '/signup', name: 'SignUp', component: SignUp },

    // TODO: create CRUD for cat
    { path: '/cat/:catID', name: 'Cat', component: Cat },
    { path: '/catlist', name: 'Catlist', component: Catlist },
    { path: '/catcreate', name: 'CatCreate', component: CatCreate },
    // { path: '/cat/:catID/update', name: 'CatUpdate', component: CatCreate },
    // { path: '/cat/:catID/destroy', name: 'CatDelete', component: CatCreate },
    // TODO: create CRUD for medications
    { path: '/cat/:catID/medications/all', name: 'MedList', component: MedList },
    { path: '/cat/:catID/medications', name: 'Medications', component: Medications },

    // TODO: create CRUD for Feedings
    { path: '/cat/:catID/feedings/:catName/all', name: 'FeedingsList', component: FeedingsList },
    { path: '/cat/:catID/feedings/:catName', name: 'Feedings', component: Feedings },

    // TODO: create CRUD for Feedings
    { path: '/medical_records/:catID/records/:catName/all', name: 'MedRecords', component: MedRecords },
    { path: '/medical_records/create', name: 'MedRecordCreate', component: MedRecords},
    // TODO: create CRUD for medical_records
    // { path: '/medical_records/:catID/update', name: 'MedRecordUpdate', component: MedRecords },
    // { path: '/medical_records/:catID/destroy', name: 'MedRecordDelete', component: MedRecords },
  ],
  mode:'history'
});
