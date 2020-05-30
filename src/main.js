// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from '@/store'
import 'element-ui/lib/theme-chalk/index.css'

import echarts from 'echarts'
import 'babel-polyfill'

Vue.prototype.$echarts = echarts 

Vue.use(ElementUI);
Vue.config.productionTip = false
import axios from 'axios'
axios.defaults.withCredentials=true;
Vue.prototype.$axios=axios
axios.defaults.baseURL = "http://localhost:80/";
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
 
});

//全局过滤器过滤器{{info|lower}}
Vue.filter("format",function(value2){
   //yyyy-MM-dd
   let value = new Date(value2);
   let y=value.getFullYear();
   let m=(value.getMonth()+1).toString();
   let d=value.getDate().toString();
   
   let h=value.getHours().toString();
   let min=value.getMinutes().toString();
   let sec=value.getSeconds().toString();
   
   //es6，padStart(2,'0'),不足两位，前面补零
   m=m.padStart(2,'0');
   d=d.padStart(2,'0');
   
   h=h.padStart(2,'0');
   min=min.padStart(2,'0');
   sec=sec.padStart(2,'0');
   

     return y+"-"+m+"-"+d+" "+h+":"+min+":"+sec;
   
});

