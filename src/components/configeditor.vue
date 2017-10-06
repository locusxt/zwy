<script>


export default {
    props: {
            cur:Object
    },
    data() {
        return {}
    },
    components:{
        
    },
    created:function(){
    },
    methods: {
            emit(){
                // console.log("emit cm");
                // this.$emit('transferCM', this.cur);
            },
            
    },
    render:(h)=>{
                return h('div', [
                    h('p', 'test'),
                    h('p', 'test2')
                ])
            }
    
}
</script>