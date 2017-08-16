<template>
    <div class="knife-field">
        <component :is="type" :value="value" @change="changeVal" @choose="chooseVal" :len="len" :slots="listSlots" ></component>
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
            'KCheckBox': KCheckBox,
            'KNumber': KNumber,
            'KSelect': KSelect,
            'KQuery': KQuery,
            'KText': KText
        },
        data() {
            return {
                a: false,
                b: 0,
                c: false
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
    @import './_global.less';

    .knife-field {
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
