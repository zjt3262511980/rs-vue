<template>
  <div class="homeBox">
    <el-container style="height:100%;" direction="vertical">
      <el-header>
        <h1 style="color:red;margin-left:60px;margin-top:10px;font-size:30px">
          <i class="el-icon-eleme"></i>瞩目
          <span style="color:white;font-size:17px;margin-left:100px">人事管理系统</span>
         
          <span style="color:yellow;position:relative;left:600px;font-size:17px;">{{gettimedate|format}}</span>
          <el-button type="success" style="float:right;" @click="logout">退出</el-button>
        </h1>
      </el-header>

      <el-container>
        <el-aside width="250px">
            <img :src="host+getSessionuserrs.employee.empImg" style="background-color:white;width:70px;height:70px;border-radius:50%;margin-top:20px;margin-left:10px"/>
          <h4 style="color:white">{{getSessionuserrs.employee.empName}}/{{getSessionuserrs.employee.tmExamdataAddition.tmEAPosition}}</h4>
          <el-col :span="24">
            <el-menu background-color="#545c64"  class="el-menu-vertical-demo" text-color="#fff" active-text-color="#ffd04b" >
              <!-- <div v-for="(u,index) in $router.options.routes[1].children" :key="index"> -->
                  <el-submenu index="1">
                          <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span>上班</span>
                          </template>
                          <el-menu-item-group>
                            <el-menu-item index="1-1"><router-link to="/lbindex/shanbansz"  slot="title">上班设置</router-link></el-menu-item>
                            
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
     logout(){
        this.userrsout();
          let url = "Loginrs/loginUI";
						this.$axios.post(url).then(response => {      
              console.log(response.data);    
						}).catch((ex)=>{
							console.log(ex);
                        });
        this.$router.push("/Login");
    },
    ...mapActions(['set_userrs'])

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
