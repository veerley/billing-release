<template>
  <div>
    <h1>Start Using Leapstar Billing</h1>
    <button class="my-5 btn btn-primary" @click="done">
      Done
    </button>
  </div>
</template>
<script>
export default {
  name: "Finished",
  methods: {
    done() {
      this.$store.commit("set_has_finished_setup");
    },
  },
};
</script>
