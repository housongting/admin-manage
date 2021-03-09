<template>
  <div class="p-15">
    <div class="bg-white p-3 mb-3">
      <el-row :gutter="20">
        <el-col :span="12">
          只有管理员能看见，切换账号知道路由也不能看到页面
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "jurisdiction",
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "./jurisdiction.scss";
</style>