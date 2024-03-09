<template>
  <div>
    <div
      v-for="(product, index) in products"
      :key="product.id"
      class="group flex flex-col h-full bg-background/80 border border-secondary-foreground/20 shadow-sm rounded-xl"
    >
      <div
        class="h-72 flex flex-col justify-center items-center bg-secondary rounded-t-lg"
      >
        <img :src="product.coverPhoto" />
      </div>
      <div class="p-4 md:p-6">
        <span class="block mb-1 text-xs font-semibold uppercase text-primary">
          {{ product.category }}
        </span>
        <h3 class="text-xl font-semibold text-secondary-foreground">
          {{ product.name }}
        </h3>
        <p class="mt-3 text-secondary-foreground/30 text-xs">
          {{ product.description }}
        </p>
      </div>
      <div
        class="mt-auto flex border-t border-secondary divide-x divide-secondary"
      >
        <a
          class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-primary/80 text-primary-foreground shadow-sm hover:bg-primary disabled:opacity-50 disabled:pointer-events-none"
          href="#"
        >
          View Product
        </a>
        <a
          class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-primary/80 text-primary-foreground shadow-sm hover:bg-primary disabled:opacity-50 disabled:pointer-events-none"
          href="#"
        >
          Order Now
        </a>
      </div>
    </div>
    <!-- End Card -->
  </div>
</template>

<script setup lang="ts">
import { setup as setupProductController } from "../controllers/products_controller.ts";

const { products } = setupProductController();
</script>
