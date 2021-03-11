<template>
  <div class="p-15">
    <div class="bg-white p-3 mb-3">
      <el-row :gutter="20">
        <el-col :span="12">
          <h3 class="mb-3">表格筛选和排序</h3>
          <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" border>
            <el-table-column prop="date" label="日期" sortable width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址" :formatter="formatter">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table ref="filterTable" :data="tableData" style="width: 100%" border stripe>
            <el-table-column prop="date" label="日期" sortable width="180" column-key="date" :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]" :filter-method="filterHandler">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址" :formatter="formatter">
            </el-table-column>
            <el-table-column prop="tag" label="标签" width="100" :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]" :filter-method="filterTag" filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>{{scope.row.tag}}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>

    <div class="bg-white p-3 mb-3">
      <el-row :gutter="20">
        <el-col :span="12">
          <h3 class="mb-3">树表格</h3>
          <el-table :data="tableDataTree" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="date" label="日期" sortable width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12" class="mt-3">
          <h3 class="mb-3">自定义规则设置row颜色</h3>
          <el-table :data="tableData" style="width: 100%" :row-style="rowStyle">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="province" label="地址">
            </el-table-column>
            <el-table-column prop="sex" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="age" label="地址">
            </el-table-column>

          </el-table>
        </el-col>
      </el-row>
    </div>

    <div class="bg-white p-3 mb-3">
      <el-row :gutter="20">
        <el-col :span="12">
          <h3 class="mb-3">固定列和表头</h3>
          <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" border stripe max-height="350">
            <el-table-column prop="date" label="日期" fixed="left">
            </el-table-column>
            <el-table-column prop="name" label="姓名" fixed="left">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="60">
            </el-table-column>
            <el-table-column prop="city" label="省份" width="80">
            </el-table-column>
            <el-table-column prop="province" label="市区" width="80">
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="60">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="180">
            </el-table-column>
            <el-table-column prop="description" label="详细说明" width="200">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <h3 class="mb-3">多选表格+内容省略</h3>
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="日期" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="60">
            </el-table-column>
            <el-table-column prop="city" label="省份" width="80">
            </el-table-column>
            <el-table-column prop="province" label="市区" width="80">
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="60">
            </el-table-column>
            <el-table-column prop="description" label="详细说明" width="200" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>

    <div class="bg-white p-3 mb-3">
      <el-row :gutter="20">
        <el-col :span="12">
          <h3 class="mb-3">自定义模板</h3>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="日期" width="180" align="center">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" width="180" align="center">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>姓名: {{ scope.row.name }}</p>
                  <p>住址: {{ scope.row.address }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <h3 class="mb-3">展开行</h3>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" class="demo-table-expand">
                  <el-form-item label="年龄">
                    <span>{{ props.row.age }}</span>
                  </el-form-item>
                  <el-form-item label="地址">
                    <span>{{ props.row.address }}</span>
                  </el-form-item>
                  <el-form-item label="性别">
                    <span>{{ props.row.sex }}</span>
                  </el-form-item>
                  <el-form-item label="省份">
                    <span>{{ props.row.city }}</span>
                  </el-form-item>
                  <el-form-item label="描述">
                    <span>{{ props.row.description }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="日期" prop="date">
            </el-table-column>
            <el-table-column label="姓名" prop="name">
            </el-table-column>
            <el-table-column label="城市" prop="province">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
export default {
  name: 'tables',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家',
        sex: "男",
        province: '上海',
        age: 12,
        city: '普陀区',
        description: "这是凝心聚力的大会——放眼未来，擘画蓝图，党的主张通过法定程序成为国家意志，为长远发展指明方向、增强信心、鼓舞干劲。"
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: '公司',
        sex: "女",
        province: '上海',
        age: 18,
        city: '普陀区',
        description: "这是凝心聚力的大会——放眼未来，擘画蓝图，党的主张通过法定程序成为国家意志，为长远发展指明方向、增强信心、鼓舞干劲。"
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家',
        sex: "女",
        province: '上海',
        age: 5,
        city: '普陀区',
        description: "这是凝心聚力的大会——放眼未来，擘画蓝图，党的主张通过法定程序成为国家意志，为长远发展指明方向、增强信心、鼓舞干劲。"

      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: '公司',
        sex: "男",
        province: '上海',
        age: 30,
        city: '普陀区',
        description: "这是凝心聚力的大会——放眼未来，擘画蓝图，党的主张通过法定程序成为国家意志，为长远发展指明方向、增强信心、鼓舞干劲。"

      }],
      tableDataTree: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
          id: 31,
          date: '2016-05-01',
          name: '王小虎（子）',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 32,
          date: '2016-05-02',
          name: '王小虎（子）',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]

    }
  },
  methods: {
    formatter (row) {
      // console.log(row, column);
      return row.address;
    },
    filterTag (value, row) {
      return row.tag === value;
    },
    filterHandler (value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    handleEdit (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      console.log(index, row);
    },
    rowStyle ({ row }) {
      // console.log(row);
      if (row.sex === "男") {
        let manStyle = {
          "background": "oldlace!important"
        }
        return manStyle
      } else if (row.sex === "女") {
        let womanStyle = {
          "background": "#f0f9eb!important"
        }
        return womanStyle
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./tables.scss";
</style>