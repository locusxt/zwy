<template>
    <div>
        <p>
            <Table :columns="columns" :data="data"></Table>
            <!-- {{ value }} -->
        </p>
        <p>
            <cmSelector @transferCM="getCM"></cmSelector>
        </p>
        <br>

        <p>
            <ul>
          <li v-for="c in subconfigs">
                  <Input @on-change="emit" v-model=c.value placeholder="请输入..." style="width: 600px">
                    <span slot="prepend">{{c.name}}({{c.range}})</span>
                  </Input>
                  <br>
          </li>
      </ul>
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
            ],
            subconfigs:[]
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
            //发送添加的cm id，和各cm占的权重，和cm的配置情况 
            //TODO
            this.$emit('transferConfig', this.data);
        },
        getCM(msg) {
            this.newcm = msg;
            this.newcm.weight = 0;
            // console.log(msg);
            this.data.push(this.newcm);
            this.updateSubConfigs();
            console.log(this.subconfigs);
        },
        subconfigs2arr(cfgs){
            var res = [];
            for (var i in cfgs){
                res.push({
                    name:i,
                    range:cfgs[i].range,
                    value:cfgs[i].value
                });
            }
            return res;
        },
        arr2subconfigs(arr){
            var res = {};
            for (var i in arr){
                res[arr[i].name] = {};
                var tmp = res[arr[i].name];
                tmp.range = arr[i].range;
                tmp.value = arr[i].value;
            }
            console.log(res);
            return res;

        },
        updateSubConfigs(){
            var original = this.arr2subconfigs(this.subconfigs);
            var res = {};
            for (var i in this.data){
                var d = this.data[i];
                for (var j in d.configs){
                    var c = d.configs[j];
                    var n = c.name;
                    if (res[n] != undefined)
                        continue;
                    
                    res[n] = {};
                    if(original[n] != undefined){
                        res[n] = original[n];
                        continue;
                    }
                    res[n].range = c.range;
                    res[n].value = '';
                }
            }
            this.subconfigs = this.subconfigs2arr(res);
            // console.log("arr2");
            // console.log(this.arr2subconfigs(this.subconfigs));
        }
    },
    components: {
        cmSelector
    }
}
</script>
