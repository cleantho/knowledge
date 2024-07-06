import 'font-awesome/css/font-awesome.css'
import "./config/bootstrap"
import { createApp } from 'vue'
import App from './App'

import router from './config/router'
import store from './config/store'
import gravatar from '@vue-layout/gravatar';

// Autorização temporaria
import axios from 'axios'
const bearer = "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkNsZWFudGhvIiwiZW1haWwiOiJjbGVhbnRob0BnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNzIwMjk2MDEwLCJleHAiOjE3MjA1NTUyMTB9.g00Lx-1-Vh8o-L-WNhtlbnGhuIqIGS0w0oNvC168jHs"
axios.defaults.headers.common['Authorization'] = bearer

const app = createApp(App)
app.use(router)
app.use(store)
app.use(gravatar)
app.mount('#app', true)
