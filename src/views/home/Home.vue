<template>
   <div id="home">
     <nav-bar class="home-nav">
        <div slot="center">购物街</div>
     </nav-bar>

       <scroll class="content" 
               ref="scroll"
               :probe-type="3" 
               @scroll="contentScroll"
               :pull-up-load="true"
               @pullingUp="loadMore">
         <home-swiper :banners1="banners"/>
         <recommend-view :recommends1="recommends"/>
         <featrue-view/>
         <tab-control class="tab-control" :titles1="titles" @tab-control="butClick"/>
         <goods-list :goods1="showGoods"/>
       </scroll>
       
       <!-- 元素组件我们是可以直接监听它的点击的
            但是构建组件的监听必须加上一个修饰符 .native -->
       <back-top @click.native="backClick" v-show="isShowBackTop"/>
         
   </div>
</template>

<script>
   import HomeSwiper from "./childComps/HomeSwiper"
   import RecommendView from "./childComps/RecommendView"
   import FeatrueView from "./childComps/FeatrueView"

   import NavBar from "components/common/navbar/NavBar"
   import TabControl from "components/content/tabControl/TabControl"
   import GoodsList from "components/content/goods/GoodsList"
   import Scroll from "components/common/scroll/Scroll"
   import BackTop from "components/content/backTop/BackTop"
   
   import {getHomeMultidata, getHomeGoods} from "network/home"

   export default {
      name:'Home',
      components: {
         NavBar,
         HomeSwiper,
         RecommendView,
         FeatrueView,
         TabControl,
         GoodsList,
         Scroll,
         BackTop

      },
      data() {
         return {
            banners: [],
            recommends: [],
            titles: ['流行','新款','精选'],
            goods: {
               "pop": {page: 0, list: []},
               "new": {page: 0, list: []},
               "sell": {page: 0, list: []}
            },
            currentType: "pop",
            isShowBackTop: false
         }  
      },
      methods: {
         /*
           网络请求相关方法
         */
        getHomeMultidata() {
          getHomeMultidata().then(res => {
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list
          })
        },
        getHomeGoods(type) {
          const page = this.goods[type].page + 1
          getHomeGoods(type, page).then(res => {
            this.goods[type].list.push(...res.data.data.list)
            this.goods[type].page += 1

            this.$refs.scroll.finishPullUp()
          })
        },
        /*
          事件监听相关方法
        */
        butClick(index) {
          switch(index) {
            case 0:
              this.currentType = "pop"
              break
            case 1:
              this.currentType = "new"
              break
            case 2:
               this.currentType = "sell"  
              break 
          }
          console.log(index);
        },
        backClick() {
          this.$refs.scroll.scrollTo(0,0)
          console.log("backClick");
        },
        contentScroll(position) {
          //-position.y 先将position实时监听的位置转成正值(-)
          this.isShowBackTop = -(position.y) > 1000
        },
        loadMore() {
          this.getHomeGoods(this.currentType)
        }
      },
      computed: {
        showGoods() {
           return this.goods[this.currentType].list
        }
      },
      //生命周期函数 在模板渲染成html或者模板编译进路由前调用  created()
      created() {
        //1.请求多个数据
        this.getHomeMultidata()

        //2.请求商品数据
        this.getHomeGoods("pop")
        this.getHomeGoods("new")
        this.getHomeGoods("sell")
      },
      //生命周期函数 在已完成模板已经渲染或el挂载对应html渲染后调用  mounted()
      mounted() {
        //3.监听item中图片加载完成
        this.$bus.$on("itemImageLoad", () => {
          this.$refs.scroll.refresh()
        })
      },
   }
</script>

<!-- scoped作用域  -->
<style scoped>
  #home {
     height: 100vh;
     padding-top: 44px;
     position: relative;
  }
  .home-nav {
     background-color: var(--color-tint);
     color: #fff;

     position: fixed;
     left: 0;
     right: 0;
     top: 0;
     z-index: 9;
  }
  .tab-control {
     position: sticky;
     top:44px;
     z-index: 9;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 44px;
    height:calc(100% - 93px);
    overflow: hidden;
  }
</style>