<template>
  <div class="field-box field-Text">
    <input type="text" ref="curTxt" :value="value" @input="$emit('change', $event.target.value)"/>
    </div>
</template>

<script>
export default {
  name: 'k-text',
  props: ['value']
};
</script>

<style lang="less">
@import '~@/assets/less/_theme.less';
.field-Text {
}
</style>

