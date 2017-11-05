<template>
    <div id="app">
        <schart :canvasId="canvasId"
            :type="type"
            :width="width"
            :height="height"
            :data="data"
            :options="options"
        ></schart>
    </div>
</template>
<script>
import schart from 'vue-schart';
export default {
    props:{
        chartsData:Object,
        canvasId:String
    },
    data() {
        return {
            // canvasId: 'myCanvas',
            type: 'ring',
            width: 720,
            height: 400,
            data: [
                // {name: '2014', value: 1342},
                // {name: '2015', value: 2123},
                // {name: '2016', value: 1654},
                // {name: '2017', value: 1795},
            ],
            options: {
                title: ''
            }
        }
    },
    components:{
        schart
    },
    watch:{
        chartsData(cur_v, old_v){
            var res = [];
            var total = 0;
            for(var k in this.chartsData){
                var d = this.chartsData[k];
                total += d.totalTime;
            }
            for(var k in this.chartsData){
                var d = this.chartsData[k];
                var name = d.name + "(" + ((d.totalTime / total)*100).toFixed(2) + "%)";
                var value = d.totalTime;
                res.push({
                    name:name,
                    value:value
                });
            }
            this.data = res;
            this.options.title = "总时间：" + total +"s";
        }
    }
}
</script>