/** 
 * api接口的统一出口
 */
// 首页模块接口
import weather from '@/api/modules/index'

// 新闻模块接口
import news from '@/api/modules/news'

// 我的模块接口
import my from '@/api/modules/my'

// 导出接口
export default {    
    weather,
    news,
    my
}