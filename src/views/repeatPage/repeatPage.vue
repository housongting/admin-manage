<template>
  <div class="p-15">
    <div class="bg-white p-3">
      <el-link class="mr-3" v-for="(item,index) in msg" :key="index" @click="jump(item)">{{item}}</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'repeatPage',
  data () {
    return {
      msg: ['去美国', '去日本', '去新加坡']
    }
  },
  methods: {
    jump (val) {
      this.$router.push({
        path: "/home/repeatPageParams",
        query: {
          id: val
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./repeatPage.scss";
</style>