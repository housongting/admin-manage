//自定义指令注册
import Vue from "vue"
import router from "../router/index.js"
Vue.directive('permission', {
  inserted(el, binding) { //插入到dom节时触发,el当前触发的元素，binding指action后面的值
    // console.log(el);
    // console.log(binding.value.action);
    const action = binding.value.action;
    const effect = binding.value.effect;
    //当前路由的组件是否具备action的权限
    console.log(router.currentRoute.meta);
    if (router.currentRoute.meta.indexOf(action) == -1) {
      //107.21
      if (effect === "disabled") {
        el.disabled = true;
        el.classList.add('is-disabled') //禁用
      } else {
        el.parentNode.removeChild(el); //删除
      }
    }
  }
})