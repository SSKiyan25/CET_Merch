<template>
  <SheetContent>
    <Tabs default-value="cart">
      <SheetHeader class="border-b-2 pb-2">
        <!-- <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="cart">Cart</TabsTrigger>
          <TabsTrigger value="order">Order List</TabsTrigger>
        </TabsList> -->
        <SheetTitle>
          <span class="material-symbols-outlined -pb-2">
            add_shopping_cart
          </span>
          <span class="pl-2">Order</span></SheetTitle
        >
      </SheetHeader>
      <div class="flex flex-col flex-wrap py-6">
        <div class="flex flex-col">
          <Label>Product - "Category"</Label>
          <span class="pt-4 pl-4 text-primary font-bold">Product Name</span>
        </div>
        <div class="flex flex-col flex-wrap py-6">
          <span class="text-sm"> Available Sizes</span>
          <div class="flex flex-row flex-wrap py-4 pl-4 space-x-1">
            <Button
              :variant="selectedSize === 'L' ? 'default' : 'secondary'"
              @click.prevent="selectedSize = 'L'"
            >
              L
            </Button>
            <Button
              :variant="selectedSize === 'XL' ? 'default' : 'secondary'"
              @click.prevent="selectedSize = 'XL'"
            >
              XL
            </Button>
            <Button
              :variant="selectedSize === '2XL' ? 'default' : 'secondary'"
              @click.prevent="selectedSize = '2XL'"
            >
              2XL
            </Button>
          </div>
        </div>
        <div class="flex flex-row">
          <span class="pt-2.5 pr-2 text-sm">Quantity : </span>
          <Input
            type="number"
            min="1"
            max="10"
            placeholder="0"
            class="px-2 py-2 w-1/4 text-base"
          />
          <span class="pt-2.5 px-2 text-sm">Initial Price :</span>
          <span class="pt-2.5 text-sm text-primary">P50.00</span>
        </div>
      </div>
      <SheetFooter>
        <SheetClose as-child>
          <router-link to="/product/:id"
            ><Button variant="ghost">Preview Product</Button></router-link
          >
          <Button type="submit"> Add To Cart </Button>
        </SheetClose>
      </SheetFooter>
    </Tabs>
  </SheetContent>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const selectedSize = ref("L");
</script>
