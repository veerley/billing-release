import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { createStore } from "vuex";
import {
  parseVisit,
  saveFileToCsv,
  formatDate,
  sortByDate,
  sortByName,
} from "./util.js";
import {
  getDemoAgency,
  getDemoPatients,
  getDemoProviders,
} from "./demo_data.js";
const { ipcRenderer } = require("electron");

const store = createStore({
  state() {
    return {
      patients: new Map(),
      providers: [],
      visits: [],
      form: {
        patientName: "",
        dateOfVisit: formatDate(new Date()),
        units: "",
        service: "",
        DOB: "",
        location: "",
        CPT: "",
        ICD: "",
        providerAbbr: "",
        fee: "",
        agency: "",
        NESF: true,
        EOB: "",
        comments: "",
      },
      initialSetup: {
        hasSelectedDirectory: false,
        hasAddedKey: false,
        hasInputAgency: false,
        hasAddedProviders: false,
        hasFinished: false,
      },
      listPredefinedServices: {
        "Speech Therapy": {
          name: "Speech Therapy",
          fee: "71.44",
          CPT: "92507",
          units: "4",
        },
        "Speech Evaluation": {
          name: "Speech Evaluation",
          fee: "51.05",
          CPT: "92523",
          units: "1",
        },
        "Feeding Therapy": {
          name: "Feeding Therapy",
          fee: "71.44",
          CPT: "92507",
          units: "4",
        },
        "ST Consult": {
          name: "ST Consult",
          fee: "50.00",
          CPT: "CONSF",
          units: "4",
        },
        NESF: {
          name: "NESF",
          fee: "10.00",
          CPT: "99600",
          units: "1",
        },
        "IFSP Meeting": {
          name: "IFSP Meeting",
          fee: "18.75",
          CPT: "COIFP",
          units: "3",
        },
      },
      files: [],
      active_file: {},
      isEditing: false,
      editingVisitIndex: "",
      isAddingProvider: false,
      agencyName: "",
      visitsSelectedForMoving: new Set(),
      noInvoiceSelected: "",
      subscriptionType: "",
    };
  },
  mutations: {
    add_visit(state, visit) {
      state.visits.unshift(visit);
    },
    add_patient(state, patient) {
      let oldPatientMap = new Map();
      oldPatientMap = new Map(JSON.parse(localStorage.getItem("patients")));
      oldPatientMap.set(patient.Name, patient);
      localStorage.setItem(
        "patients",
        JSON.stringify(Array.from(oldPatientMap.entries()))
      );
      state.patients.set(patient.Name, patient);
    },
    set_patients(state, patients) {
      state.patients = patients;
    },
    set_matching_patient(state, patientName) {
      let patient = state.patients.get(patientName);
      state.form.patientName = patient.Name;
      state.form.units = patient.Units;
      state.form.service = patient.Service;
      state.form.DOB = patient.DOB;
      state.form.location = patient.Loc;
      state.form.ICD = patient.ICD;
      state.form.CPT = patient.CPT;
      state.form.providerAbbr = patient.Provider;
      state.form.fee = patient.Fee;
      state.form.agency = state.agencyName;
    },
    set_matching_provider_abbr(state, providerAbbr) {
      state.form.providerAbbr = providerAbbr;
    },
    set_matching_service(state, service) {
      state.form.service = service;
      state.form.fee = state.listPredefinedServices[service].fee;
      state.form.CPT = state.listPredefinedServices[service].CPT;
      state.form.units = state.listPredefinedServices[service].units;
    },
    updatePatientName(state, patientName) {
      state.form.patientName = patientName;
    },
    updateDateOfVist(state, dateOfVisit) {
      state.form.dateOfVisit = dateOfVisit;
    },
    updateUnits(state, units) {
      state.form.units = units;
    },
    updateService(state, service) {
      state.form.service = service;
    },
    updateFee(state, fee) {
      state.form.fee = fee;
    },
    updateDOB(state, DOB) {
      state.form.DOB = DOB;
    },
    updateLocation(state, location) {
      state.form.location = location;
    },
    updateCPT(state, CPT) {
      state.form.CPT = CPT;
    },
    updateICD(state, ICD) {
      state.form.ICD = ICD;
    },
    updateProviderAbbr(state, providerAbbr) {
      state.form.providerAbbr = providerAbbr;
    },
    updateNESF(state, NESF) {
      state.form.NESF = NESF;
    },
    updateEOB(state, EOB) {
      state.form.EOB = EOB;
    },
    updateComments(state, comments) {
      state.form.comments = comments;
    },
    set_files(state, files) {
      state.files = files;
    },
    set_active_file(state, index) {
      state.active_file = {
        path: state.files[index],
        index: index,
        content: "",
      };
    },
    set_file_content(state, fileContent) {
      state.active_file.content = fileContent;
      state.visits = parseVisit(fileContent);
    },
    save_file_to_csv(state, isReport) {
      let fileData = saveFileToCsv(state.visits, isReport);
      if (isReport) {
        ipcRenderer.send("save-file-to-csv", fileData);
      } else {
        ipcRenderer.send("save-file", state.active_file.path.path, fileData);
      }
    },
    reset_editing_state(state) {
      state.isEditing = false;
      state.editingVisitIndex = "";
    },
    editing_visit(state, index) {
      state.isEditing = true;
      state.editingVisitIndex = index;
      let visit = state.visits[index];

      this.commit("updateService", visit.Service);

      state.form = {
        patientName: visit.Name,
        dateOfVisit: visit.From,
        service: visit.Service,
        DOB: visit.DOB,
        location: visit.Loc,
        units: visit.Units,
        CPT: visit.CPT,
        ICD: visit.ICD,
        providerAbbr: visit.Provider,
        fee: visit.Fee,
        agency: visit.Agency,
        NESF: visit.NESF,
        EOB: visit.EOB,
        comments: visit.Comments,
      };
    },
    delete_visit(state, index) {
      state.visits.splice(index, 1);
      this.commit("save_file_to_csv", false);
    },
    update_visit(state, visit) {
      state.visits[state.editingVisitIndex] = visit;
      state.editingVisitIndex = "";
      this.commit("save_file_to_csv", false);
    },
    adding_provider(state) {
      state.isAddingProvider = true;
    },
    add_new_provider(state, provider) {
      let prevProviders = JSON.parse(localStorage.getItem("providers"));
      if (!prevProviders) prevProviders = [];
      prevProviders.push(provider);
      localStorage.setItem("providers", JSON.stringify(prevProviders));
      state.providers = prevProviders;
    },
    set_providers(state, providers) {
      state.providers = providers;
      this.commit("set_has_added_providers", true);
    },
    delete_provider(state, index) {
      state.providers.splice(index, 1);
      this.commit("update_providers");
    },
    update_providers(state) {
      localStorage.setItem("providers", JSON.stringify(state.providers));
    },
    set_has_directory(state, status) {
      state.initialSetup.hasSelectedDirectory = status;
    },
    set_agency(state, agencyName) {
      localStorage.setItem("agency", agencyName);
      state.agencyName = agencyName;
      state.initialSetup.hasInputAgency = true;
      state.form.agency = agencyName;
    },
    set_key(state, key) {
      localStorage.setItem("key", key);
      state.initialSetup.hasAddedKey = true;
    },
    set_has_added_providers(state, status) {
      state.initialSetup.hasAddedProviders = status;
    },
    set_has_finished_setup(state) {
      state.initialSetup.hasFinished = true;
      localStorage.setItem("setupDone", "true");
    },
    selected_visit(state, selectedVisitIndex) {
      if (state.visitsSelectedForMoving.has(selectedVisitIndex)) {
        state.visitsSelectedForMoving.delete(selectedVisitIndex);
      } else {
        state.visitsSelectedForMoving.add(selectedVisitIndex);
      }
    },
    async move_visits(state) {
      let sortedVisitsIndexes = Array.from(
        state.visitsSelectedForMoving
      ).sort();

      let visits = [];
      sortedVisitsIndexes.forEach((index) => {
        visits.push(state.visits[index]);
      });

      let fileData = saveFileToCsv(visits, false);
      await ipcRenderer.invoke("save-visits-to-file", fileData);
    },
    sort_by_date(state) {
      let sortedVisits = sortByDate(state.visits);
      state.visits = sortedVisits;
      this.commit("save_file_to_csv", false);
    },
    sort_by_name(state) {
      let sortedVisits = sortByName(state.visits);
      state.visits = sortedVisits;
      this.commit("save_file_to_csv", false);
    },
    set_no_invoice_selected(state, message) {
      state.noInvoiceSelected = message;
    },
    reset_errors(state) {
      state.noInvoiceSelected = "";
    },
    async set_demo_data() {
      localStorage.setItem("agency", getDemoAgency());
      this.commit("set_agency", getDemoAgency());
      localStorage.setItem("providers", getDemoProviders());
      let providers = JSON.parse(getDemoProviders());
      this.commit("set_providers", providers);
      localStorage.setItem("patients", getDemoPatients());
      let patients = new Map(JSON.parse(getDemoPatients()));
      this.commit("set_patients", patients);

      await ipcRenderer.invoke(
        "create-new-file",
        localStorage.getItem("directory"),
        "demo-file"
      );

      setTimeout(() => {
        this.commit("add_visit", {
          Name: "John Doe",
          DOB: "10/01/2019",
          From: "08/05/21",
          To: "08/05/21",
          Service: "Speech Therapy",
          CPT: "92507",
          ICD: "F80.2",
          Loc: "Home",
          Agency: "Demo Agency",
          Provider: "John Demo Provider",
          Units: "4",
          Fee: "71.44",
          Payor: "Early Steps/Part C",
          EOB: true,
          Comments: "",
        });

        this.commit("save_file_to_csv", false);
      }, 400);
    },
    set_subscription_type(state, type) {
      localStorage.setItem("subscriptionType", type);
      state.subscriptionType = type;
    },
    set_has_added_subscription_type(state) {
      state.initialSetup.hasAddedKey = true;
    },
  },
});

const app = createApp(App);
app.use(store);

app.mount("#app");
