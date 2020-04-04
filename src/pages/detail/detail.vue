<template>
    <div>
        <div class="header-nav">
            <van-nav-bar
            title="详情"
            left-text="返回"
            left-arrow
            @click-left="back"
            />
        </div>
        <div class="article">
            <van-cell v-for="(item, index) in list" :key="index">
                <div class="article-header">
                    <h1 class="article-title">{{ item.title }}</h1>
                    <div class="article-author">
                        <div class="header-left">{{ item.source }}</div>
                        <div class="header-right">{{ item.pubDate }}</div>
                    </div>
                </div>
            </van-cell>
            <div v-if="allList.length > 0">
                <van-cell :border="false" v-for="(value, index) in allList" :key="index">
                    <div v-if="value.url">
                        <van-image
                            width="100%"
                            fit="cover"
                            lazy-load
                            :src="value.url"
                            @click="onPreview"
                            />
                    </div>
                    <div v-else>{{ value }}</div>
                </van-cell>
            </div>
            <div v-else></div>
        </div>
    </div>
</template>

<script>
import { ImagePreview } from 'vant'
export default {
    name: 'detail',
    components: {
        [ImagePreview.name]: ImagePreview
    },
    data() {
        return {
            list: [],
            allList: [],
            previewArr: []
        }
    },
    created() {
        this.getNewsDetail()
    },
    methods: {
        // 获取新闻详情
        getNewsDetail() {
            let id = this.$route.query.id
            let params = {
                id: id
            }
            this.$api.news.newsDetail(params).then(res => {
                let resData = res.data.showapi_res_body.pagebean.contentlist
                this.list = resData
                this.allList = resData[0].allList
                if (resData[0].havePic) {
                    const imagesArr = resData[0].imageurls.map(({url}) => {
                        return {url}
                    })
                    for (let item of imagesArr) {
                        this.previewArr.push(item.url)
                    }
                }
            })
        },
        // 图片预览
        onPreview() {
            ImagePreview(this.previewArr)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .header-nav {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 99;
    }
    .article {
        padding-top: 46px;   
        .article-title {
            color: #222;
            font-size: toRem(20);
            line-height: toRem(24);    
        }
        .article-author {
            display: flex;
            justify-content: space-around;
            .header-left {
                flex: 1;
                color: #222;
                font-size: toRem(14);
            }   
            .header-right {
                color: #999;
                font-size: toRem(12);
            }
        } 
    }
</style>