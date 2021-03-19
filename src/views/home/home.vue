<template>
  <div class="home">
    <el-container>
      <el-header class="d-flex justify-content-between align-items-center">
        <img src="../../assets/images/scLogo.png" alt="">
        <div class="d-flex align-items-center">
          <span class="welcom-admin">欢迎你，{{username}}！</span>
          <el-dropdown size="medium" placement="bottom">
            <span class="el-dropdown-link">
              <img class="admin-image pointer" :src="admin_image" alt="">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="backAdmin">退出系统</el-dropdown-item>
              <el-dropdown-item divided>个人信息</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <div class="contentBox">
        <el-menu :collapse="isCollapse" router unique-opened :default-active="this.$route.path" :collapse-transition="false" class="el-menu-vertical-demo" background-color="#fff" text-color="#409EFF" active-text-color="#409EFF">
          <div class="text-center switchCla pointer" style="border-bottom:1px solid #eee">
            <p v-show="switchIcon==2" @click="isCollapseBtn(1)">
              <i class="el-icon-s-fold pointer SS mr-2" style="font-size:1.2rem"></i><span>收缩</span>
            </p>
            <p v-show="switchIcon==1" @click="isCollapseBtn(2)" style="font-size:13px">
              <i class="el-icon-s-unfold pointer ZK mr-2"></i><span>展开</span>
            </p>
          </div>
          <template v-for="(v,i) in menu_date">
            <!-- 一级 -->
            <el-submenu v-if="v.dropdown==1" :key="i" :index="v.id" style="border-bottom:1px solid #eee">
              <template slot="title">
                <i :class="v.icon"></i>
                <span>{{v.title}}</span>
              </template>
              <!-- 二级 -->
              <template v-for="(value,key) in v.menuChild">
                <el-submenu v-if="value.dropdown==1" :key="key" :index="value.id">
                  <template slot="title">
                    <i :class="value.icon"></i>
                    <span>{{value.title}}</span>
                  </template>
                  <!-- 三级未做下拉 -->
                  <!-- <el-menu-item v-for="(x,y) in value.menuChild" :key="y" :index="x.path" @click="addTab(x.url,x.title)">{{x.title}}</el-menu-item> -->
                </el-submenu>
                <el-menu-item v-else :key="key" :index="value.path" @click="addTab(value.url,value.title)">
                  <i :class="value.icon"></i>
                  <span>{{value.title}}</span>
                  <div class="NEWS" v-show="isNEWS==1">45</div>
                </el-menu-item>
              </template>
            </el-submenu>

            <el-menu-item v-else :key="i" :index="v.path" @click="addTab(v.url,v.title)" style="border-bottom:1px solid #eee">
              <i :class="v.icon"></i>
              <span>{{v.title}}</span>
              <div class="NEWS" v-show="isNEWS==1">255</div>
            </el-menu-item>

          </template>
        </el-menu>
        <div class="rightContentBox">
          <el-tabs v-model="$store.state.tagSelected" type="card" closable @tab-remove="removeTab" @tab-click="tabClick">
            <el-tab-pane v-for="(item,index) in tagList" :key="index" :label="item.title" :name="index+''">
            </el-tab-pane>
          </el-tabs>
          <div class="viewContainer bg-color" v-loading="this.$store.state.loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <keep-alive :include="includePageNames">
              <router-view v-if="$store.state.isreload"></router-view>
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
      isNEWS: 1,
      username: '',
      switchIcon: 2,
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
        this.isCollapse = true;   //折叠
        this.isNEWS = 0;    //隐藏
      } else {
        this.isCollapse = false;  //不折叠
        this.isNEWS = 1;  //显示
      }
    },
    backAdmin () {
      console.log(11);
      //删除sessionStorage数据
      sessionStorage.clear();
      //清除vuex中的数据---让当前页面刷新
      this.$router.push({ path: "/login" })
      window.location.reload();
    },
    removeTab (val) {
      // console.log(val)  //tagList点击关闭项的索引值
      let num = parseInt(val)
      let nowNum = parseInt(this.$store.state.tagSelected)
      // let name, param
      // name = this.$store.state.tagList[num].url //点击关闭项的路径
      // param = this.$store.state.tagList[num].param //点击关闭项的传参
      //关闭tag
      if (num === nowNum) {
        //当关闭页面是当前页
        if (num === this.$store.state.tagList.length - 1) {
          //当关闭页面是最右侧页面
          if (this.$store.state.tagList.length === 1) {
            //当关闭页面是存在的唯一一个页面
            // this.$message.error('暂无法关闭最后一个页面，根据具体需求再调整')
            this.$store.state.tagList = []
            this.$store.state.includePageNames = []
            this.$store.state.tagSelected = 0
          } else {
            this.$store.state.tagList.splice(num, 1)
            this.$store.state.includePageNames.splice(num, 1)
            this.$store.state.tagSelected = (num - 1) + ''
            this.pushPage(this.$store.state.tagList[num - 1].url, this.$store.state.tagList[num - 1].param)
          }
        } else {
          //当关闭页面是非唯一的页面
          this.$store.state.tagList.splice(num, 1)
          this.$store.state.includePageNames.splice(num, 1)
          this.pushPage(this.$store.state.tagList[num].url, this.$store.state.tagList[num].param)
        }
      } else {
        //当关闭页面不是当前页
        this.$store.state.tagList.splice(num, 1)
        this.$store.state.includePageNames.splice(num, 1)
        if (num < nowNum) {
          nowNum--
          this.$store.state.tagSelected = nowNum + ''
        }
      }
    },
    tabClick (val) {
      //console.log(val);   //vue实例
      let num = val._props.name //在tagList的索引
      let nowNum = parseInt(this.$store.state.tagSelected)
      //点击tag切换页面
      if (num !== nowNum) {
        //this.$store.state.tagSelected = nowNum + ''
        this.pushPage(this.$store.state.tagList[num].url, this.$store.state.tagList[num].param)
      }
    }
  },
  created () {
    this.username = this.$store.state.username;
    this.menu_date = this.menuList
  },
  mounted () { },
  computed: {
    ...mapState(['includePageNames', 'tagList', 'tagSelected', 'menuList']) //映射数据
  },

};
</script>

<style lang="scss" scoped>
@import "./home.scss";
</style>