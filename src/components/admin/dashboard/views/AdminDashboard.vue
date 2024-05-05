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
    <div v-if="!isAdmin" class="flex flex-col p-4 border-2 rounded-lg py-5">
      <div class="flex flex-row border-b-2">
        <h3 class="font-bold text-xl tracking-wide">Contact Information</h3>
      </div>
      <div class="p-4 pt-8">
        <div class="grid md:grid-cols-2 gaps-8">
          <div class="flex flex-row space-x-2 items-center">
            <label class="font-semibold text-[10px] md:text-xs"
              >Contact Email Address:</label
            >
            <input
              type="email"
              id="email"
              class="p-1.5 text-[10px] md:text-xs min-w-48 border border-primary rounded-sm"
              v-bind:disabled="!isEditing"
              :class="{ 'opacity-50 border border-gray-400': !isEditing }"
              placeholder="Enter Email Address"
              v-model="formData.contactEmail"
            />
          </div>
          <div class="flex flex-row space-x-2 items-center">
            <label class="font-semibold text-[10px] md:text-xs"
              >Phone Number:</label
            >
            <input
              type="text"
              id="phone_number"
              class="p-1.5 text-[10px] md:text-xs min-w-48 border border-primary rounded-sm"
              v-bind:disabled="!isEditing"
              :class="{ 'opacity-50 border border-gray-400': !isEditing }"
              placeholder="No Existing Contact Number"
              v-model="formData.phoneNumber"
            />
          </div>
          <div class="flex flex-row space-x-2 items-center pt-4">
            <label class="font-semibold text-[10px] md:text-xs"
              >Facebook Page Link:</label
            >
            <input
              type="text"
              id="fb_link"
              v-bind:disabled="!isEditing"
              :class="{ 'opacity-50 border border-gray-400': !isEditing }"
              class="p-1.5 text-[10px] md:text-xs min-w-48 border border-primary rounded-sm"
              placeholder="No Existing Fb Page Link"
              v-model="formData.fbLink"
            />
          </div>
        </div>
        <div
          v-if="editLoading"
          class="flex items-center justify-center absolute inset-0 z-50 bg-black w-auto h-auto bg-opacity-10"
        >
          <span
            class="material-symbols-outlined text-6xl text-primary animate-spin opacity-90"
          >
            autorenew
          </span>
        </div>
      </div>
      <div class="flex flex-row border-t pt-2 pr-2 justify-end items-center">
        <button
          v-if="!isEditing"
          @click.prevent="isEditing = true"
          class="py-2 px-4 text-xs rounded-sm text-white bg-red-800"
        >
          Edit
        </button>
        <button
          v-if="isEditing"
          @click.prevent="saveChanges"
          class="py-2 px-4 text-xs rounded-sm text-white bg-emerald-800"
        >
          Save Changes
        </button>
      </div>
    </div>

    <div v-if="isAdmin" class="flex flex-col p-4 border-2 rounded-lg py-5">
      <div
        class="flex flex-col justify-start items-start md:flex-row just md:justify-between md:items-center border-b-2 pb-4 space-y-4"
      >
        <div>
          <h3 class="font-bold text-xl tracking-wide">
            Seller Contact Information
          </h3>
        </div>
        <div>
          <Select v-model="selectedDepartment">
            <SelectTrigger class="w-[250px] md:w-[200px]">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel class="border-b">Departments</SelectLabel>
                <SelectItem value="CET">CET</SelectItem>
                <SelectItem value="BSCS">BSCS</SelectItem>
                <SelectItem value="BSCE">BSCE</SelectItem>
                <SelectItem value="BSABE">BSABE</SelectItem>
                <SelectItem value="BSGE">BSGE</SelectItem>
                <SelectItem value="BSME">BSME</SelectItem>
                <SelectItem value="BSMet">BSMet</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div class="p-4 pt-8">
        <div>
          <h3 class="font-bold pb-4">
            Department: {{ selectedDepartment || "" }}
          </h3>
        </div>
        <div class="grid md:grid-cols-2 gaps-8">
          <div class="flex flex-row space-x-2 items-center pb-4">
            <label class="font-semibold text-[8px] md:text-xs"
              >Contact Email Address:</label
            >
            <input
              type="email"
              id="email"
              class="p-1.5 text-[10px] md:text-xs min-w-48 border border-primary rounded-sm"
              v-bind:disabled="!isEditing"
              :class="{ 'opacity-50 border border-gray-400': !isEditing }"
              placeholder="Enter Email Address"
              v-model="formData.contactEmail"
            />
          </div>
          <div class="flex flex-row space-x-2 items-center">
            <label class="font-semibold text-[8px] md:text-xs"
              >Phone Number:</label
            >
            <input
              type="text"
              id="phone_number"
              class="p-1.5 text-[10px] md:text-xs min-w-48 border border-primary rounded-sm"
              v-bind:disabled="!isEditing"
              :class="{ 'opacity-50 border border-gray-400': !isEditing }"
              placeholder="No Existing Contact Number"
              v-model="formData.phoneNumber"
            />
          </div>
          <div class="flex flex-row space-x-2 items-center pt-4">
            <label class="font-semibold text-[8px] md:text-xs"
              >Facebook Page Link:</label
            >
            <input
              type="text"
              id="fb_link"
              v-bind:disabled="!isEditing"
              :class="{ 'opacity-50 border border-gray-400': !isEditing }"
              class="p-1.5 text-[8px] md:text-xs w-3/5 md:w-64 border border-primary rounded-sm"
              placeholder="No Existing Fb Page Link"
              v-model="formData.fbLink"
            />
          </div>
        </div>
        <div
          v-if="editLoading"
          class="flex items-center justify-center absolute inset-0 z-50 bg-black w-auto h-auto bg-opacity-10"
        >
          <span
            class="material-symbols-outlined text-6xl text-primary animate-spin opacity-90"
          >
            autorenew
          </span>
        </div>
      </div>
      <div class="flex flex-row border-t pt-2 pr-2 justify-end items-center">
        <button
          v-if="!isEditing && !isFormDisabled"
          @click.prevent="isEditing = true"
          class="py-2 px-4 text-xs rounded-sm text-white bg-red-800"
        >
          Edit
        </button>
        <button
          v-if="isEditing && !isFormDisabled"
          @click.prevent="saveDepartmentChanges"
          class="py-2 px-4 text-xs rounded-sm text-white bg-emerald-800"
        >
          Save Changes
        </button>
      </div>
    </div>

    <div v-if="isAdmin" class="flex flex-col p-4 border-2 rounded-lg py-5 mt-8">
      <div class="flex flex-row border-b-2">
        <h1 class="font-bold text-xl tracking-wide">Featured Images</h1>
        <div class="p-1">
          <!-- Upload Featured Image -->
          <Popover>
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
            <tr class="text-xs md:text-sm">
              <th class="text-left p-2">Product Name</th>
              <th class="text-center p-2">Category</th>
              <th class="text-center p-2">Views</th>
              <th class="text-center p-2">Total Orders</th>
              <th class="text-center p-2">Sales</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in products"
              class="py-4 text-[10px] md:text-xs hover:bg-primary/10"
            >
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
  <div class="h-40 md:h-12"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref, watch, computed, onUnmounted } from "vue";
import { db, auth } from "@/firebase/init";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { setup as setupControllerFeatured } from "../controllers/adminUploadFeaturedController";
import { useRouter } from "vue-router";
import AdminSidebar from "../views/AdminSidebar.vue";
import {
  fetchTotalPendingOrders,
  fetchTotalUnreadMessages,
  fetchDashboardProducts,
  fetchDashboardSellers,
} from "../controllers/adminDashboardController";
import { Seller } from "../models/adminDashboardModel";

let totalProducts = ref(0);
let totalPendingOrders = ref(0);
let totalUnreadMessages = ref(0);
const isEditing = ref(false);
const editLoading = ref(false);

const formData = ref({
  contactEmail: "",
  phoneNumber: "",
  fbLink: "",
});

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
  const result = await fetchDashboardProducts();
  if (result) {
    totalProducts.value = result.length;
  } else {
    console.error("Failed to fetch dashboard products");
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

type SellerWithId = Seller & { id: string };

let sellers: Ref<SellerWithId[]> = ref([]);

const fetchSellersData = async () => {
  const result = await fetchDashboardSellers();
  if (result) {
    sellers.value = result as SellerWithId[];
  } else {
    console.error("Failed to fetch sellers");
  }
};

onMounted(async () => {
  await fetchSellersData();
});

let selectedDepartment: Ref<string | undefined> = ref(undefined);
const isFormDisabled = computed(() => selectedDepartment.value === undefined);
let unsubscribeSnapshot: Ref<(() => void) | null> = ref(null);

watch(selectedDepartment, (newVal) => {
  // Unsubscribe from the previous snapshot listener, if any
  if (unsubscribeSnapshot.value) {
    unsubscribeSnapshot.value();
    unsubscribeSnapshot.value = null;
  }

  if (newVal) {
    const departmentData = sellers.value.find(
      (seller) => seller.faction === newVal
    );
    if (departmentData) {
      const sellerRef = doc(db, "users", departmentData.id);
      unsubscribeSnapshot.value = onSnapshot(sellerRef, (doc) => {
        if (doc.exists()) {
          const updatedSeller = doc.data() as Seller;
          formData.value.contactEmail = updatedSeller.contactEmail || "";
          formData.value.phoneNumber = updatedSeller.phoneNumber || "";
          formData.value.fbLink = updatedSeller.fbLink || "";
        }
      });
    } else {
      console.error("Failed to fetch department data");
    }
  }
});

const saveDepartmentChanges = async () => {
  if (selectedDepartment.value) {
    const sellerToUpdate = sellers.value.find(
      (seller) => seller.faction === selectedDepartment.value
    );
    if (sellerToUpdate) {
      const sellerRef = doc(db, "users", sellerToUpdate.id);
      await updateDoc(sellerRef, {
        contactEmail: formData.value.contactEmail,
        phoneNumber: formData.value.phoneNumber,
        fbLink: formData.value.fbLink,
      });
    }
  }
  isEditing.value = false;
};

onUnmounted(() => {
  if (unsubscribeSnapshot.value) {
    unsubscribeSnapshot.value();
  }
});

onMounted(async () => {
  const userId = auth.currentUser?.uid;
  if (userId) {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      if (data) {
        formData.value.contactEmail = data.contactEmail || "";
        formData.value.phoneNumber = data.phoneNumber || "";
        formData.value.fbLink = data.fbLink || "";
      }
    }
  }
});

const editContactInfo = async () => {
  const userId = auth.currentUser?.uid;
  if (userId) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      contactEmail: formData.value.contactEmail,
      phoneNumber: formData.value.phoneNumber,
      fbLink: formData.value.fbLink,
    });
  }
};

const saveChanges = () => {
  editContactInfo();
  isEditing.value = false;
};

const {
  onFileChange,
  uploadFeaturedImage,
  imageUrls,
  deleteFeaturedImage,
  isAdmin,
} = setupControllerFeatured();

const router = useRouter();

let isSuccessPopoverOpen = ref(false);

const handleContinueClick = () => {
  isSuccessPopoverOpen.value = false;
  router.go(0);
};

fetchTotalProducts();
fetchTotalPending();
fetchTotalUnread();
</script>
