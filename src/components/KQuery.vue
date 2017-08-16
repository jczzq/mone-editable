<template>
    <div class="field-box field-query" layout="row" layout-align="space-between center">
        <input type="text" :value="value" @input="$emit('change', $event.target.value)"/>
        <span class="label-icon" layout="row" layout-align="center center">
            <k-icon xlink="#icon-search"></k-icon>
        </span>
    </div>
</template>

<script>
    export default {
        name: 'k-select',
        props: ['value'],
        methods: {
        }
    };
</script>

<style lang="less">
    @import '~@/assets/less/_theme.less';
    .field-query {
        input {
            width: 100%;
            padding-right: 2px;
            border-radius: 2px 0 0 2px;
            border-right: none;
        }
        .label-icon {
            width: 35px;
            height: 35px;
            border: 1px solid @ExtraLightSilver;
            border-left: 1px solid @LightGray;
            border-radius: 0 2px 2px 0;
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

