<template>
   <div class="tab-bar-item" @click="itemClick">
     <div v-if="!isActive">
       <slot name="item-icon"></slot>
     </div>
     <div v-else>
       <slot name="item-icon-active"></slot>
     </div>
     <div :style="activeStyle">
       <slot name="item-text"></slot>
     </div>
   </div>
</template>

<script>
export default {
   name:'TabBarItem',
   props: {
     path: String,
     //父传子 App.vue向TabBatItem传的属性
     activeColor: {
          type:String,
          default: "red"
     }
   },
   data() {
     return {
       //isActive:true 
     }
   },
   computed: {
      isActive() {
        // home -> item(/home) = true
        // home -> item(/cart) = false
        // home -> item(/category) = true
        // home -> item(/profile) = true
        //$route当前活跃    indexOf == -1  没有找到 则是false
        return this.$route.path.indexOf(this.path) !== -1 
      },
      activeStyle() {
        /*三目运算符   例子: b ? x : y 先计算条件b，然后进行判断，如果b的值为true，计算x的值 运算结果为x的值
                                      否则计算y的值，运算结果为y的值。*/
        return this.isActive ? {color: this.activeColor} : {}   
      }
   },
   methods: {
     itemClick() {
       //                             .catch(err => {} ) 异常捕获 
       this.$router.replace(this.path).catch(err => {} )
     }
   },
}
</script>
    
<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img {
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>