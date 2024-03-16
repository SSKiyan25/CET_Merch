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
                @click.prevent="selectedSize = size"
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
            />
            <span class="pt-2.5 px-2 text-xs md:text-sm">Initial Price :</span>
            <span class="pt-2.5 text-sm text-primary">
              {{ product.price }}
            </span>
          </div>
        </div>
        <SheetFooter
          class="flex flex-col sm:flex-row justify-between items-center"
        >
          <SheetClose as-child class="w-full sm:w-auto">
            <router-link to="/product/:id" class="w-full sm:w-auto">
              <Button variant="ghost" class="w-full sm:w-auto"
                >Preview Product</Button
              >
            </router-link>
            <Button type="submit" class="w-full sm:w-auto mt-4 sm:mt-0 sm:ml-4">
              Add To Cart
            </Button>
          </SheetClose>
        </SheetFooter>
      </TabsContent>
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
const selectedSize = computed(() =>
  product.value.sizes ? product.value.sizes[0] : ""
);
</script>
