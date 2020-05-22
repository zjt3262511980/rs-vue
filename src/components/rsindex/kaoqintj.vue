<template>
    <div class="">
       <p>{{moth}}月份</p>
       <el-form ref="form" :model="form" label-width="80px" style="width:400px;margin:auto">
            <el-select v-model="form.empId" placeholder="请选择添加员工">
                <el-option :label="emp.empName" :value="emp.empId" v-for="emp in list" :key="emp.empId"></el-option>
            </el-select>
            <br/>
            <el-button type="success" @click="js">计算</el-button>
            <el-button type="primary" @click="daikai">查看打卡信息</el-button>
            <el-form-item label="迟到次数">
               <el-input  v-model="form.cheLate" :disabled="true" v-if="xg"></el-input>
               <el-input  v-model="form.cheLate" v-else></el-input>
            </el-form-item>
            <el-form-item label="早退次数">
               <el-input  v-model="form.cheEarly" :disabled="true" v-if="xg"></el-input>
               <el-input  v-model="form.cheEarly" v-else></el-input>
            </el-form-item>
            <el-form-item label="旷工次数">
               <el-input  v-model="form.cheAbsenteeism" :disabled="true" v-if="xg"></el-input>
               <el-input  v-model="form.cheAbsenteeism"  v-else></el-input>
            </el-form-item>
            <el-form-item label="应出勤">
               <el-input  v-model="form.cheOut" :disabled="true" v-if="xg"></el-input>
               <el-input  v-model="form.cheOut"  v-else></el-input>
            </el-form-item>
            <el-form-item label="实际出勤">
               <el-input  v-model="form.chePractical" :disabled="true" v-if="xg"></el-input>
               <el-input  v-model="form.chePractical"  v-else></el-input>
            </el-form-item>
            <el-form-item label="备注">
               <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.cheRemark"></el-input>
            </el-form-item>
            <el-form-item label="月份">
               <el-tag type="success">{{cxlf+'/'+moth}}月</el-tag>
            </el-form-item>
           <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-popconfirm title="确定强行修改吗？" @onConfirm="xg=false">
                <el-button slot="reference" >修改</el-button>
                </el-popconfirm>
        </el-form-item>
       </el-form>
            <el-drawer
            title="打卡信息"
            :visible.sync="drawer"
            direction="rtl"
            size="45%"
            >
                <el-table stripe border :data="punlist" height="600">
                        <el-table-column
                        label="日期"
                        width="180">
                        <template slot-scope="scope" >
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.beonduty.beondutyDaystring}}</span>
                        </template>
                        </el-table-column>
                   <el-table-column  v-for="news in ps" :key="news.id" :prop="news.prop" :label="news.label" :width="news.width">
                   </el-table-column>
                  </el-table>
           
            </el-drawer>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            punlist:[],
            drawer:false,
            xg:true,
            time:new Date(),
            moth:0,
            list:[],
            form:{
                empId:'',
                cheLate:'',
                cheEarly:'',
                cheAbsenteeism:'',
                cheOut:'',
                chePractical:'',
                cheMoth:'',
                cheRemark:'',
            },
             ps:[
            {prop:"employee.empName",label:"姓名",width:"100"},
            {prop:"punchStatusDatestring",label:"上午打卡时间",width:"200"},
            {prop:"punchEndDatestring",label:"下午打卡时间",width:"200"},
            ],
        }
    },
    props:{
        myChild:Object
    },
    computed:{
         cxlf(){
           return this.time.getFullYear(); 
        },
    },
    components: {},
    mounted(){
        this.fzhi();
        this.cxmytj();
    },
    methods: {
        js(){
            if(this.form.empId>0){
             let url = "check/jskq";
                let parmas = new URLSearchParams();
                parmas.append("empid",this.form.empId);
                parmas.append("moth",this.moth);
                this.$axios.post(url,parmas).then(response => {
                        this.form=response.data;                
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
        daikai(){
            if(this.form.empId>0){
                let url = "punzc/listbyempidbymoth";
                let parmas = new URLSearchParams();
                parmas.append("empid",this.form.empId);
                parmas.append("month",this.moth);
                this.$axios.post(url,parmas).then(response => {
                        this.punlist=response.data;                
                }).catch((ex)=>{
                console.log(ex);
                });
                this.drawer=true;
            }else{
                this.$message({
                  message: '请选择员工',
                  type: 'error',
                  showClose:true
                });
            }
        },
         onSubmit() {
                let url = "check/insertckeck";
                this.from.cheMoth=this.cxlf+'/'+this.moth;
                    this.$axios.post(url,this.form).then(response => {
                        if(response.data>0){
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

      },
        fzhi(){
            this.moth=this.myChild
        },
        //查询这个月没有添加的
        cxmytj(){
             let url = "check/selectbynotempid";
                let parmas = new URLSearchParams();
                parmas.append("month",this.cxlf+'/'+this.moth);
                this.$axios.post(url,parmas).then(response => {
                        this.list=response.data;                
                }).catch((ex)=>{
                console.log(ex);
                });
        },
    }
}
</script>

<style  scoped>
</style>
