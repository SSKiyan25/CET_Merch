<template>
  <nav class="w-full sticky top-0 bg-accent border-primary/20 border-b z-40">
    <div class="px-0 pl-0">
      <div class="flex items-center justify-between p-3">
        <div class="flex items-center justify-start rtl:justify-end">
          <button
            @click.prevent="toggleSidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-black/50 rounded-lg sm:hidden hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary border-accent"
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
          <div
            class="flex flex-row items-center justify-center h-full max-w-1/2 text-center absolute text-background"
          >
            <div class="flex flex-row items-center pr-12">
              <router-link to="/">
                <img src="/logo-2.png" class="w-auto h-14" />
              </router-link>
              <router-link to="/">
                <span
                  class="text-2xl md:text-2xl lg:text-2xl uppercase text-primary font-bold truncate"
                >
                  <span>CET STORE</span>
                </span>
              </router-link>
            </div>

            <div class="border-l border-black border-opacity-60 space-x-2">
              <router-link
                to="/"
                class="hover:opacity-80 hover:bg-background-slate-600"
              >
                <span class="text-black pl-2">Home </span>
              </router-link>
              <router-link
                to="/products"
                class="border-l border-black border-opacity-60"
              >
                <span class="text-black pl-2">Products</span>
              </router-link>
              <router-link
                to="/contactUs"
                class="border-l border-black border-opacity-60"
              >
                <span class="text-black pl-2">Contact Us</span>
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="flex flex-row justify-end items-center w-full md:order-2 pr-2"
        >
          <div class="relative w-1/3 md:w-full max-w-sm items-center">
            <Input
              id="search"
              type="text"
              placeholder="Search..."
              class="pl-8 dark:opacity-50"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <Search
                class="size-4 md:size-6 text-foreground text-xs md:text-sm"
              />
            </span>

            <span
              class="absolute end-0 inset-y-0 flex items-center justify-center px-2 opacity-60"
            >
              <button><SlidersHorizontal class="size-4 md:size-6" /></button>
            </span>
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
          <div v-else class="flex justify-between items-center w-[6rem] pr-2">
            <div class="flex flex-row items-center ms-6">
              <button
                type="button"
                @click.prevent="toggleUserDropdown"
                class="flex text-sm bg-secondary border-accent rounded-full focus:ring-4 focus:ring-accent"
                :aria-expanded="dropdownUserVisible"
              >
                <span class="sr-only">Open user menu</span>
                <div class="">
                  <UserIcon />
                </div>
              </button>
            </div>
            <div></div>
            <div class="flex pt-1 items-center">
              <Sheet>
                <SheetTrigger as-child>
                  <button>
                    <span class="material-symbols-outlined text-2xl">
                      shopping_cart
                    </span>
                  </button>
                </SheetTrigger>
              </Sheet>
            </div>

            <div
              :class="{ hidden: !dropdownUserVisible }"
              class="absolute z-50 mt-56 -ml-12 text-base list-none divide-y divide-secondary/50 rounded shadow bg-secondary-foreground border-accent max-w-48"
              id="dropdown-user"
            >
              <div class="px-4 py-3">
                <p class="text-sm text-secondary">{{ username }}</p>
              </div>
              <ul class="py-1">
                <li>
                  <router-link
                    to="/dashboard"
                    class="block px-4 py-2 text-sm text-secondary/70 hover:bg-primary/20"
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
        <!--Search-->
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  watchEffect,
  inject,
  Ref,
  onUnmounted,
  reactive,
} from "vue";
import { initFlowbite } from "flowbite";
import { auth } from "@/firebase/init.ts";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/init.ts";
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";
import { User as UserIcon } from "lucide-vue-next";
import { Search } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal } from "lucide-vue-next";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
//import Cart from "@/components/feature/user/userOrder/views/AddToCartView.vue";

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

const state = reactive({
  isMobile: false,
});

const checkScreenSize = () => {
  state.isMobile = window.innerWidth <= 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
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
