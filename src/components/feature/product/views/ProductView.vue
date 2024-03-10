<template>
  <div class="relative h-[80.5rem]">
    <div class="pt-20 md:pt-24 px-2 md:px-8">
      <div class="flex flex-row items-center">
        <router-link to="/" class="cursor-pointer text-primary/50">
          <div class="flex flex-row items-center pt-0.5 hover:text-primary">
            <span class="material-symbols-outlined text-sm">
              keyboard_backspace </span
            ><span class="text-xs hover:underline pl-1"> Home</span>
          </div>
        </router-link>
        <div class="flex flex-row items-center text-primary/50 pt-0.5">
          <span class="material-symbols-outlined text-sm pt-0.5">
            navigate_next
          </span>
          <span class="text-xs">Products</span>
          <span class="material-symbols-outlined text-sm pt-0.5">
            navigate_next
          </span>
          <span class="text-xs text-primary">{{ product?.category }} </span>
        </div>
      </div>
    </div>
    <div
      class="max-w-[85rem] h-[12rem] sm:h-[40rem] lg:h-[75rem] px-4 py-4 sm:px-6 lg:px-12 lg:py-12 mx-auto border-b-2 mt-8"
    >
      <div
        class="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32 pb-2"
      >
        <div class="items-center justify-center -mt-8">
          <img :src="product?.coverPhoto" class="max-w-full max-h-96" />
        </div>
        <div class="mt-5 sm:mt-10 sm:h-96 lg:h-auto lg:mt-0">
          <div class="space-y-6 sm:space-y-8">
            <!-- Title -->
            <div class="space-y-2 md:space-y-4">
              <div class="border-b-2 pb-2">
                <h2
                  class="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-gray-200 text-wrap"
                >
                  {{ product?.name }}
                </h2>
              </div>
              <div class="flex flex-row">
                <snap class="text-2xl font-semibold text-primary">
                  P {{ product?.price }}</snap
                >
                <snap class="text-xl pl-2">(</snap>
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4 text-yellow-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <svg
                    class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                </div>
                <snap class="text-xl">)</snap>
              </div>

              <div class="flex flex-wrap">
                <p class="text-muted-foreground text-justify px-8 text-wrap">
                  {{ product?.description }}
                </p>
              </div>
              <div>
                <snap>Available Sizes:</snap>
                <p class="pl-8 py-4 text-secondary-foreground/70">
                  {{
                    product?.sizes[0] === "N/A"
                      ? "No Available Sizes"
                      : product?.sizes.join(" | ")
                  }}
                </p>
              </div>
              <div>
                <Sheet>
                  <SheetTrigger as-child
                    ><Button> Add to Cart</Button></SheetTrigger
                  >
                  <Cart />
                </Sheet>
              </div>
            </div>
            <!-- End Title -->
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center mt-16">
        <div
          class="flex flex-col sm:flex-row w-full justify-center items-center"
        >
          <Carousel
            class="relative w-full max-w-full"
            :opts="{
              align: 'start',
            }"
          >
            <CarouselContent class="px-2 sm:px-12">
              <CarouselItem
                v-for="(photo, index) in product?.photos"
                :key="index"
                class="w-full sm:basis-1/2 lg:basis-1/3"
              >
                <div class="p-1">
                  <Card
                    class="bg-background/10 opacity-90 border-none shadow-none"
                  >
                    <CardContent
                      class="flex aspect-square items-center justify-center"
                    >
                      <img
                        :src="photo"
                        alt="Product image"
                        class="w-full h-auto object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious
              class="ml-24 sm:ml-16 opacity-40 hover:opacity-100"
            />
            <CarouselNext class="mr-24 sm:mr-16 opacity-40 hover:opacity-100" />
          </Carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import { db } from "@/firebase/init.ts";
import { getDoc, doc, DocumentData } from "firebase/firestore";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Cart from "@/components/feature/user/views/AddToCartView.vue";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

async function fetchProduct(id: any): Promise<DocumentData | undefined> {
  try {
    if (!id) {
      throw new Error("Product ID is undefined");
    }
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

const route = useRoute();
const product = ref<DocumentData | null | undefined>(null);
const cache = new Map();
console.log(product);

watch(
  () => route.params.id,
  async (newId) => {
    if (cache.has(newId)) {
      product.value = cache.get(newId);
    } else {
      product.value = await fetchProduct(newId);
      cache.set(newId, product.value);
    }
  },
  { immediate: true }
);

const allImages = computed(() => [
  product.value?.coverPhoto,
  ...product.value?.photos,
]);
const plugin = Autoplay({
  delay: 3500,
  stopOnMouseEnter: false,
  stopOnInteraction: false,
});
console.log(product);
</script>
