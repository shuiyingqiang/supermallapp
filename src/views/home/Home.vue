<template>
   <div id="home">
     <nav-bar class="home-nav">
        <div slot="center">购物街</div>
     </nav-bar>
     <home-swiper :banners1="banners"/>
     <recommend-view :recommends1="recommends"/>
     <featrue-view/>
     <tab-control class="tab-control" :titles1="titles" @tab-control="butClick"/>
     <goods-list :goods1="showGoods"/>
     
   </div>
</template>

<script>
   import NavBar from "components/common/navbar/NavBar"
   import HomeSwiper from "./childComps/HomeSwiper"
   import RecommendView from "./childComps/RecommendView"
   import FeatrueView from "./childComps/FeatrueView"
   import TabControl from "components/content/tabcontrol/TabControl"
   import GoodsList from "components/content/goods/GoodsList"
   
   import {getHomeMultidata, getHomeGoods} from "network/home"

   export default {
      name:'Home',
      components: {
         NavBar,
         HomeSwiper,
         RecommendView,
         FeatrueView,
         TabControl,
         GoodsList
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
            currentType: "pop"
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
          const page = this.goods[type].page += 1
          getHomeGoods(type, page).then(res => {
            this.goods[type].list.push(...res.data.data.list)
            this.goods[type].page += 1
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
          }
          console.log(index);
        }
      },
      computed: {
        showGoods() {
           return this.goods[this.currentType].list
        }
      },
      created() {
        //1.请求多个数据
        this.getHomeMultidata()

        //2.请求商品数据
        this.getHomeGoods("pop")
        this.getHomeGoods("new")
        this.getHomeGoods("sell")
      },
   }
</script>

<style scoped>
  #home {
     height: 6000px;
     padding-top: 44px;
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
</style>