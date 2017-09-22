<template>
    <Input v-model="value">
    <span slot="prepend">{{title}}</span>
    <Button slot="append" icon="ios-search"></Button>
    </Input>
</template>
<script>
export default {
    data() {
        return {
            value: '',
            title: '计算模式'
        }
    }
}
</script>