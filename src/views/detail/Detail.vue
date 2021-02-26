<template>
   <div id="detail"> 
     <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
     <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
       <div>
         <li v-for="(item, index) in $store.state.cartList" :key="index">{{item}}</li>
       </div>
       <detail-swiper :top-images="topImages"/>
       <detail-base-info :goods1="goods"/>
       <detail-shop-info :shop1="shop"/>
       <detail-goods-info :detail-info1="detailInfo " @imageLoad="imageLoad"/>
       <detail-param-info ref="params" :param-info1="paramInfo"/>
       <detail-comment-info ref="comment" :comment-info1="commentInfo"/>
       <goods-list ref="recommend" :goods1="recommends"/>
     </scroll>
     <detail-bottom-bar @addCart="addToCart"/>
     <back-top @click.native="backClick" v-show="isShowBackTop"/>
   </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"

  import Scroll from "components/common/scroll/Scroll"
  import GoodsList from "components/content/goods/GoodsList"

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail"
  import {debounce} from "common/utils"
  import {itemImgListenerMixin, backClickMixin} from "common/mixin" 

  export default {
    components: {
       DetailNavBar,
       DetailSwiper,
       DetailBaseInfo,
       DetailShopInfo,
       Scroll,
       GoodsList,
       DetailGoodsInfo,
       DetailParamInfo,
       DetailCommentInfo,
       DetailBottomBar  
    }, 
    name:'Detail',
    mixins: [itemImgListenerMixin, backClickMixin],
    data() {
      return {
         iid: null,
         topImages: [],
         goods: {},
         shop: {},
         detailInfo: {},
         paramInfo: {},
         commentInfo: {},
         recommends: [],
         themeTopYs: [],
         getThemeTopY: null,
         currentIndex: 0,
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {

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

        //7.取出评论的信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {}
        }
        
        //这个函数是当前面的数据渲染完成了，再来回调这个函数
        // this.$nextTick(() => {
        //   //根据最新的数据，对应的DOM是已经被渲染出来了
        //   //但是图片依然是没有加载完(目前获取到的offsetTop不包含其中的图片)
        //   //offsetTop值不对的时候，都是因为图片的问题
        //   this.themeTopYs = []

        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

        //   console.log(this.themeTopYs);
        // })
      }) 
      
      //3.请求推荐数据
      getRecommend().then(res => {
        
        this.recommends = res.data.data.list

      })

      //4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE)

        console.log(this.themeTopYs);
      }, 100)
      
    }, 
    //生命周期函数 在已完成模板已经渲染或el挂载对应html渲染后调用  mounted()
    mounted() {
      //已经把里面数据进行了抽离，封装处理
    },
    //生命周期函数 在变量改变并且要在页面重新渲染完成之后,才会进updated生命周期 
    //           只改变变量但是没有在页面渲染，则这个函数时不会被调用的
    updated() {
     
    },
    //生命周期函数 销毁 在离开时进行触发销毁
    destroyed() {
      //1.取消全局事件的监听
      this.$bus.$off("itemImgLoad", this.itemImgListener)
    },
    methods: {
      imageLoad() {
        //在混入里面封装好的 防抖函数和全局监听
        this.refresh()
        //调用上面保存好的单个防抖函数
        this.getThemeTopY()
      },
      titleClick(index) {
        //console.log(index);
        //滚动到当前位置
        this.$refs.scroll.scrollTo(0, - this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        //1.获取y值
        const positionY = - position.y

        //2.positionY和主题中的值进行对比
        let length = this.themeTopYs.length
        for(let i = 0; i < length-1; i++) {
          //普通做法
          // if(this.currentIndex !== i && ((i < length - 1 && 
          //                                positionY >= this.themeTopYs[i] && 
          //                                positionY < this.themeTopYs[i + 1])
          //                               || (i === length - 1 &&
          //                               positionY >= this.themeTopYs[i])
          //                               )
          //   )
          // {
          
          //
            // this.currentIndex = i
            // this.$refs.nav.currentIndex = this.currentIndex
          // }

          //hack做法
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]))
          {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        this.demo(position);
      },
      //监听点击加入购物车
      addToCart() {
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //2.将商品添加到购物车里面
        this.$store.dispatch("addCart", product)
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
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
