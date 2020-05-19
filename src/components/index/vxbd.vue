<template>
    <div class="">

      <!--生成微信登录二维码-->
       <div style="width:450px;height:500px;">
			<wxlogin :href="href" :appid="appid" :scope="scope" :redirect_uri="redirect_uri">
            </wxlogin>
        <div>你的账号：{{user.nickname}}</div>
       <el-button type="primary" v-if="user.openid!=null" @click="banden">绑定</el-button>
       <el-button type="primary" v-else disabled>绑定</el-button>
       </div>

       
    </div>
</template>

<script>
import wxlogin from 'vue-wxlogin'
import $ from 'jquery'
import {mapGetters,mapActions} from 'vuex'
export default {
    name: "",
    data() {
        return {
      user:{},
      appid:"wx7287a60bb700fd21",
      scope:"snsapi_login",
      redirect_uri:"http://www.txjava.cn/Login/banden",
      href:"data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge3dpZHRoOiAyMTBweDt9Ci5pbXBvd2VyQm94IC5pY29uMzhfbXNnLnN1Y2Mge2Rpc3BsYXk6IG5vbmV9Ci5pbXBvd2VyQm94IC5pY29uMzhfbXNnLndhcm4ge2Rpc3BsYXk6IG5vbmV9Ci5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246IGNlbnRlcjt9Cg=="
   
        }
    },
     components: {
       wxlogin,
  },
    methods: {
        banden(){
              let url = "Login/insetvx";
							let parmas = new URLSearchParams();
                            parmas.append("appid",this.user.openid);
                            parmas.append("userid",this.getSessionuserrs.userId);
						this.$axios.post(url, parmas).then(response => {
                            if(response.data>0){
                                this.$message({
                                message: '绑定成功',
                                type: 'success',
                                duration:1000
                            });
                            }else{
                                this.$message({
                            message: '绑定失败，已经绑定',
                            type: 'error',
                            showClose:true
                            });
                            }
						}).catch((ex)=>{
							console.log(ex);
                        });
        }
    },
       computed:{
        ...mapGetters(['getSessionuserrs','gettimedate'])
    },
    mounted(){
        let url="http://www.txjava.cn/Login/select";
        this.$axios.get(url).then(response => {
            this.user=response.data;
        });
    }
}
</script>

<style  scoped>
</style>
