<template>
  <div class="bottom-bar">

    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-bottom" @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>
    
    <div class="calcuate" @click="calcClick"> 
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
      },
      isSelectAll() {
        //高阶函数
        
        //方法一
        //使用filter函数 都会被依次循环一遍
        //判断默认情况下cartList的长度 = 0 的情况下进行return返回为false
        //if(this.cartList.length === 0) return false
        //默认情况下是不选中, 判断当item.checked为true时则取反  现在就已经被选中
        // return !(this.cartList.filter( item => 
        //   item.checked
        // ).length)

        //方法二
        //使用find函数 只要满足条件则就会返回  这个函数在这种情况下使用性能比较高一些
        //判断默认情况下cartList的长度 = 0 的情况下进行return返回为false
        if(this.cartList.length === 0) return false
        //item.checked查找到没有选中的则取反 则返回函数进行取反
        return !this.cartList.find( item => 
          !item.checked
        )

        //方法三
        //使用普通写法
        //先循环遍历出数组
        //for(let item of this.cartList) {
          //判断item.checked为true时则取反为false 
        //  if(!item.checked) {
            //当判断条件为true时执行这部操作 返回false
        //    return false
        //  }
        //}
        //最后条件都满足的情况下返回true
        //return true
      }
    },
    methods: {
      checkClick() {
        //全部选中  
        if(this.isSelectAll) {
          //全部选中的情况下 点击则为false为不选中 
          this.cartList.forEach( item => 
            item.checked = false
          )
        //全部或部分不选中  
        } else {
          //全部或部分不选中的情况下 点击则为true为选中
          this.cartList.forEach( item => 
            item.checked = true
          )
        }
      },
      //去结算 
      calcClick() {
        if(!this.isSelectAll) {
          this.$toast.show("选择要购买的商品", 1000)  
        } 
      }
    },
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