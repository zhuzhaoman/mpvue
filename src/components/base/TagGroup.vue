<template>
  <div class="tag-group">
    <div class="tag-group-wrapper">
      <div class="wrapper-header">
        <div class="wrapper-header-text">{{headerText}}</div>
        <div class="wrapper-header-btn" @click="onChangeClick">{{btnText}}</div>
      </div>
      <div class="wrapper-content">
        <div class="wrapper-content-inner" v-for="(tag, index) in tags" :key="index">
          <Tag :text="tag.title" @onTagClick="onTagClick(tag, index)"></Tag>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Tag from './Tag'
  export default {
    name: 'tagGroup',
    props: {
      headerText: {
        type: String,
        default: ''
      },
      btnText: {
        type: String,
        default: '换一批'
      },
      tags: {
        type: Array,
        default: []
      }
    },
    methods: {
      onTagClick(text, index) {
        this.$emit('onTagClick', text, index)
      },
      onChangeClick() {
        this.$emit('onChangeClick')
      }
    },
    components: {
      Tag
    }
  }
</script>
<style lang="scss" scoped>
  .tag-group{

    .tag-group-wrapper{
      padding: 0 16.5px;

      .wrapper-header{
        display: flex;
        justify-content: space-between;

        .wrapper-header-text{
          color: #333;
          font-size: 14px;
          line-height: 20px;
        }
        .wrapper-header-btn{
          color: #3696EF;
          font-size: 14px;
          line-height: 20px;
        }
      }
      .wrapper-content{
        display: flex;
        flex-flow: row wrap;
        margin-top: 10px;

        .wrapper-content-inner{
          max-width: 100%;
          padding: 5px 5px;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
