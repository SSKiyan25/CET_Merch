<template>
  <UserSidebar />
  <div class="p-4 ml-2 sm:ml-64">
    <div class="flex flex-row justify-start py-10">
      <div class="flex">
        <span class="material-symbols-outlined py-2 px-2 text-5xl">
          dashboard
        </span>
      </div>
      <div class="flex flex-col">
        <h1 class="text-2xl">Welcome to the Your Profile</h1>
        <p class="text-sm py-1 text-secondary-foreground/60">
          This is the your dashboard where you can manage your orders, inbox,
          and other settings from here.
        </p>
      </div>
    </div>

    <div class="flex flex-col p-4 border-2 rounded-lg">
      <div class="flex flex-row border-b-2">
        <h1 class="font-bold text-xl text-primary tracking-wide pb-2">
          General Information
        </h1>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-8 pl-4 pb-4 text-sm"
      >
        <div>
          <span class="font-semibold">Username: </span>
          <span class="pl-2 opacity-80">TestUserName</span>
        </div>
        <div>
          <span class="font-semibold">Email: </span>
          <span class="pl-2 underline opacity-80">test@gmail.com</span>
        </div>
        <div></div>

        <div>
          <span class="font-semibold">Name: </span>
          <span class="pl-2 opacity-80">Test User</span>
        </div>
        <div>
          <span class="font-semibold">Student ID: </span>
          <span class="pl-2 opacity-80"> 20-1-01709 </span>
        </div>
        <div>
          <span class="font-semibold">Department: </span>
          <span class="pl-2 opacity-80">DCST</span>
        </div>
        <div>
          <span class="font-semibold">Phone: </span>
          <span class="pl-2 opacity-80">+8801234567890</span>
        </div>
        <div></div>

        <div></div>
      </div>
      <div class="flex flex-row border-t pt-2 pr-2 justify-end items-center">
        <Button variant="destructive">Edit</Button>
      </div>
    </div>

    <div class="flex flex-col p-4 mt-16 border-2 rounded-lg">
      <div class="flex flex-row border-b-2">
        <h1 class="font-bold text-xl text-primary tracking-wide pb-2">
          Recent Order
        </h1>
      </div>
      <div class="pt-8">
        <div class="flex flex-col border pt-2 pb-4">
          <div class="flex flex-row justify-between py-2 px-3">
            <div>
              <span class="text-sm font-semibold"
                >Order Reference Number:
              </span>
              <span class="pl-2 text-primary font-semibold">#12345</span>
            </div>
            <div>
              <span class="text-xs">Date Ordered: March 28, 2024</span>
            </div>
          </div>
          <div class="px-2">
            <div
              class="flex flex-row items-center bg-secondary rounded-lg w-1/3 h-18"
            >
              <div class="p-4">
                <img src="/1-Lanyard.png" class="w-40 h-auto rounded-sm" />
              </div>
              <div
                class="flex flex-col text-xs space-y-2 whitespace-normal text-wrap"
              >
                <span>Product Name: New T-Shirt</span>
                <span>Size: M</span>
                <span>Quantity: 2</span>
                <span>Total Amount: P150.00</span>
              </div>
            </div>
          </div>

          <div class="flex flex-row justify-between pt-4 px-4">
            <div>
              <span>Status: </span>
              <Button variant="destructive" class="cursor-default">
                <span>Not Paid</span>
              </Button>
            </div>
            <div>
              <span
                >Total Payment:
                <span class="text-primary font-semibold underline"
                  >P150.00
                </span>
              </span>
              <span class="pl-1">(Cash)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="pb-12"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";
import { Button } from "@/components/ui/button";
import UserSidebar from "../views/UserSidebarView.vue";

onMounted(() => {
  initFlowbite();
});
</script>
