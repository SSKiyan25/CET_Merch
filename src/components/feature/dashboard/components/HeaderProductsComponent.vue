<template>
  <div class="w-full px-8">
    <!--
    <div
      class="flex flex-col md:flex-row pt-6 pb-2 px-2 justify-between mx-auto"
    >
      <div class="flex flex-row items-center text-primary space-x-1 md:mb:0">
        <span
          class="font-semibold text-secondary-foreground tracking-wide text-xl uppercase"
          >Best Sellers</span
        >
      </div>
    </div>
    -->
    <!--Product Card-->
    <!--
    <div class="flex flex-row px-16 pt-8 pb-12 justify-center bg-secondary/50">
      <div class="flex justify-center space-x-4">
        <div
          class="group flex flex-col bg-background border border-primary/50 shadow-sm rounded-b-xl"
        >
          <div
            class="flex flex-col border-b-2 border-primary/60 justify-center items-center max-h-[22rem]"
          >
            <img
              src="/1-Lanyard.png"
              class="transform transition-all duration-500 hover:scale-105 max-h-[20rem] md:max-h-[22rem] object-cover"
            />
          </div>
          <div class="p-4 md:p-6">
            <div class="flex flex-row">
              <span
                class="block pb-2 pt-1 text-xs font-semibold uppercase text-secondary-foreground/30"
                >Category</span
              >
              <span
                class="block pb-2 pl-2 pt-1 text-xs font-semibold uppercase text-primary"
                >(P 250)</span
              >
            </div>
            <h3
              class="text-xl font-semibold text-secondary-foreground text-wrap"
            >
              Product Name
            </h3>
            <p
              class="mt-3 text-secondary-foreground/30 text-xs whitespace-wrap text-justify truncate"
            >
              desadalskdna sdljasdna ksdmalsd asdl asdas
            </p>
          </div>
          <div
            class="mt-auto flex border-t border-secondary divide-x divide-secondary"
          >
            <router-link
              to=""
              class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
              >View Product</router-link
            >
            <button
              class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    -->
    <div class="flex flex-row w-full justify-between pt-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        <div class="group flex bg-secondary shadow-sm rounded-sm">
          <div
            class="flex flex-row h-[12rem] w-[32rem] border-primary/60 justify-start items-start max-h-[22rem] pl-4 pt-5"
          >
            <div class="w-48 h-64">
              <img src="/1-Lanyard.png" class="object-cover rounded-sm" />
            </div>
            <div class="flex flex-col space-y-2">
              <span class="text-sm pl-8 pt-12 uppercase opacity-70"
                >View Our</span
              >
              <router-link to="" class="hover:underline">
                <span class="pl-8 text-lg font-semibold text-wrap"
                  >Featured Products</span
                >
              </router-link>
            </div>
          </div>
        </div>
        <div class="group flex bg-secondary shadow-sm rounded-sm">
          <div
            class="flex flex-row h-[12rem] w-[32rem] border-primary/60 justify-start items-start max-h-[22rem] pl-4 pt-5"
          >
            <div class="w-48 h-64">
              <img src="/1-Lanyard.png" class="object-cover rounded-sm" />
            </div>
            <div class="flex flex-col space-y-2">
              <span class="text-sm pl-8 pt-12 uppercase opacity-70"
                >Buy Our</span
              >
              <router-link to="" class="hover:underline">
                <span class="pl-8 text-lg font-semibold text-wrap"
                  >Best Seller Products</span
                >
              </router-link>
            </div>
          </div>
        </div>
        <div class="group flex bg-secondary shadow-sm rounded-sm">
          <div
            class="flex flex-row h-[12rem] w-[32rem] border-primary/60 justify-start items-start max-h-[22rem] pl-4 pt-5"
          >
            <div class="w-48 h-64">
              <img src="/1-Lanyard.png" class="object-cover rounded-sm" />
            </div>
            <div class="flex flex-col space-y-2">
              <span class="text-sm pl-8 pt-12 uppercase opacity-70"
                >Browse Our</span
              >
              <router-link to="" class="hover:underline">
                <span class="pl-8 text-lg font-semibold text-wrap"
                  >Most Popular Products</span
                >
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
