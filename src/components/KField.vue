<template>
  <div class="knife-field">
    <component :is="type"
      :value="value"
      :fields="table.fields"
      :data-list="table.dataList"
      @change="changeVal"
      @choose="chooseVal"
      :len="len"
      :slots="listSlots"></component>
  </div>
</template>

<script>
import KCheckBox from './KCheckBox';
import KNumber from './KNumber';
import KSelect from './KSelect';
import KQuery from './KQuery';
import KText from './KText';
export default {
  name: 'k-field',
  props: {
    rowIndex: {
      type: Number
    },
    cellIndex: {
      type: Number
    },
    type: {
      required: true,
      default: 'span'
    },
    value: {
      required: true
    },
    len: {
      default: 0
    },
    listSlots: {
      default: ''
    },
    table: {
      default() {
        return {
        };
      }
    }
  },
  components: {
    KCheckBox: KCheckBox,
    KNumber: KNumber,
    KSelect: KSelect,
    KQuery: KQuery,
    KText: KText
  },
  data() {
    return {
    };
  },
  methods: {
    changeVal(newVal) {
      this.$emit('update:value', newVal);
    },
    chooseVal(item) {
      this.$emit('on-choose', item, this.rowIndex);
    }
  }
};
</script>

<style lang="less">
@import '~@/assets/less/_theme.less';

.knife-field {
  height: 100%;
  width: 100%;
}
.field-box {
  width: 100%;
  box-sizing: border-box;
  input {
    height: 35px;
    line-height: 35px;
    width: 100%;
    padding: 0 8px;
    font-size: 14px;
  }
}
.label-icon {
  width: @cell-height;
  height: 100%;
  color: @ExtraLightBlack;
  background-color: white;
  cursor: pointer;
}
.label-icon:hover {
  background-color: @DarkWhite;
}
</style>
