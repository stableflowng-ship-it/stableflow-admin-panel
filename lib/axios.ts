import axios from 'axios'

import { envHelper } from '@/config/env-helper' 

const baseurl = envHelper.url.base_url

const StableAxios = axios.create({
    baseURL: baseurl,
    headers:{
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

StableAxios.interceptors.response.use(
    response =>{
        return response
    },
    error =>{
        if (typeof window !== 'undefined' && error?.response?.status === 401) {
            // window.location.href = '/'
        }
        return Promise.reject(error)
    }
)

export default StableAxios;