<template>
  <div id="main">
    <div v-if="isInitialSetupDone" class="flex h-screen">
      <Sidebar />
      <div class="h-screen w-full">
        <div v-if="!isAddingProvider" class="bg-gray-100">
          <VisitEntryWindow />
          <VisitViewWindow class="pb-5" />
        </div>
      </div>
    </div>

    <div v-else class="w-full py-6">
      <InitialSetupWindow />
    </div>

    <GenerateReport />
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import VisitEntryWindow from "./components/VisitEntryWindow.vue";
import VisitViewWindow from "./components/VisitViewWindow.vue";
import GenerateReport from "./components/GenerateReport.vue";
import InitialSetupWindow from "./components/InitialSetupWindow.vue";
const { ipcRenderer } = require("electron");

export default {
  name: "App",
  components: {
    Sidebar,
    VisitEntryWindow,
    VisitViewWindow,
    GenerateReport,
    InitialSetupWindow,
  },
  data() {
    return {
      directory: null,
    };
  },
  methods: {
    loadAndReadFiles() {
      ipcRenderer.send("load-files", this.directory);
    },
  },
  created() {
    //check initialSetup
    if (localStorage.getItem("directory") !== null) {
      this.directory = localStorage.getItem("directory");
      this.$store.commit("set_has_directory", true);
      this.loadAndReadFiles();
    }
    if (localStorage.getItem("subscriptionType") !== null) {
      this.$store.commit("set_has_added_subscription_type");
      this.$store.commit(
        "set_subscription_type",
        localStorage.getItem("subscriptionType")
      );
    }
    if (localStorage.getItem("agency") !== null) {
      let agency = localStorage.getItem("agency");
      this.$store.commit("set_agency", agency);
    }
    if (localStorage.getItem("providers") !== null) {
      let providers = JSON.parse(localStorage.getItem("providers"));
      this.$store.commit("set_providers", providers);
    }
    if (localStorage.getItem("patients") !== null) {
      let patients = new Map(JSON.parse(localStorage.getItem("patients")));
      this.$store.commit("set_patients", patients);
    }
    if (localStorage.getItem("setupDone") === "true") {
      this.$store.commit("set_has_finished_setup");
    }
    //----------

    ipcRenderer.on("selected-directory", (event, path) => {
      localStorage.setItem("directory", path);
      this.directory = path;
      this.$store.commit("set_has_directory", true);
    });

    ipcRenderer.on("selected-files", (event, files) => {
      this.$store.commit("set_files", files);
      if (files.length !== 0) {
        this.$store.commit("set_active_file", 0);
        ipcRenderer.send("load-file-data", this.$store.state.files[0].path);
      }
    });

    ipcRenderer.on("selected-file", (event, fileContent) => {
      this.$store.commit("set_file_content", fileContent);
    });
  },
  computed: {
    isAddingProvider() {
      return this.$store.state.isAddingProvider;
    },
    isInitialSetupDone() {
      return this.$store.state.initialSetup.hasFinished;
    },
  },
};
</script>
<style scoped></style>
