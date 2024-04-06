<template>
  <div class="flex relative">
    <Carousel
      :plugins="[plugin]"
      @mouseenter="plugin.stop"
      @mouseleave="[plugin.reset(), plugin.play(), console.log('Running')]"
    >
      <CarouselContent class="border-0 border-none">
        <CarouselItem v-for="(url, index) in imageUrls" :key="index">
          <div class="p-1">
            <Card v-if="loading">
              <CardContent
                ><div
                  class="flex flex-col h-full w-full items-center justify-center"
                  style="width: 1920px; height: 620px"
                >
                  <span
                    class="material-symbols-outlined text-9xl text-primary animate-spin"
                  >
                    autorenew
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card v-else class="bg-background/0 shadow-2xl">
              <CardContent
                class="flex bg-inherit items-center justify-center p-2 relative"
              >
                <img
                  :src="url"
                  alt="Carousel image"
                  class="object-cover md:object-fit brightness-50 backdrop-contrast-50 backdrop-hue-rotate-90"
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
    v-if="!loading"
    class="absolute bottom-48 md:bottom-0 left-0 flex flex-col items-center justify-end w-full h-full pb-20 p-2 md:pb-28 md:pl-20 lg:pb-36 md:items-start opacity-90"
  >
    <div class="p-4 rounded-lg">
      <h1
        class="text-white font-black text-3xl md:text-5xl"
        style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)"
      >
        CET MERCHANDISE
      </h1>
    </div>
    <div class="md:pl-5 pb-4 w-1/2 md:w-1/3">
      <p
        class="text-white text-center md:text-start text-xs md:text-sm font-semibold text-wrap"
        style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)"
      >
        Get your hands on the latest CET Merchandise. From t-shirts to lanyards
        and more!
      </p>
    </div>
    <div class="pt-2 ps-4">
      <div class="overflow-hidden rounded-lg">
        <button
          class="bg-white p-4 transform transition-all duration-500 hover:scale-110 text-black text-base md:text-xl font-bold"
          v-scroll-to="'#products'"
        >
          Shop Now
        </button>
      </div>
    </div>
  </div>
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
//import LoadingComponent from "../../misc/LoadingComponent.vue";

const imageUrls = ref<string[]>([]);
const loading = ref(false);
const fetchImages = async () => {
  const storageReference = storageRef(
    storage,
    "gs://csshoppee-76342.appspot.com/featured"
  );
  loading.value = true;
  const res = await listAll(storageReference);
  const urls = await Promise.all(res.items.map((item) => getDownloadURL(item)));
  imageUrls.value = urls;
  console.log(imageUrls.value);

  // Add a delay before setting loading back to false
  setTimeout(() => {
    loading.value = false;
  }, 1000); // Delay of 1 second
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
