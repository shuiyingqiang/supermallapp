<template>
   <div class="goods-list-item" @click="itemClick">  
     <!-- load实时监听 在一加载时就监听 -->
     <img :src="item1.show.img" alt="" @load="imageLoad">
     <div class="goods-info">
       <p>{{item1.title}}</p>
       <span class="price">{{item1.price}}</span>
       <span class="collect">{{item1.cfav}}</span>
     </div>
   </div>
</template>

<script>
  export default {
    name:'GoodsListItem',
    props: {
      item1: {
          type: Object,
          default() {
              return {}
          }
      }
    },
    methods: {
      //事件总线 类似于Vuex状态管理 $bus
      imageLoad() {
        this.$bus.$emit("itemImageLoad")
      },
      itemClick() {
        this.$router.push("/detail/" + this.item1.iid)
      }
    },
  }
</script>

<style scoped>
  .goods-list-item {
    position: relative;
    padding-bottom: 40px;

    width: 48%;
  }
  .goods-list-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>