<template>
    <Row>
        <i-col span='18' offset='2'>
            <div>
                <h1 align="center">测试计算模式</h1>
                <br />
            </div>
        </i-col>
        <i-col span='18' offset='2'>
            <strong>计算模式：</strong> {{cur.name}} &nbsp;&nbsp;&nbsp;  
            <cmSelector @transferCM="getCM"></cmSelector>
            <div>
                <p>负责人: {{cur.leader}}</p>
                <p>版本: {{cur.version}}</p>
                <p>描述: {{cur.desc}}</p>
                <br>
                <strong>可配置项：</strong>
                <br>
            </div>
        </i-col>
    </Row>
</template>
<script>
    import cmSelector from "../components/cmselector"
    export default {
        data () {
            return {
                cur:{
                    name: '未选择',
                    leader: '',
                    version: '',
                    date:'',
                    configs: []
                },
            }
        },
        methods:{
            sayhello(){
                console.log(this.formItem.configs);
                this.$ajax({
                    method:'get',
                    url:'/api'
                }).then(function(response){
                    console.log(response);
                });
            },
            getConfigs(msg){
                this.formItem.configs = msg;
            },
            getCM(msg){
                this.cur = msg;
                console.log(msg);
            }
        },
        components:{
            cmSelector
        }
    }
</script>