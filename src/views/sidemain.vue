<template>
    <div style="background:#eee;padding:10px">
        <Card class="card">
            <Row>
                <i-col span="5">
                    <router-view name='side'></router-view>
                </i-col>
                <i-col span="19">
                    <router-view name='main'></router-view>
                </i-col>
            </Row>
        </Card>
    </div>
</template>
<script>
export default {
}
</script>
<style scoped>
</style>
