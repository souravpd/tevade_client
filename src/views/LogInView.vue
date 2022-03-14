<template>
  <div class="home">
    <div class="alert alert-primary" role="alert" v-if="message">
      {{ message }}
    </div>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="email">Email</label>
        <input name="email" type="email" v-model="email" required />
      </div>
      <div class="mb-3">
        <label for="password"> Password </label>
        <input
          name="password"
          id="password"
          type="password"
          v-model="password"
          required
        />
      </div>
      <div class="mb-3">
        <input type="submit" value="submit" />
      </div>
    </form>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      message: "",
    };
  },
  methods: {
    ...mapMutations(["setEmail", "setAccessToken"]),
    async login() {
      const { email, password } = this;
      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success === true) {
        const { email, access_token } = data.results;
        this.setEmail(email);
        this.setAccessToken(access_token);
        this.$router.push("/");
      } else {
        this.message = "Something Went Wrong";
      }
    },
  },
};
</script>