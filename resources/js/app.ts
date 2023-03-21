import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

import DefaultLayout from './components/DefaultLayout.vue'
import EmptyLayout from './components/EmptyLayout.vue'

import './bootstrap.js'
import '../css/app.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.component('default-layout', DefaultLayout)
app.component('empty-layout', EmptyLayout)
app.mount('#app')
