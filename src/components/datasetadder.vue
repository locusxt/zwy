<style scoped>
    .inline-div{
        display: inline;
    }
</style>

<template>
    <div class="inline-div">
        <Table :columns="columns" :data="data"></Table>
        <Button type="primary" @click="datasetModal=true" >添加测试数据集</Button>
        <Modal 
            v-model="datasetModal" title="添加测试数据集" width="700" @on-ok="ok">
            <Form :model="formItem" :label-width="120">
                <Form-item label="名称">
                    <Input v-model="formItem.name" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="版本号">
                    <Input v-model="formItem.version" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="描述">
                    <Input v-model="formItem.desc" type="textarea" :autosize="{minRows: 2}" placeholder="请输入..."></Input>
                </Form-item>
                <Form-item label="生成方法">
                    <Input v-model="formItem.gen" type="textarea" :autosize="{minRows: 2}" placeholder="请输入..."></Input>
                </Form-item>
            </Form>
        </Modal>   
    </div>
</template>
<script>
import datasetExpand from "./datasetexpand";
export default {
    data() {
        return {
            formItem: {
                name: '',
                version: '',
                desc: '',
                gen:''
            },
            datasetModal:false,
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
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on:{
                                        click:()=>{
                                            this.data.splice(params.index, 1);
                                            this.emit();
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
        datasetExpand
    },
    methods: {
            ok (){
                this.data.push(this.formItem);
                this.emit();
                // console.log(this.data);
                this.formItem = {
                    name: '',
                    version: '',
                    desc: '',
                    gen:''
                };
            },
            emit(){
                console.log("emit dataset");
                this.$emit('transferDataset', this.data);
            }
        }
}
</script>