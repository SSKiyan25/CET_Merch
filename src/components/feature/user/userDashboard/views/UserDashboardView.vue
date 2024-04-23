<template>
  <UserSidebar />
  <div class="p-4 sm:ml-64">
    <div class="flex flex-row justify-start py-4 px-4 md:py-10 space-x-2">
      <div class="flex">
        <span class="material-symbols-outlined py-2 text-5xl"> dashboard </span>
      </div>
      <div class="flex flex-col">
        <h1 class="text-lg md:text-2xl">Welcome to Your Profile</h1>
        <p
          class="text-xs md:text-sm py-1 text-justify text-secondary-foreground/60"
        >
          This is your dashboard where you can manage your orders, inbox, and
          other settings from here.
        </p>
      </div>
    </div>

    <div class="flex flex-col p-4 border-2 rounded-lg">
      <div class="relative flex flex-row border-b-2">
        <h1 class="font-bold text-xl text-primary tracking-wide pb-2">
          General Information
        </h1>
      </div>
      <form>
        <div class="relative">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-8 pl-4 pb-4 text-sm"
          >
            <div>
              <span class="font-semibold">Username: </span>
              <input
                type="text"
                id="username"
                class="p-1.5 text-xs min-w-56 border border-primary rounded-sm"
                v-bind:disabled="!isEditing"
                :class="{ 'opacity-50 border border-gray-400': !isEditing }"
                placeholder="No Existing Username"
                v-model="formData.username"
              />
            </div>
            <div>
              <span class="font-semibold">Email: </span>
              <input
                type="email"
                id="email"
                class="p-1.5 text-xs min-w-48 border border-primary rounded-sm"
                v-bind:disabled="!isEditing"
                :class="{ 'opacity-50 border border-gray-400': !isEditing }"
                placeholder="No Existing Email"
                v-model="formData.emailAddress"
              />
            </div>
            <div></div>

            <div>
              <span class="font-semibold">Name: </span>
              <input
                type="text"
                id="name"
                class="p-1.5 text-xs min-w-56 border border-primary rounded-sm"
                placeholder="No Existing Name"
                v-bind:disabled="!isEditing"
                :class="{ 'opacity-50 border border-gray-400': !isEditing }"
                v-model="formData.name"
              />
            </div>
            <div>
              <span class="font-semibold">Student ID: </span>
              <input
                type="text"
                id="student-id"
                class="p-1.5 text-xs border border-primary rounded-sm"
                placeholder="No Existing Student ID"
                v-bind:disabled="!isEditing"
                :class="{ 'opacity-50 border border-gray-400': !isEditing }"
                v-model="formData.studentId"
              />
            </div>
            <div>
              <span class="font-semibold">Department: </span>
              <input
                type="text"
                id="department"
                class="p-1.5 text-xs min-w-56 border border-primary rounded-sm"
                v-bind:disabled="!isEditing"
                :class="{ 'opacity-50 border border-gray-400': !isEditing }"
                placeholder="No Existing Department"
                v-model="formData.department"
              />
            </div>
            <div>
              <span class="font-semibold">Phone: </span>
              <input
                type="text"
                id="phone-number"
                class="py-1.5 min-w-56 text-xs border border-primary rounded-sm text-start"
                v-bind:disabled="!isEditing"
                :class="{ 'opacity-50 border border-gray-400': !isEditing }"
                placeholder="No Existing Phone Number"
                v-model="formData.phoneNumber"
              />
            </div>
            <div></div>

            <div></div>
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
            class="py-2 px-4 rounded-sm text-white bg-red-800"
          >
            Edit
          </button>
          <button
            v-if="isEditing"
            @click.prevent="saveChanges"
            class="py-2 px-4 rounded-sm text-white bg-emerald-800"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>

    <div class="flex flex-col p-4 mt-16 border-2 rounded-lg overflow-auto">
      <div class="flex flex-row border-b-2">
        <h1 class="font-bold text-xl text-primary tracking-wide pb-2">
          Recent Order
        </h1>
      </div>
      <div class="pt-8">
        <div
          v-if="recentOrder && !isLoading"
          class="flex flex-col border pt-2 pb-4"
        >
          <div class="flex flex-row justify-between items-center py-2 px-3">
            <div>
              <span class="text-sm font-semibold"
                >Order Reference Number:
              </span>
              <span class="pl-2 text-primary font-semibold">{{
                recentOrder.orderRefNum
              }}</span>
              <AlertDialog>
                <AlertDialogTrigger>
                  <button
                    v-bind:disabled="
                      recentOrder.orderStatus === 'decline' ||
                      recentOrder.orderStatus === 'cancelled'
                    "
                  >
                    <span
                      class="text-[10px] pl-2 font-semibold text-blue-900 hover:underline"
                      :class="{
                        'opacity-50 cursor-not-allowed hover:no-underline':
                          recentOrder.orderStatus === 'decline' ||
                          recentOrder.orderStatus === 'cancelled',
                      }"
                      >Cancel Order?
                    </span>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle> Cancel Order </AlertDialogTitle>
                    <AlertDialogDescription class="text-black">
                      <div class="flex flex-col text-xs space-y-2">
                        <p class="indent-1">
                          Are you sure you want to cancel this order? This
                          action cannot be undone.
                        </p>
                        <input
                          id="order-remarks"
                          type="text"
                          v-model="tempRemarks"
                          class="p-3 border rounded-sm text-xs bg-background border-primary/40 text-secondary-foreground"
                          placeholder="Give your reasons..."
                          required
                        />
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      class="bg-background text-black hover:bg-gray-300"
                    >
                      Close</AlertDialogAction
                    >
                    <template v-if="tempRemarks !== ''">
                      <AlertDialogAction>
                        <button @click.prevent="cancelOrder(recentOrder)">
                          Cancel Order
                        </button>
                      </AlertDialogAction>
                    </template>
                    <template v-else>
                      <div
                        class="opacity-50 hover:cursor-not-allowed items-center"
                      >
                        <Button variant="ghost" disabled class="items-center">
                          Cancel Order
                        </Button>
                      </div>
                    </template>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div>
              <span class="text-xs">{{
                formatDate(recentOrder.dateOrdered)
              }}</span>
            </div>
          </div>
          <div class="flex flex-row flex-wrap">
            <div
              class="px-2"
              v-for="(item, itemIndex) in recentOrder.cart"
              :key="itemIndex"
            >
              <div
                class="flex flex-row items-center bg-gradient-to-br from-gold to-light-gold rounded-lg w-76 h-18 pr-4"
              >
                <div class="p-4">
                  <img
                    :src="item.productDetails.coverPhoto"
                    class="w-30 h-20 rounded-sm"
                  />
                </div>
                <div
                  class="flex flex-col text-[10px] font-semibold space-y-2 whitespace-normal text-wrap"
                >
                  <span>Product Name: {{ item.productDetails.name }}</span>
                  <span v-if="item.size && item.size !== ''"
                    >Size: {{ item.size }}</span
                  >
                  <span>Quantity: {{ item.quantity }}</span>
                  <span>Total Amount: P{{ item.totalPrice }}</span>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex flex-row justify-between pt-4 px-4 text-xs items-center"
          >
            <div>
              <span>Order Status: </span>
              <button
                v-if="recentOrder.orderStatus === 'processing'"
                class="p-2 bg-amber-600 text-white rounded-sm cursor-default capitalize"
              >
                <span>{{ recentOrder.orderStatus }}</span>
              </button>
              <Button
                v-else-if="recentOrder.orderStatus === 'declined'"
                variant="default"
                class="cursor-default capitalize mr-1"
              >
                <span>declined</span>
              </Button>
              <Button
                v-else-if="recentOrder.orderStatus === 'cancelled'"
                variant="default"
                class="cursor-default capitalize"
              >
                <span>{{ recentOrder.orderStatus }}</span>
              </Button>
              <button
                v-else-if="recentOrder.orderStatus === 'done'"
                class="p-2 bg-emerald-600 text-white rounded-sm cursor-default capitalize"
              >
                <span>{{ recentOrder.orderStatus }}</span>
              </button>
              <button
                v-else-if="recentOrder.orderStatus === 'ready'"
                class="p-2 bg-blue-600 text-white rounded-sm cursor-default capitalize"
              >
                <span>{{ recentOrder.orderStatus }} to get!</span>
              </button>
              <Dialog>
                <DialogTrigger>
                  <span
                    v-if="recentOrder.orderStatus === 'declined'"
                    class="text-xs font-bold hover:underline hover:cursor-pointer"
                  >
                    Read Why
                  </span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle class="border-b pb-1"
                      >Order Declined</DialogTitle
                    >
                    <DialogDescription>
                      <div class="flex flex-col text-black text-xs">
                        <span>
                          Your order was declined due to the following reason:
                        </span>
                        <p class="indent-2 pt-2 font-semibold">
                          {{ recentOrder.remarks }}
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogTrigger>
                      <Button variant="outline"> Close </Button>
                    </DialogTrigger>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <span
                v-if="
                  recentOrder.orderStatus !== 'declined' &&
                  recentOrder.orderStatus !== 'cancelled'
                "
                class="px-2"
                >Payment Status:</span
              >
              <button
                v-if="recentOrder.paymentStatus === 'pending'"
                class="p-2 bg-red-600 text-white rounded-sm cursor-default capitalize"
              >
                Pending
              </button>
              <button
                v-if="recentOrder.paymentStatus === 'paid'"
                class="p-2 bg-emerald-600 text-white rounded-sm cursor-default capitalize"
              >
                Paid
              </button>
            </div>
            <div>
              <span
                >Total Payment:
                <span class="text-primary font-semibold underline"
                  >{{ recentOrder.totalPrice }}
                </span>
              </span>
              <span class="pl-1">(Cash)</span>
            </div>
          </div>
        </div>
        <div v-else-if="!isLoading && !recentOrder">
          <div
            class="flex flex-col items-center justify-center pl-4 py-8 h-full w-full space-x-2"
          >
            <span class="material-symbols-outlined text-6xl text-primary"
              >sentiment_very_dissatisfied
            </span>
            <span class="text-lg font-bold text-primary">
              No Recent Order Found.
            </span>
            <span class="text-xs text-gray-500 text-center">
              You haven't placed any orders yet. Start shopping now and see your
              order here.
            </span>
          </div>
        </div>
      </div>
      <div v-if="isLoading">
        <div class="flex items-center justify-center pl-4 h-full w-full">
          <span
            class="material-symbols-outlined text-6xl text-primary animate-spin"
          >
            autorenew
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="pb-12"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { db, auth } from "@/firebase/init";
import { initFlowbite } from "flowbite";
import { Button } from "@/components/ui/button";
import UserSidebar from "../views/UserSidebarView.vue";
import { getUserOrders, cancelOrder } from "../controllers/userController";
import { DocumentData, doc, getDoc, updateDoc } from "firebase/firestore";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const orders = ref<DocumentData[]>([]);
const isLoading = ref(false);
const recentOrder = ref<DocumentData | null>(null);
const isEditing = ref(false);
const editLoading = ref(false);
const tempRemarks = ref("");

const formData = ref({
  username: "",
  name: "",
  emailAddress: "",
  phoneNumber: "",
  studentId: "",
  department: "",
});

onMounted(async () => {
  isLoading.value = true;
  initFlowbite();
  orders.value = await getUserOrders();
  isLoading.value = false;
});

onMounted(async () => {
  const userId = auth.currentUser?.uid;
  if (userId) {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      formData.value.username = userData.username || "";
      formData.value.name = userData.name || "";
      formData.value.emailAddress = userData.email || "";
      formData.value.phoneNumber = userData.phoneNumber || "";
      formData.value.department = userData.faction || "";
      formData.value.studentId = userData.studentId || "";
    }
  }
});

const editUserProfile = async () => {
  const userId = auth.currentUser?.uid;
  if (userId) {
    const userRef = doc(db, "users", userId);
    try {
      await updateDoc(userRef, {
        username: formData.value.username,
        name: formData.value.name,
        email: formData.value.emailAddress,
        phoneNumber: formData.value.phoneNumber,
        faction: formData.value.department,
        studentId: formData.value.studentId,
      });
      console.log("User profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile: ", error);
    }
  }
};

const saveChanges = () => {
  editUserProfile();
  isEditing.value = false;
};

watch(orders, (newOrders) => {
  isLoading.value = true;
  if (newOrders.length === 0) {
    recentOrder.value = null;
  } else {
    //console.log(newOrders[0]);
    recentOrder.value = newOrders.reduce((latestOrder, currentOrder) => {
      return new Date(latestOrder.dateOrdered) >
        new Date(currentOrder.dateOrdered)
        ? latestOrder
        : currentOrder;
    });
  }
  isLoading.value = false;
});

const formatDate = (dateString: string) => {
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const date = new Date(dateString);
  const formattedDate = (date.toLocaleDateString as any)([], dateOptions);
  const formattedTime = (date.toLocaleTimeString as any)([], timeOptions);
  return `${formattedDate} (${formattedTime})`;
};
</script>
