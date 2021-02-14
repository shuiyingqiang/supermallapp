import {debounce} from "common/utils"
import BackTop from "components/content/backTop/BackTop"

//混入
export const itemImgListenerMixin = {
  data() {
    return {
      itemImgListener: null,    
      refresh: null 
    }
  },
  mounted() {
    //3.监听item中图片加载完成
    //事件总线 类似于Vuex状态管理 $bus

    //this.$refs,scroll.refresh对这个函数进行防抖操作
    this.refresh = debounce(this.$refs.scroll.refresh, 200)

    //对监听的事件进行保存
    this.itemImgListener = () => {
      //对于refresh刷新频繁的问题，进行防抖函数操作
      this.refresh()
    }
    
    this.$bus.$on("itemImageLoad", this.itemImgListener)  
  },  
}

export const backClickMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    demo(position) {        
      //1.判断BackTop是否显示
      //-position.y 先将position实时监听的位置转成正值(-)
      this.isShowBackTop = (-position.y) > 1000
    }
  },
} 