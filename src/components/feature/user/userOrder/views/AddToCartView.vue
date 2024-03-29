<template>
  <SheetContent>
    <Tabs default-value="cart" v-model="selectedTab">
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
                class="pl-1"
                :class="{ 'text-primary/90': selectedTab === 'cart' }"
                >Order</span
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
                class="pl-2"
                :class="{ 'text-primary/90': selectedTab === 'order' }"
                >Order List</span
              >
            </TabsTrigger>
          </TabsList>
        </SheetTitle>
        <SheetDescription></SheetDescription>
      </SheetHeader>
      <form @submit.prevent="handleFormCartSubmit">
        <TabsContent value="cart">
          <div class="flex flex-col flex-wrap py-6">
            <div class="flex flex-col">
              <Label>Product - {{ product.category }}</Label>
              <span class="pt-4 pl-4 text-primary font-bold">
                {{ product.name }}
              </span>
            </div>
            <div
              class="flex flex-col flex-wrap py-6"
              v-if="
                (product.sizes && product.sizes[0] !== '') ||
                product.sizes.length === 0
              "
            >
              <span class="text-sm"> Available Sizes</span>
              <div class="flex flex-row flex-wrap py-4 pl-4 space-x-1">
                <Button
                  v-for="size in product.sizes"
                  :key="size"
                  :variant="selectedSize === size ? 'default' : 'secondary'"
                  @click.prevent="selectSize(size)"
                  class="mb-2"
                >
                  {{ size }}
                </Button>
              </div>
            </div>
            <div class="flex flex-row pt-4">
              <span class="pt-2.5 pr-2 text-xs md:text-sm"> Quantity : </span>
              <Input
                type="number"
                min="1"
                max="10"
                placeholder="0"
                class="px-2 py-2 w-1/6 text-base text-center"
                v-model="newAddToCartData.quantity"
              />
              <span class="pt-2.5 px-2 text-xs md:text-sm"
                >Initial Price :</span
              >
              <span class="pt-2.5 text-sm text-primary">
                {{ product.price[product.price.length - 1].originalPrice }}
              </span>
              <span
                class="material-symbols-outlined text-sm pt-2.5 pl-1 opacity-80"
              >
                help
              </span>
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
        <div class="flex flex-col flex-wrap py-6">
          <div class="flex flex-row">
            <Label> Total Order In The Cart</Label>
            <Label class="ml-1 text-primary">(</Label>
            <Label class="text-primary"> {{ totalProductsInCart }}</Label>
            <Label class="text-primary">)</Label>
          </div>
          <div v-if="!ifCartEmpty">
            <div
              v-for="(product, index) in unref(orderData)?.cart"
              :key="index"
            >
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <span class="text-primary">{{
                      getProductById(product.productId)
                        ? getProductById(product.productId).name
                        : "Product not found"
                    }}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div class="flex justify-between px-4">
                      <Label>Quantity: {{ product.quantity }}</Label>
                      <Label v-if="product.size !== 'N/A'"
                        >Size: {{ product.size }}</Label
                      >
                      <Label>Total Price: {{ product.totalPrice }} </Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div
            v-if="ifCartEmpty"
            class="flex flex-col items-center justify-center text-center pt-8"
          >
            <span class="material-symbols-outlined text-6xl">
              production_quantity_limits
            </span>
            <span class="text-primary pt-3">Your cart is empty</span>
          </div>
        </div>
        <SheetFooter v-if="!ifCartEmpty">
          <SheetClose as-child>
            <router-link
              :to="{ name: 'confirmOrder', params: { id: unref(orderId) } }"
            >
              <Button variant="destructive">Edit Cart</Button>
            </router-link>
            <router-link
              :to="{ name: 'confirmOrder', params: { id: unref(orderId) } }"
            >
              <Button type="submit">Submit Order </Button>
            </router-link>
          </SheetClose>
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
import { ref, defineProps, computed, inject, onMounted, unref } from "vue";
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
  getOnQueueOrderController,
  orderData as OrderDataType,
} from "../controllers/addToCartController.ts";
import { auth } from "@/firebase/init.ts";
import { useRouter } from "vue-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LoadingComponent from "../components/LoadingComponent.vue";
import SucessfulComponent from "../components/SucessfulComponent.vue";

const router = useRouter();
const orderData = ref<OrderDataType | null>(null);
const ifCartEmpty = ref(true);

type PriceType = {
  dateCreated: string;
  discountedPrice: number;
  originalPrice: number;
};

type ProductType = {
  id: string;
  name: string;
  category: string;
  price: PriceType[];
  sizes: string[];
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

console.log("productId in Cart component: ", props.productId);
const orderId = ref<string | null>(null);

onMounted(async () => {
  const result = await getOnQueueOrderController();
  if (result) {
    orderData.value = result.data;
    orderId.value = result.id;
    ifCartEmpty.value = result.data.cart.length === 0;
  }
});

const injectedGetProductById = inject("getProductById") as (
  id: string
) => ProductType;
const product = computed(() => injectedGetProductById(props.productId));
console.log("Product data: ", product.value);

const { handleAddToCartSubmit, newAddToCartData } = setupAddToCartController();

let isLoading = ref(false);
let isUploadSuccessful = ref(false);

const handleFormCartSubmit = async () => {
  isLoading.value = true;
  if (newAddToCartData.value.quantity === 0) {
    alert("Please enter a valid number of quantity");
    console.error("Quantity cannot be 0");
    return;
  }
  console.log("Form submitted");
  if (auth.currentUser) {
    newAddToCartData.value = {
      productId: product.value.id,
      quantity: newAddToCartData.value.quantity,
      totalPrice: parseFloat(
        (
          product.value.price[product.value.price.length - 1].originalPrice *
          newAddToCartData.value.quantity
        ).toFixed(2)
      ),
      size: selectedSize.value,
    };
    await handleAddToCartSubmit(newAddToCartData.value);

    isLoading.value = false;
    isUploadSuccessful.value = true;

    console.log(`Product added to cart`);
    newAddToCartData.value = {
      productId: "",
      quantity: 0,
      totalPrice: 0,
      size: "",
    };

    // Fetch the updated order data
    const result = await getOnQueueOrderController();
    if (result) {
      orderData.value = result.data;
      orderId.value = result.id;
      ifCartEmpty.value = result.data.cart.length === 0;
    }

    setTimeout(() => {
      isUploadSuccessful.value = false;
      selectedTab.value = "order";
    }, 2500);
  } else {
    // Handle the case where no user is logged in
    alert("Please login to add product to your cart");
    router.push({ name: "login" });
    console.error("No user is logged in");
    isLoading.value = false;
  }
};

let _selectedSize = ref("");

const selectedSize = computed({
  get: () => {
    if (product.value && product.value.sizes && _selectedSize.value === "") {
      _selectedSize.value = product.value.sizes[0];
    }
    return _selectedSize.value;
  },
  set: (value) => {
    _selectedSize.value = value;
  },
});

const selectSize = (size: string) => {
  selectedSize.value = size;
};

const totalProductsInCart = computed(() => {
  if (orderData.value) {
    return orderData.value.cart.length;
  }
  return 0;
});
</script>
