<template>
  <div class="shelf">
    <ShelfUserInfo :userInfo="userInfo" :readDay="readDay" :num="num"></ShelfUserInfo>

    <ShelfList :shelfList="shelfList"></ShelfList>
  </div>
</template>
<script>
  import ShelfUserInfo from '../../components/shelf/ShelfUserInfo'
  import { getStorageSync } from '../../api/common'
  import { getUserDay } from '../../api/shelf'
  import { bookIsInShelf } from '../../api/detail'
  import ShelfList from '../../components/shelf/ShelfList'

  export default {
    name: 'shelf',
    data(){
      return {
        userInfo: {},
        readDay: 0,
        num: 0,
        shelfList: []
      }
    },
    onShow() {
      this.getUserInfo()
    },
    methods: {
      getUserInfo() {
        this.userInfo = getStorageSync('userInfo')
        let openid = getStorageSync('openid')

        getUserDay({ 'openId': openid }).then(res => {
          this.readDay = res.data.data.day
        })

        bookIsInShelf({ 'openId': openid }).then(res => {
          this.shelfList = res.data.data
          this.num = res.data.data.length
        })
      }
    },
    components: {ShelfList, ShelfUserInfo}
  }
</script>
<style lang="scss" scoped>

</style>
