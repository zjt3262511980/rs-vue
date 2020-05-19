<template>
<div id="app">
			<div>
				<div style="position: absolute;width: 80%;border-radius: 5px;background-color:#53568B;" id="dateOuter">
					
					<div class="attendtittle" style="height: 51px;line-height: 51px;border-bottom: 1px solid  #E6E6EB;">
						<span style="margin-left: 16px;font-size: 16px;color: #333;font-weight: bold;">工作日历</span>
						<span style="width: 44px;height: 24px;border: 1px solid #E6E6EB;padding:4px 8px;cursor: pointer;border-radius: 4px;font-size: 14px;color: #333;margin-left: 44px;" @click.prevent="getThisDay()">今天</span>
						<span style="margin-left: 17px;color:  #8E8E93;cursor: pointer;" @click.stop.prevent="lastMonthClick()"><i class="el-icon-arrow-left"></i></span>
						<span style="margin-left: 18px;color:  #8E8E93;cursor: pointer;" @click.stop.prevent="nextMonthClick()"><i class="el-icon-arrow-right"></i></span>
						<span style="font-size: 14px;color: #2D2D2D;margin-left: 17px;">{{checkYear}}年</span>
						<span style="font-size: 14px;color: #2D2D2D;">{{checkMonth}}月</span>
					</div>
					<!--表体-->
					<div id="attendwrap" style="height: 300px;">
						<div id="attendwrapleft" style="width: 60%;float: left;">
							<div class="everyWeekDay">
								<span v-for="(item) in weekDays" :key="item" class="weekday" >
									<span v-if="item=='日' || item=='六'" class="weekday" style="color:#0089FA;">{{item}}</span>
									<span class="weekday" style="color:#888;" v-else>{{item}}</span>
								</span>
							</div>
							<div class="everyDay">
								<!--空白站位-->
								<span v-for="item1 in ThisWeekDayCounrt" :key="item1" class="days" ></span>
								<!--这个月的天数-->
								<span @click="getdate(item)" v-for="(item,index) in thisDayCount" class="days">
									<span v-if="checkYear == nowYear && checkMonth == nowMonth && index+1 == nowDay" style="position: relative;">
										<span v-if="cumWeekDayCounrt(index+1) == 6 || cumWeekDayCounrt(index+1) == 0" class="days" style="width:100%;cursor:pointer;"><span style="background-color:#4eccc4;color:#FFFFFF;padding:4px 10px;border-radius: 100%;">{{index+1}}</span></span>
										<span v-else class="days" style="width:100%; cursor:pointer;border-radius: 100%;"><span style="background-color:#4eccc4;color:#FFFFFF;padding: 4px 10px;border-radius: 100%;">{{index+1}}</span></span>
										<!--循环日历上面的状态-->
										<span  v-for="(item,_index) in calData">
											<span v-if="item.date==index+1">
												<span v-for="(val,_in) in item.type">
													<span style="position: absolute;bottom: -10px;right:2px;border-radius: 100%;width: 6px;height: 6px;background: red;" v-if="val==0"></span>
														<div v-if="val==1" :style="{position: 'absolute',bottom: '0px',right: -14*(_in+1)+'px',color: '#0089FA',fontSize: '12px'}">上</div>
																</span>
											</span>
										</span>
										<!--循环日历上面的状态 over-->
									</span>
									
									<span v-else style="position: relative;" >
										<span v-if="cumWeekDayCounrt(index+1) == 6 || cumWeekDayCounrt(index+1) == 0" class="days" style="color:#0089FA;cursor:pointer;">{{index+1}}</span>
										<span v-else style="cursor:pointer;">{{index+1}}</span>
										<!--循环日历上面的状态-->
										<span  v-for="(item,_index) in calData">
											<span v-if="item.date==index+1">
												<span v-for="(val,_in) in item.type">
													<span style="position: absolute;bottom: -10px;right:2px;border-radius: 100%;width: 6px;height: 6px;background: red;" v-if="val==0"></span>
														<div v-if="val==1" :style="{position: 'absolute',bottom: '0px',right: -14*(_in+1)+'px',color: '#0089FA',fontSize: '12px'}">上</div>
												</span>
											</span>
										</span>
										<!--循环日历上面的状态 over-->
									</span>
								</span>
							</div>
						</div>
						<div id="attendwrapright" style="float: right;width: 39%;border-left: 1px solid #E6E6EB;height: 284px;margin-top: 8px;text-align: center;">
							<div>
								<div style="color: #5AC8FA;font-size: 54px;">{{gettimedate.getDate().toString()}}</div>
								<div style="color: #75787B;font-size: 14px;">{{gettimedate.getFullYear()}}年{{(gettimedate.getMonth()+1).toString()}}月</div>
								<div style="color: #FF4C4D;font-size: 12px;margin-top: 6px;">出勤状态：异常</div>
								<div style="margin-top: 16px;"><i class="el-icon-user-solid"></i><span style="color: #2D2D2D;font-size: 14px;">上午班：</span><span style="color: #2D2D2D;font-size: 14px;">07:55:00(开始)</span></div>
								<div style="margin-top: 20px;"><i class="el-icon-user-solid"></i><span style="color: #2D2D2D;font-size: 14px;">上午班：</span><span style="color: #2D2D2D;font-size: 14px;">08:00:00(结束)</span></div>
								<div style="margin-top: 20px;"><i class="el-icon-user-solid"></i><span style="color: #2D2D2D;font-size: 14px;">下午班：</span><span style="color: #2D2D2D;font-size: 14px;">13:55:00(开始)</span></div>
								<div style="margin-top: 20px;"><i class="el-icon-user-solid"></i><span style="color: #2D2D2D;font-size: 14px;">下午班：</span><span style="color: #2D2D2D;font-size: 14px;">14:00:00(结束)</span></div>
								
							</div>
						</div>
					</div>
					<!--footer-->
					<div style="height: 47px;border-top: 1px solid #E6E6EB;line-height: 47px;">
						<span style="width: 6px;height: 6px;border-radius: 100%;background: red;display: inline-block;margin-left: 16px;"></span>
						<span style="color: #666666;font-size: 13px;position: relative;top: 1px;line-height: 13px;">异常</span>
					</div>
				</div>
			</div>
		<div style="text-align:center;position:absolute;top:500px;left:300px;width:500px;height:150px">
		<span style="color:black">上午：</span>	<i :class="tubiao1" style="font-size:150px"></i>&nbsp;&nbsp;&nbsp;&nbsp;
		<span style="color:black">	下午：</span>	<i :class="tubiao2" style="font-size:150px"></i>
			<el-button type="success" v-if="daikai" @click="dk()">打卡</el-button>
			<el-button type="success" v-else disabled>打卡</el-button>
		</div>
	</div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
				name: "",
				data() {
					return {
						punchcard:{},
						tubiao1:"el-icon-s-release",
						tubiao2:"el-icon-s-release",
						date : new Date(),
						nowYear : new Date().getFullYear(),
						nowMonth : new Date().getMonth() + 1,
						nowDay : new Date().getDate(),
						splitString : "-",
						weekDays : new Array("日", "一", "二", "三", "四", "五", "六"),
						months : new Array("一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"),
						lastDays : new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31),
						checkYear : '',
						checkMonth : '',
						thisDayCount:'',//这个月有几天
						ThisWeekDayCounrt:"",//这个周有多少天
						calData:[],//真数据进行渲染页面
						
					}
				},
				computed:{
					daikai(){
						var oDate1=this.date;
						//上午
						var oDate2=new Date(this.nowYear+"/"+this.nowMonth+"/"+this.nowDay+" 07:55:00")
						var oDate3=new Date(this.nowYear+"/"+this.nowMonth+"/"+this.nowDay+" 08:00:00")
						//下午
						var oDate4=new Date(this.nowYear+"/"+this.nowMonth+"/"+this.nowDay+" 13:55:00")
						var oDate5=new Date(this.nowYear+"/"+this.nowMonth+"/"+this.nowDay+" 14:00:00")
							if(oDate1>oDate2&&oDate1<oDate3||oDate1>oDate4&&oDate1<oDate5){
								return true;
							}else{
								return false;
							}
						
					},
					...mapGetters(['getSessionuserrs','gettimedate'])
				},
				created: function() {
					var _this=this;
					_this.checkYear=_this.nowYear;
					_this.checkMonth=_this.nowMonth;
					
					setTimeout(function(){
				
						//初始调用服务请求
						let url = "beonzc/selectbeo";
							let parmas = new URLSearchParams();
							parmas.append("month", _this.nowMonth);
							parmas.append("empid",_this.getSessionuserrs.employee.empId);
						_this.$axios.post(url, parmas).then(response => {
								_this.calData=response.data //0、代表异常 1、上班
						}).catch((ex)=>{
							console.log(ex);
						});
						_this.getThisMonthDay(_this.checkYear,_this.checkMonth);
						_this.getThisWeekDay(_this.checkYear,_this.checkMonth,1)
					},1000)
					
				},
				mounted(){
					this.punselect();
				},
				methods: {
					punselect(){
						let url = "punzc/selectpun";
							let parmas = new URLSearchParams();
							parmas.append("date", this.date);
							parmas.append("empid", this.getSessionuserrs.employee.empId);
						this.$axios.post(url, parmas).then(response => {
								if(response.data!=null){
										this.punchcard=response.data;
										if(this.punchcard.punchStatusDate!=null){
											this.tubiao1="el-icon-s-claim"
										}
										if(this.punchcard.punchEndDate!=null){
											this.tubiao2="el-icon-s-claim"
										}
										
								}
						}).catch((ex)=>{
							console.log(ex);
						});
					},
					dk(){
						let url = "beonzc/selectcz";
							let parmas = new URLSearchParams();
							parmas.append("date", this.date);
						this.$axios.post(url, parmas).then(response => {
							if(response.data!=null){
							if(this.punchcard!=null){
									this.upd(response.data.beondutyId);
							}else{
									this.add(response.data.beondutyId);
									}	
							}else{
								this.$message({
								message: '今天不是工作日',
								type: 'error',
								duration:1000
							});
							};
						}).catch((ex)=>{
							console.log(ex);
						});
					},
					add(beondutyId){
						let url = "punzc/insertpun";
							let parmas = new URLSearchParams();
							parmas.append("beondutyid", this.punchcard.beondutyId);
							parmas.append("empid", this.getSessionuserrs.employee.empId);
						this.$axios.post(url, parmas).then(response => {
							this.$message({
							message: '打卡成功',
							type: 'success',
							duration:1000
							});		
						}).catch((ex)=>{
							console.log(ex);
						});
					},
					upd(beondutyId){
							let url = "punzc/updatepun";
							let parmas = new URLSearchParams();
							parmas.append("punchcard",this.punchcard);
						this.$axios.post(url, parmas).then(response => {
							this.$message({
							message: '打卡成功',
							type: 'success',
							duration:1000
							});	
						}).catch((ex)=>{
							console.log(ex);
						});
					},
					getdate:function(item){//点击天根据数据渲染右侧的内容
						console.log(item)
					},
					getThisDay:function () { //返回今天 重新获取今天的数据渲染页面； 
						this.checkYear = this.nowYear;
						this.checkMonth = this.nowMonth;
						
						//请求数据 this.http;
						this.requreData();
					},
					lastMonthClick:function () {//切换上一个月
						if (this.checkMonth == 1) {
							this.checkYear = this.checkYear - 1;
							this.checkMonth = 12;
						} else {
							this.checkMonth = this.checkMonth - 1;
						}
						
						//请求数据 this.http;
						this.requreData();
						
					},
					nextMonthClick:function () {//切换下一个月
						if (this.checkMonth == 12) {
							this.checkYear = this.checkYear + 1;
							this.checkMonth = 1;
						} else {
							this.checkMonth = this.checkMonth + 1;
						}
						
						//请求数据 this.http;
						this.requreData();
					},
					requreData:function(){
						//请求数据 this.http;
						this.getThisMonthDay(this.checkYear,this.checkMonth);
						this.getThisWeekDay(this.checkYear,this.checkMonth,1);
					},
					isLeapYear:function (year){
						var isLeap=false;
						if(0==year%4&&((year%100!=0)||(year%400==0))){
							isLeap=true;
						}
						return isLeap;
					},
					getThisMonthDay:function (year, month) {
						var thisDayCount = this.lastDays[month - 1];
						if ((month == 2) && this.isLeapYear(year)) {
							thisDayCount++;
						}
						this.thisDayCount=thisDayCount;
					},
					getThisWeekDay:function (year, month, date) {
						var thisDate = new Date(year, month - 1, date);
						this.ThisWeekDayCounrt=thisDate.getDay();
					},
					cumWeekDayCounrt:function(date){
						var thisDate = new Date(this.checkYear, this.checkMonth-1, date);
						return thisDate.getDay();
					}
				}
			}
</script>

<style  scoped>
body {
				margin: 0px;
				padding: 0px;
				/* background: #ddd; */
			}
			
			
			.everyWeekDay .weekday{
				display: -moz-inline-box;
				display: inline-block;
				text-align: center;
				/*height: 50px;*/
				line-height: 26px;
				width: 13.6%;
				border: 1px solid transparent;
				cursor: pointer;
				box-sizing: border-box;
			}
			.everyDay .days {/*解决span不支持width属性*/
				display: -moz-inline-box;
				display: inline-block;
				text-align: center;
				/*height: 50px;*/
				line-height: 50px;
				width: 13.6%;
				border: 1px solid transparent;
				cursor: pointer;
				box-sizing: border-box;
			}		
</style>
