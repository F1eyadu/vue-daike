const state = {
    user: {}
  }

  const getters = {
    user: state => state.user
  }

  const actions = {
    setUserInfo({ commit }, flag) {
      commit.commit('SET_USER', flag);
    }
  }

  const mutations = {
    SET_USER: (state, flag) => {
      state.user = flag;
    }
  }


export default {
    state,
    getters,
    actions,
    mutations
}