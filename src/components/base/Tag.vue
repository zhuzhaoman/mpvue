<template>
  <div class="tag" @click="onTagClick">
    <div class="tag-text">{{text}}</div>
  </div>
</template>
<script>
  export default {
    name: 'tag',
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    methods: {
      onTagClick() {
        this.$emit('onTagClick')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .tag{
    width: 100%;
    display: flex;
    justify-content: center;
    background: #F7F7F8;
    border-radius: 16px;
    padding: 6px 17px;
    box-sizing: border-box;

    .tag-text{
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 14px;
      color: #272E37;
    }
  }
</style>
