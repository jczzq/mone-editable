<template>
    <div class="knife-field">
        <div class="field-box field-text" v-if="type === 'text'">
            <input type="text" />

        </div>

        <div class="field-box field-number" v-if="type === 'number'">
            <input type="text" />
        </div>

        <div class="field-box field-select"  v-if="type === 'select'">
            <input type="text" />
            <ul class="select-box">
                <li></li>
            </ul>
        </div>

        <div class="field-box field-query"  v-if="type === 'query'">
            <input type="text" />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'knife-field',
        props: {
            type: {
                type: String,
                required: true
            },
            value: {}
        },
        data() {
            return {
            }
        }
    }
</script>

<style lang="less" scoped>
    @import './_global.less';
    .knife-field {
        display: inline-block;
        box-sizing: border-box;
        .field-box {
            box-sizing: border-box;
            input {
                padding: 7px 8px;
                outline: none;
                border: 1px solid @ExtraLightSilver;
                font-size: 14px;
            }
            input:focus {
                box-shadow: 0 0 1px 1px fade(@ExtraLightSilver, 50%);
            }
        }
        .field-text {

        }
        .field-number {

        }
        .field-select {
            .select-box {
                list-style: none;
                margin: 0;
            }
        }
        .field-query {

        }
    }
</style>
