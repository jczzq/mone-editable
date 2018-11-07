<template>
  <div class="field-select">
      <div class="field-select-block" layout="row" layout-align="space-between stretch">
        <input type="text" :value="currVal" readonly>
        <span class="label-icon" flex
          layout="row"
          @click="show = !show"
          layout-align="center center">
          <k-icon xlink="#icon-arrow-down"></k-icon>
        </span>
      </div>
      <ul class="field-select-box"
        v-show="show"
        :style="{ zIndex: $knife.getZIndex() }">
        <li class="field-option"
          v-for="(item, index) in optionsSlots"
          @click="()=>{$emit('change', item && item.split('|')[1]);show=false;}"
          :key="index">{{ item && item.split('|')[0] }}
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'k-select',
  props: ['value', 'slots'],
  data() {
    return {
      show: false
    };
  },
  computed: {
    currVal() {
      let val = this.optionsSlots.find(x => {
        return x.split('|')[1] && x.split('|')[1] == this.value;
      });
      return val && val.split('|')[0];
    },
    optionsSlots() {
      return (this.slots && this.slots.split(',')) || [];
    }
  }
};
</script>

<style lang="less">
@import '~@/assets/less/_theme.less';
.field-select {
  padding: 0;
  width: 100%;
  display: block;
  height: 100%;
  position: relative;
  .field-select-block {
    height: 100%;
    input {
      height: 100%;
      padding: 0 8px;
    }
  }
  .field-select-box {
    position: absolute;
    left: 0;
    top: @cell-height;
    background-color: white;
    list-style: none;
    margin: 0;
    padding: 0;
    border: 1px solid @ExtraLightGray;
    box-shadow: 0 10px 15px 1px #eee;
    max-height: 200px;
    overflow-y: auto;
    width: 100%;
    .field-option {
      cursor: pointer;
      border-bottom: 1px solid @ExtraLightGray;
      height: @cell-height;
      line-height: @cell-height;
      box-sizing: border-box;
      padding: 0 8px;
      &:hover {
        background-color: @DarkWhite;
      }
    }
  }
}
</style>

