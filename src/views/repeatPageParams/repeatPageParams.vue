<template>
  <div class="p-15">
    <div class="bg-white p-3">
      <h1>我在重复页里面，下面是传递过来的参数：</h1>
      {{this.$route.query.id}}
      <el-button type="primary" @click="backInitPage">回到打开的原始页面</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'repeatPageParams',
  data () {
    return {

    }
  },
  methods: {
    backInitPage () {
      this.closeSelfToReload('repeatPage')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./repeatPageParams.scss";
</style>