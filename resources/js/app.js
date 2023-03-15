import {createApp} from 'vue';
import App from './App.vue'
import {createPinia} from "pinia";
import router from './router'

import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
library.add(fas, far, fab);

import DefaultLayout from './components/DefaultLayout.vue';
import EmptyLayout from './components/EmptyLayout.vue';

import './bootstrap';
import '../css/app.css';

const app = createApp(App);

app.component('default-layout', DefaultLayout);
app.component('empty-layout', EmptyLayout);

app.use(createPinia());
app.use(router);
app.component('fa-icon', FontAwesomeIcon);
app.mount('#app');
