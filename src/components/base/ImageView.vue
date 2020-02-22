<template>
  <div class="image-view" @click="onClick">
    <img
      :class="round ? 'round image' : 'image'"
      :style="{ height: height }"
      :src="src"
      :mode="mode"
      :lazy-load="lazyLoad"
      @load="onLoad"
      @error="onError"
      v-show="!isLoading && !error" />

    <img
      :class="round ? 'round image' : 'image'"
      :style="{ height: height }"
      src="https://www.youbaobao.xyz/book/img/loading2.ae9e5924.jpeg"
      :mode="mode"
      :lazy-load="lazyLoad"
      v-show="isLoading || error" />
  </div>
</template>

<script>
  export default {
    name: "imageView",
    props: {
      src: { // 图片地址
        type: String,
        default: ''
      },
      mode: { // 图片伸缩模式
        type: String,
        default: 'widthFix'
      },
      lazyLoad: { // 是否启动懒加载
        type: Boolean,
        default: true
      },
      round: { // 是否为圆形图片
        type: Boolean,
        default: false
      },
      height: {
        type: String,
        default: 'auto'
      }
    },
    watch: {
      src(newValue, preValue) { // 监听src变化，如果src变化，则将isLoading置为true
        if (newValue && newValue.length > 0 && newValue !== preValue){
          this.$nextTick(() => {
            this.isLoading = true
            this.error = false
          })
        }
      }
    },
    data(){
      return {
        isLoading: true, // 图片是否处于加载状态
        error: false // 是否加载失败
      }
    },
    methods: {
      /**
       * 图片点击事件
       */
      onClick() {
        this.$emit('onClick')
      },

      /**
       * 图片加载失败事件
       */
      onError() {
        this.error = true
        this.isLoading = false
      },

      /**
       * 图片加载成功事件
       */
      onLoad() {
        this.error = false
        this.isLoading = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .image-view{
    width: 100%;
    height: 100%;

    .image {
      width: 100%;
    }
    .round {
      border-radius: 50%;
    }
  }
</style>
