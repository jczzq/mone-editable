<template>
    <div class="knife-field">
        <component :is="type" :value="value" @change="changeVal" :len="len" :slots="listSlots" ></component>
    </div>
</template>

<script>
    import KCheckBox from '@/components/KCheckBox';
    import KNumber from '@/components/KNumber';
    import KSelect from '@/components/KSelect';
    import KQuery from '@/components/KQuery';
    import KText from '@/components/KText';
    export default {
        name: 'k-field',
        props: {
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
            }
        }
    };
</script>

<style lang="less">
    @import '~@/assets/less/_theme.less';
    @import './_global.less';

    .knife-field {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        display: inline-block;
        box-sizing: border-box;
        z-index: 6;
    }
</style>
