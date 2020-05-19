<template>
    <div class="">
        <el-row :gutter="24" style="color:black">
            <el-col :span="12" :offset="3">
             <el-input placeholder="可以输入：姓名,性别,部门,职位,专业" v-model="tiaojin">
                <template slot="prepend">条件：</template>
            </el-input>
            </el-col>
            <el-col :span="5"><el-button type="primary" @click="pagelist()">查询</el-button></el-col>
        </el-row>
            <div style="height:50px ;"></div>
            <div style="height:50px ;float:left">
                <el-button type="primary" icon="el-icon-edit" @click="addemp()">添加员工</el-button>
                <div style="height:10px ;"></div>
            </div>
            <div style="height:50px ;float:right">
                <el-tooltip class="item" effect="dark" content="不包括离职人员" placement="top-end">
                <el-radio v-model="radio" :label="1" @change="change()" >在职</el-radio>
                </el-tooltip>
                 <el-tooltip class="item" effect="dark" content="包括离职人员" placement="top-end">
                <el-radio v-model="radio" :label="2" @change="change()">全部</el-radio>
                </el-tooltip>
                <div style="height:10px ;"></div>
            </div>
        <el-table stripe border :data="pageinfo.list" style="width: 100%">
            <el-table-column label="图片" prop="" width="100px">
                <template slot-scope="scope">
                    <el-image style="width: 80px; height: 70px" :src="host+scope.row.empImg"></el-image>
                </template>
            </el-table-column>
            <el-table-column  v-for="news in props" :key="news.id" :prop="news.prop" :label="news.label" :width="news.width"></el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope" >
                <el-button @click="xxxxemp(scope.row)" type="primary" size="small" icon="el-icon-s-order">详细信息</el-button>
                <el-button  type="warning" size="small" @click="update(scope.row)" icon="el-icon-brush">修改</el-button>
                <el-button @click="handleClick(scope.row)" type="danger" size="small" icon="el-icon-delete" v-if="getSessionuserrs.employee.tmEAPosition=='主管'">删除</el-button>
            </template>
            </el-table-column>
      </el-table>
             <el-pagination
            background
            layout="sizes,prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[3, 5]"
            :page-size="pageSize"
            :total="pageinfo.total">
            </el-pagination>
            <!-- 添加 -->
                <setemp></setemp>
            <!-- 详细信息 -->
            <byidemp ref="byidemp"></byidemp>
           
    </div>
</template>

<script>
import setemp from './setemp'
import byidemp from './byidemp'
import {mapGetters} from 'vuex'
export default {
    name: "",
    data() {
        return {
            props:[
            {prop:"empName",label:"姓名",width:"120"},
            {prop:"empName",label:"性别",width:"120"},
            {prop:"dept.depDepartment",label:"部门",width:"120"},
            {prop:"tmExamdataAddition.tmEAPosition",label:"职位",width:"120"},
            {prop:"empStatus",label:"状态",width:"120"},
            {prop:"empOutDate",label:"过期时间",width:"120"},
            ],
            tiaojin:'',
            pageSize:3,
            page:1,
            pageinfo:{},
            dialogVisible:false,
            dialogVisible2:false,
            radio:1,
        }
    },
    computed:{
         host(){
            return this.$axios.defaults.baseURL;
        },
        ...mapGetters(['getSessionuserrs'])
    },
    components: {
        setemp,
        byidemp
    },
    methods: {
        change(){
            this.pagelist();
        },
        //添加弹出
        addemp(){
                this.dialogVisible=true;
        },
          //详细信息
          xxxxemp(row){
              this.dialogVisible2=true;
              this.$nextTick(()=>{
                  this.$refs.byidemp.init(row.empId);
              })
          },
        //修改
        update(){},
        //删除
        handleClick(){},
        //分页
        pagelist(){
                let url = "empcz/pageemp";
                let parmas = new URLSearchParams();
                parmas.append("page", this.page);
                parmas.append("pageSize", this.pageSize);
                parmas.append("tj", this.tiaojin);
                parmas.append("radio", this.radio);
                this.$axios.post(url,parmas).then(response => {
                        this.pageinfo=response.data;
                                        
                }).catch((ex)=>{
                console.log(ex);
                });
        },
        //修改每页显示条数
             handleSizeChange(val) {
            this.pageSize=val;
            this.pagelist();
            },
            //修改第几页
            handleCurrentChange(val) {
                this.page=val
                this.pagelist();
            },
    },
    mounted(){
      this.pagelist();
    }  
}
</script>

<style  scoped>
</style>
