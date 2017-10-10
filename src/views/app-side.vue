<template>
    <div span="5">
        <Menu active-name="1-1" width="auto" :open-names="['1']" v-on:on-menu-item-select="navigate">
            <Submenu name="1">
                <template slot="title">
                    应用软件管理
                </template>
                <Menu-item name="1-1">添加流程</Menu-item>
                <Menu-item name="1-2">评估流程</Menu-item>
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
                    url = "/app/newapp";
                    break;
                case "1-2":
                    // url = "/app/newdataset";
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