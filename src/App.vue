<template>
  <nav>
    <router-link v-if="access_token === null" to="/">Home</router-link> |
    <router-link v-if="access_token === null" to="/signup">SignUp</router-link>
    |
    <router-link v-if="access_token === null" to="/login">LogIn</router-link> |
    <router-link v-if="access_token !== null" to="/myBank">MyBank</router-link>
    <button
      class="btn btn-danger m-5"
      v-if="access_token !== null"
      @click="logout"
    >
      Logout
    </button>
  </nav>
  <div class="container"><router-view /></div>
</template>
<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  computed: mapState({
    access_token: (state) => state.access_token,
  }),
  methods: {
    ...mapMutations(["setEmail", "setAccessToken"]),
    async logout() {
      this.setEmail(null);
      this.setAccessToken(null);
      this.$router.push("/");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
