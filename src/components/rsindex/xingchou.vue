<template>
  <el-dialog
                title="添加员工"
                :visible.sync="$parent.dialogVisible"
                width="50%"
                :before-close="handleClose"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                center
                > 
    <div class="">
             <el-form ref="form" :model="form" label-width="100px" style="width:400px;margin:auto">
            <el-form-item label="员工">
                <el-select v-model="form.empId" placeholder="请选择员工">
                <el-option :label="emp.empName" :value="emp.empId" v-for="emp in list" :key="emp.empId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="jisan">计算</el-button>
            <el-button @click="cahikqb">考勤</el-button>
            </el-form-item>
            <el-form-item label="基本工资">
            <el-input v-model="form.remSalary" disabled></el-input>
            </el-form-item>
             <el-form-item label="应出勤天数">
            <el-input v-model="form.remTiem" disabled></el-input>
            </el-form-item>
             <el-form-item label="实际出勤天数">
            <el-input v-model="form.remOut" disabled></el-input>
            </el-form-item>
             <el-form-item label="全勤">
            <i class="el-icon-check" v-if="form.remPresent==0" style="font-weight: bolder;font-size:30px;color:green"></i>
            <i class="el-icon-close" v-else  style="color:red;font-weight: bolder;font-size:30px;"></i>
            </el-form-item>
             <el-form-item label="补伙食费">
            <el-input v-model="form.remMachin" disabled></el-input>
            </el-form-item>
             <el-form-item label="公积金">
            <el-input v-model="form.remFund" disabled></el-input>
            </el-form-item>
             <el-form-item label="社保扣款">
            <el-input v-model="form.remWithhold" disabled></el-input>
            </el-form-item>
            <el-form-item label="扣款">
            <el-input v-model="form.remMoney" disabled></el-input>
            </el-form-item>
            <el-form-item label="应发工资">
            <el-input v-model="form.remUseSalary" disabled></el-input>
            </el-form-item>
            <el-form-item label="实发工资">
            <el-input v-model="form.remNetPay"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="$parent.dialogVisible = false">取消</el-button>
        </el-form-item>
             </el-form>
           
    </div>
       <el-dialog
                title="考勤信息"
                :visible.sync="dialogVisible2"
                width="50%"
                :before-close="handleClose"
                :close-on-click-modal="false"
                :close-on-press-escape="false" append-to-body
                center
                > 
                <div v-if="ckeck.employee!=null">
              <el-row>
                <el-col :span="6">名字：{{ckeck.employee.empName}}</el-col>
                <el-col :span="6" :offset="2">部门：{{ckeck.employee.dept.depDepartment}}</el-col>
                 <el-col :span="6" :offset="2">部门：{{ckeck.employee.tmExamdataAddition.tmEAPosition}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6">迟到：{{ckeck.cheLate}}</el-col>
                <el-col :span="6" :offset="2">早退：{{ckeck.cheEarly}}</el-col>
                 <el-col :span="6" :offset="2">旷工：{{ckeck.cheAbsenteeism}}</el-col>
              </el-row>
                <el-row>
                <el-col :span="8">应出勤：{{ckeck.cheOut}}</el-col>
                <el-col :span="8" :offset="4">实际出勤：{{ckeck.chePractical}}</el-col>
              
              </el-row>
              </div>
                </el-dialog>
    </el-dialog>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            dialogVisible2:false,
            form:{
                remMonth:'',
                empId:'',
                remSalary:'',
                remTiem:'',
                remOut:'',
                remPresent:'',
                remMachin:'',
                remFund:'',
               remWithhold:'', 
               remMoney:'',
               remUseSalary:'',
               remNetPay:'',
            },
            list:[],
            ckeck:{},
        }
    },
    components: {
    },
    computed:{
          cxlf(){
            return this.$parent.time.getFullYear(); 
        },
    },
    mounted(){
        this.cxlistemp();
        },
    methods: {
        jisan(){
            if(this.form.empId!=''){
             let url = "remu/jisanrem";
                    let parmas = new URLSearchParams();
                    parmas.append("empid",this.form.empId);
                     parmas.append("moth",this.cxlf+'/'+this.$parent.cxyf);
                    this.$axios.post(url,parmas).then(response => {  
                        if(response.data.empId==null){
                                this.$message({
                            message: '没有考勤信息',
                            type: 'error',
                            showClose:true
                            });
                        }else{
                        this.form=response.data; 
                        }
                    }).catch((ex)=>{
                    console.log(ex);
                    });
            }else{
                        this.$message({
                        message: '请选择员工',
                        type: 'error',
                        showClose:true
                        });
                    }
        },
        cahikqb(){
            if(this.form.empId!=''){
                    let url = "check/selectbyidmont";
                    let parmas = new URLSearchParams();
                    parmas.append("empid",this.form.empId);
                     parmas.append("moth",this.cxlf+'/'+this.$parent.cxyf);
                    this.$axios.post(url,parmas).then(response => {     
                       if(response.data==''){
                        this.$message({
                        message: '没有考勤信息',
                        type: 'error',
                        showClose:true
                        });
                        }else{
                        this.ckeck=response.data;
                        this.dialogVisible2=true;
                        }           
                    }).catch((ex)=>{
                    console.log(ex);
                    });
                   
                    }else{
                        this.$message({
                        message: '请选择员工',
                        type: 'error',
                        showClose:true
                        });
                    }
        },
        onSubmit(){
           let url = "remu/tianjian";
                    let parmas = new URLSearchParams();
                    this.$axios.post(url,this.form).then(response => {
                          if(response.data>0){
                               this.$message({
                                message: '添加成功',
                                type: 'success',
                                duration:1000
                            });
                          }                
                    }).catch((ex)=>{
                    console.log(ex);
                    });
         this.$parent.dialogVisible=false;
         this.$parent.cshsj();
        },
        cxlistemp(){
            //查询这个月没有添加的
                    let url = "remu/selectlistemp";
                    let parmas = new URLSearchParams();
                    parmas.append("date",this.$parent.time);
                    this.$axios.post(url,parmas).then(response => {
                            this.list=response.data;                
                    }).catch((ex)=>{
                    console.log(ex);
                    });
        },
               //关闭确认
          handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
             resetForm(formName) {
                this.$refs[formName].resetFields();
            }
    }
}
</script>

<style  scoped>
</style>
