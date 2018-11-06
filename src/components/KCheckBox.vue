<template>
    <div class="field-box field-check-box">
        <span @click="$emit('change', Number(!value))" class="k-check-box" :class="{checked: value}">
            <k-icon v-if="value" xlink="#icon-checked"></k-icon>
        </span>
    </div>
</template>

<script>
export default {
    name: 'k-check-box',
    props: ['value']
};
</script>

<style lang="less">
    @import '~@/assets/less/_theme.less';
    .field-check-box {
        height: 35px;
        text-align: center;
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
            border:1px solid @TiffanyBlue;
            background-color: @TiffanyBlue;
            color: white;
        }
        .icon {
            color: white;
            width: 25px;
            height: 25px;
        }
    }
</style>
