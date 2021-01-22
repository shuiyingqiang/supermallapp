<template>
   <!-- ref 父子访问  
        ref如果是绑定在组件中的，那么通过this.$refs.名 获取到的是一个组件对象
        ref如果是绑定在普通的元素中，那么通过this.$refs.名 获取到的是一个元素对象
    -->
   <div class="wrapper" ref="wrapper">
     <div class="content">
       <slot></slot>
     </div>
   </div>
</template>

<script>
  import BScroll from "better-scroll"
  
  export default {
    name:'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type:Boolean,
        default:false
      }    
    },
    data() {
        return {
            scroll: null
        }
    },
    //生命周期函数  函数一创建时执行此方法
    mounted() {
      //这种方式获取是不太友好的 怕元素设置的 class=.  id=#  同名问题  
      //document.querySelector(".wrapper")获取第一个元素
      //console.log(document.querySelector(".wrapper")); 

      //1.创建Bscroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      })  

      //2.监听滚动的位置
      this.scroll.on("scroll", (position) => {  
        this.$emit("scroll", position)
      })

      //3.上拉加载事件
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp")
      })
    },
    methods: {
      scrollTo(x, y, time=1000) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      }
    },
  }
</script>

<style scoped>

</style>