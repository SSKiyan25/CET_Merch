<template>
  <NavBar />
  <AdminSidebar />
  <div class="p-4 ml-2 sm:ml-64 pb-16">
    <div class="flex flex-row justify-start py-10">
      <div class="flex">
        <span class="material-symbols-outlined p-2 text-5xl">
          shopping_bag
        </span>
      </div>
      <div class="flex flex-col">
        <h1 class="text-2xl">User Orders</h1>
        <p class="text-sm py-1">
          View and manage user orders. You can filter by status, date range or
          search for a specific order.
        </p>
      </div>
    </div>
    <div class="flex flex-col p-4 border-2 rounded-lg py-5">
      <div class="flex flex-row border-b-2">
        <h1 class="font-bold text-xl tracking-wide mb-2">Orders List</h1>
      </div>
      <div>test</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/admin/dashboard/views/AdminNavBar.vue";
import AdminSidebar from "@/components/admin/dashboard/views/AdminSidebar.vue";
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
});
</script>
