<template>
    <Row>
        <i-col span='18' offset='2'>
            <div>
                <h1 align="center">新建计算模式</h1>
                <br />
            </div>
            <!-- <searchbar></searchbar> -->
    <Form :model="formItem" :label-width="120">
        <Form-item label="名称">
            <Input v-model="formItem.name" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="版本号">
            <Input v-model="formItem.version" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="总负责人">
            <Input v-model="formItem.leader" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="描述">
            <Input v-model="formItem.desc" type="textarea" :autosize="{minRows: 2}" placeholder="请输入..."></Input>
        </Form-item>
        <Form-item label="创建日期">
            <Date-picker type="date" placeholder="选择日期" v-model="formItem.date"></Date-picker>
        </Form-item>
        <Form-item label="参考资料">
        <Upload
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或将文件拖拽到这里上传</p>
            </div>
        </Upload>
        </Form-item>
        <Form-item label="可配置项">
            <newconfig @transferConfig="getConfigs"></newconfig>
        </Form-item>
        <Form-item>
            <Button type="primary" v-on:click="createCM">提交</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
        </Form-item>
    </Form>
    </i-col>
    </Row>
</template>
<script>
    import searchbar from "../components/searchbar" 
    import newconfig from "../components/newconfig"
    export default {
        data () {
            return {
                formItem: {
                    name: '',
                    version: '',
                    desc: '',
                    leader:'',
                    date: '',
                    configs: []
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
            createCM(){
                console.log(this.formItem);
                this.$ajax({
                    method:'post',
                    url:'/api/createCM',
                    data:this.formItem
                }).then(function(response){
                    console.log(response);
                });
            },
            getConfigs(msg){
                this.formItem.configs = msg;
            }
        },
        components:{
            searchbar, newconfig
        }
    }
</script>