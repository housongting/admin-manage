<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import './assets/css/common.css'
import { initDynamicRoutes } from './router/index.js'
export default {
  name: "app",
  created () {
    initDynamicRoutes()  //解决登录成功后，刷新点击菜单跳转失败
  },
  mounted () {
    // $(document).on('click', '.slide_btn', function () {
    //   if ($(this).parent().hasClass('active')) {
    //     $(this).parent().removeClass('active');
    //   } else {
    //     $(this).parent().addClass('active');
    //   }
    // })
  }
}
</script>

<style>
#app {
  font-size: 16px;
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
}
</style>
