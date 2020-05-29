<template>
    <div class="">
            <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
                 <el-tab-pane
                 :key="0" 
                    label="查看考勤信息"
                    name="0"
                  closable>
      <el-row>
          <el-col :span="3" :offset="18"><el-button type="success" icon="el-icon-refresh-right" @click="cxchen()">刷新</el-button>
          </el-col>
        </el-row>
                  <el-table stripe border :data="listcheck" style="width: 100%">
                   <el-table-column  v-for="news in props" :key="news.id" :prop="news.prop" :label="news.label" :width="news.width"></el-table-column>
                  </el-table>
                     <el-select v-model="value" placeholder="请选择" @change="cxchen()">
                        <el-option
                        v-for="i in cxyf"
                        :key="i"
                        :label="cxlf+'年'+i+'月'"
                        :value="i"
                        >
                        </el-option>
                    </el-select>
                    <!-- 添加 --> 
                        <div style="margin-bottom: 20px;">
                        <el-button size="small" icon="el-icon-edit" @click="addTab(editableTabsValue)" >添加</el-button>
                        </div>    

                    </el-tab-pane>
                    <el-tab-pane v-for="item in editableTabs" 
                    :key="item.name" 
                    :label="item.title"
                    :name="item.name"
                   >
                   
                     <!-- name的值是v-model
                     label是标题
                      -->
                      
                       <kaoqintj :myChild="value"></kaoqintj>
                    </el-tab-pane>
            </el-tabs>  
    </div>
</template>
<script>
import kaoqintj from './kaoqintj'
  export default {
    data() {
      return {
          time:new Date(),
          listcheck:[],
          value:0,
          props:[
            {prop:"employee.empName",label:"姓名",width:"120"},
            {prop:"cheLate",label:"迟到次数",width:"120"},
            {prop:"cheEarly",label:"早退次数",width:"120"},
            {prop:"cheAbsenteeism",label:"旷工次数",width:"120"},
            {prop:"cheOut",label:"应出勤数",width:"120"},
            {prop:"chePractical",label:"实际出勤",width:"120"},
            {prop:"cheMoth",label:"时间",width:"120"},
            {prop:"cheRemark",label:"备注",width:"120"},
            ],
        editableTabsValue: '0',
        editableTabs: [
        ],
        tabIndex:0
      }
    },
    mounted(){
        this.sheyg();
         this.cxchen();
                
    },
    components: {
        kaoqintj
    },
    computed:{
        cxyf(){
            return this.time.getMonth()+1;
        },
        cxlf(){
           return this.time.getFullYear(); 
        },
    },
    methods: {
      sheyg(){
        this.value=this.cxyf-1;
      },
        //查询数据
        cxchen(){
            let url = "check/selectckeck";
                let parmas = new URLSearchParams();
                parmas.append("month", this.value);
                parmas.append("year", this.cxlf);
                this.$axios.post(url,parmas).then(response => {
                        this.listcheck=response.data;                
                }).catch((ex)=>{
                console.log(ex);
                });
        },
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: this.value+'月份添加'+newTabName,
          name: newTabName,
        });
        this.editableTabsValue = newTabName;
      },

      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }

    }
  }
</script>

<style  scoped>
</style>
