<template>
  <div class="home-banner" @click="onHomeBookClick">
    <div class="bg-img" :style="{ backgroundImage: bgImage}">
      <div class="title">{{title}}</div>
      <div class="subTitle" @click="onBannerClick">{{subTitle}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'homeBanner',
    props: {
      img: { // banner图片
        type: String,
        default: ''
      },
      title: { // 标题
        type: String,
        default: ''
      },
      subTitle: { // 副标题
        type: String,
        default: ''
      }
    },
    computed: {
      bgImage() {
        return 'url(' + this.img + ')'
      }
    },
    methods: {
      /**
       * banner点击事件
       */
      onHomeBookClick() {
        this.$emit('onHomeBookClick')
      },
      onBannerClick() {
        console.log('banner')
      }
    }
  }
</script>
<style lang="scss" scoped>
.home-banner{
  margin-top: 20px;
  padding: 0 20px;
  box-sizing: border-box;

  .bg-img{
    width: 100%;
    height: 125px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .title{
      font-size: 18px;
      color: white;
      font-weight: 500;
    }

    .subTitle{
      padding: 5px 15px;
      background: #4585ff;
      border: 1px solid #ccc;
      border-radius: 50px;
      margin-top: 10px;
      font-size: 14px;
      color: white;
    }
  }
}
</style>
