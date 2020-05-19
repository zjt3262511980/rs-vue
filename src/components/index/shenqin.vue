<template>
    <div>
        <el-tag>{{nowMonth}}月份</el-tag>
        <div v-if="list.size==0">
            <h1>目前没有任何未打卡情况</h1>
        </div>
        <div  v-else>
            <el-collapse v-model="activeNames" @change="handleChange" accordion>
                <el-collapse-item :title="'日期：'+li.beondutyDaystring" :name="li.beondutyId" v-for="li in list" :key="li.beondutyId">
                        <div v-if="sqsf">
                               <span>已经提交申请,目前状态：<el-tag type="success">{{appl.applyStatus}}</el-tag></span>
                        </div>
                        <div v-else>
                                     <el-tag type="warning">上午：</el-tag>&nbsp;{{swdate}}&nbsp;&nbsp;&nbsp;
                                     <el-tag type="warning">下午：</el-tag>&nbsp; {{xwdate}}
                                    <el-button type="primary" @click="shiqin(li)" style="float:right;">申请</el-button>
                        </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <el-dialog
                title="申请"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose"
                :close-on-click-modal="false"
                :close-on-press-escape="false" append-to-body
                center
         >
            <span>申请原因:</span><el-input type="textarea" v-model="applyCause"  placeholder="请输入原因" :autosize="{ minRows:3, maxRows: 6}"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="tjappl">确 定</el-button>
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
            date:new Date(),
            nowMonth : new Date().getMonth() + 1,
            list:[],
            activeNames: [],
           swdate:'',
           xwdate:'',
            dialogVisible:false,
            sqsf:false,
            applyCause:'',
            li:{},
             appl:{},
        }
    },
    components: {},
    computed:{
        ...mapGetters(['getSessionuserrs','gettimedate'])
    },
    mounted(){
        this.cx();
    },
    methods: {
        handleChange(val) {
            this.sqsf=false;
            if(val!=''){
                 let url = "appl/selectbyempidbeonid";
							let parmas = new URLSearchParams();
                            parmas.append("beonid",val);
                            parmas.append("appempid", this.getSessionuserrs.employee.empId);
						this.$axios.post(url, parmas).then(response => {
                            if(response.data.applyId!=null){
                                   this.appl=response.data;
                                   this.sqsf=true;
                            }else{
                                 //没有申请，就查询这天，打卡信息
                                 this.xgxx(val);
                            }
						}).catch((ex)=>{
							console.log(ex);
                        });
                
                           
                     }
      },
      xgxx(val){
           let url = "punzc/selectbybeoidempid";
							let parmas = new URLSearchParams();
                            parmas.append("beondutyId",val);
                            parmas.append("empid", this.getSessionuserrs.employee.empId);
						this.$axios.post(url, parmas).then(response => {
                            if(response.data!=null){
                                    this.swdate=response.data.punchStatusDatestring;
                                    this.xwdate=response.data.punchEndDatestring;
                            }
                            
						}).catch((ex)=>{
							console.log(ex);
                        });
      },
      cx(){
           
                            let url = "punzc/sqpunchard";
							let parmas = new URLSearchParams();
                            parmas.append("month",this.nowMonth);
                            parmas.append("empid", this.getSessionuserrs.employee.empId);
						this.$axios.post(url, parmas).then(response => {
                            this.list=response.data;
						}).catch((ex)=>{
							console.log(ex);
						});
      },
      shiqin(li){
          this.dialogVisible=true;
          this.li=li;
      },
      tjappl(){
                         let url = "appl/insertapp";
							let parmas = new URLSearchParams();
                            parmas.append("beonid",this.li.beondutyId);
                            parmas.append("applyCause",this.applyCause);
                            parmas.append("appempid", this.getSessionuserrs.employee.empId);
						this.$axios.post(url, parmas).then(response => {
                            if(response.data==1){
                            this.$message({
                                    message: '已经提交申请',
                                    type: 'success',
                                    duration:1000
                                });
                                this.activeNames=[];
                            } 
						}).catch((ex)=>{
							console.log(ex);
                        });
                        this.li={};
          this.dialogVisible=false;
      },
              //关闭确认
          handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
    }
}
</script>

<style  scoped>
</style>
