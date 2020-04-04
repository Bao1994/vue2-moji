<template>
    <div>
        <div class="header-nav">
            <van-nav-bar
            title="登录"
            left-text="返回"
            left-arrow
            @click-left="back"
            />
        </div>
        <div class="login-form">
            <van-form @submit="onSubmit">
                <van-field
                    v-model="username"
                    name="username"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="password"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button color="#1296db" round block type="info" native-type="submit">
                    登录
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import { Button, Field, Form } from 'vant'
export default {
    name: 'login',
    components: { 
        [Button.name]: Button,
        [Field.name]: Field,
        [Form.name]: Form
    },
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        onSubmit(values) {
            let userName = values.username
            // 设置Vuex登录标志为true,默认userLogin为false
            this.$store.dispatch('UserInfo/userLogin', true)
            this.$store.dispatch('UserInfo/userName', userName)
            // Vuex在用户刷新的时候userLogin会回到默认值false,所以我们需要用到HTML5储存
            this.$global.handleLocalStorage('set', 'isLogin', true)
            this.$global.handleLocalStorage('set', 'UserName', userName)
            let returnUrl = this.$route.query.redirect
            if (returnUrl) {
                this.$router.replace({ path: returnUrl })
            } else {
                this.$router.replace({ path: '/my' })
            }
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
    .login-form {
        padding-top: 46px;   
    }
</style>