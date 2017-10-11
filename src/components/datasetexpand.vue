// expand-row.vue
<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>

<template>
    <div>
        <Row class="expand-row">
            <Col span="24">
                <span class="expand-key">描述：</span>
                <span class="expand-value">{{ row.desc }}</span>
            </Col>
            <Col span="24">
                <span class="expand-key">生成方法：</span>
                <span class="expand-value">{{ row.gen }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>