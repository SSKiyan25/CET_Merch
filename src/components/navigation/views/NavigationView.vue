<template>
  <nav class="min-w-screen bg-secondary border-accent md:px-10 border-b-2 z-50">
    <div class="flex items-center justify-between p-4">
      <div class="flex">
        <router-link
          to="/"
          class="flex items-center md:space-x-3 space-x-1 rtl:space-x-reverse"
        >
          <img src="/logo-3.png" class="h-8" alt="Logo" />
          <span class="self-center text-xl font-semibold whitespace-nowrap"
            >CS SHOPPEE</span
          >
        </router-link>
      </div>
      <div class="flex md:order-2 md:space-x-0 rtl:space-x-reverse">
        <div class="flex-auto justify-end md:space-x-1">
          <router-link
            to="/login"
            class="bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5"
          >
            Login
          </router-link>
          <router-link
            to="/signup"
            class="font-medium rounded-lg md:text-sm text-xs px-4 py-2 md:px-5 md:py-2.5"
          >
            Sign up
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
});
</script>
