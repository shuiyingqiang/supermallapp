<template>
  <div id="cate-gory">
    <category-nav-bar/>
  </div>
</template>

<script>
  import CategoryNavBar from "./childComps/CategoryNavBar"

  export default {
    name:'Category',
    components: {
      CategoryNavBar
    }
  }
</script>

<style scoped>
  .cate-gory {
    height: 100vh;
  }
</style>