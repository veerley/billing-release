<template>
  <div class="py-2 flex justify-center">
    <div class="form-control w-1/2">
      <label class="label">
        <span class="label-text">Agency Name</span>
      </label>
      <div class="flex space-x-2">
        <input
          type="text"
          v-model="agencyName"
          placeholder="Agency Name"
          class="w-full input input-primary"
        />
        <button class="btn btn-primary" @click="addNewAgency(agencyName)">
          Done
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddAgency",
  data() {
    return {
      agencyName: "",
    };
  },
  methods: {
    addNewAgency(agencyName) {
      this.$store.commit("set_agency", agencyName);
    },
  },
};
</script>
