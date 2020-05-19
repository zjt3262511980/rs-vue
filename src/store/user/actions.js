export default{
    set_userrs({commit},userrs){
      sessionStorage.setItem("userrs",JSON.stringify(userrs));
      commit("mut_user",userrs);
    },
    userrsout({commit}){
      sessionStorage.removeItem('userrs');
      commit("mut_user",null);
    }

}