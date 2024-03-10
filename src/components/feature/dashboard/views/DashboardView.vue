<template>
  <!-- Features -->
  <div
    class="max-w-[85rem] px-4 py-12 sm:px-6 lg:px-12 lg:py-24 mx-auto border-b-2"
  >
    <!-- Grid -->
    <div
      class="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32 pb-2"
    >
      <div>
        <FeaturedCarousel />
      </div>

      <!-- End Col -->
      <div class="mt-5 sm:mt-10 lg:mt-0">
        <div class="space-y-6 sm:space-y-8">
          <!-- Title -->
          <div class="space-y-2 md:space-y-4">
            <h2
              class="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-gray-200"
            >
              CS3 Merchandise and Souvenirs
            </h2>
            <p class="text-muted-foreground text-justify">
              Welcome to CS3 Merchandise and Souvenirs, your go-to destination
              for innovative products and seamless digital experiences. As the
              course organization under the Department of Computer Science and
              Technology, we've crafted high-quality merchandise that reflects
              our commitment to excellence.
            </p>
          </div>
          <!-- End Title -->

          <!-- List -->
          <ul role="list" class="space-y-2 sm:space-y-4">
            <li class="flex space-x-3">
              <span
                class="mt-0.5 size-5 flex justify-center items-center rounded-full text-primary"
              >
                <svg
                  class="flex-shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>

              <span class="text-sm sm:text-base text-muted-foreground">
                <span class="font-bold">Pre-Order</span> Payment Method
              </span>
            </li>

            <li class="flex space-x-3">
              <span
                class="mt-0.5 size-5 flex justify-center items-center rounded-full text-primary"
              >
                <svg
                  class="flex-shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>

              <span class="text-sm sm:text-base text-muted-foreground">
                <span class="font-bold">High Quality</span> Products
              </span>
            </li>

            <li class="flex space-x-3">
              <span
                class="mt-0.5 size-5 flex justify-center items-center rounded-full text-primary"
              >
                <svg
                  class="flex-shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>

              <span class="text-sm sm:text-base text-muted-foreground">
                <span class="font-bold">Discount</span> provided for CS3 Members
              </span>
            </li>
            <li class="flex space-x-3 py-4">
              <Button variant="default" v-scroll-to="'#products'">
                Order Now
              </Button>
              <Button variant="ghost"> Contact Us </Button>
            </li>
          </ul>
          <!-- End List -->
        </div>
      </div>
      <!-- End Col -->
    </div>
    <!-- End Grid -->
  </div>
  <!-- End Features -->
  <div id="products"><Products /></div>
</template>

<script setup lang="ts">
import FeaturedCarousel from "../components/Carousel.vue";
import Products from "../components/Products.vue";
import { Button } from "@/components/ui/button";
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
});
</script>
