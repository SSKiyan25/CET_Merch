<template>
  <div class="relative max-w-screen mx-auto">
    <Carousel
      :plugins="[plugin]"
      @mouseenter="plugin.stop"
      @mouseleave="[plugin.reset(), plugin.play(), console.log('Running')]"
    >
      <CarouselContent class="border-0 border-none">
        <CarouselItem v-for="(url, index) in imageUrls" :key="index">
          <div class="p-1">
            <Card v-if="loading">
              <CardContent>
                <div
                  class="flex flex-col w-[1920px] h-[240px] md:h-[620px] md:w-[1920px] items-center justify-center"
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
                class="flex bg-inherit items-center justify-center p-2 relative before:absolute before:inset-x-0 before:size-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]"
              >
                <img
                  :src="url"
                  alt="Carousel image"
                  class="object-cover md:object-fit brightness-50 backdrop-contrast-50 backdrop-hue-rotate-90 w-[1920px] h-[360px] md:h-[720px] md:w-[1920px]"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
    <!--Overlayed content-->
    <div
      class="absolute bottom-0 left-0 flex flex-col items-center md:items-start justify-center md:justify-end w-full h-full p-6 pt-48 md:p-20 space-y-4 backdrop-filter text-white"
      style="backdrop-filter: blur(0.5px)"
    >
      <div
        class="flex flex-col items-center md:items-start justify-center md:justify-start w-full space-y-2"
      >
        <h1
          class="text-white font-black text-2xl md:text-5xl"
          style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)"
        >
          CET MERCHANDISE
        </h1>
        <p
          class="text-white text-center md:text-start text-[10px] md:text-sm font-semibold text-wrap"
          style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)"
        >
          Get your hands on the latest CET Merchandise. From t-shirts to
          lanyards and more!
        </p>
        <button
          class="bg-white p-2 md:p-4 transform transition-all duration-500 hover:scale-110 text-black text-sm md:text-xl font-bold rounded-md"
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
import { storage } from "@/firebase/init";
import { listAll, ref as storageRef, getDownloadURL } from "firebase/storage";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

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
  //console.log(imageUrls.value);

  setTimeout(() => {
    loading.value = false;
  }, 1000);
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
