<template>
  <div class="flex relative">
    <Carousel
      :plugins="[plugin]"
      @mouseenter="plugin.stop"
      @mouseleave="[plugin.reset(), plugin.play(), console.log('Running')]"
    >
      <CarouselContent>
        <CarouselItem v-for="(url, index) in imageUrls" :key="index">
          <div class="p-1">
            <Card class="bg-background/0">
              <CardContent
                class="flex items-center justify-center p-2 relative"
              >
                <img
                  :src="url"
                  alt="Carousel image"
                  class="object-cover opacity-60"
                  style="width: 1920px; height: 620px"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="ml-20 opacity-40 hover:opacity-100" />
      <CarouselNext class="mr-20 opacity-40 hover:opacity-100" />
    </Carousel>
  </div>

  <div
    class="absolute bottom-48 md:bottom-0 left-0 flex flex-col items-center justify-end w-full h-full p-2 pl-8 md:pb-28 md:pl-20 md:items-start"
  >
    <div class="bg-red-800 p-4 rounded-lg">
      <h1
        class="text-secondary-foreground font-semibold text-2xl md:text-5xl"
        style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)"
      >
        CET MERCHANDISE
      </h1>
    </div>
    <div class="pt-4"></div>
    <div class="overflow-hidden border-4 border-red-800 rounded-lg">
      <button
        class="bg-secondary-foreground p-4 transform transition-all duration-500 hover:scale-110 text-red-800 text-base md:text-xl font-bold"
        v-scroll-to="'#products'"
      >
        Shop Now
      </button>
    </div>
  </div>
  <LoadingComponent v-if="loading" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import { storage } from "@/firebase/init.ts";
import { listAll, ref as storageRef, getDownloadURL } from "firebase/storage";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import LoadingComponent from "../../misc/LoadingComponent.vue";

const imageUrls = ref<string[]>([]);
const loading = ref(false);
const fetchImages = async () => {
  loading.value = true;
  const storageReference = storageRef(
    storage,
    "gs://csshoppee-76342.appspot.com/featured"
  );
  const res = await listAll(storageReference);
  const urls = await Promise.all(res.items.map((item) => getDownloadURL(item)));
  imageUrls.value = urls;
  console.log(imageUrls.value);
  loading.value = false;
};

const plugin = Autoplay({
  delay: 5500,
  stopOnMouseEnter: false,
  stopOnInteraction: false,
});

onMounted(() => {
  initFlowbite();
  fetchImages();
});
</script>
