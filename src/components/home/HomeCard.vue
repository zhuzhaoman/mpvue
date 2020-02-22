<template>
  <div class="home-card">
    <div class="home-card-inner">
      <div class="user-info">
        <div class="avatar-wrapper">
          <ImageView :src="avatarUrl" :round="true" height="20px"></ImageView>
        </div>
        <div class="nickname">{{nickName}}</div>
        <div class="shelf-text">书架共有{{data.num}}本好书</div>
        <div class="round-item"></div>
        <div class="shelf-text">特别精选</div>
      </div>
      <div class="book-info">
        <div class="book-wrapper"
             v-for="(item, index) in bookList" :key="index"
             @click="onBookClick(item)">
          <div class="book-img-wrapper">
            <ImageView :src="item.cover"></ImageView>
          </div>
        </div>
        <div class="shelf-wrapper" @click="gotoShelf">
          <div class="shelf">书架</div>
          <van-icon class="arrow" name="arrow" size="11px" />
        </div>
      </div>
      <div class="feedback-wrapper" @click="onFeedBackClick">
        <span class="feedback">反馈</span>
      </div>
    </div>

    <van-dialog id="van-dialog" />
  </div>
</template>
<script>
  import ImageView from '../base/ImageView'
  import Dialog from 'vant-weapp/dist/dialog/dialog';

  export  default {
    name: 'homeCard',
    props: {
      data: { // 界面需要展示的数据，userInfo为用户信息，bookList为推荐图书信息，num为书架图书数量
        type: Object,
        default: null
      },
      hasSign: { // 今天是否签到
        type: Boolean,
        default: false
      },
      signDay: { // 连续签到天数
        type: Number,
        default: 0
      }
    },
    computed: {
      avatarUrl() {
        return this.data && this.data.userInfo && this.data.userInfo.avatarUrl
      },
      nickName() {
        return this.data && this.data.userInfo && this.data.userInfo.nickName
      },
      bookList() {
        return (this.data && this.data.bookList) || []
      }
    },
    data(){
      return{

      }
    },
    methods: {
      /**
       * 跳转到书架列表
       */
      gotoShelf() {
        this.$router.push({
          path: '/pages/shelf/main'
        })
      },

      /**
       * 图书点击事件
       */
      onBookClick(item) {
        this.$emit('onHomeBookClick', item)
      },

      /**
       * 签到事件
       */
      sign() {

      },

      /**
       * 反馈
       */
      onFeedBackClick(){
        Dialog.confirm({
          title: '反馈',
          message: '您是否确认提交反馈信息',
          confirmButtonText: '是',
          cancelButtonText: '否'
        }).then(() => {
          console.log('是事件')
        }).catch(() => {
          console.log('否事件')
        });
      }
    },
    components: {
      ImageView
    }
  }
</script>
<style lang="scss" scoped>
  .home-card{
    background-image: linear-gradient(-90deg, #54575F 0%, #595B60 100%);
    border-radius: 15px;
    margin: 22px 20px 0 20px;

    .home-card-inner{
      position: relative;
      padding: 21.5px 17px 20px 20px;
      box-sizing: border-box;

      .avatar-wrapper{
        width: 20px;
        height: 20px;
      }

      .user-info{
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .nickname{
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #FFFFFF;
          text-align: center;
          margin-left: 8.5px;
        }
        .shelf-text{
          opacity: 0.7;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #FFFFFF;
          text-align: center;
          margin-left: 8.5px;
        }
        .round-item{
          width: 4px;
          height: 4px;
          background: #A2A2A2;
          border-radius: 50%;
          margin-left: 8.5px;
        }
      }

      .book-info{
        margin-top: 18.5px;
        display: flex;

        .book-wrapper{
          flex: 1;
          display: flex;
          justify-content: space-around;

          .book-img-wrapper{
            width: 72px;
            height: 101px;
          }
        }
        .shelf-wrapper{
          display: flex;
          align-items: center;
          .shelf{
            font-size: 11px;
            width: 11px;
            color: #FFFFFF;
            word-break: break-word; // 文字换行
            opacity: 0.8; // 透明度
          }
          .arrow{
            color: #828489;
          }
        }
      }

      .feedback-wrapper{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 20px;
        right: 0;
        padding: 0;
        width: 45px;
        height: 24px;
        background: #707070;
        border-radius: 200px 0 0 200px;

        .feedback{
          font-size: 12px;
          color: #FFFFFF;
        }
      }
    }
  }
</style>
