<template>
  <div class="mx-auto w-11/12">
    <div
      class="flex flex-col md:flex-row pb-2 justify-between border-b-2 border-primary mx-auto"
    >
      <div
        class="flex flex-row justify-between items-center text-primary w-full"
      >
        <div class="flex">
          <label
            class="font-black text-secondary-foreground tracking-wide text-lg md:text-2xl uppercase"
          >
            Featured <span class="text-red-600">Products</span>
          </label>
        </div>
        <div class="flex pr-4">
          <router-link to="/products">
            <label
              class="text-[10px] md:text-xs uppercase hover:underline cursor-pointer"
              >View All Products</label
            >
          </router-link>
        </div>
      </div>
    </div>
    <div class="flex w-full flex-col pt-4 bg-gray-100 shadow-md">
      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-2 xl:gap-18 pb-8 px-4 md:px-16"
      >
        <div
          v-if="!isLoading"
          v-for="product in products"
          :key="product.id"
          class="flex flex-col bg-white shadow-lg border border-primary/20 rounded-sm hover:drop-shadow-xl w-full h-auto md:w-full md:h-[22rem]"
        >
          <div class="overflow-hidden border-b-2 border-primary/60">
            <div class="flex flex-col justify-center items-center">
              <router-link
                :to="`product/${product.id}`"
                @click.prevent="incrementViewCount(product)"
              >
                <img
                  :src="product.coverPhoto"
                  class="transform transition-all duration-500 hover:scale-110 w-full md:w-full h-[8rem] md:h-[16rem] object-cover rounded-t-sm"
                />
              </router-link>
            </div>
          </div>
          <div class="p-2 md:p-4 w-full">
            <div class="flex flex-col w-full whitespace-normal">
              <router-link
                :to="`/product/${product.id}`"
                @click.prevent="incrementViewCount(product)"
                class="truncate"
              >
                <span
                  class="w-full text-xs md:text-base font-bold text-secondary-foreground truncate hover:underline"
                >
                  {{ product.name }}
                </span>
              </router-link>
              <span
                class="block pb-2 pt-1 text-base md:text-2xl font-bold uppercase text-primary"
              >
                P
                {{ product.price[product.price.length - 1].originalPrice }}
              </span>
              <div
                class="flex flex-row justify-between items-center text-[8px] md:text-xs"
              >
                <div>
                  <span> {{ product.totalOrders }} Sold | </span>
                  <span> {{ product.views }} Views</span>
                </div>
                <div>
                  <span>
                    <span> {{ product.category }} | </span>
                    <span> {{ product.faction }} </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { setup as setupFeaturedProductsController } from "../controllers/featuredProductsController.ts";
import { setup as setupProductViews } from "@/components/feature/product/controllers/productsController.ts";

const { products, isLoading } = setupFeaturedProductsController();
const { incrementViewCount } = setupProductViews();
</script>
