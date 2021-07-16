import Axios from '../utils/axios'
import qs from 'qs'
export const test = () => {
    return Axios({
        method:'GET',
        url:'/users/test'
    })
}

export const login = (data) => {
    return  Axios({
        method:'post',
        url:'/login',
        data:qs.stringify(data)
    })
}