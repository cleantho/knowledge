import 'font-awesome/css/font-awesome.css'
import { createApp } from 'vue'
import App from './App'

import router from './config/router'
import store from './config/store'
import gravatar from '@vue-layout/gravatar';

import "./config/bootstrap"

const app = createApp(App)
app.use(router)
app.use(store)
app.use(gravatar)
app.mount('#app', true)
