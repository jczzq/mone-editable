<template>
  <div class="knife-field">
    <component :is="type"
      :value="value"
      :fields="fields"
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
      fields: [
        { name: 'id', label: 'ID', type: 'string' },
        { name: 'name', label: '姓名', type: 'string' },
        { name: 'age', label: '年龄', type: 'number' },
        { name: 'gender', label: '性别', type: 'number' },
        { name: 'grade', label: '年级', type: 'number' },
        { name: 'hasPass', label: '是否通过', type: 'boolean' },
        { name: 'No', label: '学号', type: 'number' }
      ]
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
.field-query {
  .label-icon {
    width: 30px;
    height: 25px;
    margin-right: 5px;
    color: @ExtraLightBlack;
    background-color: white;
    cursor: pointer;
    .icon {
      width: 20px;
      height: 20px;
    }
  }
  .label-icon:hover {
    background-color: @DarkWhite;
  }
}
</style>
