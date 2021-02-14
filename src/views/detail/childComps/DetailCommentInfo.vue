<template>
  <div v-if="Object.keys(commentInfo1).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>    
      </div>  
    </div>

    <div class="info-user">
      <img :src="commentInfo1.user.avatar" alt="">
      <span>{{commentInfo1.user.uname}}</span>  
    </div>  

    <div class="info-detail">
      <p>{{commentInfo1.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo1.created | showDate}}</span>
        <span>{{commentInfo1.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item, index) in commentInfo1.images" :key="index" alt="">
      </div>
    </div>
  </div>
  <div class="comment-info-else" style="color: Gray;" v-else>暂无用户评论</div>
</template>

<script>
  import {formatDate} from "common/utils"

  export default {
    name:'DetailCommentInfo',
    props: {
      commentInfo1: {
        type: Object,
        default() {
          return {}  
        }  
      }
    },
    filters: {
        showDate(value) {
          //1.将时间戳转成Date对象
          const date = new Date(value * 1000)
          
          //2.将date进行格式化
          return formatDate(date, "yyyy-MM-dd");
        }
    }
  }
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    line-height: 50px;
    height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .header-title {
    font-size: 15px;
    float: left;
  }

  .header-more {
    font-size: 13px;
    float: right;
    margin-right: 10px;
  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user span {
    font-size: 15px;
    position: relative;
    top: -15px;
    margin-left: 10px;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 14px;
    line-height: 1.5;
    color: #777777;
  }

  .info-detail .info-other {
    font-size: 12px;
    margin-top: 10px;
    color: #999999;
  }

  .info-other .date {
    margin-right: 8px;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
  .comment-info-else {
    text-align: center;  
    font-size: 14px;
    padding: 20px 0;
  }
</style>