<template>
  <div class="py-2 flex justify-center">
    <div class="form-control w-1/2">
      <label class="label">
        <span class="label-text">Enter Email</span>
      </label>
      <div class="flex space-x-2">
        <input
          type="text"
          v-model="email"
          placeholder="Email"
          class="w-full input input-primary"
          @input="this.error = false"
        />
      </div>
      <label class="label">
        <span class="label-text">Enter Key</span>
      </label>
      <div class="flex space-x-2">
        <input
          type="text"
          v-model="key"
          placeholder="Key"
          class="w-full input input-primary"
          @input="this.error = false"
        />
      </div>
      <div class="py-2 text-sm text-red-500" v-if="error">
        {{ error }}
      </div>
      <div class="pt-5">
        <button class="btn btn-primary px-10" @click="addKey(key, email)">
          Done
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "AddKey",
  data() {
    return {
      key: "",
      email: "",
      error: "",
    };
  },
  methods: {
    async addKey(key, email) {
      try {
        await axios
          .request({
            method: "POST",
            url: "https://billing-server-api.herokuapp.com/v1/valid",
            headers: { "content-type": "application/json" },
            data: {
              email,
              key,
            },
          })
          .then(async () => {
            this.$store.commit("set_key", key);
            const resp = await axios.get(
              `https://billing-server-api.herokuapp.com/v1/subscription?email=${email}`
            );
            this.$store.commit(
              "set_subscription_type",
              resp.data.subscriptionType
            );
            if (resp.data.subscriptionType === "DEMO") {
              this.$store.commit("set_has_finished_setup");
              this.$store.commit("set_demo_data");
            }
          });
      } catch (err) {
        this.error =
          "Incorrect email or key. Make sure the email and key match the ones used when you created the account.";
      }
    },
  },
};
</script>
