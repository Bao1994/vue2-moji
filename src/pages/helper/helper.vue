<template>
    <div>
        <div class="header-nav">
            <van-nav-bar
            title="未完工"
            left-text="返回"
            left-arrow
            @click-left="back"
            />
        </div>
        <div class="helper-box">
            <van-image :src="expectImg">
                <template v-slot:error>哎呀,出错了</template>
            </van-image>
        </div>
    </div>
</template>

<script>
export default {
    name: 'helper',
    data() {
        return {
            expectImg: require('@/assets/img/expect.jpeg')
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
    .helper-box {
        padding-top: 46px;   
    }
</style>