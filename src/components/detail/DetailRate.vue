<template>
  <div class="detail-rate">
    <div class="detail-wrapper">
      <span class="detail-rate-text">轻点评分</span>
      <div class="detail-rate-wrapper">
        <van-rate
          :value="rateValue"
          :size="25"
          color="#1D89EE"
          void-color="#DEE0E2"
          void-icon="star"
          @change="onRateChange"
        ></van-rate>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detailRate',
    data() {
      return {
        any: ""
      }
    },
    props: {
      rateValue: Number
    },
    methods: {
      onRateChange(e) {
        this.$emit('onRateChange', e.mp.detail)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detail-rate {
    .detail-wrapper{
      position: relative;
      display: flex;
      padding: 10px 0;
      box-sizing: border-box;
      margin: 0 15px;
      align-items: center;
      border-bottom: 1px solid #EBEBEB;

      .detail-rate-text {
        font-size: 14px;
        color: #909090;
      }

      .detail-rate-wrapper {
        flex: 1;
        text-align: right;
      }
    }
  }
</style>
