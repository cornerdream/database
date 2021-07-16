const theme = {
  state: {
    time:'',
    body:window.localStorage.getItem('theme')||''
  },

  mutations: {
    SET_TIME:(state, time) => {    
      state.time = time;
      window.localStorage.setItem('time',time)    
    },
    SET_BODY: (state, body) => {    
      state.body = body;
      window.localStorage.setItem('theme',body)    
    },
  },

  actions: {   
    GetBody({commit},data){
      commit('SET_BODY',data)
    } 
  }
}

export default theme
