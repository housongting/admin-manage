//自定义指令注册
import Vue from "vue"
import router from "../router/index.js"
Vue.directive('permission', {
  inserted(el, binding) { //插入到dom节时触发,el当前触发的元素，binding指action后面的值
    const action = binding.value.action;
    const effect = binding.value.effect;
    //当前路由的组件是否具备action的权限
    // console.log(router.currentRoute.meta);
    //console.log(effect)
    if (router.currentRoute.meta.indexOf(action) == -1) {  //没找到执行此步骤,找到就一直显示不做任何操作
      if (effect == "disabled") {
        el.disabled = true;
        el.classList.add('is-disabled') //禁用
      } else { //不满足if条件
        el.parentNode.removeChild(el); //删除
      }
    }
  }
})