<template>
  <div class="p-15 bg-color">
    <div class="bg-white p-3">
      <div class="content">
        <div class="form_box">
          <div class="input_box">
            <label>数据源名称</label>
            <el-input size="medium" v-model="queryData.DsName" placeholder="数据源名称"></el-input>
          </div>
          <div class="input_box">
            <label>服务器地址:</label>
            <el-input size="medium" v-model="queryData.DbHost" placeholder="服务器地址"></el-input>
          </div>
          <div class="input_box">
            <label>数据库名称:</label>
            <el-input size="medium" v-model="queryData.DbInst" placeholder="数据库名称"></el-input>
          </div>
          <div class="input_box">
            <label>数据源类型:</label>
            <el-select v-model="queryData.DbType" placeholder="请选择" size="medium">
              <el-option label="MSSql" value=1></el-option>
              <el-option label="Oracle" value=2></el-option>
              <el-option label="Api" value=4></el-option>
            </el-select>
          </div>
          <div class="input_box">
            <label>内部名称:</label>
            <el-input size="medium" v-model="queryData.DbHandle" placeholder="内部名称"></el-input>
          </div>
          <div class="input_box">
            <label>报表大类:</label>
            <el-select v-model="queryData.MainCategory" placeholder="请选择" size="medium">
              <el-option :label="v" :value="v" v-for="v in queryDefault.MainCategories" :key="v"></el-option>
            </el-select>
          </div>
          <div class="input_box">
            <label>报表细类:</label>
            <el-select v-model="queryData.SubCategory" placeholder="请选择" size="medium">
              <el-option :label="v" :value="v" v-for="v in queryDefault.SubCategories" :key="v"></el-option>
            </el-select>
          </div>
          <div class="input_box">
            <label>备注:</label>
            <el-input size="medium" v-model="queryData.Descriptor" placeholder="备注"></el-input>
          </div>
          <div class="input_box">
            <label>状态:</label>
            <el-select v-model="queryData.DsStatus" placeholder="请选择" size="medium">
              <el-option label="全部" value='2'></el-option>
              <el-option label="空闲" value='0'></el-option>
              <el-option label="启用" value='1'></el-option>
            </el-select>
          </div>
          <span class="btn-box">
            <button class="btn btn-1">查询</button>
            <button class="btn btn-2">重置</button>
          </span>
        </div>
        <div class="slide_btn"></div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'dataConfiguration',
  data () {
    return {
      //查询条件(DsStatus: -1表示全部)
      queryData: {
        DsName: '',
        DbHost: '',
        DbInst: '',
        DbType: null,
        DbMode: null,
        MainCategory: null,
        SubCategory: null,
        Descriptor: '',
        DsStatus: -1,
        DbHandle: ''
      },
      arr: ['1', 2, 3, 4],
      //查询条件默认值、静态源
      queryDefault: {
        MainCategories: ["微信", "pc"],
        SubCategories: ["报表一", "报表二"],
      },
      //表单静态数据
      // formDefault = {
      //   MainCategories: [],
      //   SubCategories: [],
      //   DbObjects: [],//table,views,procedure
      // },


    }
  },


}
</script>

<style lang="scss" scoped>
@import "./dataConfiguration.scss";
</style>