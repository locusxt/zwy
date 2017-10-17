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
import testSide from '@/views/test-side';
import newRuntime from '@/views/newruntime';
import runtimeView from '@/views/runtimeview';
import newDataset from '@/views/newdataset';
import datasetView from '@/views/datasetview';
import cmTest from '@/views/cmtest';
import appSide from '@/views/app-side';
import newApp from '@/views/newapp';
import newam from '@/views/newam';
import amview from '@/views/amview';
import amTest from '@/views/amtest';

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
    name: 'simple frame',
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
        },
        {
            path:'newam',
            components:{
                main:newam,
                side:frameSide,
            }
        },
        {
            path:'amview',
            components:{
                main:amview,
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
}, {
    path: '/test',
    name: 'simple test',
    components: {
        main: sidemain,
    },
    children:[
        {
            path:'newruntime',
            components:{
                main:newRuntime,
                side:testSide,
            }
        },
        {
            path:'runtimeview',
            components:{
                main:runtimeView,
                side:testSide,
            }
        },
        {
            path:'newdataset',
            components:{
                main:newDataset,
                side:testSide,
            }
        },
        {
            path:'datasetview',
            components:{
                main:datasetView,
                side:testSide,
            }
        },
        {
            path:'cmtest',
            components:{
                main:cmTest,
                side:testSide,
            }
        },
        {
            path:'amtest',
            components:{
                main:amTest,
                side:testSide,
            }
        }
    ]
},
{
    path: '/app',
    name: 'simple app',
    components: {
        main: sidemain,
    },
    children:[
        {
            path:'newapp',
            components:{
                main:newApp,
                side:appSide,
            }
        }
    ]
}
]
})
