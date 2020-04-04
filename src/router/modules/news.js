
const newsModulesList = [
    {
        path: '/news',
        name: 'news',
        component: () => import('@/pages/news/news'),
        sort: 2,
        meta: {
            tabbar: true, // 判断依据
            title: '资讯', // 标题
            default_icon: require('@/assets/img/news.svg'), // 默认图标
            active_icon: require('@/assets/img/news-active.svg'), // 选中图标
            keepAlive: true, // 表示该页面需要缓存
            isBack: false // 用于判断上一个页面是哪个
        }
    },
    {
        path: '/detail',
        name: 'detail',
        component: () => import('@/pages/detail/detail'),
        sort: 3
    }
]

export default newsModulesList