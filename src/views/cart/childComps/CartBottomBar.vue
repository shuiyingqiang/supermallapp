<template>
  <div class="bottom-bar">

    <div class="check-content">
      <check-button class="check-bottom"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>
    
    <div class="calcuate"> 
      去结算: ({{checkLength}})
    </div>

  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton"

  import { mapGetters } from "vuex"

  export default {
    name:'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(["cartList"]),
      totalPrice() {
        //高阶函数
        return "￥" + this.cartList.filter( item => 
          //当箭头函数为true时执行里面的操作
          item.checked 
          //.reduce计算总和函数 传两个参 一个是当前有的 一个是最新的总数据
        ).reduce((preValue, item) => {
          //将原来的值加上每一次添加商品后的值进行相加
          return preValue + item.price * item.count
          //.toFixed函数 保留两位小数
        }, 0).toFixed(2)
      },
      checkLength() {
        //高阶函数
        return this.cartList.filter( item =>
          //当箭头函数为true时执行里面的操作
          item.checked
          //.length得到cartList数组的一个长度
        ).length
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    display: flex;
    position: relative;
    font-size: 14px;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
  .check-bottom {
    width:20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 20px;
  }
  .calcuate {
    width: 100px;
    background-color: red;
    color: #fff;
    text-align: center;
    position: absolute;
    right: 0;
  }
</style>