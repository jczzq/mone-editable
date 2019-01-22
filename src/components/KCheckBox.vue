<template>
  <div class="field-check-box"
    :class="{ show: focus }">
    <input class="hide-checkbox" @keyup="handleKeyup" @focus="focus = true" @blur="focus = false" type="checkbox" :value="value"/>
    <span @click="checkedHandle"
      class="k-check-box"
      :class="{checked: value}">
      <k-icon v-if="value"
        xlink="#icon-checked"></k-icon>
    </span>
  </div>
</template>

<script>
export default {
  name: 'k-check-box',
  props: ['value'],
  data() {
    return {
      focus: false
    };
  },
  methods: {
    checkedHandle() {
      this.$emit('change', !this.value);
    },
    handleKeyup(event) {
      // altKey
      // shiftKey
      // console.log('event', event);
      switch (event.keyCode) {
        // enter
        case 13:
          this.checkedHandle();
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="less">
@import '~@/assets/less/_theme.less';
.field-check-box {
  height: 35px;
  text-align: center;
  &.show {
    border-color: red;
  }
  .hide-checkbox {
    padding: 0;
    margin: 0;
    width: 0;
    height: 0;
  }
  span.k-check-box {
    vertical-align: middle;
    display: inline-block;
    margin-top: 5px;
    width: 25px;
    height: 25px;
    text-align: center;
    box-sizing: border-box;
    color: transparent;
    cursor: pointer;
    border: 1px solid @ExtraLightSilver;
    border-radius: 3px;
    &.checked {
      border: 1px solid @TiffanyBlue;
      background-color: @TiffanyBlue;
      color: white;
    }
    .icon {
      color: white;
      width: 25px;
      height: 25px;
    }
  }
}
</style>
