<template>
  <div>
      <ul>
          <li v-for="c in res_configs">
                  <Input @on-change="emit" v-model=c.value placeholder="请输入..." style="width: 720px">
                    <span slot="prepend">{{c.name}}({{c.range}})</span>
                  </Input>
                  <br>
          </li>
      </ul>
  </div>
</template>


<script>


export default {
    props: {
            cur:Object
    },
    data() {
        return {
            res_configs:[]
        }
    },
    watch:{
        cur(cur_v, old_v){
            this.res_configs = this.cur.configs.map(i=>{
                // i.value = '';
                this.$set(i, 'value', '');
                return i;
            });
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