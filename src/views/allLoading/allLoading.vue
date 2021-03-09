<template>
  <div class="p-15">
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
      this.$store.commit('setLoading', true)
      setTimeout(() => {
        this.$store.commit('setLoading', false)
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./allLoading.scss";
</style>