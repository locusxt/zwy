<template>
    <Row>
        <i-col span='18' offset='2'>
            <div>
                <h1 align="center">新建应用软件流程</h1>
                <br />
                <div id="myholder"></div>
            </div>
    </i-col>
    </Row>
</template>
<script>
    export default {
        data () {
            return {
                
            }
        },
        methods:{
            test(){
                console.log('test');
            },
            sayhello(){
                console.log(this.formItem.configs);
                this.$ajax({
                    method:'get',
                    url:'/api'
                }).then(function(response){
                    console.log(response);
                });
            },
            createDataset(){
                console.log(this.formItem);
                this.$ajax({
                    method:'post',
                    url:'/api/createdataset',
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

        },
        mounted() {
            console.log('test a');
            console.log($('#myholder'));
            console.log('test b');
            let graph = new joint.dia.Graph;

            let paper = new joint.dia.Paper({
                el: $('#myholder'),
                width: 600,
                height: 200,
                model: graph,
                gridSize: 1
            });

            let rect = new joint.shapes.basic.Rect({
                position: { x: 100, y: 30 },
                size: { width: 100, height: 30 },
                attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
            });

            let rect2 = rect.clone();
            rect2.translate(300);

            let link = new joint.dia.Link({
                source: { id: rect.id },
                target: { id: rect2.id }
            });

            graph.addCells([rect, rect2, link]);
        }
    }
</script>