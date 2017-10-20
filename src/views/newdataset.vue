<template>
    <Row>
        <i-col span='18' offset='2'>
            <div>
                <h1 align="center">新建测试问题</h1>
                <br />
            </div>
            <!-- <searchbar></searchbar> -->
    <Form :model="formItem" :label-width="120">
        <Form-item label="名称">
            <Input v-model="formItem.name" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="描述">
            <Input v-model="formItem.desc" type="textarea" :autosize="{minRows: 2}" placeholder="请输入..."></Input>
        </Form-item>
        <Form-item label="测试数据集">
            <datasetAdder @transferDataset="getDatasets"></datasetAdder>
            <div>

            </div>   
        </Form-item>
        <Form-item>
            <Button type="primary" v-on:click="createDataset">提交</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
        </Form-item>
    </Form>
    </i-col>
    </Row>
</template>
<script>
    import datasetAdder from "../components/datasetadder";
    export default {
        data () {
            return {
                formItem: {
                    name: '',
                    desc: '',
                    datasets:[]
                }
            }
        },
        methods:{
            sayhello(){
                console.log(this.formItem.configs);
                this.$ajax({
                    method:'get',
                    url:'/api'
                }).then(function(response){
                    console.log(response);
                });
            },
            createDataset(){
                console.log(this.formItem);
                var self = this;
                this.$ajax({
                    method:'post',
                    url:'/api/createdataset',
                    data:this.formItem
                }).then(function(response){
                    console.log(response);
                    self.$Message.info(response.data);
                });
            },
            getDatasets(msg){
                console.log(msg);
                this.formItem.datasets = msg;
            }
        },
        components:{
            datasetAdder
        }
    }
</script>