<template>
  <web-view :src="url"></web-view>
</template>
<script>
  export default {
    name: 'read',
    data(){
      return{
        url: ''
      }
    },
    mounted(){
      let query = this.$route.query
      let _url = 'http://www.youbaobao.xyz/book/#/ebook'

      if(query.fileName) {
        _url = `${_url}/${query.fileName}`
      }
      if (query.opf){
        _url = `${_url}?opf=${query.opf}`
      }
      if (query.navigation){
        _url = `${_url}&navigation=${query.navigation}`
      }

      this.url = _url
    }
  }
</script>
<style lang="scss" scoped>

</style>
