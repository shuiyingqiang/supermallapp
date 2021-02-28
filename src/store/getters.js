export default {
  cartLength(state) {
    //cartlist数组里面的长度  
    return state.cartList.length  
  },  
  cartList(state) {
    //cartlist数组的数据
    return state.cartList
  }
}