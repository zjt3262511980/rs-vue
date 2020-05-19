<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  name: "App",
  computed: {
     ...mapGetters(['getSessionuserrs','gettimedate'])
    },
    methods: {
      ...mapActions(['set_userrs','set_timedate'])
    },
     
  mounted() {
         //创建时间
          this.timer = setInterval(() => {
          this.set_timedate(new Date()); // 修改数据date
          }, 1000);
   if(JSON.parse(sessionStorage.getItem("userrs"))==null&&JSON.stringify(this.getSessionuserrs)=='{}'){
     this.$router.push("/Login").catch(err => {err});
     }else{
      this.set_userrs(JSON.parse(sessionStorage.getItem('userrs')));
                if(this.getSessionuserrs.employee.dept.depDepartment=='人事部'){
                    this.$router.push({path:"/rsndex"}).catch(err => {err});
                  }else if(this.getSessionuserrs.employee.tmExamdataAddition.tmEAPosition=='老板'){
                    this.$router.push({path:"/lbindex"}).catch(err => {err});
                  }else{
                    this.$router.push({path:"/index"}).catch(err => {err});
                  }
                  } 
  },
  beforeDestroy(){
    if(this.timer){
      clearInterval(this.timer);
    }
  }
};
</script>

<style>
html,
body,
#app,
.el-container {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
}
</style>
