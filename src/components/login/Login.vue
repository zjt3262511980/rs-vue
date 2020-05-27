<template>
<div style="width:100%;height:100%;background-color:#2c5fa1;">

<div style="width:150px; margin:0px auto">
<img src="@/assets/img/login.jpeg" style="width:150px;">
</div>

    <div class="d2">
        <h3 style="  text-align: center;">人事管理系统</h3>
        <el-tabs type="border-card" stretch>
  <el-tab-pane label="用户登录">
      <div style="width:350px;height:300px;">
        
        <el-input placeholder="请输入用户名" v-model="name" suffix-icon="el-icon-user" >
         <template slot="prepend">用户名:</template>
        </el-input>

         <el-input type="password" placeholder="请输入密码" v-model="pwd" style="margin-top:30px"  suffix-icon="el-icon-view">
         <template slot="prepend">密码:</template>
        </el-input>

        <div style="margin-top:40px;margin-left:80px">
        <el-button type="success" @click="sub">登录</el-button>
        <el-button type="danger">重置</el-button>
        <br>
        <br>
        <p style="font-size: 12px;"><el-button type="text" @click="dialogVisible = true">没有账号？点击注册</el-button></p>
        </div>
      </div>
  </el-tab-pane>
  <el-tab-pane label="微信登录">
      <!--生成微信登录二维码-->
       <div style="width:350px;height:300px;">
               <div style="width:350px;height:20px;background-color:white; position: absolute;
               top:265px">
            </div>  
			<wxlogin :href="href" :appid="appid" :scope="scope" :redirect_uri="redirect_uri">
            </wxlogin>
             
       </div>
  </el-tab-pane>
</el-tabs>
        
  </div>

<el-dialog
  title="注册"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose"
  :close-on-click-modal="false"
  :close-on-press-escape="false">
  <div>
    <el-row type="flex" justify="center">
        <el-form ref="userrs" :model="userrs" :rules="rules" label-width="80px" @keyup.enter.native="register()">
        <el-form-item prop="userName" label="用户名"><el-input v-model="userrs.userName" placeholder="请输入用户名" prefix-icon="icon-login_user" clearable></el-input></el-form-item>
        <el-form-item prop="userPawd" label="密码"><el-input v-model="userrs.userPawd" placeholder="请输入密码" type="password" prefix-icon="icon-login_pwd" clearable></el-input></el-form-item>
        <el-form-item prop="cheackPassword" label="确认密码"><el-input v-model="userrs.cheackPassword" placeholder="再次输入密码" type="password" prefix-icon="icon-login_pwd" clearable></el-input></el-form-item>
         <el-form-item prop="empId" label="员工编号"><el-tag type="success">{{userrs.empId}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-tag>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-button type="success" @click="dialogVisible2 = true">获得编号</el-button></el-form-item>
        <el-form-item>
            <el-button type="primary" @click="register('userrs')" icon="el-icon-upload">注册</el-button>
            <el-button @click="resetForm('userrs')">重置</el-button></el-form-item>
      </el-form>
    </el-row>
  </div>
</el-dialog>
<el-dialog
  title="获得编号"
  :visible.sync="dialogVisible2"
  width="50%"
  :before-close="handleClose"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  :center="true"
  >
  <div>
      真实姓名:<el-input v-model="zsname" placeholder="真实姓名" ></el-input>
      <br>
      身份证:<el-input v-model="zspwd" placeholder="身份证" ></el-input>
      <br>
      <br>
      <el-button type="primary" @click="onSubmit" >查询</el-button>
      <div style="height:200px">
        <h1 style="font-color:＃67C23A">{{userrs.empId}}</h1>
      </div>
   <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2= false">取 消</el-button>&nbsp;&nbsp;&nbsp;
    <el-button type="primary" @click="dialogVisible2= false">确 定</el-button>
  </span>
  </div>
</el-dialog>
</div>
</template>

<script>
import wxlogin from 'vue-wxlogin'
import $ from 'jquery'
import {mapGetters,mapActions} from 'vuex'
export default {
  name: "",
  data() {
     var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.userrs.userPawd) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
 
  
    return {
       userrs: {
        userName: '',
        userPawd: '',
        cheackPassword:'',
        empId:'',
      },
       rules: {
        userName: [{ required: true, message: '用户名不能为空', trigger: 'blur' },{ min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }],
        userPawd: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        cheackPassword: [{ required: true, validator: validatePass, trigger: 'blur' }],
        empId: [{ required: true, message: '员工编号不能为空', trigger: 'blur' }]
 
      },
      name:"liubi",
      pwd:"123456",
      msg:"",
      zsname:"",
      zspwd:"",
      dialogVisible:false,
      dialogVisible2:false,
      appid:"wx7287a60bb700fd21",
      scope:"snsapi_login",
      redirect_uri:"http://www.txjava.cn/Login/login",
      href:"data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge3dpZHRoOiAyMTBweDt9Ci5pbXBvd2VyQm94IC5pY29uMzhfbXNnLnN1Y2Mge2Rpc3BsYXk6IG5vbmV9Ci5pbXBvd2VyQm94IC5pY29uMzhfbXNnLndhcm4ge2Rpc3BsYXk6IG5vbmV9Ci5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246IGNlbnRlcjt9Cg=="
    };
  },
  components: {
       wxlogin,
  },
  computed: {
     ...mapGetters(['getSessionuserrs','gettimedate'])
    },
    created(){
      //进行异步获得userrs
           let url="Login/selectuserrs";
            this.$axios.post(url).then(response => {
                if(response.data.userId!=null){
                this.set_userrs(response.data);
                console.log(response.data);
                console.log('++++++');
                }
            });
    },
mounted(){
            if(JSON.stringify(this.getSessionuserrs)=='{}'){
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
  methods: {
    //关闭确认
          handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //登录
    sub(){
     let url = "Loginrs/loginuserrs";
				 let parmas = new URLSearchParams();
        parmas.append("name", this.name);
        parmas.append("pwd", this.pwd);
       this.$axios.post(url, parmas).then(response => {
							if(response.data!=null){
                  this.set_userrs(response.data);
                this.$message({
                    message: '登录成功',
                    type: 'success',
                    duration:1000
                  });
                  if(response.data.employee.dept.depDepartment=='人事部'){
                    this.$router.push({path:"/rsndex"}).catch(err => {err});
                  }else if(response.data.employee.tmExamdataAddition.tmEAPosition=='老板'){
                    this.$router.push({path:"/lbindex"}).catch(err => {err});
                  }else{
                    this.$router.push({path:"/index"}).catch(err => {err});
                  }
							}else{
               this.$message({
                  message: '登录失败，请检测密码和账号',
                  type: 'error',
                  showClose:true
                });
							}
								
						}).catch((ex)=>{
							console.log(ex);
            });
            
    },
//注册
    register(formName) {
      this.$refs[formName].validate(valid => {
				if (valid) {
          this.dialogVisible=false;
        
          let url = "Loginrs/tjuserrs";
					this.$axios.post(url,this.userrs).then(response => {
							if(response.data>0){
                  
                  this.$message({
                      message: '添加成功',
                      type: 'success',
                      duration:1000
                    });
                this.dialogVisible1=false;
                this.name=this.userrs.userName;
							}else{
                this.$message({
                    message: '添加失败',
                    type: 'error',
                    duration:1000
                  });
							}
								
						}).catch((ex)=>{
							console.log(ex);
						});
				} else {
					return false;
				}
			});
    },
    //重置
    resetForm(formName) {
			this.$refs[formName].resetFields();
    },
    //查询id
    onSubmit(){
        let url = "Loginrs/cxempid";
				 let parmas = new URLSearchParams();
        parmas.append("zsname", this.zsname);
        parmas.append("zspwd", this.zspwd);
       this.$axios.post(url, parmas).then(response => {
							if(response.data>0){
                  this.userrs.empId=response.data;
                  this.$message({
                      message: '查询成功',
                      type: 'success',
                      duration:1000
                    });
                this.dialogVisible2=false;
							}else{
                this.$message({
                    message: '没有员工或者被认证',
                    type: 'error',
                    duration:1000
                  });
							}
								
						}).catch((ex)=>{
							console.log(ex);
						});
    },
    ...mapActions(['set_userrs','set_timedate'])
  }
  
};
</script>

<style  scoped>

.el-input{
    width: 330px;
}
.d2 {
  width: 350px;
  height: 350px;

  background-color:white;
border: 1px solid aquamarine;
margin: 0 auto;
}
</style>
