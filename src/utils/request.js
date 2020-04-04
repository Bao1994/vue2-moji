/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from '../router';
import { Toast } from 'vant';

/** 
 * 提示函数 
 * 禁止点击蒙层&&显示一秒后关闭
 */
const tip = msg => {    
    Toast({        
        message: msg,        
        forbidClick: true    
    });
}

/**
 * loading请求效果&&避免重复请求
 */
let loadingCount = 0
const showLoading = () => {
    if (loadingCount === 0) {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            duration: 0
        });
        loadingCount++
    }
}
const hideLoading = () => {
    if (loadingCount <= 0) return
    loadingCount--
    if (loadingCount === 0) {
        Toast.clear()
    }
}

/** 
 * 跳转登录页
 * 携带当前页面路由,以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/login',        
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态,跳转登录页
        case 401:
            toLogin();
            break;
        // 403 token过期
        // 清除token并跳转登录页
        case 403:
            tip('登录过期,请重新登录');
            setTimeout(() => {
                toLogin();
            }, 1000);
            break;
        // 404请求不存在
        case 404:
            tip('请求的资源不存在'); 
            break;
        default:
            console.log(other);   
        }}

// 创建axios实例
var instance = axios.create({ timeout: 1000 * 12 });
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/** 
 * 请求拦截器 
 * 每次请求前,如果存在token则在请求头中携带token 
 */ 
instance.interceptors.request.use(    
    config => {        
        // 登录流程控制中,根据本地是否存在token判断用户的登录情况        
        // 但是即使token存在,也有可能token是过期的,所以在每次的请求头中携带token        
        // 后台根据携带的token判断用户的登录情况,并返回给我们对应的状态码        
        // 而后我们可以在响应拦截器中,根据状态码进行一些统一的操作。        
        // const token = store.state.token; 
        // token && (config.headers.Authorization = token);  
        // 请求拦截进来调用显示loading效果
        showLoading()      
        return config;    
    },    
    error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(    
    // 请求成功
    res => {
        // 响应拦截进来隐藏loading效果,此处采用延时处理是合并loading请求效果,避免多次请求loading关闭又开启
        setTimeout(() => {
            hideLoading()
        }, 200);
        return res.status === 200 ? Promise.resolve(res) : Promise.reject(res)
    },
    // 请求失败
    error => {
        setTimeout(() => {
            hideLoading()
        }, 200);
        const { response } = error;
        if (response) {
            // 请求已发出,但是不在2xx的范围 
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时,更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据,会在断网组件中说明
            if (!window.navigator.onLine) { // 联网状态
                tip('请检查网络连接')
            } else {
                tip('请求超时')
                return Promise.reject(error);
            }
        }
    })

export default instance