<template>
    <Row>
        <Col span="20" offset="2">
        <searchbar></searchbar>
        <br>
        <Table :columns="columns" :data="data"></Table>
        <br>
        <Page :current="1" :total="50" simple align="center"></Page>
        </Col>
        
    <Modal
            v-model="modal1"
            title="查看算法"
            width="720"
        >
            <p><strong>名称: </strong>{{cur.name}}</p>
            <p><strong>编号：</strong>{{cur._id}}</p>
            <p><strong>描述：</strong>{{cur.desc}}</p>
            <p><strong>负责人: </strong>{{cur.leader}}</p>
            <p><strong>版本: </strong>{{cur.version}}</p>
            <p><strong>创建日期: </strong>{{cur.date | formatDate}}</p>
            <p><strong>可配置项: </strong></p>
            <Table size="small" :columns="configColumns" :data="cur.configs"></Table>
            <p><strong>关联的计算模式: </strong></p>
            <Table size="small" :columns="cmsColumns" :data="cur.cms"></Table>
            <p><strong>计算模式的配置: </strong></p>
            <Table size="small" :columns="subConfigsColumns" :data="cur.subconfigs"></Table>

        </Modal>
    </Row>
</template>
<script>
    import searchbar from "../components/searchbar" 
    export default {
        data () {
            return {
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
                        title: '版本',
                        key: 'version'
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
                                            // alert(this.data[params.index]);
                                            this.cur = this.data[params.index];
                                            this.modal1 = true;
                                            // console.log(this.cur);
                                            // console.log(this.data.cur);
                                            // console.log(this.data.modal1);
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
                modal1:false,
                cur:{
                    name: 'CM3',
                    _id: 3,
                    desc: 'xxxxx',
                    configs: []
                },
                configColumns:[{
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '范围',
                        key: 'range'
                    }],
                cmsColumns:[{
                    title:'名称',
                    key:'name'
                },
                {
                    title:'编号',
                    key:'id'
                },
                {
                    title:'权重',
                    key:'weight'
                }],
                subConfigsColumns:[{
                    title:'名称',
                    key:'name'
                },
                {
                    title:'范围',
                    key:'range'
                },
                {
                    title:'取值',
                    key:'value'
                }]

            }
        },
        methods:{
            
        },
        components:{
            searchbar
        },
        created:function(){
            var self = this;
            this.$ajax({
                method:'get',
                url:'/api/getam'
            }).then(function(response){
                console.log(response);
                self.data = response.data;
                console.log(self.data);
                // this.data = response.data;
            });
        },
        filters:{
            formatDate(time){
                // console.log(time);
                return String(time).substring(0, 10);
                //此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
            }
        }
    }
</script>