<template>
   <div class="goods-list">
     <goods-list-item v-for="(item, index) in goods1" :key="index" :item1="item"/>
   </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem"
  export default {
    name:'GoodsList',
    components: {GoodsListItem},
    props: {
      goods1: {
        type: Array,
        default() {
          return []
        }
     }
    }
  }
</script>

<style scoped>
  .goods-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      padding: 2px;
  }
</style>