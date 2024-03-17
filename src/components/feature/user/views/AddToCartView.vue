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
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    class="w-full sm:w-auto mt-4 sm:mt-0 sm:ml-4"
                    @click.prevent="handleAlertDialogTrigger"
                  >
                    Add To Cart
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent v-if="newAddToCartData.quantity > 0">
                  <AlertDialogHeader class="border-b-2 pb-2">
                    <AlertDialogTitle>Add To Cart</AlertDialogTitle>
                    <AlertDialogDescription class="pb-4">
                      Are you sure you want to add this product to your cart?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      class="bg-ghost text-secondary-foreground hover:bg-secondary"
                    >
                      Cancel
                    </AlertDialogAction>
                    <AlertDialogAction>
                      <button
                        type="submit"
                        class="bg-primary hover:bg-primary/80"
                      >
                        Yes
                      </button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </SheetClose>
          </SheetFooter>
        </TabsContent>
      </form>
      <TabsContent value="order">
        <div class="flex flex-col flex-wrap py-6">
          <div class="flex flex-col">
            <Label> Total Order </Label>
          </div>
        </div>
        <SheetFooter>
          <SheetClose as-child>
            <Button type="submit"> Order </Button>
          </SheetClose>
        </SheetFooter>
      </TabsContent>
    </Tabs>
  </SheetContent>
</template>

<script setup lang="ts">
import { ref, defineProps, computed, inject } from "vue";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { setup as setupAddToCartController } from "../controllers/addToCartController.ts";
import { auth } from "@/firebase/init.ts";
import { useRouter } from "vue-router";

const router = useRouter();

type ProductType = {
  id: string;
  name: string;
  category: string;
  price: number;
  sizes: string[];
};

const selectedTab = ref("cart");

const props = defineProps({
  productId: {
    type: String,
    required: true,
  },
});

const injectedGetProductById = inject("getProductById") as (
  id: string
) => ProductType;
const product = computed(() => injectedGetProductById(props.productId));

const { handleAddToCartSubmit, newAddToCartData } = setupAddToCartController();

const handleAlertDialogTrigger = () => {
  // Check if the quantity is 0
  if (newAddToCartData.value.quantity === 0) {
    alert("Please enter a valid number of quantity");
    console.error("Quantity cannot be 0");
    return;
  }
};
const handleFormCartSubmit = async () => {
  if (newAddToCartData.value.quantity === 0) {
    alert("Please enter a valid number of quantity");
    console.error("Quantity cannot be 0");
    return;
  }
  if (auth.currentUser) {
    newAddToCartData.value = {
      productId: product.value.id,
      userId: auth.currentUser.uid,
      quantity: newAddToCartData.value.quantity,
      totalPrice: product.value.price * newAddToCartData.value.quantity,
      size: selectedSize.value,
    };
    await handleAddToCartSubmit(newAddToCartData.value);
    newAddToCartData.value = {
      productId: "",
      userId: "",
      quantity: 0,
      totalPrice: 0,
      size: "",
    };
  } else {
    // Handle the case where no user is logged in
    router.push({ name: "login" });
    console.error("No user is logged in");
  }
};

const selectedSize = ref(product.value.sizes ? product.value.sizes[0] : "");

const selectSize = (size: string) => {
  selectedSize.value = size;
};
</script>
