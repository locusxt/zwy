<style scoped>
@import '/static/css/joint.min.css';
</style>

<template>
    <Row>
        <Col span='18' offset='2'>
            <div>
                <h1 align="center">新建应用软件流程</h1>
                <br />
                <div id="testdiv">
                    <Row>
                        <Col span='3'>
                            <div id="stencil" style="border-style: solid"></div>
                        </Col>
                        <Col span='5'>
                            <div id="myholder" style="border-style: solid"></div>
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
                height: 720,
                model: stencilGraph,
                interactive: false
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
            width:720,
            height: 1000,
            model: graph,
            gridSize: 1,
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


        // let rect = new joint.shapes.basic.Rect({
        //     position: { x: 100, y: 30 },
        //     size: { width: 100, height: 30 },
        //     attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
        // });

        // let rect2 = rect.clone();
        // rect2.translate(300);

        // let link = new joint.dia.Link({
        //     source: { id: rect.id },
        //     target: { id: rect2.id }
        // });

        var m1 = new joint.shapes.devs.Model({
            position: { x: 15, y: 25 },
            size: { width: 70, height: 56 },
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
        graph.addCell(m1);

        var m2 = m1.clone();
        m2.translate(300, 0);
        graph.addCell(m2);

        // graph.addCells([rect, rect2, link]);

        // stencilGraph.addCells([m1, m2, rect, rect2, link]);
        var m3 = m1.clone();
        m3.translate(0, 0)
        stencilGraph.addCells([ m3]);
        console.log(graph.toJSON());
    }
}
</script>