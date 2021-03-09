<template>
  <div class="p-15">
    <div class="bg-white p-3" style="height:400px">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-button type="primary" @click="btn(1)"><i class="el-icon-loading el-icon--left" v-show="isshow==1"></i>点下试一试！</el-button>
          <el-button type="primary" :loading="loading" @click="btn2">点我一下就加载！</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'btnLoading',
  data () {
    return {
      isshow: 0,
      loading: false
    }
  },
  methods: {
    btn (val) {
      let that = this;
      that.isshow = val;
      setTimeout(function () {
        that.isshow = 0
      }, 1500)
    },
    btn2 () {
      this.loading = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./btnLoading.scss";
</style>