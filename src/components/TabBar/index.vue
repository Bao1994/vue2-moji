<template>
    <div class="tab-container" v-if="components_show && tabbar.length > 0">
        <div class="item-box" @click="toPath(item.name)" v-for="item in tabbar" :key="item.name">
            <img :src="item.active_icon" class="icon" v-if="tab_active === item.name" />
            <img :src="item.default_icon" class="icon" v-else />
            <div class="tab-name" :class="tab_active === item.name ? 'color-active' : ''">{{ item.title }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tabbar',
    data() {
        return {
            tab_active: 'index', // 默认选中的路由的name
            components_show: true, // 控制组件显示或者隐藏
            tabbar: [] // 渲染tabbar的数组
        }
    },
    watch: {
        // 监听路由变化，来更新tabbar数组，同时判断是否跳转到tabbar页面，是则显示tabbar，否则不显示
        $route(to, from) {
            let array = []
            let is_tabbar = false
            this.$router.options.routes.forEach(item => {
                if (item.meta && item.meta.tabbar) {
                    let object = {
                        name: item.name,
                        ...item.meta
                    }
                    if (to.name === item.name) {
                        is_tabbar = true
                    }
                    array.push(object)
                }
            })
            this.tabbar = array

            if (is_tabbar) {
                this.components_show = true
                this.tab_active = to.name
            } else {
                this.components_show = false
            }
        }
    },
    methods: {
        /** 页面跳转
         * @param {string} e 对应路由信息的name
         */
        toPath(e) {
            this.$router.replace({ name: e }) // 路由跳转
        }
    }
}
</script>

<style lang="stylus" scoped>
    .tab-container {
        position: fixed;
        bottom: 0;
        display: flex;
        width: 100%;
        height: $tabBarHeight;
        background-color: $darkColor;
        z-index: 99;
        .item-box {
            flex: 1;
            flex-direction: column;
            flex-wrap: wrap;
            flex-center()
            .icon {
                width: toRem(20);
                height: toRem(20);
                margin-bottom: toRem(5)   
            }
            .tab-name {
                text-align: center;
                font-size: toRem(12);    
                font-weight: 400;
                color: $whiteColor;
                &.color-active {
                    color: $appColor;
                }
            }
        }
    }
</style>