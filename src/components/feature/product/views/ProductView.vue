<template>
  <div
    class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-12 lg:py-20 mx-auto border-b-2"
  >
    <div
      class="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32 pb-2"
    >
      <div class="items-center justify-center">
        <img
          class="w-full rounded-md"
          src="/carousel/1-carousel.jpg"
          alt="Image Description"
        />
      </div>
      <div class="mt-5 sm:mt-10 lg:mt-0">
        <div class="space-y-6 sm:space-y-8">
          <!-- Title -->
          <div class="space-y-2 md:space-y-4">
            <div class="border-b-2 pb-2">
              <h2
                class="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-gray-200"
              >
                Product Title
              </h2>
            </div>
            <div class="">
              <snap class="text-2xl font-semibold text-primary pt-8">
                P 550.00</snap
              >
            </div>
            <div>
              <snap>Available Sizes:</snap>
            </div>
            <div>
              <p class="text-muted-foreground text-justify">Description Here</p>
            </div>
            <div>
              <Button> Add to Cart</Button>
            </div>
          </div>
          <!-- End Title -->
        </div>
      </div>
    </div>
  </div>
  <!-- Hero -->

  <!-- End Hero -->
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>
