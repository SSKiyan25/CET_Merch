<template>
  <!-- Features -->
  <div
    class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-12 lg:py-20 mx-auto border-b-2"
  >
    <!-- Grid -->
    <div class="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
      <div class="items-center justify-center">
        <Carousel
          class="w-full min-w-lg"
          :plugins="[plugin]"
          @mouseenter="plugin.stop"
          @mouseleave="[plugin.reset(), plugin.play(), console.log('Running')]"
        >
          <CarouselContent>
            <CarouselItem v-for="(_, index) in 5" :key="index">
              <div class="p-1">
                <Card>
                  <CardContent class="flex items-center justify-center p-2">
                    <img
                      :src="`/carousel/${index + 1}-carousel.jpg`"
                      alt="Carousel image"
                      class="max-w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="ml-16 opacity-40 hover:opacity-100" />
          <CarouselNext class="mr-16 opacity-40 hover:opacity-100" />
        </Carousel>
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
              <Button variant="default"> Order Now </Button>
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
  <div class="flex flex-row py-12 px-8 md:px-24 justify-between">
    <div class="flex flex-row">
      <span class="font-bold text-4xl">Products</span>
      <div class="flex-row py-3 px-2">
        <button class="hover:text-primary">
          <span class="material-symbols-outlined"> add_box </span>
        </button>
      </div>
    </div>
    <div class="py-2">
      <form class="min-w-xl mx-auto">
        <div class="flex">
          <div class="relative w-full max-w-sm items-center">
            <Input
              id="search"
              type="text"
              placeholder="Search..."
              class="pl-10"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <MagnifyingGlassIcon class="size-6 text-muted-foreground" />
            </span>
          </div>
          <!--Popover-->
          <Popover v-model:open="open" class="max-w-sm">
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                role="combobox"
                :aria-expanded="open"
                class="w-[200px] justify-between"
              >
                {{
                  value
                    ? frameworks.find((framework) => framework.value === value)
                        ?.label
                    : "Select Category"
                }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-[200px] p-0">
              <Command>
                <CommandInput class="h-9" placeholder="Search Category" />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    <CommandItem
                      v-for="framework in frameworks"
                      :key="framework.value"
                      :value="framework.value"
                      @select="
                        (ev) => {
                          if (typeof ev.detail.value === 'string') {
                            value = ev.detail.value;
                          }
                          open = false;
                        }
                      "
                      class="cursor-pointer"
                    >
                      {{ framework.label }}
                      <Check
                        :class="
                          cn(
                            'ml-auto h-4 w-4',
                            value === framework.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )
                        "
                      />
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </form>
    </div>
  </div>
  <div class="flex flex-row px-36 mb-72">
    <!-- Card Blog -->
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-4 lg:py-8 mx-auto">
      <!-- Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Card -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { MagnifyingGlassIcon } from "@radix-icons/vue";
import { Input } from "@/components/ui/input";

import { Check, ChevronsUpDown } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  { value: "T-Shirt", label: "T-Shirt" },
  { value: "Polo-Shirt", label: "Polo-Shirt" },
  { value: "Lace", label: "Lace" },
  { value: "Hoodie", label: "Hoodie" },
  { value: "Stickers", label: "Stickers" },
];

const open = ref(false);
const value = ref<string>("");

const plugin = Autoplay({
  delay: 3500,
  stopOnMouseEnter: false,
  stopOnInteraction: false,
});

onMounted(() => {
  initFlowbite();
});
</script>
