<template>
  <div
    class="grid grid-cols-2 p-5 my-2 bg-gray-100 shadow text-sm text-gray-600 font-light"
  >
    <div class="self-start font-medium text-lg">{{ provider }}</div>

    <div class="flex justify-center items-center mx-1">
      <a
        @click="deleteProvider(index)"
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
  name: "IndividualProvider",
  props: ["provider", "index"],
  methods: {
    deleteProvider(index) {
      this.$store.commit("delete_provider", index);
    },
  },
};
</script>
<style module></style>
