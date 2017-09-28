<template>
    <Row>
        <Col span="20" offset="2">
        <searchbar></searchbar>
        <br>
        <Table :columns="columns" :data="data"></Table>
        <br>
        <Page :current="1" :total="50" simple align="center"></Page>
        </Col>
    </Row>
</template>
<script>
    import searchbar from "../components/searchbar" 
    export default {
        data () {
            return {
                columns: [
                    {
                        title: '型号',
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
                    {
                        name: 'CM0',
                        _id: 0,
                        desc: 'xxx'
                    },
                    {
                        name: 'CM1',
                        _id: 1,
                        desc: 'xxxx'
                    },
                    {
                        name: 'CM2',
                        _id: 2,
                        desc: 'xxxx'
                    },
                    {
                        name: 'CM3',
                        _id: 3,
                        desc: 'xxxxx'
                    }
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
                url:'/api/test1'
            }).then(function(response){
                console.log(response);
                console.log(self.data);
                self.data = response.data;
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