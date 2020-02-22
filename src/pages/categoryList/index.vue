<template>
  <div class="category-list">

    <HomeBook :row="category.length / 2" col="2"
              :data="category"
              mode="category"
              :showBtn="false"
              :showTitle="false"
              @onBookCategoryClick="onBookCategoryClick"></HomeBook>

  </div>
</template>
<script>
  import { categoryList } from '../../api/categoryList'
  import HomeBook from '../../components/home/HomeBook'
  export default {
    name: 'categoryList',
    data(){
      return {
        category: []
      }
    },
    mounted(){
      categoryList().then(res => {
        this.category = res.data.data
      })
    },
    methods: {
      /**
       * 图书分类被点击
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
      HomeBook
    }
  }
</script>
<style lang="scss" scoped>

</style>
