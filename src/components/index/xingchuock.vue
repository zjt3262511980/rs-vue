<template>
    <div class="">
     <el-table stripe border :data="list" style="width: 100%">
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
                      <el-table-column label="操作" prop="" width="120px">
                            <template>
                                <el-button @click="faifan()" type="primary" size="small" icon="el-icon-s-order">发放</el-button>
                            </template>
                        </el-table-column>
                  </el-table>
                  <el-dialog
                title="申请"
                :visible.sync="dialogVisible"
                width="50%"
                :close-on-click-modal="false"
                :close-on-press-escape="false" append-to-body
                center >
                <el-tag type="success">工资大约在1到3个工作日发放</el-tag>
                </el-dialog>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    name: "",
    data() {
        return {
            dialogVisible:false,
            list:[],
            props:[
            {prop:"employee.empName",label:"姓名",width:"80"},
            {prop:"dept.depDepartment",label:"部门",width:"80"},
            {prop:"tmExamdataAddition.tmEAPosition",label:"职位",width:"80"},
            {prop:"remSalary",label:"基本工资",width:"80"},
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
         ...mapGetters(['getSessionuserrs','gettimedate','getxingchou'])
    },
    mounted(){
        this.cxsj();
    },
    methods: {
        cxsj(){
                let url = "remu/remunbyid";
            let parmas = new URLSearchParams();
            parmas.append("empid",this.getSessionuserrs.employee.empId);
            parmas.append("date",this.gettimedate);
			this.$axios.post(url, parmas).then(response => {
             this.list=response.data;
						}).catch((ex)=>{
							console.log(ex);
                        });
        },
        faifan(){
       this.dialogVisible=true;
        },
         ...mapActions(['set_userrs','userrsout','set_xingchou'])
    }
}
</script>
<style  scoped>
</style>
