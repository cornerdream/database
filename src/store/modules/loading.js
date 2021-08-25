
const load = {
    state: {
      loading:false,  
    },
  
    mutations: {
      SET_SHOW:(state) => {    
        state.loading = true;    
      },
      SET_HIDE: (state) => {    
        state.loading = false;
      }
    },
  
    actions: {   
      ShowLoading({commit}){
        commit('SET_SHOW')    
      },
      HideLoading({commit}){
        commit('SET_HIDE')    
      }
    }
  }
  
  export default load
  