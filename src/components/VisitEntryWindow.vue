<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 justify-end">
    <div class="p-5 flex flex-col">
      <label class="label">
        <span v-if="patientNameError === ''" class="label-text"
          >Patient's Name</span
        >
        <span v-else class="label-text text-red-500">{{
          patientNameError
        }}</span>
      </label>
      <div class="relative inline-block text-left dropdown z-10">
        <input
          type="text"
          class="py-2 z-10 input input-sm input-bordered w-full"
          v-model="form.patientName"
          autocomplete="off"
          placeholder="Patient's Name"
          @focus="filterNamesFocus"
          @change="filterNames"
        />
        <div
          class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-left -translate-y-2 scale-95"
        >
          <div
            class="absolute left-0 w-full mt-2 origin-top-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
            aria-labelledby="headlessui-menu-button-1"
            id="headlessui-menu-items-117"
            role="menu"
          >
            <li
              class="py-1 px-2 cursor-pointer list-none"
              v-for="patientName in filteredNames"
              :key="patientName"
              @click="setPatientName(patientName)"
            >
              <a>{{ patientName }}</a>
            </li>
          </div>
        </div>
      </div>
      <label class="label">
        <span class="label-text">Service</span>
      </label>
      <div class="relative z-0">
        <div class=" relative inline-block text-left dropdown w-full">
          <input
            type="text"
            class="input input-sm input-bordered w-full "
            v-model="form.service"
            autocomplete="off"
            placeholder="Service"
            @focus="filterServiceFocus"
            @change="filterService"
          />
          <input
            class="absolute right-0 top-0 rounded-l-none btn-sm bg-gray-600 rounded text-white lg:w-1/4 w-2/5"
            v-model="form.fee"
            placeholder="Fee"
          />
          <div
            class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-left -translate-y-2 scale-95"
          >
            <div
              class="absolute left-0 w-full mt-2 origin-top-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
              aria-labelledby="headlessui-menu-button-1"
              id="headlessui-menu-items-117"
              role="menu"
            >
              <li
                class="py-1 px-2 cursor-pointer list-none"
                v-for="serv in filteredService"
                :key="serv"
                @click="setService(serv)"
              >
                <a>{{ serv }}</a>
              </li>
            </div>
          </div>
        </div>
      </div>

      <label class="label">
        <span class="label-text">Location</span>
      </label>
      <input
        type="text"
        placeholder="Location"
        v-model="form.location"
        class="input input-sm input-bordered w-full"
      />
    </div>
    <div class="p-5">
      <label class="label">
        <span class="label-text">Date of visit</span>
      </label>
      <input
        type="text"
        placeholder="Date of visit"
        v-model="form.dateOfVisit"
        class="input input-sm input-bordered"
      />
      <label class="label">
        <span class="label-text">Units</span>
      </label>
      <input
        type="text"
        placeholder="Units"
        v-model="form.units"
        class="input input-sm input-bordered"
      />
      <label class="label">
        <span class="label-text">CPT Code</span>
      </label>
      <input
        type="text"
        placeholder="CPT Code"
        v-model="form.CPT"
        class="input input-sm input-bordered"
      />
    </div>
    <div class="p-5">
      <label class="label">
        <span class="label-text">Date of Birth</span>
      </label>
      <input
        type="text"
        placeholder="DOB"
        v-model="form.DOB"
        class="input input-sm input-bordered"
      />
      <label class="label">
        <span class="label-text">ICD</span>
      </label>
      <input
        type="text"
        placeholder="ICD"
        v-model="form.ICD"
        class="input input-sm input-bordered"
      />
      <label class="label">
        <span v-if="!abbrError" class="label-text">Provider</span>
        <span v-else class="label-text text-red-500">{{ abbrError }}</span>
      </label>
      <div class=" relative inline-block text-left dropdown">
        <input
          type="text"
          class="py-2 z-10 input input-sm input-bordered w-full"
          v-model="form.providerAbbr"
          autocomplete="off"
          placeholder="Provider"
          @focus="filterProviderAbbrFocus"
          @change="filterProviderAbbr"
        />
        <div
          class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-left -translate-y-2 scale-95"
        >
          <div
            class="absolute left-0 w-full mt-2 origin-top-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
            aria-labelledby="headlessui-menu-button-1"
            id="headlessui-menu-items-117"
            role="menu"
          >
            <li
              class="py-1 px-2 cursor-pointer list-none"
              v-for="abbr in filteredProviderAbbr"
              :key="abbr"
              @click="setProvider(abbr)"
            >
              <a>{{ abbr }}</a>
            </li>
          </div>
        </div>
      </div>
    </div>

    <div class="p-5 flex flex-col">
      <label
        class="cursor-pointer label"
        :class="[
          !isEditing &&
          form.service !== 'NESF' &&
          form.service !== 'IFSP Meeting'
            ? ''
            : 'invisible',
        ]"
      >
        <div>
          <span class="label-text">NESF</span>
        </div>
        <div class="flex items-stretch">
          <input
            type="checkbox"
            checked="checked"
            v-model="form.NESF"
            class="checkbox checkbox-primary"
          />
          <span class="checkbox-mark mt-4 self-center"></span>
        </div>
      </label>
      <label class="cursor-pointer label" :class="[!noEOB ? '' : 'invisible']">
        <div>
          <span class="label-text">EOB Received</span>
        </div>
        <div>
          <input
            type="checkbox"
            checked="checked"
            v-model="form.EOB"
            class="checkbox checkbox-primary"
          />
          <span class="checkbox-mark mt-4"></span>
        </div>
      </label>

      <label class="label">
        <span class="label-text">Comments</span>
      </label>
      <textarea
        v-model="form.comments"
        class="textarea h-24 textarea-bordered"
        placeholder="Comments"
      ></textarea>
    </div>
  </div>
  <div v-if="noInvoiceSelected" class="text-center text-red-500">
    {{ noInvoiceSelected }}
  </div>
  <div class="p-5 flex justify-center">
    <button
      v-if="!isEditing"
      class="btn btn-primary btn w-1/3"
      @click="submitVisit"
    >
      Add New Visit
    </button>
    <button v-else class="btn btn-primary btn w-1/3" @click="updateVisit">
      <span>Update Visit</span>
    </button>
  </div>
</template>

<script>
import { formatDate } from "../util";
export default {
  name: "VisitEntryWindow",
  data() {
    return {
      filteredNames: [],
      filteredProviderAbbr: [],
      filteredService: [],
      abbrError: "",
      patientNameError: "",
      isOpen: false,
      noEOB: false,
    };
  },
  mounted() {
    this.$store.state.isEditing = false;
  },
  methods: {
    getPayor() {
      return "Early Steps/Part C";
    },
    filterNamesFocus() {
      this.filterNames();
    },
    filterNames() {
      this.filteredNames = this.patients.filter((patientName) => {
        let matchingNames = [];
        if (patientName !== null) {
          matchingNames = patientName
            .toLowerCase()
            .startsWith(this.patientName.toLowerCase());
        }
        return matchingNames;
      });
    },
    filterServiceFocus() {
      this.filterService();
    },
    filterService() {
      this.filteredService = this.listPredefinedServices.filter((sName) => {
        let matchingNames = [];
        matchingNames = sName
          .toLowerCase()
          .startsWith(this.service.toLowerCase());
        return matchingNames;
      });
    },

    filterProviderAbbrFocus() {
      this.filterProviderAbbr();
    },
    filterProviderAbbr() {
      this.filteredProviderAbbr = this.providers.filter((providerAbbr) => {
        let matchingNames = [];
        matchingNames = providerAbbr
          .toLowerCase()
          .startsWith(this.providerAbbr.toLowerCase());
        return matchingNames;
      });
    },
    setPatientName(patientName) {
      this.$store.commit("set_matching_patient", patientName);
      this.isOpen = false;
    },
    setProvider(providerAbbr) {
      this.$store.commit("set_matching_provider_abbr", providerAbbr);
      this.isOpen = false;
      this.abbrError = "";
    },
    setService(serv) {
      this.$store.commit("set_matching_service", serv);
      this.isOpen = false;
    },
    updateVisit() {
      this.comments = this.comments.replace(/,/g, ";"); //remove commas
      this.comments = this.comments.replace(/\r?\n|\r/g, ";"); //removes new line

      this.$store.commit("update_visit", {
        Name: this.patientName,
        DOB: this.DOB,
        From: this.dateOfVisit,
        To: this.dateOfVisit,
        Service: this.service,
        CPT: this.CPT,
        ICD: this.ICD,
        Loc: this.location,
        Agency: this.agency,
        Provider: this.providerAbbr,
        Units: this.units,
        Fee: this.fee,
        Payor: this.getPayor(),
        EOB: this.EOB,
        Comments: this.comments,
      });

      this.$store.commit("add_patient", {
        Name: this.patientName,
        DOB: this.DOB,
        Service: this.service,
        CPT: this.CPT,
        ICD: this.ICD,
        Loc: this.location,
        Units: this.units,
        Provider: this.providerAbbr,
        Fee: this.fee,
      });

      this.$store.commit("save_file_to_csv", false);

      this.clearFields();
    },
    isError() {
      let error = false;

      if (Object.keys(this.$store.state.active_file).length === 0) {
        this.$store.commit(
          "set_no_invoice_selected",
          "*Please create an invoice."
        );
        error = true;
        return error;
      }

      if (!this.patientName) {
        this.patientNameError = "*Please provide a patient name";
        error = true;
        return error;
      }

      let providersMap = this.$store.state.providers;

      if (providersMap.size === 0) {
        this.abbrError = "*No providers found.";
        error = true;
      }

      return error;
    },
    submitVisit() {
      if (this.isError()) return;

      if (this.service.toLowerCase() === "nesf") {
        this.NESF = false;
        this.EOB = true;
      }
      if (this.service.toLowerCase() === "st consult") {
        this.EOB = true;
      }

      if (this.service.toLowerCase() === "ifsp meeting") {
        this.NESF = false;
        this.EOB = true;
      }

      if (this.NESF) {
        this.$store.commit("add_visit", {
          Name: this.patientName,
          DOB: this.DOB,
          From: this.dateOfVisit,
          To: this.dateOfVisit,
          Service: "NESF",
          CPT: 99600,
          ICD: this.ICD,
          Loc: this.location,
          Agency: this.agency,
          Provider: this.providerAbbr,
          Units: "1",
          Fee: "10.00",
          Payor: this.getPayor(),
          EOB: true,
          Comments: "",
        });
      }

      this.comments = this.comments.replace(/,/g, ";"); //remove commas
      this.comments = this.comments.replace(/\r?\n|\r/, ";"); //removes new line

      this.$store.commit("add_visit", {
        Name: this.patientName,
        DOB: this.DOB,
        From: this.dateOfVisit,
        To: this.dateOfVisit,
        Service: this.service,
        CPT: this.CPT,
        ICD: this.ICD,
        Loc: this.location,
        Agency: this.agency,
        Provider: this.providerAbbr,
        Units: this.units,
        Fee: this.fee,
        Payor: this.getPayor(),
        EOB: this.EOB,
        Comments: this.comments,
      });

      this.$store.commit("add_patient", {
        Name: this.patientName,
        DOB: this.DOB,
        Service: this.service,
        CPT: this.CPT,
        ICD: this.ICD,
        Loc: this.location,
        Units: this.units,
        Provider: this.providerAbbr,
        Fee: this.fee,
      });

      this.$store.commit("save_file_to_csv", false);

      this.clearFields();
    },
    clearFields() {
      this.patientName = "";
      this.dateOfVisit = formatDate(new Date());
      this.units = "";
      this.service = "";
      this.DOB = "";
      this.location = "";
      this.CPT = "";
      this.ICD = "";
      this.NESF = true;
      this.EOB = "";
      this.comments = "";
      this.providerAbbr = "";
      this.$store.state.isEditing = false;
      this.fee = "";

      this.error = false;
      this.patientNameError = "";
      this.abbrError = "";
    },
  },
  computed: {
    form() {
      return this.$store.state.form;
    },
    patients() {
      return Array.from(this.$store.state.patients.keys());
    },
    providers() {
      return this.$store.state.providers;
    },
    listPredefinedServices() {
      let services = [];
      for (const property in this.$store.state.listPredefinedServices) {
        services.push(property);
      }
      return services;
    },
    patientName: {
      get() {
        return this.$store.state.form.patientName;
      },
      set(value) {
        this.$store.commit("updatePatientName", value);
      },
    },
    dateOfVisit: {
      get() {
        return this.$store.state.form.dateOfVisit;
      },
      set(value) {
        this.$store.commit("updateDateOfVist", value);
      },
    },
    units: {
      get() {
        return this.$store.state.form.units;
      },
      set(value) {
        this.$store.commit("updateUnits", value);
      },
    },
    service: {
      get() {
        return this.$store.state.form.service;
      },
      set(value) {
        this.$store.commit("updateService", value);
      },
    },
    DOB: {
      get() {
        return this.$store.state.form.DOB;
      },
      set(value) {
        this.$store.commit("updateDOB", value);
      },
    },
    location: {
      get() {
        return this.$store.state.form.location;
      },
      set(value) {
        this.$store.commit("updateLocation", value);
      },
    },
    CPT: {
      get() {
        return this.$store.state.form.CPT;
      },
      set(value) {
        this.$store.commit("updateCPT", value);
      },
    },
    ICD: {
      get() {
        return this.$store.state.form.ICD;
      },
      set(value) {
        this.$store.commit("updateICD", value);
      },
    },
    providerAbbr: {
      get() {
        return this.$store.state.form.providerAbbr;
      },
      set(value) {
        this.$store.commit("updateProviderAbbr", value);
      },
    },
    NESF: {
      get() {
        return this.$store.state.form.NESF;
      },
      set(value) {
        this.$store.commit("updateNESF", value);
      },
    },
    EOB: {
      get() {
        return this.$store.state.form.EOB;
      },
      set(value) {
        this.$store.commit("updateEOB", value);
      },
    },
    comments: {
      get() {
        return this.$store.state.form.comments;
      },
      set(value) {
        this.$store.commit("updateComments", value);
      },
    },
    isEditing: {
      get() {
        return this.$store.state.isEditing;
      },
      set(value) {
        this.$store.commit("updateIsEditing", value);
      },
    },
    fee: {
      get() {
        return this.$store.state.form.fee;
      },
      set(value) {
        this.$store.commit("updateFee", value);
      },
    },
    agency() {
      return this.$store.state.form.agency;
    },
    noInvoiceSelected() {
      return this.$store.state.noInvoiceSelected;
    },
  },
  watch: {
    patientName() {
      this.filterNames();
      this.patientNameError = "";
    },
    providerAbbr() {
      this.filterProviderAbbr();
    },
    service() {
      if (
        this.service.toLowerCase() === "nesf" ||
        this.service.toLowerCase() === "st consult" ||
        this.service.toLowerCase() === "ifsp meeting"
      ) {
        this.noEOB = true;
      } else {
        this.noEOB = false;
      }
      this.filterService();
    },
  },
};
</script>
<style scoped>
.dropdown:focus-within .dropdown-menu {
  opacity: 1;
  transform: translate(0) scale(1);
  visibility: visible;
}
</style>
