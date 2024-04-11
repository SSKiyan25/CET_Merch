<template>
  <nav class="w-full sticky top-0 bg-accent border-primary/20 border-b z-40">
    <div class="px-0 pl-0">
      <div class="flex items-center justify-between p-3">
        <div class="flex items-center justify-start rtl:justify-end">
          <button
            v-if="
              $route.name &&
              typeof $route.name === 'string' &&
              ![
                'launchPage',
                'login',
                'signup',
                'adminDashboard',
                'adminProducts',
                'adminAddProduct',
                'adminEditProduct',
                'adminOrders',
                'adminInbox',
                'product',
                'confirmOrder',
                'products',
                'submitOrder',
                'contactUs',
                'aboutUs',
              ].includes($route.name)
            "
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
            <div class="flex flex-row items-center md:pr-12">
              <router-link to="/">
                <img src="/logo-2.png" class="w-8 h-8 md:w-14 md:h-14" />
              </router-link>
              <router-link to="/">
                <span
                  class="text-xs md:text-2xl lg:text-2xl uppercase text-primary font-bold truncate"
                >
                  <span>CET STORE</span>
                </span>
              </router-link>
            </div>
            <div class="flex flex-row items-center">
              <div
                class="hidden md:block border-black border-opacity-60 space-x-2"
              >
                <router-link
                  to="/"
                  class="hover:opacity-80 hover:bg-background-slate-600"
                  active-class="text-red-700 underline underline-offset-2 font-bold"
                >
                  <span class="text-black">Home </span>
                </router-link>
                <router-link
                  to="/products"
                  class="border-l border-black border-opacity-60"
                  active-class="text-red-700 underline underline-offset-2 font-bold"
                >
                  <span class="text-black pl-2">Products</span>
                </router-link>
                <router-link
                  to="/aboutUs"
                  class="border-l border-black border-opacity-60"
                  active-class="text-red-700 underline underline-offset-2 font-bold"
                >
                  <span class="text-black pl-2">About Us</span>
                </router-link>
                <router-link
                  to="/contactUs"
                  class="border-l border-black border-opacity-60"
                  active-class="text-red-700 underline underline-offset-2 font-bold"
                >
                  <span class="text-black pl-2">Contact Us</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-row justify-end items-center w-full md:order-2 pr-2"
        >
          <div class="relative w-2/5 md:w-full max-w-sm items-center">
            <Input
              id="search"
              type="text"
              v-model="searchTerm"
              @focus="isSearchFocused = true"
              @blur="() => $nextTick(() => (isSearchFocused = false))"
              placeholder="Search Product..."
              class="pl-8 text-[10px] md:text-sm md:pl-12 dark:opacity-50"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <Search
                class="size-4 md:size-6 text-foreground text-xs md:text-sm"
              />
            </span>

            <div
              v-if="isSearchFocused && filteredProducts.length > 0"
              class="search-results absolute bg-background border rounded-b-xl w-full p-3 space-y-2"
            >
              <div
                v-for="product in filteredProducts"
                :key="product.id"
                class="hover:bg-primary/10 p-2 cursor-pointer text-xs"
                @mousedown="$router.push(`/product/${product.id}`)"
              >
                <div class="flex flex-row items-center justify-between">
                  <span> {{ product.name }}</span>
                  <span class="material-symbols-outlined text-xs">
                    arrow_outward
                  </span>
                </div>
              </div>
            </div>
            <div
              v-else-if="isSearchFocused && searchTerm"
              class="search-results text-xs absolute bg-background border rounded-b-xl w-full p-3 space-y-2"
            >
              No Results Found
            </div>
          </div>
          <!--Sign In/Up Icons-->
          <div
            v-if="!user"
            class="flex md:order-2 md:space-x-0 rtl:space-x-reverse"
          >
            <div class="flex flex-row items-center justify-end md:space-x-1">
              <router-link
                to="/login"
                class="font-medium rounded-lg text-[10px] md:text-sm px-3 py-2 md:px-5 md:py-2.5 items-center"
              >
                Login
              </router-link>
              <router-link
                to="/signup"
                class="bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-lg px-3 py-1 md:px-5 md:py-2.5 items-center"
              >
                <span class="text-[10px] md:text-sm"> Sign up</span>
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
                <SheetContent class="bg-gray-100">
                  <SheetHeader>
                    <SheetTitle> Cart </SheetTitle>
                    <SheetDescription></SheetDescription>
                  </SheetHeader>
                  <div v-for="(order, index) in orderData" :key="index">
                    <div class="flex flex-col flex-wrap py-6">
                      <div class="flex flex-row items-center">
                        <span class="material-symbols-outlined">
                          <span class="material-symbols-outlined">
                            add_shopping_cart
                          </span>
                        </span>
                        <Label class="pl-1"> Cart Number: </Label>
                        <Label class="ml-2 text-primary">
                          {{ index + 1 }}</Label
                        >
                      </div>
                      <div v-if="order.cart.length > 0">
                        <div
                          v-for="(product, productIndex) in order.cart"
                          :key="productIndex"
                        >
                          <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                              <AccordionTrigger>
                                <div class="flex justify-between">
                                  <span class="text-primary text-xs pr-1"
                                    >{{
                                      product.product
                                        ? product.product.name
                                        : "Product not found"
                                    }}
                                    -
                                  </span>
                                  <span class="text-primary text-xs">
                                    {{
                                      product.product
                                        ? product.product.faction
                                        : "Product not found"
                                    }}
                                  </span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div
                                  class="flex justify-between px-4 text-[10px] md:text-sm"
                                >
                                  <label
                                    >Quantity: {{ product.quantity }}
                                  </label>

                                  <label v-if="product.size !== 'N/A'"
                                    >Size: {{ product.size }}
                                  </label>
                                  <label
                                    >Total Price: {{ product.totalPrice }}
                                  </label>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose as-child v-if="!ifCartEmpty">
                        <div class="flex flex-row items-center space-x-2">
                          <router-link
                            :to="{
                              name: 'confirmOrder',
                              params: { id: order.id },
                            }"
                          >
                            <Button>Edit Cart</Button>
                          </router-link>
                          <router-link
                            :to="{
                              name: 'confirmOrder',
                              params: { id: order.id },
                            }"
                          >
                            <button
                              class="p-2.5 text-sm bg-emerald-600 text-white rounded-sm"
                              type="submit"
                            >
                              Submit Order
                            </button>
                          </router-link>
                        </div>
                      </SheetClose>
                    </SheetFooter>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div
              v-if="dropdownUserVisible"
              class="absolute z-50 mt-56 -ml-12 text-base list-none divide-y divide-primary rounded shadow bg-slate-100 border-accent max-w-48"
              id="dropdown-user"
              v-on:focusout="dropdownUserVisible = false"
              tab-index="0"
            >
              <div class="px-4 py-3">
                <p class="text-sm text-primary">{{ username }}</p>
              </div>
              <ul class="py-1">
                <li v-if="isSeller">
                  <router-link
                    to="/admin"
                    class="block px-4 py-2 text-sm text-black hover:bg-primary/20"
                    role="menuitem"
                    >Seller Dashboard
                  </router-link>
                </li>
                <li>
                  <router-link
                    to="/dashboard"
                    class="block px-4 py-2 text-sm text-black hover:bg-primary/20"
                    role="menuitem"
                    >Dashboard
                  </router-link>
                </li>
                <li>
                  <router-link
                    to="/dashboard/orders"
                    class="block px-4 py-2 text-sm text-black hover:bg-primary/20 pointer-events-auto cursor-pointer"
                    role="menuitem"
                  >
                    Orders
                  </router-link>
                </li>
                <li>
                  <a
                    @click.prevent="handleSignout"
                    class="block px-4 py-2 text-sm text-black hover:bg-primary/20 pointer-events-auto cursor-pointer"
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
  computed,
  onBeforeUnmount,
  watch,
} from "vue";
import { initFlowbite } from "flowbite";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/firebase/init";
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";
import { User as UserIcon } from "lucide-vue-next";
import { Search } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { setup as setupSearchController } from "../controllers/searchProductController";
import {
  getOnQueueOrdersController,
  orderDataWithProduct,
} from "../controllers/orderSheetController";

const router = useRouter();
const user = ref<User | null>(null);
const userEmail = ref("");
const username = ref("");
const isSeller = ref(false);
const searchTerm = ref("");
const isSearchFocused = ref(false);
const { products } = setupSearchController();

const filteredProducts = computed(() => {
  if (!searchTerm.value) {
    return [];
  }
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const dropdownUserVisible = ref(false);

const toggleUserDropdown = () => {
  dropdownUserVisible.value = !dropdownUserVisible.value;
  console.log(
    "toggleUserDropdown called, dropdownUserVisible:",
    dropdownUserVisible.value
  );
};
const closeDropdown = (event: any) => {
  const dropdownUser = document.getElementById("dropdown-user");
  if (dropdownUser && !dropdownUser.contains(event.target)) {
    dropdownUserVisible.value = false;
  }
};

onMounted(() => {
  document.addEventListener("scroll", closeDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});

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
      if (userSnap.data().role == "seller" || userSnap.data().role == "admin") {
        isSeller.value = true;
      }
    } else {
      console.error("No such document!");
    }
  } else {
    user.value = null;
    userEmail.value = "";
    username.value = "";
    isSeller.value = false;
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

//Cart Sheet
const orderData = ref<orderDataWithProduct[] | null>(null);
const ifCartEmpty = computed(() => {
  return orderData.value?.every((order) => order.cart.length === 0) ?? true;
});

onMounted(() => {
  const onQueueOrdersWithProduct = getOnQueueOrdersController();

  watch(onQueueOrdersWithProduct, (newOrders) => {
    if (newOrders) {
      orderData.value = newOrders.filter(
        (result: any) => result.orderStatus === "OnQueue"
      );
    }
    console.log("orderData: ", orderData.value);
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
