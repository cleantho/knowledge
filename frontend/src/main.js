import 'font-awesome/css/font-awesome.css'
import './config/bootstrap'
import './config/axios'
import { createApp } from 'vue'
import App from './App'

import router from './config/router'
import store from './config/store'
import gravatar from '@vue-layout/gravatar';
import toasted from './config/msgs'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(gravatar)
app.use(toasted)
app.mount('#app', true)
