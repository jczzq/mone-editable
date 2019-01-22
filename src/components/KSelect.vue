<template>
  <div class="field-select" :class="{ show }">
    <div class="field-select-block"
      layout="row"
      layout-align="space-between stretch">
      <input ref="selectInput" type="text" :value="activeItem.name" flex readonly @focus="handleFocus" @blur="handleBlur" @keyup="handleKeyup">
      <span class="label-icon"
        layout="row"
        @click="show = !show"
        layout-align="center center">
        <k-icon xlink="#icon-arrow-down"></k-icon>
      </span>
    </div>
    <transition name="slide-up" mode="out-in">
    <ul class="field-select-box"
      v-show="show"
      :style="{ zIndex: $knife.getZIndex() }">
      <li class="field-option"
        :class="{ active: (activeItem && activeItem.value === item.value) }"
        v-for="(item, index) in optionsSlots"
        @click="choose(item)"
        :key="item.value || index">{{ item.name }}
      </li>
    </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'k-select',
  props: ['value', 'slots'],
  data() {
    return {
      show: false,
      activeItem: {}
    };
  },
  watch: {
    show(val) {
      if (val) {
        this.$refs.selectInput.focus();
      }
    }
  },
  computed: {
    optionsSlots() {
      let arr = (this.slots && this.slots.split(',')) || [];
      return arr.map(x => {
        let [name, value] = x.split('|');
        return {
          name,
          value
        };
      });
    }
  },
  methods: {
    choose(item) {
      this.$nextTick(() => {
        this.$refs.selectInput.blur();
      });
      if (this.activeItem.value === item.value) {
        return;
      }
      // console.log('item', item);
      this.activeItem = item;
      this.$emit('change', item && item.value);
    },
    handleFocus(event) {
      if (!this.show) {
        this.show = true;
      }
    },
    handleKeyup(event) {
      // altKey
      // shiftKey
      // console.log('event', event);
      switch (event.keyCode) {
        // tab
        case 9:
          break;
        // enter
        case 13:
          this.show = true;
          break;
        // Alt
        case 18:
          break;
        // Esc
        case 27:
          break;
        // up
        case 38:
          this.lastActive();
          break;
        // down
        case 40:
          this.nextActive();
          break;
        default:
          break;
      }
    },
    lastActive() {
      if (!(this.optionsSlots && this.optionsSlots.length)) return;
      if (!(this.activeItem && this.activeItem.value)) {
        this.activeItem = this.optionsSlots[0] || {};
        return;
      }
      let i = this.optionsSlots.findIndex(
        x => x.value === this.activeItem.value
      );
      i <= 0 ? (i = 0) : i--;
      this.activeItem = this.optionsSlots[i];
    },
    nextActive() {
      if (!(this.optionsSlots && this.optionsSlots.length)) return;
      if (!(this.activeItem && this.activeItem.value)) {
        this.activeItem = this.optionsSlots[0] || {};
        return;
      }
      let i = this.optionsSlots.findIndex(
        x => x.value === this.activeItem.value
      );
      i >= this.optionsSlots.length ? (i = this.optionsSlots.length) : i++;
      this.activeItem = this.optionsSlots[i];
    },
    handleBlur() {
      setTimeout(() => {
        this.show = false;
      }, 300);
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
  border: 1px solid transparent;
  // 上出上入
  .slide-up-enter-active,
  .slide-up-leave-active {
      transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .slide-up-enter,
  .slide-up-leave-active {
      transform: translateY(-10px);
      opacity: 0;
  }
  &.show {
    border-color: #eee;
  }
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
      &.active,
      &:hover {
        background-color: @DarkWhite;
      }
    }
  }
}
</style>

