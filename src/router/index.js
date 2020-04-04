// 总路由管理
import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'

Vue.use(Router)

const files = require.context('./modules', false, /\.js$/)
// 路由数组 - 存放所有路由
let routerList = [
    {
        path: '/',
        name: 'index',
        redirect: '/index'
    }
] 
files.keys().forEach(key => {
    routerList = routerList
        .concat(files(key).default)
        .sort((a, b) => a.sort ? (a.sort - b.sort) : 1)
})
let error = [
    {
        path: '*',
        name: 'error',
        component: () => import('@/pages/error/error')
    }
]
routerList = routerList.concat(error)

const routes = [
    ...routerList
]

const router = new VueRouter({
    mode: 'history',
    routes,
    // 使用<keep-alive>,scrollBehavior才能生效
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

export default router


