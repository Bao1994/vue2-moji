<template>
  <div id="app">
    <keep-alive >
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
export default {
  name: 'App',
  components: {
      TabBar
  }
}
</script>

<style lang="stylus">
#app {
    padding-bottom: $tabBarHeight;
}
</style>
