<template>
  <div class="p-15">
    <div class="bg-white p-3 screenDiv">

      <div class="d-flex align-items-center">
        <span class="flex-shrink-0 align-self-start p-2">全部结果：</span>
        <ul class="allResults d-flex align-items-center flex-wrap">
          <li class="p-2 ml-3 mb-2" v-for="(item,index) in resultsList" :key="index" v-show="item.list.length>0">
            <span>{{item.name}}</span>
            <span class="resDetails mr-2">{{item.list.join(",")}}</span>
            <i class="el-icon-close pointer" @click="clearEmpty(item)"></i>
          </li>
        </ul>
      </div>
      <!-- 筛选条件 -->
      <div class="mt-3" style="border-top: 1px solid #DDD;">
        <div class="d-flex screenCondition" v-for="(v,i) in screenList" :key="i">
          <div class="screenTitle pl-3 pt-2 pb-2 pr-3 flex-shrink-0">
            <strong>{{v.screenTitle}}</strong>
          </div>
          <ul :class="['d-flex','pb-2','flex-grow-1','align-items-center','overflow-hidden',v.conditionMore ? 'flex-nowrap' : 'flex-wrap']">
            <li class="mt-2 flex-shrink-0" @click="addLi(v.id,val)" v-for="(val,key) in v.screenDetils" :key="key">{{val}}</li>
          </ul>
          <div class="selectBtn flex-shrink-0 ml-2">
            <el-button class="mr-1 mt-1 ml-2" size="mini" @click="btnMore(v)" v-show="v.more">{{v.more}}</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white p-3 mt-3"></div>

  </div>
</template>

<script>
export default {
  name: 'querypage',
  data () {
    return {
      screenList: [
        { id: 1, conditionMore: true, more: "更多", screenTitle: '品牌：', screenDetils: ['林氏木业', '芝华仕（CHEERS）', '顾家家居（KUKA）', '喜临门', '掌上明珠家居（M&Z）', '丽巢', '鲁花', '道道全', '长寿花', '长寿花2', '长寿花3', '长寿花4', '长寿花5', '长寿花6'] },
        { id: 2, conditionMore: false, more: '', screenTitle: '分类：', screenDetils: ['京东时尚', '美妆馆', '超市', '生鲜', '京东国际', '拍卖', '闪购'] },
        { id: 3, conditionMore: false, more: '', screenTitle: '材质类别：', screenDetils: ['实木床', '板式床', '板木床', '藤艺床', '皮床', '铁艺床', '布艺床', '铁床', '布床'] },
        { id: 4, conditionMore: true, more: "更多", screenTitle: '品牌2：', screenDetils: ['林氏木业', '芝华仕（CHEERS）', '顾家家居（KUKA）', '喜临门', '掌上明珠家居（M&Z）', '丽巢', '鲁花', '道道全', '长寿花', '长寿花2', '长寿花3', '长寿花4', '长寿花5', '长寿花6'] },
      ],
      resultsList: [
        { name: '品牌：', list: [] },
        { name: '分类：', list: [] },
        { name: '材质类别：', list: [] },
        { name: '品牌2：', list: [] },
      ]
    }
  },
  methods: {
    btnMore (v) {
      v.conditionMore = !v.conditionMore;
      if (v.conditionMore) {
        v.more = "更多"
      } else {
        v.more = "收起"
      }
    },
    addLi (id, val) {
      switch (id) {
        case 1:
          if (this.resultsList[0].list.indexOf(val) == -1) {
            this.resultsList[0].list.push(val);
          }
          break
        case 2:
          if (this.resultsList[1].list.indexOf(val) == -1) {
            this.resultsList[1].list.push(val);
          }
          break
        case 3:
          if (this.resultsList[2].list.indexOf(val) == -1) {
            this.resultsList[2].list.push(val);
          }
          break
        case 4:
          if (this.resultsList[3].list.indexOf(val) == -1) {
            this.resultsList[3].list.push(val);
          }
          break
      }
    },
    clearEmpty (item) {
      item.list = []
    }

  }
}
</script>

<style lang="scss" scoped>
@import "./querypage.scss";
</style>