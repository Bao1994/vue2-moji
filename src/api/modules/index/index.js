/**
 * 首页模块接口列表
 */
import base from '@/api/base'
import axios from '@/utils/request'
import qs from 'qs'; // 根据需求是否导入qs模块

const weather = {
    // 天气实况
    condition(params) {
        return axios.post(`${base.sq}/weather/condition.php`, qs.stringify(params))
    },
    // 天气预报15天
    forecast(params) {
        return axios.post(`${base.sq}/weather/forecast.php`, qs.stringify(params))
    },
    // 生活指数
    life(params) {
        return axios.post(`${base.sq}/weather/life.php`, qs.stringify(params))
    }
}

export default weather