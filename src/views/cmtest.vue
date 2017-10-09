<template>
    <Row>
        <i-col span='18' offset='2'>
            <div>
                <h1 align="center">测试计算模式</h1>
                <br />
            </div>
        </i-col>
        <i-col span='18' offset='2'>
            <h2>计算模式：&nbsp;&nbsp;&nbsp; <cmSelector @transferCM="getCM"></cmSelector></h2>
            <div>
                <p>名称：{{cur.name}}</p>
                <p>负责人: {{cur.leader}}</p>
                <p>版本: {{cur.version}}</p>
                <p>描述: {{cur.desc}}</p>
            </div>
            <br>

            <h2>可配置项：</h2>
            <div>
                <configEditor :cur="cur" @transferConfigs="getConfigs"></configEditor> 
            </div>
            <br>
            
            <h2>运行环境：&nbsp;&nbsp;&nbsp;<runtimeSelector @transferRuntime="getRuntime"></runtimeSelector></h2>
            <div>
                <p>名称：{{runtime.name}}</p>
                <p>CPU：{{runtime.cpu}}</p>
                <p>节点个数：{{runtime.nodenum}}</p>
            </div>
            <br>
            <h2>测试问题：</h2>
            <br><br>
            <div>
                <Button type="primary">确认</Button>
            </div>
            <br>
            <hr>
            <br>
            <h2>测试结果：&nbsp;&nbsp;&nbsp;<Button type="primary">添加结果</Button></h2>
            <br>
            <div>
                <Table :columns="columns" :data="data"></Table>
            </div>
            
        </i-col>
    </Row>
</template>
<script>
    import cmSelector from "../components/cmselector"
    import configEditor from "../components/configeditor"
    import runtimeSelector from "../components/runtimeselector"
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
                runtime:{
                    name:'未选择',
                    cpu:'',
                    nodenum:''
                },
                configs:[],
                columns: [
                    {
                        title: '编号',
                        key: '_id'
                    },
                    {
                        title: '添加时间',
                        key: 'time'
                    },
                    {
                        title: '负责人',
                        key: 'leader'
                    },
                    {
                        title: '结果',
                        key: 'result'
                    }
                ],
                data: [
                ]
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
            },
            getRuntime(msg){
                this.runtime = msg;
                console.log(msg);
            },
            getConfigs(msg){
                this.configs = msg;
                console.log(msg);
            }
        },
        components:{
            cmSelector, configEditor, runtimeSelector 
        }
    }
</script>