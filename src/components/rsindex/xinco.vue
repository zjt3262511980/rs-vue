<template>
    <div class="">
            月份：{{cxyf}}
            <br/>
                <el-row>
                    <el-col :span="3" :offset="7">
                        <el-button type="primary" @click="tianjiai" icon="el-icon-upload">添加</el-button>
                    </el-col>
          <el-col :span="3" :offset="7"><el-button type="success" icon="el-icon-refresh-right" @click="cshsj()">刷新</el-button>
          </el-col>
        </el-row>
          <el-table stripe border :data="list" style="width: 100%">
               <el-table-column label="头像" prop="" width="100px">
                    <template slot-scope="scope">
                        <el-image style="width: 80px; height: 70px" :src="host+scope.row.employee.empImg"></el-image>
                    </template>
                 </el-table-column>
                   <el-table-column  v-for="news in props" :key="news.id" :prop="news.prop" :label="news.label" :width="news.width"></el-table-column>
                 <el-table-column label="全勤" prop="" width="50px">
                    <template slot-scope="scope">
                        <div v-if="scope.row.remPresent==0" >
                       <i class="el-icon-check" style="font-weight: bolder;font-size:30px;color:green"></i>
                       </div>
                       <div  v-else>
                           <i class="el-icon-close"  style="color:red;font-weight: bolder;font-size:30px;"></i>
                       </div>
                    </template>
                 </el-table-column>
                 <el-table-column  v-for="news in props2" :key="news.id" :prop="news.prop" :label="news.label" :width="news.width"></el-table-column>
                  <el-table-column label="总经理同意" prop="" width="60px">
                    <template slot-scope="scope">
                        <div v-if="scope.row.remZjlYj==0" >
                       <i class="el-icon-check" style="font-weight: bolder;font-size:30px;color:green"></i>
                       </div>
                       <div  v-if="scope.row.remZjlYj==1">
                           <i class="el-icon-minus"  style="color:red;font-weight: bolder;font-size:30px;"></i>
                       </div>
                       <div  v-if="scope.row.remZjlYj==2">
                           <i class="el-icon-close"  style="color:red;font-weight: bolder;font-size:30px;"></i>
                       </div>
                    </template>
                 </el-table-column>
                  <el-table-column label="财务同意" prop="" width="60px">
                    <template slot-scope="scope">
                        <div v-if="scope.row.remCwYj==0" >
                       <i class="el-icon-check" style="font-weight: bolder;font-size:30px;color:green"></i>
                       </div>
                       <div  v-if="scope.row.remCwYj==1">
                           <i class="el-icon-minus"  style="color:red;font-weight: bolder;font-size:30px;"></i>
                       </div>
                       <div  v-if="scope.row.remCwYj==2">
                           <i class="el-icon-close"  style="color:red;font-weight: bolder;font-size:30px;"></i>
                       </div>
                    </template>
                 </el-table-column>
                  </el-table>
                 <!-- 添加薪酬 -->
                    <xingchou></xingchou>
    </div>
</template>

<script>
import xingchou from "./xingchou"
export default {
    name: "",
    data() {
        return {
            dialogVisible:false,
            time:new Date(),
            list:[],
              props:[
            {prop:"employee.empName",label:"姓名",width:"80"},
            {prop:"dept.depDepartment",label:"部门",width:"80"},
            {prop:"tmExamdataAddition.tmEAPosition",label:"职位",width:"80"},
            {prop:"remSalary",label:"基本工资",width:"80"},
            {prop:"remTiem",label:"应出勤数",width:"80"},
             {prop:"remOut",label:"实际出勤",width:"80"},
            ],
            props2:[
            {prop:"remMachin",label:"补伙食费",width:"80"},
            {prop:"remFund",label:"公积金",width:"80"},
            {prop:"remWithhold",label:"社保扣款",width:"80"},
            {prop:"remMoney",label:"扣款",width:"80"},
            {prop:"remUseSalary",label:"应发工资",width:"80"},
            {prop:"remNetPay",label:"实发工资",width:"80"},
            ],
        }
    },
    computed:{
        host(){
            return this.$axios.defaults.baseURL;
        },
        cxyf(){
            return this.time.getMonth();
        },
        
    },
    components: {
        xingchou,
    },
    mounted(){
        this.cshsj();
    },
    methods: {
        tianjiai(){
            this.dialogVisible=true;

        },
        cshsj(){
              let url = "remu/selectbyrem";
				let parmas = new URLSearchParams();
                 parmas.append("date",this.time);
				this.$axios.post(url, parmas).then(response => {
                      this.list=response.data;
				}).catch((ex)=>{
							console.log(ex);
                 });
        }
    }
}
</script>

<style  scoped>
</style>
