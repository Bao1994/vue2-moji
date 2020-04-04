// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 第三方库
import 'amfe-flexible/index.js' // 淘宝适配库
import { Lazyload, Image, Cell, NavBar, Toast } from 'vant' // Vant
import 'vant/lib/index.css'
Vue.use(Lazyload)
Vue.use(Image)
Vue.use(Cell)
Vue.use(NavBar)
Vue.prototype.$toast = Toast

import VeLine from 'v-charts/lib/line.common'
Vue.component(VeLine.name, VeLine)

// 自定义
import '@/assets' // 字体、样式等资源

import SvgIcon from '@/components/SvgIcon'
Vue.component('svg-icon', SvgIcon)

import api from '@/api' // axios封装接口、api统一管理
Vue.prototype.$api = api

Vue.prototype.back = () => router.back(-1) // 返回上一页

const global = require('@/common/globalMethod')
Vue.prototype.$global = global // 全局方法

// 路由拦截
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        // 获取用户登录成功后储存的登录标志
        let isLogin = global.handleLocalStorage('get', 'isLogin')
        // 如果登录标志存在且为isLogin,即用户已登录
        if (isLogin) {
            store.state.isLogin = true
            next()
        } else {
            next({
                path: '/login',
                query: {
                    redirect: from.path
                }  // 将跳转的路由path作为参数,登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
})

// 全局错误捕捉,防止单页面卡死
if (process.env.NODE_ENV === 'production') {
    Vue.config.errorHandler = function (error, vm, info) {
        console.log(error)
        Toast(info)
    }
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
