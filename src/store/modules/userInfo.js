const global = require('@/common/globalMethod')
// 用户信息
const state = { // 初始化
    isLogin: false,
    userName: null
}
const getters = { // 获取
    isLogin: (state) => {
        state.isLogin = global.handleLocalStorage('get', 'isLogin')
        return state.isLogin
    },
    getUserName: (state) => {
        state.userName = global.handleLocalStorage('get', 'UserName')
        return state.userName
    }
}
const mutations = { // 操作
    // 保存登录状态
    userStatus(state, flag) {
        state.isLogin = flag
    },
    setUserName(state, value) {
        state.userName = value
    }
}
const actions = { // 触发
    // 获取登录状态
    userLogin({commit}, flag) {
        commit('userStatus', flag)
    },
    userName({commit}, value) {
        commit('setUserName', value)
    }
}

export default {
    namespaced: true, //用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions
}