import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import frameSide from '@/views/framework-side';
import frame from '@/views/framework';
import newcm from '@/views/newcm';
import index from '@/views/index';
import framework from '@/views/framework';
import sidemain from '@/views/sidemain';
import cmview from '@/views/cmview';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
    meta: {
        title: ''
    },
    component: (resolve) => require(['@/views/index.vue'], resolve)
}, {
    path: '/frame',
    name: 'simple test',
    components: {
        main: sidemain,
    },
    children:[
        {
            path:'newcm',
            components:{
                main:newcm,
                side:frameSide,
            }
        },
        {
            path:'cmview',
            components:{
                main:cmview,
                side:frameSide,
            }
        }
    ]
}, {
    path: '/b',
    name: 'index',
    components: {
        main: index,
    }
}
]
})
