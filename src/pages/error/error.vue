<template>
    <div>
        <van-image :src="errorImg">
            <template v-slot:error>哎呀,出错了</template>
        </van-image>
        <div style="margin: 16px;">
            <van-button color="#1296db" round block type="info" native-type="submit" @click="toIndex">
                回到首页
            </van-button>
        </div>
    </div>
</template>

<script>
import { Button } from 'vant'
export default {
    name: 'error',
    components: {
        [Button.name]: Button
    },
    data() {
        return {
            errorImg: require('@/assets/img/404.jpeg')
        }
    },
    methods: {
        toIndex() {
            this.$router.replace({ path: '/index' })
        }
    }
}
</script>