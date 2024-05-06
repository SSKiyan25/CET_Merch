<template>
  <UserSidebar />
  <div class="p-4 ml-2 sm:ml-64 pb-16">
    <div class="flex flex-row justify-start py-10">
      <div class="flex">
        <span class="material-symbols-outlined p-2 text-5xl">
          shopping_bag
        </span>
      </div>
      <div class="flex flex-col">
        <h1 class="text-2xl">Your Orders</h1>
        <p class="text-sm py-1 text-secondary-foreground/50">
          View and manage your orders. You can filter by status, date range or
          search for a specific order.
        </p>
      </div>
    </div>
    <div class="flex flex-col p-4 border-2 rounded-lg py-5">
      <div class="flex flex-col md:flex-row justify-between border-b-2">
        <div class="flex flex-row pb-2">
          <h1
            class="font-bold text-base md:text-xl text-primary tracking-wide mt-1"
          >
            Order History
          </h1>
        </div>
        <div class="flex flex-row pb-2 space-x-2">
          <form>
            <div class="flex relative w-full max-w-2xl space-x-2 items-center">
              <Input
                id="search"
                type="text"
                placeholder="Search..."
                class="pl-10"
                v-model="searchTerm"
              />
              <span
                class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
              >
                <MagnifyingGlassIcon class="size-4 text-gray-700" />
              </span>
              <div class="text-xs">
                <Popover v-model:open="open">
                  <PopoverTrigger as-child>
                    <Button
                      variant="outline"
                      role="combobox"
                      :aria-expanded="open"
                      class="w-[180px] justify-between text-xs"
                      v-model="value"
                    >
                      {{
                        value && value !== "all"
                          ? frameworks.find(
                              (framework) => framework.value === value
                            )?.label
                          : "Select Category"
                      }}
                      <ChevronsUpDown
                        class="pl-1 h-4 w-4 shrink-0 opacity-50"
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="w-[200px] p-0">
                    <Command>
                      <CommandInput class="h-9" placeholder="Search Category" />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem
                            v-for="framework in frameworks"
                            :key="framework.value"
                            :value="framework.value"
                            @select="
                              (ev:any) => {
                                if (typeof ev.detail.value === 'string') {
                                  value = ev.detail.value;
                                }
                                open = false;
                              }
                            "
                            class="cursor-pointer"
                          >
                            {{ framework.label }}
                            <Check
                              :class="
                                cn(
                                  'ml-auto h-4 w-4',
                                  value === framework.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )
                              "
                            />
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div v-if="isLoading">
        <div class="flex items-center justify-center pl-4 py-8 h-full w-full">
          <span
            class="material-symbols-outlined text-6xl text-primary animate-spin"
          >
            autorenew
          </span>
        </div>
      </div>
      <!--Order Section-->
      <div
        v-else-if="!isLoading && filteredUserOrders.length > 0"
        class="pt-8"
        v-for="(order, index) in filteredUserOrders"
        :key="index"
      >
        <div class="flex flex-col border pt-2 pb-4 overflow-auto">
          <div class="flex flex-col md:flex-row justify-between py-2 px-3">
            <div>
              <span class="text-xs md:text-sm font-semibold"
                >Order Reference Number:
              </span>
              <span
                class="pl-1 md:pl-2 text-primary text-xs md:text-sm font-semibold"
                >{{ order.orderRefNum }}</span
              >
              <AlertDialog v-if="order.orderStatus !== 'done'">
                <AlertDialogTrigger>
                  <button
                    v-bind:disabled="
                      order.orderStatus === 'declined' ||
                      order.orderStatus === 'cancelled'
                    "
                  >
                    <span
                      class="text-[10px] pl-2 font-semibold text-blue-900 hover:underline"
                      :class="{
                        'opacity-50 cursor-not-allowed':
                          order.orderStatus === 'declined' ||
                          order.orderStatus === 'cancelled',
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
                        <button
                          @click.prevent="cancelUserOrder(order, tempRemarks)"
                        >
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
              <span class="text-[10px] md:text-xs"
                >Date: {{ formatDate(order.dateOrdered) }}</span
              >
            </div>
          </div>
          <div class="flex flex-col md:flex-row flex-wrap space-y-2">
            <div
              class="px-2"
              v-for="(item, itemIndex) in order.cart"
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
            class="flex flex-col md:flex-row justify-between text-xs items-start md:items-center pt-4 px-4 space-y-2"
          >
            <div class="text-[10px] md:text-xs">
              <span>Order Status: </span>
              <button
                v-if="order.orderStatus === 'processing'"
                class="p-2 bg-amber-600 text-white rounded-sm cursor-default capitalize"
              >
                <span>{{ order.orderStatus }}</span>
              </button>
              <button
                v-else-if="order.orderStatus === 'declined'"
                class="p-2 bg-red-900 text-white rounded-sm cursor-default capitalize mr-1"
              >
                <span>Declined</span>
              </button>
              <button
                v-else-if="order.orderStatus === 'cancelled'"
                class="p-2 bg-red-700 text-white rounded-sm cursor-default capitalize mr-2"
              >
                <span>Cancelled</span>
              </button>
              <button
                v-else-if="order.orderStatus === 'done'"
                class="p-2 bg-emerald-600 text-white rounded-sm cursor-default capitalize"
              >
                <span>{{ order.orderStatus }}</span>
              </button>
              <button
                v-else-if="order.orderStatus === 'ready'"
                class="p-2 bg-blue-600 text-white rounded-sm cursor-default capitalize"
              >
                <span>{{ order.orderStatus }} to get!</span>
              </button>

              <Dialog>
                <DialogTrigger>
                  <span
                    v-if="order.orderStatus === 'declined'"
                    class="text-xs font-bold underline hover:cursor-pointer text-blue-600"
                  >
                    Read Why
                  </span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle class="border-b pb-1">
                      Order Declined
                    </DialogTitle>
                    <DialogDescription>
                      <div class="flex flex-col text-black text-xs">
                        <span>
                          Your order was declined due to the following reason:
                        </span>
                        <p class="indent-2 pt-2 font-semibold">
                          {{ order.remarks }}
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogTrigger>
                      <Button variant="outline"> Close</Button>
                    </DialogTrigger>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <span
                v-if="
                  order.paymentStatus !== 'declined' &&
                  order.orderStatus !== 'cancelled'
                "
                class="px-2"
                >Payment Status:</span
              >
              <Dialog>
                <DialogTrigger>
                  <span
                    v-if="order.orderStatus === 'cancelled'"
                    class="text-xs font-bold underline hover:cursor-pointer text-blue-600"
                  >
                    Your Reason
                  </span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle class="border-b pb-1">
                      Order Cancelled
                    </DialogTitle>
                    <DialogDescription>
                      <div class="flex flex-col text-black text-xs">
                        <span>
                          Your order was cancelled due to the following reason
                          you stated:
                        </span>
                        <p class="indent-2 pt-2 font-semibold">
                          {{ order.remarks }}
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogTrigger>
                      <Button variant="outline"> Close</Button>
                    </DialogTrigger>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <button
                v-if="
                  order.paymentStatus === 'pending' &&
                  order.orderStatus !== 'cancelled'
                "
                class="p-2 bg-amber-600 text-white rounded-sm cursor-default capitalize"
              >
                Pending
              </button>

              <button
                v-else-if="order.paymentStatus === 'paid'"
                class="p-2 bg-emerald-600 text-white rounded-sm cursor-default capitalize"
              >
                Paid
              </button>
            </div>
            <div>
              <span
                >Total Payment:
                <span class="text-primary font-semibold underline text-2xl"
                  >{{ order.totalPrice }}
                </span>
              </span>
              <span class="pl-1">(Cash)</span>
            </div>
          </div>
        </div>
      </div>
      <!--If filtered Products is 0 || No result-->
      <div v-else-if="!isLoading && filteredUserOrders.length === 0">
        <div
          class="flex flex-col items-center justify-center pl-4 py-8 h-full w-full space-x-2"
        >
          <span class="material-symbols-outlined text-6xl text-primary"
            >sentiment_very_dissatisfied
          </span>
          <span class="text-lg font-bold text-primary"> No Orders Found </span>
          <span class="text-xs text-gray-500">
            Try changing your filter or search criteria.
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="h-48 md:h-28"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { initFlowbite } from "flowbite";
import UserSidebar from "../views/UserSidebarView.vue";
import { MagnifyingGlassIcon } from "@radix-icons/vue";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getUserOrders, cancelOrder } from "../controllers/userController";
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

onMounted(async () => {
  isLoading.value = true;
  initFlowbite();
  orders.value = await getUserOrders();
  isLoading.value = false;
});

const open = ref(false);
const value = ref<string>("all");
const searchTerm = ref<string>("");
const tempRemarks = ref("");

const frameworks = [
  { value: "all", label: "Show All" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "ready", label: "Ready to Get" },
  { value: "declined", label: "Declined" },
  { value: "cancelled", label: "Cancelled" },
];

const filteredUserOrders = computed(() => {
  let filtered = orders.value;

  // Filter by orderStatus
  if (["declined", "cancelled", "done", "ready"].includes(value.value)) {
    filtered = filtered.filter((order) => order.orderStatus === value.value);
  }

  // Filter by paymentStatus
  if (["paid", "pending"].includes(value.value)) {
    filtered = filtered.filter((order) => order.paymentStatus === value.value);
  }

  // Filter by searchTerm
  if (searchTerm.value) {
    filtered = filtered.filter((order) =>
      order.orderRefNum.includes(searchTerm.value)
    );
  }

  return filtered;
});

const cancelUserOrder = async (order: any, remarks: string) => {
  isLoading.value = true;
  await cancelOrder(order, remarks);
  tempRemarks.value = "";
  orders.value = await getUserOrders();
  isLoading.value = false;
};

const formatDate = (dateString: string) => {
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const date = new Date(dateString);
  const formattedDate = (date.toLocaleDateString as any)([], dateOptions);
  const formattedTime = (date.toLocaleTimeString as any)([], timeOptions);
  return `${formattedDate} (${formattedTime})`;
};
</script>
