<template>
    <div>
        <div class="member-top">
            <div class="member-header">
                <div class="member-pic">
                    <van-image
                    round
                    width="100%"
                    height="100%"
                    fit="cover"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                    />
                </div>
                <router-link :to="{ path: 'login' }">
                    <div class="member-login" v-if="isLogin">欢迎你,{{ userName }}</div>
                    <div class="member-login" v-if="!isLogin">立即登录</div>
                </router-link>
            </div>
        </div>
        <router-link :to="{ path: '/helper' }">
            <van-grid :column-num="3">
                    <van-grid-item
                    v-for="(value, index) in list"
                    :key="index"
                    >
                        <svg-icon :icon-class="value.icon" />
                        <p class="name">{{ value.name }}</p>
                    </van-grid-item>
            </van-grid>
        </router-link>
        <div style="margin: 16px;" v-if="isLogin">
            <van-button color="#1296db" round block type="info" native-type="submit" @click="confirmPop">
            退出登录
            </van-button>
        </div>
    </div>
</template>

<script>
import { Button, Icon, Grid, GridItem, Dialog } from 'vant'
import { mapGetters } from 'vuex'
export default {
    name: 'my',
    components: {
        [Icon.name]: Icon,
        [Grid.name]: Grid,
        [GridItem.name]: GridItem,
        [Button.name]: Button
    },
    data() {
        return {
            list: [
                {
                    name: '个性助手',
                    icon: 'zhushou'
                },
                {
                    name: '账号管理',
                    icon: 'zhanghao'
                },
                {
                    name: '单位设置',
                    icon: 'navicon-jldw',
                },
                {
                    name: '推送通知',
                    icon: 'tuisongxiaoxi'
                },
                {
                    name: '意见反馈',
                    icon: 'yijianfankui'
                },
                {
                    name: '关于墨迹',
                    icon: 'guanyu'
                }
            ]
        }
    },
    computed: {
        ...mapGetters('UserInfo', {
            isLogin: 'isLogin',
            userName: 'getUserName'
        })
    },
    methods: {
        confirmPop() {
            Dialog.confirm({
                title: '提示',
                message: '确认退出登录吗?'
                }).then(() => {
                    this.$store.dispatch('UserInfo/userLogin', false)
                    this.$global.handleLocalStorage('remove', 'isLogin')
                    this.$global.handleLocalStorage('remove', 'UserName')
                }).catch(() => {
                // on cancel
            });
        }
    }
}
</script>

<style lang="stylus" scoped>
    .member-top {
        padding: toRem(20);
        background-color: $appColor;
        .member-header {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .member-pic {
                width: toRem(50);
                height: toRem(50);
                border-radius: 50%;
                border: 1px solid #ccc;
                margin-right: toRem(10);
            }
            .member-login {
                color: $whiteColor;
                font-size: toRem(16);
            }
        }
    }
    .name {
        color: $darkColor;
        font-size: toRem(14);
    }
</style>
