<style scoped>
    .inline-div{
        display: inline;
    }
</style>

<template>
    <div class="inline-div">
        <Button type="primary" @click="datasetModal = true">选择测试数据集</Button>
        <Modal 
            v-model="datasetModal" title="选择测试数据集" width="700">
            <searchbar></searchbar>
            <br>
            <Table :columns="columns" :data="datasets"></Table>
            <br>
            <Page :current="1" :total="50" simple align="center"></Page>
        </Modal>   
    </div>
</template>
<script>
import searchbar from "./searchbar" 
// import cmExpand from "./cmexpand"
import datasetExpand from "../components/datasetexpand"
export default {
    props: {
            datasets:Array
    },
    data() {
        return {
            value: '',
            datasetModal:false,
            cur:{},
            columns: [{
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
                                            this.cur = this.datasets[params.index];
                                            this.emit();
                                            this.datasetModal = false;
                                        }
                                    }
                                }, '选择')
                            ])
                        }
                    }
                ],
                data: [
                ]
        }
    },
    components:{
        searchbar
    },
    // created:function(){
    //     var self = this;
    //     this.$ajax({
    //         method:'get',
    //         url:'/api/getdataset'
    //     }).then(function(response){
    //         console.log(response);
    //         console.log(self.data);
    //         self.data = response.data;
    //         // this.data = response.data;
    //     });
    // },
    methods: {
            ok (){
                
            },
            emit(){
                console.log("emit dataset");
                this.$emit('transferDataset', this.cur);
                console.log(this.cur);
            }
        }
}
</script>