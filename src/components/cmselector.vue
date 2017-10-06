<style scoped>
    .inline-div{
        display: inline;
    }
</style>

<template>
    <div class="inline-div">
        <Button type="primary" @click="selectModal = true">选择计算模式</Button>
        <Modal 
            v-model="selectModal" title="选择计算模式" width="700">
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
import cmExpand from "./cmexpand"
export default {
    data() {
        return {
            value: '',
            selectModal:false,
            cur:{},
            columns: [{
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(cmExpand, {
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
                                            this.selectModal = false;
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
        cmExpand, searchbar
    },
    created:function(){
        var self = this;
        this.$ajax({
            method:'get',
            url:'/api/getcm'
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
                console.log("emit cm");
                this.$emit('transferCM', this.cur);
            }
        }
}
</script>