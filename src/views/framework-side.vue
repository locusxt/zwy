<template>
    <div span="5">
        <Menu active-name="1-2" width="auto" :open-names="['1']" v-on:on-menu-item-select="navigate">
            <Submenu name="1">
                <template slot="title">
                    计算模式
                </template>
                <Menu-item name="1-1">浏览</Menu-item>
                <Menu-item name="1-2">新建</Menu-item>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    算法
                </template>
                <Menu-item name="2-1">浏览</Menu-item>
                <Menu-item name="2-2">新建</Menu-item>
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
                case "1-2":
                    url = "/frame/newcm";
                    break;
                case "1-1":
                    url = "/frame/cmview";
                    break;
                case "2-2":
                    url = "/frame/newam";
                    break;
                case "2-1":
                    url = "/frame/amview";
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