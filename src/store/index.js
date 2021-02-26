import Vue from "vue"
import Vuex from "vuex"

import mutations from "./mutations"
import actions from "./actions"

//1.安装插件
Vue.use(Vuex)

const state = {
  cartList: []  
}
//2.创建Store对象
const store = new Vuex.Store({
  //定义共享数据
  state,
  //方法
  mutations,
  //异步操作
  actions  
})

//3.挂载到Vue实例上
export default store