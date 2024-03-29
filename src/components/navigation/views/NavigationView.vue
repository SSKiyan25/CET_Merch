<template>
  <nav
    class="w-full sticky top-0 bg-secondary border-primary/20 md:px-5 border-b z-40"
  >
    <div class="px-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between p-3">
        <div class="flex items-center justify-start rtl:justify-end">
          <button
            @click.prevent="toggleSidebar"
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
            to="/"
            class="flex items-center md:space-x-3 space-x-1 rtl:space-x-reverse"
          >
            <img src="/logo-3.png" class="h-8" alt="Logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap"
              >CET Merchandise
            </span>
          </router-link>
        </div>
        <!--Sign In/Up Icons-->
        <div
          v-if="!user"
          class="flex md:order-2 md:space-x-0 rtl:space-x-reverse"
        >
          <div class="flex-auto justify-end md:space-x-1">
            <router-link
              to="/login"
              class="font-medium rounded-lg md:text-sm text-xs px-4 py-2 md:px-5 md:py-2.5"
            >
              Login
            </router-link>
            <router-link
              to="/signup"
              class="bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5"
            >
              Sign up
            </router-link>
          </div>
        </div>
        <!--User Dropdown-->
        <div
          v-else
          class="relative flex justify-between md:order-2 items-center w-[6rem]"
        >
          <div class="flex">
            <button>
              <span class="material-symbols-outlined text-2xl">
                shopping_cart
              </span>
            </button>
          </div>
          <div class="flex items-center ms-3">
            <div>
              <button
                type="button"
                @click.prevent="toggleUserDropdown"
                class="flex text-sm bg-secondary border-accent rounded-full focus:ring-4 focus:ring-accent"
                :aria-expanded="dropdownUserVisible"
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

          <div
            :class="{ hidden: !dropdownUserVisible }"
            class="absolute z-50 mt-56 -ml-12 text-base list-none divide-y divide-primary/10 rounded shadow bg-secondary border-accent"
            id="dropdown-user"
          >
            <div class="px-4 py-3">
              <p class="text-sm dark:text-white">{{ username }}</p>
            </div>
            <ul class="py-1">
              <li>
                <router-link
                  to="/dashboard"
                  class="block px-4 py-2 text-sm text-muted-foreground hover:bg-primary/20"
                  role="menuitem"
                  >Dashboard
                </router-link>
              </li>
              <li>
                <a
                  class="block px-4 py-2 text-sm text-muted-foreground hover:bg-primary/20 pointer-events-auto cursor-pointer"
                  role="menuitem"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  @click.prevent="handleSignout"
                  class="block px-4 py-2 text-sm text-muted-foreground hover:bg-primary/20 pointer-events-auto cursor-pointer"
                  role="menuitem"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, inject, Ref } from "vue";
import { initFlowbite } from "flowbite";
import { auth } from "@/firebase/init.ts";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/init.ts";
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";

const router = useRouter();
const user = ref<User | null>(null);
const userEmail = ref("");
const username = ref("");

const dropdownUserVisible = ref(false);

const toggleUserDropdown = () => {
  dropdownUserVisible.value = !dropdownUserVisible.value;
};

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

const handleSignout = () => {
  signOut(auth)
    .then(() => {
      router.push({ name: "login" });
      console.log("User signed out");
    })
    .catch((error) => {
      console.log("Error signing out: ", error);
    });
};

// Add type assertions here
const isSidebarVisible = inject<Ref<boolean>>("isSidebarVisible");
const toggleSidebar = inject<() => void>("toggleSidebar");

onMounted(() => {
  initFlowbite();
});

watchEffect(() => {
  window.addEventListener("resize", () => {
    if (isSidebarVisible) {
      isSidebarVisible.value = window.innerWidth > 768;
    }
  });
});

defineExpose({
  toggleSidebar,
  toggleUserDropdown,
  handleSignout,
  dropdownUserVisible,
  username,
  userEmail,
  user,
});
</script>
