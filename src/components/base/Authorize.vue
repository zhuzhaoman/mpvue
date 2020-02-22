<template>
  <div class="auth">
    <div class="auth-wrapper">
      <div class="auth-wrapper-img">
        <ImageView src="https://www.youbaobao.xyz/mpvue-res/logo.jpg" round></ImageView>
      </div>
      <div class="auth-wrapper-subTitle">登录小瑶读书</div>
      <div class="auth-wrapper-title">全球好书免费读</div>
      <button class="auth-wrapper-button"
              open-type="getUserInfo" @getuserinfo="getUserInfo">授权登录</button>
    </div>
  </div>
</template>
<script>
  import ImageView from './ImageView'
  export default {
    methods: {
      getUserInfo() {
        this.$emit('getUserInfo')
      }
    },
    components: {ImageView}
  }
</script>
<style lang="scss" scoped>
  .auth{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #999999;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;

    .auth-wrapper{
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 270px;
      height: 248px;
      background: #f5f5f5;
      border-radius: 18px;

      .auth-wrapper-img{
        width: 74px;
        margin-top: 22.5px;
      }
      .auth-wrapper-subTitle{
        font-size: 13px;
        color: #999;
        line-height: 16px;
        margin-top: 3.5px;
      }
      .auth-wrapper-title{
        font-size: 16px;
        font-weight: bold;
        color: #333;
        line-height: 20px;
        margin-top: 3.5px;
      }
      .auth-wrapper-button{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #1EA3F5;
        color: white;
        font-size: 15px;
        border-radius: 0 0 18px 18px;
      }
    }
  }
</style>
