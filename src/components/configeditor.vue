<template>
  <div>
      <ul>
          <li v-for="c in res_configs">
                  <Input @on-change="emit" v-model=c.value placeholder="请输入..." >
                    <span slot="prepend">{{c.name}}({{c.range}})</span>
                  </Input>
                  <br>
          </li>
      </ul>
  </div>
</template>


<script>

//传入的configs中不能存在有值的value
export default {
    props: {
            configs:Array
    },
    data() {
        return {
            res_configs:[]
        }
    },
    watch:{
        configs(cur_v, old_v){
            // for(var i in this.configs){
            //     if(this.configs[i].value != undefined)
            //         this.res_configs.push(this.configs[i])
            // }
            // console.log('in watch');
            this.res_configs = this.configs.filter(c=>{
                return c.value == undefined || c.value == '';
            }).map(i=>{
                this.$set(i, 'value', '');
                return i;
            })
            // this.res_configs = this.configs.map(i=>{
            //     if (i.value == undefined)
            //         this.$set(i, 'value', '');
            //     return i;
            // });
        },
        res_configs(cur_v, old_v){
            console.log("change");
            this.emit();
        }
    },
    components:{
        
    },
    created:function(){
    },
    methods: {
            emit(){
                console.log("emit configs");
                this.$emit('transferConfigs', this.res_configs);
            },
            
    }
    // ,
    // computed:{
    //     edit_configs(){
    //         console.log(this.cur);
    //         // console.log(this.edit_configs);
    //         this.res_configs = this.cur.configs.map(i=>{
    //             i.value = '';
    //             return i;
    //         })
    //         return this.cur.configs.map(i=>{
    //             i.value = '';
    //             return i;
    //         });
    //     }
    // }
    
}
</script>