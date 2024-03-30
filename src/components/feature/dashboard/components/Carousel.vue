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
            <CardContent class="flex items-center justify-center p-2">
              <img
                :src="url"
                alt="Carousel image"
                class="max-w-full h-[26rem] object-cover"
              />
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious class="ml-16 opacity-40 hover:opacity-100" />
    <CarouselNext class="mr-16 opacity-40 hover:opacity-100" />
  </Carousel>
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

const imageUrls = ref<string[]>([]);

const fetchImages = async () => {
  const storageReference = storageRef(
    storage,
    "gs://csshoppee-76342.appspot.com/featured"
  );
  const res = await listAll(storageReference);
  const urls = await Promise.all(res.items.map((item) => getDownloadURL(item)));
  imageUrls.value = urls;
  console.log(imageUrls.value);
};

const plugin = Autoplay({
  delay: 3500,
  stopOnMouseEnter: false,
  stopOnInteraction: false,
});

onMounted(() => {
  initFlowbite();
  fetchImages();
});
</script>
