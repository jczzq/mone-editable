<template>
    <div id="app">
        <h3 class="text-center">vue-editable</h3>
        <!-- field组件 -->
        <div>
            <k-editable
            :config="config"
            :data-list="rows"></k-editable>
        </div>
    </div>
</template>

<script>
    import KEditable from '@/components/KEditable';
    export default {
        name: 'app',
        components: {
            KEditable
        },
        data() {
            return {
                config: {
                    fields: [
                        {id: 5, name: 'id', label: 'ID'},
                        {id: 1, name: 'name', label: '姓名', type: 'KText'},
                        {id: 4, name: 'age', label: '年龄', type: 'KNumber'},
                        {id: 3, name: 'gender', label: '性别', type: 'KCheckBox'},
                        {id: 6, name: 'grade', label: '年级', type: 'KSelect'},
                        {id: 2, name: 'No', label: '学号', type: 'KQuery'}
                    ],
                    list: {
                        grade: '一年级|1,二年级|2,三年级|3,四年级|4,五年级|5,六年级|6'
                    },
                    query: {
                    }
                },
                rows: [
                    {
                        id: 1,
                        name: 'jczzq',
                        age: 18,
                        gender: 0,
                        grade: 4,
                        No: 75
                    },
                    {
                        id: 2,
                        name: 'Evan You',
                        age: 38,
                        gender: 0,
                        grade: '2',
                        No: 64
                    },
                    {
                        id: 3,
                        name: '坂田银时',
                        age: 58,
                        gender: 1,
                        grade: 5,
                        No: 60
                    }
                ]
            };
        }
    };
</script>

<style>

</style>
