<template>
    <Row>
        <Col span="20" offset="2">
        <h1 align="center">查看测试问题</h1>
        <Input v-model="searchValue">
            <span slot="prepend">测试问题</span>
            <Button slot="append" icon="ios-search"></Button>
        </Input>
        <br>
        <Table :columns="columns" :data="data"></Table>
        <br>
        <Page :current="1" :total="50" simple align="center"></Page>
        </Col>
        <Modal
            v-model="testmodal"
            title="查看测试问题"
            width="720"
        >
            <p><strong>名称: </strong>{{cur.name}}</p>
            <p><strong>编号：</strong>{{cur._id}}</p>
            <p><strong>描述：</strong>{{cur.desc}}</p>
            <p><strong>测试数据集: </strong></p>
            <Table size="small" :columns="datasetsColumns" :data="cur.datasets"></Table>

        </Modal>
    </Row>
</template>
<script>
    import datasetExpand from "../components/datasetexpand" 
    export default {
        data () {
            return {
                testmodal:false,
                searchValue:'',
                cur:{
                    name:'',
                    _id:'',
                    desc:'',
                    datasets:[]
                },
                columns: [
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '编号',
                        key: '_id'
                    },
                    {
                        title: '描述',
                        key: 'desc'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render:(h, params)=>{
                            return h('div', [
                                h('Button', {
                                    props:{
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style:{
                                        marginRight: '5px'
                                    },
                                    on:{
                                        click:()=>{
                                            console.log(this.data[params.index]);
                                            // alert(this.data[params.index]);
                                            this.cur = this.data[params.index];
                                            this.testmodal = true;
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props:{
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on:{
                                        click:()=>{
                                            this.data.splice(params.index, 1)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                data: [
                ],
                datasetsColumns:[{
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(datasetExpand, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '编号',
                        key: '_id'
                    },
                    {
                        title: '版本',
                        key: 'version'
                    }
                ]

            }
        },
        methods:{
            
        },
        components:{
            // runtimeExpand
            datasetExpand
        },
        created:function(){
            var self = this;
            this.$ajax({
                method:'get',
                url:'/api/getdataset'
            }).then(function(response){
                console.log(response);
                console.log(self.data);
                self.data = response.data;
                // this.data = response.data;
            });
        },
        filters:{
        }
    }
</script>