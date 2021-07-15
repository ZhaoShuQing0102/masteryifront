import { createStore } from 'vuex'

export default createStore({
  state: {
    notLogin:true
  },
  mutations: {
    changeLogin(state){
      state.notLogin=!state.notLogin
    }
  },
  actions: {
  },
  modules: {
  }
})
