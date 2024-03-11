import axios from "axios";
import { useUserStore } from '@/stores/user.js';
import { ElMessage } from "element-plus";
import router from "@/router";
const httpInstance = axios.create({
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
});


// 拦截器:
// 请求式
httpInstance.interceptors.request.use(config => {
    const userStore = useUserStore();
    const token = userStore.userInfo.token;
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, e => Promise.reject(e));
// 响应式
httpInstance.interceptors.response.use(res => res.data,e => {
    const userStore = useUserStore();
    ElMessage({
        type:'warning',
        message: e.response.data.message
    });
    if(e.response.status === 401){
        userStore.clearUserInfo();
        router.push('/login');
    }
    return Promise.reject(e);
})


export default httpInstance;