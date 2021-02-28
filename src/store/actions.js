import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutaions-type.js"

export default {
  addCart(context, payload) {
    //Promise异步请求操作
    return new Promise((resolve, reject) => {
      //payload新添加的商品

      //1.查找之前数组中是否有该元素
      //在这我们用了数组中的另外一个函数方法find 查找到该元素则为true
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
          
      //2.判断oldProduct
      //数量 + 1
      if(oldProduct) {
        //当判断条件为true时 进行+1  
        //oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve("当前的商品数量 + 1")
      //添加新的商品
      }else {
        //当判断条件为flase时 进行赋值=1  
        payload.count = 1  
        //push 在state中的cartList数组中的末尾追加新的商品payload
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve("添加了新的商品")
      }
    })
  }    
}