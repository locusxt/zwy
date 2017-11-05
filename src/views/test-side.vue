<template>
    <div span="5">
        <Menu active-name="1-2" width="auto" :open-names="['1']" v-on:on-menu-item-select="navigate">
            <Submenu name="1">
                <template slot="title">
                    数据管理
                </template>
                <Menu-item name="1-1">查看测试问题</Menu-item>
                <Menu-item name="1-2">添加测试问题</Menu-item>
                <Menu-item name="1-3">查看运行环境</Menu-item>
                <Menu-item name="1-4">添加运行环境</Menu-item>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    测试
                </template>
                <Menu-item name="2-1">计算模式</Menu-item>
                <Menu-item name="2-2">算法</Menu-item>
            </Submenu>
        </Menu>
    </div>
</template>
<script>
export default {
    methods: {
        navigate(event) {
            var url = "";
            switch (event) {
                case "1-1":
                    url = "/test/datasetview";
                    break;
                case "1-2":
                    url = "/test/newdataset";
                    break;
                case "1-3":
                    url = "/test/runtimeview";
                    break;
                case "1-4":
                    url = "/test/newruntime";
                    break;
                case "2-1":
                    url = "/test/cmtest";
                    break;
                case "2-2":
                    url = "/test/amtest";
                    break;
                default:
                    url = "";
            }
            if (url != "") {
                // alert('haha');
                this.$router.push(url);
            }
        }
    }
}
</script>