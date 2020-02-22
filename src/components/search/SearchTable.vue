<template>
  <div class="search-table">
    <div class="search-table-wrapper">
      <div class="table-wrapper" @click="onBookClick(book)" v-for="(book, index) in data" :key="index">
        <div class="book-img-wrapper">
          <div class="img">
            <ImageView :src="book.cover"></ImageView>
          </div>
        </div>
        <div class="book-info-wrapper">
          <div class="book-title">{{book.title}}</div>
          <div class="book-author">{{book.author}}</div>
          <div class="book-category">{{book.categoryText}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ImageView from '../base/ImageView'
  export default {
    name: 'searchTable',
    props: {
      data: Array
    },
    methods: {
      onBookClick(book) {
        this.$emit('onBookClick', book)
      }
    },
    components: {ImageView}
  }
</script>
<style lang="scss" scoped>
  .search-table{

    .search-table-wrapper{
      .table-wrapper{
        display: flex;
        align-items: center;
        padding: 0 16px;
        margin: 14px 0;

        .book-img-wrapper{
          .img{
            width: 47px;
            height: 68px;
          }
        }

        .book-info-wrapper{
          width: 70%;
          margin-left: 15px;

          .book-title{
            width: 100%;
            color: #333;
            font-size: 16px;
            line-height: 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 10px;
          }
          .book-author{
            color: rgba(0,0,0,0.65);
            font-size: 13px;
            line-height: 18px;
          }
          .book-category{
            color: rgba(0,0,0,0.45);
            font-size: 13px;
            line-height: 18px;
          }
        }

      }
    }
  }
</style>
