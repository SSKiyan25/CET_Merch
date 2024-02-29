<template>
  <nav class="fixed top-0 z-50 w-full bg-secondary border-muted border-b-2">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-black/50 rounded-lg sm:hidden hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary bg-secondary border-accent"
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
            to="/admin"
            class="flex items-center md:space-x-3 space-x-1 rtl:space-x-reverse"
          >
            <img src="/logo-3.png" class="h-8" alt="Logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap"
              >CS SHOPPEE</span
            >
          </router-link>
        </div>
        <div class="flex items-center">
          <div class="flex items-center ms-3">
            <div>
              <button
                type="button"
                class="flex text-sm bg-secondary border-accent rounded-full focus:ring-4 focus:ring-accent"
                aria-expanded="false"
                data-dropdown-toggle="dropdown-user"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="w-8 h-8 rounded-full saturate-0"
                  src="/avatar.png"
                  alt="user photo"
                  style="filter: brightness(0) invert(1)"
                />
              </button>
            </div>
          </div>
        </div>
        <!--User Dropdown-->
        <div
          class="z-50 hidden my-4 text-base list-none divide-y divide-primary/10 rounded shadow bg-secondary border-accent"
          id="dropdown-user"
        >
          <div class="px-4 py-3">
            <p class="text-sm dark:text-white">{{ username }}</p>
            <p
              class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
            >
              {{ userEmail }}
            </p>
          </div>
          <ul class="py-1">
            <li>
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
                >Dashboard</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
                >Settings</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
                >Sign out</a
              >
            </li>
          </ul>
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

const user = ref<User | null>(null); // explicitly declare the type of user ref
const userEmail = ref("");
const username = ref("");

auth.onAuthStateChanged(async (currentUser) => {
  if (currentUser) {
    user.value = currentUser;
    userEmail.value = currentUser.email || "";

    // Fetch the user's document from Firestore
    const userDoc = doc(db, "users", currentUser.uid); // replace "users" with your collection name
    const userSnap = await getDoc(userDoc);

    if (userSnap.exists()) {
      // The document exists, update the user data
      username.value = userSnap.data().username || ""; // replace "username" with your field name
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
