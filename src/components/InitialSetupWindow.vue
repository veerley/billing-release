<template>
  <h1 class="text-2xl py-20 text-center">
    Initial Setup Required.
  </h1>
  <!-- https://tailwindcomponents.com/component/steps-bar -->

  <div class="flex">
    <div class="w-1/4">
      <div class="relative mb-2">
        <div
          class="w-10 h-10 mx-auto rounded-full text-lg flex items-center"
          :class="[
            initialSetup.hasSelectedDirectory
              ? 'bg-green-500 text-white'
              : 'bg-white border-2 border-gray-200',
          ]"
        >
          <span
            class="text-center w-full"
            :class="[
              initialSetup.hasSelectedDirectory
                ? 'text-white'
                : 'text-gray-600',
            ]"
          >
            <svg
              class="w-full fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
          </span>
        </div>
      </div>

      <div class="text-xs text-center md:text-base">
        Select Invoices Folder
      </div>
    </div>

    <div class="w-1/4">
      <div class="relative mb-2">
        <div
          class="absolute flex align-center items-center align-middle content-center"
          style="width: calc(100% - 2.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)"
        >
          <div
            class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1"
          >
            <div
              class="w-0 bg-green-300 py-1 rounded"
              :class="[initialSetup.hasSelectedDirectory ? 'w-full' : 'w-0']"
            ></div>
          </div>
        </div>

        <div
          class="w-10 h-10 mx-auto rounded-full text-lg flex items-center"
          :class="[
            initialSetup.hasAddedKey
              ? 'bg-green-500 text-white'
              : 'bg-white border-2 border-gray-200',
          ]"
        >
          <span
            class="text-center w-full flex justify-center"
            :class="[initialSetup.hasAddedKey ? 'text-white' : 'text-gray-600']"
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
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </span>
        </div>
      </div>

      <div class="text-xs text-center md:text-base">Add Key</div>
    </div>

    <div class="w-1/4">
      <div class="relative mb-2">
        <div
          class="absolute flex align-center items-center align-middle content-center"
          style="width: calc(100% - 2.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)"
        >
          <div
            class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1"
          >
            <div
              class="w-0 bg-green-300 py-1 rounded"
              :class="[initialSetup.hasAddedKey ? 'w-full' : 'w-0']"
            ></div>
          </div>
        </div>

        <div
          class="w-10 h-10 mx-auto rounded-full text-lg flex items-center"
          :class="[
            initialSetup.hasInputAgency
              ? 'bg-green-500 text-white'
              : 'bg-white border-2 border-gray-200',
          ]"
        >
          <span
            class="text-center w-full flex justify-center"
            :class="[
              initialSetup.hasInputAgency ? 'text-white' : 'text-gray-600',
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              />
            </svg>
          </span>
        </div>
      </div>

      <div class="text-xs text-center md:text-base">Add Agency</div>
    </div>

    <div class="w-1/4">
      <div class="relative mb-2">
        <div
          class="absolute flex align-center items-center align-middle content-center"
          style="width: calc(100% - 2.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)"
        >
          <div
            class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1"
          >
            <div
              class="w-0 bg-green-300 py-1 rounded"
              :class="[initialSetup.hasInputAgency ? 'w-full' : 'w-0']"
            ></div>
          </div>
        </div>

        <div
          class="w-10 h-10 mx-auto rounded-full text-lg flex items-center"
          :class="[
            initialSetup.hasAddedProviders
              ? 'bg-green-500 text-white'
              : 'bg-white border-2 border-gray-200',
          ]"
        >
          <span class="text-center w-full">
            <svg
              class="w-full fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                class="heroicon-ui"
                d="M19 10h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2h-2a1 1 0 0 1 0-2h2V8a1 1 0 0 1 2 0v2zM9 12A5 5 0 1 1 9 2a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h5a5 5 0 0 1 5 5v2z"
              />
            </svg>
          </span>
        </div>
      </div>

      <div class="text-xs text-center md:text-base">Add Provider(s)</div>
    </div>

    <div class="w-1/4">
      <div class="relative mb-2">
        <div
          class="absolute flex align-center items-center align-middle content-center"
          style="width: calc(100% - 2.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)"
        >
          <div
            class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1"
          >
            <div
              class="w-0 bg-green-300 py-1 rounded"
              :class="[initialSetup.hasAddedProviders ? 'w-full' : 'w-0']"
            ></div>
          </div>
        </div>

        <div
          class="w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center"
          :class="[
            initialSetup.hasAddedProviders
              ? 'bg-green-500 text-white'
              : 'bg-white border-2 border-gray-200',
          ]"
        >
          <span
            class="text-center w-full"
            :class="[
              initialSetup.hasAddedProviders ? 'text-white' : 'text-gray-600',
            ]"
          >
            <svg
              class="w-full fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                class="heroicon-ui"
                d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
              />
            </svg>
          </span>
        </div>
      </div>

      <div class="text-xs text-center md:text-base">Finished</div>
    </div>
  </div>

  <div class="py-20 text-center text-lg">
    <SelectReportsFolder v-if="!initialSetup.hasSelectedDirectory" />
    <AddKey v-else-if="!initialSetup.hasAddedKey" />
    <AddAgency v-else-if="!initialSetup.hasInputAgency" />
    <AddProviders v-else-if="!initialSetup.hasAddedProviders" />
    <Finished v-else-if="!initialSetup.hasFinished" />
  </div>
</template>
<script>
import SelectReportsFolder from "./InitialSteps/SelectReportsFolder.vue";
import AddKey from "./InitialSteps/AddKey.vue";
import AddAgency from "./InitialSteps/AddAgency.vue";
import AddProviders from "./InitialSteps/AddProviders.vue";
import Finished from "./InitialSteps/Finished.vue";
export default {
  name: "InitialSetupWindow",
  components: {
    SelectReportsFolder,
    AddKey,
    AddAgency,
    AddProviders,
    Finished,
  },
  data() {
    return {};
  },
  computed: {
    initialSetup() {
      return this.$store.state.initialSetup;
    },
  },
};
</script>
