import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import shijian from './shijian'
import shenqing from './shenqing'
Vue.use(Vuex);


export default new Vuex.Store({
    modules:{
        user,
        shijian,
        shenqing
    }
});