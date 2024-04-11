<template>
  <NavBar />
  <AdminSidebar />

  <div class="p-4 ml-2 sm:ml-64">
    <div class="flex flex-row justify-start py-10">
      <div class="flex">
        <span class="material-symbols-outlined py-2 px-2 text-5xl">
          dashboard
        </span>
      </div>
      <div class="flex flex-col">
        <h1 class="text-2xl">Welcome to the Seller Dashboard</h1>
        <p class="text-sm py-1 text-secondary-foreground/60">
          This is the admin dashboard. You can manage your products, users, and
          other settings from here.
        </p>
      </div>
    </div>
    <div class="flex flex-row flex-nowrap justify-start pb-4">
      <div class="flex flex-col p-4 rounded-lg py-3">
        <div class="flex flex-row">
          <h1 class="font-semibold text-xl tracking-wide">Dashboard Reports</h1>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          <div
            class="flex flex-col items-start bg-gradient-to-br from-gold to-light-gold rounded-sm space-x-4 w-80 h-32 p-4 shadow-lg"
          >
            <div class="flex items-center space-x-4 pt-2">
              <router-link to="admin/inbox" class="bg-blue-600 p-2 rounded-sm">
                <span class="material-symbols-outlined p-2 text-4xl text-white">
                  mail
                </span>
              </router-link>
              <div class="flex flex-col">
                <span class="text-lg font-base">Unread Messages</span>
                <span class="font-bold text-primary">
                  {{ totalUnreadMessages }}
                </span>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col items-start bg-gradient-to-br from-gold to-light-gold rounded-sm space-x-4 w-80 h-32 p-4 shadow-lg"
          >
            <div class="flex items-center space-x-4 pt-2">
              <router-link to="admin/orders" class="bg-red-600 p-2 rounded-sm">
                <span class="material-symbols-outlined text-white p-2 text-4xl">
                  pending_actions
                </span>
              </router-link>
              <div class="flex flex-col">
                <span class="text-lg font-base whitespace-nowrap"
                  >Pending Orders</span
                >
                <span class="font-bold text-primary">{{
                  totalPendingOrders
                }}</span>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col items-start bg-gradient-to-br from-gold to-light-gold rounded-sm space-x-4 w-80 h-32 p-4 shadow-lg"
          >
            <div class="flex items-center space-x-4 pt-2">
              <router-link
                to="admin/products"
                class="bg-green-600 p-2 rounded-sm"
              >
                <span class="material-symbols-outlined p-2 text-4xl text-white">
                  inventory
                </span>
              </router-link>
              <div class="flex flex-col">
                <span class="text-lg font-base whitespace-nowrap"
                  >Total Products</span
                >
                <span class="font-bold text-primary">{{ totalProducts }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isAdmin" class="flex flex-col p-4 border-2 rounded-lg py-5">
      <div class="flex flex-row border-b-2">
        <h1 class="font-bold text-xl tracking-wide">Featured Images</h1>
        <div class="p-1">
          <!-- Upload Featured Image -->
          <Popover v-model="isUploadPopoverOpen">
            <PopoverTrigger>
              <button title="Add an Image to be Featured">
                <span class="material-symbols-outlined text-emerald-300">
                  add_box
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div class="border-b-2 border-accent px-1 py-1">
                <h2>Upload Image</h2>
              </div>
              <form @submit.prevent="uploadFeaturedImage">
                <div class="flex flex-col items-center py-2 space-y-4">
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    class="border-none items-center h-15"
                    @change="onFileChange"
                  />
                  <!--Popup for success-->
                  <AlertDialog v-model="isSuccessPopoverOpen">
                    <AlertDialogTrigger>
                      <button
                        type="submit"
                        class="border-2 bg-secondary border-horder rounded-lg p-2 text-sm text-secondary-foreground"
                      >
                        Add Featured Image
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Image Uploaded Successfully
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Your image has been uploaded successfully. You can now
                          view it in the featured images section.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction @click="handleContinueClick"
                          >Continue</AlertDialogAction
                        >
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </form>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-5">
        <div
          v-for="url in imageUrls"
          :key="url"
          class="relative flex items-end"
        >
          <img class="h-auto max-w-full rounded-lg" :src="url" alt="" />
          <AlertDialog>
            <AlertDialogTrigger class="absolute w-full text-end"
              ><button
                class="p-3 hover:text-destructive text-destructive-foreground bg-destructive rounded-br-lg hover:bg-gray-200"
                title="Delete Image"
              >
                <span class="material-symbols-outlined"> delete </span>
              </button></AlertDialogTrigger
            >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Image</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this image?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  @click="() => deleteFeaturedImage(url)"
                  class="bg-destructive text-destructive-foreground"
                >
                  Delete
                </AlertDialogAction>
                <AlertDialogAction
                  class="bg-secondary text-secondary-foreground"
                >
                  Cancel
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  </div>
  <div class="p-4 ml-2 sm:ml-64 pb-28">
    <div class="flex flex-col p-4 border-2 rounded-lg">
      <div class="flex flex-row border-b-2 border-primary pb-2">
        <h1 class="font-bold text-xl tracking-wide">Products Statistics</h1>
      </div>
      <div class="p-5 overflow-auto">
        <table class="min-w-full divide-y divide-primary/50">
          <thead>
            <tr>
              <th class="text-left p-2">Product Name</th>
              <th class="text-center p-2">Category</th>
              <th class="text-center p-2">Views</th>
              <th class="text-center p-2">Total Orders</th>
              <th class="text-center p-2">Sales</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" class="py-4 text-xs">
              <td class="text-left p-2">{{ product?.name }}</td>
              <td class="text-center p-2">{{ product?.category }}</td>
              <td class="text-center p-2">{{ product?.views }}</td>
              <td class="text-center p-2">{{ product?.totalOrders }}</td>
              <td class="text-center p-2">{{ product?.totalSales }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import NavBar from "../views/AdminNavBar.vue";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { setup as setupControllerFeatured } from "../controllers/adminUploadFeaturedController";
import { useRouter } from "vue-router";
import AdminSidebar from "../views/AdminSidebar.vue";
import {
  fetchProductsForSeller,
  fetchTotalPendingOrders,
  fetchTotalUnreadMessages,
  fetchDashboardProducts,
} from "../controllers/adminDashboardController";

let totalProducts = ref(0);
let totalPendingOrders = ref(0);
let totalUnreadMessages = ref(0);

let products: Ref<
  ({
    id: string;
    name: string;
    category: string;
    views: number;
    totalOrders: number;
    totalSales: number;
  } | null)[]
> = ref([]);

const fetchTotalProducts = async () => {
  const result = await fetchProductsForSeller();
  if (result) {
    totalProducts.value = result.totalProducts;
  } else {
    console.error("Failed to fetch products");
  }
};

const fetchTotalPending = async () => {
  totalPendingOrders.value = await fetchTotalPendingOrders();
};

const fetchTotalUnread = async () => {
  const result = await fetchTotalUnreadMessages();
  if (result !== undefined) {
    totalUnreadMessages.value = result;
  } else {
    console.error("Failed to fetch unread messages");
  }
};

onMounted(async () => {
  const result = await fetchDashboardProducts();
  if (result !== undefined) {
    products.value = result.filter((item) => item !== null) as {
      id: string;
      name: string;
      category: string;
      views: number;
      totalOrders: number;
      totalSales: number;
    }[];

    //console.log(products.value);
  } else {
    console.error("Failed to fetch dashboard products");
  }
});
const {
  onFileChange,
  uploadFeaturedImage,
  imageUrls,
  deleteFeaturedImage,
  isAdmin,
} = setupControllerFeatured();

const router = useRouter();

let isUploadPopoverOpen = ref(false);
let isSuccessPopoverOpen = ref(false);

const handleContinueClick = () => {
  isSuccessPopoverOpen.value = false;
  router.go(0);
};

fetchTotalProducts();
fetchTotalPending();
fetchTotalUnread();
</script>
