<template>
            <el-dialog
                title="修改"
                :visible.sync="$parent.dialogVisible2"
                width="50%"
                :before-close="handleClose"
                :close-on-click-modal="false"
                :close-on-press-escape="false" append-to-body
                center>

                    <div class="">
                        <el-link type="primary" style="align-content: center;">{{month}}月份</el-link>
                        <br>
                       
                    <el-checkbox-group v-model="checkboxGroup">
                    <el-checkbox :label="li.id" border v-for="li in list" :key="li.id" :disabled="li.jy==1">{{li.id}}号</el-checkbox>
                    </el-checkbox-group>
                    <br/>
                     {{checkboxGroup}}
                     <el-button type="primary" @click="submitForm()" icon="el-icon-upload">修改</el-button>
                     <el-button type="primary" @click="$parent.dialogVisible2=false" icon="el-icon-upload">关闭</el-button>
                    </div>

            </el-dialog>
</template>

<script>

export default {
    name: "",
    data() {
        return {
            checkboxGroup:[],
            list:[],
            month:'',
            d:new Date()
        }
    },
    components: {},
    methods: {
        submitForm(){
            
                let url = "beonzc/upbeonuty";
				 let parmas = new URLSearchParams();
                parmas.append("value",this.checkboxGroup);
                 parmas.append("month", this.month);
                 parmas.append("year", this.d.getFullYear());
                this.$axios.post(url, parmas).then(response => {
                    		if(response.data>0){
                                    this.$message({
                                        message: '添加成功',
                                        type: 'success',
                                        duration:1000
                                    });
                            }else{
                                this.$message({
                                    message: '添加失败,或者已经添加',
                                    type: 'error',
                                    showClose:true
                                    });
							}
                 }).catch((ex)=>{
                 console.log(ex);
                });
                this.$parent.dialogVisible2=false;
        },

                  //关闭确认
          handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
             init(month){
                this.list=[];
                this.checkboxGroup=[];
                this.d=new Date();
                 //初始化
                 this.month=month
                 var jt=this.d.getDate();
                 
                 var Year=this.d.getFullYear();
                 this.d.setFullYear(Year,month,0);
                var dd=this.d.getDate();
                
                for(var i=1;i<dd+1;i++){
                    if(jt+1<=i){
                        this.list.push({id:i,jy:0})
                    }else{
                        this.list.push({id:i,jy:1})
                    }
                }
                //得到已添加
                let url = "beonzc/selectmonth";
				 let parmas = new URLSearchParams();
                parmas.append("month",month);
                this.$axios.post(url, parmas).then(response => {
                    for(var j=0;j<response.data.length;j++){
                        this.checkboxGroup.push((new Date(response.data[j].beondutyDay)).getDate())
                    }  
                 }).catch((ex)=>{
                 console.log(ex);
                });
                },
    }
}
</script>

<style  scoped>
</style>
