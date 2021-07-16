import Axios from '../utils/axios'

export const time = ()=>{
    return Axios({
        method:'head',
        url:'/users/test'
    })
}