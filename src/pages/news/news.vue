<template>
    <div>
        <van-tabs animated sticky color="#1296db" @click="onClick">
            <van-tab v-for="(channelValue, index) in channelList" :title="channelValue.name" :key="index">
                <!-- list -->
                <van-list
                    v-model="loading"
                    :finished="finished"
                    :immediate-check="false"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                        <van-cell v-for="(item, index) in list" :key="index">
                            <router-link class="item-link" :to="{ path: 'detail', query: { 'id': item.id } }">
                                <h3 class="news-title">{{item.title}}</h3>
                                <div class="news-img" v-if="item.havePic">
                                    <div class="item-img" v-for="(value, index) in item.imageurls.slice(0,3)" :key="index">
                                        <van-image
                                        width="100%"
                                        height="100%"
                                        fit="cover"
                                        lazy-load
                                        :src="value.url"
                                        />
                                    </div>
                                </div>
                                <div class="news-info">
                                    <span class="space">{{ item.source }}</span>
                                    <span class="space">{{ item.pubDate }}</span>
                                </div>
                            </router-link>
                        </van-cell>
                    </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { Sticky, List, Tab, Tabs } from 'vant'
export default {
    name: 'news',
    components: { 
        [Sticky.name]: Sticky,
        [List.name]: List,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs
    },
    data() {
        return {
            bannerJson: [],
            loading: false,
            finished: false,
            page: 1, // 请求第几页
            pageSize: 10, // 每页请求的数量
            channelId: '5572a108b3cdc86cf39001cd',
            channelList: [],
            list: [],
            isFirstEnter: false
        }
    },
    beforeRouteEnter(to, from, next) {
        if (from.name === 'detail') { // 这个name是下一级页面的路由name
            to.meta.isBack = true // 设置为true说明你是返回到这个页面，而不是通过跳转从其他页面进入到这个页面
        }
        next()
    },
    mounted() {
        this.isFirstEnter = true
    },
    activated() {
        if (!this.$route.meta.isBack || this.isFirstEnter) {
            this.getChannelList()
            this.getMoreNews()
        }
        this.$route.meta.isBack = false //请求完后进行初始化
        this.isFirstEnter = false 
    },
    methods: {
        // 获取新闻频道
        async getChannelList() {
            this.$api.news.channelList().then(res => {
                let resData = res.data.showapi_res_body.channelList
                this.channelList = resData
                this.channelId = this.channelList[0].channelId
            })
        },
        // 获取更多新闻
        async getMoreNews() {
            let params = {
                channelId: this.channelId,
                maxResult: this.pageSize,
                needAllList: 1,
                needContent: 1,
                page: this.page
            }
            this.$api.news.newsList(params).then(res => {
                let resData = res.data.showapi_res_body.pagebean.contentlist
                // 加载状态结束
                this.loading = false

                // 加载结束
                if (resData === null || resData.length === 0) {
                    this.finished = true
                    return
                }

                this.list = this.list.concat(resData)
            })
        },
        onLoad() {
            this.page++
            this.getMoreNews()
        },
        onClick(name) {
            this.list = []
            this.page = 1
            this.channelId = this.channelList[name].channelId
            this.getMoreNews()
        }
    }
}
</script>

<style lang="stylus" scoped>
    .news-title {
        color: #222;
        font-size: toRem(16);
    }
    .news-img {
        flex-center()
        .item-img {
            flex: 1;    
            margin-right: toRem(5);
        }
    }
    .news-info {
        display: flex;
        justify-content: flex-start;
        .space {
            margin-right: toRem(10);
            color: #999;
            font-size: toRem(10);    
        }
    }
</style>