<template>
  <div class="p-15 bg-color">
    <div class="bg-white p-3">
      <el-row :gutter="20">
        <el-col :span="12">
          <h3 class="pb-3">数据校验</h3>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:400px">
            <el-form-item label="电话号码" prop="telephpne">
              <el-input v-model="ruleForm.telephpne"></el-input>
            </el-form-item>
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

          </el-form>
        </el-col>
        <el-col :span="12">
          <h3 class="pb-3"> </h3>
          <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="140px" class="demo-ruleForm" style="width:400px">
            <el-form-item label="大陆手机号码" prop="chinaTel">
              <el-input v-model="ruleForm2.chinaTel"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="bg-white p-3 mt-3" style="height:400px">
      <el-row :gutter="20">
        <el-col :span="6">
          <h3 class=" pb-3">下拉框</h3>
          <el-select v-model="inputvalue" clearable placeholder="请选择">
            <div style="padding:0px 6px 6px 6px">
              <el-input v-model="searchinput" placeholder="请输入关键字" @input="show"></el-input>
            </div>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
            <el-option label="无数据" v-show="options==0" value="无数据" disabled style="text-align:center">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <h3 class="pb-3">单选可搜索</h3>
          <el-cascader placeholder="试试搜索：指南" :options="options2" filterable clearable :show-all-levels="false"></el-cascader>
        </el-col>
        <el-col :span="6">
          <h3 class="pb-3">多选可搜索</h3>
          <el-cascader placeholder="试试搜索：指南" :options="options2" :props="{ multiple: true}" filterable clearable :show-all-levels="false"></el-cascader>
        </el-col>
        <el-col :span="6">
          <h3 class="pb-3">自定义节点内容</h3>
          <el-cascader :options="options2" clearable>
            <template slot-scope="{ node, data }">
              <span>{{ data.label }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
          </el-cascader>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'forms',
  data () {
    var checkchinaTel = (rule, value, callback) => {
      var MobileRegex = /^1[0-9]{10}$/;
      if (!MobileRegex.test(value)) {
        callback(new Error('手机号码格式不正确！'))
      } else {
        callback();
      }
    }
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭5'
      }, {
        value: '选项6',
        label: '双皮奶6'
      }, {
        value: '选项7',
        label: '蚵仔煎7'
      }, {
        value: '选项8',
        label: '龙须面8'
      }, {
        value: '选项9',
        label: '北京烤鸭9'
      }, {
        value: '选项10',
        label: '北南'
      },
      ],
      initoptions: null,
      isshow: true,
      value: '',
      inputvalue: '',
      inputvalue2: '',
      searchinput: '',
      ruleForm: {
        telephpne: '',
        name: '',
      },
      ruleForm2: {
        chinaTel: ''
      },
      options2: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      rules: {
        telephpne: [
          { required: true, message: '请输入11位手机号', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入11位手机号', trigger: 'blur' }  //前端正则
        ],
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        chinaTel: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkchinaTel, trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    show () {
      var inputWord = this.searchinput.trim();
      if (inputWord == '') {
        this.options = this.initoptions;
        console.log(this.options);
      } else {
        this.options = this.options.filter((item) => {
          return item.label.includes(inputWord)
        })
      }
    }
  },
  created () {
    this.initoptions = JSON.parse(JSON.stringify(this.options));
  },
  mounted () {


  }
}
</script>

<style lang="scss" scoped>
@import "./forms.scss";
</style>