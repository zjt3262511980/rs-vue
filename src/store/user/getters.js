export default{
    getSessionuserrs(state){
        return state.userrs;
    },

    getUserName(state){
        return state.employee.empName!=null?state.employee.name:null;
    }
}