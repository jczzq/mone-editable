<template>
    <div id="app">
        <h3 class="text-center">vue-editable</h3>
        <!-- 可编辑表格 -->
        <div>
            <k-editable
            :config="config"
            :data-list="rows"
            @add-row="addNewRow"
            @del-row="delRow"></k-editable>
        </div>

        <!--不知道是什么布局-->
        <div class="table-block" layout="row" layout-align="start stretch">
            <div flex v-for="(col, colIndex) in cols" :key="colIndex" layout="column" layout-align="space-between stretch">
                <div flex class="cell" v-for="(cell, row) in cols.filter((x,i) => {return i <= colIndex;}).reduce((y, s) => { return y*s}, 1)" :key="row">
                    {{row+1}}
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                cols: [4, 2, 3, 2, 2],
                rowModel: {
                    id: null,
                    name: null,
                    age: null,
                    gender: null,
                    grade: null,
                    No: null
                },
                config: {
                    fields: [
                        {id: 5, name: 'id', label: 'ID'},
                        {id: 1, name: 'name', label: '姓名', type: 'KText'},
                        {id: 4, name: 'age', label: '年龄', type: 'KNumber'},
                        {id: 6, name: 'gender', label: '性别', type: 'KSelect'},
                        {id: 7, name: 'hasPass', label: '是否通过', type: 'KCheckBox'},
                        {id: 3, name: 'grade', label: '年级', type: 'KSelect'},
                        {id: 2, name: 'No', label: '学号', type: 'KQuery'}
                    ],
                    list: {
                        grade: '一年级|1,二年级|2,三年级|3,四年级|4,五年级|5,六年级|6',
                        gender: '男|1,女|0'
                    },
                    query: {
                    },
                    primaryKey: 'No',
                    searchKey: 'name',
                    hideFields: 'id'
                },
                rows: [
                    {
                        id: 1,
                        name: 'jczzq',
                        age: 18,
                        gender: 0,
                        grade: 4,
                        No: 75,
                        hasPass: false
                    },
                    {
                        id: 2,
                        name: 'Evan You',
                        age: 38,
                        gender: 0,
                        grade: '2',
                        No: 64,
                        hasPass: true
                    },
                    {
                        id: 3,
                        name: '坂田银时',
                        age: 58,
                        gender: 1,
                        grade: 5,
                        No: 60,
                        hasPass: false
                    }
                ]
            };
        },
        methods: {
            // 添加新行
            addNewRow(rowIndex) {
                let newRow = JSON.parse(JSON.stringify(this.rowModel));
                for (var key in newRow) {
                    newRow[key] = '';
                }
                this.rows.splice(rowIndex + 1, 0, newRow);
            },
            // 删除某行
            delRow(rowIndex) {
                this.rows.splice(rowIndex, 1);
            }
        }
    };
</script>

<style lang="less">
    @import './assets/less/_flex.less';
    .table-block {
        border: 1px solid blue;
    }
    .table-block>div{
        border: 1px solid red;
        box-sizing: border-box;
        .cell {
            border: 1px solid red;
            box-sizing: border-box;
        }
    }
</style>
