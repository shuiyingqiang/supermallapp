<template>
   <div id="detail"> 
     <detail-nav-bar class="detail-nav"/>
     <scroll class="content" ref="scroll">
       <detail-swiper :top-images="topImages"/>
       <detail-base-info :goods1="goods"/>
       <detail-shop-info :shop1="shop"/>
       <detail-goods-info :detail-info1="detailInfo " @imageLoad="imageLoad"/>
       <detail-param-info :param-info1="paramInfo"/>
     </scroll>
   </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"

  import Scroll from "components/common/scroll/Scroll"

  import {getDetail, Goods, Shop, GoodsParam} from "network/detail"

  export default {
    components: {
       DetailNavBar,
       DetailSwiper,
       DetailBaseInfo,
       DetailShopInfo,
       Scroll,
       DetailGoodsInfo,
       DetailParamInfo
    }, 
    name:'Detail',
    data() {
      return {
         iid: null,
         topImages: [],
         goods: {},
         shop: {},
         detailInfo: {},
         paramInfo: {}
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);

        //1.获取数据
        const data = res.data.result

        //2.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages
        
        //3.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services) 
        
        //4.创建店铺信息的对象·
        this.shop = new Shop(data.shopInfo)

        //5.保存商品的详情数据
        this.detailInfo = data.detailInfo

        //6.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      }) 
    }, 
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>
