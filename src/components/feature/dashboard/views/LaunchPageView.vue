<template>
  <div class="relative max-w-screen h-auto pb-4 mx-auto border-b-2">
    <div>
      <FeaturedCarousel />
    </div>
  </div>
  <!-- End Features -->
  <div id="products"><HeaderProductsComponent /></div>
  <div><FeaturedProductsComponent /></div>
  <div class="pt-12"><BestSellerProductsComponent /></div>
  <div><PopularProductsComponent /></div>
  <div class="pb-32"></div>
</template>

<script setup lang="ts">
import FeaturedCarousel from "../components/Carousel.vue";
import HeaderProductsComponent from "../components/HeaderProductsComponent.vue";
import FeaturedProductsComponent from "../components/FeaturedProductsComponent.vue";
import PopularProductsComponent from "../components/PopularProductsComponent.vue";
import BestSellerProductsComponent from "../components/BestSellerProductsComponent.vue";
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
});
</script>
