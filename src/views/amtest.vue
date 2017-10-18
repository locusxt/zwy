<template>
    <Row>
        <i-col span='18' offset='2'>
            <div>
                <h1 align="center">测试算法模式</h1>
                <br />
            </div>
        </i-col>
        <i-col span='18' offset='2'>
            <h2>算法模式：&nbsp;&nbsp;&nbsp;
                <amSelector @transferAM="getAM"></amSelector>
            </h2>
            <div>
                <p>名称：{{cur.name}}</p>
                <p>负责人: {{cur.leader}}</p>
                <p>版本: {{cur.version}}</p>
                <p>描述: {{cur.desc}}</p>
            </div>
            <br>

            <h2>可配置项：</h2>
            <div>
                <configEditor :configs="cur.configs" @transferConfigs="getConfigs"></configEditor>
                <configEditor :configs="cur.subconfigs" @transferConfigs="getSubConfigs"></configEditor>
            </div>
            <br>

            <h2>运行环境：&nbsp;&nbsp;&nbsp;
                <runtimeSelector @transferRuntime="getRuntime"></runtimeSelector>
            </h2>
            <div>
                <p>名称：{{runtime.name}}</p>
                <p>CPU：{{runtime.cpu}}</p>
                <p>节点个数：{{runtime.nodenum}}</p>
            </div>
            <br>
            <h2>测试问题：&nbsp;&nbsp;&nbsp;
                <problemSelector @transferProblem="getProblem"></problemSelector>
            </h2>
            <div>
                <p>名称：{{problem.name}}</p>
                <p>描述：{{problem.desc}}</p>
            </div>
            <br>
            <h2>测试数据集：&nbsp;&nbsp;&nbsp;
                <datasetSelector :datasets=problem.datasets @transferDataset="getDataset"></datasetSelector>
            </h2>
            <div>
                <p>名称：{{dataset.name}}</p>
                <p>版本：{{dataset.version}}</p>
                <p>描述：{{dataset.desc}}</p>
                <p>生成方法：{{dataset.gen}}</p>
            </div>
            <br>
            <!-- <div>
                    <Button type="primary">确认</Button>
                </div> -->
            <br>
            <hr>
            <br>
            <h2>测试结果：&nbsp;&nbsp;&nbsp;
                <Button type="primary" @click="searchTest">搜索</Button>
            </h2>
            <br>
            <div>
                <Table :columns="columns" :data="tests"></Table>
            </div>
            <br>
            <Button type="primary" @click="clickNewTest">添加测试</Button>
            <Modal v-model="newtestModal" title="添加测试" width="720" @on-ok="addTest">
                <p><strong>负责人：</strong></p>
                <Input v-model="newtest.leader"></Input>
                <p><strong>总时间(秒)：</strong></p>
                <Input v-model="newtest.result"></Input>
                <ul>
                <li v-for="cm in newtest.cms">
                    <p>{{cm.name}}(权重:{{cm.weight}})</p>
                    <Input v-model=cm.result>
                    </Input>
                </li>
                </ul>
                <p><strong>备注：</strong></p>
                <Input v-model="newtest.remark"></Input>
            </Modal>
        </i-col>
    </Row>
</template>
<script>
import amSelector from "../components/amselector"
import configEditor from "../components/configeditor"
import runtimeSelector from "../components/runtimeselector"
import problemSelector from "../components/problemselector"
import datasetSelector from "../components/datasetselector"
export default {
    data() {
        return {
            newtestModal:false,
            newtest:{
                leader:'',
                result:'',
                time:'',
                remark:'',
                cms:[]
            },
            cur: {
                name: '未选择',
                leader: '',
                version: '',
                date: '',
                configs: [],
                cms:[],
                subconfigs:[]
            },
            runtime: {
                name: '未选择',
                cpu: '',
                nodenum: ''
            },
            problem: {
                name: '未选择',
                desc: '',
                datasets: []
            },
            dataset: {
                name: '未选择',
                version: '',
                desc: '',
                gen: ''
            },
            configs: [],
            subConfigs:[],
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
                },
                {
                    title: '备注',
                    key: 'remark'
                }
            ],
            tests: [
            ]
        }
    },
    methods: {
        sayhello() {
            console.log(this.formItem.configs);
            this.$ajax({
                method: 'get',
                url: '/api'
            }).then(function(response) {
                console.log(response);
            });
        },
        // getConfigs(msg) {
        //     this.formItem.configs = msg;
        // },
        getAM(msg) {
            // this.cur = msg;
            this.$set(this.$data, 'cur', msg);
            console.log(msg);
        },
        getRuntime(msg) {
            this.runtime = msg;
            console.log(msg);
        },
        getConfigs(msg) {
            this.configs = msg;
            console.log(msg);
        },
        getSubConfigs(msg){
            this.subConfigs = msg;
            console.log(msg);
        },
        getProblem(msg) {
            this.problem = msg;
            console.log(msg);
        },
        getDataset(msg) {
            this.dataset = msg;
            console.log(msg);
            console.log("assemple dataset");
            console.log(this.assempleInfo());
        },
        assempleInfo() {
            var info = {};
            info.am = this.cur;
            info.runtime = this.runtime;
            info.problem = this.problem;
            // info.configs = this.configs;
            info.dataset = this.dataset;

            info.am.id = this.cur._id;
            info.runtime.id = this.runtime._id;
            info.problem.id = this.problem._id;
            info.dataset.id = this.dataset._id;

            info.configs = {};
            for (var i in this.configs) {
                var c = this.configs[i];
                info.configs[c.name] = c.value;
            }
            info.subconfigs = {};
            for (var i in this.subConfigs) {
                var c = this.subConfigs[i];
                info.subconfigs[c.name] = c.value;
            }
            return info;
        },
        searchTest() {
            var myinfo = this.assempleInfo();
            console.log("info");
            console.log(myinfo);
            var self = this;
            // what?
            this.newtest.cms = this.cur.cms;
            this.newtest.cms.map(cm=>{
                this.$set(cm, 'result', 0);
            });
            //
            this.$ajax({
                    method:'post',
                    url:'/api/getamtest',
                    data:myinfo
                }).then(function(response){
                    console.log("this is response");
                    console.log(response);
                    console.log(response.data);
                    self.tests = response.data;
                });
        },
        addTest(){
            // console.log(this.newtest);
            // console.log(this.formItem);
            console.log("in test");
            var myinfo = this.assempleInfo();
            this.newtest.time = Date();
            var self = this;

                this.$ajax({
                    method:'post',
                    url:'/api/addamtest',
                    data:{info:myinfo, newtest:this.newtest}
                }).then(function(response){
                    console.log("this is response");
                    console.log(response);
                    self.newtest.result = '';
                    self.newtest.remark = '';
                    self.searchTest();
                });


            // var info = this.assempleInfo();
            // console.log(info);
        },
        clickNewTest(){
            this.newtestModal=true;
            this.newtest.cms = this.cur.cms;
            this.newtest.cms.map(cm=>{
                this.$set(cm, 'result', 0);
            });
        }

    },
    components: {
        amSelector, configEditor, runtimeSelector, problemSelector, datasetSelector
    }
}
</script>