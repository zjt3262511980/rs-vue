<template>
    <div>
        <div style="color:black;height:40%;width:50%;float:left">
                <el-calendar v-model="value">
                <template
                slot="dateCell"
                slot-scope="{date, data}">
                <p  @click='allcalendar(data.day)'> {{ data.day.split('-').slice(2).join('-') }}</p>
                </template>
                </el-calendar> 
        </div>
        <dir style="color:black;height:40%;width:30%;float:right">
           {{Year}}年{{month}}月份
           <br/>
           <br/>
            <el-select v-model="value1" multiple placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
                <el-tooltip class="item" effect="dark" content="添加星期一到星期五" placement="top-start">
                 <el-button type="primary" @click="moren()">默认</el-button>
                </el-tooltip>
                <br/>
                    <el-tooltip class="item" effect="dark" content="只能添加下个月及以后" placement="top-start">
                                <el-button type="primary" @click="tianjian()">添加</el-button>
                 </el-tooltip>
                 
                <el-tooltip class="item" effect="dark" content="修改已经设置" placement="top-start">
                 <el-button type="primary" @click="xg()">修改</el-button>
                </el-tooltip>
           
        </dir>
        <shanbanxg ref="shanbanxg"></shanbanxg>
     </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import shanbanxg from './shanbanxg'
export default {
    name: "",
    data() {
        return {
            value: new Date(),
            value1:[],
            dialogVisible2:false
                    }
    },
    components: {
        shanbanxg
    },
    computed:{
        options(){
            var list=[];
            let y=this.value.getFullYear();
            let m=(this.value.getMonth()+1).toString();
            let length=new Date(y,m,0).getDate();
            for(var i=1;i<length+1;i++){
                list.push({value:i,label:i+'号'})
            }
            return list;
        },
        month(){
            return (this.value.getMonth()+1).toString();
        },
         Year(){
            return this.value.getFullYear();
        },
    },
    methods: {
         xg(){
             var sj=new Date();
              this.dialogVisible2=true;
              this.$nextTick(()=>{
                  this.$refs.shanbanxg.init(sj.getMonth()+1);
              })
          },
        allcalendar(day){
            day=day.replace(/-/g,'/');
            var data=new Date(day);
            var d=data.getDate()
            if(this.value1.indexOf(d)==-1){
                    this.value1.push(d);
            }else{
              var index=this.value1.indexOf(d);
              if(index>-1){
                  this.value1.splice(index,1);
              }
            }
               
        },
        tianjian(){
            var sj=new Date();
            if(this.Year==sj.getFullYear()&&this.month>((sj.getMonth()+1).toString())){
                  let url = "beonzc/tianbeon";
                 let parmas = new URLSearchParams();
                 parmas.append("month", this.month);
                 parmas.append("year", this.Year);
                parmas.append("value", this.value1);
             this.$axios.post(url, parmas).then(response => {
							if(response.data>0){
                this.$message({
                    message: '添加成功',
                    type: 'success',
                    duration:1000
                  });
                  this.value1=[];
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
      }
            
        },
        moren(){
            var d=this.value;
            d.setFullYear(this.Year,this.month-1,1);
            var ww=d.getDay();
            d.setFullYear(this.Year,this.month-1,0);
            var dd=d.getDate();
            for(var i=1;i<dd+1;i++){
                if(ww<6){
                     if(this.value1.indexOf(i)==-1){
                    this.value1.push(i);
                            }
                    ww=ww+1;
                }else{
                    ww=ww+1;
                    if(ww==8){ww=1}
                }
            }
        }


    }
}
</script>

<style  scoped>
   .li-01{
    background: rgb(255,255,0)!important;
    color: #000;
  }
  .li-02{
    background: rgb(255,126,0)!important;
    color: #000;
  }
  .li-03{
    background: rgb(255,0,0)!important;
    color: #000;
  }
</style>
