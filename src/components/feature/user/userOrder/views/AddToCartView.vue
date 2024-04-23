<template>
  <SheetContent class="bg-gray-100">
    <Tabs
      default-value="cart"
      v-model="selectedTab"
      class="h-screen overflow-auto"
    >
      <SheetHeader>
        <SheetTitle>
          <TabsList class="grid w-full h-12 grid-cols-2">
            <TabsTrigger value="cart">
              <span
                class="material-symbols-outlined"
                :class="{ 'text-primary/90': selectedTab === 'cart' }"
              >
                add_shopping_cart
              </span>
              <span
                class="pl-1 text-xs md:text-sm"
                :class="{ 'text-primary/90': selectedTab === 'cart' }"
                >Add To Cart</span
              >
            </TabsTrigger>
            <TabsTrigger value="order">
              <span
                class="material-symbols-outlined"
                :class="{ 'text-primary/90': selectedTab === 'order' }"
              >
                shopping_cart
              </span>
              <span
                class="pl-2 text-xs md:text-sm"
                :class="{ 'text-primary/90': selectedTab === 'order' }"
                >Cart</span
              >
            </TabsTrigger>
          </TabsList>
        </SheetTitle>
        <SheetDescription></SheetDescription>
      </SheetHeader>
      <form @submit.prevent="handleFormCartSubmit">
        <TabsContent value="cart">
          <div class="flex flex-col flex-wrap py-2">
            <div class="flex flex-col">
              <Label>Product - {{ product.category }}</Label>
              <span class="pt-4 pl-4 text-primary font-bold">
                {{ product.name }}
              </span>
            </div>
            <div class="flex flex-col flex-wrap py-6" v-if="hasAvailableStocks">
              <span class="text-sm"> Available Sizes & Stocks</span>
              <div class="flex flex-row flex-wrap py-4 pl-4 space-x-1">
                <Button
                  v-for="sizeName in Object.keys(product.sizes)"
                  :key="sizeName"
                  :variant="
                    selectedSize.size === sizeName ? 'default' : 'secondary'
                  "
                  @click.prevent="selectSize(sizeName)"
                  class="mb-2"
                  :disabled="isButtonDisabled(sizeName)"
                >
                  {{ sizeName }} -
                  <template v-if="product.sizes[sizeName]">
                    {{ calculateTotalRemainingStocks(product.sizes[sizeName]) }}
                  </template>
                </Button>
              </div>
            </div>

            <!--Size Pre Order-->
            <div
              class="flex flex-col space-y-2"
              v-if="Object.keys(product.sizes)[0] !== 'N/A'"
            >
              <div class="flex flex-row items-center">
                <span class="text-xs"
                  >Size Not Available? Click
                  <button
                    class="p-2 rounded-sm bg-emerald-700 text-white"
                    @click.prevent="newAddToCartData.isPreOrdered = true"
                  >
                    Pre-Order
                  </button>
                  <HoverCard>
                    <HoverCardTrigger
                      ><span
                        class="material-symbols-outlined text-sm pt-2.5 pl-1 opacity-80 cursor-pointer"
                      >
                        help
                      </span></HoverCardTrigger
                    >
                    <HoverCardContent
                      ><span class="text-xs">
                        Please note, choosing to pre-order may result in a delay
                        in receiving your order.</span
                      >
                    </HoverCardContent>
                  </HoverCard>
                </span>
              </div>
              <!--Pre-Order Input Field-->
              <div
                v-show="newAddToCartData.isPreOrdered"
                class="flex flex-row space-x-2 text-xs items-center"
              >
                <label>Size: </label>
                <select
                  v-model="newAddToCartData.size"
                  class="p-2 w-24 h-8 text-xs rounded-sm"
                >
                  <option value="XXS">XXS</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="2XL">2XL</option>
                  <option value="3XL">3XL</option>
                  <option value="4XL">4XL</option>
                  <option value="5XL">5XL</option>
                </select>
                <button
                  @click.prevent="
                    newAddToCartData.isPreOrdered = false;
                    newAddToCartData.size = '';
                  "
                  class="p-2 rounded-sm bg-red-700 text-white"
                >
                  Remove
                </button>
              </div>
            </div>
            <!--N/A Pre Order Div-->
            <div v-else class="pb-4">
              <div class="flex flex-row items-center">
                <span class="text-xs"
                  >Out of Stocks? Click
                  <button
                    class="p-2 rounded-sm bg-emerald-700 text-white"
                    @click.prevent="newAddToCartData.isPreOrdered = true"
                  >
                    Pre-Order
                  </button>
                  <HoverCard>
                    <HoverCardTrigger
                      ><span
                        class="material-symbols-outlined text-sm pt-2.5 pl-1 opacity-80 cursor-pointer"
                      >
                        help
                      </span></HoverCardTrigger
                    >
                    <HoverCardContent
                      ><span class="text-xs">
                        Please note, choosing to pre-order may result in a delay
                        in receiving your order.</span
                      >
                    </HoverCardContent>
                  </HoverCard>
                </span>
              </div>
              <!--Pre-Order N/A Field-->
              <div
                v-show="newAddToCartData.isPreOrdered"
                class="flex flex-row pt-4 space-x-2 text-xs items-center"
              >
                <label class="font-bold text-sm">Pre-Ordered!</label>
                <button
                  @click.prevent="newAddToCartData.isPreOrdered = false"
                  class="p-2 rounded-sm bg-red-700 text-white"
                >
                  Undo
                </button>
              </div>
            </div>

            <div class="flex flex-row pt-4">
              <span class="pt-2.5 pr-2 text-[10px] md:text-xs">
                Quantity :
              </span>
              <div class="relative flex items-center max-w-[8rem]">
                <button
                  type="button"
                  id="decrement-button"
                  @click.prevent="decrement"
                  data-input-counter-decrement="quantity-input"
                  class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                >
                  <svg
                    class="w-3 h-3 text-gray-900"
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
                  type="number"
                  id="quantity-input"
                  data-input-counter
                  aria-describedby="helper-text-explanation"
                  class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs md:text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
                  placeholder="999"
                  v-model.number="newAddToCartData.quantity"
                  :disabled="
                    !selectedSize.size || !newAddToCartData.isPreOrdered
                  "
                  :min="1"
                  :max="
                    newAddToCartData.isPreOrdered
                      ? undefined
                      : selectedSize.data.stocks
                      ? Number(selectedSize.data.stocks)
                      : undefined
                  "
                  required
                />
                <button
                  type="button"
                  id="increment-button"
                  @click.prevent="increment"
                  data-input-counter-increment="quantity-input"
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
              <div class="flex flex-col md:flex-row px-2 items-center">
                <span class="pt-2.5 px-1 md:px-2 text-[10px] md:text-xs"
                  >Initial Price :</span
                >
                <div class="flex flex-row items-center">
                  <span class="text-[10px] md:text-xs text-primary">
                    {{ selectedSize.data.price * newAddToCartData.quantity }}
                  </span>
                  <HoverCard>
                    <HoverCardTrigger>
                      <span
                        class="material-symbols-outlined text-sm pt-1 pl-1 opacity-80 hover:course-pointer"
                      >
                        help
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <span class="text-xs"> Prices may vary over time. </span>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
            </div>
          </div>
          <SheetFooter
            class="flex flex-col sm:flex-row justify-between items-center"
          >
            <SheetClose as-child class="w-full sm:w-auto">
              <router-link
                :to="`/product/${product.id}`"
                class="w-full sm:w-auto"
              >
                <Button variant="ghost" class="w-full sm:w-auto"
                  >Preview Product
                </Button>
              </router-link>
              <Button type="submit" variant="default"> Add To Cart </Button>
            </SheetClose>
          </SheetFooter>
        </TabsContent>
      </form>
      <TabsContent value="order">
        <div v-for="(order, index) in orderData" :key="index" class="pb-8">
          <div class="flex flex-col flex-wrap py-2">
            <div class="flex flex-row items-center">
              <span class="material-symbols-outlined">
                <span class="material-symbols-outlined">
                  add_shopping_cart
                </span>
              </span>
              <Label class="pl-1"> Cart Number: </Label>
              <Label class="ml-2 text-primary"> {{ index + 1 }}</Label>
            </div>
            <div v-if="order.cart.length > 0">
              <div
                v-for="(product, productIndex) in order.cart"
                :key="productIndex"
              >
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div class="flex justify-between truncate">
                        <span class="text-primary text-xs pr-1"
                          >{{
                            getProductById(product.productId)
                              ? getProductById(product.productId).name
                              : "Product not found"
                          }}
                          -
                        </span>
                        <span class="text-primary text-xs">
                          {{
                            getProductById(product.productId)
                              ? getProductById(product.productId).faction
                              : "Product not found"
                          }}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div
                        class="flex flex-row justify-between px-4 text-[10px] md:text-sm"
                      >
                        <label>Quantity: {{ product.quantity }}</label>
                        <label v-if="product.size !== ''"
                          >Size: {{ product.size }}</label
                        >
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
          <SheetFooter class="overflow-auto pt-2">
            <SheetClose as-child v-if="!ifCartEmpty">
              <div class="flex flex-row items-center space-x-2">
                <router-link
                  :to="{
                    name: 'confirmOrder',
                    params: { id: order.id },
                  }"
                >
                  <button
                    class="p-2 text-xs md:p-2.5 md:text-sm bg-red-800 text-white rounded-sm"
                  >
                    Edit Cart
                  </button>
                </router-link>
                <router-link
                  :to="{
                    name: 'confirmOrder',
                    params: { id: order.id },
                  }"
                >
                  <button
                    class="p-2 text-xs md:p-2.5 md:text-sm bg-emerald-700 text-white rounded-sm"
                    type="submit"
                  >
                    Submit Order
                  </button>
                </router-link>
              </div>
            </SheetClose>
          </SheetFooter>
        </div>
        <SheetFooter v-if="totalOrdersOnQueue === 0">
          <div class="flex w-full items-center justify-center text-center pt-8">
            <span class="material-symbols-outlined text-6xl">
              production_quantity_limits
            </span>
            <span class="text-primary pt-3">This cart is empty</span>
          </div>
        </SheetFooter>
      </TabsContent>
    </Tabs>
    <div
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80"
      v-if="isLoading || isUploadSuccessful"
    >
      <div v-if="isLoading"><LoadingComponent /></div>
      <div v-if="isUploadSuccessful"><SucessfulComponent /></div>
    </div>
  </SheetContent>
</template>

<script setup lang="ts">
import { ref, defineProps, computed, inject, onMounted } from "vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  setup as setupAddToCartController,
  getOnQueueOrdersController,
  orderData as OrderDataType,
} from "../controllers/addToCartController";
import { db, auth } from "@/firebase/init";
import { useRouter } from "vue-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LoadingComponent from "../components/LoadingComponent.vue";
import SucessfulComponent from "../components/SucessfulComponent.vue";
import { query, where, getDocs, collection } from "firebase/firestore";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { initFlowbite } from "flowbite";

const { handleAddToCartSubmit, newAddToCartData } = setupAddToCartController();

const router = useRouter();
const orderData = ref<OrderDataType[] | null>(null);
const ifCartEmpty = ref(true);

type SizeItem = {
  dateAdded: string;
  price: number;
  reserved_stocks: number;
  stocks: number;
  remaining_stocks: number;
};

type SizesData = {
  [size: string]: SizeItem[];
};

type ProductType = {
  id: string;
  name: string;
  category: string;
  coverPhoto: string;
  dateCreated: string;
  description: string;
  faction: string;
  isArchived: boolean;
  isPublished: boolean;
  lastModified: string;
  photos: string[];
  sizes: SizesData;
  totalOrders: number;
  totalSales: number;
  views: number;
};

type GetProductByIdType = (id: string) => ProductType;
const getProductById = inject("getProductById") as GetProductByIdType;
const selectedTab = ref("cart");

const props = defineProps({
  productId: {
    type: String,
    required: true,
  },
});

//console.log("productId in Cart component: ", props.productId);

const increment = () => {
  const sizeItems = product.value.sizes[selectedSize.value.size];
  const totalRemainingStocks = calculateTotalRemainingStocks(sizeItems);
  if (
    newAddToCartData.value.isPreOrdered ||
    newAddToCartData.value.quantity < totalRemainingStocks
  ) {
    newAddToCartData.value.quantity++;
  }
};

const decrement = () => {
  if (newAddToCartData.value.quantity > 0) {
    newAddToCartData.value.quantity--;
  }
};

onMounted(async () => {
  initFlowbite();
  const results = await getOnQueueOrdersController();
  if (results.length > 0) {
    const onQueueOrders = results.filter(
      (result) => result.data.orderStatus === "OnQueue"
    );
    orderData.value = onQueueOrders.map((result) => ({
      ...result.data,
      id: result.id,
    }));
    ifCartEmpty.value = onQueueOrders.every(
      (result) => result.data.cart.length === 0
    );
  }
});

const injectedGetProductById = inject("getProductById") as (
  id: string
) => ProductType;
const product = computed(() => injectedGetProductById(props.productId));
//console.log("Product data: ", product.value);

let isLoading = ref(false);
let isUploadSuccessful = ref(false);

const handleFormCartSubmit = async () => {
  isLoading.value = true;
  if (newAddToCartData.value.quantity === 0) {
    //alert("Please enter a valid number of quantity");
    console.error("Quantity cannot be 0");
    isLoading.value = false;
    return;
  }

  console.log("Form submitted");
  if (auth.currentUser) {
    newAddToCartData.value = {
      productId: product.value.id,
      quantity: newAddToCartData.value.quantity,
      size:
        newAddToCartData.value.isPreOrdered && newAddToCartData.value.size
          ? newAddToCartData.value.size
          : selectedSize.value.size,
      isPreOrdered: newAddToCartData.value.isPreOrdered,
      totalPrice: 0,
    };
    await handleAddToCartSubmit(newAddToCartData.value);

    isLoading.value = false;
    isUploadSuccessful.value = true;

    console.log(`Product added to cart`);
    newAddToCartData.value = {
      productId: "",
      quantity: 0,
      size: "",
      isPreOrdered: false,
      totalPrice: 0,
    };

    // Fetch the updated order data
    const results = await getOnQueueOrdersController();
    if (results.length > 0) {
      const onQueueOrders = results.filter(
        (result) => result.data.orderStatus === "OnQueue"
      );
      orderData.value = onQueueOrders.map((result) => ({
        ...result.data,
        id: result.id,
      }));
      ifCartEmpty.value = onQueueOrders.every(
        (result) => result.data.cart.length === 0
      );
    }

    // Fetch the updated total orders on queue
    await fetchTotalOrdersOnQueue();

    setTimeout(() => {
      isUploadSuccessful.value = false;
      selectedTab.value = "order";
    }, 1500);
  } else {
    router.push({ name: "login" });
    console.error("No user is logged in");
    isLoading.value = false;
  }
};

let _selectedSize = ref({
  size: "",
  data: {
    dateAdded: "",
    price: 0,
    reserved_stocks: 0,
    stocks: 0,
    remaining_stocks: 0,
  },
});

const findAvailableSizeItem = (sizeItems: SizeItem[]): SizeItem | null => {
  for (let i = 0; i < sizeItems.length; i++) {
    const sizeItem = sizeItems[i];
    if (Number(sizeItem.remaining_stocks) > 0) {
      return sizeItem;
    }
  }
  return null;
};

const selectedSize = computed({
  get: () => {
    if (
      product.value &&
      product.value.sizes &&
      Object.keys(_selectedSize.value.data).length === 0
    ) {
      const sizes: Record<string, SizeItem> = {};
      for (let sizeName in product.value.sizes) {
        const sizeItems = product.value.sizes[sizeName];
        const availableSizeItem = findAvailableSizeItem(sizeItems);
        if (availableSizeItem) {
          sizes[sizeName] = availableSizeItem;
          break;
        }
      }
      const firstSizeKey = Object.keys(sizes)[0];
      _selectedSize.value = {
        size: firstSizeKey,
        data: sizes[firstSizeKey],
      };
    }
    return _selectedSize.value;
  },
  set: (value) => {
    _selectedSize.value = value;
  },
});

const selectSize = (size: any) => {
  const sizeItems = product.value.sizes[size];
  if (sizeItems) {
    const totalRemainingStocks = sizeItems.reduce(
      (total, sizeItem) => total + Number(sizeItem.remaining_stocks),
      0
    );
    const availableSizeItem = findAvailableSizeItem(sizeItems);
    if (availableSizeItem) {
      selectedSize.value = {
        size: size,
        data: { ...availableSizeItem, remaining_stocks: totalRemainingStocks },
      };
    }
  }
};

const hasAvailableStocks = computed(() => {
  for (let sizeData of Object.values(product.value.sizes)) {
    if (findAvailableSizeItem(sizeData)) {
      return true;
    }
  }
  return false;
});

const calculateTotalRemainingStocks = (sizeItems: SizeItem[]): number => {
  return sizeItems.reduce(
    (total, sizeItem) => total + Number(sizeItem.remaining_stocks),
    0
  );
};

const isButtonDisabled = (sizeName: string) => {
  const sizeItems = product.value.sizes[sizeName];
  if (!sizeItems) {
    return true;
  }
  const totalRemainingStocks = sizeItems.reduce(
    (total, sizeItem) => total + Number(sizeItem.remaining_stocks),
    0
  );
  return newAddToCartData.value.isPreOrdered || totalRemainingStocks === 0;
};

const totalOrdersOnQueue = ref(0);
//console.log("Total Orders on Queue: ", totalOrdersOnQueue.value);
async function fetchTotalOrdersOnQueue() {
  const userId = auth.currentUser?.uid;
  if (userId) {
    const q = query(
      collection(db, "userOrder"),
      where("userId", "==", userId),
      where("orderStatus", "==", "OnQueue")
    );
    const querySnapshot = await getDocs(q);
    totalOrdersOnQueue.value = querySnapshot.size;
  }
}
onMounted(fetchTotalOrdersOnQueue);
</script>
