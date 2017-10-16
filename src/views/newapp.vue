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
        <Col span='18' offset='2'>
        <div>
            <h1 align="center">新建应用软件流程</h1>
            <br>
            <br>
            <div id="testdiv">
                <Row>
                    <Col span='4'>
                    <div id="stencil" style="border:1px solid"></div>
                    </Col>
                    <Col span='16'>
                    <div id="myholder" style="border:1px solid"></div>
                    </Col>

                </Row>
            </div>
        </div>
        </Col>
    </Row>
</template>
<script>
export default {
    data() {
        return {

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
        getConfigs(msg) {
            this.formItem.configs = msg;
        }
    },
    components: {

    },
    mounted() {
        // console.log('test a');
        // console.log($('#myholder'));
        // console.log('test b');
        let graph = new joint.dia.Graph;


        var stencilGraph = new joint.dia.Graph,
            stencilPaper = new joint.dia.Paper({
                el: $('#stencil'),
                width: $('#stencil').width(),
                height: 720,
                model: stencilGraph,
                interactive: false,

                background: {
                    color: '#FAEBD7'
                }
            });

        // var r1 = new joint.shapes.basic.Rect({
        //     position: {
        //         x: 10,
        //         y: 10
        //     },
        //     size: {
        //         width: 100,
        //         height: 40
        //     },
        //     attrs: {
        //         text: {
        //             text: 'Rect1'
        //         }
        //     }
        // });
        // var r2 = new joint.shapes.basic.Rect({
        //     position: {
        //         x: 120,
        //         y: 10
        //     },
        //     size: {
        //         width: 100,
        //         height: 40
        //     },
        //     attrs: {
        //         text: {
        //             text: 'Rect2'
        //         }
        //     }
        // });

        stencilPaper.on('cell:pointerdown', function(cellView, e, x, y) {
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
                    target = paper.$el.offset();

                // Dropped over paper ?
                if (x > target.left && x < target.left + paper.$el.width() && y > target.top && y < target.top + paper.$el.height()) {
                    var s = flyShape.clone();
                    s.position(x - target.left - offset.x, y - target.top - offset.y);
                    graph.addCell(s);
                    console.log(graph.toJSON());
                }
                $('#testdiv').off('mousemove.fly').off('mouseup.fly');
                flyShape.remove();
                $('#flyPaper').remove();
            });
        });

        let paper = new joint.dia.Paper({
            el: $('#myholder'),
            width: $('#myholder').width(),
            height: 1000,
            model: graph,
            gridSize: 10,
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

        function isLinkInvalid(link) {
            return (!link.prop('source/id') || !link.prop('target/id'));
        }

        paper.on('cell:pointerup', function(cellView) {
            if (!(cellView.model instanceof joint.dia.Link)) return; // if it's not a link, don't worry about it
            // otherwise, add an event listener to it.  
            // cellView.model.on('batch:stop', function(){
            var links = graph.getLinks();
            links.forEach(function(link) {
                if (isLinkInvalid(link)) {
                    link.remove();
                }
            });
            // });
        });

        var highlightedCellViews = [];
        var highlighted;
        paper.on('cell:pointerclick', function(cellView) {
            if (highlighted != undefined)
                highlighted.unhighlight();
            cellView.highlight();
            highlighted = cellView;
        });

        paper.on('blank:pointerclick', function(cellView) {
            if (highlighted != undefined)
                highlighted.unhighlight();
            highlighted = undefined;
        });

        var am = new joint.shapes.devs.Model({
            position: { x: 25, y: 25 },
            size: { width: 70, height: 60 },
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
                '.label': { text: '算法模式', 'ref-x': .5, 'ref-y': .4 },
                rect: { fill: '#2ECC71' }
            }
        });


        // graph.addCell(m1);

        // var m2 = m1.clone();
        // m2.translate(300, 0);
        // graph.addCell(m2);

        // var m3 = m1.clone();
        // m3.translate(0, 0)
        stencilGraph.addCells([am]);
        console.log(graph.toJSON());


        //resize paper
        window.onresize = function(event) {
            console.log('...window resize');
            paper.setDimensions($('#myholder').width());
            // paper.scaleContentToFit({minScaleX: 0, minScaleY: 0, maxScaleX: 1 , maxScaleY: 1});
            stencilPaper.setDimensions($('#stencil').width());
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


        stencilGraph.addCells([startModel]);

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
        stencilGraph.addCells([endModel]);

        var branch = new joint.shapes.devs.Model({
            position: { x: 25, y: 300 },
            size: { width: 71, height: 71 },
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


        stencilGraph.addCells([branch]);
    }
}
</script>