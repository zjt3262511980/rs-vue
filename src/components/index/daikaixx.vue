<template>
    <div class="">
          <el-select v-model="value" placeholder="请选择">
                <el-option
                label="4月"
               :value="4">
                </el-option>
                <el-option
                label="3月"
                :value="3">
                </el-option>
            </el-select>
        <div id="myChart" :style="{width: '1000px', height: '600px'}"></div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    name: "",
    data() {
        return {
          dataA:[],
          dataY:[],
          dataY2:[],
          value:4
        }
    },
    computed:{
        ...mapGetters(['getSessionuserrs','gettimedate'])
    },
    methods: {
         draw(){
                       // 初始化echarts实例
                        let myChart = this.$echarts.init(document.getElementById('myChart'))
                      
                     var option = {
                            //此处占用篇幅过大，先省略等下会进行解释
                tooltip : {
                      show:true,
                    formatter:(params)=>{
                        return this.$echarts.format.formatTime("hh:mm",params.value)}
                },
                grid: {
                    left: '6%',
                    right: '6%',
                    bottom: '6%',
                    containLabel: true
                },
                legend: {
                    data:['上午打卡','下午打卡'],
                    left: '6%',
                    top: 'top',
                    itemWidth: 15,//图例图标的宽
                    itemHeight: 15,//图例图标的高
                    textStyle: {
                        color: '#3a6186',
                        fontSize:20,
                    }
                },
                toolbox: {
                    show : true,
                    feature : {
                        magicType : {show: true, type: ['line','bar']},
                    },
                    right: '6%',
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        //data :['2020-04-01','2020-04-02','2020-04-03','2020-04-04','2020-04-05','2020-04-06','2020-04-07'],
                        data:this.dataA,
                        //splitLine: {show: false},//去除网格分割线
                        axisTick: {//刻度
                            show: false//不显示刻度线
                        },
                        axisLine: {//坐标线
                            lineStyle: {
                                type: 'solid',
                                color: '#e7e7e7',//轴线的颜色
                                width:'2'//坐标线的宽度
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#3a6186',//坐标值的具体的颜色
                            }
                        },
                        splitLine: {
                            show: false//去掉分割线
                        },
                    }
                ],
                yAxis : [
                    {
                        type : 'time',
                         min:"2020-04-01 07:55",
                         max:"2020-04-01 08:00",
                        axisLine: {//线
                            show: false
                        },
                        axisTick: {//刻度
                            show: false
                        },
                        axisLabel: {
                            formatter:(params)=>{
                                return this.$echarts.format.formatTime("hh:mm",params);
                                },
                            textStyle: {
                                color: '#3a6186',//坐标值的具体的颜色
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#e7e7e7'],//分割线的颜色
                            }
                        }
                    },{
                        type : 'time',
                         min:"2020-04-01 13:55",
                         max:"2020-04-01 14:00",
                        axisLine: {//线
                            show: false
                        },
                        axisTick: {//刻度
                            show: false
                        },
                        axisLabel: {
                            formatter:(params)=>{
                                return this.$echarts.format.formatTime("hh:mm",params);
                                },
                            textStyle: {
                                color: '#3a6186',//坐标值的具体的颜色
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#e7e7e7'],//分割线的颜色
                            }
                        }
                    }
                ],
                series : [
                    {
                        //曲线
                        smooth: true,
                        name:'上午打卡',
                        type:'line',
                        barWidth: 20,
                        //data:['2020-04-01 07:55', '2020-04-01 07:59', '2020-04-01 07:57', '2020-04-01 07:59', '2020-04-01 07:58', '2020-04-01 07:55', '2020-04-01 07:57'],
                        data:this.dataY,
                        itemStyle: {
                            normal: {
                                color: '#00abf7',//设置柱子颜色
                                label: {
                                    show: true,//柱子上显示值
                                    position: 'top',//值在柱子上方显示
                                    textStyle: {
                                        color: '#00abf7',//值的颜色
                                        fontSize:16,
                                    }
                                }
                            }
                        },
                    },
                    // {
                    //     smooth: true,
                    //     name:'下午打卡',
                    //     type:'line',
                    //     barWidth: 20,
                    //     data:this.dataY2,
                    //     itemStyle: {
                    //         normal: {
                    //             color: '#ff4f76',//设置柱子颜色
                    //             label: {
                    //                 show: true,//柱子上显示值
                    //                 position: 'top',//值在柱子上方显示
                    //                 textStyle: {
                    //                     color: '#ff4f76',//值的颜色
                    //                     fontSize:16,
                    //                 }
                    //             }
                    //         }
                    //     },
                    // }
                ]
            };
                       //防止越界，重绘canvas
                       window.onresize = myChart.resize;
                       myChart.setOption(option);//设置option
                   },
        cxsj(){
                             let url = "beonzc/selectstring";
							let parmas = new URLSearchParams();
                            parmas.append("moth",this.value);
                            parmas.append("empid", this.getSessionuserrs.employee.empId);
						this.$axios.post(url, parmas).then(response => {
                                     console.log(response.data);
                                    this.dataA=response.data.beonlit;
                                    this.dataY=response.data.punStatus;
                                    this.dataY2=response.data.punout;
                                    this.draw();
						}).catch((ex)=>{
							console.log(ex);
                        });
        },
        
    },
    mounted() {
       this.cxsj(); 
    },
}
</script>
)
<style  scoped>
</style>
