<template>
  <div class="p-15">
    <div class="bg-white p-3 screenDiv">

      <div class="d-flex align-items-center">
        <span class="flex-shrink-0 align-self-start p-2">筛选条件：</span>
        <ul class="allResults d-flex align-items-center flex-wrap">
          <li class="p-2 ml-3 mb-2" v-for="(item,index) in resultsList" :key="index" v-show="item.list.length>0">
            <span>{{item.name}}</span>
            <span class="resDetails mr-2">{{item.list.join(",")}}</span>
            <i class="el-icon-close pointer" @click="clearEmpty(item)"></i>
          </li>
        </ul>
      </div>
      <!-- 筛选条件分类 -->
      <div class="mt-3" style="border-top: 1px solid #DDD;">
        <div class="d-flex screenCondition" v-for="(v,i) in screenList" :key="i">

          <div class="screenTitle pl-3 pt-2 pb-2 pr-3 flex-shrink-0">
            <strong>{{v.screenTitle}}</strong>
          </div>
          <!-- 单选 -->
          <div v-show="!v.ismulorclick" class="flex-grow-1">
            <ul :class="['d-flex','pb-2','align-items-center','overflow-hidden',v.conditionMore ? 'flex-nowrap' : 'flex-wrap']">
              <li class="mt-2 flex-shrink-0" @click="addLi(v.id,val)" v-for="(val,key) in v.screenDetils" :key="key">{{val}}</li>
            </ul>
          </div>
          <!-- 多选 -->
          <div v-show="v.ismulorclick" class="flex-grow-1">
            <div class="pb-2" style="padding-left:16px">
              <el-checkbox-group v-model="v.mulCheckArr" style="max-height:100px;overflow-y:auto;">
                <el-checkbox class="mt-2 flex-shrink-0" v-for="(item,index) in v.screenDetils" :label="item" :key="index">{{item}}</el-checkbox>
              </el-checkbox-group>
              <div class="text-center mt-2">
                <el-button type="primary" size="mini" class="mr-2" @click="hideChekBox(true,v)">确定</el-button>
                <el-button size="mini" @click="hideChekBox(false,v)">取消</el-button>
              </div>
            </div>
          </div>

          <div class="selectBtn flex-shrink-0 ml-2">
            <el-button class="mr-1 mt-1 ml-2" size="mini" @click="btnMore(v)" v-show="v.more">{{v.more}}</el-button>
            <el-button class="mr-1 mt-1 ml-1" size="mini" @click="btnmulCheck(v)" v-show="v.multipleCheck">{{v.multipleCheck}}</el-button>
          </div>
        </div>
      </div>
    </div>

  
  </div>
</template>

<script>
export default {
  name: "querypage",
  data() {
    return {
      screenList: [
        {
          id: 1,
          conditionMore: true,
          more: "更多",
          multipleCheck: "多选",
          screenTitle: "品牌：",
          ismulorclick: false, //true多选，false单选
          mulCheckArr: [],
          screenDetils: [
            "林氏木业",
            "芝华仕（CHEERS）",
            "顾家家居（KUKA）",
            "喜临门",
            "掌上明珠家居（M&Z）",
            "丽巢",
            "鲁花",
            "道道全",
            "长寿花",
            "长寿花2",
            "长寿花3",
            "长寿花4",
            "长寿花5",
            "长寿花6"
          ]
        },
        {
          id: 2,
          conditionMore: false,
          more: "",
          ismulorclick: false,
          screenTitle: "分类：",
          mulCheckArr: [],
          screenDetils: [
            "京东时尚",
            "美妆馆",
            "超市",
            "生鲜",
            "京东国际",
            "拍卖",
            "闪购"
          ]
        },
        {
          id: 3,
          conditionMore: false,
          more: "",
          screenTitle: "材质类别：",
          ismulorclick: false,
          mulCheckArr: [],
          screenDetils: [
            "实木床",
            "板式床",
            "板木床",
            "藤艺床",
            "皮床",
            "铁艺床",
            "布艺床",
            "铁床",
            "布床"
          ]
        },
        {
          id: 4,
          conditionMore: true,
          more: "更多",
          multipleCheck: "多选",
          screenTitle: "品牌2：",
          ismulorclick: false,
          mulCheckArr: [],
          screenDetils: [
            "林氏木业",
            "芝华仕（CHEERS）",
            "顾家家居（KUKA）",
            "喜临门",
            "掌上明珠家居（M&Z）",
            "丽巢",
            "鲁花",
            "道道全",
            "长寿花",
            "长寿花2",
            "长寿花3",
            "长寿花4",
            "长寿花5",
            "长寿花6"
          ]
        }
      ],
      resultsList: [
        { id: 1, name: "品牌：", list: [] },
        { id: 2, name: "分类：", list: [] },
        { id: 3, name: "材质类别：", list: [] },
        { id: 4, name: "品牌2：", list: [] }
      ]
    };
  },
  created() {},
  methods: {
    btnmulCheck(v) {
      v.more = "";
      v.multipleCheck = "";
      v.ismulorclick = true;
    },
    hideChekBox(flag, v) {
      //确定
      if (flag) {
        this.resultsList.forEach(item => {
          if (item.id == v.id) {
            item.list = v.mulCheckArr;
          }
        });
      }
      v.more = "更多";
      v.multipleCheck = "多选";
      v.ismulorclick = false;
    },
    btnMore(v) {
      v.conditionMore = !v.conditionMore;
      if (v.conditionMore) {
        v.more = "更多";
      } else {
        v.more = "收起";
      }
    },
    addLi(id, val) {
      this.resultsList.forEach(v => {
        if (v.id == id) {
          if (v.list.indexOf(val) != -1) {
            return
          }
        }
        this.screenList.forEach(x => {
          if (id == v.id && x.id == id) {
            v.list.push(val); //添加到筛选条件
            x.mulCheckArr = v.list; //筛选条件与多选一致
          }
        });
      });
    },
    clearEmpty(item) {
      item.list = [];
      this.screenList.forEach(v => {
        if (v.id == item.id) {
          v.mulCheckArr = [];
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./querypage.scss";
</style>