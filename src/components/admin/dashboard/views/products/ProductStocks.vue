<template>
  <NavBar />
  <AdminSidebar />
  <div class="p-4 ml-2 pb-16 sm:ml-64">
    <div class="flex flex-row justify-start py-10">
      <div class="flex">
        <span class="material-symbols-outlined py-2 px-2 text-5xl">
          inventory
        </span>
      </div>
      <div class="flex flex-col">
        <h1 class="text-2xl">Stocks Inventory</h1>
        <p class="text-sm py-1">
          Manage the stocks of the products and sizes available in the store.
        </p>
      </div>
    </div>
    <div class="flex flex-col p-4 border-2 rounded-lg py-5">
      <div class="flex flex-row items-center justify-between border-b-2">
        <div class="flex flex-row items-center justify-start">
          <h1 class="font-bold text-xl tracking-wide mb-2">Product Stocks</h1>
          <button @click.prevent="refreshPage" class="cursor-pointer">
            <span class="material-symbols-outlined text-sm"> sync </span>
          </button>
        </div>
        <Sheet>
          <SheetTrigger as-child>
            <label
              class="text-base font-semibold hover:underline text-primary cursor-pointer"
              >Add Size?</label
            >
          </SheetTrigger>
          <SheetContent
            side="bottom"
            class="h-[800px] md:h-[320px] overflow-auto"
          >
            <SheetHeader>
              <SheetTitle>
                <div class="text-center text-xl pb-2 border-b">
                  <label class="uppercase font-bold">Add Size</label>
                </div>
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
              <div
                v-for="size in product.sizes['N/A']
                  ? ['N/A']
                  : [
                      'XXS',
                      'XS',
                      'S',
                      'M',
                      'L',
                      'XL',
                      '2XL',
                      '3XL',
                      '4XL',
                      '5XL',
                    ]"
                :key="size"
                :class="{ 'opacity-50': product.sizes[size] }"
                class="flex items-center border p-2 rounded-sm space-x-2"
              >
                <input
                  type="checkbox"
                  :id="size"
                  :value="size"
                  @change="
                    handleSizeSelection(
                      size,
                      ($event.target as HTMLInputElement)?.checked
                    )
                  "
                  :disabled="product.sizes[size]"
                  class="p-3 bg-background text-primary/80 border-primary/40 rounded focus:ring-primary focus:ring-2"
                />
                <label :for="size" class="text-xs"> {{ size }}</label>
                <div
                  v-if="!product.sizes[size]"
                  class="flex flex-row items-center space-x-2"
                >
                  <label class="text-xs">| Stocks: </label>
                  <input
                    type="number"
                    @input="
                      handleStocksInput(
                        size,
                        Number(($event.target as HTMLInputElement)?.value)
                      )
                    "
                    class="border w-20 text-xs md:text-sm rounded-lg bg-background border-primary/40 text-secondary-foreground"
                  />
                  <label class="text-xs">Price: </label>
                  <input
                    type="number"
                    @input="
                      handlePriceInput(
                        size,
                        Number(($event.target as HTMLInputElement)?.value)
                      )
                    "
                    class="border w-20 text-xs md:text-sm rounded-lg bg-background border-primary/40 text-secondary-foreground"
                  />
                </div>
                <div v-else>
                  <label class="text-xs">(Size Already in Stocks)</label>
                </div>
              </div>
            </div>
            <SheetFooter class="pt-2">
              <SheetClose as-child>
                <Button
                  @click.prevent="addSize(product.id, selectedSizesData)"
                  type="submit"
                  :class="{
                    'opacity-50': selectedSizesData.some(
                      (item:any) =>  item.data.price === 0
                    ),
                  }"
                >
                  Add Size
                </Button>
                <Button variant="outline" class="mb-2">Cancel</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div class="p-1" v-if="product">
        <div class="flex flex-col mt-4">
          <div
            class="flex flex-col md:flex-row justify-between items-center space-x-2"
          >
            <div class="flex flex-row items-center space-x-2">
              <label for="product-quantity" class="text-sm font-medium py-2">
                Current Stocks
              </label>
              <div :class="cn('grid gap-2', $attrs.class ?? '')">
                <Popover>
                  <PopoverTrigger as-child>
                    <Button
                      id="date"
                      :variant="'outline'"
                      :class="
                        cn(
                          'w-[210px] md:w-[300px] justify-start text-left font-normal text-xs md:text-sm',
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

            <div class="flex items-end justify-end py-1">
              <div class="relative w-full max-w-xs items-center">
                <Input
                  id="search"
                  type="text"
                  placeholder="Search Size..."
                  class="pl-10 text-xs md:text-sm"
                  v-model="searchSize"
                />
                <span
                  class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
                >
                  <MagnifyingGlassIcon class="size-5 text-gray-600" />
                </span>
              </div>
            </div>
          </div>
          <div class="overflow-auto">
            <table class="table-auto w-full border">
              <thead class="border-b">
                <tr class="text-sm">
                  <th class="text-left p-2">
                    <div class="flex flex-row items-center">
                      Date
                      <button
                        @click.prevent="
                          sortOptions.key = 'dateAdded';
                          sortOptions.order =
                            sortOptions.order === 'asc' ? 'desc' : 'asc';
                        "
                      >
                        <ChevronsUpDown class="h-3" />
                      </button>
                    </div>
                  </th>
                  <th class="text-left p-2">
                    <div class="flex flex-row items-center">
                      Size
                      <button
                        @click.prevent="
                          sortOptions.key = 'size';
                          sortOptions.order =
                            sortOptions.order === 'asc' ? 'desc' : 'asc';
                        "
                      >
                        <ChevronsUpDown class="h-3" />
                      </button>
                    </div>
                  </th>
                  <th class="text-right p-2">
                    <div class="flex flex-row items-center">
                      Price
                      <button
                        @click.prevent="
                          sortOptions.key = 'price';
                          sortOptions.order =
                            sortOptions.order === 'asc' ? 'desc' : 'asc';
                        "
                      >
                        <ChevronsUpDown class="h-3" />
                      </button>
                    </div>
                  </th>
                  <th class="text-right p-2">
                    <div class="flex flex-row items-center">
                      Stocks
                      <button
                        @click.prevent="
                          sortOptions.key = 'stocks';
                          sortOptions.order =
                            sortOptions.order === 'asc' ? 'desc' : 'asc';
                        "
                      >
                        <ChevronsUpDown class="h-3" />
                      </button>
                    </div>
                  </th>
                  <th class="text-right p-2">
                    <div class="flex flex-row items-center">
                      Reserved Stocks
                      <button
                        @click.prevent="
                          sortOptions.key = 'reserved_stocks';
                          sortOptions.order =
                            sortOptions.order === 'asc' ? 'desc' : 'asc';
                        "
                      >
                        <ChevronsUpDown class="h-3" />
                      </button>
                    </div>
                  </th>
                  <th class="text-left p-2">Remaining Stocks</th>
                  <th class="text-left pl-5 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(sizeData, sizeName) in filteredSizes">
                  <tr
                    v-for="(size, index) in sizeData"
                    :key="`${sizeName}-${index}`"
                    class="text-xs hover:bg-primary/10"
                  >
                    <td class="text-left p-2">
                      <label
                        v-if="size.dateModified"
                        class="font-medium text-primary hover:underline hover:cursor-pointer text-xs"
                      >
                        <HoverCard>
                          <HoverCardTrigger>{{
                            formatDate(size.dateModified)
                          }}</HoverCardTrigger>
                          <HoverCardContent>
                            <span class="text-xs"
                              >Date Modified -- Originally Added on:
                              {{ formatDate(size.dateAdded) }}</span
                            >
                          </HoverCardContent>
                        </HoverCard>
                      </label>
                      <span v-else>{{ formatDate(size.dateAdded) }}</span>
                    </td>
                    <td class="text-left p-2">{{ sizeName }}</td>
                    <td class="text-left p-2">P{{ size.price }}</td>
                    <td class="text-left pl-6 p-2">{{ size.stocks }}</td>
                    <td class="text-left pl-12 p-2">
                      {{ size.reserved_stocks }}
                    </td>
                    <td class="text-left pl-14 p-2">
                      {{ size.remaining_stocks }}
                    </td>
                    <td class="text-left p-2">
                      <div
                        class="flex flex-row text-left justify-start items-center space-x-2"
                      >
                        <Sheet>
                          <SheetTrigger
                            as-child
                            @click.prevent="
                              quantity = 0;
                              changePrice = false;
                            "
                          >
                            <span
                              class="text-[10px] text-primary hover:underline cursor-pointer"
                              >Add</span
                            >
                          </SheetTrigger>
                          <SheetContent
                            side="bottom"
                            class="h-[350px] md:h-[300px]"
                          >
                            <SheetHeader>
                              <SheetTitle>
                                <div class="text-center text-xl pb-2 border-b">
                                  <label class="uppercase font-bold"
                                    >Add Stocks</label
                                  >
                                </div>
                              </SheetTitle>
                              <SheetDescription></SheetDescription>
                            </SheetHeader>
                            <div
                              class="flex justify-center text-center flex-row items-center pt-2"
                            >
                              <label class="">Size:</label>
                              <label class="pl-2"> {{ sizeName }}</label>
                              <label class="pl-2"
                                >Current Stocks: {{ size.stocks }}</label
                              >
                            </div>
                            <div
                              class="flex flex-row justify-center items-center py-2"
                            >
                              <div
                                class="relative flex items-center max-w-[8rem]"
                              >
                                <button
                                  type="button"
                                  id="decrement-button"
                                  data-input-counter-decrement="quantity-input"
                                  @click.prevent="decrement"
                                  class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                                >
                                  <svg
                                    class="w-3 h-3 text-gray-900 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 2"
                                  >
                                    <path
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M1 1h16"
                                    />
                                  </svg>
                                </button>
                                <input
                                  type="text"
                                  id="quantity-input"
                                  min="1"
                                  data-input-counter
                                  v-model="quantity"
                                  aria-describedby="helper-text-explanation"
                                  class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
                                  placeholder="0"
                                  required
                                />
                                <button
                                  type="button"
                                  id="increment-button"
                                  data-input-counter-increment="quantity-input"
                                  @click.prevent="increment"
                                  class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                                >
                                  <svg
                                    class="w-3 h-3 text-gray-900 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                  >
                                    <path
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M9 1v16M1 9h16"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div
                              class="flex justify-center text-center pt-2 space-x-2"
                            >
                              <button
                                @click.prevent="changePrice = true"
                                class="cursor-pointer"
                              >
                                <label
                                  class="text-sm cursor-pointer hover:underline"
                                  >Change Price?</label
                                >
                              </button>
                              <input
                                v-if="changePrice"
                                v-model="size.price"
                                type="number"
                                class="border text-xs md:text-sm rounded-lg bg-background border-primary/40 text-secondary-foreground"
                              />
                            </div>
                            <SheetFooter>
                              <SheetClose as-child>
                                <Button
                                  @click.prevent="
                                    addStocks(
                                      product.id,
                                      sizeName,
                                      quantity,
                                      size.price
                                    )
                                  "
                                  :disabled="quantity <= 0 || size.price <= 0"
                                  type="submit"
                                >
                                  Save changes
                                </Button>
                                <Button variant="outline" class="mb-2"
                                  >Cancel</Button
                                >
                              </SheetClose>
                            </SheetFooter>
                          </SheetContent>
                        </Sheet>
                        <Sheet>
                          <SheetTrigger
                            as-child
                            v-bind:disabled="size.reserved_stocks > 0"
                            @click.prevent="openEdit(size)"
                          >
                            <button
                              title="Can't Edit if there are reservations"
                            >
                              <span
                                class="text-[10px] text-primary hover:underline cursor-pointer"
                                :class="{
                                  'opacity-50 hover:cursor-not-allowed hover:no-underline':
                                    size.reserved_stocks > 0,
                                }"
                                >Edit</span
                              >
                            </button>
                          </SheetTrigger>
                          <SheetContent
                            v-if="size.reserved_stocks == 0"
                            side="bottom"
                            class="h-[350px] md:h-[300px]"
                          >
                            <SheetHeader>
                              <SheetTitle>
                                <div class="text-center text-xl pb-2 border-b">
                                  <label class="uppercase font-bold"
                                    >Edit Stock</label
                                  >
                                </div>
                              </SheetTitle>
                              <SheetDescription></SheetDescription>
                            </SheetHeader>
                            <div
                              class="flex flex-row justify-center items-center text-center py-2"
                            >
                              <label class="">Size:</label>
                              <label class="pl-2"> {{ sizeName }}</label>
                            </div>

                            <div
                              class="flex flex-row justify-center items-center py-2"
                            >
                              <label class="pr-4">Current Stocks: </label>
                              <div
                                class="relative flex items-center max-w-[8rem]"
                              >
                                <button
                                  type="button"
                                  id="decrement-button"
                                  data-input-counter-decrement="quantity-input"
                                  @click.prevent="decrement"
                                  class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                                >
                                  <svg
                                    class="w-3 h-3 text-gray-900 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 2"
                                  >
                                    <path
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M1 1h16"
                                    />
                                  </svg>
                                </button>
                                <input
                                  type="text"
                                  id="quantity-input"
                                  min="1"
                                  data-input-counter
                                  v-model="tempStocks"
                                  aria-describedby="helper-text-explanation"
                                  class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
                                  placeholder="0"
                                  required
                                />
                                <button
                                  type="button"
                                  id="increment-button"
                                  data-input-counter-increment="quantity-input"
                                  @click.prevent="increment"
                                  class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                                >
                                  <svg
                                    class="w-3 h-3 text-gray-900 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                  >
                                    <path
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M9 1v16M1 9h16"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div
                              class="flex justify-center text-center pt-2 space-x-2"
                            >
                              <button
                                @click.prevent="changePrice = true"
                                class="cursor-pointer"
                              >
                                <label
                                  class="text-sm cursor-pointer hover:underline"
                                  >Change Price?</label
                                >
                              </button>
                              <input
                                v-if="changePrice"
                                v-model="tempPrice"
                                type="number"
                                class="border text-xs md:text-sm rounded-lg bg-background border-primary/40 text-secondary-foreground"
                              />
                            </div>
                            <SheetFooter>
                              <SheetClose as-child>
                                <Button
                                  @click="
                                    editStock(
                                      product.id,
                                      sizeName,
                                      index,
                                      tempStocks,
                                      tempPrice
                                    )
                                  "
                                  type="submit"
                                >
                                  Save Changes</Button
                                >
                                <Button variant="outline" class="mb-2"
                                  >Cancel</Button
                                >
                              </SheetClose>
                            </SheetFooter>
                          </SheetContent>
                        </Sheet>
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <button
                              title="Can only delete the latest stock if there are no reservations and there are more than two stocks"
                              class="cursor-pointer"
                              :disabled="
                                index !== product.sizes[sizeName].length - 1 ||
                                size.reserved_stocks > 0 ||
                                product.sizes[sizeName].length <= 2
                              "
                            >
                              <span
                                class="text-[10px] text-primary hover:underline cursor-pointer"
                                :class="{
                                  'opacity-50 hover:cursor-not-allowed hover:no-underline':
                                    index !==
                                      product.sizes[sizeName].length - 1 ||
                                    size.reserved_stocks > 0 ||
                                    product.sizes[sizeName].length <= 2,
                                }"
                                >Remove</span
                              >
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Remove Stocks
                              </AlertDialogTitle>
                              <AlertDialogDescription
                                class="text-black text-opacity-70"
                              >
                                Are you sure you want to remove the stocks for
                                this size? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogAction
                                @click.prevent="
                                  removeStocks(product.id, sizeName, index)
                                "
                              >
                                Remove
                              </AlertDialogAction>
                              <AlertDialogAction
                                class="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                              >
                                Cancel
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="h-56"></div>
  <LoadingComponent v-if="loadingPage" />
</template>

<script setup lang="ts">
import NavBar from "../AdminNavBar.vue";
import AdminSidebar from "../AdminSidebar.vue";
import { setup as setupProductController } from "@/components/admin/dashboard/controllers/adminProductsController";
import { ChevronsUpDown } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-icons/vue";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { ref, computed, reactive, Ref } from "vue";
import LoadingComponent from "@/components/feature/misc/LoadingComponent.vue";
import { useRouter } from "vue-router";

const {
  product,
  sortedSizes,
  addStocks,
  addSize,
  editStock,
  loadingPage,
  removeStocks,
} = setupProductController();

const changePrice = ref(false);
const date = ref({
  start: new Date(2024, 0, 1),
  end: new Date(),
});

const searchSize = ref("");

const sortOptions = reactive({
  key: "",
  order: "asc",
});

const filteredSizes = computed(() => {
  if (!date.value.start || !date.value.end) {
    return sortedSizes.value;
  }

  const startDate = date.value.start.getTime();
  const endDate = date.value.end.getTime();

  const result: { [key: string]: any[] } = {};

  for (const size in sortedSizes.value) {
    if (
      !searchSize.value ||
      size.toLowerCase().includes(searchSize.value.toLowerCase())
    ) {
      result[size] = sortedSizes.value[size].filter((stockEntry: any) => {
        const stockEntryDate = new Date(stockEntry.dateAdded).getTime();
        return stockEntryDate >= startDate && stockEntryDate <= endDate;
      });
    }
  }

  const sizesArray = Object.entries(result);

  sizesArray.sort((a: any, b: any) => {
    let comparison = 0;

    if (sortOptions.key === "size") {
      // Sort alphabetically
      comparison = a[0].localeCompare(b[0]);
    } else {
      // Sort by date, price, stocks, or reserved_stocks
      const totalA = a[1].reduce(
        (total: number, stockEntry: any) => total + stockEntry[sortOptions.key],
        0
      );
      const totalB = b[1].reduce(
        (total: number, stockEntry: any) => total + stockEntry[sortOptions.key],
        0
      );

      if (totalA > totalB) {
        comparison = 1;
      } else if (totalA < totalB) {
        comparison = -1;
      }
    }

    return sortOptions.order === "asc" ? comparison : -comparison;
  });

  const sortedResult: { [key: string]: any[] } = {};

  for (const [size, stocks] of sizesArray) {
    sortedResult[size] = stocks;
  }

  return sortedResult;
});

const formatDate = (dateString: string) => {
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const date = new Date(dateString);
  const formattedDate = (date.toLocaleDateString as any)([], dateOptions);
  const formattedTime = (date.toLocaleTimeString as any)([], timeOptions);
  return `${formattedDate} (${formattedTime})`;
};

let quantity = ref(0);
let tempStocks = ref(0);
let tempPrice = ref(0);

const increment = () => {
  quantity.value++;
  tempStocks.value++;
};

const decrement = () => {
  if (quantity.value > 0) {
    quantity.value--;
  }
  if (tempStocks.value > 0) {
    tempStocks.value--;
  }
};

const openEdit = (size: any) => {
  tempStocks.value = size.stocks;
  tempPrice.value = size.price;
  changePrice.value = false;
};

type SizeData = {
  sizeName?: string;
  dateAdded?: string;
  reserved_stocks?: number;
  stocks?: number;
  price?: number;
  remaining_stocks?: number;
};

let selectedSizesData: Ref<Array<{ size: string; data: SizeData }>> = ref([]);

let sizeData: Record<string, SizeData> = {};

function handleSizeSelection(size: string, checked: boolean) {
  if (checked) {
    if (!sizeData[size]) {
      sizeData[size] = {};
    }
    selectedSizesData.value.push({ size, data: sizeData[size] });
  } else {
    selectedSizesData.value = selectedSizesData.value.filter(
      (item) => item.size !== size
    );
  }
}

function handleStocksInput(size: string, value: number) {
  const item = selectedSizesData.value.find((item) => item.size === size);
  if (item) {
    if (!item.data) {
      item.data = { stocks: 0, price: 0 };
    }
    item.data.stocks = value;
  }
}

function handlePriceInput(size: string, value: number) {
  const item = selectedSizesData.value.find((item) => item.size === size);
  if (item) {
    if (!item.data) {
      item.data = { stocks: 0, price: 0 };
    }
    item.data.price = value;
  }
}

const router = useRouter();
const refreshPage = () => {
  router.go(0);
};
</script>
