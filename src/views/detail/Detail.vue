<template>
   <div id="detail"> 
     <detail-nav-bar/>
   </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  
  export default {
    components: {
       DetailNavBar
    }, 
    name:'Detail',
    data() {
      return {
         iid: null
      }
    },
    created() {
      this.iid = this.$route.params.iid
    },
  }
</script>

<style scoped>

</style>