<script setup lang="ts">
import NavigationBar from "../src/components/navigation/views/NavigationView.vue";
import Footer from "../src/components/footer/Footer.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <NavigationBar />
  <main>
    <RouterView />
  </main>
  <Footer
    :class="{
      'is-hidden':
        $route.name === 'adminDashboard' ||
        $route.name === 'adminProducts' ||
        $route.name === 'adminAddProduct' ||
        $route.name === 'adminEditProduct' ||
        $route.name === 'adminOrders',
    }"
  />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.is-hidden {
  display: none;
}
</style>
