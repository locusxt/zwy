<template>
<div>
    <p>
        <Table :columns="columns" :data="data"></Table>
        <!-- {{ value }} -->
    </p>
    <p>
        <Button @click="modal1=true">添加可配置项</Button>
        <Modal
        v-model="modal1"
        title="添加新的可配置项"
        @on-ok="ok"
    >
        <p>名称：</p>
        <Input v-model="newdata.name"></Input>
        <p>范围：</p>
        <Input v-model="newdata.range"></Input>

    </Modal>
    </p>
    
</div>    
</template>
<script>
    export default {
        data () {
            return {
                modal1: false,
                newdata:{
                    name:'',
                    range:''
                },
                columns: [
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '范围',
                        key: 'range'
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
        methods: {
            ok (){
                // console.log(this.newdata);
                this.data.push(this.newdata);
                this.emit();
                this.newdata = {
                    name:'',
                    range:''
                };
            },
            emit(){
                this.$emit('transferConfig', this.data);
            }
        }
    }
</script>
