<template>
    <Row>
        <i-col span='18' offset='2'>
            <div>
                <h1 align="center">添加硬件环境</h1>
                <br />
            </div>
            <!-- <searchbar></searchbar> -->
    <Form :model="formItem" :label-width="120">
        <Form-item label="型号">
            <Input v-model="formItem.name" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="描述">
            <Input v-model="formItem.desc" type="textarea" :autosize="{minRows: 2}" placeholder="请输入..."></Input>
        </Form-item>
        <Form-item label="CPU">
            <Input v-model="formItem.cpu" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="节点个数">
            <Input v-model="formItem.nodenum" placeholder="请输入"></Input>
        </Form-item>
        <Form-item>
            <Button type="primary" v-on:click="createruntime">提交</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
        </Form-item>
    </Form>
    </i-col>
    </Row>
</template>
<script>
    // import searchbar from "../components/searchbar" 
    // import newconfig from "../components/newconfig"
    export default {
        data () {
            return {
                formItem: {
                    name: '',
                    desc: '',
                    cpu:'',
                    nodenum:''
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
            createruntime(){
                console.log(this.formItem);
                var self = this;
                this.$ajax({
                    method:'post',
                    url:'/api/createruntime',
                    data:this.formItem
                }).then(function(response){
                    console.log(response);
                    self.$Message.info(response.data);
                });
            },
            getConfigs(msg){
                // this.formItem.configs = msg;
            }
        },
        components:{
            // searchbar, newconfig
        }
    }
</script>