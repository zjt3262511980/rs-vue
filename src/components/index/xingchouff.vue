<template>
    <div class="">
        月份：{{cxyf}}
        <el-button  type="warning" size="small" @click="qiabufaif">一键全部发放</el-button>
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
                  <el-table-column label="发放" prop="" width="130px">
                    <template slot-scope="scope">
                        <el-button @click="faifan(scope.row)" type="primary" size="small" icon="el-icon-s-order">发放</el-button>
                        <br/>
                        <el-button  type="warning" size="small" @click="bufai(scope.row)" icon="el-icon-brush">不发放</el-button>
                    </template>
                 </el-table-column>
                  </el-table>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    name: "",
    data() {
        return {
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
    components: {},
    computed:{
        host(){
            return this.$axios.defaults.baseURL;
        },
        cxyf(){
            return this.gettimedate.getMonth();
        },
         ...mapGetters(['getSessionuserrs','gettimedate','getxingchou'])
    },
    mounted(){
        this.cxsj();
    },
    methods: {
        qiabufaif(){
            let url = "remu/cwyjlist";
           let list={list:this.list,yj:0}
             this.$axios.post(url,list).then(response => {             
              this.cxsj();
         }).catch((ex)=>{
          console.log(ex);
         });
        },
        cxsj(){
                let url = "remu/cwshenqin";
                let parmas = new URLSearchParams();
                 parmas.append("date",this.gettimedate);
                this.$axios.post(url,parmas).then(response => {
                        this.list=response.data;   
                         this.set_xingchou(response.data.length);
                }).catch((ex)=>{
                console.log(ex);
                });
        },
        faifan(row){
               let url = "remu/cwyj";
            let parmas = new URLSearchParams();
            parmas.append("remid", row.remId);
            parmas.append("yj",0);
            this.$axios.post(url, parmas).then(response => {
              this.cxsj();
         }).catch((ex)=>{
          console.log(ex);
         });
        },
        bufai(row){
            let url = "remu/cwyj";
            let parmas = new URLSearchParams();
            parmas.append("remid", row.remId);
            parmas.append("yj",2);
            this.$axios.post(url, parmas).then(response => {
              this.cxsj();
         }).catch((ex)=>{
          console.log(ex);
         });
        },
         ...mapActions(['set_userrs','userrsout','set_xingchou'])
    }
}
</script>

<style  scoped>
</style>
