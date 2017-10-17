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
                <span class="expand-key">负责人：</span>
                <span class="expand-value">{{ row.leader }}</span>
            </Col>
            <Col span="12">
                <span class="expand-key">创建日期：</span>
                <span class="expand-value">{{ row.date | formatDate}}</span>
            </Col>
            <Col span="24">
                <span class="expand-key">描述：</span>
                <span class="expand-value">{{ row.desc }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        },
        filters:{
            formatDate(time){
                return String(time).substring(0, 10);
            }
        }
    };
</script>