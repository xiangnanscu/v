<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<template>
  <h1>Test Vite Bug</h1>
  <RouterView />
</template>
