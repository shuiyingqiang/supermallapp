<template>
    <div>
        <swiper>
            <swiper-item v-for="(item, index) in banners1" :key="index">
              <a :href="item.link">
                  <img :src="item.image" alt="">
              </a>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper"

  export default {
    name:"HomeSwiper",
    components: {
        Swiper,
        SwiperItem
    },
    props: {
        banners1: {
            type:Array,
            default() {
                return []
            }
        }
    }
  }
</script>

<style lang="">
    
</style>