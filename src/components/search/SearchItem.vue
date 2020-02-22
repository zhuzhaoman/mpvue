<template>
  <div class="search-item" @click="showList(title, subTitle)">
    <div class="search-item-wrapper">
      <div class="item-wrapper-icon">
        <van-icon
          :name="icon"
          color="rgba(0,0,0,0.5)"
          size="16px"
          :style="{ display: 'flex' }"></van-icon>
      </div>
      <div class="item-wrapper-info">
        <div class="wrapper-info-title">{{title}}</div>
        <div class="wrapper-info-subTitle">{{subTitle}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'searchItem',
    props: {
      title: { // 标题
        type: String,
        default: ''
      },
      subTitle: { // 副标题
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      }
    },
    methods: {
      /**
       * 分类点击事件
       */
      showList(title, subTitle) {
        this.$emit('showList', title, subTitle)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .search-item{
    padding: 15px;
    height: 36.5px;

    .search-item-wrapper{
      display: flex;
      align-items: center;

      .item-wrapper-icon{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #F7F7F9;
      }
    }

    .item-wrapper-info{
      width: 70%;
      margin-left: 10px;

      .wrapper-info-title{
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #333;
        font-size: 14px;
        line-height: 20px;
      }
      .wrapper-info-subTitle{
        color: rgba(0,0,0,0.5);
        font-size: 12px;
        line-height: 16.5px;
      }
    }
  }
</style>
