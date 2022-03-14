import { createStore } from "vuex";
const store = createStore({
  state: {
    email: null,
    access_token: null,
  },
  mutations: {
    setEmail(state, email) {
      state.email = email;
    },
    setAccessToken(state, access_token) {
      state.access_token = access_token;
    },
  },
  actions: {},
  isLoggedIn(state) {
    return !!state.access_token;
  },
});

export default store;
