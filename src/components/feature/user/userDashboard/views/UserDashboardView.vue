<template>
  <UserSidebar />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";
import UserSidebar from "../views/UserSidebarView.vue";

onMounted(() => {
  initFlowbite();
});
</script>
