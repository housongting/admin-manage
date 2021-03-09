<template>
  <div class="p-15">
    <div class="bg-white p-3">
      <h1>我在重复页里面，下面是传递过来的参数：</h1>
      {{this.$route.query.id}}
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
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
@import "./repeatPageParams.scss";
</style>