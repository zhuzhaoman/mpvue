<template>
  <div class="search">
    <SearchBar
      :disabled="false"
      :focus="true"
      :hotSearch="hotSearchKeywords"
      @onInput="onInput"
      @onClearClick="onClearClick"
      @onConfirm="onConfirm"></SearchBar>

    <TagGroup
      :tags="hotSearch"
      headerText="热门搜索"
      btnText="换一批"
      @onTagClick="onTagClick"
      @onChangeClick="onChangeClick"></TagGroup>

    <SearchItem
      icon="user-o" :title="author.author" subTitle="author" v-if="author.author" @showList="showList"></SearchItem>

    <SearchItem
      icon="apps-o" :title="category.categoryText" subTitle="category" v-if="category.categoryText" @showList="showList"></SearchItem>

    <SearchItem
      icon="newspaper-o" :title="publisher.publisher" subTitle="publisher" v-if="publisher.publisher" @showList="showList"></SearchItem>

    <SearchTable :data="book" @onBookClick="onBookClick"></SearchTable>
  </div>
</template>
<script>
  import TagGroup from '../../components/base/TagGroup'
  import SearchItem from '../../components/search/SearchItem'
  import SearchTable from '../../components/search/SearchTable'
  import SearchBar from '../../components/home/SearchBar'
  import { search, hotSearch } from '../../api/search'
  import {getStorageSync} from '../../api/common'

  export default {
    name: 'search',
    data() {
      return {
        hotSearch: [], // 热门搜索词
        historySearch: [],
        searchResult: {}, // 搜索所有内容
        openid: '',
        hotSearchKeywords: ''
      }
    },
    mounted(){
      // 获得openid
      this.openid = getStorageSync('openid')

      // 获得热搜词
      this.hotSearchKeywords = this.$route.query.hotSearchKeywords

      // 获得热搜词
      this.getHotSearch()
    },
    computed: {
      author(){
        return (this.searchResult && this.searchResult.author && this.searchResult.author[0]) || ''
      },
      category(){
        return (this.searchResult && this.searchResult.category && this.searchResult.category[0]) || ''
      },
      publisher(){
        return (this.searchResult && this.searchResult.publisher && this.searchResult.publisher[0]) || ''
      },
      book(){
        return (this.searchResult && this.searchResult.book) || []
      }
    },
    methods: {
      onConfirm(keyword){
        if (keyword.length !== 0 && keyword !== undefined && keyword !== null){
          this.onSearch(keyword)
          // 清空热搜记录
          this.hotSearch = []
        }
      },
      /**
       * 监听搜索框输入的内容
       * @param keyword
       */
      onInput(keyword){
        if(keyword.length > 0){
          this.onSearch(keyword)
          // 清空热搜记录
          this.hotSearch = []
        }else {
          this.searchResult = {}
          // 获得热搜记录
          this.getHotSearch()
        }
      },
      /**
       * 清空搜索列表
       */
      onClearClick() {
        this.searchResult = {}
        // 获得热搜记录
        this.getHotSearch()
      },
      /**
       * 获得热搜词
       */
      getHotSearch(){
        hotSearch().then(res => {
          this.hotSearch = res.data.data
        })
      },
      onTagClick(tag, index) {
        console.log(tag + "->" + index)
      },
      /**
       * 换一批热搜词
       */
      onChangeClick() {
        // 获得热搜记录
        this.getHotSearch()
      },
      /**
       * 搜索输入框的内容
       * @param keyword
       */
      onSearch(keyword){
        search({
          keyword: keyword,
          openId: this.openid
        }).then(res => {
          this.searchResult = res.data.data
        })
      },
      /**
       * 展示书记列表
       */
      showList(text, key) {
        this.$router.push({
          path: '/pages/list/main',
          query: {
            text, key
          }
        })
      },
      /**
       * 书被点击
       */
      onBookClick(book){
        this.$router.push({
          path: '/pages/detail/main',
          query: {
            fileName: book.fileName
          }
        })
      }
    },
    components: {
      SearchBar,
      SearchTable,
      TagGroup,
      SearchItem
    }
  }
</script>
<style lang="scss" scoped>

</style>
