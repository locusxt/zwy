<template>
    <div class="layout">
    <Menu mode="horizontal" :theme="theme1" active-name="1">
            <router-link to='/frame/newcm'>
        <Menu-item name="1">
            架构管理
        </Menu-item>
            </router-link>
            <router-link to='/b'>
        <Menu-item name="2">
            测试管理
        </Menu-item>
            </router-link>
       <!--  <Menu-item name="2">
            <Icon type="ios-people"></Icon>
            用户管理
        </Menu-item>
        <Submenu name="3">
            <template slot="title">
                <Icon type="stats-bars"></Icon>
                统计分析
            </template>
            <Menu-group title="使用">
                <Menu-item name="3-1">新增和启动</Menu-item>
                <Menu-item name="3-2">活跃分析</Menu-item>
                <Menu-item name="3-3">时段分析</Menu-item>
            </Menu-group>
            <Menu-group title="留存">
                <Menu-item name="3-4">用户留存</Menu-item>
                <Menu-item name="3-5">流失用户</Menu-item>
            </Menu-group>
        </Submenu>
        <Menu-item name="4">
            <Icon type="settings"></Icon>
            综合设置
        </Menu-item> -->
    </Menu>
    <!-- <br>
    <p>切换主题</p>
    <Radio-group v-model="theme1">
        <Radio label="light"></Radio>
        <Radio label="dark"></Radio>
        <Radio label="primary"></Radio>
    </Radio-group> -->
    </div>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'primary'
            }
        }
    }
</script>
<style scoped>
</style>