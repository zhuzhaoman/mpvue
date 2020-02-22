<template>
  <div class="index">
    <SearchBar :disabled="true" @onSearchBarClick="onSearchBarClick" :hotSearch="hotSearch"></SearchBar>
    <HomeCard :data="homeCard" @onHomeBookClick="onBookClick"></HomeCard>

    <HomeBanner
      img="http://www.youbaobao.xyz/book/res/bg.jpg"
      title="小瑶读书小程序快要上线啦"
      subTitle="立即体验"></HomeBanner>

    <HomeBook title="为你推荐" row="1" col="3" :data="recommend" mode="col" btnText="换一批"
              @onMoreClick="recommendChange('recommend')" @onBookClick="onBookClick"></HomeBook>

    <HomeBook title="免费阅读" row="2" col="2" :data="freeRead" mode="row" btnText="换一批"
              @onMoreClick="recommendChange('freeRead')" @onBookClick="onBookClick"></HomeBook>

    <HomeBook title="当前最热" row="1" col="4" :data="hotBook" mode="col" btnText="换一批"
              @onMoreClick="recommendChange('hotBook')" @onBookClick="onBookClick"></HomeBook>

    <HomeBook title="分类" row="3" col="2" :data="category" mode="category" btnText="查看全部"
              @onMoreClick="onCategoryMoreClick" @onBookCategoryClick="onBookCategoryClick"></HomeBook>

    <Authorize v-if="isAuth" @getUserInfo="UserInfoInit"></Authorize>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import ImageView from '../../components/base/ImageView'
  import HomeCard from '../../components/home/HomeCard'
  import HomeBanner from '../../components/home/HomeBanner'
  import HomeBook from '../../components/home/HomeBook'
  import Authorize from '../../components/base/Authorize'
  import { getHomeData, recommend, freeRead, hotBook, register } from '../../api'
  import { getSetting, getUserInfo, setStorageSync, getStorageSync, getOpenId } from '../../api/common'

  export default {
    data () {
      return {
        hotSearch: '',
        shelf: [],
        banner: [],
        recommend: [],
        freeRead: [],
        hotBook: [],
        category: [],
        homeCard: {},
        isAuth: true // 是否授权,true代表没有授权，false代表授权了
      }
    },
    mounted () {
      this.getSetting()
    },
    methods: {
      /**
       * 获得首页数据
       */
      getHomeData(openid, userInfo){
        getHomeData({ openId : openid}).then(res => {
          let { hotSearch, shelf, banner, recommend, freeRead, hotBook, category, shelfCount } = res.data.data
          this.hotSearch = hotSearch.keyword
          this.shelf = shelf
          this.banner = banner
          this.recommend = recommend
          this.freeRead = freeRead
          this.hotBook = hotBook
          this.category = category
          this.homeCard = {
            bookList: shelf,
            num: shelfCount,
            userInfo: userInfo
          }
          mpvue.hideLoading()
        }).catch(err => {
          mpvue.hideLoading()
        })
      },
      /**
       * 数据换一批
       * @param key
       */
      recommendChange(key){
        switch (key) {
          case 'recommend':
            recommend().then(res => {
              this.recommend = res.data.data
            })
            break
          case 'freeRead':
            freeRead().then(res => {
              this.freeRead = res.data.data
            })
            break
          case 'hotBook':
            hotBook().then(res => {
              this.hotBook = res.data.data
            })
            break
        }
      },
      /**
       * 跳转到全部分类页面
       */
      onCategoryMoreClick(){
        this.$router.push({
          path: '/pages/categoryList/main'
        })
      },
      /**
       * 书被点击,跳转到详情页面
       */
      onBookClick(book) {
        this.$router.push({
          path: '/pages/detail/main',
          query: {fileName: book.fileName}
        })
      },
      /**
       * 跳转到搜索页面
       */
      onSearchBarClick(){
        this.$router.push({
          path: '/pages/search/main',
          query: {
            hotSearchKeywords: this.hotSearch
          }
        });
      },
      /**
       * 用户授权
       */
      getSetting() {
        getSetting('userInfo', () => {
          this.isAuth = false
          mpvue.showLoading({
            title: '加载中',
          })
          this.getUserInfo()
        }, () => {
          this.isAuth = true
        })
      },
      /**
       * 获取用户信息
       */
      getUserInfo() {
        getUserInfo((userInfo) => {
          setStorageSync("userInfo", userInfo)

          let openid = getStorageSync("openid")
          if(!openid || openid.length === 0){
            getOpenId((openid) => {
              setStorageSync("openid", openid)
              // 获取主页信息
              this.getHomeData(openid, userInfo)
              register(openid, userInfo)
            })
          }else{
            register(openid, userInfo)
            this.getHomeData(openid, userInfo)
          }

        }, (err) => {
          console.log(err)
        })
      },
      /**
       * 初始化授权信息
       * @constructor
       */
      UserInfoInit(){
        this.getSetting()
      },
      /**
       * 图书分类被点击
       * @param book
       */
      onBookCategoryClick(category){
        this.$router.push({
          path: '/pages/list/main',
          query: {
            key: 'categoryId',
            text: category.category
          }
        })
      }
    },
    components: {
      HomeBanner,
      SearchBar,
      ImageView,
      HomeCard,
      HomeBook,
      Authorize
    }
  }
</script>

<style lang="scss" scoped>

</style>
