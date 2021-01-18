<template>
   <div id="home">
     <nav-bar class="home-nav">
        <div slot="center">购物街</div>
     </nav-bar>
     <home-swiper :banners1="banners"/>
     <recommend-view :recommends1="recommends"/>
     <featrue-view/>
     
     <br><br><br><br>
   </div>
</template>

<script>
   import NavBar from "components/common/navbar/NavBar"
   import HomeSwiper from "./childComps/HomeSwiper"
   import RecommendView from "./childComps/RecommendView"
   import FeatrueView from "./childComps/FeatrueView"
   
   import {getHomeMultidata} from "network/home"

   export default {
      name:'Home',
      components: {
         NavBar,
         HomeSwiper,
         RecommendView,
         FeatrueView
      },
      data() {
         return {
            banners: [],
            recommends: []
         }  
      },
      created() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
          console.log(res);
        })
      },
   }
</script>

<style scoped>
  #home {
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

</style>