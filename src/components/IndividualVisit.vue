<template>
  <!-- Visit Info -->

  <div
    class="grid grid-cols-12 p-2 my-2 bg-gray-100 shadow text-sm text-gray-600 font-light"
  >
    <div class="flex col-span-1 justify-center items-center">
      <input
        type="checkbox"
        @click="selectedVisit(index)"
        v-model="checkVisit"
        class="h-4 w-4"
      />
    </div>
    <div class="flex flex-col col-span-2 justify-between items-center">
      <div class="self-start font-medium text-lg">{{ visit.Name }}</div>
      <div class="self-start font-light text-sm text-gray-600">
        {{ visit.From }}
      </div>
    </div>
    <div
      class="flex flex-col col-span-2 justify-between leading-relaxed items-center"
    >
      <div class="self-start"><span>Service: </span> {{ visit.Service }}</div>
      <div class="self-start"><span>CPT: </span> {{ visit.CPT }}</div>

      <div class="self-start"><span>Location: </span> {{ visit.Loc }}</div>
    </div>

    <div class="flex flex-col col-span-2 justify-between leading-relaxed">
      <div class="self-start"><span>Provider: </span> {{ visit.Provider }}</div>
      <div class="self-start">
        <span>Units Per Hour: </span> {{ visit.Units }}
      </div>

      <div v-if="visit.ICD" class="self-start">
        <span>ICD: </span> {{ visit.ICD }}
      </div>
    </div>
    <div class="flex justify-center items-center col-span-1">
      <div
        v-if="
          visit.Service.toLowerCase() !== 'nesf' &&
            visit.Service.toLowerCase() !== 'st consult' &&
            visit.Service.toLowerCase() !== 'ifsp meeting'
        "
        :class="[
          visit.EOB
            ? 'badge bg-green-200 border-0 text-gray-700 font-bold text-center'
            : 'badge bg-yellow-200 border-0 text-gray-700 font-bold text-center',
        ]"
      >
        {{ visit.EOB === true ? "Received EOB" : "Waiting EOB" }}
      </div>
    </div>
    <div
      class="flex flex-col justify-between justify-center items-center col-span-2"
    >
      <div><span v-if="visit.Comments !== ''">Comments:</span></div>
      <div>{{ visit.Comments }}</div>
    </div>
    <div class="flex justify-center col-span-2 items-center mx-1">
      <a
        @click="editVisit(index)"
        class="text-gray-400 hover:text-gray-800 mr-3 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </a>
      <a
        @click="deleteVisit(index)"
        class="text-gray-400 hover:text-gray-800  ml-3 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndividualVisit",
  props: ["visit", "index"],
  data() {
    return {
      checkVisit: false,
    };
  },
  methods: {
    editVisit(index) {
      this.$store.commit("editing_visit", index);
      const element = document.getElementById("main");
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset,
        behavior: "smooth",
      });
    },
    deleteVisit(index) {
      this.$store.commit("delete_visit", index);
    },
    selectedVisit(index) {
      this.$store.commit("selected_visit", index);
    },
  },
};
</script>
<style module></style>
