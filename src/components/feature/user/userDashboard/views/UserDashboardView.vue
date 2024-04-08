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
        <h1 class="text-2xl">Welcome to Your Profile</h1>
        <p class="text-sm py-1 text-secondary-foreground/60">
          This is your dashboard where you can manage your orders, inbox, and
          other settings from here.
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

    <div
      v-if="recentOrder && !isLoading"
      class="flex flex-col p-4 mt-16 border-2 rounded-lg overflow-auto"
    >
      <div class="flex flex-row border-b-2">
        <h1 class="font-bold text-xl text-primary tracking-wide pb-2">
          Recent Order
        </h1>
      </div>
      <div class="pt-8">
        <div class="flex flex-col border pt-2 pb-4">
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
                  <button>
                    <span
                      class="text-[10px] pl-2 font-semibold text-blue-900 hover:underline"
                      >Cancel Order?</span
                    >
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle> Cancel Order </AlertDialogTitle>
                    <AlertDialogDescription class="text-black">
                      Are you sure you want to cancel this order? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      class="bg-background text-black hover:bg-gray-300"
                    >
                      Close</AlertDialogAction
                    >
                    <AlertDialogAction>
                      <button @click.prevent="cancelOrder(recentOrder)">
                        Cancel Order
                      </button>
                    </AlertDialogAction>
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
                  <span>Size: {{ item.size }}</span>
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
                class="cursor-default capitalize"
              >
                <span>{{ recentOrder.orderStatus }}</span>
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
              <span class="px-2">Payment Status:</span>
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
import { initFlowbite } from "flowbite";
import { Button } from "@/components/ui/button";
import UserSidebar from "../views/UserSidebarView.vue";
import { getUserOrders, cancelOrder } from "../controllers/userController.ts";
import { DocumentData } from "firebase/firestore";
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

const orders = ref<DocumentData[]>([]);
const isLoading = ref(false);
const recentOrder = ref<DocumentData | null>(null);

onMounted(async () => {
  isLoading.value = true;
  initFlowbite();
  orders.value = await getUserOrders();
  console.log(orders.value); // Check if orders array is populated
  isLoading.value = false;
});

watch(orders, (newOrders) => {
  isLoading.value = true;
  if (newOrders.length === 0) {
    recentOrder.value = null;
  } else {
    console.log(newOrders[0]); // Check if dateOrdered field is present
    recentOrder.value = newOrders.reduce((latestOrder, currentOrder) => {
      console.log(new Date(latestOrder.dateOrdered)); // Check if dateOrdered can be parsed
      console.log(new Date(currentOrder.dateOrdered)); // Check if dateOrdered can be parsed
      return new Date(latestOrder.dateOrdered) >
        new Date(currentOrder.dateOrdered)
        ? latestOrder
        : currentOrder;
    });
  }
  isLoading.value = false;
  console.log("Recent Order: ", recentOrder.value);
});

console.log(recentOrder.value);

const formatDate = (dateString: string) => {
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const date = new Date(dateString);
  const formattedDate = (date.toLocaleDateString as any)([], dateOptions);
  const formattedTime = (date.toLocaleTimeString as any)([], timeOptions);
  return `${formattedDate} (${formattedTime})`;
};
</script>
