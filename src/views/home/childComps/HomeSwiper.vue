<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners1" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper"

  export default {
    name:"HomeSwiper",
    components: {
        Swiper,
        SwiperItem
    },
    data() {
        return {
            isLoad: false
        }
    },
    props: {
        banners1: {
            type:Array,
            default() {
                return []
            }
        }
    },
    methods: {
      imgLoad() {
        //这里我们只需要加载一次就可以了
        //所以我们在data里面创建了一个变量
        //当为false时执行一下这个判断里面的条件
        //执行一次后就为true了，
        if(!this.isLoad) {
          this.$emit("swiperImageLoad")
          this.isLoad = true
        }
      }
    },
  }
</script>

<style lang="">
    
</style>