<template>
  <div class="relative h-auto">
    <div class="pt-4 pb-8 md:pt-8 px-2 md:px-8">
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
          <router-link
            to="/products"
            class="items-center flex flex-row hover:text-primary hover:underline"
          >
            <span class="text-xs">Products</span>
          </router-link>

          <span class="material-symbols-outlined text-sm pt-0.5">
            navigate_next
          </span>
          <span class="text-xs text-primary/50">{{ product?.category }} </span>
          <span class="material-symbols-outlined text-sm pt-0.5">
            navigate_next
          </span>
          <span class="text-xs text-primary">{{ product?.name }} </span>
        </div>
      </div>
    </div>
    <div
      class="max-w-[85rem] max-h-[96rem] base:max-h-[64rem] md:max-h-[36rem] lg:h-[44rem] px-4 py-4 sm:px-6 lg:px-12 lg:py-4 mx-auto mt-8"
    >
      <div class="md:grid md:grid-cols-2 md:gap-12 xl:gap-18 pb-2">
        <div
          class="flex flex-col items-center bg-white rounded-sm shadow-sm overflow-hidden pt-10 -mt-8 px-4"
        >
          <!--Featured Photo-->
          <div class="items-center justify-center -mt-6 pb-3">
            <img
              :src="featuredPhoto || product?.coverPhoto"
              class="w-full max-h-96 rounded-sm object-cover"
            />
          </div>
          <div
            class="flex flex-col sm:flex-row w-full justify-center items-center border-t-2"
          >
            <!--Photos-->
            <Carousel
              class="relative w-full max-w-full"
              :opts="{
                align: 'start',
              }"
            >
              <CarouselContent class="px-2 sm:px-8">
                <CarouselItem
                  v-for="(photo, index) in allPhotos"
                  :key="index"
                  class="w-full lg:basis-1/2"
                  @click.prevent="updateFeaturedPhoto(photo)"
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
                          class="w-full h-[12rem] rounded-sm object-cover"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious
                class="ml-12 sm:ml-16 opacity-40 hover:opacity-100"
              />
              <CarouselNext
                class="mr-12 sm:mr-16 opacity-40 hover:opacity-100"
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
              <div class="flex flex-col">
                <div class="flex flex-row justify-between items-center">
                  <div class="flex flex-row">
                    <span class="text-2xl font-semibold text-primary">
                      P
                      {{ displayPrice }}</span
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
                  <div></div>
                </div>
                <div class="flex flex-row pt-2">
                  <span class="text-[13.5px] text-gray-500 pr-2"
                    >Sold: {{ product?.totalOrders }}</span
                  >
                  <span class="text-[13.5px] text-gray-500 pr-8"
                    >| Views: {{ product?.views }}</span
                  >
                </div>
              </div>

              <div class="flex flex-wrap">
                <p
                  class="text-secondary-foreground/60 text-sm text-justify px-8 text-wrap"
                >
                  {{ product?.description }}
                </p>
              </div>

              <div>
                <span>Sizes | Price:</span>
                <div
                  class="grid grid-cols-4 gap-4 pl-8 py-4 text-xs md:text-sm text-secondary-foreground/70"
                >
                  <span
                    v-if="
                      !product?.sizes || Object.keys(product.sizes).length === 0
                    "
                  >
                    No Available Size
                  </span>
                  <template v-else>
                    <template v-for="(sizeItem, sizeName) in selectedSizes">
                      <span>
                        {{ sizeName !== "N/A" ? sizeName + ":" : "" }} P
                        {{ sizeItem.price }}
                      </span>
                    </template>
                  </template>
                </div>
              </div>

              <div class="flex justify-center md:justify-start">
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
  <div class="mx-auto w-11/12 md:pt-32">
    <div
      class="flex flex-col md:flex-row pb-2 justify-between border-b-2 border-primary mx-auto"
    >
      <div
        class="flex flex-row justify-between items-center text-primary w-full"
      >
        <div class="flex">
          <label
            class="font-bold text-secondary-foreground tracking-wide text-xs md:text-2xl capitalize"
          >
            More <span class="text-red-600">Products </span> From This Seller
          </label>
        </div>
        <div class="flex pr-4">
          <router-link to="/products">
            <label
              class="text-[8px] md:text-xs uppercase hover:underline cursor-pointer"
              >View All Products</label
            >
          </router-link>
        </div>
      </div>
    </div>
    <div class="flex w-full flex-col pt-4 bg-gray-100 shadow-md">
      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-4 xl:gap-18 pb-8 px-4 md:px-16"
      >
        <div
          v-if="!isLoading"
          v-for="product in sellerProducts"
          :key="product.id"
          class="flex flex-col bg-white shadow-lg border border-primary/20 rounded-sm hover:drop-shadow-xl w-full h-auto md:w-full md:h-[22rem]"
        >
          <div class="overflow-hidden border-b-2 border-primary/60">
            <div class="flex flex-col justify-center items-center">
              <router-link
                :to="{ name: 'product', params: { id: product.id } }"
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
              <p
                @click.prevent="incrementViewCount(product)"
                class="truncate cursor-pointer"
              >
                <span
                  class="w-full text-xs md:text-base font-bold text-secondary-foreground truncate hover:underline"
                >
                  {{ product.name }}
                </span>
              </p>
              <span
                class="block pb-2 pt-1 text-base md:text-2xl font-bold uppercase text-primary"
              >
                P
                {{ displayPrice }}
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
  <div class="pb-16"></div>
</template>

<script setup lang="ts">
import { provide, ref, watch, Ref, computed } from "vue";
import { useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
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
import { setup as setupProductController } from "../controllers/productsController";
import { setupProductController as setupProduct } from "../controllers/productController";
import { SizeType } from "../models/productsModel";
import { DocumentData } from "firebase/firestore";

const route = useRoute();
const { product, loading, displayPrice } = setupProduct(route);
const currentId = route.params.id as string;

//console.log("product: ", product);

const {
  products,
  sellerProducts,
  isLoading,

  incrementViewCount,
} = setupProductController();

const getProductById = (id: string) => {
  return products.value.find((product) => product.id === id);
};

provide("getProductById", getProductById);

// Define the type for allPhotos and featuredPhoto
const allPhotos: Ref<string[]> = ref([]);
const featuredPhoto: Ref<string | null> = ref(null);

watch(
  () => product.value,
  (newValue: DocumentData | null | undefined) => {
    if (newValue && "coverPhoto" in newValue && "photos" in newValue) {
      allPhotos.value = [newValue.coverPhoto, ...newValue.photos];
    }
  },
  { immediate: true }
);

// Update the initial value of featuredPhoto
featuredPhoto.value = allPhotos.value[0] || null;

const updateFeaturedPhoto = (newPhoto: string) => {
  featuredPhoto.value = newPhoto;
};

const selectedSizes = computed(() => {
  const sizes: Record<string, SizeType> = {};
  for (let sizeName in product.value?.sizes) {
    for (let sizeItem of product.value.sizes[sizeName]) {
      if (Number(sizeItem.remaining_stocks) > 0) {
        sizes[sizeName] = sizeItem;
        break;
      }
    }
  }
  return sizes;
});

//console.log("product: ", product);
</script>
