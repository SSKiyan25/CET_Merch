<template>
  <nav class="sticky top-0 z-50 w-full bg-accent border-primary/20 border-b-2">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-black/50 rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-primary border-accent"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <router-link
            to="/"
            class="flex items-center md:space-x-3 space-x-1 rtl:space-x-reverse"
          >
            <img src="/logo-2.png" class="h-8" alt="Logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap"
              >CET</span
            >
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import { auth } from "@/firebase/init.ts";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/init.ts";

onMounted(() => {
  initFlowbite();
});

const user = ref<User | null>(null);
const userEmail = ref("");
const username = ref("");

auth.onAuthStateChanged(async (currentUser) => {
  if (currentUser) {
    user.value = currentUser;
    userEmail.value = currentUser.email || "";

    // Fetch the user's document from Firestore
    const userDoc = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userDoc);

    if (userSnap.exists()) {
      // The document exists, update the user data
      username.value = userSnap.data().username || "";
    } else {
      console.error("No such document!");
    }
  } else {
    user.value = null;
    userEmail.value = "";
    username.value = "";
  }
});
</script>
