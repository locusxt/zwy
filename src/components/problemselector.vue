<style scoped>
    .inline-div{
        display: inline;
    }
</style>

<template>
    <div class="inline-div">
        <Button type="primary" @click="problemModal = true">选择测试问题</Button>
        <Modal 
            v-model="problemModal" title="选择测试问题" width="700">
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
// import cmExpand from "./cmexpand"
export default {
    data() {
        return {
            value: '',
            problemModal:false,
            cur:{},
            columns: [
                {
                        title: '名称',
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
                                            this.emit();
                                            this.problemModal = false;
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
    created:function(){
        var self = this;
        this.$ajax({
            method:'get',
            url:'/api/getdataset'
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
                console.log("emit problem");
                this.$emit('transferProblem', this.cur);
                console.log(this.cur);
            }
        }
}
</script>