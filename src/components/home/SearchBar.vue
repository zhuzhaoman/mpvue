<template>
  <div class="search-bar">
    <div class="search-bar-wrapper" @click="onSearchBarClick">
      <van-icon class="search-icon" name="search" size="16px" color="#858C96"></van-icon>
      <input type="text" class="search-bar-wrapper-input" placeholder-style="color: #ADB4BE"
             :focus="focus"
             :disabled="disabled"
             :maxlength="limit"
             :placeholder="hotSearch.length === 0 ? '请输入关键字...' : hotSearch"
             v-model="searchWord"
             @input="onChange"
             confirm-type="search"
             @confirm="onConfirm">
      <van-icon class="clear-icon" name="clear" size="16px" color="#858C96"
                @click="onClearClick"
                v-if="searchWord.length > 0"></van-icon>
    </div>
  </div>
</template>

<script>
  export default {
    name: "searchBar",
    props: {
      focus: { // 搜索框是否获得焦点
        type: Boolean,
        default: true
      },
      disabled: { // 搜索框是否可交互
        type: Boolean,
        default: false
      },
      limit: { // 搜索框最大可输入字符数
        type: Number,
        default: 50
      },
      hotSearch: { // 热门搜索词
        type: String,
        default: ''
      }
    },
    data(){
      return {
        searchWord: '', // 搜索关键字
      }
    },
    methods: {
      /**
       * 搜索框点击事件
       */
      onSearchBarClick() {
        // 调用父组件方法
        this.$emit('onSearchBarClick')
      },

      /**
       * 点击清空事件
       */
      onClearClick() {
        // 清空搜索内容
        this.searchWord = ''
        // 调用父组件方法
        this.$emit('onClearClick')
      },

      /**
       * 输入监听事件
       */
      onChange(e) {
        let value = e.mp.detail.value
        this.$emit('onInput', value)
      },

      /**
       * 点击虚拟键盘搜索事件
       */
      onConfirm(e) {
        this.searchWord = this.hotSearch
        this.$emit('onConfirm', this.hotSearch)
      },

      /**
       * 对输入框关键字赋值
       */
      setValue(value) {
        this.searchWord = value
      },

      /**
       * 获取输入框的关键字
       */
      getValue() {
        return  this.searchWord
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-bar{
    padding: 15px 15.5px;

    .search-bar-wrapper{
      background: #F5F7F9;
      border-radius: 40px;
      box-sizing: border-box;
      height: 40px;
      display: flex;
      align-items: center;
      padding: 12px 17px;

      .search-icon{
        display: flex;
        align-items: center;
        height: 100%;
      }

      .search-bar-wrapper-input{
        flex: 1;
        margin: 0 8px;
        font-size: 16px;
      }

      .clear-icon{
        display: flex;
        align-items: center;
        height: 100%;
      }
    }
  }
</style>
