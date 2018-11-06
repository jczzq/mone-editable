<template>
    <div id="knife-editable-1" class="knife-editable">
        <table class="table" colspan="0">
            <thead>
                <tr>
                    <th class="w50">行号</th>
                    <th class="w150">操作</th>
                    <th v-for="(field) in fields" :key="field.id">
                        {{field.label}}
                    </th>
                </tr>
            </thead>

            <tbody>
                <!--1.回显数据行-->
                <tr v-for="(row, rowIndex) in dataList" :key="row[config.primaryKey]">
                    <th class="row-no" >{{rowIndex+1}}</th>
                    <th>
                        <a class="btn" @click.stop="addRow(row, rowIndex, $event)">新增一行</a>
                        <a class="btn" @click.stop="deleteRow(row, rowIndex, $event)">删除此行</a>
                    </th>
                    <td v-for="(cell, cellIndex) in fields" :key="cell.id" >
                        <k-field
                        :row-index="rowIndex" 
                        :cell-index="cellIndex" 
                        :type="cell.type" 
                        :value.sync="row[cell.name]"
                        :len="0"
                        :list-slots="list[cell.name]"
                        @on-choose="onChoose"
                        >
                        </k-field>
                    </td>
                </tr>
                <!--回显数据行-->
            </tbody>
        </table>
    </div>
</template>

<script>
    import KField from './KField';
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
            hideFields() {
                return this.config.hideFields ? this.config.hideFields.split('|') : [];
            },
            fields() {
                if (this.config.fields) {
                    let list = this.config.fields.filter(f => {
                        return !this.hideFields.includes(f.name);
                    });
                    return list.sort((v1, v2) => { return +(v1.id > v2.id) || +(v1.id === v2.id) - 1; });
                } else {
                    return [];
                }
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
                lastElement: null
            };
        },
        methods: {
            onChoose(row, rowIndex) {
                // 比较主键
                let keys = this.dataList.map(x => { return x[this.config.primaryKey]; });
                if (keys.includes(row[this.config.primaryKey])) {
                    alert('已经存在');
                    return;
                }
                this.currentRow = JSON.parse(JSON.stringify(row));
                this.dataList.splice(rowIndex, 1, this.currentRow);
            },
            addRow(row, rowIndex, $event) {
                this.$emit('add-row', rowIndex);
            },
            deleteRow(row, rowIndex, $event) {
                this.$emit('del-row', rowIndex);
            }
        }
    };
</script>

<style lang="less">
    @import '~@/assets/less/_theme.less';
    .btn {
        padding: 8px;
        color: @TiffanyBlue;
        cursor: pointer;
        text-decoration: underline;
        font-weight: 100;
        font-size: 12px;
    }
    .knife-editable {
        font-family: "Microsoft YaHei","PingFangSC-Regular","Hiragino Sans GB","Helvetica Neue",Helvetica;
        overflow-x: auto;
        overflow-y: hidden;
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
            padding: 0;
            border-top: 1px solid #ddd;
            vertical-align: middle;
            border-left: 1px solid #ddd;
            white-space: nowrap;
        }
        .table>thead>tr>td, 
        .table>thead>tr>th {
            padding: 0 8px;
        }
        .w50 {
            width: 50px;
        }
        .w150 {
            width: 150px;
        }
    }
</style>
