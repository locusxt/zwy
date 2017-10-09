<style scoped>
    .inline-div{
        display: inline;
    }
</style>

<template>
    <div class="inline-div">
        <Button type="primary" @click="selectRuntimeModal = true">选择运行环境</Button>
        <Modal 
            v-model="selectRuntimeModal" title="选择运行环境" width="700">
            <searchbar></searchbar>
            <br>
            <Table :columns="columns" :data="data"></Table>
            <br>
            <Page :current="1" :total="50" simple align="center"></Page>
        </Modal>   
    </div>
</template>
<script>
import searchbar from "./searchbar" 
import runtimeExpand from "./runtimeexpand"
export default {
    data() {
        return {
            value: '',
            selectRuntimeModal:false,
            cur:{},
            columns: [{
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(runtimeExpand, {
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
                                            this.emit();
                                            this.selectRuntimeModal = false;
                                        }
                                    }
                                }, '选择'),
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
                ]
        }
    },
    components:{
        runtimeExpand, searchbar
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
    methods: {
            ok (){
                
            },
            emit(){
                console.log("emit runtime");
                this.$emit('transferRuntime', this.cur);
            }
        }
}
</script>