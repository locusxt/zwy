// expand-row.vue
<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="12">
                <span class="expand-key">cpu：</span>
                <span class="expand-value">{{ row.cpu }}</span>
            </Col>
            <Col span="12">
                <span class="expand-key">节点个数：</span>
                <span class="expand-value">{{ row.nodenum }}</span>
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