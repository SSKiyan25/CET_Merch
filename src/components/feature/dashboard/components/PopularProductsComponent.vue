<template>
  <div class="mx-auto w-11/12">
    <div
      class="flex flex-col md:flex-row pt-6 pb-2 px-2 justify-between border-b-2 border-primary/40 mx-auto"
    >
      <div class="flex flex-row items-center text-primary space-x-1 md:mb:0">
        <span class="material-symbols-outlined"> stars </span>
        <span
          class="font-semibold text-secondary-foreground tracking-wide text-3xl uppercase"
          >Best Sellers</span
        >
      </div>
    </div>
    <!--Product Card-->
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
  </div>
</template>

<script setup lang="ts"></script>
