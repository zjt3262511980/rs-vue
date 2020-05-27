<template>
    <div>
        <el-row>
        <el-col :span="3" :offset="8">月份：{{cxyf}}</el-col>
          <el-col :span="3" :offset="10"><el-button type="success" icon="el-icon-refresh-right" @click="cxsj()">刷新</el-button>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="4" v-for="(li, index) in list" :key="li.applyId" :offset="(index)%4!=0||index==1 ? 2 : 0">
                <div style="height:10px"></div>
                <el-card :body-style="{ padding: '0px' }">
                <img :src="host+li.employee.empImg" class="image" style="height:200px">
                <div style="padding: 14px;">
                    <span>{{li.employee.empName}}</span>
                    <div class="bottom clearfix">
                    <time class="time">{{li.remMonthstring}}</time>
                    <el-button type="primary" class="button" @click="cz(li)">操作</el-button>
                    </div>
                </div>
                </el-card>
            </el-col>
        </el-row>
            <el-dialog
                title="申请"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose"
                :close-on-click-modal="false"
                :close-on-press-escape="false" append-to-body
                center >
                    <div>
                        <el-row>
                          <el-col :span="24"><el-tag type="info">{{rem.remMonthstring}}</el-tag></el-col>
                        </el-row>
                        <br/>
                        <el-row>
                          <el-col :span="6">姓名:{{rem.employee.empName}}</el-col>
                           <el-col :span="6" :offset="2">职位:{{rem.dept.depDepartment}}</el-col>
                            <el-col :span="6" :offset="2">部门:{{rem.tmExamdataAddition.tmEAPosition}}</el-col>
                        </el-row>
                         <br/>
                         <el-row>
                          <el-col :span="6">应出勤天数:{{rem.remTiem}}</el-col>
                           <el-col :span="6" :offset="2">实际出勤天数:{{rem.remOut}}</el-col>
                            <el-col :span="6" :offset="2">全勤:
                                <i class="el-icon-check" v-if="rem.remPresent==0" style="font-weight: bolder;font-size:20px;color:green"></i>
                                <i class="el-icon-close" v-else  style="color:red;font-weight: bolder;font-size:20px;"></i>
                                </el-col>
                        </el-row>
                         <br/>
                         <el-row>
                          <el-col :span="6">基本工资:{{rem.remSalary}}</el-col>
                           <el-col :span="6" :offset="2">补伙食费:{{rem.remMachin}}</el-col>
                            <el-col :span="6" :offset="2">公积金:{{rem.remFund}}</el-col>
                        </el-row>
                         <br/>
                         <el-row>
                          <el-col :span="6">社保扣款:{{rem.remWithhold}}</el-col>
                           <el-col :span="6" :offset="2">扣款:{{rem.remMoney}}</el-col>
                        </el-row>
                         <br/>
                        <el-row>
                          <el-col :span="6">应发工资:<el-tag type="success">{{rem.remUseSalary}}</el-tag></el-col>
                           <el-col :span="6" :offset="2">实发工资:<el-tag type="success">{{rem.remNetPay}}</el-tag></el-col>
                        </el-row>
                    </div>
                 <span slot="footer" class="dialog-footer">
                <el-button @click="butongyi(rem)">不同意</el-button>
                <el-button type="primary" @click="tongyi(rem)">同意</el-button>
            </span>    
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
            rem:{
                employee:{},
                dept:{},
                tmExamdataAddition:{},
                },
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
        butongyi(remun){
        let url = "remu/zjlyj";
         let parmas = new URLSearchParams();
         parmas.append("remid", remun.remId);
         parmas.append("yj",2);
        this.$axios.post(url, parmas).then(response => {
              this.cxsj();
              this.dialogVisible=false;
         }).catch((ex)=>{
          console.log(ex);
         });
        },
        tongyi(remun){
        let url = "remu/zjlyj";
         let parmas = new URLSearchParams();
         parmas.append("remid", remun.remId);
         parmas.append("yj",0);
        this.$axios.post(url, parmas).then(response => {
              this.cxsj();
               this.dialogVisible=false;
         }).catch((ex)=>{
          console.log(ex);
         });
        },
        cz(li){
                    this.rem=li;
                    this.dialogVisible=true;
                },
        cxsj(){
            let url = "remu/zjlshenqin";
			let parmas = new URLSearchParams();
            parmas.append("date",this.gettimedate);
			this.$axios.post(url, parmas).then(response => {
             this.list=response.data;
            this.set_xingchou(response.data.length);
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
            ...mapActions(['set_userrs','userrsout','set_xingchou'])
    }
}
</script>

<style  scoped>
</style>
