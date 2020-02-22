<template>
  <div class="list">
    <SearchTable :data="book" @onBookClick="onBookClick"></SearchTable>
  </div>
</template>
<script>
  import SearchTable from '../../components/search/SearchTable'
  import { searchList } from '../../api/list'
  import { setNavigationBarTitle } from '../../api/common'

  export default {
    name: 'list',
    data(){
      return {
        book: []
      }
    },
    mounted() {
      this.getSearchList()
    },
    methods: {
      /**
       * 获取图书列表
       */
      getSearchList() {
        const { key, text } = this.$route.query

        setNavigationBarTitle(text)

        const params = {}

        if(key && text){
          params[key] = text
        }

        searchList(params).then(res => {
          this.book = res.data.data
        })
      },
      /**
       * 书被点击
       */
      onBookClick(book) {
        this.$router.push({
          path: '/pages/detail/main',
          query: {
            fileName: book.fileName
          }
        })
      }
    },
    components: {
      SearchTable
    }
  }
</script>
<style lang="scss" scoped>

</style>
