/**
 * 新闻模块接口列表
 */

import base from '@/api/base' // 导入接口域名列表
import axios from '@/utils/request' // 导入request中创建的axios实例

const news = {
    // 新闻频道
    channelList() {
        return axios.post(`${base.sq}/news/channelList.php`)
    },  
    // 新闻列表
    newsList(params) {
        return axios.get(`${base.sq}/news/newsList.php`, {
            params: params
        })
    },
    // 新闻详情
    newsDetail(params) {
        return axios.get(`${base.sq}/news/newsDetail.php`, {
            params: params
        })
    }
}

export default news