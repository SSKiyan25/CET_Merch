<template>
  <div
    class="w-full h-[40rem] shadow-sm bg-gradient-to-br from-gold to-light-gold pt-8"
  >
    <div class="flex flex-col justify-center items-center">
      <div class="">
        <h1
          class="tracking-wide text-5xl font-black drop-shadow-xl text-primary"
        >
          BEST SELLING PRODUCTS
        </h1>
      </div>
      <div
        class="flex flex-row justify-center space-x-3 space-y-2 px-4 md:px-12 pt-10 pb-8"
      >
        <div class="max-w-[75rem] justify-center items-center">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <div
              class="group flex flex-col bg-white border border-primary/50 shadow-xl hover:drop-shadow-xl"
            >
              <div class="overflow-hidden">
                <div
                  class="h-full flex flex-col border-primary/60 justify-center items-center max-h-[22rem]"
                >
                  <router-link to=""
                    ><img
                      src="/1-Lanyard.png"
                      alt=""
                      class="transform transition-all duration-500 hover:scale-110 object-cover w-auto h-[20rem]"
                  /></router-link>
                </div>
              </div>
              <div class="p-2 md:p-5">
                <div class="flex flex-col">
                  <span
                    class="text-sm md:text-base font-bold text-secondary-foreground truncate hover:underline"
                  >
                    Product Name
                  </span>
                  <span
                    class="block pb-2 pt-1 text-base md:text-2xl font-bold uppercase text-primary"
                  >
                    P1000
                  </span>
                  <div
                    class="flex flex-row justify-between items-center text-xs"
                  >
                    <div>
                      <span> 100 Sold | </span> <span> 1.2k Views</span>
                    </div>
                    <div>
                      <span>
                        <span> Category | </span>
                        <span> Faction </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
