import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topRatedMovies: null,
    randomPickData: null,
    wannaWatch: []
  },
  getters: {
  },
  mutations: {
    TOPRATED_MOVIES(state, ml) {
      state.topRatedMovies = ml
    },
    WANNA_MOVIES(state, mN) {
      state.wannaWatch.push({mN, is_completed: false})
    }
  },
  actions: {
    topRatedMovies(context, topRatedMoviesList) {
      context.commit('TOPRATED_MOVIES', topRatedMoviesList)
    },
    createWannaWatchMovie(context, movieName) {
      context.commit('WANNA_MOVIES', movieName)
    }
  },
  modules: {
  }
})
