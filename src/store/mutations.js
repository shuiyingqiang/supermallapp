import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutaions-type.js"

export default {
  //mutations唯一的目的计算修改state中的状态
  //mutations中的每一个方法尽可能完成的事件比较单一
  [ADD_COUNTER](state, payload) {
    payload.count ++ 
  },
  [ADD_TO_CART](state, payload) {
    //记录整条数据是否被选中 默认为被选中
    payload.checked = true
    state.cartList.push(payload)
  }
    
}