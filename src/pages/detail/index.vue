<template>
  <div class="detail">
    <DetailBook :book="getBook"></DetailBook>

    <DetailStat :readers="getBook.readers"
                :readerNum="getBook.readerNum"
                :rankNum="getBook.rankNum"
                :rankAvg="getBook.rankAvg"></DetailStat>

    <!--    <DetailRate :rateValue="getBook.rateValue" @onRateChange="onRateChange"></DetailRate>-->

    <DetailContents :contents="getContents" @onReadBook="onReadBook"></DetailContents>

    <!--    <DetailBottom :isInShelf="isInShelf"></DetailBottom>-->
    <div class="detail-bottom">
      <div class="detail-btn-wrapper">
        <van-button
          :custom-class="getIsInShelf ? 'detail-btn-remove' : 'detail-btn-shelf'"
          round
          @click="handleShelf"
        >
          {{isInShelf ? '移出书架' : '加入书架'}}
        </van-button>
      </div>
      <div class="detail-btn-wrapper">
        <van-button
          custom-class="detail-btn-read"
          round
          @click="onReadBook">
          阅读
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
  import DetailBook from '../../components/detail/DetailBook'
  import { bookDetail, bookRankSave, bookContents, bookIsInShelf, bookShelfSave, bookShelfRemove } from '../../api/detail'
  import { getStorageSync } from '../../api/common'
  import DetailStat from '../../components/detail/DetailStat'
  import DetailRate from '../../components/detail/DetailRate'
  import DetailContents from '../../components/detail/DetailContents'
  import DetailBottom from '../../components/detail/DetailButtom'

  export default {
    name: 'detail',
    data(){
      return {
        book: {}, // 图书详情
        contents: [], // 图书目录
        isInShelf: false // 图书是否在书架上
      }
    },
    mounted() {
      // 获得图书详情
      this.getBookDetail()
      // 获得图书目录
      this.getBookContents()
      // 判断图书是否在书架上
      this.bookIsInShelf()
    },
    computed: {
      getBook(){
        return this.book || {}
      },
      getContents() {
        return this.contents || []
      },
      getIsInShelf() {
        return this.isInShelf
      }
    },
    methods: {
      onRateChange(rateValue) {
        let openid = getStorageSync("openid")
        let fileName = this.$route.query.fileName

        bookRankSave({ openId: openid, fileName: fileName, rank: rateValue}).then(res => {
          this.getBookDetail()
        })
      },
      /**
       * 获取书的详情
       */
      getBookDetail() {
        let openid = getStorageSync("openid")
        let fileName = this.$route.query.fileName

        if(openid && fileName){
          bookDetail({ openId: openid, fileName: fileName}).then(res => {
            this.book = res.data.data
          })
        }
      },
      /**
       * 获得图书内容
       */
      getBookContents() {
        let fileName = this.$route.query.fileName

        bookContents({ fileName: fileName }).then(res => {
          this.contents = res.data.data
        })
      },
      /**
       * 判断图书是否在书架上
       */
      bookIsInShelf() {
        let openid = getStorageSync("openid")
        let fileName = this.$route.query.fileName

        bookIsInShelf({ openId: openid, fileName: fileName }).then(res => {
          let data = res.data.data
          if(data.length === 0){
            this.isInShelf = false
          }else{
            this.isInShelf = true
          }
        })
      },
      /**
       * 加入书架
       */
      handleShelf() {
        let openid = getStorageSync("openid")
        let fileName = this.$route.query.fileName

        if(!this.isInShelf){
          bookShelfSave({openId: openid, fileName: fileName}).then(res => {
            this.bookIsInShelf()
          })
        }else{
          mpvue.showModal({
            title: '提示',
            content: `是确认将《${this.book.title}》移除书架`,
            success: res =>{
              if(res.confirm){
                bookShelfRemove({openId: openid, fileName: fileName}).then(res => {
                  this.bookIsInShelf()
                })
              }
            }
          })
        }
      },
      /**
       * 阅读
       */
      onReadBook(href){
        let query = {
          fileName: this.book.fileName,
          opf: this.book.opf
        }

        if(href.length > 0){
          let index = href.indexOf('/')
          if(index >= 0){
            query.navigation = href.slice(index + 1)
          }else{
            query.navigation = href
          }
        }

        this.$router.push({
          path: '/pages/read/main',
          query: query
        })
      }
    },
    components: {DetailContents, DetailRate, DetailStat, DetailBook, DetailBottom}
  }
</script>
<style lang="scss" scoped>
  .detail{
    .detail-bottom {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 60px;
      background: #fff;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 0 15px;
      border-top: 1px solid #eee;
      box-shadow: 0 -2px 4px 0 rgba(0,0,0,.1);

      .detail-btn-wrapper {
        flex: 1;

        .detail-bottom {
          .detail-btn-read {
            width: 100%;
            border: none;
            color: #fff;
            background: #1EA3F5;
            margin-left: 7.5px;
          }

          .detail-btn-shelf {
            width: 100%;
            color: #1EA3F5;
            background: #fff;
            border: 1px solid #1EA3F5;
            margin-right: 7.5px;
          }

          .detail-btn-remove {
            width: 100%;
            color: #F96128;
            background: rgba(255, 175, 155, .3);
            border: 1px solid #FFAF9B;
            margin-right: 7.5px;
          }
        }
      }
    }
  }
</style>
