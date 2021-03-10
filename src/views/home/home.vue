<template>
  <div class="home">
    <el-container>
      <el-header class="d-flex justify-content-between align-items-center">
        <i class="el-icon-s-fold pointer SS" v-show="switchIcon==2" @click="isCollapseBtn(1)"></i>
        <i class="el-icon-s-unfold pointer ZK" v-show="switchIcon==1" @click="isCollapseBtn(2)"></i>
        <div class="d-flex align-items-center">
          <span class="welcom-admin">欢迎你，{{username}}！</span>
          <img class="admin-image pointer" :src="admin_image" alt="" @click="backAdmin">
        </div>
      </el-header>
      <div class="contentBox">
        <el-menu :collapse="isCollapse" router default-active="this.$route.path" unique-opened :collapse-transition="false" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#409Eff">
          <template v-for="(v,i) in menu_date">
            <!-- 一级 -->
            <el-submenu v-if="v.menuMark==1" :key="i" :index="v.id">
              <template slot="title">
                <i :class="v.icon"></i>
                <span>{{v.title}}</span>
              </template>
              <!-- 二级 -->
              <template v-for="(value,key) in v.menuChild">
                <el-submenu v-if="value.menuMark==1" :key="key" :index="value.id">
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
        <div class="rightContentBox">
          <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab" @tab-click="tabClick">
            <el-tab-pane v-for="item in editableTabs" :key="item.id" :label="item.title" :name="item.id" :closable="true">
            </el-tab-pane>
          </el-tabs>
          <div class="viewContainer bg-color" v-loading="this.$store.state.loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script> 
import { mapState } from "vuex"
export default {
  name: "home",
  data () {
    return {
      username: '',
      switchIcon: 2,
      editableTabsValue: "1", //tabs默认选中
      editableTabs: [],//tabs标签数组
      admin_image: require("../../assets/images/admin.png"),
      //侧边栏数据
      menu_date: [],
      isCollapse: false
    };
  },
  methods: {
    isCollapseBtn (val) {
      this.switchIcon = val;
      if (this.switchIcon == 1) {
        this.isCollapse = true;
      } else {
        this.isCollapse = false;
      }
    },
    addTab (inData) {
      let flag = true; //可以新增
      this.editableTabs.forEach(v => {
        if (v.id == inData.id) {
          this.editableTabsValue = v.id;
          flag = false;
          return;
        }
      });
      if (flag) {
        this.editableTabs.push({
          title: inData.title,
          id: inData.id,
          path: inData.path,
          //  closable: inData.closable
        });
        this.editableTabsValue = inData.id;  //打开且选中新增的选项卡
      }
    },
    removeTab (targetId) {
      //console.log(targetId);
      //targetId   删除标签的ID
      let activeId = this.editableTabsValue;
      if (activeId == targetId) {
        this.editableTabs.forEach((v, i) => {
          if (v.id === targetId) {
            let nextTab = this.editableTabs[i + 1] || this.editableTabs[i - 1];
            if (nextTab) {
              //已打开点击删除
              activeId = nextTab.id;
              let selctedArr = this.editableTabs.filter(v => {
                return v.id == activeId;
              });
              this.$router.push({ path: selctedArr[0].path });
            }
          }
        });
      }
      this.editableTabsValue = activeId;
      this.editableTabs = this.editableTabs.filter(
        tab => tab.id != targetId
      );
    },
    tabClick (tab) {
      let selctedArr = this.editableTabs.filter(v => {
        return v.id == tab.name;
      });
      this.$router.push({ path: selctedArr[0].path });
    },
    backAdmin () {
      //删除sessionStorage数据
      sessionStorage.clear();
      //清除vuex中的数据---让当前页面刷新
      this.$router.push({ path: "/login" })
      window.location.reload();
    }
  },
  created () {
    this.username = this.$store.state.username;
    this.menu_date = this.menuList
  },
  mounted () { },
  computed: {
    ...mapState(["menuList"])  //映射数据
  },

};
</script>

<style lang="scss" scoped>
@import "./home.scss";
</style>