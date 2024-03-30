<template>
  <Carousel
    :plugins="[plugin]"
    @mouseenter="plugin.stop"
    @mouseleave="[plugin.reset(), plugin.play(), console.log('Running')]"
  >
    <CarouselContent>
      <CarouselItem v-for="(url, index) in imageUrls" :key="index">
        <div class="p-1">
          <Card>
            <CardContent class="flex items-center justify-center p-2 relative">
              <img
                :src="url"
                alt="Carousel image"
                class="object-cover opacity-20"
                style="width: 1920px; height: 620px"
              />
              <div
                class="absolute top-0 left-0 flex flex-col items-center justify-end w-full h-full p-2 pb-12 pl-8 md:pb-16 md:pl-16 md:items-start"
              >
                <div class="bg-primary p-4 rounded">
                  <h1
                    class="text-secondary-foreground font-semibold text-2xl md:text-5xl"
                    style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)"
                  >
                    CET MERCHANDISE
                  </h1>
                </div>
                <h2
                  class="pt-2 pb-6 text-primary font-semibold text-2xl md:text-5xl"
                >
                  COLLECTION
                </h2>

                <button
                  class="bg-none border-4 p-4 border-primary text-primary text-base md:text-xl font-bold rounded-sm"
                >
                  Shop Now
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious class="ml-16 opacity-40 hover:opacity-100" />
    <CarouselNext class="mr-16 opacity-40 hover:opacity-100" />
  </Carousel>
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
