<template>
  <div class="p-15">
    <div class="bg-white p-3 mb-3">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-table border :data="tableData" style="width: 100%">
            <el-table-column label="Date" prop="date">
            </el-table-column>
            <el-table-column label="Name" prop="name">
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <!-- v-permission 自定义属性解决功能权限 -->
                <el-button type="primary" v-permission="{action:'edit',effect:'del'}">仅管理员可操作</el-button>
              </template>
              <template>
                <el-button size="mini" v-permission="{action:'edit',effect:'disabled'}">新增</el-button>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'funAuthority',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "./funAuthority.scss";
</style>