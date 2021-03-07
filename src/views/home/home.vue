<template>
  <div class="home">
    <el-container>
      <el-header class="d-flex justify-content-between align-items-center">
        <i class="el-icon-s-fold pointer SS" v-show="switchIcon==2" @click="isCollapseBtn(1)"></i>
        <i class="el-icon-s-unfold pointer ZK" v-show="switchIcon==1" @click="isCollapseBtn(2)"></i>
        <div class="d-flex align-items-center">
          <span class="welcom-admin">欢迎你，管理员！</span>
          <img class="admin-image pointer" :src="admin_image" alt="" @click="backAdmin">
        </div>
      </el-header>
      <el-container style="overflow:hidden">
        <!-- :default-active="this.$route.path" -->
        <el-menu :collapse="isCollapse" router default-active="this.$route.path" unique-opened class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#409Eff">
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
                  <el-menu-item v-for="(x,y) in value.menuChild" :key="y" :index="x.path" @click="addTab(x)">{{x.title}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-else :key="key" :index="value.path" @click="addTab(value)">
                  <i :class="value.icon"></i>
                  <span slot="title">{{value.title}}</span>
                </el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item v-else :key="i" :index="v.path" @click="addTab(v)">
              <i :class="v.icon"></i>
              <span slot="title">{{v.title}}</span>
            </el-menu-item>
          </template>
        </el-menu>
        <div class="flex-grow-1 d-flex flex-direction-column">
          <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab" @tab-click="tabClick">
            <el-tab-pane v-for="item in editableTabs" :key="item.index" :label="item.title+item.index" :name="item.index" :closable="item.closable">
            </el-tab-pane>
          </el-tabs>
          <div class="flex-grow-1 viewContainer">
            <router-view></router-view>
          </div>
        </div>
      </el-container>
    </el-container>
  </div>

</template>

<script> 
import {mapState} from "vuex"
export default {
  name: "home",
  data() {
    return {
      switchIcon: 2,
      editableTabsValue: "1", //tabs默认选中
      editableTabs: [
        //tabs标签数组
        {
          title: "表单页面",
          index: "1",
          path: "/home/forms",
          closable: false
        }
      ],
      admin_image: require("../../assets/images/admin.png"),
      //侧边栏数据
      menu_date: [
        //menuMark:0无子菜单，1有子菜单
        {
          title: "表单页面",
          menuMark: 0,
          index: "1",
          path: "/home/forms",
          icon: "el-icon-menu",
          closable: false
        },
        {
          title: "表格页面",
          menuMark: 0,
          index: "2",
          path: "/home/tables",
          icon: "el-icon-menu",
          closable: true
        },
        {
          title: "加载动画",
          menuMark: 1,
          index: "3",
          icon: "el-icon-location",
          menuChild: [
            {
              title: "按钮加载",
              menuMark: 0,
              index: "3-1",
              icon: "el-icon-menu",
              path: "/home/btnLoading",
              closable: true
            },
            {
              title: "全局加载",
              icon: "el-icon-menu",
              menuMark: 0,
              index: "3-2",
              path: "/home/allLoading",
              closable: true
            }
          ]
        },
        {
          title: "重复页",
          menuMark: 0,
          index: "4",
          path: "/home/repeatPage",
          icon: "el-icon-menu",
          closable: true
        }
      ],
      isCollapse: false
    };
  },
  methods: {
    isCollapseBtn(val) {
      this.switchIcon = val;
      if (this.switchIcon == 1) {
        this.isCollapse = true;
      } else {
        this.isCollapse = false;
      }
    },
    addTab(inData) {
      let flag = true; //可以新增
      this.editableTabs.forEach(v => {
        if (v.index == inData.index) {
          this.editableTabsValue = v.index;
          flag = false;
          return;
        }
      });
      if (flag) {
        this.editableTabs.push({
          title: inData.title,
          index: inData.index,
          path: inData.path,
          closable: inData.closable
        });
       this.editableTabsValue = inData.index; //打开新增的选项卡
      }
    },
    removeTab(targetIndex) {
      //console.log(targetIndex);
      //targetIndex   删除标签的index
      let activeIndex = this.editableTabsValue;
      if (activeIndex == targetIndex) {
        this.editableTabs.forEach((v, i) => {
          if (v.index === targetIndex) {
            let nextTab = this.editableTabs[i + 1] || this.editableTabs[i - 1];
            if (nextTab) {
              //已打开点击删除
              activeIndex = nextTab.index;
              let selctedArr = this.editableTabs.filter(v => {
                return v.index == activeIndex;
              });
              this.$router.push({ path: selctedArr[0].path });
            }
          }
        });
      }
      this.editableTabsValue = activeIndex;
      this.editableTabs = this.editableTabs.filter(
        tab => tab.index != targetIndex
      );
    },
    tabClick(tab) {
      let selctedArr = this.editableTabs.filter(v => {
        return v.index == tab.name;
      });
      this.$router.push({ path: selctedArr[0].path });
    },
    backAdmin(){
      sessionStorage.clear();
      this.$router.push({path:"/login"})
    }
  },
  created() {
     //this.menu_date=this.$store.state.menuList
     console.log(this.menuList)
    this.menu_date=this.menuList
  },
  //https://www.bilibili.com/video/BV15Q4y1K79c?from=search&seid=1809793221499468299  49.36
  mounted() {},
  computed:{
      ...mapState(["menuList"])  //映射数据
  }
};
</script>

<style lang="scss" scoped>
@import "./home.scss";
</style>