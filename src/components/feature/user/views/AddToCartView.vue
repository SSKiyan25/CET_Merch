<template>
  <SheetContent>
    <Tabs default-value="cart" v-model="selectedTab">
      <SheetHeader>
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
              v-if="product.sizes && product.sizes[0] !== 'N/A'"
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
                {{ product.price }}
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
          <div v-if="unref(orderData)">
            <div
              v-for="(product, index) in unref(orderData)?.products"
              :key="index"
            >
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <span class="text-primary">{{
                      getProductById(product.productId).name
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
        </div>
        <SheetFooter>
          <SheetClose as-child>
            <router-link :to="`confirmOrder/${unref(orderId)}`">
              <Button variant="destructive">Edit Cart</Button>
            </router-link>
            <Button type="submit">Submit Order </Button>
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
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  setup as setupAddToCartController,
  getOnQueueOrder,
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

type ProductType = {
  id: string;
  name: string;
  category: string;
  price: number;
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
const orderId = ref<string | null>(null);

onMounted(async () => {
  const result = await getOnQueueOrder();
  if (result) {
    orderData.value = result.data;
    orderId.value = result.id;
  }
});

const injectedGetProductById = inject("getProductById") as (
  id: string
) => ProductType;
const product = computed(() => injectedGetProductById(props.productId));

const { handleAddToCartSubmit, newAddToCartData } = setupAddToCartController();

let isLoading = ref(false);
let isUploadSuccessful = ref(false);

const handleFormCartSubmit = async () => {
  if (newAddToCartData.value.quantity === 0) {
    alert("Please enter a valid number of quantity");
    console.error("Quantity cannot be 0");
    return;
  }
  isLoading.value = true;
  console.log("Form submitted");
  if (auth.currentUser) {
    newAddToCartData.value = {
      productId: product.value.id,
      userId: auth.currentUser.uid,
      quantity: newAddToCartData.value.quantity,
      totalPrice: product.value.price * newAddToCartData.value.quantity,
      size: selectedSize.value,
    };
    const docId = await handleAddToCartSubmit(newAddToCartData.value);
    if (docId) {
      isLoading.value = false;
      isUploadSuccessful.value = true;

      console.log(`Product added with document id: ${docId}`);
      newAddToCartData.value = {
        productId: "",
        userId: "",
        quantity: 0,
        totalPrice: 0,
        size: "",
      };
      const result = await getOnQueueOrder();
      if (result) {
        orderData.value = result.data;
        orderId.value = result.id;
      }
      setTimeout(() => {
        isUploadSuccessful.value = false;
        selectedTab.value = "order";
      }, 2500);
    } else {
      console.error("Failed to add product to cart");
      isLoading.value = false;
    }
  } else {
    // Handle the case where no user is logged in
    alert("Please login to add product to your cart");
    router.push({ name: "login" });
    console.error("No user is logged in");
    isLoading.value = false;
  }
};

const selectedSize = ref(product.value.sizes ? product.value.sizes[0] : "");

const selectSize = (size: string) => {
  selectedSize.value = size;
};

const totalProductsInCart = computed(() => {
  if (orderData.value) {
    return orderData.value.products.length;
  }
  return 0;
});
</script>
