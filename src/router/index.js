import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/Login'



import index from '@/components/index/index'
import daikai from '@/components/index/daikai'
import shenqin from '@/components/index/shenqin'
import vxbd from '@/components/index/vxbd'



import rsindex from '@/components/rsindex/index'
import selectemp from '@/components/rsindex/selectemp'
import pubchcard from '@/components/rsindex/punchcard'
import rsshanbansz from '@/components/rsindex/shanbansz'

import lbindex from '@/components/lbindex/index'
import shanbansz from '@/components/lbindex/shanbansz'


Vue.use(Router)

export default new Router({
  routes: [
    //登录
    {path:"/login",component:Login,children:[
     
    ]},

    //人事主页
    {path:"/rsndex",component:rsindex,children:[
      {path:"selectemp",component:selectemp,title:'查看员工'},
      {path:"pubchcard",component:pubchcard,title:'申请打卡'},
      {path:"rsshanbansz",component:rsshanbansz,title:'上班设置'},
      {path:"vxbd",component:vxbd,title:'微信绑定'},
    ]},
     //主页
     {path:"/index",component:index,children:[
      {path:"daikai",component:daikai,title:'打卡'},
      {path:"shenqin",component:shenqin,title:'申请打卡'},
      {path:"vxbd",component:vxbd,title:'微信绑定'},
    ]},
     //老板主页
      {path:"/lbindex",component:lbindex,children:[
        {path:"shanbansz",component:shanbansz,title:'上班设置'},
    ]},

  ]
})
