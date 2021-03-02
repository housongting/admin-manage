<template>
  <div class="home">
    <el-container>
      <el-header class="d-flex justify-content-between align-items-center">
        <i class="el-icon-s-fold pointer SS" v-show="switchIcon==2" @click="isCollapseBtn(1)"></i>
        <i class="el-icon-s-unfold pointer ZK" v-show="switchIcon==1" @click="isCollapseBtn(2)"></i>
        <div class="d-flex align-items-center">
          <span class="welcom-admin">欢迎你，管理员！</span>
          <img class="admin-image pointer" :src="admin_image" alt="">
        </div>
      </el-header>
      <el-container>
        <el-menu :collapse="isCollapse" :default-active="this.$route.path" router unique-opened class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#409Eff">
          <template v-for="(v,i) in menu_date">
            <!-- 一级 -->
            <el-submenu v-if="v.menuMark==1" :key="i" :index="v.index">
              <template slot="title">
                <i :class="v.icon"></i>
                <span>{{v.title}}</span>
              </template>
              <!-- 二级 -->
              <template v-for="(value,key) in v.menuChild">
                <el-submenu v-if="value.menuMark==1" :key="key" :index="value.index">
                  <template slot="title">
                    <i :class="value.icon"></i>
                    <span>{{value.title}}</span>
                  </template>
                  <!-- 三级未做下拉 -->
                  <el-menu-item v-for="(x,y) in value.menuChild" :key="y" :index="x.path" @click="addTab(x.index)">{{x.title}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-else :key="key" :index="value.path" @click="addTab(value.index)">
                  <i :class="value.icon"></i>
                  <span slot="title">{{value.title}}</span>
                </el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item v-else :key="i" :index="v.path" @click="addTab(v.index)">
              <i :class="v.icon"></i>
              <span slot="title">{{v.title}}</span>
            </el-menu-item>
          </template>
        </el-menu>
        <div class="flex-grow-1">
          <div class="tab_tabs">
            <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
              <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
              </el-tab-pane>
              <!-- <div class="scroll-bar"></div> -->
            </el-tabs>
          </div>
          <!-- <router-view></router-view> -->
        </div>
      </el-container>
    </el-container>
  </div>

</template>

<script>
export default {
  name: "home",
  data () {
    return {
      switchIcon: 2,
      admin_image: require('../../assets/images/admin.png'),
      menu_date: [
        //menuMark:0无子菜单，1有子菜单
        { title: '表单页面', menuMark: 0, index: '1', path: '/home/form', icon: 'el-icon-menu' },
        { title: '表格页面', menuMark: 0, index: '2', path: '/home/tables', icon: 'el-icon-menu' },
        {
          title: '加载动画页面',
          menuMark: 1,
          index: '3',
          icon: 'el-icon-location',
          menuChild: [
            {
              title: '按钮加载',
              menuMark: 0,
              index: '3-1',
              icon: 'el-icon-menu',
              path: '/home/btnLoading'
            },
            {
              title: '全局/局部加载',
              menuMark: 1,
              index: '3-2',
              icon: 'el-icon-location',
              menuChild: [
                { title: '全局加载', menuMark: 0, index: '3-2-1', path: '/home/allLoading' },
                { title: '局部加载', menuMark: 0, index: '3-2-2', path: '/home/partLoading' },
              ]
            },
          ]
        },
      ],
      isCollapse: false,
      editableTabsValue: '2',
      editableTabs: [
        {
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2sdfsdfsdfsdf',
          name: '2',
          content: 'Tab 2 content'
        }
      ],
      tabIndex: 2
    }
  },
  methods: {
    isCollapseBtn (val) {
      this.switchIcon = val;
      if (this.switchIcon == 1) {
        this.isCollapse = true
      } else {
        this.isCollapse = false
      }
    },
    addTab (targetName) {
      let newTabName = ++this.tabIndex + '';
      console.log(newTabName, targetName)

      // this.editableTabs.push({
      //   title: 'New Tab',
      //   name: newTabName,
      //   content: 'New Tab content'
      // });
      // this.editableTabsValue = newTabName;
    },
    removeTab (targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./home.scss";
</style>