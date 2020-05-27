<template>
    <div style="color:black;">
        <el-form :model="Compack"  ref="Compack" :inline="true">
             <el-form-item label="员工工资">
            <el-input-number v-model="Compack.empSalary" controls-position="right" :precision="2"  :min="1800" :max="100000" :step="0.01" ></el-input-number>
             </el-form-item>
            <el-form-item label="主管工资">
            <el-input-number v-model="Compack.empChargeSalary" controls-position="right"  :precision="2" :min="1800" :max="100000" :step="0.01"></el-input-number>
             </el-form-item>
             <el-form-item label="经理工资">
           <el-input-number v-model="Compack.empManagerSalary" controls-position="right" :precision="2"  :min="1800" :max="100000" :step="0.01" ></el-input-number>
             </el-form-item>
             <el-form-item label="总经理工资">
           <el-input-number v-model="Compack.empZongmanagerSalary" controls-position="right" :precision="2"  :min="1800" :max="100000" :step="0.01" ></el-input-number>
             </el-form-item>
             <br/>
             <el-form-item label="全勤奖">
            <el-input-number v-model="Compack.comAward" controls-position="right"   :min="0" :max="1000" ></el-input-number>
             </el-form-item>
              <el-form-item label="补伙食费">
            <el-input-number v-model="Compack.comBoard"  controls-position="right" :min="0" :max="10000"  ></el-input-number>
             </el-form-item>
             <br/>
              <el-form-item label="公积金百分比">
                  <div style="width:400px">
                    <el-slider
                     :format-tooltip="formatTooltip"
                    v-model="Compack.comAccumulation"
                    show-input>
                    </el-slider>
                    </div>
             </el-form-item>
           
              <el-form-item label="社保百分比">
                    <div style="width:400px">
                 <el-slider
                    :format-tooltip="formatTooltip"
                    v-model="Compack.comSocial"
                    show-input>
                    </el-slider>
                     </div>
             </el-form-item>
             <br/>
              <el-form-item label="每次迟到扣款">
            <el-input-number v-model="Compack.comLate" controls-position="right"  :min="0" :max="1000" :step="0.01" ></el-input-number>
              </el-form-item>
               <br/>
               <el-form-item>

                <el-popconfirm title="确定强行修改吗？" @onConfirm="update">
                <el-button slot="reference" >修改</el-button>
                </el-popconfirm>

                <el-button type="primary" @click="cxsj">取消</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            Compack:{
                codeId:0,
                empSalary:1800.00,
                empChargeSalary:1800.00,
                empManagerSalary:1800.00,
                empZongmanagerSalary:1800.00,

                comAward:0,
                comBoard:0,

                comAccumulation:0,
                comSocial:0,

                comLate:0,
            }
        }
    },
    components: {},
    methods: {
        update(){
             let url ="remu/updatecompack";
                this.$axios.post(url,this.Compack).then(response => {
                      if(response.data>0){
                          this.$message({
                              message: '修改成功',
                              type: 'success',
                              duration:1000
                            });
                      }else{
                        this.$message({
                            message: '修改失败',
                            type: 'error',
                            duration:1000
                          });
                      }                 
                 }).catch((ex)=>{
                 console.log(ex);
                });
        },
        cxsj(){
                   
              let url ="remu/selectcompack";
                this.$axios.post(url).then(response => {
                     this.Compack=response.data;                       
                 }).catch((ex)=>{
                 console.log(ex);
                });
        },
         formatTooltip(val) {
        return val+"%";
      }
    },
    mounted() {
    this.cxsj(); 
    },
}
</script>

<style  scoped>
</style>
