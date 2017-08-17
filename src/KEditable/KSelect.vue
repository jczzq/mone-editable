<template>
    <div class="field-box field-select">
        <div class="field-query" layout="row" layout-align="space-between center">
            <input type="text" readonly :value="currVal"/>
            <span class="label-icon" layout="row" @click="show = !show" layout-align="center center">
                <k-icon xlink="#icon-arrow-down"></k-icon>
            </span>
        </div>
        
        <div class="select-box" v-show="show">
            <ul>
                <li v-for="(item, index) in optionsSlots" 
                @click="()=>{$emit('change', item && item.split('|')[1]);show=false;}" :key="index" >{{ item && item.split('|')[0] }}</li>
            </ul>
        </div>
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
        width: 100%;
        display: block;
        .select-box {
            background-color: white;
            position: absolute;
            
            list-style: none;
            margin: 0;
            border: 1px solid @ExtraLightGray;
            box-shadow: 0 10px 15px 1px #eee;
            z-index: 1000;
            max-height: 210px;
            width: 160px;
            overflow: hidden;
            ul {
                min-width: 180px;
                max-height: 210px;
                overflow-y: auto;
            }
            li {
                cursor: pointer;
                border-bottom: 1px solid @ExtraLightGray;
                height: 35px;
                line-height: 35px;
                box-sizing: border-box;
                padding: 0 8px;
            }
            li:hover {
                background-color: @DarkWhite;
            }
        }
    }
</style>

