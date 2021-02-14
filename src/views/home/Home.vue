<template>
   <div id="home">
     <nav-bar class="home-nav">
        <div slot="center">购物街</div>
     </nav-bar>
      <tab-control class="tab-controlMin" 
                      :titles1="titles" 
                      @tab-control="butClick" 
                      ref="tabControl1"
                      v-show="isTabFixed"/>

       <scroll class="content" 
               ref="scroll"
               :probe-type="3" 
               @scroll="contentScroll"
               :pull-up-load="true"
               @pullingUp="loadMore">
         <home-swiper :banners1="banners" @swiperImageLoad="swiperImageLoad"/>
         <recommend-view :recommends1="recommends"/>
         <featrue-view/>
         <tab-control class="tab-control" 
                      :titles1="titles" 
                      @tab-control="butClick" 
                      ref="tabControl2"/>
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
   
   import {getHomeMultidata, getHomeGoods} from "network/home"
   import {itemImgListenerMixin, backClickMixin} from "common/mixin"

   export default {
      name:'Home',
      components: {
         NavBar,
         HomeSwiper,
         RecommendView,
         FeatrueView,
         TabControl,
         GoodsList,
         Scroll
      },
      mixins: [itemImgListenerMixin, backClickMixin],
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
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY: 0
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
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
        },
        contentScroll(position) {
          //1.判断BackTop是否显示
          //-position.y 先将position实时监听的位置转成正值(-)
          this.demo(position);

          //2.决定tabControl是否吸顶(position: fixed)
          this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
        loadMore() {
          this.getHomeGoods(this.currentType)
        },
        swiperImageLoad() {
          //2.获取tabControl的offsetTop
          //所有的组件都有一个属性$el: 用于获取组件中的元素
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        },
      },
      computed: {
        showGoods() {
           return this.goods[this.currentType].list
        }
      },
      //生命周期函数 销毁时回调
      destroyed() {
      },
      //生命周期函数 活跃状态
      activated() {
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
        //每次处于活跃状态的时候刷新一下 
        this.$refs.scroll.refresh()
      },
      //生命周期函数 不活跃状态
      deactivated() {
        //1.保存Y值
        this.saveY = this.$refs.scroll.getScrollY()
        console.log(this.saveY);

        //2.取消全局事件的监听
        this.$bus.$off("itemImgLoad", this.itemImgListener)
      },
      //生命周期函数 在模板渲染成html或者模板编译进路由前调用  created()
      created() {
        //1.请求多个数据
        this.getHomeMultidata()

        //
        this.getHomeGoods("pop")
        this.getHomeGoods("new")
        this.getHomeGoods("sell")
      },
      //生命周期函数 在已完成模板已经渲染或el挂载对应html渲染后调用  mounted()
      mounted() {
        //已经把里面数据进行了抽离，封装处理
      },
   }
</script>

<!-- scoped作用域  -->
<style scoped>
  #home {
     height: 100vh;
     position: relative;
  }
  .home-nav {
     background-color: var(--color-tint);
     color: #fff;
     
     /* position: fixed;
     left: 0;
     right: 0;
     top: 0;
     z-index: 9; */
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 44px;
    height:calc(100% - 93px);
    overflow: hidden;
  }
  .tab-controlMin {
    position: relative;
    z-index: 9;
  }
</style>