<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <div
      v-for="product in products"
      :key="product.id"
      class="group flex flex-col bg-background border border-primary/50 shadow-sm rounded-b-xl"
    >
      <div
        class="h-full flex flex-col border-b-2 border-primary/60 justify-center items-center"
      >
        <img :src="product.coverPhoto" />
      </div>
      <div class="p-4 md:p-6">
        <div class="flex flex-row">
          <span
            class="block pb-2 pt-1 text-xs font-semibold uppercase text-secondary-foreground/30"
          >
            {{ product.category }}
          </span>
          <span
            class="block pb-2 pl-2 pt-1 text-xs font-semibold uppercase text-primary"
          >
            (P {{ product.price }})
          </span>
        </div>

        <h3 class="text-xl font-semibold text-secondary-foreground">
          {{ product.name }}
        </h3>
        <p
          class="mt-3 text-secondary-foreground/30 text-xs whitespace-wrap text-justify truncate"
        >
          {{ product.description }}
        </p>
      </div>
      <div
        class="mt-auto flex border-t border-secondary divide-x divide-secondary"
      >
        <router-link
          class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
          :to="`/product/${product.id}`"
        >
          View Product
        </router-link>
        <a
          class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
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
