<template>
  <div class="mx-auto w-11/12">
    <div
      class="flex flex-col md:flex-row pt-12 pb-2 justify-between border-b-2 border-primary mx-auto"
    >
      <div
        class="flex flex-row justify-between items-center text-primary w-full"
      >
        <div class="flex">
          <label
            class="font-black text-secondary-foreground tracking-wide text-2xl uppercase"
          >
            Featured <span class="text-red-600">Products</span>
          </label>
        </div>
        <div class="flex pr-4">
          <router-link to="/products">
            <label class="text-xs uppercase hover:underline cursor-pointer"
              >View All</label
            >
          </router-link>
        </div>
      </div>
    </div>
    <div class="flex flex-col pt-4 bg-gray-100 shadow-md">
      <div class="flex flex-row px-4 md:px-16">
        <Carousel class="w-full max-w-5/6" :opts="{ align: 'start' }">
          <CarouselContent>
            <CarouselItem
              ><div
                v-if="isLoading"
                class="hidden max-w-[75reh] h-full pt-8 justify-center items-center"
              >
                <div class="flex flex-col items-center justify-center h-full">
                  <div class="flex flex-col items-center justify-center">
                    <span
                      class="material-symbols-outlined text-6xl text-primary animate-spin"
                    >
                      autorenew
                    </span>
                  </div>
                </div>
              </div>
              <!--Product Card-->
              <div
                v-else
                class="flex flex-row px-4 md:px-8 pt-2 pb-8 justify-center rounded-3xl"
              >
                <div class="max-w-[75rem] justify-center items-center">
                  <div
                    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                  >
                    <div
                      v-if="!isLoading"
                      v-for="product in products"
                      :key="product.id"
                      class="flex flex-col bg-white shadow-lg border border-primary/20 rounded-sm"
                    >
                      <div class="overflow-hidden border-b-2 border-primary/60">
                        <div
                          class="h-full flex flex-col justify-center items-center max-h-[22rem]"
                        >
                          <router-link to="/">
                            <img
                              :src="product.coverPhoto"
                              class="transform transition-all duration-500 hover:scale-110 h-[8rem] md:h-[16rem] object-cover rounded-t-sm"
                            />
                          </router-link>
                        </div>
                      </div>
                      <div class="p-2 md:p-4">
                        <div class="flex flex-col">
                          <span
                            class="text-sm md:text-base font-bold text-secondary-foreground truncate hover:underline"
                          >
                            {{ product.name }}
                          </span>
                          <span
                            class="block pb-2 pt-1 text-base md:text-2xl font-bold uppercase text-primary"
                            >P
                            {{
                              product.price[product.price.length - 1]
                                .originalPrice
                            }}
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
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="ml-6 md:ml-4 opacity-20 hover:opacity-100" />
          <CarouselNext class="mr-6 md:mr-4 opacity-20 hover:opacity-100" />
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../ui/carousel";
import { setup as setupFeaturedProductsController } from "../controllers/featuredProductsController.ts";

const { products, isLoading } = setupFeaturedProductsController();
</script>
