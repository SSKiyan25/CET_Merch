<template>
  <div class="max-w-screen h-auto pb-4 mx-auto border-b-2">
    <div>
      <FeaturedCarousel />
    </div>
  </div>
  <!-- End Features -->
  <div id="products"><PopularProductsComponent /></div>
  <div><ProductsCategoryComponent /></div>
</template>

<script setup lang="ts">
import FeaturedCarousel from "../components/Carousel.vue";
import ProductsCategoryComponent from "../components/ProductsCategoryComponent.vue";
import PopularProductsComponent from "../components/PopularProductsComponent.vue";
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
});
</script>
