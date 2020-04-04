# vue2-moji-master
# 技术栈  
1. [vue](https://cn.vuejs.org/v2/guide/)、[vue-router](https://router.vuejs.org/zh/guide/)、[vuex](https://vuex.vuejs.org/zh/)  
2. [axios（请求库）](https://github.com/axios/axios)  
3. [vant（移动端 Vue 组件库）](https://youzan.github.io/vant/#/zh-CN/)  
4. [v-chart（基于 Vue2.0 和 ECharts 封装的图表组件）](https://v-charts.js.org/#/)  
4. [amfe-flexible（淘宝适配库）](https://github.com/amfe/lib-flexible)  
5. [Stylus（css预处理器）](https://stylus-lang.com/)  
6. [IconFont（阿里矢量图标库）](https://www.iconfont.cn/)  
7. [ES6/7（JS语法）](https://es6.ruanyifeng.com/)  

# 效果演示
[在线链接](http://www.player94.com/index)（请使用手机模式预览）  
![image](http://www.player94.com/github/code.png)

# 功能
API在线链接:
1. [天气api](https://market.aliyun.com/products/57096001/cmapi013828.html?spm=5176.2020520132.101.2.161f7218yckDNl#sku=yuncode782800000)  
2. [新闻api](https://www.showapi.com/apiGateway/view?apiCode=109)  

已实现:
* 天气：天气实况、今明天气预报、未来一周天气预报、生活指数  
* 资讯：新闻频道、新闻无限加载、新闻详情、新闻图片预览  
* 我： 登录、退出登录、个人信息  
未实现:
* 定位城市
* 城市选择
* 因为天气API没有提供城市列表接口,而获取天气相关数据需要城市id参数,所以暂时写死了城市id-北京朝阳区

# 项目截图
![image](http://www.player94.com/github/p1.png)  
![image](http://www.player94.com/github/p2.png)  
![image](http://www.player94.com/github/p3.png)  
![image](http://www.player94.com/github/p4.png)  
![image](http://www.player94.com/github/p5.png)  
![image](http://www.player94.com/github/p6.png) 

# 目录结构
```
|-- src
    |   |-- App.vue
    |   |-- main.js
    |   |-- api           // 请求api
    |   |-- assets        // 静态资源              
    |   |-- common        // 全局方法
    |   |-- components    // 全局组件
    |   |-- pages         
    |   |   |-- detail    // 新闻详情页
    |   |   |   |-- detail.vue
    |   |   |-- error     // 404页
    |   |   |   |-- error.vue
    |   |   |-- helper    // 待完工页
    |   |   |   |-- helper.vue
    |   |   |-- index     // 首页
    |   |   |   |-- index.vue
    |   |   |-- login     // 登录页
    |   |   |   |-- login.vue
    |   |   |-- my        // 我的页
    |   |   |   |-- my.vue
    |   |   |-- news      // 新闻页
    |   |       |-- news.vue
    |   |-- router        // 路由
    |   |-- store         // 状态管理
    |   |-- utils         // 工具类
``` 


# 开发和发布

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
