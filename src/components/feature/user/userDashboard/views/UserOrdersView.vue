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
      <div class="flex flex-row justify-between border-b-2">
        <div class="flex flex-row">
          <h1 class="font-bold text-xl text-primary tracking-wide mt-1">
            Order History
          </h1>
        </div>
        <div class="flex flex-row pb-2 space-x-2">
          <form>
            <div class="flex relative w-full max-w-sm space-x-2 items-center">
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
                <MagnifyingGlassIcon class="size-6 text-muted-foreground" />
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
                  <PopoverContent class="w-[180px] p-0">
                    <Command>
                      <CommandInput class="h-9" placeholder="Search Category" />
                      <CommandEmpty>No framework found.</CommandEmpty>
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
      <!--Order Section-->
      <div class="pt-8" v-for="(order, index) in filteredOrders" :key="index">
        <div class="flex flex-col border pt-2 pb-4">
          <div class="flex flex-row justify-between py-2 px-3">
            <div>
              <span class="text-sm font-semibold"
                >Order Reference Number:
              </span>
              <span class="pl-2 text-primary font-semibold">{{
                order.orderRefNum
              }}</span>
            </div>
            <div>
              <span class="text-xs">{{ order.dateOrdered }}</span>
            </div>
          </div>
          <div
            class="px-2"
            v-for="(item, itemIndex) in order.cart"
            :key="itemIndex"
          >
            <div
              class="flex flex-row items-center bg-secondary rounded-lg w-1/3 h-18"
            >
              <div class="p-4">
                <img
                  :src="item.productDetails.coverPhoto"
                  class="w-40 h-auto rounded-sm"
                />
              </div>
              <div
                class="flex flex-col text-xs space-y-2 whitespace-normal text-wrap"
              >
                <span>Product Name: {{ item.productDetails.name }}</span>
                <span>Size: {{ item.size }}</span>
                <span>Quantity: {{ item.quantity }}</span>
                <span>Total Amount: P{{ item.totalAmount }}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-row justify-between pt-4 px-4">
            <div>
              <span>Status: </span>
              <Button
                v-if="order.paymentStatus === 'pending'"
                variant="default"
                class="cursor-default capitalize"
              >
                <span>{{ order.paymentStatus }}</span>
              </Button>
              <button
                v-if="order.paymentStatus === 'paid'"
                class="p-3 bg-emerald-600 text-white rounded-sm cursor-default capitalize"
              >
                <span>{{ order.paymentStatus }}</span>
              </button>
            </div>
            <div>
              <span
                >Total Payment:
                <span class="text-primary font-semibold underline"
                  >{{ order.totalPayment }}
                </span>
              </span>
              <span class="pl-1">(Cash)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
import { getUserOrders } from "../controllers/userController.ts";
import { DocumentData } from "firebase/firestore";

const orders = ref<DocumentData[]>([]);

onMounted(async () => {
  initFlowbite();
  orders.value = await getUserOrders();
});

const open = ref(false);
const value = ref<string>("all");
const searchTerm = ref<string>("");

const frameworks = [
  { value: "all", label: "Show All" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "peclined", label: "Declined" },
  { value: "pancelled", label: "Cancelled" },
  { value: "T-Shirt", label: "T-Shirt" },
  { value: "Polo-Shirt", label: "Polo-Shirt" },
  { value: "Lace", label: "Lace" },
  { value: "Hoodie", label: "Hoodie" },
  { value: "Stickers", label: "Stickers" },
];

const filteredOrders = computed(() => {
  let filtered = orders.value;

  if (value.value !== "all") {
    filtered = filtered.filter((order) => {
      if (["paid", "pending", "declined", "cancelled"].includes(value.value)) {
        return order.paymentStatus === value.value;
      }

      return order.cart.some(
        (item: any) => item.productDetails.category === value.value
      );
    });
  }

  if (searchTerm.value) {
    filtered = filtered.filter((order) =>
      order.orderRefNum.includes(searchTerm.value)
    );
  }

  return filtered;
});
</script>
