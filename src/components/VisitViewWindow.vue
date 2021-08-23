<template>
  <div class="pt-1 bg-white pb-40">
    <div class="flex justify-center my-2 bg-gray-600 shadow">
      <h1 v-if="reportName !== null" class="py-2 text-2xl font-bold text-white">
        {{ reportName }}
      </h1>
    </div>
    <div v-if="reportName !== null" class="flex space-x-2">
      <span class="mr-2">Sort By</span>
      <select
        v-model="selectedFilter"
        class="select select-bordered w-1/4 max-w-xs select-sm"
      >
        <option v-for="filterName in filteredNames" :key="filterName">{{
          filterName
        }}</option>
      </select>
      <button
        @click="filterBy"
        class="btn-sm bg-transparent text-gray-600 dark:text-gray-400  hover:bg-gray-100 dark:hover:text-gray-800 dark:hover:bg-white border rounded border-gray-600 dark:border-gray-400"
      >
        Filter
      </button>
    </div>

    <div v-for="(visit, index) in visits" :key="index">
      <IndividualVisit
        :visit="visit"
        :index="index"
        :class="[isEditingVisit(index) ? $style.editingBorder : '']"
      />
    </div>
  </div>
</template>

<script>
import IndividualVisit from "./IndividualVisit.vue";
export default {
  name: "VisitViewWindow",
  components: {
    IndividualVisit,
  },
  data() {
    return {
      selectedFilter: "",
      filterName: "",
      filteredNames: ["", "Name", "Date"],
    };
  },
  methods: {
    isEditingVisit(index) {
      if (index === this.$store.state.editingVisitIndex) {
        return true;
      }
      return false;
    },
    filterBy() {
      if (this.selectedFilter === "Date") {
        this.$store.commit("sort_by_date");
      } else if (this.selectedFilter === "Name") {
        this.$store.commit("sort_by_name");
      }
    },
  },
  computed: {
    visits() {
      return this.$store.state.visits;
    },
    isEditing() {
      return this.$store.state.isEditing;
    },
    reportName() {
      const active_file = this.$store.state.active_file;
      if (
        Object.keys(active_file).length !== 0 &&
        active_file.path !== undefined
      ) {
        return this.$store.state.active_file.path.name;
      }
      return null;
    },
  },
};
</script>
<style module>
.editingBorder {
  @apply border border-indigo-400 bg-yellow-100 !important;
}
</style>
