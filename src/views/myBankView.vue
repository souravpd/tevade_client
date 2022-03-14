<template>
  <div class="home">
    <div class="alert alert-primary" role="alert" v-if="message">
      {{ message }}
    </div>
    <div class="card mb-5">
      <div class="card-body">
        <h5 class="card-title">Account Number: {{ accountNumber }}</h5>
        <h5 class="card-title">Country Code: +{{ countryCode }}</h5>
        <h5 class="card-title">Phone Number +{{ phone }}</h5>
        <p class="card-text">Amount: {{ amount }}</p>
      </div>
    </div>
    <form @submit.prevent="addMoney">
      <div class="mb-3">
        <label for="Money">Money</label>
        <input name="money" type="number" v-model="money" required />
      </div>
      <div class="mb-3">
        <input type="submit" value="Add Money" />
      </div>
    </form>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      money: "",
      message: "",
      accountNumber: "",
      amount: "",
      countryCode: "",
      phone: "",
    };
  },
  computed: mapState({
    access_token: (state) => state.access_token,
    email: (state) => state.email,
  }),
  created() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
      const response = await fetch("http://localhost:8000/bank/myBank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: this.access_token,
        },
        body: JSON.stringify({
          email: this.email,
        }),
      });
      const data = await response.json();
      console.log(data);
      this.accountNumber = data.results.passbook_number;
      this.amount = data.results.amount;
      this.phone = data.results.phone_number;
      this.countryCode = data.results.country_code;
    },
    async addMoney() {
      const { money } = this;
      const response = await fetch("http://localhost:8000/bank/addMoney", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: this.access_token,
        },
        body: JSON.stringify({
          money: money,
          email: this.email,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success === true) {
        this.amount = this.amount + this.money;
        this.$router.push("/myBank");
      } else {
        this.message = "We Cannot process your request";
      }
    },
  },
};
</script>