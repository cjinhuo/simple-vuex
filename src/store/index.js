import Vue from 'vue'
// import Vuex from './Vuex_source'
import Vuex from './Vuex_mine'
// console.log('source', Vuex)
// console.log('mine', _Vuex)

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    count: 1
  },
  getters: {
    getNum: state => {
      return state.count
    }
  },
  mutations:{
    increment(state, n) {
      state.count += n
    }
  },
  actions: {
    increment({ commit }){
      setTimeout(() => {
        commit('increment', 2)
      }, 500)
    }
  }
})
