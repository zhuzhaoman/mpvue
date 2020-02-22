<template>
  <div class="homeBook">
    <div class="home-book-header" v-if="showTitle">{{title}}</div>
    <div class="home-book-content">
      <div class="home-book-row" v-for="(item, index) in bookData" :key="index">
        <div class="home-book-col" v-for="(book, bookIndex) in item" :key="bookIndex">
          <div class="book-wrapper"
               :style="{ flexDirection: mode === HOME_BOOK_MODE.COL ? 'column' : 'row' }"
               @click="onBookClick(book)" v-if="mode === HOME_BOOK_MODE.COL || mode === HOME_BOOK_MODE.ROW">
            <div class="book-img">
              <ImageView :src="book.cover"></ImageView>
            </div>
            <div class="book-title-wrapper book-title-col" v-if="mode === HOME_BOOK_MODE.COL">
              <div class="book-title">{{book.title}}</div>
            </div>
            <div class="book-title-wrapper book-title-row" v-else-if="mode === HOME_BOOK_MODE.ROW">
              <div class="book-title">{{book.title}}</div>
              <div class="book-info">
                <div class="book-author">{{book.author}}</div>
                <div class="book-category">{{book.categoryText}}</div>
              </div>
            </div>
          </div>
          <div class="category-wrapper" @click="onBookCategoryClick(book)" v-else>
            <div class="category-text">{{book.categoryText}}</div>
            <div class="category-num">{{book.num}}本书</div>
            <div class="category-img-wrapper">
              <div class="category-img1">
                <ImageView :src="book.cover"></ImageView>
              </div>
              <div class="category-img2">
                <ImageView :src="book.cover2"></ImageView>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-book-footer" v-if="showBtn">
      <button class="home-book-btn" @click="onMoreClick">{{btnText}}</button>
    </div>
  </div>
</template>
<script>
  import { HOME_BOOK_MODE } from '../../utils/const'
  import ImageView from '../base/ImageView'
  export default {
    name: 'homeBook',
    components: {ImageView},
    props: {
      title: { // 标题栏
        type: String,
        default: ''
      },
      data: { // 图书列表
        type: Array,
        default: null
      },
      btnText: { // 按钮文本
        type: String,
        default: ''
      },
      row: { // 行数
        type: Number,
        default: 0
      },
      col: { // 列数
        type: Number,
        default: 1
      },
      mode: { // 显示模式，row - 按行显示，col - 按列显示，category - 分类显示
        type: String,
        default: HOME_BOOK_MODE.COL
      },
      showTitle: { // 是否显示标题
        type: Boolean,
        default: true
      },
      showBtn: { // 是否显示按钮
        type: Boolean,
        default: true
      },
      linearBg: { // 是否显示背景
        type: Boolean,
        default: false
      }
    },
    created(){
    },
    data(){
      return {

      }
    },
    computed: {
      HOME_BOOK_MODE() {
        return HOME_BOOK_MODE;
      },
      bookData() {
        const { data, row, col } = this
        if(data && data.length > 0){
          const number = row * col
          const _bookData = data.slice(0, number) // 获取number个数据
          let _bootDataRow = []
          let _row = 0
          while(_row < row){
            // 0 * 2 = 0, 2
            // 1 * 2 = 2, 4
            let start =  _row * col
            let end = parseInt(_row * col ) + parseInt(col)
            _bootDataRow.push(_bookData.slice(start, end))
            _row++
          }
          return _bootDataRow
        }else {
          return []
        }
      }
    },
    methods: {
      /**
       * 点击更多按钮事件
       */
      onMoreClick() {
        this.$emit('onMoreClick')
      },

      /**
       * 图书点击事件
       */
      onBookClick(book) {
        this.$emit('onBookClick', book)
      },
      /**
       * 图书分类被点击
       */
      onBookCategoryClick(category){
        this.$emit('onBookCategoryClick', category);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .homeBook{
    margin-top: 23px;

    .home-book-header{
      padding: 13px 0 22px 21px;
      font-size: 21px;
      color: #212933;
    }
    .home-book-content{
      padding: 0 12px;

      .home-book-row{
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;

        .home-book-col{
          flex: 1;
          padding: 0 8px;
          box-sizing: border-box;

          .book-wrapper{
            display: flex;

            .book-img{
              flex: 1;
              width: auto;
              height: auto;
            }
            .book-title-col{
              .book-title{
                font-size: 12px;
                color: #212731;
                line-height: 20px;
                max-height: 24px;
                font-weight: 500;
                overflow: hidden;
                word-break: break-word; // 在恰当的断字点进行换行
              }
            }
            .book-title-row{
              flex: 1;
              padding: 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;

              .book-title{
                font-size: 14px;
                color: #1F1F1F;
                line-height: 20px;
                max-height: 20px;
                font-weight: 400;
                overflow: hidden;
                word-break: break-word; // 在恰当的断字点进行换行
                text-overflow:ellipsis;//溢出部分用省略号代替
              }

              .book-info{
                .book-author, .book-category{
                  font-size: 12px;
                  color: #868686;
                  line-height: 14px;
                  max-height: 14px;
                  font-weight: 400;
                  overflow: hidden;
                  word-break: break-word; // 在恰当的断字点进行换行
                }
              }
            }
          }

          .category-wrapper{
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: #F8F9FB;
            border-radius: 10px;
            height: 96px;
            padding: 13px 0 14.5px 16px;
            box-sizing: border-box;

            .category-text{
              width: 100px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              color: #212832;
              font-size: 16px;
              line-height: 20px;
            }
            .category-num{
              color: #868686;
              font-size: 12px;
              line-height: 12px;

            }
            .category-img-wrapper{
              position: absolute;
              right: 0;
              bottom: 0;

              .category-img1{
                position: absolute;
                right: 0;
                bottom: -5px;
                z-index: 100;
                width: 48px;
              }
              .category-img2{
                position: absolute;
                right: 30px;
                bottom: -5px;
                z-index: 90;
                width: 36px;
              }
            }
          }
        }
      }
    }
    .home-book-footer{
      margin: 12px 0;
      padding: 0 20px;
      .home-book-btn{
        border-radius: 50px;
        font-size: 14px;
        color: #3696EF;
        border: 1px solid #EDEEEE;
      }
    }
  }
</style>
<style lang="scss">
  .category-img1{
    .image{
      border-bottom-right-radius: 10px;
    }
  }
</style>
