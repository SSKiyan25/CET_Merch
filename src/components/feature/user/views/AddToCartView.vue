<template>
  <SheetContent>
    <SheetHeader class="border-b-2 pb-2">
      <SheetTitle>
        <span class="material-symbols-outlined -pb-2"> add_shopping_cart </span>
        <span class="pl-2">Order List</span></SheetTitle
      >
    </SheetHeader>
    <div class="flex flex-col flex-wrap py-6">
      <div class="flex flex-col">
        <Label>Product - "Category"</Label>
        <span class="pt-4 pl-4 text-primary">Product Name</span>
      </div>
      <div class="flex flex-col flex-wrap py-6">
        <Label> Choose Size</Label>
      </div>
    </div>
    <SheetFooter>
      <SheetClose as-child>
        <Button type="submit"> Add To Cart </Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
</script>
