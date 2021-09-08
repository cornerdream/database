import Axios from 'axios'
import qs from 'qs'
import router from '../router'
import store from '../store'

switch(process.env.NODE_ENV){
    case 'production':
        Axios.defaults.baseURL = '';
        break;
    case 'test':
        Axios.defaults.baseURL = '';
        break;
    default:
        // Axios.defaults.baseURL = 'http://192.168.1.228:3000'
        Axios.defaults.baseURL = 'http://192.168.1.218:8001'
}
const redirectLogin = function redirectLogin(){
    router.push({
        name:'login',
        query:{
            redirect:router.currentRoute.fullPath
        }
    })
}
Axios.defaults.timeout = 1000;
Axios.defaults.withCredentials = true;

Axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
Axios.defaults.transformRequest = data => qs.stringify(data);

Axios.interceptors.request.use(config=>{
    
    let token = localStorage.getItem('token');
    token && (config.headers.Authorization = token);
    return config;
},error=>{
    return Promise.reject(error);
})

Axios.defaults.validateStatus = status=>{
    return /^(2|3)\d{2}$/.test(status);
}

Axios.interceptors.response.use((response) => {
    return response
},async (error) => {
    const {response} = error;
    if (response) {
    const { status } = response
    if (status == 400) {
        this.$alert.error('请求参数错误')
    } else if (status == 401) {
        if (!store.state.user.token) {
        redirectLogin()
        return Promise.reject(error)
        }        
        redirectLogin();
    
    } else if (status == 403) {
        this.$alert.error('没有权限，请联系管理员')
    } else if (status == 404) {
        this.$alert.error('请求资源不存在');
        router.push('/404')
    } else if (status >= 500) {
        this.$alert.error('服务端错误，请联系管理员')
    } else if (error.request) {
        this.$alert.error('请求超时，请刷新重试')
    } else {
        this.$alert.error(`请求失败:${error.message}`)
    }
    return Promise.reject(error)
    }
})

export default Axios
