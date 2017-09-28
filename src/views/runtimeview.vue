<template>
    <Row>
        <Col span="20" offset="2">
        <h1 align="center">查看硬件环境</h1>
        <Input v-model="searchValue">
            <span slot="prepend">硬件环境</span>
            <Button slot="append" icon="ios-search"></Button>
        </Input>
        <br>
        <Table :columns="columns" :data="data"></Table>
        <br>
        <Page :current="1" :total="50" simple align="center"></Page>
        </Col>
    </Row>
</template>
<script>
    // import searchbar from "../components/searchbar" 
    export default {
        data () {
            return {
                searchValue:'',
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
                                            alert(this.data[params.index]);
                                            // this.cur = this.data[params.index];
                                            // this.modal1 = true;
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

            }
        },
        methods:{
            
        },
        components:{
        },
        created:function(){
            var self = this;
            this.$ajax({
                method:'get',
                url:'/api/getruntime'
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