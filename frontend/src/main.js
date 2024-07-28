import 'font-awesome/css/font-awesome.css'
import "./config/bootstrap"
import { createApp } from 'vue'
import App from './App'

import router from './config/router'
import store from './config/store'
import gravatar from '@vue-layout/gravatar';
import toasted from './config/msgs'

// Autorização temporaria
import axios from 'axios'
const bearer = "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkNsZWFudGhvIiwiZW1haWwiOiJjbGVhbnRob0BnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNzIyMTk5MDIwLCJleHAiOjE3MjI0NTgyMjB9.WxkvyU9JAZQWDUUT5jQ5JfQikkQGS-D-_Fh-rlbrnR4"
axios.defaults.headers.common['Authorization'] = bearer

const app = createApp(App)
app.use(router)
app.use(store)
app.use(gravatar)
app.use(toasted)
app.mount('#app', true)
