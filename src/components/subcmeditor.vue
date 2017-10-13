<template>
    <div>
        <p>
            <Table :columns="columns" :data="data"></Table>
            <!-- {{ value }} -->
        </p>
        <p>
            <cmSelector @transferCM="getCM"></cmSelector>

            <!-- <Button @click="cmmodal=true">添加计算模式</Button>
            <Modal
            v-model="cmmodal"
            title="添加关联的计算模式"
            @on-ok="ok"
        >
            <p>名称：<cmSelector @transferCM="getCM"></cmSelector></p>
            
            <p>范围：</p>
            <Input v-model="newcm.weight"></Input>

        </Modal> -->
        </p>

    </div>
</template>
<script>
import cmSelector from "../components/cmselector";
export default {
    data() {
        return {
            cmmodal: false,
            newcm: {
                id: '',
                weight: '',
                configs: []
            },
            columns: [
                {
                    title: '名称',
                    key: 'name'
                },
                {
                    title: '版本',
                    key: 'version'
                },
                {
                    title: '权重',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        var self = this;
                        return h('div', [
                            h('input', {
                                domProps: {
                                    value: self.data[params.index].weight
                                },
                                on: {
                                    input: function (event) {
                                        self.value = event.target.value
                                        self.$emit('input', event.target.value);
                                        self.data[params.index].weight = event.target.value;
                                        console.log(self.data);
                                    
                                    }
                                }
                            })
                        ])
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
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
        ok() {
            // console.log(this.newdata);
            this.data.push(this.newcm);
            this.emit();
            this.newdata = {
                id: '',
                weight: '',
                configs: []
            };
        },
        emit() {
            this.$emit('transferConfig', this.data);
        },
        getCM(msg) {
            this.newcm = msg;
            this.newcm.weight = 0;
            // console.log(msg);
            this.data.push(this.newcm);
        }
    },
    components: {
        cmSelector
    }
}
</script>
