<template>
    <div class="field-box field-select">
        <div class="field-query" layout="row" layout-align="space-between center">
            <input type="text" readonly :value="currVal"/>
            <span class="label-icon" layout="row" @click="show = !show" layout-align="center center">
                <k-icon xlink="#icon-arrow-down"></k-icon>
            </span>
        </div>
        <ul class="select-box" v-show="show">
            <li v-for="(item, index) in optionsSlots" 
            @click="$emit('change', item && item.split('|')[1])" :key="index" >{{ item && item.split('|')[0] }}</li>
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
                let val = this.optionsSlots.find(x => { return (x.split('|')[1]) && (x.split('|')[1]) == this.value; });
                return val && val.split('|')[0];
            },
            optionsSlots() {
                return this.slots && this.slots.split(',') || [];
            }
        }
    };
</script>

<style lang="less">
    @import '~@/assets/less/_theme.less';
    .field-select {
        position: relative;
        .select-box {
            background-color: white;
            width: 100%;
            position: absolute;
            list-style: none;
            margin: 0;
            border: 1px solid @ExtraLightGray;
            li {
                cursor: pointer;
                border-bottom: 1px solid @ExtraLightGray;
                padding: 5px 10px;
            }
            li:hover {
                background-color: @DarkWhite;
            }
            z-index: 66;
        }
    }
    .field-query {
        input {
            padding-right: 2px;
            border-radius: 2px 0 0 2px;
            border-right: none;
            width: 100%;
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

