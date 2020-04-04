export default {
    path: '/index',
    name: 'index',
    component: () => import('@/pages/index/index'),
    sort: 1,
    meta: {
        tabbar: true, // 判断依据
        title: '天气', // 标题
        default_icon: require('@/assets/img/index.svg'), // 默认图标
        active_icon: require('@/assets/img/index-active.svg') // 选中图标
    }
}