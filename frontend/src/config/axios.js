import axios from 'axios'
import { normalExit } from "@/global";

const success = res => res
const error = err => {
    if (401 === err.response.status) {            
        window.location = '/auth'   
        localStorage.setItem(normalExit, false)
    } else {       
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error)
