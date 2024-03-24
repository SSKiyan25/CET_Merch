<template>
  <NavBar />
  <AdminSidebar />
  <div class="p-4 ml-2 pt-16 sm:ml-64 pb-16">
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
    <div class="flex flex-col p-4 border-2 rounded-lg py-5">
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
                <PopoverContent class="w-auto p-0" align="start">
                  <Calendar v-model.range="date" :columns="2" />
                </PopoverContent>
              </Popover>
            </div>
            <Button variant="outline"><ChevronDown /></Button>
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
              <div class="bg-secondary border-t-2 shadow-sm overflow-hidden">
                <table class="min-w-full divide-y divide-primary/50">
                  <thead class="bg-secondary">
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
                      <th scope="col" class="px-3 py-2 w-2/12 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Product
                        </span>
                      </th>
                      <th scope="col" class="pl-4 py-2 w-2/12 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Customer
                        </span>
                      </th>
                      <th scope="col" class="pl-4 py-2 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Total
                        </span>
                      </th>
                      <th scope="col" class="pl-4 py-2 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Payment Status
                        </span>
                      </th>
                      <th scope="col" class="pl-4 py-2 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Payment Method
                        </span>
                      </th>
                      <th scope="col" class="pl-5 py-2 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Actions
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    v-for="(order, index) in orders"
                    :key="order.id"
                    class="divide-y divide-primary/50"
                  >
                    <tr class="hover:bg-primary/10">
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
                          class="px-2 text-wrap whitespace-normal"
                        >
                          <span class="text-xs text-secondary-foreground/80">{{
                            product.details.name
                          }}</span>
                        </div>
                      </td>
                      <td>
                        <div class="p-3">
                          <span class="text-xs text-secondary-foreground/60"
                            >{{ order.userName }}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div class="px-4">
                          <span class="text-xs text-secondary-foreground/60"
                            >P{{ order.totalPrice }}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div class="p-8 py-3 flex flex-row">
                          <div v-if="order.paymentStatus === 'pending'">
                            <button class="rounded-lg bg-amber-700 py-1.5 px-4">
                              <span
                                class="text-xs font-medium text-secondary-foreground pb-1 cursor-none"
                              >
                                Pending
                              </span>
                            </button>
                          </div>
                          <div v-if="order.paymentStatus === 'paid'">
                            <button class="rounded-lg bg-green-700 py-1.5 px-4">
                              <span
                                class="text-xs font-medium text-secondary-foreground pb-1 cursor-none"
                              >
                                Paid
                              </span>
                            </button>
                          </div>

                          <button
                            class="text-secondary-foreground/60 hover:text-secondary-foreground"
                            title="Edit Status"
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
                        <div class="p-12 py-3">
                          <span class="text-xs text-secondary-foreground"
                            >{{ order.paymentMethod }}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div
                          class="hs-dropdown relative inline-block [--placement:bottom-right] py-1 pl-3.5"
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
                              <button
                                class="bg-red-600 text-white p-2 rounded-sm"
                                title="Archive Order"
                              >
                                <span class="material-symbols-outlined text-sm">
                                  delete
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <div v-if="showFullDetails[index]">
                        <div
                          class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80"
                        >
                          <div
                            class="relative w-full max-w-xl max-h-full bg-secondary rounded-lg shadow overflow-y-auto p-4"
                            style="max-height: 90vh"
                          >
                            <div class="flex flex-col bg-secondary rounded-lg">
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
                                        class="pl-2 underline text-blue-200 cursor-pointer"
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
                                <div>
                                  <span class="font-semibold"
                                    >Order Details</span
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
                                      {{ product.details.name }} --</span
                                    >
                                    <span class="px-2 font-bold text-primary">
                                      Size: {{ product.size }}
                                    </span>
                                    <span class="opacity-80">-- </span
                                    ><span class="font-bold text-primary px-2">
                                      {{ product.quantity }}</span
                                    >
                                    <span class="opacity-80">--</span>

                                    <span class="pl-2 opacity-80"
                                      >Amount: {{ product.totalPrice }}</span
                                    >
                                  </div>
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
                                    class="w-6 h-6 text-primary/80 bg-secondary border-primary/40 rounded focus:ring-primary focus:ring-2"
                                  />
                                  <label for="checkbox" class="pl-2 text-sm"
                                    >Mark Status as Paid
                                  </label>
                                </div>
                                <div
                                  class="flex flex-row justify-end space-x-2"
                                >
                                  <button
                                    class="p-2 bg-primary font-semibold text-primary-foreground rounded-sm hover:bg-primary/90"
                                  >
                                    Contact Customer
                                  </button>
                                  <Button
                                    variant="destructive"
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
                  <div>
                    <p class="text-sm text-gray-400">
                      <span class="font-semibold text-gray-200"> 1-N </span>
                      results
                    </p>
                  </div>
                  <div>
                    <div class="inline-flex gap-x-2">
                      <button
                        type="button"
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-primary/20 bg-muted text-secondary-foreground shadow-sm hover:bg-primary/50 hover:border-muted disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-1 focus:ring-primary/60"
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
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-primary/20 bg-muted text-secondary-foreground shadow-sm hover:bg-primary/50 hover:border-muted disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-1 focus:ring-primary/60"
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
import { ref } from "vue";
import { MagnifyingGlassIcon } from "@radix-icons/vue";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown, Download, ChevronDown } from "lucide-vue-next";
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
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import {
  Order,
  setup as setupOrdersController,
} from "../controllers/adminOrdersController.ts";
const open = ref(false);
const value = ref<string>("");
const { orders } = setupOrdersController();

const date = ref({
  start: new Date(2024, 0, 20),
  end: addDays(new Date(2024, 0, 20), 20),
});
const showFullDetails = ref(orders.value.map(() => false));

const toggleDetails = (order: Order) => {
  const index = orders.value.indexOf(order);
  if (index !== -1) {
    showFullDetails.value[index] = !showFullDetails.value[index];
  }
};

const frameworks = [
  { value: "Paid", label: "Paid" },
  { value: "Pending", label: "Pending" },
  { value: "Declined", label: "Declined" },
  { value: "T-Shirt", label: "T-Shirt" },
  { value: "Polo-Shirt", label: "Polo-Shirt" },
  { value: "Lace", label: "Lace" },
  { value: "Hoodie", label: "Hoodie" },
  { value: "Stickers", label: "Stickers" },
];
</script>
