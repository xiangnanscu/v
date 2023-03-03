<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<template>
  <router-link to="Test">Test</router-link>
  <RouterView />
</template>
