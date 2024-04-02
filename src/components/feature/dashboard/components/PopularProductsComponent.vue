<template>
  <div class="mx-auto w-11/12">
    <div
      class="flex flex-col md:flex-row pt-12 pb-2 justify-between border-b-2 border-primary mx-auto"
    >
      <div class="flex flex-row items-center text-primary md:mb:0">
        <span
          class="font-black text-secondary-foreground tracking-wide text-2xl uppercase"
        >
          Popular <span class="text-primary">Products</span>
        </span>
      </div>
    </div>
    <div class="flex flex-col pt-4 bg-stone-200">
      <div class="flex flex-row px-4 md:px-16">
        <Carousel class="w-full max-w-5/6" :opts="{ align: 'start' }">
          <CarouselContent>
            <CarouselItem
              ><div
                class="hidden max-w-[75reh] h-full pt-8 justify-center items-center"
              >
                <div class="flex flex-col items-center justify-center h-full">
                  <div class="flex flex-col items-center justify-center">
                    <span
                      class="material-symbols-outlined text-6xl text-primary animate-spin"
                    >
                      autorenew
                    </span>
                  </div>
                </div>
              </div>
              <!--Product Card-->
              <div class="flex flex-row px-4 md:px-16 pt-4 pb-8 justify-center">
                <div class="max-w-[75rem] justify-center items-center">
                  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    <div class="flex flex-col bg-white shadow-sm rounded-sm">
                      <div class="overflow-hidden">
                        <div
                          class="h-full flex flex-col border-b-2 border-primary/60 justify-center items-center max-h-[22rem]"
                        >
                          <router-link to="/">
                            <img
                              src="/1-Lanyard.png"
                              class="transform transition-all duration-500 hover:scale-110 max-h-[20rem] md:max-h-[22rem] object-cover rounded-t-sm"
                            />
                          </router-link>
                        </div>
                      </div>
                      <div class="p-4 md:p-6">
                        <div class="flex flex-row">
                          <span
                            class="block pb-2 pt-1 text-xs md:text-sm font-semibold uppercase text-secondary-foreground/80"
                          >
                            Category
                          </span>
                          <span
                            class="block pb-2 pl-2 pt-1 text-xs md:text-sm font-semibold uppercase text-primary"
                          >
                            (P )
                          </span>
                        </div>
                        <router-link to="/"
                          ><h3
                            class="text-xl md:text-2xl font-bold text-secondary-foreground text-wrap"
                          >
                            Name
                          </h3>
                        </router-link>
                        <p
                          class="mt-3 text-secondary-foreground text-xs md:text-sm whitespace-wrap text-justify truncate"
                        >
                          Description
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="ml-6 md:ml-8 opacity-40 hover:opacity-100" />
          <CarouselNext class="mr-6 md:mr-8 opacity-40 hover:opacity-100" />
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../ui/carousel";
</script>
