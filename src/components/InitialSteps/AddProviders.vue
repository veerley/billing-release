<template>
  <div class="flex">
    <div class="form-control w-1/2 mx-5">
      <label class="label">
        <span class="label-text">Provider Name</span>
      </label>
      <div class="flex space-x-2">
        <input
          type="text"
          v-model="providerName"
          placeholder="Provider"
          class="w-full input input-primary"
        />
        <button
          class="btn btn-primary"
          @click="addNewProvider(providerName)"
          :disabled="isProviderButtonDisabled"
        >
          Add
        </button>
      </div>
    </div>
    <div v-if="providers.length > 0" class="w-1/2 mx-5">
      <h1 class="text-xl font-bold">
        List of Providers
      </h1>
      <div v-for="(p, index) in providers" :key="index">
        <IndividualProvider :provider="p" :index="index" />
      </div>
    </div>
  </div>
  <div v-if="providers.length > 0" class="mt-10 flex justify-center">
    <button class="my-5 btn btn-primary" @click="done">
      Done
    </button>
  </div>
</template>

<script>
import IndividualProvider from "../IndividualProvider.vue";
export default {
  name: "AddProviders",
  components: {
    IndividualProvider,
  },
  data() {
    return {
      providerName: "",
      isProviderButtonDisabled: false,
    };
  },
  methods: {
    resetFields() {
      this.providerName = "";
    },
    addNewProvider(providerName) {
      this.$store.commit("add_new_provider", providerName);
      this.resetFields();
    },
    done() {
      this.$store.commit("set_has_added_providers", true);
    },
  },
  computed: {
    providers() {
      return this.$store.state.providers;
    },
    subscriptionType() {
      return this.$store.state.subscriptionType;
    },
  },
  watch: {
    providers() {
      if (this.subscriptionType === "TEAM" && this.providers.length === 1) {
        this.isProviderButtonDisabled = false;
      } else {
        this.isProviderButtonDisabled = true;
      }
    },
  },
};
</script>
<style scoped></style>
