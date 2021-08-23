<template>
  <div v-if="isInitialSetupDone" class="fixed bottom-10 right-10 z-50">
    <div class="grid grid-cols-2 gap-3">
      <button
        class="btn btn-primary shadow-xl"
        :class="[visitsSelectedForMoving.size > 0 ? '' : 'invisible']"
        @click="moveVisits"
      >
        Move Visits
      </button>
      <button class="btn btn-primary shadow-xl" @click="exportToCSV">
        Generate Invoice
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GenerateReport",
  methods: {
    exportToCSV() {
      this.$store.commit("save_file_to_csv", true);
    },
    moveVisits() {
      this.$store.commit("move_visits");
    },
  },
  computed: {
    visitsSelectedForMoving() {
      return this.$store.state.visitsSelectedForMoving;
    },
    isInitialSetupDone() {
      return this.$store.state.initialSetup.hasFinished;
    },
  },
};
</script>
<style scoped></style>
