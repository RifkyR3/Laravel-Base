import {createApp} from 'vue';
import App from './App.vue'
import {createPinia} from "pinia";
import router from './router'

import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

import './bootstrap';
import '../sass/app.scss';

const app = createApp(App);
const pinia = createPinia();
library.add(fas, far, fab);

app.use(pinia);
app.use(router);
app.component('fa-icon', FontAwesomeIcon);
app.mount('#app');
