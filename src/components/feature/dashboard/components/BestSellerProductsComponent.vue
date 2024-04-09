<template>
  <div class="w-full h-[40rem] shadow-sm bg-slate-100 pt-8">
    <div class="flex flex-col justify-center items-center">
      <div class="">
        <p
          class="tracking-widest text-xl md:text-5xl font-black underline drop-shadow-xl text-primary decoration-stone-900 decoration-solid decoration-2 underline-offset-8"
        >
          BEST SELLING PRODUCTS
        </p>
      </div>
      <div
        class="flex flex-row justify-center space-x-3 space-y-2 px-4 md:px-12 pt-10 pb-8"
      >
        <div class="max-w-[75rem] justify-center items-center">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <div
              v-if="!isLoading"
              v-for="product in products"
              :key="product.id"
              class="group flex flex-col bg-white border border-primary/50 shadow-xl hover:drop-shadow-xl"
            >
              <div class="overflow-hidden border-b">
                <div
                  class="h-full flex flex-col border-primary/60 justify-center items-center max-h-[22rem]"
                >
                  <router-link
                    :to="`/product/${product.id}`"
                    @click.prevent="incrementViewCount(product)"
                    ><img
                      :src="product.coverPhoto"
                      alt=""
                      class="transform transition-all duration-500 hover:scale-110 object-cover w-96 h-[20rem]"
                  /></router-link>
                </div>
              </div>
              <div class="p-2 md:p-5">
                <div class="flex flex-col">
                  <router-link
                    :to="`/product/${product.id}`"
                    @click.prevent="incrementViewCount(product)"
                  >
                    <span
                      class="text-sm md:text-base font-bold text-secondary-foreground truncate hover:underline"
                    >
                      {{ product.name }}
                    </span></router-link
                  >

                  <span
                    class="block pb-2 pt-1 text-base md:text-2xl font-bold uppercase text-primary"
                  >
                    P
                    {{ product.price[product.price.length - 1].originalPrice }}
                  </span>
                  <div
                    class="flex flex-row justify-between items-center text-xs"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { setup as setupBestSellingProductsController } from "../controllers/bestSellingProductsController.ts";
import { setup as setupProductViews } from "@/components/feature/product/controllers/productsController.ts";

const { products, isLoading } = setupBestSellingProductsController();
const { incrementViewCount } = setupProductViews();
</script>
