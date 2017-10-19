<style scoped>
@import '/static/css/joint.min.css';






/* #stencil,
#myholder {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: auto;
} */
</style>

<template>
    <Row>
        <Col span='22' offset='1'>
        <div id="base">
            <h1 align="center">新建应用软件流程</h1>
            <br>
            <br>
            <div id="testdiv">
                <Row>
                    <Col span='3'>
                    <div id="stencil" style="border:1px solid;"></div>
                    </Col>
                    <Col span='15'>
                    <div id="myholder" style="border:1px solid"></div>
                    </Col>
                    <Col span='6'>
                    <Card>
                        <Tabs value="name1">
                            <TabPane label="属性" name="name1">
                                <div v-if="selected!=undefined">
                                    <p>
                                        <strong>编号：</strong>{{selected.id}}</p>
                                    <p>
                                        <strong>类型：</strong>{{selected.type}}</p>
                                    <div v-if="selected.type=='AM' && configs[selected.id]!=undefined">
                                        <p>
                                            <strong>预计运行次数：</strong>
                                        </p>
                                        <Input v-model="configs[selected.id].loopnum"></Input>
                                        <p>
                                            <strong>算法模式：
                                                <amSelector @transferAM='getAM'></amSelector>
                                            </strong>
                                        </p>
                                        <div v-if="configs[selected.id].am != undefined">
                                            <p>名称：{{configs[selected.id].am.name}}</p>
                                            <p>编号：{{configs[selected.id].am._id}}</p>
                                        </div>
                                    </div>
                                    <hr>
                                    <div v-if='this.selected.id != undefined'>
                                        <Button type="error" @click="deleteNode()">删除</Button>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane label="配置" name="name2">
                                <configEditor :configs="asp_configs" @transferConfigs="getConfigs"></configEditor>
                                <configEditor :configs="asp_subconfigs" @transferConfigs="getSubConfigs"></configEditor>
                            </TabPane>
                            <TabPane label="分析" name="name3">
                                <h2>运行环境：
                                    <runtimeSelector @transferRuntime="getRuntime"></runtimeSelector>
                                </h2>
                                <div>
                                    <p>名称：{{env.runtime.name}}</p>
                                    <p>CPU：{{env.runtime.cpu}}</p>
                                    <p>节点个数：{{env.runtime.nodenum}}</p>
                                </div>
                                <br>
                                <h2>测试问题：
                                    <problemSelector @transferProblem="getProblem"></problemSelector>
                                </h2>
                                <div>
                                    <p>名称：{{env.problem.name}}</p>
                                    <p>描述：{{env.problem.desc}}</p>
                                </div>
                                <br>
                                <h2>测试数据集：
                                    <datasetSelector :datasets=env.problem.datasets @transferDataset="getDataset"></datasetSelector>
                                </h2>
                                <div>
                                    <p>名称：{{env.dataset.name}}</p>
                                    <p>版本：{{env.dataset.version}}</p>
                                    <p>描述：{{env.dataset.desc}}</p>
                                    <p>生成方法：{{env.dataset.gen}}</p>
                                </div>
                                <hr>
                                <br>
                                <br>
                                <Button type='warning' @click='genReport'>生成分析报告</Button>
                            </TabPane>
                        </Tabs>

                    </Card>

                    </Col>
                </Row>
            </div>
        </div>
        </Col>
    </Row>
</template>
<script>
import amSelector from '../components/amselector'
import configEditor from '../components/configeditor'
import runtimeSelector from "../components/runtimeselector"
import problemSelector from "../components/problemselector"
import datasetSelector from "../components/datasetselector"
export default {
    data() {
        return {
            configs: {

            },
            selected: {
                model: {
                    id: ''
                }
            },
            graph: {

            },
            stencilGraph: {

            },
            stencilPaper: {

            },
            paper: {

            },
            asp_configs: [],
            asp_subconfigs: [],
            res_configs: {},
            res_subconfigs: {},
            env:{
                runtime:{},
                problem:{},
                dataset:{}
            }
        }
    },
    methods: {
        test() {
            console.log('test');
        },
        sayhello() {
            console.log(this.formItem.configs);
            this.$ajax({
                method: 'get',
                url: '/api'
            }).then(function(response) {
                console.log(response);
            });
        },
        createDataset() {
            console.log(this.formItem);
            this.$ajax({
                method: 'post',
                url: '/api/createdataset',
                data: this.formItem
            }).then(function(response) {
                console.log(response);
            });
        },
        getAM(msg) {
            var id = this.selected.id;
            this.$set(this.configs[id], 'am', msg);
            var cell = this.graph.getCell(id);
            cell.attr('text/text', msg.name);
            this.assempleConfigs();
            // this.configs[this.selected.id].am = msg;
            console.log(msg);
        },
        deleteNode() {
            if (this.selected != undefined) {
                var id = this.selected.id;
                var cell = this.graph.getCell(id);
                cell.remove();
                this.selected = undefined;
                console.log('delete node');
            }
        },
        configs2arr(cfgs) {
            var res = [];
            for (var i in cfgs) {
                res.push({
                    name: i,
                    range: cfgs[i].range,
                    value: cfgs[i].value
                });
            }
            return res;
        },
        arr2configs(arr) {
            var res = {};
            for (var i in arr) {
                res[arr[i].name] = {};
                var tmp = res[arr[i].name];
                tmp.range = arr[i].range;
                tmp.value = arr[i].value;
            }
            console.log(res);
            return res;

        },
        getAllAMs() {
            var res = [];
            var cells = this.graph.getCells();
            for (var i in cells) {
                var cell = cells[i];
                var cellType = cell.attributes.type;
                if (cellType == "AM") {
                    res.push(cell);
                }
            }
            return res;
        },
        assempleAMs(){//获取所有AM的信息，允许重复
            var res =[]
            var ams = this.getAllAMs();
            for (var i in ams) {
                var cell = ams[i];
                var cellId = cell.id;
                var id = this.configs[cellId].am._id;
                var loopn = this.configs[cellId].loopnum;
                res.push({
                    amid:id,
                    loopnum:loopn
                })
            }
            return res;
        },
        assempleConfigs() {
            var ams = this.getAllAMs();
            var asp_configs = {};
            var asp_subconfigs = {};
            for (var i in ams) {
                var cell = ams[i];
                var cellId = cell.id;
                var cellConfigs = this.configs[cellId].am.configs;
                for (var k in cellConfigs) {
                    var c = cellConfigs[k];
                    if (asp_configs[c.name] == undefined && (c.value == undefined || c.value == '')) {
                        asp_configs[c.name] = {
                            range: c.range,
                            value: ''
                        }
                    }
                }

                var cellSubConfigs = this.configs[cellId].am.subconfigs;
                for (var k in cellSubConfigs) {
                    var c = cellSubConfigs[k];
                    if (asp_subconfigs[c.name] == undefined && (c.value == undefined || c.value == '')) {
                        asp_subconfigs[c.name] = {
                            range: c.range,
                            value: ''
                        }
                    }
                }
            }
            console.log('asemple configs');
            console.log(asp_configs);
            console.log(asp_subconfigs);
            this.asp_configs = this.configs2arr(asp_configs);
            this.asp_subconfigs = this.configs2arr(asp_subconfigs);
        },
        getConfigs(msg) {
            console.log("get configs");
            console.log(msg);
            this.res_configs = this.arr2configs(msg);
        },

        getSubConfigs(msg) {
            console.log("get subconfigs");
            console.log(msg);
            this.res_subconfigs = this.arr2configs(msg);
        },
        getRuntime(msg) {
            this.env.runtime = msg;
            // console.log(msg);
        },
        getProblem(msg) {
            this.env.problem = msg;
            // console.log(msg);
        },
        getDataset(msg) {
            this.env.dataset = msg;
            // console.log(msg);
            // console.log("assemple dataset");
            // console.log(this.assempleInfo());
        },
        genReport(){
            var info ={};
            info.configs = this.res_configs;
            info.subconfigs = this.res_subconfigs;
            info.env = {
                runtimeid :this.env.runtime._id,
                problemid :this.env.problem._id,
                datasetid :this.env.dataset._id
            };
            info.ams = this.assempleAMs();
            console.log('report');
            console.log(info);
            this.$ajax({
                    method:'post',
                    url:'/api/genreport',
                    data:info
                }).then(function(response){
                    console.log("this is report response");
                    console.log(response);
                    // self.newtest.result = '';
                    // self.newtest.remark = '';
                    // self.searchTest();
                });
        }
    },
    components: {
        amSelector, configEditor, runtimeSelector, problemSelector, datasetSelector
    },
    mounted() {
        // console.log('test a');
        // console.log($('#myholder'));
        // console.log('test b');

        var self = this;
        this.graph = new joint.dia.Graph;
        // var graph = this.graph;


        this.stencilGraph = new joint.dia.Graph,
            this.stencilPaper = new joint.dia.Paper({
                el: $('#stencil'),
                // width: $('#stencil').width(),
                width: 125,
                height: 400,
                model: self.stencilGraph,
                interactive: false,

                background: {
                    color: '#FAEBD7'
                }
            });

        // var stencilGraph = this.stencilGraph;
        // var stencilPaper = this.stencilPaper;

        this.stencilPaper.on('cell:pointerdown', function(cellView, e, x, y) {
            $('#testdiv').append('<div id="flyPaper" style="position:fixed;z-index:100;opacity:.7;pointer-event:none;"></div>');
            var flyGraph = new joint.dia.Graph,
                flyPaper = new joint.dia.Paper({
                    el: $('#flyPaper'),
                    model: flyGraph,
                    interactive: false
                }),
                flyShape = cellView.model.clone(),
                pos = cellView.model.position(),
                offset = {
                    x: x - pos.x,
                    y: y - pos.y
                };

            flyShape.position(0, 0);
            flyGraph.addCell(flyShape);
            $("#flyPaper").offset({
                left: e.pageX - offset.x,
                top: e.pageY - offset.y
            });
            $('#testdiv').on('mousemove.fly', function(e) {
                $("#flyPaper").offset({
                    left: e.pageX - offset.x,
                    top: e.pageY - offset.y
                });
            });
            $('#testdiv').on('mouseup.fly', function(e) {
                var x = e.pageX,
                    y = e.pageY,
                    target = self.paper.$el.offset();

                // Dropped over paper ?
                if (x > target.left && x < target.left + self.paper.$el.width() && y > target.top && y < target.top + self.paper.$el.height()) {
                    var s = flyShape.clone();
                    s.position(x - target.left - offset.x, y - target.top - offset.y);
                    self.graph.addCell(s);
                    console.log(self.graph.toJSON());
                }
                $('#testdiv').off('mousemove.fly').off('mouseup.fly');
                flyShape.remove();
                $('#flyPaper').remove();
            });
        });

        this.paper = new joint.dia.Paper({
            el: $('#myholder'),
            width: $('#myholder').width(),
            height: 1000,
            model: self.graph,
            gridSize: 5,
            background: {
                color: '#F0F8FF'
            },
            highlighting: {
                'default': {
                    name: 'stroke',
                    options: {
                        padding: 5,
                        rx: 3,
                        ry: 3,
                        attrs: {
                            'stroke-width': 3,
                            stroke: '#C390D4'
                        }
                    }
                }
            },
            validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                // Prevent linking from input ports.
                if (magnetS && magnetS.getAttribute('port-group') === 'in') return false;
                // Prevent linking from output ports to input ports within one element.
                if (cellViewS === cellViewT) return false;
                // Prevent linking to input ports.
                return magnetT && magnetT.getAttribute('port-group') === 'in' && magnetS != magnetT;
            },
            validateMagnet: function(cellView, magnet) {
                // Note that this is the default behaviour. Just showing it here for reference.
                // Disable linking interaction for magnets marked as passive (see below `.inPorts circle`).
                return magnet.getAttribute('magnet') !== 'passive';
            },
            defaultLink: new joint.shapes.devs.Link({
                attrs: {
                    '.marker-target': {
                        d: 'M 10 0 L 0 5 L 10 10 z'
                    }
                }
            })
        });

        // var paper = this.paper;

        function isLinkInvalid(link) {
            return (!link.prop('source/id') || !link.prop('target/id'));
        }

        this.paper.on('cell:pointerup', function(cellView) {
            if (!(cellView.model instanceof joint.dia.Link)) return; // if it's not a link, don't worry about it
            // otherwise, add an event listener to it.  
            // cellView.model.on('batch:stop', function(){
            var links = self.graph.getLinks();
            links.forEach(function(link) {
                if (isLinkInvalid(link)) {
                    link.remove();
                }
            });
            // });
        });

        // var highlightedCellViews = [];
        var highlighted;
        // var self = this;
        this.paper.on('cell:pointerclick', function(cellView) {
            if (highlighted != undefined) {
                self.selected = undefined;
                highlighted.unhighlight();
            }
            cellView.highlight();
            highlighted = cellView;
            // console.log(self.selected.model.attributes.attrs[".label"].text);
            // self.selected.model.attributes.attrs[".label"].text = "123";
            //以下是选中的时候会发生的事情
            self.selected = {};//selected的内容不与highlighted绑定在一起

            var cellId = highlighted.model.id;
            // self.selected.id = cellId;
            self.$set(self.selected, 'id', cellId);
            var cell = self.graph.getCell(self.selected.id);
            var cellType = cell.attributes.type;
            self.selected.type = cellType;
            if (cellType == "AM" && self.configs[cellId] == undefined) {
                // self.configs[cellId] = {
                //     loopnum:0,
                //     name:'',
                //     id:'',
                //     subconfigs:[]
                // }
                self.$set(self.configs, cellId, {
                    loopnum: 1,
                    name: '',
                    id: '',
                    subconfigs: [],
                    am: {
                        configs: [],
                        subconfigs: []
                    }
                });
            }
            // console.log(self.selected);
            // console.log(cellType);
            // console.log(cell.isElement());

            // console.log(self.graph.getCells());
            // graph.getCells()[0].attr('text/text', "Fire incident changed");
            // self.selected.attr('text/text', "Fire incident changed");
            // this.selected.model.label(0, { attrs: { text: { text: 'new label' } } });
            // this.selected.model.
        });

        this.paper.on('blank:pointerclick', function(cellView) {
            if (highlighted != undefined)
                highlighted.unhighlight();
            highlighted = undefined;
            self.selected = undefined;
        });

        var am = new joint.shapes.devs.Model({
            position: { x: 25, y: 25 },
            size: { width: 70, height: 60 },
            inPorts: ['in'],
            outPorts: ['out'],
            type: 'AM',
            ports: {
                groups: {
                    'in': {
                        attrs: {
                            '.port-body': {
                                fill: '#16A085',
                                magnet: 'passive'
                            }
                        },
                        position: 'top'
                    },
                    'out': {
                        attrs: {
                            '.port-body': {
                                fill: '#E74C3C'
                            }
                        },
                        position: 'bottom'
                    }
                }
            },
            attrs: {
                '.label': { text: '算法模式', 'ref-x': .5, 'ref-y': .4 },
                rect: { fill: '#2ECC71' }
            }
        });

        this.stencilGraph.addCells([am]);
        console.log(self.graph.toJSON());


        //resize paper
        $('#base').onresize = function(event) {
            console.log('...window resize');
            self.paper.setDimensions($('#myholder').width());
            // paper.scaleContentToFit({minScaleX: 0, minScaleY: 0, maxScaleX: 1 , maxScaleY: 1});
            // self.stencilPaper.setDimensions($('#stencil').width());
            // stencilPaper.scaleContentToFit({minScaleX: 0, minScaleY: 0, maxScaleX: 1 , maxScaleY: 1});
        };

        joint.shapes.devs.CircleModel = joint.shapes.devs.Model.extend({
            markup: '<g class="rotatable"><g class="scalable"><circle class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
            // portMarkup: '<g class="port port' + ['<','%','='].join('') + ' id =>"><rect class="port-body"/><text class="port-label"/></g>',
            defaults: joint.util.deepSupplement({
                type: 'devs.CircleModel',
                attrs: {
                    '.body': { r: 50, cx: 50, cy: 50, stroke: 'blue', fill: 'lightblue' },
                    '.label': { text: 'Circle Model', 'ref-y': 0.5, 'y-alignment': 'middle' },
                    // '.port-body': { width: 10, height: 10, x: -5, stroke: 'gray', fill: 'lightgray', magnet: 'active' }
                }
            }, joint.shapes.devs.Model.prototype.defaults)
        });

        joint.shapes.devs.CircleModelView = joint.shapes.devs.ModelView;

        var startModel = new joint.shapes.devs.CircleModel({
            position: {
                x: 25,
                y: 100
            },
            size: {
                width: 70,
                height: 70
            },
            // inPorts: ['in'],
            outPorts: ['out'],
            type: 'Start',
            ports: {
                groups: {
                    'in': {
                        attrs: {
                            '.port-body': {
                                fill: '#16A085',
                                magnet: 'passive',
                            }
                        },
                        position: 'top'
                    },
                    'out': {
                        attrs: {
                            '.port-body': {
                                fill: '#E74C3C'
                            }
                        },
                        position: 'bottom'
                    }
                }
            },
            attrs: {
                // '.body': { r: 50, cx: 50, cy:50, stroke: 'blue', fill: 'lightblue' },
                '.label': { text: '开始', 'ref-y': 0.5, 'y-alignment': 'middle' }
                // '.port-body': { width: 10, height: 10, x: -5, stroke: 'gray', fill: 'lightgray', magnet: 'active' }
            }
        });


        self.stencilGraph.addCells([startModel]);

        var endModel = new joint.shapes.devs.CircleModel({
            position: {
                x: 25,
                y: 200
            },
            size: {
                width: 70,
                height: 70
            },
            inPorts: ['in'],
            // outPorts: ['out'],
            type: 'End',
            ports: {
                groups: {
                    'in': {
                        attrs: {
                            '.port-body': {
                                fill: '#16A085',
                                magnet: 'passive',
                            }
                        },
                        position: 'top'
                    },
                    'out': {
                        attrs: {
                            '.port-body': {
                                fill: '#E74C3C'
                            }
                        },
                        position: 'bottom'
                    }
                }
            },
            attrs: {
                // '.body': { r: 50, cx: 50, cy:50, stroke: 'blue', fill: 'lightblue' },
                '.label': { text: '结束', 'ref-y': 0.5, 'y-alignment': 'middle' }
                // '.port-body': { width: 10, height: 10, x: -5, stroke: 'gray', fill: 'lightgray', magnet: 'active' }
            }
        });
        self.stencilGraph.addCells([endModel]);

        var branch = new joint.shapes.devs.Model({
            position: { x: 25, y: 300 },
            size: { width: 71, height: 71 },
            type: 'Branch',
            inPorts: ['in'],
            outPorts: ['out'],
            ports: {
                groups: {
                    'in': {
                        attrs: {
                            '.port-body': {
                                fill: '#16A085',
                                magnet: 'passive'
                            }
                        },
                        position: 'top'
                    },
                    'out': {
                        attrs: {
                            '.port-body': {
                                fill: '#E74C3C'
                            }
                        },
                        position: 'bottom'
                    }
                }
            },
            attrs: {
                '.label': { text: '分支', 'ref-x': .5, 'ref-y': .4 },
                rect: { fill: '#FFA07A', transform: 'rotate(45, 35.5, 35.5), scale' },
            }
        });


        self.stencilGraph.addCells([branch]);
    }
}
</script>