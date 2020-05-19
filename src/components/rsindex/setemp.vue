<template>
      <el-dialog
                title="添加员工"
                :visible.sync="$parent.dialogVisible"
                width="50%"
                :before-close="handleClose"
                :close-on-click-modal="false"
                :close-on-press-escape="false" append-to-body
                center
                >
    <div class="">
        <el-form ref="emp" :model="emp" style="width:400px" :rules="rules" label-position="right" label-width="100px">
            <el-form-item label="真实姓名:" prop="empName">
                <el-input v-model="emp.empName"></el-input>
            </el-form-item>
             <el-form-item label="性别:" prop="empSex">
                <el-select v-model="emp.empSex" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="年龄:" prop="empAge">
              <el-input v-model="emp.empAge"></el-input>
            </el-form-item>
            <el-form-item label="部门:" prop="empDept">
                <el-select v-model="emp.empDept" placeholder="请选择部门:">
                <el-option v-for="dept in deptlist" :key="dept.depId" :label="dept.depDepartment" :value="dept.depId"></el-option>
                </el-select>
            </el-form-item>
              <el-form-item label="详细信息:">
                <el-input type="textarea" v-model="emp.empDetail"></el-input>
            </el-form-item>
            <el-form-item label="电话:" prop="empPhone">
              <el-input v-model="emp.empPhone"></el-input>
            </el-form-item>
             <el-form-item label="学历:" prop="empEdu">
                <el-select v-model="emp.empEdu" placeholder="请选择性别">
                <el-option label="博士" value="博士"></el-option>
                <el-option label="硕士" value="硕士"></el-option>
                <el-option label="本科" value="本科"></el-option>
                <el-option label="大专" value="大专"></el-option>
                <el-option label="高中" value="高中"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="头像:">
                    <el-upload
                    class="avatar-uploader"
                    :action="host+'/empcz/upload'"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    name="img"
                    >
                    <img v-if="imageUrl!=''" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
            </el-form-item>
             <el-form-item label="进公司日期:" prop="empDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="emp.empDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
             <el-form-item label="专业:" prop="empMajor">
              <el-input v-model="emp.empMajor"></el-input>
            </el-form-item>
             <el-form-item label="家庭住址:" prop="empAddress">
              <el-input v-model="emp.empAddress"></el-input>
            </el-form-item>
            <el-form-item label="身份证号:" prop="empIdentity">
              <el-input v-model="emp.empIdentity"></el-input>
            </el-form-item>
              <el-form-item label="过期时间:" prop="empOutDate">
                <el-date-picker type="date" placeholder="选择日期" v-model="emp.empOutDate" style="width: 100%;"></el-date-picker>
               </el-form-item>
                    <el-button type="primary" @click="submitForm('emp')" icon="el-icon-upload">立即创建</el-button>
                    <el-button @click="resetForm('emp')">重置</el-button>
                
        </el-form>
    </div>
         </el-dialog>
</template>

<script>
export default {
    name: "",
    data() {
        var checkAge = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('年龄不能为空'));
          }
          setTimeout(() => {
            if (!value>0) {
              callback(new Error('请输入数字值'));
            } else {
              if (value < 18) {
                callback(new Error('必须年满18岁'));
              } else {
                callback();
              }
            }
          }, 1000);
      };
        return {
            emp:{
                empName:'',
                empSex:'',
                empAge:0,
                empDept:'',
                empDetail:'',
                empPhone:'',
                empEdu:'',
                empImg:'',
                empDate:'',
                empMajor:'',
                empAddress:'',
                empIdentity:'',
                empOutDate:''
            },
            rules: {
          empName: [ { required: true, message: '请输入真实姓名', trigger: 'blur' }],
          empSex: [{ required: true, message: '请选择性别', trigger: 'change' }],
          empAge: [{ validator: checkAge, trigger: 'blur' }],
          empDept: [{ required: true, message: '请选择部门', trigger: 'change' }],
          empPhone:[{ required: true, message: '请输入电话号码', trigger: 'blur' },{ min: 10, max: 15, message: '长度在 10 到 15 个数字', trigger: 'blur' }],
          empEdu: [{ required: true, message: '请选择学历', trigger: 'change' }],
          empDate: [{ type: 'date', required: true, message: '请选择进公司日期', trigger: 'change' }],
          empMajor: [ { required: true, message: '请输入专业', trigger: 'blur' }],
          empAddress: [ { required: true, message: '请输入家庭住址', trigger: 'blur' }],
          empIdentity: [ { required: true, message: '请输入身份证号', trigger: 'blur' },{ min: 18, max: 18, message: '长度在18个数字', trigger: 'blur' }],
          empOutDate: [{ type: 'date', required: true, message: '请选择过期时间', trigger: 'change' }],
        },
            deptlist:[],
            imageUrl:'',
           

        };
    },
    components: {},
    methods: {
      //添加
         submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    let url = "empcz/insertemp";
                  this.$axios.post(url,this.emp).then(response => {
                      if(response.data>0){
                          this.$parent.dialogVisible=false;
                          this.$message({
                              message: '添加成功',
                              type: 'success',
                              duration:1000
                            });
                            this.$refs[formName].resetFields();
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
                    console.log('请填写完成');
                    return false;
                }
                });
            },
            //获取照片地址
         handleAvatarSuccess(response,file){
            this.imageUrl = this.host+"/imgurl/"+response;
            this.emp.empImg="/imgurl/"+response;
            },
            //重置
         resetForm(formName) {
                this.$refs[formName].resetFields();
            },
                //关闭确认
          handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
    },
    computed:{ 
        host(){
            return this.$axios.defaults.baseURL;
        }
        },
    mounted(){
      //查询部门
      let url = "deptzc/selectdeptlist";
		this.$axios.post(url).then(response => {
				this.deptlist=response.data;			
								
		}).catch((ex)=>{
		console.log(ex);
		});
    },

                    
}
</script>

<style  scoped>
.avatar-uploader-icon, .avatar {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon:hover, .avatar:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
