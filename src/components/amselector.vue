<style scoped>
    .inline-div{
        display: inline;
    }
</style>

<template>
    <div class="inline-div">
        <Button type="primary" @click="selectModal = true">选择算法模式</Button>
        <Modal 
            v-model="selectModal" title="选择算法模式" width="700">
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
import amExpand from "./amexpand"
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
                            return h(amExpand, {
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
        amExpand, searchbar
    },
    created:function(){
        var self = this;
        this.$ajax({
            method:'get',
            url:'/api/getam'
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
                console.log("emit am");
                this.$emit('transferAM', this.cur);
            }
        }
}
</script>