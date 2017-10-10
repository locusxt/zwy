// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
// import $ from 'jquery'


Vue.prototype.$ajax = axios

Vue.config.productionTip = false
Vue.use(iView);

window.$ = require('jquery');
window.joint = require('jointjs');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
