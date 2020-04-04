
const myModulesList = [
    {
        path: '/my',
        name: 'my',
        component: () => import('@/pages/my/my'),
        sort: 4,
        meta: {
            tabbar: true, // 判断依据
            title: '我', // 标题
            default_icon: require('@/assets/img/my.svg'), // 默认图标
            active_icon: require('@/assets/img/my-active.svg') // 选中图标
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login/login'),
        sort: 5
    },
    {
        path: '/helper',
        name: 'helper',
        component: () => import('@/pages/helper/helper'),
        sort: 6,
        meta: {
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        }
    }
]

export default myModulesList