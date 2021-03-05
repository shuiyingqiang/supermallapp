import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"

import FastClick from "fastclick"
import VueLazyLoad from "vue-lazyload"

import toast from "components/common/toast"

Vue.config.productionTip = false

//添加事件总线对象 原型new Vue 创建一个实例 赋值给$bus
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)

//解决移动端的300ms延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad, {
  //导入懒加载图片 默认不导入是白色
  loading: require("./assets/img/common/placeholder.png")
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
