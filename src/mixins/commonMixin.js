let commonMixin
commonMixin = {
  methods: {
    pushPage(name, param) { //删除或者新增改变的路由
      if (param) {
        this.$router.push({
          path: '/home/' + name,
          query: {
            id: param
          }
          // params: param
        })
      } else {
        this.$router.push({
          path: '/home/' + name
        })
      }
    },
    reload() {
      this.$store.state.idreload = false
      console.log(this.$store.state.idreload);
      this.$nextTick(() => function () {
        this.$store.state.idreload = true
      })
    },
    closePage(num) {
      // (num,param)
      if (num) {
        this.$store.state.tagList.splice(num, 1)
        this.$store.state.includePageNames.splice(num, 1)
        this.$store.state.tagSelected = (num - 1) + ''
        this.pushPage(this.$store.state.tagList[num - 1].url, this.$store.state.tagList[num - 1].param)
      } else {
        let num = parseInt(this.$store.state.tagSelected)
        this.$store.state.tagList.splice(num, 1)
        this.$store.state.includePageNames.splice(num, 1)
        this.$store.state.tagSelected = (num - 1) + ''
        this.pushPage(this.$store.state.tagList[num - 1].url, this.$store.state.tagList[num - 1].param)
      }
    },
    closeSelfToReload(name) { //name指关闭页面后，跳转到那个页面
      // console.log(name) 
      let num = null
      this.$store.state.includePageNames.forEach(function (value, index) {
        if (name === value) {
          num = index + 1 //
          console.log(num, index);
        }
      })
      this.closePage(num)
      this.reload()
    },
    addTab(url, title, param) {
      this.pushPage(url, param)
      if (this.$store.state.tagList[0] === undefined) { //判断是否有第一项
        let arr = {
          title: title,
          url: url,
          param: param,
        }
        this.$store.state.includePageNames.push(url) //缓存新页面
        this.$store.state.tagList.push(arr)
        this.$store.state.tagSelected = (this.$store.state.tagList.length - 1) + ''
      } else {
        //console.log(this.$store.state.tagList)
        for (let [index, cur] of this.$store.state.tagList.entries()) {
          //if (cur.title === title) { //新增标签在tagList含有，title相同，则直接打开
          if (cur.title === title && cur.param === param) { //新增标签在tagList含有，title和param相同，则直接打开
            this.$store.state.tagSelected = index + ''
            return
          } else { //新增标签页
            if (index === this.$store.state.tagList.length - 1) {
              let arr = {
                title: title,
                url: url,
                param: param,
              }
              this.$store.state.includePageNames.push(url)
              this.$store.state.tagList.push(arr)
              this.$store.state.tagSelected = (this.$store.state.tagList.length - 1) + ''
            }
          }
        }
      }
    }
  }
}
export default commonMixin