<template>
    <div id="app">
        <h3 class="text-center">vue-editable</h3>
        <!-- field组件 -->
        <k-field type="text"></k-field>
        <k-field type="number"></k-field>
        <k-field type="select"></k-field>
        <k-field type="query"></k-field>
    </div>
</template>

<script>
    import KEditable from '@/components/KEditable'
    import KField from '@/components/KField'
    export default {
        name: 'app',
        components: {
            KEditable,
            KField
        }
    }
</script>

<style>

</style>
