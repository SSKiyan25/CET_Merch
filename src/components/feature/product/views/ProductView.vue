<template>
  <div class="relative">
    <div class="pt-20 pb-8 md:pt-24 px-2 md:px-8">
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
      class="max-w-[85rem] h-[62rem] base:h-[64rem] md:h-[36rem] lg:h-[44rem] px-4 py-4 sm:px-6 lg:px-12 lg:py-4 mx-auto mt-8 border-b-2"
    >
      <div class="md:grid md:grid-cols-2 md:gap-12 xl:gap-18 pb-2">
        <div
          class="flex flex-col items-center bg-secondary/50 rounded-sm shadow-sm overflow-hidden pt-10 -mt-8 px-4"
        >
          <div class="items-center justify-center -mt-6 pb-3">
            <img
              :src="product?.coverPhoto"
              class="w-full max-h-96 rounded-sm"
            />
          </div>
          <div
            class="flex flex-col sm:flex-row w-full justify-center items-center border-t-2"
          >
            <Carousel
              class="relative w-full max-w-full"
              :opts="{
                align: 'start',
              }"
            >
              <CarouselContent class="px-2 sm:px-8">
                <CarouselItem
                  v-for="(photo, index) in product?.photos"
                  :key="index"
                  class="w-full lg:basis-1/2"
                >
                  <div class="p-1">
                    <Card
                      class="bg-background/0 opacity-90 border-none shadow-none"
                    >
                      <CardContent
                        class="flex aspect-square items-center justify-center"
                      >
                        <img
                          :src="photo"
                          alt="Product image"
                          class="w-full h-auto rounded-sm"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious
                class="ml-24 sm:ml-16 opacity-40 hover:opacity-100"
              />
              <CarouselNext
                class="mr-24 sm:mr-16 opacity-40 hover:opacity-100"
              />
            </Carousel>
          </div>
        </div>

        <div class="sm:h-96 pt-4 lg:mt-0">
          <div class="space-y-6 sm:space-y-8">
            <div class="space-y-2 md:space-y-4">
              <div class="border-b-2 pb-2">
                <h2
                  class="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-gray-200 text-wrap"
                >
                  {{ product?.name }}
                </h2>
              </div>
              <div class="flex flex-row">
                <span class="text-2xl font-semibold text-primary">
                  P {{ product?.price }}</span
                >
                <span class="text-xl pl-2">(</span>
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
                <span class="text-xl">)</span>
              </div>

              <div class="flex flex-wrap">
                <p class="text-muted-foreground text-justify px-8 text-wrap">
                  {{ product?.description }}
                </p>
              </div>
              <div>
                <span>Available Sizes:</span>
                <p class="pl-8 py-4 text-secondary-foreground/70">
                  <span
                    v-if="product?.sizes.every((size : string) => size === '')"
                  >
                    No Available Size
                  </span>
                  <span v-else>{{ product?.sizes.join(" | ") }}</span>
                </p>
              </div>
              <div>
                <Sheet>
                  <SheetTrigger as-child
                    ><Button> Add to Cart</Button>
                  </SheetTrigger>
                  <Cart :productId="currentId" />
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="loading">
    <Loading />
  </div>
</template>
<script setup lang="ts">
import { ref, watch, provide } from "vue";
import { useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import { db } from "@/firebase/init.ts";
import { getDoc, doc, DocumentData } from "firebase/firestore";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Cart from "@/components/feature/user/userOrder/views/AddToCartView.vue";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import Loading from "@/components/feature/misc/LoadingComponent.vue";
import { setup as setupProductController } from "@/components/feature/dashboard/controllers/productsController.ts";

async function fetchProduct(id: any): Promise<DocumentData | undefined> {
  console.log("fetchProduct called with id: ", id);
  try {
    if (!id) {
      throw new Error("Product ID is undefined");
    }
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    console.log("docSnap: ", docSnap);

    if (docSnap.exists()) {
      console.log("Product data: ", docSnap.data());
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
const loading = ref(true);
const currentId = route.params.id as string;

const { products } = setupProductController();

const getProductById = (id: string) => {
  return products.value.find((product) => product.id === id);
};

provide("getProductById", getProductById);

watch(
  () => route.params.id,
  async (newId) => {
    loading.value = true;

    try {
      if (cache.has(newId)) {
        product.value = cache.get(newId);
      } else {
        const fetchedProduct = await fetchProduct(newId);
        product.value = fetchedProduct;
        console.log("fetchedProduct: ", fetchedProduct);
        cache.set(newId, fetchedProduct);
      }
    } catch (error) {
      console.error("Error fetching product: ", error);
    } finally {
      console.log("loading: ", loading.value);
      loading.value = false;
    }
  },
  { immediate: true }
);

console.log("product: ", product);
</script>
