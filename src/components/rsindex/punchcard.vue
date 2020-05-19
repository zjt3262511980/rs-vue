<template>
    <div>
        <el-button type="success" style="float:right;" icon="el-icon-refresh-right" @click="saixing()">刷新</el-button>
        <el-row>
            <el-col :span="4" v-for="(li, index) in getlist" :key="li.applyId" :offset="(index)%4!=0||index==1 ? 2 : 0">
                <div style="height:10px"></div>
                <el-card :body-style="{ padding: '0px' }">
                <img :src="host+li.employee.empImg" class="image" style="height:200px">
                <div style="padding: 14px;">
                    <span>{{li.employee.empName}}</span>
                    <div class="bottom clearfix">
                    <time class="time">{{li.applyDatestring}}</time>
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
                            <el-col :span="8">真实姓名：<el-tag type="success">{{appl.employee.empName}}</el-tag></el-col>
                            <el-col :span="8" :offset="2">申请日期：<el-tag type="success">{{appl.applyDatestring}}</el-tag></el-col>
                         </el-row>
                         <hr>
                         <el-row>
                            <el-col :span="16">申请补卡日期：<el-tag type="success">{{appl.beonduty.beondutyDaystring}}</el-tag></el-col>
                         </el-row>
                         <hr>
                         <el-row>
                            <el-col :span="16">原因：<el-tag type="success">{{appl.applyCause}}</el-tag></el-col>
                         </el-row>
                    </div>
                 <span slot="footer" class="dialog-footer">
                <el-button @click="butongyi(appl)">不同意</el-button>
                <el-button type="primary" @click="tongyi(appl)">同意</el-button>
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
            appl:{
                employee:{},
                beonduty:{}
            },
        }
    },
    components: {},
    computed:{
        host(){
            return this.$axios.defaults.baseURL;
        },
        ...mapGetters(['getlist'])
    },
    methods: {
        saixing(){
            console.log("123");
             let url = "appl/selectbyempid";
							let parmas = new URLSearchParams();
              parmas.append("appempid", this.getSessionuserrs.employee.empId);
						this.$axios.post(url, parmas).then(response => {
              if(response.data.length>0){
                this.set_appllist(response.data);
              }    
						}).catch((ex)=>{
							console.log(ex);
                        });
        },
        butongyi(appl){
            let url = "appl/updatestarts";
							let parmas = new URLSearchParams();
              parmas.append("appempid", appl.applyId);
              parmas.append("day", appl.beonduty.beondutyDaystring);
              parmas.append("starts", '不同意');
                parmas.append("empid", appl.applyEmpId);
              parmas.append("beonid", appl.beonId);

						this.$axios.post(url, parmas).then(response => {
              if(response.data>0){
                    this.dialogVisible=false;
              }    
						}).catch((ex)=>{
							console.log(ex);
                        });
        },
        tongyi(appl){
                let url = "appl/updatestarts";
							let parmas = new URLSearchParams();
              parmas.append("appempid", appl.applyId);
              parmas.append("day", appl.beonduty.beondutyDaystring);
              parmas.append("starts", '同意');
              parmas.append("empid", appl.applyEmpId);
              parmas.append("beonid", appl.beonId);
              
						this.$axios.post(url, parmas).then(response => {
              if(response.data>0){
                    this.dialogVisible=false;
              }    
						}).catch((ex)=>{
							console.log(ex);
                        });
        },
                cz(li){
                    this.appl=li;
                    this.dialogVisible=true;
                },
              //关闭确认
          handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            ...mapActions(['set_userrs','set_appllist'])
    },
}
</script>

<style  scoped>
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    float: right;
  }

  .image {
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
