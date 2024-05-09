<template>
  <div class="relative h-full">
    <div class="flex pt-12 md:pt-24 pb-36 justify-center">
      <div
        class="p-7 w-full md:w-3/4 lg:w-5/6 items-center justify-center bg-accent border border-primary/20 rounded-xl shadow-sm overflow-auto"
      >
        <div class="p-2 border-secondary-foreground/40">
          <div class="flex flex-row justify-between">
            <div class="flex flex-row text-start">
              <span
                class="material-symbols-outlined text-2xl pr-2 text-primary/90"
              >
                shopping_basket
              </span>
              <h1 class="block text-2xl font-bold text-primary/90">
                Your Cart
              </h1>
            </div>
            <div class="flex flex-row items-center justify-center">
              <div>
                <button
                  class="p-2 bg-emerald-800 rounded-sm hover:bg-emerald-700 text-xs md:text-base text-background font-semibold flex items-center"
                  :class="{ 'opacity-50': isOrderOverflow }"
                  :disabled="isOrderOverflow"
                  @click.prevent="handleProcess"
                  title="Will Proceed if there are no overflows in the order."
                >
                  Process Order
                  <span class="material-symbols-outlined ml-2"> start </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr class="w-auto" />
        <div class="pt-2" v-if="!loading">
          <div class="md:p-2 bg-backgound">
            <table class="text-secondary-foreground w-full overflow-auto">
              <thead>
                <tr
                  class="uppercase md:tracking-wide text-[8px] md:text-xs text-primary/90"
                >
                  <th class="p-2 text-left md:w-2/12"></th>
                  <th class="p-2 text-left md:w-3/12">Product Name</th>
                  <th class="p-2 text-left">Size x Quantity</th>
                  <th class="p-2 text-center pr-4 md:pr-12">
                    <div class="flex flex-row items-center justify-center">
                      <span class="align-middle"> Stocks</span>
                      <HoverCard>
                        <HoverCardTrigger>
                          <span
                            class="material-symbols-outlined text-sm align-middle opacity-80 cursor-pointer"
                          >
                            help
                          </span>
                          <HoverCardContent>
                            <span class="text-xs">
                              Size price could vary depending on the stock's
                              price set by the seller.
                            </span>
                          </HoverCardContent>
                        </HoverCardTrigger>
                      </HoverCard>
                    </div>
                  </th>
                  <th class="p-2 text-center pr-4 md:pr-12">
                    <div class="flex flex-row items-center justify-center">
                      <span class="align-middle"> Price</span>
                      <HoverCard>
                        <HoverCardTrigger>
                          <span
                            class="material-symbols-outlined text-sm align-middle opacity-80 cursor-pointer"
                          >
                            help
                          </span>
                          <HoverCardContent>
                            <span class="text-xs">
                              Price depend's on the stock price. If pre-ordered,
                              the price would vary upon receiving.
                            </span>
                          </HoverCardContent>
                        </HoverCardTrigger>
                      </HoverCard>
                    </div>
                  </th>
                  <th class="p-2 pr-4 md:pr-0 text-left">Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(product, index) in cart"
                  :key="index"
                  @click.prevent="currentProductIndex = index"
                  class="border-b border-primary/40 text-[10px] md:text-sm hover:bg-primary/10"
                >
                  <td class="p-2">
                    <img
                      class="md:w-40 md:h-40 rounded-sm"
                      :src="product.details.coverPhoto"
                      :alt="product.name"
                    />
                  </td>
                  <td
                    class="p-2 text-[8px] md:text-sm text-wrap whitespace-normal"
                  >
                    {{ product.details?.name }}
                  </td>
                  <td class="p-2 md:pl-4">
                    {{ product.size }} x {{ product.quantity }}
                  </td>
                  <td
                    class="p-2 pl-2 md:pl-10 text-[8px] md:text-sm text-wrap whitespace-normal"
                  >
                    <span v-if="product.isPreOrdered">
                      Pre-Ordered - {{ product.quantity }}
                    </span>

                    <div
                      v-for="(sizeDetail, index) in product.sizeDetails"
                      v-if="!product.isPreOrdered"
                      :key="index"
                    >
                      <div v-if="!sizeDetail.notEnoughStocks" class="text-sm">
                        <span
                          v-if="sizeDetail.quantity !== 0"
                          class="text-[6px] font-bold md:font-medium md:text-xs"
                          >| {{ sizeDetail.quantity }} stocks ready for purchase
                          |</span
                        >
                      </div>
                      <div
                        v-else
                        class="text-[6px] md:text-[10px] text-primary font-semibold text-wrap"
                      >
                        <p class="text-wrap">
                          Not Enough Stocks for the remaining
                          {{ sizeDetail.quantity }}
                        </p>
                        <p class="-mt-1">amount of size</p>
                        <Sheet>
                          <SheetTrigger
                            as-child
                            @click.prevent="openEdit(product)"
                          >
                            <button class="hover:underline">
                              <span>Edit Amount of Order?</span>
                            </button>
                          </SheetTrigger>
                          <SheetContent
                            side="bottom"
                            class="h-[350px] md:h-[300px]"
                          >
                            <SheetHeader>
                              <SheetTitle>
                                <div
                                  class="text-center text-lg md:text-xl pb-2 border-b"
                                >
                                  <label class="uppercase font-bold"
                                    >Edit Amount of Order for --
                                    <span class="text-primary font-bold">{{
                                      product.size
                                    }}</span>
                                    -- Size</label
                                  >
                                </div>
                              </SheetTitle>
                              <SheetDescription></SheetDescription>
                            </SheetHeader>
                            <div
                              class="flex flex-col justify-center items-center text-center py-2 space-y-4"
                            >
                              <p>Amount of Total Orders:</p>
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
                                  v-model="tempQuantity"
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
                              <p>
                                Amount of Exceeded Orders:
                                {{ sizeDetail.quantity }}
                              </p>
                            </div>
                            <SheetFooter>
                              <SheetClose as-child>
                                <Button
                                  @click.prevent="
                                    editOrder(currentProductIndex, tempQuantity)
                                  "
                                  type="submit"
                                  >Save Changes</Button
                                >
                                <Button variant="outline" class="mb-2">
                                  Close</Button
                                >
                              </SheetClose>
                            </SheetFooter>
                          </SheetContent>
                        </Sheet>
                      </div>
                    </div>
                  </td>
                  <td class="p-2 md:pl-4">
                    <div
                      v-for="(sizeDetail, index) in product.sizeDetails"
                      :key="index"
                    >
                      <div v-if="!sizeDetail.notEnoughStocks">
                        <span
                          v-if="sizeDetail.quantity !== 0"
                          class="text-[8px] md:text-xs"
                          >| {{ sizeDetail.price }} ea. |</span
                        >
                      </div>
                    </div>
                  </td>
                  <td class="p-2 md:pl-6">
                    <div
                      v-for="(sizeDetail, index) in product.sizeDetails"
                      :key="index"
                    >
                      <div v-if="!sizeDetail.notEnoughStocks">
                        <span
                          v-if="sizeDetail.quantity !== 0"
                          class="text-[8px] md:text-xs"
                          >|
                          {{ sizeDetail.price * sizeDetail.quantity }} |</span
                        >
                      </div>
                    </div>
                  </td>
                  <td
                    class="p-2 space-y-2 md:space-y-0 md:space-x-2 pr-8 md:pr-0"
                  >
                    <Sheet>
                      <SheetTrigger as-child @click.prevent="openEdit(product)">
                        <button
                          class="material-symbols-outlined text-white bg-emerald-700 p-1 md:p-2 text-xs md:text-sm rounded-sm"
                        >
                          edit
                        </button>
                      </SheetTrigger>
                      <SheetContent
                        side="bottom"
                        class="h-[350px] md:h-[350px]"
                      >
                        <SheetHeader>
                          <SheetTitle>
                            <div
                              class="text-center text-lg md:text-xl pb-2 border-b"
                            >
                              <label class="uppercase font-bold"
                                >Edit Amount of Order for --
                                <span class="text-primary font-bold">{{
                                  product.size
                                }}</span>
                                -- Size</label
                              >
                            </div>
                          </SheetTitle>
                          <SheetDescription></SheetDescription>
                        </SheetHeader>
                        <div
                          class="flex flex-col justify-center items-center text-center py-2 space-y-4"
                        >
                          <p>Amount of Total Orders:</p>
                          <div class="relative flex items-center max-w-[8rem]">
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
                              v-model="tempQuantity"
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
                        <SheetFooter>
                          <SheetClose as-child>
                            <Button
                              @click.prevent="
                                editOrder(currentProductIndex, tempQuantity)
                              "
                              type="submit"
                              >Save Changes</Button
                            >
                            <Button variant="outline" class="mb-2"
                              >Close</Button
                            >
                          </SheetClose>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                    <AlertDialog>
                      <AlertDialogTrigger
                        ><button
                          class="material-symbols-outlined text-white bg-primary p-1 md:p-2 text-xs md:text-sm rounded-sm"
                        >
                          delete
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete Product to Cart
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            <p class="text-black">
                              Are you sure you want to delete this product from
                              your cart? This action cannot be undone.
                            </p>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <div class="flex flex-row justify-end space-x-2">
                            <AlertDialogAction
                              class="bg-background pb-2 hover:bg-slate-200 text-black"
                            >
                              Cancel
                            </AlertDialogAction>
                            <AlertDialogAction
                              class="bg-primary hover:bg-destructive/80 text-white"
                              @click.prevent="deleteProductController(index)"
                            >
                              Delete
                            </AlertDialogAction>
                          </div>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="pt-8">
          <div class="flex flex-row justify-between">
            <div
              class="flex flex-row items-center justify-center space-x-2 pl-2"
            >
              <button
                class="bg-primary text-white text-xs md:text-sm rounded-sm p-2"
                @click.prevent="$router.go(-1)"
              >
                Back
              </button>
              <div>
                <button
                  class="p-2 bg-emerald-800 rounded-sm hover:bg-emerald-700 text-xs md:text-base text-background font-semibold flex items-center"
                  :class="{ 'opacity-50': isOrderOverflow }"
                  :disabled="isOrderOverflow"
                  @click.prevent="handleProcess"
                  title="Will Proceed if there are no overflows in the order."
                >
                  Process Order
                  <span class="material-symbols-outlined ml-2"> start </span>
                </button>
              </div>
            </div>

            <div class="flex flex-row justify-end p-2">
              <span class="text-sm md:text-lg font-bold pr-2">Total:</span>
              <span
                class="text-sm md:text-lg font-bold underline text-primary/90"
                >P{{ totalPrice }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="loading"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80"
  >
    <div>
      <LoadingComponent />
    </div>
  </div>
  <div class="pt-16 h-0 md:h-56"></div>
</template>

<script setup lang="ts">
import { provide, computed, watch, ref, watchEffect } from "vue";
import LoadingComponent from "../components/LoadingComponent.vue";
import { useRoute, useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import {
  order,
  loading,
  deleteProductController,
  fetchOrderAndUpdate,
  editOrder,
  processOrder,
} from "../controllers/confirmOrderController";
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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
import { db } from "@/firebase/init";
import { doc, getDoc } from "firebase/firestore";

const route = useRoute();
const router = useRouter();

// Get orderId from the route parameters
let orderIdasRouter =
  typeof route.params.id === "string" && route.params.id !== ""
    ? route.params.id
    : "";

const handleProcess = () => {
  //console.log("Router: ", orderIdasRouter);
  if (!orderIdasRouter) {
    console.error("orderId is not a string or not defined");
    return;
  }
  processOrder(orderIdasRouter, router);
};

const orderId = computed(() => route.params.id);
watch(
  orderId,
  (newOrderId, oldOrderId) => {
    //console.log(orderId);
    if (typeof newOrderId === "string" && newOrderId !== oldOrderId) {
      fetchOrderAndUpdate(newOrderId);
    }
  },
  { immediate: true }
);

const getOrderById = computed(() => {
  return order.value?.id === orderId.value ? order.value : undefined;
});

const fetchProductDetails = async (productId: string) => {
  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

interface CartItem {
  productId: string;
  size: string;
  quantity: number;
  notEnoughStocks: number;
  totalPrice?: number;
  sizeDetails?: any[];
  isPreOrdered?: boolean;
}

const orderOverflow = ref(false);

const isOrderOverflow = computed(() => {
  return cart.value.some((item: CartItem) => item.notEnoughStocks > 0);
});

const updateCartDetails = async () => {
  for (let item of cart.value) {
    const productDetails = await fetchProductDetails(item.productId);
    if (productDetails === null) {
      continue;
    }
    let sizeData = productDetails.sizes[item.size];
    let quantity = item.quantity;
    let totalPrice = 0;
    let notEnoughStocks = 0;
    let sizeDetails = [];

    if (item.isPreOrdered) {
      // If size doesn't match, get the last size and its last price
      const lastSizeName = Object.keys(productDetails.sizes).pop();
      if (lastSizeName) {
        sizeData = productDetails.sizes[lastSizeName];
      } else {
        continue;
      }
      const price = sizeData[sizeData.length - 1].price;
      totalPrice = price * quantity;
      sizeDetails.push({ quantity, price });
    } else {
      // Loop through each size data
      for (let i = 0; i < sizeData.length; i++) {
        // If the remaining stocks are enough to fulfill the quantity
        if (quantity <= sizeData[i].remaining_stocks) {
          totalPrice += sizeData[i].price * quantity;
          sizeDetails.push({ quantity, price: sizeData[i].price });
          quantity = 0;
          break;
        } else {
          // If the remaining stocks are not enough
          totalPrice += sizeData[i].price * sizeData[i].remaining_stocks;
          sizeDetails.push({
            quantity: sizeData[i].remaining_stocks,
            price: sizeData[i].price,
          });
          quantity -= sizeData[i].remaining_stocks;
        }
      }

      // If there are still items left in the quantity after going through all the stocks
      if (quantity > 0) {
        notEnoughStocks = quantity;
        sizeDetails.push({ quantity, price: 0, notEnoughStocks: true });
      }
    }

    item.totalPrice = totalPrice;
    item.notEnoughStocks = notEnoughStocks;
    item.sizeDetails = sizeDetails;
  }
};

let tempQuantity = ref(0);

const openEdit = (product: any) => {
  tempQuantity.value = product.quantity;
};

const increment = () => {
  tempQuantity.value++;
};

const decrement = () => {
  if (tempQuantity.value > 0) {
    tempQuantity.value--;
  }
};

const currentProductIndex = ref(0);

const totalPrice = ref(0);

const calculateTotalPrice = async () => {
  let total = 0;
  if (cart.value) {
    for (let item of cart.value) {
      const productDetails = await fetchProductDetails(item.productId);
      if (productDetails) {
        let sizeData = productDetails.sizes[item.size];
        let quantity = item.quantity;
        if (item.isPreOrdered) {
          if (!sizeData) {
            // If size doesn't match, get the last size and its last price
            const lastSizeName = Object.keys(productDetails.sizes).pop();
            if (lastSizeName) {
              sizeData = productDetails.sizes[lastSizeName];
            } else {
              continue;
            }
          }
          const price = sizeData[sizeData.length - 1].price;
          total += price * quantity;
        } else {
          for (let sizeItem of sizeData) {
            if (quantity <= sizeItem.remaining_stocks) {
              total += sizeItem.price * quantity;
              break;
            } else {
              total += sizeItem.price * sizeItem.remaining_stocks;
              quantity -= sizeItem.remaining_stocks;
            }
          }
          if (quantity > 0) {
            orderOverflow.value = true;
          }
        }
      }
    }
  }
  totalPrice.value = parseFloat(total.toFixed(2));
};

const cart = computed(() => {
  return order.value ? order.value.cart : [];
});

// Watch the cart and update cart details when it changes
watch(cart, updateCartDetails, { immediate: true });

watchEffect(() => {
  updateCartDetails();
  calculateTotalPrice();
});

// Watch the cart and recalculate total price when it changes
watch(cart, calculateTotalPrice, { immediate: true });

provide("getOrderById", getOrderById);
</script>
