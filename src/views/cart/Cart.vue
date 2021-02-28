<template>
  <div class="cart">
    <!-- 顶部导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list/>

    <!-- 底部工具栏 -->
    <cart-bottom-bar/>

 </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import CartList from "./childComps/CartList"
  import CartBottomBar from "./childComps/CartBottomBar"

  import { mapGetters } from "vuex"

  export default {
    name:'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
   },
   computed: {
     //两种写法
     //写法1
     //...mapGetters(["cartLength", "cartList"])
     //写法2
     ...mapGetters({
       //取别名 cartlength获取到数组的长度赋值给length 
       length: "cartLength",
       //取别名 cartlist获取到数组的数据赋值给list
       //list: "cartList"
     }) 
   }
  }
</script>

<style scoped>
  .cart {
     height: 100vh;
  }
  .nav-bar {
     background-color: var(--color-tint);
     color: #fff;
  }
</style>