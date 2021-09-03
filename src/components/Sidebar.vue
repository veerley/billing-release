<template>
  <div class="p-5 rounded-box">
    <!-- Logo -->
    <div class="flex">
      <h1 class="font-bold font-xl">Leapstar Billing</h1>
    </div>
    <!-- Nav -->
    <div class="">
      <ul class="menu pt-4">
        <li class="menu-title">
          <span>
            Invoices
          </span>
        </li>
        <li v-for="(file, index) in files" :key="index">
          <a @click="selectFile(index)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="inline-block w-5 h-5 mr-2 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            {{ file.name }}
          </a>
        </li>
        <li>
          <a>
            <label for="new-report" class="flex text-gray-400 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                /></svg
              ><span class="">New Invoice </span>
            </label>
          </a>
        </li>
      </ul>

      <input type="checkbox" id="new-report" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">
          <label class="label">
            <span class="label-text">New Invoice Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            v-model="newReportName"
            class="input input-bordered"
          />
          <div class="modal-action">
            <label
              for="new-report"
              class="btn btn-primary"
              @click="newReportNameButton(newReportName)"
              >Accept</label
            >
            <label for="new-report" class="btn">Close</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");
export default {
  name: "Sidebar",
  data() {
    return {
      newReportName: "",
      show: true,
    };
  },
  methods: {
    selectFile(index) {
      this.$store.commit("reset_editing_state");
      this.$store.commit("set_active_file", index);
      ipcRenderer.send("load-file-data", this.files[index].path);
    },
    async newReportNameButton(name) {
      await ipcRenderer.invoke(
        "create-new-file",
        localStorage.getItem("directory"),
        name
      );
      this.$store.commit("reset_errors");
    },
  },
  computed: {
    files() {
      return this.$store.state.files;
    },
  },
};
</script>
<style scoped></style>
