<template>
  <div id="app">
    <router-view />
    <my-footer />
  </div>
</template>
<script>
import { addTag } from "@/static/util/evaluate";
import config from "@/static/data/config";
export default {
  mounted() {
    addTag(
      config().jumpToEvaluate.appCode,
      config().jumpToEvaluate.appName,
      config().region.code,
      config().region.name,
      config().abilityCode,
      config().organCode
    );
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #f5f7fb;
}
</style>
<script setup>
import MyFooter from "@/components/Footer/index.vue";
</script>
