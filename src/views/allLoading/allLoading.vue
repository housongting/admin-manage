<template>
  <div class="p-15 bg-color-height">
    <div class="bg-white p-3" style="height:400px">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-button type="primary" @click="btn">点下试一试！</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'allLoading',
  data () {
    return {
    }
  },
  methods: {
    btn () {
      console.log(11);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./allLoading.scss";
</style>