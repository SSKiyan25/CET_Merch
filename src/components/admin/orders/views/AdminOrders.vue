<template>
  <NavBar />
  <AdminSidebar />
  <div class="p-4 ml-2 sm:ml-64 pb-16">
    <div class="flex flex-row justify-start py-10">
      <div class="flex">
        <span class="material-symbols-outlined p-2 text-5xl">
          shopping_bag
        </span>
      </div>
      <div class="flex flex-col">
        <h1 class="text-2xl">User Orders</h1>
        <p class="text-sm py-1 text-secondary-foreground/50">
          View and manage user orders. You can filter by status, date range or
          search for a specific order.
        </p>
      </div>
    </div>
    <div class="flex flex-col p-4 border-2 rounded-lg py-5 bg-slate-200">
      <div class="flex flex-row justify-between border-b-2">
        <div class="flex flex-row">
          <h1 class="font-bold text-xl tracking-wide mt-1">Orders</h1>
          <div class="flex flex-row pl-2">
            <div :class="cn('grid gap-2', $attrs.class ?? '')">
              <Popover>
                <PopoverTrigger as-child>
                  <Button
                    id="date"
                    :variant="'outline'"
                    :class="
                      cn(
                        'w-[300px] justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )
                    "
                  >
                    <CalendarIcon class="mr-2 h-4 w-4" />

                    <span>
                      {{
                        date.start
                          ? date.end
                            ? `${format(date.start, "LLL dd, y")} - ${format(
                                date.end,
                                "LLL dd, y"
                              )}`
                            : format(date.start, "LLL dd, y")
                          : "Pick a date"
                      }}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <Calendar v-model.range="date" :columns="2" />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div class="flex flex-row pb-2 space-x-2">
          <form>
            <div class="flex relative w-full max-w-sm items-center">
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
              <div class="ps-1 text-xs">
                <Popover v-model:open="open">
                  <PopoverTrigger as-child>
                    <Button
                      variant="outline"
                      role="combobox"
                      :aria-expanded="open"
                      class="w-[130px] justify-between text-xs"
                    >
                      {{
                        value
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
                  <PopoverContent class="w-[120px] p-0">
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
                              (ev) => {
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

              <div class="px-1">
                <button
                  class="p-2 bg-background border-1 rounded-lg hover:bg-background/40"
                  title="Export"
                >
                  <Download />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!--Table Section-->
      <div class="py-2 min-w-full">
        <div class="flex flex-col">
          <div class="overflow-x-auto">
            <div class="min-w-full inline-block align-middle">
              <div class="bg-slate-100 shadow-sm overflow-hidden">
                <table class="min-w-full divide-y divide-primary/50">
                  <thead class="bg-slate-300">
                    <tr>
                      <th scope="col" class="pl-4 w-1/12 py-2 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Order ID
                        </span>
                      </th>
                      <th scope="col" class="px-4 py-2 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Date
                        </span>
                      </th>
                      <th scope="col" class="px-3 py-2 w-3/12 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Product/s
                        </span>
                      </th>
                      <th scope="col" class="py-2 w-2/12 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Customer
                        </span>
                      </th>
                      <th scope="col" class="pr-4 py-2 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Total
                        </span>
                      </th>
                      <th scope="col" class="py-2 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Payment Status
                        </span>
                      </th>
                      <th scope="col" class="py-2 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Payment Method
                        </span>
                      </th>
                      <th scope="col" class="py-2 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Actions
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-primary/50">
                    <tr v-if="loadingPage">
                      <td class="p-4">
                        <div
                          class="flex items-center justify-start pl-4 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                      <td class="p-4">
                        <div
                          class="flex items-center justify-start pl-4 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                      <td class="p-4">
                        <div
                          class="flex items-center justify-start pl-4 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                      <td class="p-4">
                        <div
                          class="flex items-center justify-start pl-4 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                      <td class="p-4">
                        <div
                          class="flex items-center justify-start pl-4 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                      <td class="p-4">
                        <div
                          class="flex items-center justify-end pr-16 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                      <td class="p-4">
                        <div
                          class="flex items-center justify-end pr-16 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                      <td class="p-4">
                        <div
                          class="flex items-center justify-end pr-16 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr
                      v-else
                      v-for="(order, index) in paginatedOrders"
                      :key="order.id"
                      class="hover:bg-primary/10"
                    >
                      <td>
                        <div class="pl-5 py-3">
                          <span
                            class="text-xs font-semibold text-primary/80 underline"
                            >{{ order.orderRefNum }}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div class="p-3">
                          <span
                            class="text-xs font-medium text-secondary-foreground/80"
                            >{{ order.dateOrdered }}</span
                          >
                        </div>
                      </td>
                      <td>
                        <div
                          v-for="product in order.cart"
                          :key="product"
                          class="px-2 text-wrap whitespace-normal items-center"
                        >
                          <span
                            class="text-xs text-secondary-foreground/80 truncate"
                          >
                            |
                            {{ product.quantity }}
                            |
                            {{ product.details.name }} -
                            {{ product.size }}</span
                          >
                          <span
                            v-if="product.isPreOrdered"
                            class="text-[10px] text-primary truncate"
                          >
                            (Pre-ordered)
                          </span>
                        </div>
                      </td>
                      <td>
                        <div class="">
                          <span class="text-xs text-secondary-foreground/60"
                            >{{ order.userName }}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div class="">
                          <span class="text-xs text-secondary-foreground/60"
                            >P{{ order.totalPrice }}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div class="pl-2.5 py-3 flex flex-row">
                          <div v-if="order.paymentStatus === 'pending'">
                            <button
                              class="rounded-lg bg-amber-700 py-1.5 px-4 cursor-auto"
                            >
                              <span class="text-xs font-medium text-white pb-1">
                                Pending
                              </span>
                            </button>
                          </div>
                          <div v-if="order.paymentStatus === 'declined'">
                            <button
                              class="rounded-lg bg-amber-700 py-1.5 px-4 cursor-auto"
                            >
                              <span class="text-xs font-medium text-white pb-1">
                                Declined
                              </span>
                            </button>
                          </div>
                          <div
                            v-if="order.paymentStatus === 'paid'"
                            class="pl-2"
                          >
                            <button
                              class="rounded-lg bg-green-700 py-1.5 px-4 cursor-auto"
                            >
                              <span class="text-xs font-medium text-white pb-1">
                                Paid
                              </span>
                            </button>
                          </div>

                          <button
                            class="text-secondary-foreground/60 hover:text-secondary-foreground"
                            title="Edit Status"
                            @click.prevent="toggleDetails(order)"
                          >
                            <span
                              class="material-symbols-outlined text-xs px-1"
                            >
                              edit
                            </span>
                          </button>
                        </div>
                      </td>
                      <td>
                        <div class="p-10 py-3">
                          <span class="text-xs text-secondary-foreground"
                            >{{ order.paymentMethod }}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div
                          class="hs-dropdown relative inline-block [--placement:bottom-right] py-1"
                        >
                          <div class="flex flex-row text-sm justify-end">
                            <div class="rounded-sm cursor-pointer space-x-1">
                              <button
                                class="bg-blue-600 text-white p-2 rounded-sm"
                                title="View Details"
                                @click.prevent="toggleDetails(order)"
                              >
                                <span class="material-symbols-outlined text-sm">
                                  visibility
                                </span>
                              </button>
                              <AlertDialog>
                                <AlertDialogTrigger>
                                  <button
                                    class="bg-red-600 text-white p-2 rounded-sm"
                                    title="Decline Order"
                                  >
                                    <span
                                      class="material-symbols-outlined text-sm"
                                    >
                                      block
                                    </span>
                                  </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Decline Order
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to decline this
                                      order?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogAction
                                      @click.prevent="declineOrder(order)"
                                      class="bg-red-600 hover:bg-red-700 text-white"
                                    >
                                      Decline
                                    </AlertDialogAction>
                                    <AlertDialogAction
                                      class="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                                    >
                                      Cancel
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </div>
                      </td>
                      <div v-if="showFullDetails[index]">
                        <div
                          class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80"
                        >
                          <div
                            class="relative w-full max-w-xl max-h-full bg-background rounded-lg shadow overflow-y-auto p-4"
                            style="max-height: 90vh"
                          >
                            <div class="flex flex-col bg-background rounded-lg">
                              <div
                                class="border-b border-secondary-foreground/50 py-3"
                              >
                                <span class="font-bold text-primary text-xl"
                                  >Order number:
                                </span>
                                <span
                                  class="font-bold text-secondary-foreground text-xl underline"
                                  >{{ order.orderRefNum }}</span
                                >
                              </div>
                              <div
                                class="flex flex-col p-4 space-y-2 border-b border-secondary-foreground/20"
                              >
                                <div>
                                  <span class="font-semibold"
                                    >Customer Details</span
                                  >
                                </div>
                                <div
                                  class="flex flex-col pl-8 space-y-2 text-sm opacity-80"
                                >
                                  <div class="flex flex-row justify-between">
                                    <div class="flex flex-row">
                                      <span class="font-bold">Name: </span>
                                      <span class="pl-2">
                                        {{ order.userName }}
                                      </span>
                                    </div>
                                    <div
                                      v-if="order.studentId"
                                      class="flex flex-row"
                                    >
                                      <span class="font-bold pl-4"
                                        >Student ID:</span
                                      >
                                      <span class="pl-2">{{
                                        order.studentId
                                      }}</span>
                                    </div>
                                  </div>
                                  <div class="flex flex-row justify-between">
                                    <div class="flex flex-row">
                                      <span class="font-bold">Email: </span>
                                      <span
                                        class="pl-2 underline text-blue-700 cursor-pointer"
                                        >{{ order.userEmailAddress }}</span
                                      >
                                    </div>
                                    <div
                                      v-if="order.userContactNumber"
                                      class="flex flex-row"
                                    >
                                      <span class="font-bold pl-4"
                                        >Contact Number:
                                      </span>
                                      <span class="pl-2"
                                        >{{ order.userContactNumber }}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="flex flex-col p-4 space-y-2 border-b border-secondary-foreground/20"
                              >
                                <div
                                  class="flex flex-row justify-between items-center"
                                >
                                  <span class="font-semibold"
                                    >Order Details</span
                                  >
                                  <span
                                    class="text-xs font-bold capitalize text-primary underline"
                                    >Status: {{ order.orderStatus }}</span
                                  >
                                </div>
                                <div
                                  class="flex flex-col pl-4 space-y-2 text-sm"
                                >
                                  <div class="flex flex-row opacity-80">
                                    <span>Product/s ordered:</span>
                                  </div>
                                  <div
                                    v-for="(product, index) in order.cart"
                                    :key="product"
                                    class="pl-2 text-xs"
                                  >
                                    <span class="opacity-80">
                                      {{ index + 1 }} |</span
                                    >
                                    <span class="pl-2 truncate opacity-80">
                                      {{
                                        product.details.name
                                          ? product.details.name
                                          : "Product not found"
                                      }}
                                      --
                                    </span>
                                    <span class="px-2 font-bold text-primary">
                                      Size: {{ product.size }}
                                    </span>
                                    <span class="opacity-80">-- </span
                                    ><span class="font-bold text-primary px-1">
                                      {{ product.quantity }}</span
                                    >
                                    <span class="opacity-80">--</span>

                                    <span class="pl-2 opacity-80"
                                      >Amount: {{ product.totalPrice }}</span
                                    >
                                  </div>
                                </div>
                                <div
                                  class="flex flex-row items-center space-x-1 pt-4"
                                  v-if="order.orderStatus !== 'done'"
                                >
                                  <input
                                    type="checkbox"
                                    id="checkbox"
                                    class="w-4 h-4 text-primary/80 bg-background border-primary/40 rounded focus:ring-primary focus:ring-2"
                                    :checked="order.orderStatus === 'ready'"
                                    @change="readyOrder(order)"
                                  />
                                  <span class="text-sm"
                                    >Mark order as ready to get</span
                                  >
                                </div>
                              </div>
                              <div
                                class="flex flex-col p-4 space-y-2 border-b border-secondary-foreground/20"
                              >
                                <div>
                                  <span class="font-semibold"
                                    >Payment Details</span
                                  >
                                </div>
                                <div
                                  class="flex flex-col pl-4 space-y-2 text-xs"
                                >
                                  <div
                                    class="flex row justify-between opacity-80"
                                  >
                                    <div class="flex flex-row">
                                      <span>Payment Status:</span>
                                      <span class="pl-2 font-bold"
                                        >{{ order.paymentStatus }}
                                      </span>
                                    </div>
                                    <div class="flex flex-row">
                                      <span>Payment Method:</span>
                                      <span class="pl-2"
                                        >{{ order.paymentMethod }}
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    class="flex flex-row text-primary font-bold"
                                  >
                                    <span>Total Payment:</span>
                                    <span class="pl-2">
                                      {{ order.totalPrice }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="flex flex-row justify-between p-4">
                                <div
                                  class="flex flex-row items-center justify-start"
                                >
                                  <input
                                    type="checkbox"
                                    id="checkbox"
                                    class="w-6 h-6 text-primary/80 bg-background border-primary/40 rounded focus:ring-primary focus:ring-2"
                                    :checked="order.paymentStatus === 'paid'"
                                    @change="markAsPaid(order)"
                                  />
                                  <label for="checkbox" class="pl-2 text-sm"
                                    >Mark Status as Paid
                                  </label>
                                </div>
                                <div
                                  class="flex flex-row justify-end space-x-2"
                                >
                                  <button
                                    class="p-2 bg-emerald-600 font-semibold text-white rounded-sm hover:bg-primary/90"
                                  >
                                    Contact Customer
                                  </button>
                                  <Button
                                    variant="default"
                                    @click.prevent="toggleDetails(order)"
                                  >
                                    Close
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </tr>
                  </tbody>
                </table>
                <!--Footer-->
                <div
                  class="px-6 py-4 grod gap-3 md:flex md:justify-between md:items-center border-t border-primary/20"
                >
                  <div class="flex flex-row items-center">
                    <p class="text-sm text-secondary-foreground">
                      <span class="font-semibold text-gray-200"
                        >Showing {{ (currentPage - 1) * itemsPerPage + 1 }}-{{
                          Math.min(
                            currentPage * itemsPerPage,
                            filteredOrders.length
                          )
                        }}
                      </span>
                      results
                    </p>
                    <p
                      class="pl-1 text-sm text-secondary-foreground opacity-50"
                    >
                      out of {{ orders.length }} total orders
                    </p>
                  </div>
                  <div>
                    <div class="inline-flex gap-x-2">
                      <button
                        type="button"
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-primary/20 bg-background text-secondary-foreground shadow-sm hover:bg-primary/50 hover:border-muted disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-1 focus:ring-primary/60"
                        @click.prevent="prevPage"
                      >
                        <svg
                          class="flex-shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="m15 18-6-6 6-6" />
                        </svg>
                        Prev
                      </button>

                      <button
                        type="button"
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-primary/20 bg-background text-secondary-foreground shadow-sm hover:bg-primary/50 hover:border-muted disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-1 focus:ring-primary/60"
                        @click.prevent="nextPage"
                      >
                        Next
                        <svg
                          class="flex-shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/admin/dashboard/views/AdminNavBar.vue";
import AdminSidebar from "@/components/admin/dashboard/views/AdminSidebar.vue";
import { ref, computed } from "vue";
import { MagnifyingGlassIcon } from "@radix-icons/vue";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown, Download } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { Order } from "../models/adminOrdersModel.ts";
import { setup as setupOrdersController } from "../controllers/adminOrdersController.ts";

const open = ref(false);
const searchTerm = ref("");
const value = ref<string>("all");

const { orders, markAsPaid, declineOrder, readyOrder, loadingPage } =
  setupOrdersController();

const date = ref({
  start: new Date(2024, 0, 1),
  end: new Date(),
});
const showFullDetails = ref(orders.value.map(() => false));

const toggleDetails = (order: Order) => {
  const index = orders.value.indexOf(order);
  if (index !== -1) {
    showFullDetails.value[index] = !showFullDetails.value[index];
  }
};

const frameworks = [
  { value: "all", label: "Show All" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "declined", label: "Declined" },
  { value: "cancelled", label: "Cancelled" },
];

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const orderDate = new Date(order.dateOrdered);

    const matchesSearchTerm = [
      order.orderRefNum,
      order.userName,
      ...order.cart.map((product) => product.productName),
    ]
      .filter((field) => field) // Remove undefined fields
      .some((field) =>
        field.toLowerCase().includes(searchTerm.value.toLowerCase())
      );

    const matchesSelectedCategory =
      value.value !== "all" ? order.paymentStatus === value.value : true;

    const isWithinDateRange =
      (!date.value.start || orderDate >= date.value.start) &&
      (!date.value.end || orderDate <= date.value.end);

    return matchesSearchTerm && matchesSelectedCategory && isWithinDateRange;
  });
});

const currentPage = ref(1);
const itemsPerPage = ref(10);

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredOrders.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredOrders.value.length / itemsPerPage.value);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
</script>
