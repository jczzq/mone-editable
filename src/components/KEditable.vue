<template>
    <div id="knife-editable-1" class="knife-editable" @click="reset">
        <table class="table" colspan="0">
            <thead>
                <tr>
                    <th class="w50">行号</th>
                    <th class="w100">操作</th>
                    <th v-for="(field, index) in fields" :key="field.id">
                        {{field.label}}
                    </th>
                </tr>
            </thead>

            <tbody>
                <!--1.回显数据行-->
                <tr v-for="(row, rowIndex) in dataList" :key="row.id">
                    <th class="row-no" >{{rowIndex+1}}</th>
                    <th>
                        <a class="btn" @click="opt(row, rowIndex, $event)">操作</a>
                    </th>
                    <td v-for="(cell, cellIndex) in fields" :key="cell.id" 
                    @click="chooseCell(cell, cellIndex, row, rowIndex, $event)">
                        {{row[cell.name]}}
                    </td>
                </tr>
                <!--回显数据行-->
            </tbody>
        </table>

        <!-- 当前单元格 -->
        <k-field id="currentField" v-if="currentCell && currentRow"
        :type="currentCell.type" 
        :value.sync="currentRow[currentCell.name]"
        :len="0"
        :list-slots="list[currentCell.name]"></k-field>

        <!-- 当前操作面板 -->
        <div id="currentOpt" class="btn-group" v-show="currentOptShow">
            <span class="triangle-top"></span>
            <p @click="deleteRow">新增一行</p>
            <p @click="editRow">删除此行</p>
        </div>
    </div>
</template>

<script>
    import KField from '@/components/KField';
    export default {
        name: 'k-editable',
        props: {
            config: {
                type: Object,
                required: true
            },
            dataList: {
                type: Array
            }
        },
        components: {
            KField
        },
        computed: {
            fields() {
                return this.config.fields.sort((v1, v2) => { return v1.id > v2.id; }) || [];
            },
            list() {
                return this.config.list || {};
            },
            query() {
                return this.config.query || {};
            }
        },
        data() {
            return {
                currentCell: null,
                currentRow: null,
                lastElement: null,
                currentOptShow: false
            };
        },
        methods: {
            reset() {
                this.currentOptShow = false;
                this.currentCell = null;
                this.currentRow = null;
            },
            deleteRow() {
                this.currentOptShow = false;
                event.stopPropagation();
            },
            editRow() {
                this.currentOptShow = false;
                event.stopPropagation();
            },
            // 选中单元格
            chooseCell(cell, cellIndex, row, rowIndex, event) {
                if (event.target.tagName == 'TD') {
                    this.currentCell = cell;
                    this.currentRow = row;
                    // 1.移动 currentField 到当前单元格
                    event.target.style.position = 'relative';
                    if (this.lastElement) {
                        this.lastElement.style.position = 'static';
                    }
                    this.lastElement = event.target;
                    this.$nextTick(() => {
                        event.target.appendChild(document.getElementById('currentField'));
                    });
                    event.stopPropagation();
                }
            },
            // 操作
            opt(row, rowIndex, event) {
                this.currentCell = null;
                this.currentOptShow = true;
                this.currentRow = row;
                event.target.parentNode.appendChild(document.getElementById('currentOpt'));
                event.stopPropagation();
            }
        }
    };
</script>

<style lang="less">
    @import '~@/assets/less/_theme.less';
    @import './_global.less';
    .btn {
        padding: 8px;
        color: @TiffanyBlue;
        cursor: pointer;
        text-decoration: underline;
    }
    .triangle-top {
        position: absolute;
        display: inline-block;
        width: 0;
        margin-left: -10px;
        margin-top: -10px;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #ddd;
        left: 50%;
    }
    #currentOpt {
        position: fixed;
        min-width: 80px;
        background-color: transparent;
        border: 1px solid #ddd;
        border-radius: 3px;
        margin-left: 0px;
        margin-top: 10px;
        p {
            background-color: white;
            font-weight: 100;
            font-size: 14px;
            padding: 8px;
            border-top: 1px solid #ddd;
        }
        p:hover {
            cursor: pointer;
            background-color: @DarkWhite;
        }
        p:first-child {
            border-top: none;
        }
    }
    .knife-editable {
        font-family: "Microsoft YaHei","PingFangSC-Regular","Hiragino Sans GB","Helvetica Neue",Helvetica;
        width: 100%;
        overflow-x: auto;
        .table {
            margin: 20px 0;
            border-spacing: 0;
            border-collapse: collapse;
            min-width: 100%;
            font-size: 14px;
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            thead {
                tr {
                    background-color: @DarkWhite;
                }
            }
        }
        .table>tbody>tr>td, 
        .table>tbody>tr>th, 
        .table>tfoot>tr>td, 
        .table>tfoot>tr>th, 
        .table>thead>tr>td, 
        .table>thead>tr>th {
            height: 35px;
            box-sizing: border-box;
            padding: 7px 8px;
            border-top: 1px solid #ddd;
            vertical-align: top;
            border-left: 1px solid #ddd;
            white-space: nowrap;
        }
        .w50 {
            width: 50px;
        }
        .w100 {
            width: 100px;
        }
    }
</style>
