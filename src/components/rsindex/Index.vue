<template>
  <div class="homeBox">
    <el-container style="height:100%;" direction="vertical">
      <el-header>
        <h1 style="color:red;margin-left:60px;margin-top:10px;font-size:30px">
          <i class="el-icon-eleme"></i>瞩目
          <span style="color:white;font-size:17px;margin-left:100px">人事管理系统</span>
          &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:white;font-size:15px;margin-left:100px">部门：{{getSessionuserrs.employee.dept.depDepartment}}</span>
           <span style="color:yellow;position:relative;left:400px;font-size:17px;">{{gettimedate|format}}</span>
          <el-button type="success" style="float:right;" @click="logout">退出</el-button>
        </h1>
      </el-header>

      <el-container>
        <el-aside width="250px">
    
            <img :src="host+getSessionuserrs.employee.empImg" style="background-color:white;width:70px;height:70px;border-radius:50%;margin-top:20px;margin-left:10px"/>
          
          <h4 style="color:white">{{getSessionuserrs.employee.empName}}/{{getSessionuserrs.employee.tmExamdataAddition.tmEAPosition}}</h4>
          <el-col :span="24">
            <el-menu  default-active="1"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
              <!-- <div v-for="(u,index) in $router.options.routes[1].children" :key="index"> -->
                      <el-submenu index="1">
                          <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span>员工操作</span>
                          </template>
                          <el-menu-item-group>
                            <el-menu-item index="1-3"><router-link to="/rsndex/selectemp"  slot="title">查看员工</router-link></el-menu-item>
                          </el-menu-item-group>
                      </el-submenu>
                      <el-submenu index="2">
                          <template slot="title">
                            <i class="el-icon-collection-tag"></i>
                            <span>申请查看</span>
                          </template>
                          <el-menu-item-group>
                            <el-badge :is-dot="ds" class="item">
                            <el-menu-item index="2-1"><router-link to="/rsndex/pubchcard"  slot="title">申请打卡</router-link></el-menu-item>
                            </el-badge>
                          </el-menu-item-group>
                      </el-submenu>
                      <el-submenu index="3">
                          <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span>上班</span>
                          </template>
                          <el-menu-item-group>
                            <el-menu-item index="3-1"><router-link to="/rsndex/rsshanbansz"  slot="title">上班设置</router-link></el-menu-item>
                          </el-menu-item-group>
                      </el-submenu>
                       <el-submenu index="4">
                          <template slot="title">
                            <span>申请</span>
                          </template>
                          <el-menu-item-group>
                            <el-menu-item index="4-1"><router-link to="/rsndex/vxbd"  slot="title">微信绑定</router-link></el-menu-item>
                          </el-menu-item-group>
                      </el-submenu>
              <!-- </div> -->

            </el-menu>
          </el-col>
        </el-aside>

        <el-container>
          <el-main>
              <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  name: "",
  data() {
    return {
      ds:false,
    }; 
  },
  computed: {
    host(){
            return this.$axios.defaults.baseURL;
        },
     ...mapGetters(['getSessionuserrs','gettimedate'])
  },
  components: {},
  methods: {
    //查询申请有未查看
    selectaaplck(){
       let url = "appl/selectbyempid";
							let parmas = new URLSearchParams();
              parmas.append("appempid", this.getSessionuserrs.employee.empId);
						this.$axios.post(url, parmas).then(response => {
              if(response.data.length>0){
                this.ds=true;
                this.set_appllist(response.data);
              }    
						}).catch((ex)=>{
							console.log(ex);
                        });
    },
     logout(){
        this.userrsout();
          let url = "Loginrs/logout";
						this.$axios.post(url).then(response => {      
              console.log(response.data);    
						}).catch((ex)=>{
							console.log(ex);
                        });
        this.$router.push("/Login");
    },
    ...mapActions(['set_userrs','set_appllist','userrsout'])

  },
    mounted(){
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
  //查询申请
  this.selectaaplck();
  }
  
}
</script>

<style  scoped>
.el-menu-item.is-active {
      background-color: #3370ff !important;
      color: #fff !important;
}
.homeBox {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
}

.el-header {
  background-color: black;
  color: black;
}

.el-aside {
  background-color: rgb(0, 0, 0, 0.8);
  text-align: center;
  color: #c33;
}
.el-main {
  text-align: center;
  color: wheat;
}
</style>
