<template> 
            <el-dialog
                title="详细信息"
                :visible.sync="$parent.dialogVisible2"
                width="50%"
                :before-close="handleClose"
                :close-on-click-modal="false"
                :close-on-press-escape="false" append-to-body
                center
                >
                <div class="">
                        <el-row :gutter="24">
                          <el-col :span="10">名字：{{emp.empName}}</el-col>
                          <el-col :span="5" :offset="2">性别：{{emp.empSex}}</el-col>
                          <el-col :span="5" :offset="2">年龄：{{emp.empAge}}</el-col>
                        </el-row>
                        <hr>
                        <el-row :gutter="24">
                          <el-col :span="10">部门:{{emp.dept.depDepartment}}</el-col>
                          <el-col :span="10" :offset="2">职位:{{emp.tmExamdataAddition.tmEAPosition}}</el-col>
                        </el-row>
                        <hr>
                        <el-row :gutter="24">
                          <el-col :span="24">详细信息:{{emp.empDetail}}</el-col>
                        </el-row>
                        <hr>
                         <el-row :gutter="24">
                          <el-col :span="10">电话号码:{{emp.empPhone}}</el-col>
                          <el-col :span="5" :offset="2">学历:{{emp.empEdu}}</el-col>
                          <el-col :span="5" :offset="2">专业:{{emp.empMajor}}</el-col>
                        </el-row>
                        <hr>
                        <el-row :gutter="24">
                          <el-col :span="10">家庭住址:{{emp.empAddress}}</el-col>
                          <el-col :span="5" :offset="2">身份证号:{{emp.empIdentity}}</el-col>
                          <el-col :span="5" :offset="2">上级领导:{{emp.superior.empName
                              }}</el-col>
                        </el-row>
                        <hr>
                         <el-row :gutter="24">
                          <el-col :span="4">状态:{{emp.empStatus}}</el-col>
                          <el-col :span="8" :offset="2">进公司日期:{{emp.empDate|format}}</el-col>
                          <el-col :span="8" :offset="2">过期时间:{{emp.empOutDate|format}}</el-col>
                        </el-row>
                        <hr>
                    </div>
                </el-dialog>
    
</template>

<script>
export default {
    name: "",
    data() {
        return {
            emp:{}
        }
    },
    components: {},
    methods: {
        init(id){
                let url = "empcz/byidemp";
				      let parmas = new URLSearchParams();
                parmas.append("id",id);
                this.$axios.post(url, parmas).then(response => {
                      this.emp=response.data;                         
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
    }
}
</script>

<style  scoped>
</style>
