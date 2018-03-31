import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Logout from '@/components/Logout';
import Cat from '@/components/cats/Cat';
import Catlist from '@/components/cats/Catlist';
import CatCreate from '@/components/cats/CatCreate';
import Medication from '@/components/medications/Medication';
import MedicationList from '@/components/medications/MedicationList';
import MedicationCreate from '@/components/medications/MedicationCreate';
import FeedingsList from '@/components/feedings/FeedingsList';
import FeedingCreate from '@/components/feedings/FeedingCreate';
import MedRecordList from '@/components/medrecords/MedRecordList';
import MedRecordCreate from '@/components/medrecords/MedRecordCreate';

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
    { path: '/cat/:catID/medication', name: 'Medication', component: Medication },
    { path: '/cat/:catID/medications/all/:catName', name: 'MedicationList', component: MedicationList },
    { path: '/cat/:catID/medication/create', name: 'MedicationCreate', component: MedicationCreate },
    // { path: '/cat/:catID/medications/update', name: 'MedicationUpdate', component: MedicationUpdate },
    // { path: '/cat/:catID/medications/destroy', name: 'MedicationDelete', component: MedicationDestroy },
    // TODO: create CRUD for Feedings
    { path: '/cat/:catID/feedings/all/:catName', name: 'FeedingsList', component: FeedingsList },
    { path: '/cat/:catID/feeding/create/:catName', name: 'FeedingCreate', component: FeedingCreate },
    // { path: '/cat/:catID/feeding/Update', name: 'FeedingUpdate', component: FeedingUpdate },
    // { path: '/cat/:catID/feeding/Destroy', name: 'FeedingDestroy', component: FeedingDestroy },
    // TODO: create CRUD for medical_records
    { path: '/cat/:catID/medical_records/all/:catName', name: 'MedRecordList', component: MedRecordList },
    { path: '/cat/:catID/medical_records/create', name: 'MedRecordCreate', component: MedRecordCreate},
    // { path: '/medical_records/:catID/update', name: 'MedRecordUpdate', component: MedRecords },
    // { path: '/medical_records/:catID/destroy', name: 'MedRecordDelete', component: MedRecords },
  ],
  mode:'history'
});
