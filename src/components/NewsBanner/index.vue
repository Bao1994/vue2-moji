<template>
    <div class="banner">
        <van-swipe class="swiper" :autoplay="3000">
            <van-swipe-item v-for="(item, index) in json" :key="index">
                <router-link class="item-link" :to="{ path: 'detail', query: { 'id': item.id } }">
                    <van-image width="100%" height="100%" fit="cover" lazy-load :src="item.imageurls[0].url" v-if="item.imageurls.length > 0"></van-image>
                    <van-image width="100%" height="100%" fit="cover" v-else>
                        <template v-slot:error>加载失败</template>
                    </van-image>
                </router-link>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
export default {
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem
    },
    props: {
        json: {
            type: Array,
            default: () => [],
            required: true
        }
    }
}
</script>

<style lang="stylus" scoped>
    $banner_height = toRem(200)
    .banner {
        width: 100%;
        height: $banner_height;
        .swiper {
            width: 100%;
            height: 100%;   
        }
    }
</style>