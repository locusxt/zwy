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
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '编号',
                        key: 'id'
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
                                            alert(this.data[params.index].name)
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
                        id: 0,
                        desc: 'xxx'
                    },
                    {
                        name: 'CM1',
                        id: 1,
                        desc: 'xxxx'
                    },
                    {
                        name: 'CM2',
                        id: 2,
                        desc: 'xxxx'
                    },
                    {
                        name: 'CM3',
                        id: 3,
                        desc: 'xxxxx'
                    }
                ]
            }
        },
        methods:{
            
        },
        components:{
            searchbar
        }
    }
</script>