<script setup lang="ts">
import NavigationBar from "../src/components/navigation/views/NavigationView.vue";
import UserSidebar from "../src/components/feature/user/userDashboard/views/UserSidebarView.vue";
import Footer from "../src/components/footer/Footer.vue";
import { RouterView } from "vue-router";
import { ref, provide } from "vue";

const isSidebarVisible = ref(window.innerWidth > 768);

// Define the toggleSidebar function
const toggleSidebar = () => {
  console.log("toggleSidebar called");
  isSidebarVisible.value = !isSidebarVisible.value;
};

// Provide isSidebarVisible and toggleSidebar
provide("isSidebarVisible", isSidebarVisible);
provide("toggleSidebar", toggleSidebar);
</script>

<template>
  <NavigationBar
    :class="{
      'is-hidden':
        $route.name === 'adminDashboard' ||
        $route.name === 'adminProducts' ||
        $route.name === 'adminAddProduct' ||
        $route.name === 'adminEditProduct' ||
        $route.name === 'adminOrders' ||
        $route.name === 'adminInbox',
    }"
  />
  <UserSidebar
    v-if="isSidebarVisible"
    :class="{
      'is-hidden':
        $route.name === 'launchPage' ||
        $route.name === 'login' ||
        $route.name === 'signup' ||
        $route.name === 'adminDashboard' ||
        $route.name === 'adminProducts' ||
        $route.name === 'adminAddProduct' ||
        $route.name === 'adminEditProduct' ||
        $route.name === 'adminOrders' ||
        $route.name === 'adminInbox' ||
        $route.name === 'product' ||
        $route.name === 'confirmOrder' ||
        $route.name === 'products' ||
        $route.name === 'submitOrder' ||
        $route.name === 'contactUs',
    }"
  />
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
        $route.name === 'adminOrders' ||
        $route.name === 'adminInbox' ||
        $route.name === 'userDashboard' ||
        $route.name === 'userOrders',
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
